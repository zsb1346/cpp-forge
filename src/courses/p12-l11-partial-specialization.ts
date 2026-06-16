import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'partial-specialization',
    chapter: 13,
    title: '偏特化',
    subtitle: '部分参数特化',
    description: '掌握偏特化——只特化模板的部分参数，而不是全部。偏特化只适用于类模板，是特化的更灵活形式。',
    objectives: ['能解释偏特化和全特化的区别', '能写出类模板的偏特化版本', '理解偏特化只适用于类模板'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '**全特化**（上一课）：所有模板参数都指定具体类型。\n**偏特化**：只指定部分参数，保留其他参数为通用形式。\n偏特化只适用于**类模板**，函数模板不支持。',
      code: '// 主模板：两个类型参数\n template<typename T, typename U>\nclass Pair {\n  T first;\n  U second;\n};\n\n// 偏特化：两个参数相同\n template<typename T>\nclass Pair<T, T> {\n  T first;\n  T second;\n  T same() const { return first; }\n};',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '偏特化的关键区别：\n- `template<typename T>` — 尖括号里**不是空的**，只列出未特化的参数\n- `Pair<T, T>` — 类名后的尖括号里写部分特化后的参数列表\n- 这里 T 和 U 都是 T，即两个参数相同',
    },
    {
      type: 'concept-cards',
      instruction: '全特化 vs 偏特化：',
      cards: [
        { glyph: '⚡', term: '全特化', meaning: '所有参数都指定具体类型', example: 'template<> class Box<bool>' },
        { glyph: '🔧', term: '偏特化', meaning: '只特化部分参数', example: 'template<T> class Pair<T,T>' },
        { glyph: '🎯', term: '适用对象', meaning: '全特化可用于函数和类，偏特化只能用于类', example: '函数模板没有偏特化' },
      ],
    },
    {
      type: 'type-it',
      instruction: '输入偏特化的 Pair：',
      code: 'template<typename T>\nclass Pair<T, T> {\n  T first;\n  T second;\npublic:\n  T getSame() const { return first; }\n};',
      hints: [
        'template<typename T> 只保留 T 作为参数',
        'Pair<T, T> 表示两个参数都是同一类型',
        '偏特化可以添加主模板没有的成员函数',
      ],
    },
    {
      type: 'exposition',
      text: '再举一个例子：指针类型的偏特化。\n主模板可以处理任何类型，但指针类型可能需要特殊处理。',
      code: '// 主模板\n template<typename T>\nclass Box {\n  T value;\npublic:\n  T get() const { return value; }\n};\n\n// 偏特化：T 是指针时\n template<typename T>\nclass Box<T*> {\n  T* ptr;\npublic:\n  T get() const { return *ptr; }  // 自动解引用\n};',
    },
    {
      type: 'type-it',
      instruction: '输入指针偏特化版本：',
      code: 'template<typename T>\nclass Box<T*> {\n  T* ptr;\npublic:\n  Box(T* p) : ptr(p) {}\n  T get() const { return *ptr; }\n};',
      hints: [
        'template<typename T> 中 T 是指向的对象的类型',
        'Box<T*> 匹配所有指针类型的实例化',
        'get() 自动解引用返回指向的值',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾 10：全特化的 template 尖括号里是什么？',
      options: [
        { text: 'template<typename T>', correct: false, explanation: '全特化尖括号是空的' },
        { text: 'template<>', correct: true, explanation: '全特化用空的 template<>' },
        { text: 'template<typename T, typename U>', correct: false, explanation: '全特化不需要类型参数了' },
        { text: 'template<class>', correct: false, explanation: '全特化的尖括号是空的' },
      ],
    },
    {
      type: 'exposition',
      text: '偏特化的匹配规则：**编译器会选择最特化的版本**。\n- `Box<int>` → 主模板（T = int）\n- `Box<int*>` → 偏特化（T* 匹配 int*）\n- 如果偏特化不匹配，回退到主模板',
    },
    {
      type: 'concept-cards',
      instruction: '偏特化的典型模式：',
      cards: [
        { glyph: '🔗', term: '同类型约束', meaning: '两个不同的参数强制为同一类型', example: 'Pair<T, T>' },
        { glyph: '📎', term: '指针包装', meaning: '为指针提供自动解引用的行为', example: 'Box<T*>' },
        { glyph: '📋', term: 'const 限定', meaning: '为 const 类型提供不同行为', example: 'Box<const T>' },
      ],
    },
    {
      type: 'type-it',
      instruction: '输入一个 const 偏特化：',
      code: 'template<typename T>\nclass Box<const T> {\n  T value;\npublic:\n  Box(const T& v) : value(v) {}\n  T get() const { return value; }\n};',
      hints: [
        'Box<const T> 匹配 T 是 const 的实例化',
        '用 const T& 接收参数',
        '返回 T 的非 const 拷贝',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾 08-09：以下哪个声明使用了非类型模板参数？',
      options: [
        { text: 'template<typename T>', correct: false, explanation: '这是类型参数' },
        { text: 'template<int N>', correct: true, explanation: 'int N 是非类型参数' },
        { text: 'template<typename T, typename U>', correct: false, explanation: '两个都是类型参数' },
        { text: 'template<class T>', correct: false, explanation: 'class 等价于 typename' },
      ],
    },
    {
      type: 'exposition',
      text: '偏特化和全特化一样，也要先有主模板才能写。\n偏特化的本质是**模式匹配**——编译器看你实例化的类型是否匹配某个偏特化模式。',
    },
    {
      type: 'multiple-choice',
      question: '函数模板支持偏特化吗？',
      options: [
        { text: '支持，和类模板语法一样', correct: false, explanation: '函数模板不支持偏特化' },
        { text: '不支持，函数模板只能用重载代替', correct: true, explanation: '函数模板通过重载实现类似效果' },
        { text: '支持，但必须用 class 替代 typename', correct: false, explanation: '语法不是问题所在' },
        { text: '函数模板不需要特化', correct: false, explanation: '函数模板可以用全特化' },
      ],
    },
    {
      type: 'type-it',
      instruction: '写一个完整的例子：主模板 + 偏特化：',
      code: 'template<typename T>\nclass Wrapper {\n  T data;\npublic:\n  Wrapper(T d) : data(d) {}\n  T get() const { return data; }\n};\n\ntemplate<typename T>\nclass Wrapper<T*> {\n  T* data;\npublic:\n  Wrapper(T* d) : data(d) {}\n  T get() const { return *data; }\n};',
      hints: [
        'T 在主模板中是具体值',
        'T* 在偏特化中自动解引用',
        'Wrapper<int*>(ptr) 走偏特化版本',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾 10：以下哪些是特化的合理用途？',
      options: [
        { text: '让某些类型使用不同的算法', correct: true, explanation: '不同类型需要不同行为时特化' },
        { text: '完全替换所有类型的实现', correct: false, explanation: '那就直接写具体类了，不用模板' },
        { text: '让代码变长', correct: false, explanation: '特化不是为了变长' },
        { text: '取消模板功能', correct: false, explanation: '特化是为了补充模板，不是取消' },
      ],
    },
    {
      type: 'exposition',
      text: '总结：偏特化 = 保留部分泛化能力 + 特定模式特殊处理。\n它是模板系统中"最灵活但最复杂"的特性之一。掌握它，才算真正理解模板。',
      textAnimation: 'typewriter',
    },
    {
      type: 'type-it',
      instruction: '输入一个完整的偏特化例子：主模板处理普通指针，偏特化处理 const 指针：',
      code: 'template<typename T>\nclass PtrWrapper {\n  T* ptr;\npublic:\n  PtrWrapper(T* p) : ptr(p) {}\n  T& get() const { return *ptr; }\n};\n\ntemplate<typename T>\nclass PtrWrapper<const T> {\n  const T* ptr;\npublic:\n  PtrWrapper(const T* p) : ptr(p) {}\n  const T& get() const { return *ptr; }\n};',
      hints: [
        'PtrWrapper<const T> 偏特化处理 const 指针',
        '返回 const T& 而非 T&',
        '两个版本的行为不同',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾 10：全特化和偏特化的共同前提是什么？',
      options: [
        { text: '必须先有一个主模板', correct: true, explanation: '特化和偏特化都建立在主模板之上' },
        { text: '不需要主模板', correct: false, explanation: '没有主模板就无法特化' },
        { text: '只能在 .h 文件中写', correct: false, explanation: '位置不是前提' },
        { text: '需要 C++20 标准', correct: false, explanation: '特化 C++98 时代就有了' },
      ],
    },
  ],
}

export default lesson
