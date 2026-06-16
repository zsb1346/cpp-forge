import type { RunnerLanguage, IRunner, RunOptions, RunResult } from './types'
import ClangModule from 'browsercc/dist/clang.js'
import LLDModule from 'browsercc/dist/lld.js'
import { setUpSysroot } from 'browsercc'
import { WASI, File, OpenFile, ConsoleStdout } from '@bjorn3/browser_wasi_shim'

const WASM_PUBLIC_PATH = '/browsercc/'
const SYSROOT_URL = '/browsercc/sysroot.tar'
const SYSROOT_DIR = '/lib/wasm32-wasi'
const TIMEOUT_MS = 15_000

/**
 * 默认编译标志。内容创作者可在 CodeRunnerBlock.flags 中覆盖。
 * -fno-exceptions: WASI 不支持异常，WASI 的 libcxx 编译时使用此标志。
 */
const DEFAULT_FLAGS = ['-std=c++20', '-O2', '-fno-exceptions']

/**
 * 用 Clang Driver + LLD + WASI 分步编译并运行 C++ 代码。
 *
 * 流程：
 *   clang++ -c main.cpp → main.o
 *   wasm-ld /lib/wasm32-wasi/crt1-command.o main.o -L/lib/wasm32-wasi -lc -lc++ -lc++abi → a.out
 *   WASI shim 执行 a.out
 */
export class CppRunner implements IRunner {
  readonly language: RunnerLanguage = 'cpp'
  readonly name = 'Clang/LLVM (WASM)'

  private clang: any = null
  private lld: any = null
  private sysroot: ArrayBuffer | null = null
  private _ready = false
  private initLock: Promise<void> | null = null
  private lldStderr: string[] = []

  isReady(): boolean {
    return this._ready
  }

  async init(): Promise<void> {
    if (this._ready) return
    if (this.initLock) return this.initLock
    this.initLock = this._init()
    return this.initLock
  }

  private async _init(): Promise<void> {
    const resp = await fetch(SYSROOT_URL)
    this.sysroot = await resp.arrayBuffer()

    this.clang = await ClangModule({
      thisProgram: 'clang++',
      locateFile: (path: string) => WASM_PUBLIC_PATH + path,
      printErr: () => {},
    })
    setUpSysroot(this.clang, this.sysroot!)

    this.lld = await LLDModule({
      thisProgram: 'wasm-ld',
      locateFile: (path: string) => WASM_PUBLIC_PATH + path,
      printErr: (data: string) => { this.lldStderr.push(data) },
    })
    setUpSysroot(this.lld, this.sysroot!)

    this._ready = true
  }

  async run(options: RunOptions): Promise<RunResult> {
    await this.init()

    if (!this.clang || !this.lld) {
      return {
        stdout: '', stderr: '内部错误：编译器未初始化',
        exitCode: 1, success: false, executionTimeMs: 0, timedOut: false,
      }
    }

    const { code, stdin = '', timeout = TIMEOUT_MS } = options
    const start = performance.now()

    try {
      // ==================== 编译 ====================
      const srcName = 'main.cpp'
      const objName = 'main.o'
      const wasmName = 'a.out'

      this.clang.FS.writeFile(srcName, code)

      const compileFlags = [
        srcName, '-c', '-o', objName,
        '-target', 'wasm32-wasi',
        '--sysroot=/',
        ...DEFAULT_FLAGS,
      ]

      let exitCode = this.clang.callMain(compileFlags)
      if (exitCode !== 0) {
        return {
          stdout: '', stderr: '编译失败 (exit: ' + exitCode + ')',
          exitCode, success: false, executionTimeMs: performance.now() - start, timedOut: false,
        }
      }

      const objBinary = this.clang.FS.readFile(objName, { encoding: 'binary' }) as ArrayBuffer

      // ==================== 链接 ====================
      this.lldStderr = []
      this.lld.FS.writeFile(objName, new Uint8Array(objBinary))

      // 先尝试带 CRT 启动文件的链接（正确做法）
      const crtPath = SYSROOT_DIR + '/crt1-command.o'
      const builtinsDir = '/lib/clang/20/lib/wasm32-unknown-wasi'
      const linkFlags = [
        '-m', 'wasm32',
        '-o', wasmName,
        crtPath,
        objName,
        '-L' + SYSROOT_DIR,
        builtinsDir + '/libclang_rt.builtins.a',
        '-lc', '-lc++', '-lc++abi',
      ]

      exitCode = this.lld.callMain(linkFlags)
      if (exitCode !== 0) {
        // CRT 链接失败，显示具体错误
        const errMsg = this.lldStderr.join(' ').trim()
        return {
          stdout: '', stderr: '链接失败 (exit: ' + exitCode + ')' + (errMsg ? '\n' + errMsg : ''),
          exitCode, success: false, executionTimeMs: performance.now() - start, timedOut: false,
        }
      }

      const wasmBinary = this.lld.FS.readFile(wasmName, { encoding: 'binary' }) as ArrayBuffer

      // ==================== 执行 ====================
      const wasmModule = await WebAssembly.compile(wasmBinary)
      const execResult = await this.runWasi(wasmModule, stdin, timeout)

      return {
        ...execResult,
        executionTimeMs: performance.now() - start,
      }
    } catch (err: any) {
      return {
        stdout: '', stderr: err?.message ?? String(err),
        exitCode: 1, success: false, executionTimeMs: performance.now() - start, timedOut: false,
      }
    }
  }

  private async runWasi(
    module: WebAssembly.Module,
    stdin: string,
    timeout: number,
  ): Promise<{ stdout: string; stderr: string; exitCode: number; success: boolean; timedOut: boolean }> {
    let stdout = ''
    let stderr = ''
    let timedOut = false
    let exitCode = 0

    const fds = [
      new OpenFile(new File(new TextEncoder().encode(stdin || ''))),
      new ConsoleStdout((data: Uint8Array) => { stdout += new TextDecoder().decode(data) }),
      new ConsoleStdout((data: Uint8Array) => { stderr += new TextDecoder().decode(data) }),
    ]

    const wasi = new WASI([], [], fds)

    const timer = timeout > 0
      ? setTimeout(() => { timedOut = true }, timeout)
      : null

    try {
      const instance = await WebAssembly.instantiate(module, {
        wasi_snapshot_preview1: wasi.wasiImport,
      })
      if (timer) clearTimeout(timer)
      if (timedOut) {
        return { stdout, stderr: '执行超时', exitCode: 1, success: false, timedOut: true }
      }
      exitCode = wasi.start(instance as any)
    } catch (err: any) {
      if (timer) clearTimeout(timer)
      stderr = err?.message ?? String(err)
      exitCode = 1
    }

    return { stdout, stderr, exitCode, success: exitCode === 0, timedOut }
  }
}
