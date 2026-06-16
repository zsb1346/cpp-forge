import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'template-specialization',
    chapter: 13,
    title: '模板特化',
    subtitle: '给特定类型开小灶',
    description: '学习如何为特定类型提供特殊的模板实现——当通用模板不能满足某个类型的特殊需求时。',
    objectives: ['能写出模板特化', '理解何时需要特化', '能区分主模板和特化版本'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '有时候通用模板对某些类型不适用——需要"开小灶"。\n比如 `max()` 对指针应该比较指向的值而不是地址。\n**模板特化**就是为特定类型写一个特殊版本。',
      code: '// 通用模板\n template<typename T>\nT max(T a, T b) {\n  return a > b ? a : b;\n}\n\n// 特化版本：指针类型\n template<>\nint* max<int*>(int* a, int* b) {\n  return *a > *b ? a : b;\n}',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '特化的语法：\n1. `template<>` — 空的尖括号，表示特化\n2. `int* max<int*>(...)` — 函数名后加 `<具体类型>`\n3. 实现和通用模板不同',
    },
    {
      type: 'concept-cards',
      instruction: '模板特化三要素：',
      cards: [
        { glyph: '📐', term: '主模板（primary template）', meaning: '最通用的版本', example: 'template<typename T> T max(T,T)' },
        { glyph: '✂️', term: '特化声明 template<>', meaning: '空的尖括号，没有参数', example: 'template<>' },
        { glyph: '🎯', term: '具体类型 <int*>', meaning: '在函数名后指定要特化的类型', example: 'max<int*>' },
      ],
    },
    {
      type: 'type-it',
      instruction: '输入一个函数模板特化（比较指针时比较值）：',
      code: 'template<>\nint* max<int*>(int* a, int* b) {\n  return *a > *b ? a : b;\n}',
      hints: [
        'template<> 尖括号里什么都不写',
        'max<int*> 告诉编译器这是 int* 的特化',
        '函数体比较 *a 和 *b（解引用后的值）',
      ],
    },
    {
      type: 'exposition',
      text: '类模板特化更常见。比如 `Box<bool>` 想用位压缩存储，但其他类型正常存储：',
      code: '// 通用模板\n template<typename T>\nclass Box {\n  T value;\npublic:\n  void set(T v) { value = v; }\n  T get() const { return value; }\n};\n\n// 特化：bool 版本用位存储\n template<>\nclass Box<bool> {\n  unsigned char bits;\npublic:\n  void set(bool v) { bits = v ? 1 : 0; }\n  bool get() const { return bits != 0; }\n};',
    },
    {
      type: 'type-it',
      instruction: '输入 Box<bool> 特化版本：',
      code: 'template<>\nclass Box<bool> {\n  unsigned char bits;\npublic:\n  void set(bool v) { bits = v ? 1 : 0; }\n  bool get() const { return bits != 0; }\n};',
      hints: [
        'template<> 表示特化',
        'Box<bool> 指定特化类型',
        '内部用 unsigned char 代替 bool 存储',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾 05：通用的 `Box<T>` 和特化的 `Box<bool>` 是什么关系？',
      options: [
        { text: 'Box<bool> 是 Box<T> 的子类', correct: false, explanation: '特化不是继承' },
        { text: 'Box<bool> 完全替代了通用版本', correct: true, explanation: '使用 Box<bool> 时不会使用通用模板' },
        { text: '两者同时存在，编译器随机选', correct: false, explanation: '编译器精确匹配特化版本' },
        { text: 'Box<bool> 不能有独立成员', correct: false, explanation: '特化可以完全重新实现' },
      ],
    },
    {
      type: 'concept-cards',
      instruction: '什么时候需要特化？',
      cards: [
        { glyph: '🔍', term: '行为不同', meaning: '某类型的操作和通用逻辑不同', example: '指针比较 vs 值比较' },
        { glyph: '⚡', term: '性能优化', meaning: '某类型可用更高效的方式实现', example: 'bool 用位存而非字节' },
        { glyph: '🚫', term: '类型不支持', meaning: '某类型不支持模板内的操作', example: 'void 类型需要特殊处理' },
      ],
    },
    {
      type: 'type-it',
      instruction: '写一个针对 string 类型的 max 特化（按长度比较）：',
      code: 'template<>\nstring max<string>(string a, string b) {\n  return a.length() > b.length() ? a : b;\n}',
      hints: [
        '通用模板按字典序比较 string',
        '特化版本按字符串长度比较',
        'template<> 尖括号为空',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾 01：模板的动机是什么？',
      options: [
        { text: '让代码运行更快', correct: false, explanation: '模板不影响运行速度' },
        { text: '消除重载带来的代码重复', correct: true, explanation: '逻辑相同类型不同时用模板' },
        { text: '让代码更安全', correct: false, explanation: '模板不直接提高安全性' },
        { text: '支持面向对象编程', correct: false, explanation: '模板是泛型编程，不是 OOP' },
      ],
    },
    {
      type: 'exposition',
      text: '特化的规则：\n1. 必须先有通用模板（主模板）才能特化\n2. 特化版本必须写在主模板之后\n3. 特化的函数签名和主模板必须匹配（参数个数/类型结构）',
    },
    {
      type: 'type-it',
      instruction: '输入完整的\n主模板 + 特化版本：',
      code: 'template<typename T>\nT max(T a, T b) {\n  return a > b ? a : b;\n}\n\ntemplate<>\nstring max<string>(string a, string b) {\n  return a.length() > b.length() ? a : b;\n}',
      hints: [
        '主模板在前，特化在后',
        '调用 max("abc", "de") 时走特化版本',
        '调用 max(1, 2) 时走通用版本',
      ],
    },
    {
      type: 'multiple-choice',
      question: '以下关于模板特化的说法哪个是正确的？',
      options: [
        { text: '特化可以没有主模板', correct: false, explanation: '必须先有主模板' },
        { text: '特化是为主模板的某个类型提供不同实现', correct: true, explanation: '特化针对具体类型定制行为' },
        { text: '特化必须在运行时选择', correct: false, explanation: '特化在编译期由编译器选择' },
        { text: '一个模板只能有一个特化', correct: false, explanation: '可以有多个不同类型的特化' },
      ],
    },
    {
      type: 'type-it',
      instruction: '输入一个类模板全特化：为 void* 指针提供特化版本：',
      code: 'template<>\nclass Box<void*> {\n  void* ptr;\npublic:\n  Box(void* p) : ptr(p) {}\n  void* get() const { return ptr; }\n};',
      hints: [
        'template<> 全特化标记',
        'Box<void*> 为 void* 类型特化',
        'get 返回存储的指针',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾 08：template<typename T, typename U> 中的 T 和 U 是什么？',
      options: [
        { text: '函数参数名', correct: false, explanation: '这是类型参数' },
        { text: '类型参数名', correct: true, explanation: 'T 和 U 是类型占位符' },
        { text: '变量名', correct: false, explanation: '不是变量' },
        { text: '宏定义', correct: false, explanation: '不是宏' },
      ],
    },
    {
      type: 'exposition',
      text: '特化不仅仅是改变实现——你可以完全重新设计类的内部结构。\n只要对外接口一致，内部可以完全不同。',
    },
    {
      type: 'type-it',
      instruction: '输入以下特化，体会接口一致但实现不同：',
      code: 'template<>\nclass Box<char> {\n  char value;\npublic:\n  Box(char c) : value(c) {}\n  char get() const { return value; }\n};',
      hints: [
        'Box<char> 特化用 char 类型',
        '构造函数和 get 都是 char',
        '主模板的 set 特化后可能没有',
      ],
    },
    {
      type: 'exposition',
      text: '总结：通用模板解决"大部分情况"，特化解决"特殊情况"。\n就像你有一个通用工具，但为特殊零件另做了一个专用工具。',
      textAnimation: 'typewriter',
    },
  ],
}

export default lesson
