import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'const-ptr',
    chapter: 10,
    title: 'const 指针',
    subtitle: '指向不变还是值不变',
    description: '理解 const 在指针不同位置的含义——是指向的值不能改，还是指针本身不能改。',
    objectives: ['能区分 const int* 和 int* const', '能读懂指针声明中 const 的含义'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '指针你已经会了：`int* p = &x;` 表示 p 指向 x。\n现在加上 const，就有两种可能——到底谁不能改？',
      code: 'int x = 5;\nint* p = &x;   // 普通指针',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '第一种：`const int* p`——指向的值不能改。\np 可以指向别处，但不能通过 p 修改指向的值。',
      code: 'const int* p = &x;\n*p = 10;   // 编译错误！值不能改\np = &y;    // 可以，指针本身可以改',
    },
    {
      type: 'concept-cards',
      instruction: '认识 const 指针的两种写法：',
      cards: [
        { glyph: '🔗', term: 'const int* p', meaning: '指向常量的指针——值不能改，指向可以改', example: '可改指向，不可改值' },
        { glyph: '🔒', term: 'int* const p', meaning: '常量指针——指向不能改，值可以改', example: '不可改指向，可改值' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾：声明一个指向 int 的指针怎么写？',
      options: [
        { text: 'int p;', correct: false, explanation: '这是普通变量声明' },
        { text: 'int& p = x;', correct: false, explanation: '这是引用' },
        { text: 'int* p = &x;', correct: true, explanation: 'int* 表示指向 int 的指针' },
        { text: 'int p* = x;', correct: false, explanation: '语法错误，* 应该在类型后面' },
      ],
    },
    {
      type: 'exposition',
      text: '第二种：`int* const p`——指针本身不能改。\np 必须始终指向同一个地址，但可以通过 p 修改那个地址的值。',
      code: 'int* const p = &x;\np = &y;    // 编译错误！指针不能改\n*p = 10;   // 可以，值可以改',
    },
    {
      type: 'type-it',
      instruction: '声明一个指向常量的指针：',
      code: 'const int* ptr = &x;',
      hints: [
        'const int* 表示指向的值不可改',
        'ptr 可以 later 指向另一个变量',
        '但不能用 *ptr = 新值 来修改',
      ],
    },
    {
      type: 'multiple-choice',
      question: '`const int* p` 中，什么不能改？',
      options: [
        { text: 'p 自己不能改', correct: false, explanation: 'p 可以指向别处' },
        { text: '*p 不能改', correct: true, explanation: 'const int* 表示指向的值不能改' },
        { text: 'p 和 *p 都不能改', correct: false, explanation: '只有指向的值被限制' },
        { text: '都可以改', correct: false, explanation: 'const int* 限制的是值' },
      ],
    },
    {
      type: 'exposition',
      text: '第三种：`const int* const p`——既不能改指向，也不能改值。\n这是最严格的模式。',
      code: 'const int* const p = &x;\np = &y;    // 编译错误！\n*p = 10;   // 编译错误！',
    },
    {
      type: 'concept-cards',
      instruction: '三种 const 指针一图流：',
      cards: [
        { glyph: '🔓', term: 'int*', meaning: '指向和值都可以改', example: '最自由的指针' },
        { glyph: '🔗', term: 'const int*', meaning: '值不能改，指向可以改', example: 'data 只读' },
        { glyph: '🔒', term: 'int* const', meaning: '指向不能改，值可以改', example: '固定地址' },
      ],
    },
    {
      type: 'type-it',
      instruction: '声明一个常量指针（指向不能改）：',
      code: 'int* const fixedPtr = &x;',
      hints: [
        'int* const 中 const 修饰的是指针本身',
        'fixedPtr 必须初始化，之后不能改指向',
        '但 *fixedPtr 可以重新赋值',
      ],
    },
    {
      type: 'exposition',
      text: '记忆技巧：**const 修饰它右边的东西**。\n- `const int*`：const 修饰 `int`，所以 int 值不能改\n- `int* const`：const 修饰 `*`（指针本身），所以指针不能改',
    },
    {
      type: 'type-it',
      instruction: '声明一个双重 const 指针：',
      code: 'const int* const constPtr = &x;',
      hints: [
        '第一个 const 限制值不能改',
        '第二个 const 限制指向不能改',
        '这种最严格，常用于只读且固定的引用',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾 p05：用哪个运算符取变量的地址？',
      options: [
        { text: '*', correct: false, explanation: '* 是解引用/指针声明，不是取地址' },
        { text: '&', correct: true, explanation: '& 运算符取变量的地址' },
        { text: '->', correct: false, explanation: '-> 用于通过指针访问成员' },
        { text: '.', correct: false, explanation: '. 用于对象直接访问成员' },
      ],
    },
    {
      type: 'exposition',
      text: '在实际代码中，`const int*` 更常见——比如函数参数用 `const int*` 保证不修改传入的数据。\n`int* const` 比较少用，因为指针本身通常不需要锁定。',
    },
    {
      type: 'multiple-choice',
      question: '`const int* const p` 中，哪个不能改？',
      options: [
        { text: '只有指向不能改', correct: false, explanation: 'const 出现了两次' },
        { text: '只有值不能改', correct: false, explanation: 'const 出现了两次' },
        { text: '指向和值都不能改', correct: true, explanation: '两个 const 分别限制了指向和值' },
        { text: '都可以改', correct: false, explanation: '两个 const 都加了限制' },
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全声明：一个指向 const int 的指针。',
      template: '____ ____ * ____ = &x;',
      answers: ['const', 'int', 'p'],
      hints: ['第一个空是 const 关键字', '第二个空是指向的类型', '第三个空是指针名'],
    },
    {
      type: 'exposition',
      text: '总结对比：\n- `const int* p` → 值不改，向可改\n- `int* const p` → 向不改，值可改\n- `const int* const p` → 都不改',
      textAnimation: 'typewriter',
    },
    {
      type: 'type-it',
      instruction: '最后练习：声明 const int* const 类型：',
      code: 'const int* const readOnly = &score;',
      hints: [
        '第一个 const 保护值不被改',
        '第二个 const 保护指向不被改',
        'readOnly 的名字暗示了它的用途——只读',
      ],
    },
  ],
}

export default lesson