import type { IRunner, RunnerLanguage, RunOptions, RunResult } from './types'
import { CppRunner } from './CppRunner'
import { preloader } from './preloader'

export type { IRunner, RunnerLanguage, RunOptions, RunResult }
export { preloader }
export { CppRunner }

const instances = new Map<RunnerLanguage, IRunner>()

/**
 * 获取指定语言的 Runner（单例，首次调用会 init）。
 * 自动触发预下载。
 */
export async function getRunner(language: RunnerLanguage): Promise<IRunner> {
  // 预下载在首次请求 runner 时触发
  preloader.start()

  if (!instances.has(language)) {
    let runner: IRunner
    switch (language) {
      case 'cpp':
      case 'c':
        runner = new CppRunner()
        break
      default:
        throw new Error(`不支持的运行语言: ${language}`)
    }
    await runner.init()
    instances.set(language, runner)
  }
  return instances.get(language)!
}
