import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'stack-deep',
    chapter: 17,
    title: '栈——函数调用幕后',
    subtitle: '每次调用分配帧',
    description: '深入理解栈的工作原理——每次函数调用分配一个栈帧，函数返回时自动销毁。',
    objectives: ['能解释栈帧的概念', '能理解函数调用与返回在栈上的表现', '能分析递归函数对栈的影响'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '栈（Stack）为什么叫"栈"？\n\n数据**后进先出**——就像一摞盘子，\n最后放上去的盘子最先被拿走。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '每次调用函数，栈上会分配一块空间叫**栈帧（Stack Frame）**。\n\n栈帧里存放：\n- 函数的局部变量\n- 函数的参数\n- 返回地址（函数结束后回到哪里）\n- 保存的寄存器值',
    },
    {
      type: 'exposition',
      text: '栈的"生长方向"是**从高地址到低地址**。\n\n```\n高地址\n│  main() 的栈帧\n│    ├── local variables: a, b\n│    └── ...\n│   func() 被调用 → 在下方分配新帧\n│    ├── local variables: x, y\n│    ├── parameters: args\n│    └── 返回地址\n低地址\n```',
    },
    {
      type: 'exposition',
      text: '一个简单的例子：\n\n```cpp\nvoid greet() {\n  string msg = "Hello";   // greet 的栈帧\n}\n\nint main() {\n  int a = 1;              // main 的栈帧\n  greet();                // 在栈上叠加 greet 的帧\n  return 0;               // greet 的帧已释放\n}\n```\n\n调用 `greet()` 时栈向下延伸，返回时收缩。',
    },
    {
      type: 'concept-cards',
      instruction: '关于栈的关键概念：',
      cards: [
        { glyph: '📚', term: '栈帧(Stack Frame)', meaning: '一次函数调用分配的空间', example: '存局部变量和参数' },
        { glyph: '⬇️', term: '向下生长', meaning: '高地址→低地址', example: '新帧在更低地址' },
        { glyph: '🔁', term: '后进先出(LIFO)', meaning: '最后调用的最先返回', example: '嵌套函数调用' },
        { glyph: '🤖', term: '自动管理', meaning: '函数进出自动分配释放', example: '无需手动 delete' },
      ],
    },
    {
      type: 'exposition',
      text: '**递归与栈**——递归函数每次调用都分配一个栈帧：\n\n```cpp\nint factorial(int n) {\n  int temp;             // 当前帧的局部变量\n  if (n <= 1) return 1;\n  temp = factorial(n - 1);  // 分配新帧\n  return n * temp;      // 返回时释放上面的帧\n}\n```\n\n递归 5 层 = 5 个栈帧同时存在。',
    },
    {
      type: 'exposition',
      text: '**栈溢出（Stack Overflow）**——\n\n如果递归太深（比如递归 100,000 层），\n栈空间用完了，就会**栈溢出**（Stack Overflow）。\n\n典型的栈大小只有 **1-8 MB**。\n\n这也是为什么你听说过 "Stack Overflow" 网站的名字来源。',
    },
    {
      type: 'type-it',
      instruction: '敲一个简单函数，查看局部变量在栈中：',
      code: 'void func() {\n  int x = 10;\n  int y = 20;\n  int sum = x + y;\n}',
      hints: ['x 和 y 和 sum 都在 func 的栈帧中', '函数结束时自动销毁', '局部变量不影响函数外部'],
    },
    {
      type: 'concept-cards',
      instruction: '栈 vs 堆的自动/手动管理：',
      cards: [
        { glyph: '🤖', term: '栈 = 自动', meaning: '函数开始自动分配，结束自动回收', example: '局部变量' },
        { glyph: '🖐️', term: '堆 = 手动', meaning: 'new 分配，delete 回收', example: '动态数组' },
      ],
    },
    {
      type: 'exposition',
      text: '**返回地址**——栈帧中很重要的一个内容：\n\n当 `main()` 调用 `greet()` 时，`main` 中调用 `greet` 的下一行代码的地址被保存到栈帧里。\n\n`greet()` 执行完后，根据返回地址跳回来，继续执行。\n\n这就是函数"记得回到哪里"的机制。',
    },
    {
      type: 'type-it',
      instruction: '敲一个包含多层函数调用的例子：',
      code: 'void inner() { int a = 1; }\nvoid outer() { inner(); }\nint main() { outer(); }',
      hints: ['调用链 main → outer → inner', '栈上有三个帧同时存在', 'inner 返回后 outer 的帧才继续'],
    },
    {
      type: 'exposition',
      text: '**局部变量的生命周期**：从定义到函数结束。\n\n```cpp\nvoid func() {\n  int x = 5;      // x 出生\n  if (x > 0) {\n    int y = 10;   // y 出生\n  }               // y 死亡（离开作用域）\n  // y 不可访问\n}                  // x 死亡\n```\n\n变量的作用域和栈帧的分配是两回事——\n`if` 块内的变量也在 func 的栈帧中，只是访问受限。',
    },
    {
      type: 'multiple-choice',
      question: '以下关于栈的说法，哪个正确？',
      options: [
        { text: '栈从低地址向高地址生长', correct: false, explanation: '栈从高地址向低地址生长' },
        { text: '栈上分配内存需要手动释放', correct: false, explanation: '栈是自动管理的' },
        { text: '每调用一个函数就在栈上分配一个栈帧', correct: true, explanation: '这是栈的核心工作机制' },
        { text: '栈上可以存储大型数组（>100MB）', correct: false, explanation: '栈空间有限，通常 1-8MB' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '递归会导致栈溢出的原因是什么？',
      options: [
        { text: '递归函数效率太低', correct: false, explanation: '效率低不会导致溢出' },
        { text: '每次递归调用都会分配栈帧，深度太大时耗尽栈空间', correct: true, explanation: '递归 n 层 = n 个栈帧同时存在' },
        { text: '编译器不支持递归', correct: false, explanation: 'C++ 支持递归' },
        { text: '递归函数的返回值类型不对', correct: false, explanation: '类型错误是编译错误' },
      ],
    },
    {
      type: 'exposition',
      text: '总结：\n\n- 栈是函数调用的幕后舞台\n- 每次调用一个函数 → 栈帧入栈\n- 函数返回 → 栈帧出栈\n- 栈空间有限（1-8MB），小心递归深度和超大局部变量',
    },
    {
      type: 'exposition',
      text: '关于栈的另一个实际例子——**在栈上分配大型数组**：\n\n```cpp\nvoid dangerous() {\n  int bigArray[1000000];   // 约 4MB——可能栈溢出！\n}\n```\n\n1,000,000 个 `int` = 约 4MB。\n如果栈只有 1MB，这一行就会导致**栈溢出**崩溃。\n\n超大数组请用堆（`new`）或全局变量。',
    },
    {
      type: 'multiple-choice',
      question: '让一个函数返回局部变量的指针（`int* func() { int x = 5; return &x; }`），有什么问题？',
      options: [
        { text: '没有问题，这是常见写法', correct: false, explanation: '返回局部变量地址是危险操作' },
        { text: 'x 在栈上，函数返回后栈帧释放，指针悬空', correct: true, explanation: '函数返回后栈帧被回收，指向栈内存的指针变成悬空指针' },
        { text: '编译器会报错', correct: false, explanation: '编译器会警告但不一定报错' },
        { text: 'x 会变成全局变量', correct: false, explanation: '不会，它始终是局部变量' },
      ],
    },
    {
      type: 'exposition',
      text: '下一课进入**堆**——它和栈刚好相反：空间大、手动管理。',
    },
  ],
}

export default lesson
