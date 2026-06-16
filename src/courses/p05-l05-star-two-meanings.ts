import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'star-two-meanings',
    chapter: 6,
    title: '* 的两种含义',
    subtitle: '声明 vs 使用不一样',
    description: '辨析 * 在指针声明中和解引用时的不同含义，避免混淆。',
    objectives: ['能区分声明中的 * 和解引用中的 *', '能正确读写含 * 的代码', '避免常见混淆错误'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '你可能已经注意到了——`*` 在指针里出现了两次，但含义**完全不一样**。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '**含义 1：声明指针**\n`int* p;` — 这里的 `*` 表示"p 是一个指针"。\n它出现在**类型名后面**，修饰类型。',
    },
    {
      type: 'exposition',
      text: '**含义 2：解引用**\n`*p` — 这里的 `*` 表示"去 p 存的地址找值"。\n它出现在**指针变量前面**，操作指针。',
    },
    {
      type: 'concept-cards',
      instruction: '* 的两种角色：',
      cards: [
        { glyph: '📋', term: '声明: int* p', meaning: '* 表示"这是个指针类型"', example: 'int* ptr;' },
        { glyph: '🔍', term: '使用: *p', meaning: '* 表示"解引用，取地址里的值"', example: 'cout << *ptr;' },
        { glyph: '➗', term: '乘法: a * b', meaning: '* 还可能是乘法运算符', example: 'int r = a * b;' },
      ],
    },
    {
      type: 'exposition',
      text: '看这个对比：',
      code: 'int* p = &x;   // ① 声明中的 *：p 是指针\ncout << *p;      // ② 使用中的 *：解引用\nint y = a * b;   // ③ 乘法：a 乘以 b',
    },
    {
      type: 'exposition',
      text: '怎么区分？看 `*` 出现在哪：\n- **声明语句**中（int 后面）→ 指针声明\n- **使用语句**中（变量前面）→ 解引用\n- **两个值之间** → 乘法',
    },
    {
      type: 'multiple-choice',
      question: '`int* p = &x;` 中的第一个 `*` 是什么含义？',
      options: [
        { text: '解引用', correct: false, explanation: '在声明语句中，* 不是解引用' },
        { text: '乘法', correct: false, explanation: '乘法需要两个操作数，这里只有一个' },
        { text: '声明指针类型', correct: true, explanation: 'int* 表示"指向 int 的指针类型"' },
        { text: '取地址', correct: false, explanation: '取地址用 &，不是 *' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '复习上一课：`cout << *p;` 会输出什么？',
      options: [
        { text: 'p 存的地址值', correct: false, explanation: 'p 输出地址，*p 输出该地址的值' },
        { text: 'p 指向的变量的值', correct: true, explanation: '*p 解引用得到 p 指向的值' },
        { text: 'p 变量自己的地址', correct: false, explanation: 'p 自己的地址用 &p' },
        { text: 'p 变量名', correct: false, explanation: '变量名不是可输出的值' },
      ],
    },
    {
      type: 'exposition',
      text: '新手最易犯的错误——**声明多个指针时**：',
      code: 'int* p, q;    // p 是指针，q 是普通 int！\n                // 等价于：int* p; int q;',
    },
    {
      type: 'exposition',
      text: '如果要声明两个指针，必须每个都加 `*`：',
      code: 'int* p, * q;   // p 和 q 都是指针\n// 或者分行写：\nint* p;\nint* q;',
    },
    {
      type: 'multiple-choice',
      question: '`int* a, b;` 中 a 和 b 分别是什么类型？',
      options: [
        { text: 'a 和 b 都是指针', correct: false, explanation: '* 只作用于紧跟着的标识符 a' },
        { text: 'a 是指针，b 是普通 int', correct: true, explanation: 'int* a; int b; 相当于 a 是指针，b 是 int' },
        { text: 'a 和 b 都是普通 int', correct: false, explanation: 'a 前面有 *，a 是指针' },
        { text: '语法错误', correct: false, explanation: '这在 C++ 中是合法的，但容易误解' },
      ],
    },
    {
      type: 'exposition',
      text: '另一个易混淆点：**声明时赋值 vs 使用时赋值**',
      code: 'int x = 5;\nint* p = &x;   // 声明时赋值：把 x 的地址给 p\n\n*p = 10;        // 使用时赋值：修改 p 指向的变量',
    },
    {
      type: 'type-it',
      instruction: '敲这段代码，特别留意两个 * 的不同含义：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int x = 3;\n  int* p = &x;  // 声明指针\n  *p = 99;       // 解引用赋值\n  cout << x << endl;\n}',
      hints: ['第一行 `int* p = &x` 中 * 表示声明指针', '第二行 `*p = 99` 中 * 表示解引用', 'x 会被修改为 99'],
    },
    {
      type: 'exposition',
      text: '还有一个写法习惯问题：有人写 `int* p`，有人写 `int *p`。\n两种都可以，但含义不同：',
    },
    {
      type: 'exposition',
      text: '- `int* p` — 强调"类型是 int 指针"\n- `int *p` — 强调"p 是一个指针"\n\n选一种你喜欢的保持一致就行。',
    },
    {
      type: 'type-it',
      instruction: '敲这段代码练习区分两个 *：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int a = 10;\n  int* ptr = &a;\n  cout << "地址: " << ptr << endl;\n  cout << "值: " << *ptr << endl;\n  *ptr = 20;\n  cout << "新值: " << a << endl;\n}',
      hints: ['`int* ptr` 声明指针', '`*ptr` 解引用取值', '`*ptr = 20` 解引用赋值'],
    },
    {
      type: 'multiple-choice',
      question: '回顾阶段 4：函数声明 `int add(int a, int b)` 中的 int 表示什么？',
      options: [
        { text: '返回值类型是 int', correct: true, explanation: '开头的 int 表示这个函数返回 int 类型的值' },
        { text: '参数 a 是指针', correct: false, explanation: 'a 是 int，没有 *' },
        { text: '函数名是 int', correct: false, explanation: '函数名是 add，int 是返回值类型' },
        { text: '函数不返回任何值', correct: false, explanation: '不返回用 void，int 表示返回整数' },
      ],
    },
    {
      type: 'exposition',
      text: '总结：\n- 声明中的 `*` → **"这是个指针"**\n- 使用时的 `*` → **"解引用，找值"**\n- 两个数之间的 `*` → **乘法**',
    },
    {
      type: 'exposition',
      text: '下一课：指针有时候不想指向任何东西——`nullptr`。',
    },
  ],
}

export default lesson
