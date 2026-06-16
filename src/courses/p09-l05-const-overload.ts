import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'const-overload',
    chapter: 10,
    title: 'const 重载',
    subtitle: '常对象调常版本',
    description: '学习如何通过 const 重载成员函数——常对象调用 const 版本，普通对象调用普通版本。',
    objectives: ['能写出 const 重载函数', '理解 const 对象只能调 const 函数'],
    estimatedMinutes: 8,
  },
  blocks: [
    {
      type: 'exposition',
      text: '同一个函数名，可以通过加 `const` 来提供两个版本。\n这就是 **const 重载**。',
      code: 'class Array {\n  int& operator[](int i);       // 普通对象\n  const int& operator[](int i) const; // const 对象\n};',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '为什么需要两个版本？\n- 普通对象调用普通版本——返回可修改的引用\n- const 对象调用 const 版本——返回只读的引用',
    },
    {
      type: 'multiple-choice',
      question: '回顾：const 成员函数承诺什么？',
      options: [
        { text: '返回值是 const', correct: false, explanation: '承诺的是不修改成员变量' },
        { text: '不修改成员变量', correct: true, explanation: 'const 成员函数不能修改成员变量' },
        { text: '函数不能被调用', correct: false, explanation: 'const 函数可以被调用' },
        { text: '参数是 const', correct: false, explanation: 'const 修饰的是函数本身不是参数' },
      ],
    },
    {
      type: 'exposition',
      text: '看一个完整的例子：',
      code: 'class MyString {\n  char data[100];\npublic:\n  char& get(int i) {       // 非 const：返回可修改\n    return data[i];\n  }\n  const char& get(int i) const { // const：返回只读\n    return data[i];\n  }\n};',
    },
    {
      type: 'concept-cards',
      instruction: 'const 重载的核心：',
      cards: [
        { glyph: '👤', term: '普通对象', meaning: '调用非 const 版本，可读写', example: "MyString s; s.get(0) = 'A';" },
        { glyph: '🔒', term: 'const 对象', meaning: '只能调 const 版本，只读', example: 'const MyString s; s.get(0);' },
      ],
    },
    {
      type: 'type-it',
      instruction: '定义一个 const 重载的 get 函数：',
      code: 'class Container {\n  int data[10];\npublic:\n  int& get(int idx) {\n    return data[idx];\n  }\n  const int& get(int idx) const {\n    return data[idx];\n  }\n};',
      hints: [
        '两个 get 函数参数相同，但一个带 const 一个不带',
        '非 const 版本返回 int&，可以修改',
        'const 版本返回 const int&，只读',
      ],
    },
    {
      type: 'multiple-choice',
      question: 'const 对象调用成员函数时，编译器会选择哪个版本？',
      options: [
        { text: '报错，const 对象不能调函数', correct: false, explanation: 'const 对象可以调 const 成员函数' },
        { text: '优先调非 const 版本', correct: false, explanation: 'const 对象只能调 const 版本' },
        { text: '只能调 const 版本', correct: true, explanation: 'const 对象自动选择 const 重载' },
        { text: '随机选一个', correct: false, explanation: '编译器根据对象的 const 属性选择' },
      ],
    },
    {
      type: 'exposition',
      text: '如果没有 const 版本的函数，const 对象调普通函数会编译报错。\n这就是为什么很多类既提供 const 又提供非 const 版本。',
      code: 'const Container c;\nc.get(0) = 5;  // 如果有 const 版本：编译错误（返回 const int&，不能赋值）\n               // 如果没有 const 版本：编译错误（const 对象不能调非 const 函数）',
    },
    {
      type: 'type-it',
      instruction: 'const 对象只能调 const 版本的函数：',
      code: 'const Container c;\nint val = c.get(0);  // 调 const 版本，可以',
      hints: [
        'c 是 const 对象',
        'c.get(0) 自动匹配 const 版本',
        '返回的是 const int&，只能读不能写',
      ],
    },
    {
      type: 'exposition',
      text: '一个小技巧：如果两个版本代码一样，可以让非 const 版本调用 const 版本，避免重复。\n（但这是进阶技巧，初学阶段了解就行）',
    },
    {
      type: 'multiple-choice',
      question: '普通对象调用一个既有 const 又有非 const 重载的函数时：',
      options: [
        { text: '一定会调 const 版本', correct: false, explanation: '普通对象优先调非 const 版本' },
        { text: '一定会调非 const 版本', correct: true, explanation: '普通对象优先匹配非 const 版本' },
        { text: '编译器报错，有歧义', correct: false, explanation: '没有歧义，编译器会根据对象类型选择' },
        { text: '需要手动指定版本', correct: false, explanation: '编译器自动选择' },
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全 const 重载的函数声明。',
      template: 'char& get(int i);\n____ ____ get(int i) ____;',
      answers: ['const', 'char&', 'const'],
      hints: ['第一空：返回值类型不变', '第二空：const 版本返回的引用类型', '第三空：函数后面的 const'],
    },
    {
      type: 'exposition',
      text: 'const 重载的典型场景：\n1. `operator[]`——下标访问\n2. getter 函数\n3. 迭代器相关函数',
    },
    {
      type: 'multiple-choice',
      question: '以下哪个说法正确？',
      options: [
        { text: 'const 重载的函数参数列表必须不同', correct: false, explanation: '参数列表可以相同，靠函数本身的 const 区分' },
        { text: 'const 重载的函数参数列表和 const 性共同区分', correct: true, explanation: 'const 重载是函数签名的一部分' },
        { text: '不能同时有 const 和非 const 版本', correct: false, explanation: '这是合法的重载' },
        { text: 'const 版本必须有 const 返回值', correct: false, explanation: '不一定，但通常 const 版本返回 const 引用' },
      ],
    },
    {
      type: 'type-it',
      instruction: '练习完整的 const 重载类：',
      code: 'class ScoreBoard {\n  int scores[5];\npublic:\n  int& operator[](int i) {\n    return scores[i];\n  }\n  const int& operator[](int i) const {\n    return scores[i];\n  }\n};',
      hints: [
        '非 const 版本返回 int& 允许修改',
        'const 版本返回 const int& 只读',
        'const 对象用 [] 时调 const 版本',
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全 const 重载的下标运算符。',
      template: 'class Array {\n  int data[10];\npublic:\n  ____& operator[](int i) { return data[i]; }\n  ____ ____& operator[](int i) ____ { return data[i]; }\n};',
      answers: ['int', 'const', 'int', 'const'],
      hints: ['第一空：非 const 版本返回类型', '第二空：const 版本修饰符', '第三空：const 版本返回类型', '第四空：const 函数修饰'],
    },
    {
      type: 'multiple-choice',
      question: '回顾 04：const 成员函数能修改 static 成员变量吗？',
      options: [
        { text: '不能，const 函数不能修改任何成员', correct: false, explanation: 'static 成员不属于对象，const 不限制' },
        { text: '可以，因为 static 成员不属于某个对象', correct: true, explanation: 'const 限制的是对象成员，static 是类级别的' },
        { text: '取决于编译器的实现', correct: false, explanation: '语言标准明确规定可以' },
        { text: '只能读不能写', correct: false, explanation: 'static 成员可读可写' },
      ],
    },
    {
      type: 'exposition',
      text: 'const 重载在实际代码中很常见。\n比如标准库的 `std::vector` 的 `operator[]` 就有 const 和非 const 两个版本。',
    },
    {
      type: 'exposition',
      text: '总结：const 重载让同一个函数既能被普通对象修改，又能被 const 对象只读访问。\n这是 C++ 提供类型安全的重要方式。',
      textAnimation: 'typewriter',
    },
  ],
}

export default lesson