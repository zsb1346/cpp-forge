export type RunnerLanguage = 'cpp' | 'c'

export interface RunOptions {
  code: string
  stdin?: string
  timeout?: number
}

export interface RunResult {
  stdout: string
  stderr: string
  exitCode: number
  success: boolean
  executionTimeMs: number
  timedOut: boolean
}

export interface IRunner {
  readonly language: RunnerLanguage
  readonly name: string
  isReady(): boolean
  init(): Promise<void>
  run(options: RunOptions): Promise<RunResult>
}
