import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'phase12-review',
    chapter: 13,
    title: '阶段 12 综合复习',
    subtitle: '模板总复习',
    description: '全面回顾阶段 12 的模板基础知识：函数模板、类模板、实例化、推导、特化、偏特化、编译模型。',
    objectives: ['能综合运用所有模板语法', '能辨析各种模板技巧的适用场景', '能正确组织模板代码'],
    estimatedMinutes: 12,
  },
  blocks: [
    {
      type: 'multiple-choice',
      question: '为什么需要函数模板——模板要解决的核心问题是什么？',
      options: [
        { text: '让函数调用更快', correct: false, explanation: '模板不影响运行速度' },
        { text: '消除重载中逻辑相同但类型不同的代码重复', correct: true, explanation: '写一次模板，编译器生成所有类型的版本' },
        { text: '让 C++ 支持面向对象', correct: false, explanation: '模板是泛型编程，不是 OOP' },
        { text: '替代宏定义', correct: false, explanation: '模板和宏是两回事' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾 02/04：函数模板调用时 `max(3, 7)` 编译器怎么知道 T 是什么？',
      options: [
        { text: '需要程序员显式写 <int>', correct: false, explanation: '可以自动推导' },
        { text: '编译器从参数类型自动推导 T', correct: true, explanation: '3 和 7 是 int，所以 T = int' },
        { text: 'T 默认是 int', correct: false, explanation: '没有默认类型' },
        { text: 'T 是运行时的动态类型', correct: false, explanation: '推导在编译期' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾 03/10：模板全特化的 `template<>` 尖括号为什么是空的？',
      options: [
        { text: '因为所有类型参数已经被具体类型取代', correct: true, explanation: '没有需要保留的类型参数了' },
        { text: '因为忘记写了', correct: false, explanation: '设计就是空的' },
        { text: '因为特化不需要 template 关键字', correct: false, explanation: '特化也需要 template，只是尖括号为空' },
        { text: '因为模板参数被删除了', correct: false, explanation: '参数被替换了，不是删除' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾 11：偏特化和函数重载有什么相似之处？',
      options: [
        { text: '都根据参数类型选择不同的实现', correct: true, explanation: '偏特化根据模板参数匹配，重载根据函数参数匹配' },
        { text: '都只能用于类', correct: false, explanation: '重载可用于函数，偏特化只能用于类' },
        { text: '都需要运行时判断', correct: false, explanation: '都在编译期决定' },
        { text: '两者完全没有关系', correct: false, explanation: '概念上有相似性' },
      ],
    },
    {
      type: 'concept-cards',
      instruction: '阶段 12 核心概念一览：',
      cards: [
        { glyph: '📐', term: '函数模板', meaning: '类型参数化的函数，写一次用所有类型', example: 'template<typename T> T max(T,T)' },
        { glyph: '📦', term: '类模板', meaning: '类型参数化的类，实例化时必须 <类型>', example: 'template<typename T> class Box{}' },
        { glyph: '🛠️', term: '实例化', meaning: '编译器用具体类型替换 T 生成代码', example: 'max(3,7) 生成 int max(int,int)' },
        { glyph: '🔍', term: '类型推导', meaning: '调用时自动从参数推断 T', example: 'max(1,2) 自动 T=int' },
        { glyph: '🔢', term: '多/非类型参数', meaning: '多个类型参数或值作为参数', example: '<typename T, int N>' },
        { glyph: '✂️', term: '特化/偏特化', meaning: '给特定类型或模式开小灶', example: 'template<> class Box<bool>' },
      ],
    },
    {
      type: 'code-runner',
      instruction: '实现一个通用的 Printer 类模板 + 特化版本。补全代码使得程序正确输出：',
      code: `#include <iostream>
#include <string>
using namespace std;

// 通用模板：直接打印值
template<typename T>
class Printer {
public:
  void print(const T& val) {
    cout << ____ << endl;
  }
};

// 特化：bool 类型打印 "true" 或 "false"
____<>
class Printer<____> {
public:
  void print(____ val) {
    cout << ____ << endl;
  }
};

int main() {
  Printer<int> p1;
  p1.print(42);

  Printer<double> p2;
  p2.print(3.14);

  Printer<bool> p3;
  p3.print(true);
  p3.print(false);

  return 0;
}`,
      expectedOutput: '42\n3.14\ntrue\nfalse',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'exposition',
      text: '本阶段你学会了：\n1. 为什么需要模板——告别重载重复\n2. 函数模板语法——`template<typename T>`\n3. 实例化过程——编译器生成代码\n4. 类型推导——不写 `<int>` 也可以\n5. 类模板——类型参数化的类\n6. 成员函数类外定义——也要 template\n7. 多模板参数——`<typename T, typename U>`\n8. 非类型参数——`<int N>` 传值\n9. 全特化——给特定类型开小灶\n10. 偏特化——部分参数特化\n11. typename vs class——等价但有坑\n12. 编译模型——模板为什么写在 .h 里',
      textAnimation: 'typewriter',
    },
    {
      type: 'multiple-choice',
      question: '回顾 14：模板为什么必须放在头文件中？',
      options: [
        { text: '让编译更快', correct: false, explanation: '实际是让编译更慢（需实例化）' },
        { text: '因为实例化需要完整定义，不能跨文件', correct: true, explanation: '编译器在编译期需要看到完整模板定义才能生成代码' },
        { text: '因为 .h 是唯一可以写模板的地方', correct: false, explanation: '技术上 .cpp 也能写，但跨文件不方便' },
        { text: '因为链接器不支持模板', correct: false, explanation: '链接器不处理模板，但这是结果不是原因' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾 13：访问依赖类型时为什么必须加 typename？',
      options: [
        { text: '不加 typename 编译器会当成静态成员或值', correct: true, explanation: '编译器无法区分依赖名字是类型还是值，typename 消除歧义' },
        { text: '这是 C++ 的风格要求，不加也行', correct: false, explanation: '不加会编译错误' },
        { text: '因为 class 关键字不够用', correct: false, explanation: '依赖类型前必须用 typename，class 不行' },
        { text: '为了代码更易读', correct: false, explanation: '主要是语法要求，不只是风格' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾 05：类模板和函数模板的一个关键区别是什么？',
      options: [
        { text: '类模板不能有多个参数', correct: false, explanation: '类模板可以有多个参数' },
        { text: '类模板不能自动推导，必须显式指定参数', correct: true, explanation: '类模板实例化时必须写 <类型>' },
        { text: '类模板不支持特化', correct: false, explanation: '类模板支持全特化和偏特化' },
        { text: '类模板的语法完全不同', correct: false, explanation: '都用 template<...> 声明' },
      ],
    },
    {
      type: 'type-it',
      instruction: '写一个完整的类模板 Storage，包含类外成员函数定义：',
      code: 'template<typename T>\nclass Storage {\n  T data;\npublic:\n  void save(const T& d);\n  T load() const;\n};\n\ntemplate<typename T>\nvoid Storage<T>::save(const T& d) {\n  data = d;\n}\n\ntemplate<typename T>\nT Storage<T>::load() const {\n  return data;\n}',
      hints: [
        '类内只有函数声明',
        '类外定义要加 template<typename T>',
        '类名要写 Storage<T> 而不是 Storage',
      ],
    },
    {
      type: 'type-it',
      instruction: '使用非类型模板参数，创建一个固定大小数组：',
      code: 'template<typename T, int N>\nclass FixedArray {\n  T data[N];\npublic:\n  int size() const { return N; }\n  T& operator[](int i) { return data[i]; }\n};',
      hints: [
        'N 是编译期常量，决定数组大小',
        'FixedArray<int, 10> 创建 10 个 int 的数组',
        'operator[] 支持下标访问',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾 07/12：练习课中你练习了哪些模板技能？',
      options: [
        { text: '只练习了函数模板', correct: false, explanation: '练习课涵盖函数模板和类模板' },
        { text: '函数模板、类模板、特化、偏特化都有涉及', correct: true, explanation: '基础练习和进阶练习覆盖了全部内容' },
        { text: '只练习了类模板', correct: false, explanation: '函数模板也是重点' },
        { text: '没有练习，只有概念', correct: false, explanation: '练习课包含了大量动手环节' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾 06：类模板的成员函数类外定义为什么要加 template<typename T>？',
      options: [
        { text: '为了让函数运行更快', correct: false, explanation: '和性能无关' },
        { text: '为了告诉编译器这是模板类的成员函数，需要依赖模板参数', correct: true, explanation: '编译器需要知道 T 的来源' },
        { text: '这是可选的，加不加都行', correct: false, explanation: '这是必须的语法' },
        { text: '为了让代码变长', correct: false, explanation: '语法规定，非为变长' },
      ],
    },
    {
      type: 'type-it',
      instruction: '最后写一个完整的模板程序——使用函数模板 + 类模板：',
      code: 'template<typename T>\nT square(T x) {\n  return x * x;\n}\n\ntemplate<typename T>\nclass Printer {\n  T value;\npublic:\n  Printer(T v) : value(v) {}\n  void print() const { cout << value << endl; }\n};',
      hints: [
        'square 是函数模板',
        'Printer 是类模板',
        '两者使用同样的 template<typename T> 语法',
      ],
    },
    {
      type: 'multiple-choice',
      question: '本阶段最重要的收获是什么？',
      options: [
        { text: '模板语法很复杂学不完', correct: false, explanation: '你已经掌握了核心部分' },
        { text: '模板消除重复，类型也是参数', correct: true, explanation: '模板的核心思想是类型参数化' },
        { text: '模板只能用于类', correct: false, explanation: '模板同样适用于函数' },
        { text: '模板完全不需要学', correct: false, explanation: '模板是现代 C++ 的核心特性' },
      ],
    },
    {
      type: 'exposition',
      text: '阶段 12 到此结束！你已掌握 C++ 模板的核心基础。\n下一阶段将进入 **STL（标准模板库）**——学会使用 C++ 标准库提供的容器、迭代器和算法。',
      textAnimation: 'typewriter',
    },
    {
      type: 'type-it',
      instruction: '最后一个练习：写一个带默认值的模板？不用——那是后面的事。\n写一个最纯净的函数模板吧：',
      code: 'template<typename T>\nbool isEqual(T a, T b) {\n  return a == b;\n}',
      hints: [
        'isEqual 比较两个 T 类型值是否相等',
        '要求 T 支持 == 运算符',
        '调用 isEqual(1, 1) 返回 true',
      ],
    },
  ],
}

export default lesson
