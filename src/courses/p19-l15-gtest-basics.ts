import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'gtest-basics',
    chapter: 20,
    title: 'Google Test 入门',
    subtitle: 'TEST/EXPECT_EQ/ASSERT_EQ',
    description: '用 Google Test 框架写 C++ 单元测试，掌握 TEST 宏和断言。',
    objectives: ['能编写 TEST 测试用例', '能使用 EXPECT_* 和 ASSERT_* 断言'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '**Google Test（gtest）**是 C++ 最流行的单元测试框架。\n用几个简单的宏，就能写出自动验证的测试。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '### 最简单的测试\n\n`TEST(测试组名称, 测试用例名称)`：',
      code: '#include <gtest/gtest.h>\n\nTEST(MathTest, AddWorks) {\n  EXPECT_EQ(2 + 2, 4);\n}',
    },
    {
      type: 'exposition',
      text: '### 运行测试\n\nCMake 中集成 gtest：',
      code: '# CMakeLists.txt 中的配置\nfind_package(GTest REQUIRED)\nadd_executable(test_runner test_main.cpp)\ntarget_link_libraries(test_runner GTest::GTest)\n\n# 编译并运行\ncmake -B build && cmake --build build\n./build/test_runner',
    },
    {
      type: 'exposition',
      text: '### 常用断言\n\n| 断言 | 检查 |\n|------|------|\n| `EXPECT_EQ(a, b)` | a == b |\n| `EXPECT_NE(a, b)` | a != b |\n| `EXPECT_TRUE(cond)` | cond 为 true |\n| `EXPECT_FALSE(cond)` | cond 为 false |\n| `ASSERT_EQ(a, b)` | 同 EXPECT_EQ，失败时停止当前测试 |\n| `EXPECT_THROW(stmt, ex)` | stmt 抛出 ex 异常 |',
    },
    {
      type: 'concept-cards',
      instruction: 'gtest 的核心概念：',
      cards: [
        { glyph: '🧪', term: 'TEST 宏', meaning: '定义一个测试用例', example: 'TEST(Suite, Name)' },
        { glyph: '✅', term: 'EXPECT_*', meaning: '非致命断言，失败后继续执行', example: 'EXPECT_EQ(a, b)' },
        { glyph: '🚫', term: 'ASSERT_*', meaning: '致命断言，失败后立即停止', example: 'ASSERT_EQ(a, b)' },
        { glyph: '📊', term: '测试组 (Test Suite)', meaning: '相关测试用例的集合', example: '所有 TEST(MySuite, ...)' },
      ],
    },
    {
      type: 'type-it',
      instruction: '写一个测试向量排序的用例：',
      code: '#include <gtest/gtest.h>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nTEST(SortTest, SortVector) {\n  vector<int> v = {3, 1, 4, 1, 5};\n  sort(v.begin(), v.end());\n  EXPECT_EQ(v[0], 1);\n  EXPECT_EQ(v[v.size()-1], 5);\n}',
      hints: [
        'TEST 第一个参数是测试组名',
        '排序后第一个元素应该是 1',
        '最后一个元素应该是 5',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾 14（为什么需要测试）：测试金字塔底层（数量最多）是什么？',
      options: [
        { text: '端到端测试', correct: false, explanation: '端到端测试在金字塔顶层，数量最少' },
        { text: '单元测试', correct: true, explanation: '单元测试快且轻量，应该写得最多' },
        { text: '集成测试', correct: false, explanation: '集成测试在中间层' },
        { text: '手动测试', correct: false, explanation: '手动测试不在金字塔中' },
      ],
    },
    {
      type: 'type-it',
      instruction: '测试一个计算平方的函数：',
      code: 'int square(int x) {\n  return x * x;\n}\n\nTEST(SquareTest, HandlesPositive) {\n  EXPECT_EQ(square(3), 9);\n  EXPECT_EQ(square(10), 100);\n}\n\nTEST(SquareTest, HandlesNegative) {\n  EXPECT_EQ(square(-3), 9);\n  EXPECT_EQ(square(-1), 1);\n}\n\nTEST(SquareTest, HandlesZero) {\n  EXPECT_EQ(square(0), 0);\n}',
      hints: [
        '正数、负数、0 都要测',
        '多个 TEST 用例可以同属一个测试组',
        '每个 TEST 是独立的测试用例',
      ],
    },
    {
      type: 'exposition',
      text: '### EXPECT_* vs ASSERT_*\n\n- `EXPECT_EQ`：断言失败后，测试**继续**执行，标记为失败\n- `ASSERT_EQ`：断言失败后，测试**立即停止**\n\n什么时候用 ASSERT？——后面的代码依赖前面的条件。\n比如指针不为空再用指针：`ASSERT_NE(ptr, nullptr)`；否则用 EXPECT。',
    },
    {
      type: 'code-runner',
      instruction: '用 gtest 测试字符串反转函数（模拟代码，仅展示概念）：',
      code: '#include <gtest/gtest.h>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nstring reverseStr(string s) {\n  reverse(s.begin(), s.end());\n  return s;\n}\n\nTEST(ReverseTest, BasicCases) {\n  EXPECT_EQ(reverseStr("abc"), "cba");\n  EXPECT_EQ(reverseStr(""), "");\n  EXPECT_EQ(reverseStr("a"), "a");\n}\n\nTEST(ReverseTest, Palindrome) {\n  EXPECT_EQ(reverseStr("aba"), "aba");\n}\n\nint main(int argc, char** argv) {\n  ::testing::InitGoogleTest(&argc, argv);\n  return RUN_ALL_TESTS();\n}',
      expectedOutput: '',
      comparison: 'none',
      editable: true,
    },
    {
      type: 'multiple-choice',
      question: 'TEST(MySuite, MyCase) 中 MySuite 和 MyCase 分别是什么？',
      options: [
        { text: 'MySuite 是测试组名，MyCase 是用例名', correct: true, explanation: '第一个参数是测试组，第二个是用例' },
        { text: 'MySuite 是文件名，MyCase 是行号', correct: false, explanation: '和文件位置无关' },
        { text: 'MySuite 是类名，MyCase 是方法名', correct: false, explanation: '不是类和方法' },
        { text: '两者都是随意标签', correct: false, explanation: '有组织结构，不是随意的' },
      ],
    },
    {
      type: 'exposition',
      text: '### main 函数\n\ngtest 需要一个 `main` 函数来初始化并运行所有测试：',
      code: 'int main(int argc, char** argv) {\n  ::testing::InitGoogleTest(&argc, argv);\n  return RUN_ALL_TESTS();\n}',
    },
    {
      type: 'type-it',
      instruction: '写完整的测试入口 + 一个测试用例：',
      code: '#include <gtest/gtest.h>\n\nint add(int a, int b) {\n  return a + b;\n}\n\nTEST(AddTest, PositiveNumbers) {\n  EXPECT_EQ(add(2, 3), 5);\n  EXPECT_EQ(add(10, 20), 30);\n}\n\nint main(int argc, char** argv) {\n  ::testing::InitGoogleTest(&argc, argv);\n  return RUN_ALL_TESTS();\n}',
      hints: [
        'InitGoogleTest 初始化 gtest',
        'RUN_ALL_TESTS() 运行所有 TEST 宏定义的测试',
        '返回值 0 表示全部通过',
      ],
    },
    {
      type: 'multiple-choice',
      question: 'EXPECT_EQ 和 ASSERT_EQ 的区别是什么？',
      options: [
        { text: 'EXPECT_EQ 更严格', correct: false, explanation: 'ASSERT_EQ 更严格（失败就停）' },
        { text: 'ASSERT_EQ 失败后当前测试立即终止', correct: true, explanation: 'ASSERT 是致命断言，失败即停止' },
        { text: 'EXPECT_EQ 只能比较整数', correct: false, explanation: 'EXPECT_EQ 可以比较任何有 == 的类型' },
        { text: '没有区别', correct: false, explanation: 'EXPECT 继续执行，ASSERT 终止' },
      ],
    },
    {
      type: 'exposition',
      text: '### Test Fixture（测试夹具）\n\n多个测试共享相同的设置：',
      code: 'class MathTest : public ::testing::Test {\nprotected:\n  void SetUp() override {\n    a = 10; b = 5;\n  }\n  int a, b;\n};\n\nTEST_F(MathTest, Add) {\n  EXPECT_EQ(a + b, 15);\n}\n\nTEST_F(MathTest, Subtract) {\n  EXPECT_EQ(a - b, 5);\n}',
    },
    {
      type: 'exposition',
      text: '### 总结\n\n- `TEST(Group, Name)` 定义测试用例\n- `EXPECT_*` 非致命断言，`ASSERT_*` 致命断言\n- 测试可自动运行，结果一目了然\n- Fixture 让多个测试共享设置',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '下一课：测试组织——单元测试、集成测试和覆盖率。',
    },
    {
      type: 'exposition',
      text: '### 单元测试的 FIRST 原则\n\n- **F**ast：快速，毫秒级运行\n- **I**solated：隔离，不依赖其他测试\n- **R**epeatable：可重复，每次结果一样\n- **S**elf-validating：自验证，不需要人工检查\n- **T**imely：及时，和代码一起写',
    },
  ],
}

export default lesson
