import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'practice-forwarding',
    chapter: 12,
    title: '完美转发练习',
    subtitle: '巩固 06-09',
    description: '综合练习完美转发——转发引用、std::forward、引用折叠的综合运用。',
    objectives: ['能综合使用转发引用和 forward', '能写出完美转发的函数模板', '能理解什么时候需要完美转发'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '练习课！把完美转发相关的四个概念串起来——\n转发动机、转发引用、std::forward、引用折叠。',
      textAnimation: 'typewriter',
    },
    {
      type: 'type-it',
      instruction: '写出完美转发的"三件套"：',
      code: 'template<typename T>\nvoid relay(T&& x) {\n  process(std::forward<T>(x));\n}',
      hints: ['T&& 是转发引用，左右值都能接', 'std::forward<T> 保持原有属性', '如果不用 forward，x 永远是左值'],
    },
    {
      type: 'type-it',
      instruction: '写一个完美转发的双参数版本：',
      code: 'template<typename T, typename U>\nvoid relay(T&& a, U&& b) {\n  process(std::forward<T>(a), std::forward<U>(b));\n}',
      hints: ['每个参数各自推导类型', '每个参数各自 forward', '变长参数可用 ...Args'],
    },
    {
      type: 'code-runner',
      instruction: '补全完美转发封装函数，使左右值版本都能正确触发。',
      code: `#include <iostream>
using namespace std;

void action(int& x)  { cout << "左值: " << x << endl; }
void action(int&& x) { cout << "右值: " << x << endl; }

// TODO: 实现完美转发函数模板 relay
// relay(a) → 输出 "左值"
// relay(42) → 输出 "右值"


int main() {
  int a = 10;
  relay(a);
  relay(42);
}`,
      expectedOutput: '左值: 10\n右值: 42',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'exposition',
      text: '上一题的答案：',
      code: 'template<typename T>\nvoid relay(T&& x) {\n  action(std::forward<T>(x));\n}',
    },
    {
      type: 'code-runner',
      instruction: '实现一个 make_wrapper 工厂函数，完美转发参数构造对象。\n预期输出 "移动构造"。',
      code: `#include <iostream>
using namespace std;

class Widget {
  string name;
public:
  Widget(const string& s) : name(s) {
    cout << "拷贝构造" << endl;
  }
  Widget(string&& s) : name(move(s)) {
    cout << "移动构造" << endl;
  }
};

// TODO: 实现完美转发工厂函数 make_widget
// 使得传入右值字符串时触发移动构造


int main() {
  string s = "hello";
  make_widget(s);       // 拷贝构造
  make_widget("temp");   // 移动构造（string 从 const char* 构造后是右值）
}`,
      expectedOutput: '拷贝构造\n移动构造',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'multiple-choice',
      question: '完美转发解决的问题是什么？',
      options: [
        { text: '参数类型不匹配', correct: false, explanation: '不是类型问题' },
        { text: '传参时左右值属性丢失', correct: true, explanation: '右值传入函数后变成左值，需要保持原属性' },
        { text: '代码太长', correct: false, explanation: '和代码长度无关' },
        { text: '模板编译太慢', correct: false, explanation: '和编译速度无关' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '复习：引用折叠 `int&& &&` 的结果是什么？',
      options: [
        { text: 'int&', correct: false, explanation: '两个 && 不会产生 &' },
        { text: 'int&&', correct: true, explanation: '两个右值引用折叠还是右值引用' },
        { text: 'int', correct: false, explanation: '折叠保留引用属性' },
        { text: '编译错误', correct: false, explanation: '模板推导中允许引用折叠' },
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全完美转发函数：',
      template: 'template<typename T>\nvoid relay(T&& x) {\n  process(____<T>(x));\n}',
      answers: ['std::forward'],
      hints: ['保持左右值属性的标准库函数', '别忘了前面的 std::'],
    },
    {
      type: 'type-it',
      instruction: '写一个变长参数的完美转发：',
      code: 'template<typename... Args>\nvoid relay(Args&&... args) {\n  target(std::forward<Args>(args)...);\n}',
      hints: ['...Args 是变长模板参数包', '每个参数独立推导转发引用', '... 是包展开语法'],
    },
    {
      type: 'type-it',
      instruction: '写一个转发引用函数，判断传入的是左值还是右值：',
      code: 'template<typename T>\nvoid categorize(T&& x) {\n  if constexpr (is_lvalue_reference_v<T>) {\n    cout << "左值\\n";\n  } else {\n    cout << "右值\\n";\n  }\n}',
      hints: ['is_lvalue_reference_v 检查 T 是否是左值引用', 'if constexpr 是编译期分支', '传左值 T 推导为 T&，传右值 T 推导为 T'],
    },
    {
      type: 'multiple-choice',
      question: '复习：引用折叠 `T& &&` 的结果是什么？',
      options: [
        { text: 'T&', correct: true, explanation: '只要有 & 就是 &' },
        { text: 'T&&', correct: false, explanation: '两个 && 才是 &&' },
        { text: 'T', correct: false, explanation: '引用折叠不消除引用' },
        { text: '未定义', correct: false, explanation: '这是标准规定的折叠规则' },
      ],
    },
    {
      type: 'exposition',
      text: '完美转发四概念的逻辑链条：\n1. **动机**：普通传参丢失左右值 ← 为什么需要\n2. **转发引用**：`T&&` 绑左右值 ← 用什么接\n3. **std::forward**：保持原样 ← 怎么传\n4. **引用折叠**：底层机制 ← 为什么能工作',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '完美转发的几个关键记忆点：\n- `T&&` 是转发引用（模板推导时）\n- `std::forward<T>` 保持左右值\n- 引用折叠提供底层支持\n- 工厂、容器、包装器都依赖它',
    },
    {
      type: 'exposition',
      text: '对比总结：移动语义 vs 完美转发\n- 移动语义：把左值变成右值，偷资源\n- 完美转发：保持原有左右值，原样传递\n- 共同目标：减少不必要的拷贝',
    },
    {
      type: 'exposition',
      text: '记住三个"绝不"：\n1. 绝不移动 const 对象\n2. 绝不用 forward 代替 move\n3. 绝不在非模板参数上用 forward',
    },
    {
      type: 'exposition',
      text: '最终练习：\n试着不看代码写出完美转发的完整模式。\n`template<typename T> void relay(T&& x) { target(forward<T>(x)); }`',
    },
    {
      type: 'exposition',
      text: '阶段 11 到这里结束了。\n你已经掌握了现代 C++ 移动语义和完美转发的核心知识。\n这是后续学习 STL 源码和高级模板编程的重要基础。',
      textAnimation: 'typewriter',
    },
  ],
}

export default lesson
