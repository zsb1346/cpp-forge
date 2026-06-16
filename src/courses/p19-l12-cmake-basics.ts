import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'cmake-basics',
    chapter: 20,
    title: 'CMake 入门',
    subtitle: 'CMakeLists.txt',
    description: '用 CMake 管理 C++ 项目构建，告别手敲 g++ 命令。',
    objectives: ['能编写 CMakeLists.txt', '能用 cmake 命令构建项目'],
    estimatedMinutes: 8,
  },
  blocks: [
    {
      type: 'exposition',
      text: '项目大了之后，手敲 `g++ main.cpp utils.cpp ... -o app` 就太累了。\n**CMake** 是 C++ 最流行的构建工具——写好 `CMakeLists.txt` 就能自动管理编译。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '### 最简单的 CMakeLists.txt\n\n一个源文件的项目只需要三行：',
      code: 'cmake_minimum_required(VERSION 3.10)\nproject(MyApp)\nadd_executable(myapp main.cpp)',
    },
    {
      type: 'exposition',
      text: '### 构建过程（两步）\n\n1. **配置**：`cmake -B build` ——读取 CMakeLists.txt，生成构建系统文件\n2. **编译**：`cmake --build build` ——执行编译，生成可执行文件',
      code: '# 终端命令\ncmake -B build        # 配置\ncmake --build build   # 编译\n./build/myapp         # 运行',
    },
    {
      type: 'exposition',
      text: '### 为什么用 CMake？\n\n- **跨平台**：Windows/Linux/macOS 用同一个 CMakeLists.txt\n- **自动依赖管理**：头文件路径、链接库自动搞定\n- **生成 IDE 项目**：VS Code / Visual Studio / Xcode\n- **社区标准**：几乎每个 C++ 开源项目都用 CMake',
    },
    {
      type: 'concept-cards',
      instruction: 'CMake 的基本概念：',
      cards: [
        { glyph: '📋', term: 'CMakeLists.txt', meaning: 'CMake 的配置文件，描述如何构建', example: '项目根目录' },
        { glyph: '⚙️', term: 'cmake -B build', meaning: '配置阶段，生成构建系统', example: '生成 Makefile' },
        { glyph: '🔨', term: 'cmake --build build', meaning: '编译阶段，实际编译代码', example: '调用编译器' },
        { glyph: '🎯', term: 'target', meaning: '构建目标：可执行文件或库', example: 'add_executable' },
      ],
    },
    {
      type: 'type-it',
      instruction: '写一个支持多个源文件的 CMakeLists.txt：',
      code: 'cmake_minimum_required(VERSION 3.10)\nproject(Calculator)\n\nadd_executable(calc\n  main.cpp\n  add.cpp\n  subtract.cpp\n)',
      hints: [
        'project 设置项目名称',
        'add_executable 第一个参数是可执行文件名',
        '多个源文件列在括号内',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾 p16-07：g++ -c 的作用是什么？',
      options: [
        { text: '链接目标文件', correct: false, explanation: '-c 只编译不链接' },
        { text: '只编译不链接，生成 .o 文件', correct: true, explanation: '-c 编译源码为目标文件' },
        { text: '生成可执行文件', correct: false, explanation: '不加 -c 才生成可执行文件' },
        { text: '优化代码', correct: false, explanation: '优化是 -O 参数' },
      ],
    },
    {
      type: 'type-it',
      instruction: '设置 C++ 标准版本：',
      code: 'cmake_minimum_required(VERSION 3.10)\nproject(MyApp)\n\nset(CMAKE_CXX_STANDARD 17)\nset(CMAKE_CXX_STANDARD_REQUIRED ON)\n\nadd_executable(myapp main.cpp)',
      hints: [
        'set 命令设置变量',
        'CMAKE_CXX_STANDARD 设为 17 表示 C++17',
        'CMAKE_CXX_STANDARD_REQUIRED 强制使用此标准',
      ],
    },
    {
      type: 'multiple-choice',
      question: 'cmake -B build 命令的作用是什么？',
      options: [
        { text: '直接编译代码', correct: false, explanation: '编译是 cmake --build 的工作' },
        { text: '配置项目，生成构建文件', correct: true, explanation: '-B 指定构建目录，生成构建系统' },
        { text: '安装程序', correct: false, explanation: '安装是 cmake --install' },
        { text: '清理构建产物', correct: false, explanation: '清理需要手动删除 build 目录' },
      ],
    },
    {
      type: 'exposition',
      text: '### 常用 CMake 变量\n\n| 变量 | 用途 |\n|------|------|\n| `CMAKE_CXX_STANDARD` | C++ 标准版本 |\n| `CMAKE_CXX_FLAGS` | 额外编译选项 |\n| `CMAKE_BUILD_TYPE` | Debug / Release |\n| `CMAKE_INSTALL_PREFIX` | 安装路径 |',
    },
    {
      type: 'type-it',
      instruction: '设置 Debug 模式和编译选项：',
      code: 'cmake_minimum_required(VERSION 3.10)\nproject(MyApp)\n\nset(CMAKE_CXX_STANDARD 20)\nset(CMAKE_BUILD_TYPE Debug)\nset(CMAKE_CXX_FLAGS "-Wall -Wextra")\n\nadd_executable(myapp main.cpp)',
      hints: [
        'CMAKE_BUILD_TYPE 设为 Debug 启用调试符号',
        '-Wall -Wextra 开启更多警告',
        'C++ 标准设为 20 启用最新特性',
      ],
    },
    {
      type: 'multiple-choice',
      question: 'CMake 的配置阶段（cmake -B build）不做什么？',
      options: [
        { text: '检查编译器是否存在', correct: false, explanation: '配置阶段会检查编译器' },
        { text: '检查头文件和库是否存在', correct: false, explanation: 'find_package 等就是配置阶段做的事' },
        { text: '实际编译源代码', correct: true, explanation: '编译源代码是 --build 阶段的事' },
        { text: '生成 Makefile 或 Ninja 文件', correct: false, explanation: '配置阶段生成构建文件' },
      ],
    },
    {
      type: 'exposition',
      text: '### 构建类型\n\n| 类型 | 用途 |\n|------|------|\n| `Debug` | 调试版本，含调试符号，无优化 |\n| `Release` | 发布版本，优化全开 |\n| `RelWithDebInfo` | 发布版本但带调试信息 |\n| `MinSizeRel` | 优化体积的发布版本 |',
    },
    {
      type: 'exposition',
      text: '### 总结\n\n- CMake 用 `CMakeLists.txt` 描述项目构建\n- 两步构建：`cmake -B build` 配置 → `cmake --build build` 编译\n- 支持跨平台、C++ 标准设置、构建类型\n- 是现代 C++ 项目的事实标准',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '下一课：CMake 目标和库——`add_library` 和 `target_link_libraries`。',
    },
    {
      type: 'exposition',
      text: '### 清理构建目录\n\nCMake 没有内置的 clean 命令，但可以：\n- `cmake --build build --target clean`——删除编译产物\n- 或者直接删掉 build 目录重新配置\n\n调试时 `-DCMAKE_BUILD_TYPE=Debug`，发布时 `=Release`。',
    },
    {
      type: 'multiple-choice',
      question: '如何配置 CMake 使用 C++17？',
      options: [
        { text: 'add_cxx_standard(17)', correct: false, explanation: '没有这个命令' },
        { text: 'set(CMAKE_CXX_STANDARD 17)', correct: true, explanation: '用 set 命令设置 CMAKE_CXX_STANDARD 变量' },
        { text: 'cmake -std=c++17', correct: false, explanation: '在 cmake 命令中不能直接设置标准' },
        { text: 'project(MyApp CXX17)', correct: false, explanation: 'project 命令不支持指定 C++ 版本' },
      ],
    },
    {
      type: 'type-it',
      instruction: '配置 Release 模式项目：',
      code: 'cmake_minimum_required(VERSION 3.10)\nproject(MyApp)\n\nset(CMAKE_CXX_STANDARD 20)\nset(CMAKE_BUILD_TYPE Release)\nset(CMAKE_CXX_FLAGS "-O3 -march=native")\n\nadd_executable(myapp main.cpp)',
      hints: [
        'Release 模式开启优化',
        '-O3 最高优化级别',
        '-march=native 针对当前 CPU 优化',
      ],
    },
  ],
}

export default lesson
