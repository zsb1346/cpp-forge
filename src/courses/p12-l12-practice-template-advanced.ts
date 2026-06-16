import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'practice-template-advanced',
    chapter: 13,
    title: '模板进阶练习',
    subtitle: '巩固 08-11',
    description: '综合练习多模板参数、非类型参数、全特化和偏特化，巩固模板进阶部分的核心概念。',
    objectives: ['能综合运用多参数、非类型参数', '能写出全特化和偏特化代码', '能区分各种模板技巧的适用场景'],
    estimatedMinutes: 12,
  },
  blocks: [
    {
      type: 'type-it',
      instruction: '写一个多参数模板函数，返回两个不同类型值的和（转换为 double）：',
      code: 'template<typename T, typename U>\ndouble sumAsDouble(T a, U b) {\n  return static_cast<double>(a + b);\n}',
      hints: [
        'T 和 U 可以是不同的类型',
        'a + b 的结果转换为 double',
        '调用：sumAsDouble(3, 4.5) 返回 7.5',
      ],
    },
    {
      type: 'type-it',
      instruction: '写一个非类型参数的函数模板，打印 N 次消息：',
      code: 'template<int N>\nvoid printN(const string& msg) {\n  for (int i = 0; i < N; i++) {\n    cout << msg << " ";\n  }\n}',
      hints: [
        'N 是 int 类型的非类型参数',
        '循环 N 次打印消息',
        '调用：printN<3>("hi")',
      ],
    },
    {
      type: 'code-runner',
      instruction: '实现一个固定大小的 Array 类模板（使用非类型参数 N）。补全 size 和 at 函数：',
      code: `#include <iostream>
#include <string>
using namespace std;

template<typename T, int N>
class Array {
  T data[N];
public:
  void set(int index, T value) {
    data[index] = value;
  }
  // 补全 size 函数
  int size() ____ {
    return ____;
  }
  // 补全 at 函数
  ____ at(int index) ____ {
    return data[index];
  }
};

int main() {
  Array<int, 3> arr;
  arr.set(0, 10);
  arr.set(1, 20);
  arr.set(2, 30);

  for (int i = 0; i < arr.size(); i++) {
    cout << arr.at(i) << " ";
  }
  cout << endl;
  cout << "Size: " << arr.size() << endl;
  return 0;
}`,
      expectedOutput: '10 20 30 \nSize: 3',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'exposition',
      text: '练习回顾：非类型参数 `<int N>` 让 Array 类在编译期确定大小，不需要动态内存。',
    },
    {
      type: 'multiple-choice',
      question: '回顾 08：多模板参数在尖括号中如何分隔？',
      options: [
        { text: '用分号分隔', correct: false, explanation: '不是分号' },
        { text: '用逗号分隔', correct: true, explanation: 'template<typename T, typename U>' },
        { text: '用空格分隔', correct: false, explanation: '空格不能区分参数' },
        { text: '用 & 分隔', correct: false, explanation: '不需要 &' },
      ],
    },
    {
      type: 'exposition',
      text: '现在练习**全特化**。先看一个通用模板的 max 函数，再为 const char* 写特化（比较字符串内容而非指针地址）：',
      code: 'template<typename T>\nT myMax(T a, T b) {\n  return a > b ? a : b;\n}\n\ntemplate<>\nconst char* myMax<const char*>(const char* a, const char* b) {\n  return strcmp(a, b) > 0 ? a : b;\n}',
    },
    {
      type: 'type-it',
      instruction: '输入 const char* 特化的 myMax：',
      code: 'template<>\nconst char* myMax<const char*>(const char* a, const char* b) {\n  return strcmp(a, b) > 0 ? a : b;\n}',
      hints: [
        'template<> 表示全特化',
        '用 strcmp 比较字符串内容',
        '返回字典序更大的字符串指针',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾 09：非类型模板参数的值必须在什么时候确定？',
      options: [
        { text: '运行时', correct: false, explanation: '必须在编译期确定' },
        { text: '编译期', correct: true, explanation: '非类型参数是编译期常量' },
        { text: '链接时', correct: false, explanation: '链接时已经实例化完毕' },
        { text: '加载时', correct: false, explanation: '加载时已经太晚了' },
      ],
    },
    {
      type: 'exposition',
      text: '现在练习**偏特化**。为前面写的 Wrapper 类添加指针偏特化：',
      code: 'template<typename T>\nclass Wrapper {\n  T data;\npublic:\n  Wrapper(T d) : data(d) {}\n  T get() const { return data; }\n};\n\ntemplate<typename T>\nclass Wrapper<T*> {\n  T* data;\npublic:\n  Wrapper(T* d) : data(d) {}\n  T get() const { return *data; }\n};',
    },
    {
      type: 'type-it',
      instruction: '输入指针偏特化并测试：',
      code: 'Wrapper<int> w1(42);  // 主模板\nint x = 100;\nWrapper<int*> w2(&x);  // 偏特化\ncout << w1.get() << " " << w2.get();',
      hints: [
        'w1 用主模板，data 是 int',
        'w2 用偏特化，get 自动解引用',
        '输出：42 100',
      ],
    },
    {
      type: 'code-runner',
      instruction: '完整的偏特化测试：写一个类模板并验证偏特化行为。',
      code: `#include <iostream>
using namespace std;

template<typename T>
class Wrapper {
  T data;
public:
  Wrapper(T d) : data(d) {}
  T get() const { return data; }
};

template<typename T>
class Wrapper<T*> {
  T* data;
public:
  Wrapper(T* d) : data(d) {}
  T get() const { return *data; }
};

int main() {
  Wrapper<int> a(5);
  cout << a.get() << endl;

  int val = 99;
  Wrapper<int*> b(&val);
  cout << b.get() << endl;

  val = 200;
  cout << b.get() << endl;
  return 0;
}`,
      expectedOutput: '5\n99\n200',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'multiple-choice',
      question: '回顾 10：全特化的 template 尖括号为什么是空的？',
      options: [
        { text: '因为所有参数都指定了具体类型，不再需要参数', correct: true, explanation: '全特化不再有未指定的类型参数' },
        { text: '因为忘记写了', correct: false, explanation: '设计如此' },
        { text: '因为要隐藏参数', correct: false, explanation: '和隐藏无关' },
        { text: '因为模板已经被禁用了', correct: false, explanation: '模板仍然有效' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾 11：偏特化和全特化的核心区别？',
      options: [
        { text: '偏特化只特化部分参数，全特化特化全部', correct: true, explanation: '这是最核心的区别' },
        { text: '偏特化只能用于函数模板', correct: false, explanation: '偏特化不能用于函数模板，只能用于类模板' },
        { text: '全特化更慢', correct: false, explanation: '没有性能区别' },
        { text: '偏特化不需要主模板', correct: false, explanation: '偏特化和全特化都需要主模板' },
      ],
    },
    {
      type: 'exposition',
      text: '模板进阶部分的知识链：\n**多参数** → **非类型参数** → **全特化** → **偏特化**\n你已经掌握了 C++ 模板的核心机制。接下来是模板的细节和最佳实践。',
      textAnimation: 'typewriter',
    },
    {
      type: 'type-it',
      instruction: '用一个 Pair 类模板测试全特化行为：',
      code: 'Pair<int, int> samePair(1, 2);  // 走偏特化\nPair<int, string> diffPair(1, "hello");  // 走主模板',
      hints: [
        'Pair<int, int> 两个参数相同，走偏特化',
        'Pair<int, string> 两个参数不同，走主模板',
        '编译器会在编译期选择合适的版本',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾 09：非类型模板参数 int N 中 N 必须是？',
      options: [
        { text: '运行时确定的变量', correct: false, explanation: '必须是编译期常量' },
        { text: '编译期常量', correct: true, explanation: 'N 在编译期必须已知' },
        { text: '用户输入的值', correct: false, explanation: '用户输入是运行时的' },
        { text: '函数返回值', correct: false, explanation: '函数返回值是运行时的' },
      ],
    },
    {
      type: 'type-it',
      instruction: '完整运行一个偏特化的例子：',
      code: 'int main() {\n  int x = 10, y = 20;\n  Pair<int, int> a(x, y);\n  cout << a.getFirst() << " " << a.getSecond();\n  return 0;\n}',
      hints: [
        'Pair<int, int> 触发偏特化',
        '两个参数类型相同',
        '偏特化版本可能有额外成员函数',
      ],
    },
    {
      type: 'exposition',
      text: '总结本练习课：你练习了多参数、非类型参数、全特化、偏特化。\n这些是 C++ 模板最强大的特性——灵活、高效、类型安全。',
    },
  ],
}

export default lesson
