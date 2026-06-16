import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'practice-memory-layout',
    chapter: 17,
    title: '内存布局练习',
    subtitle: '巩固 10-13',
    description: '通过选择题、填空和敲代码练习，巩固内存布局、栈、堆和结构体对齐的知识。',
    objectives: ['能准确地判断变量所属内存区域', '能分析结构体的大小', '能区分栈和堆的适用场景'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '通过练习巩固 10-13 课的内存布局、栈、堆和结构体对齐知识。',
      textAnimation: 'typewriter',
    },
    {
      type: 'multiple-choice',
      question: '以下变量中，哪个存放在数据段（Data Segment）？',
      options: [
        { text: '`void func() { int x = 5; }` 中的 x', correct: false, explanation: '函数内的局部变量在栈上' },
        { text: '`int global = 100;`', correct: true, explanation: '已初始化的全局变量在数据段' },
        { text: '`int* p = new int;` 中指针指向的内存', correct: false, explanation: 'new 分配内存在堆上' },
        { text: '`int buffer[1000];`（全局，未初始化）', correct: false, explanation: '未初始化的全局变量在 BSS 段' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '函数`void test() { int a = 10; int* p = new int; }`中，a 和 p 指向的内存分别在哪个区域？',
      options: [
        { text: 'a 在堆，p 指向栈', correct: false, explanation: 'a 在栈上，p 指向堆' },
        { text: 'a 在栈，p 指向堆', correct: true, explanation: '局部变量 a 在栈，new 分配的内存在堆' },
        { text: 'a 在数据段，p 指向数据段', correct: false, explanation: '局部变量不在数据段' },
        { text: 'a 在 BSS，p 指向栈', correct: false, explanation: '局部变量在栈上' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '结构体`struct S { char c; int i; short s; };`在默认对齐下的 sizeof 最可能是？',
      options: [
        { text: '7（1+4+2）', correct: false, explanation: '由于 padding，实际比成员和大' },
        { text: '12', correct: true, explanation: 'char(1)+填充(3)+int(4)+short(2)+填充(2)=12' },
        { text: '8', correct: false, explanation: '8 是 1+3+4 但没有 short 的空间' },
        { text: '16', correct: false, explanation: '16 太大了，12 就够了' },
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全代码使得 arr 在堆上分配，然后用完后释放。',
      template: 'int* arr = ____ int[50];\narr[0] = 1;\n____ arr;',
      answers: ['new', 'delete[]'],
      hints: ['堆上分配用 new', '数组释放用 delete[]'],
    },
    {
      type: 'exposition',
      text: '**内存区域判定练习**：\n\n```cpp\nint a;               // ___ 段\nstatic int b = 5;    // ___ 段\nvoid func() {\n  int c;             // ___\n  int* d = new int;  // d 在 ___，*d 在 ___\n}\n```\n\n依次想好答案再继续。',
    },
    {
      type: 'exposition',
      text: '答案：\n\n- `int a;`（全局，未初始化）→ **BSS**\n- `static int b = 5;` → **数据段**\n- `int c;`（局部）→ **栈**\n- `int* d;`（指针本身）→ **栈**\n- `new int`（分配的内存）→ **堆**',
    },
    {
      type: 'type-it',
      instruction: '敲一段代码，演示栈和堆同时使用：',
      code: 'void demo() {\n  int stackVar = 10;\n  int* heapVar = new int(20);\n  cout << *heapVar << endl;\n  delete heapVar;\n}',
      hints: ['`stackVar` 在栈上，自动管理', '`heapVar` 指向堆内存，需手动 delete', '函数结束时栈变量自动释放，堆要手动释放'],
    },
    {
      type: 'fill-in',
      prompt: '补全结构体对齐的优化：把大成员放在前面。',
      template: 'struct ____ {\n  ____ big;\n  int medium;\n  short small;\n};',
      answers: ['Optimized', 'double'],
      hints: ['struct 名可以叫 Optimized', '最大的内置类型是 double（8 字节）'],
    },
    {
      type: 'exposition',
      text: '**递归和栈**——递归的深度越大，栈上帧越多：\n\n```cpp\nint fib(int n) {\n  if (n <= 1) return n;\n  return fib(n-1) + fib(n-2);\n}\n```\n\n对 `fib(100)` 的深度是 100 层，\n但因为是二叉树递归，**调用栈深度**是 n，不是 2^n。',
    },
    {
      type: 'type-it',
      instruction: '敲一个可能栈溢出的递归函数（只是定义，别运行）：',
      code: 'void deepRecursion(int n) {\n  int temp = n;\n  deepRecursion(n - 1);\n}',
      hints: ['每次递归分配一个栈帧', 'n 太大时栈帧用尽导致栈溢出', '末尾没有终止条件——无限递归！'],
    },
    {
      type: 'multiple-choice',
      question: '`int* p = new int(5);` 执行后，p 在哪个区域，\*p 在哪个区域？',
      options: [
        { text: 'p 在栈，*p 在栈', correct: false, explanation: 'new 分配在堆上' },
        { text: 'p 在栈，*p 在堆', correct: true, explanation: '指针本身是局部变量在栈，指向的内存在堆' },
        { text: 'p 在堆，*p 在栈', correct: false, explanation: '反过来就错了' },
        { text: 'p 在数据段，*p 在 BSS', correct: false, explanation: '局部变量不在数据段' },
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全结构体定义，使 total 成员按 8 字节对齐（最前面）。',
      template: 'struct Record {\n  ____ total;\n  int count;\n  char flag;\n};',
      answers: ['double'],
      hints: ['double 是 8 字节，放在最前面减少 padding'],
    },
    {
      type: 'fill-in',
      prompt: '补全代码：释放堆数组并将指针置空。',
      template: 'int* data = new int[20];\n// 使用 data\n____ data;\ndata = ____;',
      answers: ['delete[]', 'nullptr'],
      hints: ['数组用 delete[] 释放', '释放后置空防止悬空指针'],
    },
    {
      type: 'type-it',
      instruction: '敲一段代码，声明一个全局 const 变量（安全地放在头文件中）：',
      code: 'const int MAX_BUFFER = 4096;',
      hints: ['const 全局变量默认内部链接', '可以在头文件中安全使用', '每个翻译单元有自己的拷贝'],
    },
    {
      type: 'exposition',
      text: '**BSS 段 vs 数据段 区分练习**：\n\n```cpp\nint g1;              // BSS（未初始化全局）\nint g2 = 0;          // 数据段（已初始化全局）\nstatic int s1;       // BSS（未初始化静态）\nstatic int s2 = 0;   // 数据段（已初始化静态）\n```\n\n注意：`int g2 = 0;` 虽然值也是 0，但它被**显式初始化**了，\n所以放在数据段而不是 BSS 段。',
    },
    {
      type: 'exposition',
      text: '**栈 vs 堆总结**：\n- 栈：快、自动、有限制\n- 堆：灵活、大、手动管理\n\n日常规则：能用栈就不用堆。需要大内存或生命周期超出函数时才用堆。',
    },
    {
      type: 'multiple-choice',
      question: '复习第 11 课：栈帧中存放了哪些信息？',
      options: [
        { text: '只有局部变量', correct: false, explanation: '还有返回地址和参数等' },
        { text: '局部变量、参数、返回地址、寄存器值', correct: true, explanation: '栈帧包含函数执行所需的全部上下文' },
        { text: '全局变量的地址', correct: false, explanation: '全局变量不在栈上' },
        { text: '整个函数体的代码', correct: false, explanation: '代码在代码段' },
      ],
    },
  ],
}

export default lesson
