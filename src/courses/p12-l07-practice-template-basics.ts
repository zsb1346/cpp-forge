import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'practice-template-basics',
    chapter: 13,
    title: '模板基础练习',
    subtitle: '巩固 01-06',
    description: '综合练习函数模板、类模板、成员函数的基本用法，巩固前 6 课的概念。',
    objectives: ['能独立写出函数模板', '能独立写出类模板', '能综合运用模板基础语法'],
    estimatedMinutes: 12,
  },
  blocks: [
    {
      type: 'type-it',
      instruction: '写一个函数模板，返回两个参数中的较小值：',
      code: 'template<typename T>\nT myMin(T a, T b) {\n  return a < b ? a : b;\n}',
      hints: [
        'template<typename T> 放第一行',
        '返回值 T 和参数类型一致',
        '三目运算符 a < b ? a : b 返回较小值',
      ],
    },
    {
      type: 'type-it',
      instruction: '写一个求和模板函数（两个参数相加）：',
      code: 'template<typename T>\nT sum(T a, T b) {\n  return a + b;\n}',
      hints: [
        '要求 T 支持 + 运算符',
        '返回值类型也是 T',
        'int、double、string 都支持 +',
      ],
    },
    {
      type: 'type-it',
      instruction: '调用 myMin 模板，体验类型推导：',
      code: 'cout << myMin(10, 20) << endl;\ncout << myMin(3.14, 2.71) << endl;\ncout << myMin(\'Z\', \'A\') << endl;',
      hints: [
        'myMin(10, 20) 推导 T = int',
        'myMin(3.14, 2.71) 推导 T = double',
        '\'Z\' 和 \'A\' 是 char，按 ASCII 比较',
      ],
    },
    {
      type: 'code-runner',
      instruction: '补全 myMax 函数模板，返回较大的值：',
      code: `#include <iostream>
using namespace std;

// 补全下面的函数模板
template<typename T>
____ myMax(____ a, ____ b) {
  ____;
}

int main() {
  cout << myMax(3, 7) << endl;
  cout << myMax(2.5, 1.8) << endl;
  cout << myMax('x', 'm') << endl;
  return 0;
}`,
      expectedOutput: '7\n2.5\nx',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'exposition',
      text: '练习回顾：\n- 函数模板用 `template<typename T>` 开头\n- T 是类型占位符\n- 编译器在调用时自动推导 T',
    },
    {
      type: 'multiple-choice',
      question: '回顾 01-02：函数模板声明中的 `typename` 可以替换成什么？',
      options: [
        { text: 'typedef', correct: false, explanation: 'typedef 用于定义类型别名' },
        { text: 'class', correct: true, explanation: 'template<class T> 完全等价于 template<typename T>' },
        { text: 'struct', correct: false, explanation: 'struct 不能替代 typename' },
        { text: 'type', correct: false, explanation: 'C++ 中没有 type 关键字' },
      ],
    },
    {
      type: 'exposition',
      text: '现在复习类模板。先写一个简单的类模板 Container：',
      code: 'template<typename T>\nclass Container {\n  T data;\npublic:\n  void put(T d) { data = d; }\n  T get() const { return data; }\n};',
    },
    {
      type: 'type-it',
      instruction: '输入 Container 类模板：',
      code: 'template<typename T>\nclass Container {\n  T data;\npublic:\n  void put(T d) { data = d; }\n  T get() const { return data; }\n};',
      hints: [
        'T 可以出现在成员变量、参数、返回值中',
        '类内定义成员函数时不需要额外 template',
        'Container<int> 和 Container<string> 是不同的类',
      ],
    },
    {
      type: 'code-runner',
      instruction: '使用 Container 类模板存储不同类型的值：',
      code: `#include <iostream>
#include <string>
using namespace std;

template<typename T>
class Container {
  T data;
public:
  void put(T d) { data = d; }
  T get() const { return data; }
};

int main() {
  Container<int> ci;
  ci.put(100);
  cout << ci.get() << endl;

  Container<string> cs;
  cs.put("hello");
  cout << cs.get() << endl;

  return 0;
}`,
      expectedOutput: '100\nhello',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'multiple-choice',
      question: '回顾 05：类模板实例化时为什么必须写 <int> 而不能自动推导？',
      options: [
        { text: '因为类没有"调用"动作，没有参数供推导', correct: true, explanation: '类的实例化没有函数参数，无法推导' },
        { text: '因为编译器不支持类模板推导', correct: false, explanation: '不是编译器的问题，是语法设计如此' },
        { text: '因为 int 是默认类型', correct: false, explanation: '没有默认类型这回事' },
        { text: '因为可以自动推导，只是规范要求写', correct: false, explanation: '类模板确实不能自动推导' },
      ],
    },
    {
      type: 'exposition',
      text: '综合题：写一个类模板，成员函数在类外定义。',
      code: 'template<typename T>\nclass Storage {\n  T item;\npublic:\n  void save(T i);\n  T load() const;\n};\n\ntemplate<typename T>\nvoid Storage<T>::save(T i) {\n  item = i;\n}\n\ntemplate<typename T>\nT Storage<T>::load() const {\n  return item;\n}',
    },
    {
      type: 'type-it',
      instruction: '输入类外定义的 Storage 类模板：',
      code: 'template<typename T>\nclass Storage {\n  T item;\npublic:\n  void save(T i);\n  T load() const;\n};',
      hints: [
        '这里只有声明，没有定义',
        '类外定义需要加 template<typename T>',
        '类名写 Storage<T> 而非 Storage',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾 06：类模板成员函数类外定义时，以下哪个是正确的？',
      options: [
        { text: '和普通类一样，直接写函数名', correct: false, explanation: '必须加 template<typename T> 前缀' },
        { text: '需要 template<typename T> 前缀 + Box<T>::', correct: true, explanation: 'template 头和带参数的类名缺一不可' },
        { text: '只在声明处加 template，定义处不加', correct: false, explanation: '类外定义处也必须加 template' },
        { text: '只需要 Box<T>::，template 可以省略', correct: false, explanation: 'template 头不能省略' },
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全类模板 Storage 的 load 成员函数类外定义。',
      template: '____<____ T>\nT Storage<____>::____() const {\n  return item;\n}',
      answers: ['template', 'typename', 'T', 'load'],
      hints: ['第一空：模板关键字', '第二空：类型参数声明关键字', '第三空：类名后的模板参数', '第四空：函数名'],
    },
    {
      type: 'exposition',
      text: '综合练习最后一题：将你学到的所有模板知识串联起来。\n注意函数模板和类模板在语法和使用上的区别。',
    },
    {
      type: 'multiple-choice',
      question: '回顾 04：类型推导失败的场景是什么？',
      options: [
        { text: '参数都是同一类型', correct: false, explanation: '同类型参数推导很顺利' },
        { text: '两个参数类型不同', correct: true, explanation: '编译器无法确定 T 是哪个类型' },
        { text: '参数是 int 时', correct: false, explanation: 'int 推导没任何问题' },
        { text: '参数是 const 时', correct: false, explanation: 'const 不影响推导' },
      ],
    },
    {
      type: 'type-it',
      instruction: '写一个完整的函数模板，包含调用和输出：',
      code: 'template<typename T>\nT add(T a, T b) {\n  return a + b;\n}\n\nint main() {\n  cout << add(1, 2) << endl;\n  cout << add(1.5, 2.5) << endl;\n  return 0;\n}',
      hints: [
        'add(1, 2) 推导 T = int',
        'add(1.5, 2.5) 推导 T = double',
        '输出：3 和 4.0',
      ],
    },
    {
      type: 'exposition',
      text: '前 6 课的核心知识链：\n**模板动机** → **函数模板语法** → **实例化过程** → **类型推导** → **类模板** → **成员函数类外定义**\n你已经掌握了模板最基础、最核心的部分。',
      textAnimation: 'typewriter',
    },
  ],
}

export default lesson
