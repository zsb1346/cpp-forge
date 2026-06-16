import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'deep-vs-shallow',
    chapter: 11,
    title: '浅拷贝 vs 深拷贝',
    subtitle: '拷贝指针 vs 拷贝内容',
    description: '默认拷贝只复制指针（浅拷贝），需要手动实现深拷贝来复制指针指向的内容。',
    objectives: ['能区分浅拷贝和深拷贝', '能理解浅拷贝的问题', '能知道何时需要深拷贝'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '当类里有指针成员时，拷贝变得危险。\n默认的拷贝方式——**浅拷贝**——只复制指针本身，不复制指向的内容。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '先看一个类：',
      code: 'class StringBad {\npublic:\n  char* str;\n  StringBad(const char* s) {\n    str = new char[strlen(s) + 1];\n    strcpy(str, s);\n  }\n  ~StringBad() { delete[] str; }\n};',
    },
    {
      type: 'exposition',
      text: '这个类有析构函数释放 `str`。\n现在看默认拷贝会发生什么：',
    },
    {
      type: 'exposition',
      text: '浅拷贝 = **拷贝指针值**（即地址）。\n两个对象的 `str` 指向**同一块内存**。',
      code: 'StringBad a("hello");\nStringBad b = a;  // 默认拷贝构造！\n// a.str 和 b.str 指向同一地址',
    },
    {
      type: 'concept-cards',
      instruction: '浅拷贝 vs 深拷贝：',
      cards: [
        { glyph: '📋', term: '浅拷贝', meaning: '复制指针值，两个指针指向同一内存', example: '默认拷贝构造' },
        { glyph: '📦', term: '深拷贝', meaning: '复制指针指向的内容，各有一份', example: '手动实现拷贝构造' },
        { glyph: '⚠️', term: '双删问题', meaning: '两个对象析构都 delete，double delete', example: '浅拷贝的后果' },
        { glyph: '🔒', term: '独立性', meaning: '深拷贝后两个对象互不影响', example: '各自管理各自的内存' },
      ],
    },
    {
      type: 'exposition',
      text: '浅拷贝的问题：\n1. `a` 和 `b` 的 `str` 指向同一块内存\n2. `a` 析构时 `delete[]` 释放了\n3. `b` 析构时再次 `delete[]`——**double delete**',
    },
    {
      type: 'exposition',
      text: '浅拷贝还导致：修改 `a.str[i]` 会影响 `b`。\n因为它们共用同一份数据。',
    },
    {
      type: 'multiple-choice',
      question: '复习类的基础知识（p07-09）：类的析构函数什么时候调用？',
      options: [
        { text: '对象创建时', correct: false, explanation: '那是构造函数' },
        { text: '对象销毁时', correct: true, explanation: '析构函数在对象生命周期结束时调用' },
        { text: '调用 delete 时', correct: false, explanation: 'delete 触发的是堆对象的析构' },
        { text: '每次赋值时', correct: false, explanation: '赋值不会调析构' },
      ],
    },
    {
      type: 'exposition',
      text: '**深拷贝**：不仅复制指针，还分配新内存，复制内容。\n让每个对象拥有自己独立的一份数据。',
      code: 'class StringGood {\npublic:\n  char* str;\n  StringGood(const char* s) {\n    str = new char[strlen(s) + 1];\n    strcpy(str, s);\n  }\n  // 深拷贝拷贝构造\n  StringGood(const StringGood& other) {\n    str = new char[strlen(other.str) + 1];\n    strcpy(str, other.str);\n  }\n  ~StringGood() { delete[] str; }\n};',
    },
    {
      type: 'exposition',
      text: '深拷贝后，两个对象的 `str` 指向**不同的内存**。\n修改一个不影响另一个，析构时各自释放自己的。',
    },
    {
      type: 'concept-cards',
      instruction: '对比总结：',
      cards: [
        { glyph: '🟢', term: '浅拷贝', meaning: '快（只复制地址），但共享数据有风险' },
        { glyph: '🔵', term: '深拷贝', meaning: '慢（要分配+复制），但安全独立' },
        { glyph: '🤔', term: '如何选择', meaning: '类中有指针成员时，必须深拷贝' },
      ],
    },
    {
      type: 'exposition',
      text: '什么时候用浅拷贝就够了？\n- 类里没有指针、没有动态资源\n- 类里的指针只是观察者（不负责释放）',
    },
    {
      type: 'exposition',
      text: '什么时候必须用深拷贝？\n- 类里有 `new` 分配的资源\n- 类负责 `delete` 释放资源\n**几乎总是需要深拷贝**。',
    },
    {
      type: 'exposition',
      text: '默认拷贝构造是浅拷贝。\n如果你的类有指针成员，必须**自己实现拷贝构造**来实现深拷贝。',
    },
    {
      type: 'multiple-choice',
      question: '浅拷贝复制的是什么？',
      options: [
        { text: '指针指向的内容', correct: false, explanation: '那是深拷贝做的事' },
        { text: '指针本身的地址值', correct: true, explanation: '浅拷贝只复制指针，不复制内容' },
        { text: '整个对象的所有字节', correct: false, explanation: '虽然确实复制了所有字节，但关键是指针指向的内容没复制' },
        { text: '只复制整数字段', correct: false, explanation: '浅拷贝复制所有成员，但指针成员只复制地址' },
      ],
    },
    {
      type: 'exposition',
      text: '简单总结：\n- **浅拷贝** = 复制钥匙\n- **深拷贝** = 复制钥匙 + 复制整个房子\n需要哪个取决于你俩是不是要住一起。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '在实际开发中，大部分含资源的类都需要深拷贝。\n如果你不确定——默认用深拷贝是安全的。',
    },
    {
      type: 'exposition',
      text: '标准库的 `std::string`、`std::vector` 都实现了深拷贝。\n所以能用它们的地方就尽量用——省去自己管理内存的麻烦。',
    },
    {
      type: 'exposition',
      text: '从下一课开始，我们正式学习如何实现深拷贝——\n**拷贝构造函数**和**拷贝赋值运算符**。',
    },
  ],
}

export default lesson
