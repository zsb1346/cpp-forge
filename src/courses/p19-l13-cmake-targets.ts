import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'cmake-targets',
    chapter: 20,
    title: 'CMake 目标和库',
    subtitle: 'add_executable/add_library',
    description: '用 CMake 管理多个构建目标，组织库和可执行文件。',
    objectives: ['能创建库目标', '能链接多个目标'],
    estimatedMinutes: 8,
  },
  blocks: [
    {
      type: 'exposition',
      text: '项目不止一个可执行文件，你需要把公共代码打成**库**，让多个目标共享。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '### add_library——创建库\n\n把公共代码编译成库，供其他目标链接：',
      code: 'add_library(MathUtils\n  math/add.cpp\n  math/subtract.cpp\n  math/multiply.cpp\n)',
    },
    {
      type: 'exposition',
      text: '### 可执行文件链接库\n\n用 `target_link_libraries` 把库连到可执行文件：',
      code: 'add_executable(calc main.cpp)\ntarget_link_libraries(calc PRIVATE MathUtils)',
    },
    {
      type: 'exposition',
      text: '### 三种库类型\n\n| 类型 | 说明 |\n|------|------|\n| `STATIC` | 静态库（`.a` / `.lib`），编译时全量链接 |\n| `SHARED` | 动态库（`.so` / `.dll`），运行时加载 |\n| `INTERFACE` | 头文件库，只有头文件，无源码 |',
      code: 'add_library(MathUtils STATIC math.cpp)\nadd_library(MathUtils SHARED math.cpp)\nadd_library(MathUtils INTERFACE)  // 纯头文件',
    },
    {
      type: 'concept-cards',
      instruction: 'CMake 目标管理的关键概念：',
      cards: [
        { glyph: '🎯', term: 'target（目标）', meaning: '可执行文件或库的统一抽象', example: 'add_executable / add_library' },
        { glyph: '🔗', term: 'target_link_libraries', meaning: '指定目标链接哪些库', example: '目标间依赖管理' },
        { glyph: '📁', term: 'PRIVATE/PUBLIC/INTERFACE', meaning: '控制依赖传递范围', example: 'PRIVATE 不传递依赖' },
        { glyph: '📂', term: 'target_include_directories', meaning: '指定头文件搜索路径', example: '独立于库类型' },
      ],
    },
    {
      type: 'type-it',
      instruction: '创建静态库和可执行文件并链接：',
      code: 'cmake_minimum_required(VERSION 3.10)\nproject(MyProject)\n\nadd_library(Utils STATIC\n  utils/string_ops.cpp\n  utils/file_ops.cpp\n)\n\nadd_executable(myapp main.cpp)\ntarget_link_libraries(myapp PRIVATE Utils)',
      hints: [
        'Utils 是静态库名字',
        'PRIVATE 表示依赖不传递',
        'main.cpp 可以通过 Utils 头文件调用函数',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾 12（CMake 入门）：cmake --build build 的作用是什么？',
      options: [
        { text: '配置构建系统', correct: false, explanation: '配置是 cmake -B build' },
        { text: '编译项目代码', correct: true, explanation: '--build 实际调用编译器编译' },
        { text: '安装项目', correct: false, explanation: '安装是 cmake --install' },
        { text: '清理编译产物', correct: false, explanation: 'CMake 没有内置清理命令' },
      ],
    },
    {
      type: 'type-it',
      instruction: '添加头文件目录：',
      code: 'cmake_minimum_required(VERSION 3.10)\nproject(MyProject)\n\nadd_library(Utils STATIC utils.cpp)\ntarget_include_directories(Utils PUBLIC include)\n\nadd_executable(myapp main.cpp)\ntarget_link_libraries(myapp PRIVATE Utils)',
      hints: [
        'PUBLIC 表示头文件目录对链接者也可见',
        'include 目录下放 .h 头文件',
        'myapp 也能用 Utils 的头文件',
      ],
    },
    {
      type: 'exposition',
      text: '### PRIVATE / PUBLIC / INTERFACE\n\n假设 `A` 链接 `B`，`B` 链接 `C`：\n- `C` 的 `PRIVATE` 依赖 → 仅 `C` 可用\n- `C` 的 `PUBLIC` 依赖 → `C` 和 `B` 都可使用\n- `C` 的 `INTERFACE` 依赖 → 仅 `B` 可用，`C` 自己不用',
    },
    {
      type: 'type-it',
      instruction: '多层依赖管理：',
      code: 'add_library(Core STATIC core.cpp)\ntarget_include_directories(Core PUBLIC core_inc)\n\nadd_library(Network STATIC network.cpp)\ntarget_link_libraries(Network PUBLIC Core)\n\nadd_executable(server main.cpp)\ntarget_link_libraries(server PRIVATE Network)',
      hints: [
        'Network 链接 Core，Core 的头文件对 Network 可见',
        'server 链接 Network，自动获得 Core 的头文件',
        'PUBLIC 传递了 Core 的依赖',
      ],
    },
    {
      type: 'multiple-choice',
      question: 'STATIC 库和 SHARED 库的主要区别是什么？',
      options: [
        { text: 'STATIC 快，SHARED 慢', correct: false, explanation: '速度差异不是关键区别' },
        { text: 'STATIC 编译时链接，SHARED 运行时加载', correct: true, explanation: '静态库嵌入可执行文件，动态库单独存在' },
        { text: 'STATIC 用 add_executable，SHARED 用 add_library', correct: false, explanation: '两者都用 add_library 创建' },
        { text: '没有区别', correct: false, explanation: '链接时机和产物完全不同' },
      ],
    },
    {
      type: 'exposition',
      text: '### 现代化 CMake 最佳实践\n\n- 使用 `target_` 系列命令（而非全局 `include_directories`）\n- 每个目标明确声明自己的依赖\n- 用 `PRIVATE` / `PUBLIC` / `INTERFACE` 控制依赖范围\n- 为每个库创建一个子目录的 `CMakeLists.txt`',
    },
    {
      type: 'exposition',
      text: '### 目录结构建议\n\n```\nproject/\n├── CMakeLists.txt        # 顶层\n├── src/\n│   ├── CMakeLists.txt    # 源文件目标\n│   └── main.cpp\n├── libs/\n│   ├── core/\n│   │   ├── CMakeLists.txt\n│   │   └── core.cpp\n│   └── utils/\n│       ├── CMakeLists.txt\n│       └── utils.cpp\n└── include/\n    └── core/\n        └── core.h\n```',
    },
    {
      type: 'multiple-choice',
      question: 'target_include_directories 用 PUBLIC 修饰时，头文件目录对谁可见？',
      options: [
        { text: '仅当前目标', correct: false, explanation: 'PUBLIC 会传递' },
        { text: '当前目标和所有链接当前目标的目标', correct: true, explanation: 'PUBLIC 对自身和链接者都可见' },
        { text: '所有目标', correct: false, explanation: '只有链接当前目标的目标才可见' },
        { text: '仅链接当前目标的目标', correct: false, explanation: 'INTERFACE 才是仅对链接者可见' },
      ],
    },
    {
      type: 'exposition',
      text: '### 总结\n\n- `add_library` 创建库目标，`add_executable` 创建可执行文件\n- `target_link_libraries` 管理目标间依赖\n- `PRIVATE/PUBLIC/INTERFACE` 控制依赖传递范围\n- `target_include_directories` 管理头文件路径',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '下一课：为什么需要测试——没测试等于没写完。',
    },
    {
      type: 'exposition',
      text: '### add_subdirectory——组织子项目\n\n使用 `add_subdirectory` 可以让每个库拥有自己的 CMakeLists.txt，顶层用 add_subdirectory 引入：',
      code: '# 顶层 CMakeLists.txt\ncmake_minimum_required(VERSION 3.10)\nproject(MyProject)\n\nadd_subdirectory(libs/core)\nadd_subdirectory(src)\n\n# libs/core/CMakeLists.txt\nadd_library(Core core.cpp)',
    },
    {
      type: 'type-it',
      instruction: '用 add_subdirectory 组织项目：',
      code: '# 顶层 CMakeLists.txt\ncmake_minimum_required(VERSION 3.10)\nproject(MyApp)\n\nadd_subdirectory(libs)\nadd_subdirectory(src)',
      hints: [
        'add_subdirectory 参数是子目录路径',
        '子目录也要有 CMakeLists.txt',
        '顶层可以链接子目录中定义的目标',
      ],
    },
  ],
}

export default lesson
