import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'test-organization',
    chapter: 20,
    title: '测试组织',
    subtitle: '单元/集成/覆盖率',
    description: '理解测试的不同层级、如何组织测试代码、以及覆盖率的意义。',
    objectives: ['能区分单元测试和集成测试', '能设置 cmake 组织测试', '理解覆盖率的概念'],
    estimatedMinutes: 8,
  },
  blocks: [
    {
      type: 'exposition',
      text: '一个项目有成百上千个测试，怎么组织？\n测试分不同层级，每层的关注点不同。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '### 单元测试\n\n测试**单个函数或类**，不依赖外部资源（文件、数据库、网络）。\n特点：快速、隔离、可靠。',
      code: '// 单元测试：只测这个函数\nTEST(StringUtilTest, Trim) {\n  EXPECT_EQ(trim("  hello  "), "hello");\n  EXPECT_EQ(trim("  "), "");\n}',
    },
    {
      type: 'exposition',
      text: '### 集成测试\n\n测试**多个组件协作**，可能涉及文件 I/O、数据库等。\n特点：更接近真实场景，但更慢、更脆弱。',
      code: '// 集成测试：测试读写配置文件\nTEST(ConfigTest, SaveAndLoad) {\n  Config cfg;\n  cfg.set("key", "value");\n  cfg.save("test.cfg");\n  \n  Config loaded;\n  loaded.load("test.cfg");\n  EXPECT_EQ(loaded.get("key"), "value");\n}',
    },
    {
      type: 'exposition',
      text: '### 端到端测试\n\n测试**完整业务流程**，启动整个程序模拟用户操作。\n特点：最接近用户视角，但最慢、最难维护。',
    },
    {
      type: 'concept-cards',
      instruction: '测试组织的关键概念：',
      cards: [
        { glyph: '🔬', term: '单元测试', meaning: '测单个函数/类，快且隔离', example: '快速反馈' },
        { glyph: '🔗', term: '集成测试', meaning: '测组件间协作', example: '接近真实' },
        { glyph: '🎯', term: '覆盖率', meaning: '测试执行了多少代码', example: '行 / 分支 / 函数' },
        { glyph: '📁', term: '测试目录结构', meaning: '测试文件和源码对应', example: 'test/ 目录' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾 15（Google Test）：TEST(Group, Name) 的 Group 是什么？',
      options: [
        { text: '文件名', correct: false, explanation: 'Group 是测试组名，不是文件名' },
        { text: '测试集合（Test Suite）', correct: true, explanation: 'Group 是逻辑上的测试集合，方便组织相关测试' },
        { text: '函数名', correct: false, explanation: 'Name 才是测试用例名' },
        { text: '行号', correct: false, explanation: '和行号无关' },
      ],
    },
    {
      type: 'exposition',
      text: '### 测试目录组织\n\n推荐的目录结构：',
      code: 'project/\n├── src/\n│   ├── CMakeLists.txt\n│   ├── main.cpp\n│   ├── math.cpp\n│   └── math.h\n├── tests/\n│   ├── CMakeLists.txt\n│   ├── test_main.cpp       # 入口\n│   ├── test_math.cpp       # 测试 Math\n│   └── test_config.cpp     # 测试 Config\n└── CMakeLists.txt          # 顶层',
    },
    {
      type: 'exposition',
      text: '### CMake 组织测试\n\n用 `enable_testing` 和 `add_test` 注册测试，`ctest` 一键运行：',
      code: '# tests/CMakeLists.txt\nenable_testing()\n\nadd_executable(test_math test_math.cpp)\ntarget_link_libraries(test_math GTest::GTest)\nadd_test(NAME MathTest COMMAND test_math)',
    },
    {
      type: 'type-it',
      instruction: '用 CMake 注册测试：',
      code: 'cmake_minimum_required(VERSION 3.10)\nproject(MyProject)\n\nenable_testing()\n\nadd_executable(test_core\n  tests/test_core.cpp\n  src/core.cpp\n)\ntarget_link_libraries(test_core GTest::GTest)\nadd_test(NAME CoreTest COMMAND test_core)',
      hints: [
        'enable_testing() 启用测试支持',
        'add_test 注册可执行文件为测试',
        '运行 ctest 可以执行所有注册的测试',
      ],
    },
    {
      type: 'exposition',
      text: '### 覆盖率\n\n**代码覆盖率**度量测试执行了哪些代码：\n\n- **行覆盖率**：有多少行代码被执行了\n- **分支覆盖率**：if/else 每个分支都走了吗\n- **函数覆盖率**：每个函数都被调了吗\n\n覆盖率越高，漏测的可能性越低。但**100% 覆盖率 ≠ 没有 bug**。',
    },
    {
      type: 'multiple-choice',
      question: '以下哪种说法关于覆盖率是正确的？',
      options: [
        { text: '100% 覆盖率 = 没有 bug', correct: false, explanation: '覆盖率只能说明代码被执行了，不能证明逻辑正确' },
        { text: '覆盖率是衡量测试充分性的参考指标', correct: true, explanation: '覆盖率帮助发现未测到的路径，但不是绝对标准' },
        { text: '覆盖率没用，不用管', correct: false, explanation: '覆盖率是有价值的参考指标' },
        { text: '覆盖率只有行覆盖率一种', correct: false, explanation: '还有分支、函数、条件等多种覆盖率' },
      ],
    },
    {
      type: 'exposition',
      text: '### 在 CMake 中启用覆盖率（GCC）\n\n```bash\ncmake -DCMAKE_CXX_FLAGS="--coverage" -B build\ncmake --build build\nctest\n# 生成覆盖率报告\ngcov *.cpp\n```',
    },
    {
      type: 'multiple-choice',
      question: '集成测试和单元测试的主要区别是什么？',
      options: [
        { text: '集成测试更快', correct: false, explanation: '集成测试因涉及外部依赖通常更慢' },
        { text: '单元测试只测单个组件，集成测试测多个组件协作', correct: true, explanation: '单元测试隔离度高，集成测试更接近真实场景' },
        { text: '集成测试不需要测试框架', correct: false, explanation: '集成测试也需要断言和框架' },
        { text: '单元测试在 CI 中不运行', correct: false, explanation: '单元测试应该在 CI 中快速运行' },
      ],
    },
    {
      type: 'exposition',
      text: '### 持续集成（CI）中的测试\n\n每次提交代码，CI 自动：\n1. 编译项目\n2. 运行所有单元测试\n3. 运行集成测试\n4. 生成覆盖率报告\n5. 如果任何测试失败 → 阻止合并',
    },
    {
      type: 'exposition',
      text: '### 总结\n\n- 测试金字塔：单元 > 集成 > 端到端\n- `enable_testing()` + `add_test()` 注册测试\n- 覆盖率是衡量测试质量的参考指标\n- CI 中自动运行测试，防止回归',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '下一课（最终课）：阶段 19 综合复习——全面回顾工程化知识。',
    },
    {
      type: 'type-it',
      instruction: '用 CMake 和 ctest 组织测试：',
      code: '# tests/CMakeLists.txt\nenable_testing()\n\nadd_executable(test_util test_util.cpp)\ntarget_link_libraries(test_util GTest::GTest)\nadd_test(NAME UtilTest COMMAND test_util)\n\nadd_executable(test_core test_core.cpp)\ntarget_link_libraries(test_core GTest::GTest)\nadd_test(NAME CoreTest COMMAND test_core)',
      hints: [
        'enable_testing 需要在注册测试前调用',
        '每个测试可执行文件对应一个 add_test',
        'NAME 给测试命名方便识别',
      ],
    },
    {
      type: 'multiple-choice',
      question: 'ctest 命令的作用是什么？',
      options: [
        { text: '编译项目', correct: false, explanation: '编译还是 cmake --build' },
        { text: '运行所有通过 add_test 注册的测试', correct: true, explanation: 'ctest 自动发现并运行所有注册的测试' },
        { text: '生成覆盖率报告', correct: false, explanation: '覆盖率需要 gcov 等工具' },
        { text: '清理构建产物', correct: false, explanation: 'ctest 不负责清理' },
      ],
    },
  ],
}

export default lesson
