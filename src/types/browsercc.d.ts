declare module 'browsercc/dist/clang.js' {
  interface ClangModule {
    (config: {
      thisProgram: string
      locateFile?: (path: string) => string
      printErr?: (data: string) => void
    }): Promise<any>
  }
  const mod: ClangModule
  export default mod
}

declare module 'browsercc/dist/lld.js' {
  interface LLDModule {
    (config: {
      thisProgram: string
      locateFile?: (path: string) => string
      printErr?: (data: string) => void
    }): Promise<any>
  }
  const mod: LLDModule
  export default mod
}
