import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'lvalue-vs-rvalue',
    chapter: 12,
    title: '左值vs右值',
    subtitle: '能取地址 vs 不能',
    description: '左值有地址/名字，右值是临时值——区分它们是理解移动语义的第一步。',
    objectives: ['能用取地址操作区分左值和右值', '能说出左值和右值的核心区别', '能理解右值引用只绑定右值'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '在 C++ 中，每个表达式要么是**左值（lvalue）**，要么是**右值（rvalue）**。\n这个区分是理解移动语义的基石。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '**左值**：有名字、有地址、可以取地址。\n程序结束后它还可能存在。',
      code: 'int x = 10;  // x 是左值\n&x;             // ✅ 可以取地址',
    },
    {
      type: 'exposition',
      text: '**右值**：临时的、没有名字、不能取地址。\n用完就消失。',
      code: '&42;       // ❌ 编译错误\n&(x + 5);  // ❌ 也是错误',
    },
    {
      type: 'exposition',
      text: '黄金判断法则：**能不能取地址？**\n- `&表达式` 能通过编译 → **左值**\n- `&表达式` 编译失败 → **右值**',
      code: 'int x = 10;\n&x;       // ✅ 左值\n&42;      // ❌ 右值\n&(x + 5); // ❌ 右值',
    },
    {
      type: 'concept-cards',
      instruction: '左值和右值的核心区别：',
      cards: [
        { glyph: '⬅️', term: '左值', meaning: '有名字，可取地址，持久存在', example: 'int x; x' },
        { glyph: '➡️', term: '右值', meaning: '临时值，没名字，不能取地址', example: '42; x + 5' },
        { glyph: '📍', term: '& 运算符', meaning: '能取地址的是左值', example: '&x ✅ / &42 ❌' },
      ],
    },
    {
      type: 'exposition',
      text: '函数返回值（非引用类型）也是右值——它是临时产生的。',
      code: 'int getFive() { return 5; }\nint y = getFive();   // getFive() 返回的是右值\n// &getFive();        // ❌ 不能取地址',
    },
    {
      type: 'multiple-choice',
      question: '以下哪个表达式是右值？',
      options: [
        { text: 'int a = 3; 中的 a', correct: false, explanation: 'a 是变量名，可以 &a，是左值' },
        { text: '42', correct: true, explanation: '42 是字面量，不能取地址，是右值' },
        { text: 'int* p = &a; 中的 p', correct: false, explanation: 'p 是左值，可以 &p' },
        { text: 'int& r = a; 中的 r', correct: false, explanation: 'r 是引用，本身是左值' },
      ],
    },
    {
      type: 'exposition',
      text: '**左值引用 `T&`** 只能绑定到左值。',
      code: 'int x = 10;\nint& ref = x;   // ✅ x 是左值\n// int& ref2 = 42;  // ❌ 42 是右值',
    },
    {
      type: 'exposition',
      text: '**右值引用 `T&&`** 只能绑定到右值——C++11 引入的新特性。',
      code: 'int&& rref = 42;    // ✅ 42 是右值\nint x = 10;\n// int&& rref2 = x; // ❌ x 是左值',
    },
    {
      type: 'concept-cards',
      instruction: '三种引用类型的绑定规则：',
      cards: [
        { glyph: '🔗', term: 'T&', meaning: '左值引用，只绑左值', example: 'int& r = x;' },
        { glyph: '🔗🔗', term: 'T&&', meaning: '右值引用，只绑右值', example: 'int&& r = 42;' },
        { glyph: '📌', term: 'const T&', meaning: '万能引用，左右值都能绑', example: 'const int& r = 42;' },
      ],
    },
    {
      type: 'exposition',
      text: '`const T&` 能绑定右值——这是临时对象能传给 `const int&` 参数的原因。',
      code: 'void show(const int& x) {\n  cout << x;\n}\nshow(42);  // ✅ const T& 能绑右值',
    },
    {
      type: 'multiple-choice',
      question: '复习上一课：右值引用主要用来实现什么？',
      options: [
        { text: '让代码更简短', correct: false, explanation: '右值引用并不简化代码写法' },
        { text: '移动语义——偷取临时对象的资源', correct: true, explanation: '右值引用让移动构造/赋值成为可能' },
        { text: '防止指针空悬', correct: false, explanation: '那是智能指针的职责' },
        { text: '替代模板', correct: false, explanation: '和模板没有直接关系' },
      ],
    },
    {
      type: 'exposition',
      text: '函数重载可以根据左右值选择不同版本。',
      code: 'void process(int& x)  { cout << "左值版本\\n"; }\nvoid process(int&& x) { cout << "右值版本\\n"; }\n\nint a = 10;\nprocess(a);   // 调左值版本\nprocess(20);  // 调右值版本',
    },
    {
      type: 'exposition',
      text: '注意：**字符串字面量是左值**。\n`"hello"` 存储在程序数据段，有内存地址。',
      code: '&"hello";  // ✅ 字符串字面量可以取地址',
    },
    {
      type: 'exposition',
      text: '为什么左值/右值的区分这么重要？\n——因为**右值"即将销毁"**，可以安全地偷走它的资源而不必深拷贝。\n这就是移动语义的核心。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '综合辨析：',
      code: 'int a = 10;         // a 左值，10 右值\nint b = a;          // a 左值，b 左值\nint c = a + b;      // (a+b) 右值\nint* p = &a;        // p 左值\nint&& rr = a + b;   // (a+b) 右值',
    },
    {
      type: 'exposition',
      text: '记住核心法则：\n- 能取地址 → 左值\n- 不能取地址 → 右值\n- `T&` 绑左值，`T&&` 绑右值，`const T&` 都能绑',
    },
    {
      type: 'multiple-choice',
      question: '以下哪个是左值？',
      options: [
        { text: '42', correct: false, explanation: '42 是字面量，不能取地址' },
        { text: '"hello world"', correct: true, explanation: '字符串字面量存储在静态区，有地址' },
        { text: 'x + 5 的结果', correct: false, explanation: '表达式的结果是临时值，不能取地址' },
        { text: 'func() 的返回值', correct: false, explanation: '函数返回的非引用值是右值' },
      ],
    },
    {
      type: 'exposition',
      text: '左值 vs 右值总结：\n- 左值：有名字 + 能取地址 + 持久存在\n- 右值：临时 + 不能取地址 + 即将销毁\n- `&` 操作是分水岭',
    },
    {
      type: 'exposition',
      text: '下一课学习 `std::move`——它把左值**转成**右值引用，让移动语义真正跑起来。',
      textAnimation: 'typewriter',
    },
  ],
}

export default lesson
