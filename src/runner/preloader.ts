/**
 * 静默预下载管理器。
 * 在后台预热浏览器 HTTP 缓存，使后续 init() 几乎瞬时完成。
 *
 * 策略：
 * 1. 页面加载后（或用户点"开始第一课"后）立即触发
 * 2. 用 requestIdleCallback 或 setTimeout fallback 下载
 * 3. 下载失败不会阻断用户体验 —— 用户点"运行"时再走正常加载路径
 */

const FILES = [
  '/browsercc/clang.wasm',
  '/browsercc/lld.wasm',
  '/browsercc/sysroot.tar',
]

type ProgressCallback = (progress: number) => void

class Preloader {
  private static instance: Preloader
  private started = false
  private _progress = 0        // 0–100
  private _done = false
  private listeners = new Set<ProgressCallback>()

  static getInstance(): Preloader {
    if (!Preloader.instance) {
      Preloader.instance = new Preloader()
    }
    return Preloader.instance
  }

  get progress(): number {
    return this._progress
  }

  get done(): boolean {
    return this._done
  }

  onProgress(cb: ProgressCallback): () => void {
    this.listeners.add(cb)
    return () => this.listeners.delete(cb)
  }

  start(): void {
    if (this.started) return
    this.started = true

    const schedule = typeof requestIdleCallback === 'function'
      ? requestIdleCallback
      : (fn: Function) => setTimeout(fn, 200)

    schedule(() => this.downloadAll())
  }

  private async downloadAll(): Promise<void> {
    let loaded = 0
    for (const url of FILES) {
      try {
        const resp = await fetch(url)
        if (!resp.ok) continue
        // 下载全部内容以确保浏览器缓存
        await resp.arrayBuffer()
      } catch {
        // 静默失败 —— 用户点"运行"时再试
      }
      loaded++
      this._progress = Math.round((loaded / FILES.length) * 100)
      this.notify()
    }
    this._done = true
    this.notify()
  }

  private notify(): void {
    for (const cb of this.listeners) {
      cb(this._progress)
    }
  }
}

export const preloader = Preloader.getInstance()
