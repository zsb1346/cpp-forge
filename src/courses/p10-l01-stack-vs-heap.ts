import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'stack-vs-heap',
    chapter: 11,
    title: '栈和堆',
    subtitle: '自动 vs 手动',
    description: '理解栈和堆两种内存区域的区别：栈自动分配释放，堆需要手动管理。',
    objectives: ['能区分栈和堆的分配方式', '能理解栈自动释放、堆手动释放', '能判断哪些场景适合用堆'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '到目前为止，你用的所有变量——`int`、`double`、数组——都存在一个叫**栈**的地方。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '栈就像超市入口的**自动储物柜**：\n你放进去，走的时候自动弹开，不用你管。',
    },
    {
      type: 'exposition',
      text: '还有另一种内存区域叫**堆**。\n堆像**租仓库**：你得自己租、自己还，没人替你操心。',
    },
    {
      type: 'concept-cards',
      instruction: '先认识这两个概念：',
      cards: [
        { glyph: '📚', term: '栈（stack）', meaning: '自动分配和释放，变量离开作用域自动销毁', example: 'int x = 10;' },
        { glyph: '🏗️', term: '堆（heap）', meaning: '手动分配和释放，new/delete 管理', example: 'int* p = new int;' },
        { glyph: '🤖', term: '自动管理', meaning: '编译器自动处理，不需要写额外代码', example: '栈变量' },
        { glyph: '✋', term: '手动管理', meaning: '程序员必须显式分配和释放', example: 'new / delete' },
      ],
    },
    {
      type: 'exposition',
      text: '栈的特点：**自动分配、自动释放**。\n函数里声明的变量，函数一结束就自动销毁了。',
      code: 'void foo() {\n  int x = 10;  // 栈上分配\n}  // 函数结束，x 自动销毁',
    },
    {
      type: 'exposition',
      text: '堆的特点：**手动分配、手动释放**。\n用 `new` 申请，用 `delete` 释放——不释放就永远占着。',
      code: 'void foo() {\n  int* p = new int;  // 堆上分配\n  delete p;            // 必须手动释放\n}',
    },
    {
      type: 'exposition',
      text: '之前学指针时，你见过 `&` 取地址。\n那些地址在栈上。堆上的地址长一样，但管理方式完全不同。',
    },
    {
      type: 'multiple-choice',
      question: '复习指针知识：`int x = 5; int* p = &x;` 中，`p` 存的是什么？',
      options: [
        { text: '5', correct: false, explanation: '5 是 x 的值，不是 p 存的' },
        { text: 'x 的内存地址', correct: true, explanation: '&x 取 x 的地址，存入指针 p' },
        { text: 'x 的变量名', correct: false, explanation: '变量名不能存到指针里' },
        { text: 'int 类型的大小', correct: false, explanation: 'p 存地址，不是大小' },
      ],
    },
    {
      type: 'exposition',
      text: '栈的空间**有限**——通常只有几 MB。\n所以大数组、大对象不适合放栈上，会栈溢出。',
    },
    {
      type: 'exposition',
      text: '堆的空间**大得多**——可以用 GB。\n适合存大东西，但慢一点（需要手动管理）。',
    },
    {
      type: 'concept-cards',
      instruction: '栈 vs 堆 对比：',
      cards: [
        { glyph: '⚡', term: '速度', meaning: '栈快，堆慢（需要系统调用）' },
        { glyph: '📏', term: '空间', meaning: '栈小（MB级），堆大（GB级）' },
        { glyph: '♻️', term: '管理方式', meaning: '栈自动，堆手动' },
        { glyph: '🔄', term: '生命周期', meaning: '栈随作用域，堆由你控制' },
      ],
    },
    {
      type: 'exposition',
      text: '堆上的内存生存期由**程序员控制**：\n你在函数 A 中 new，可以在函数 B 中 delete——只要指针还在。',
    },
    {
      type: 'exposition',
      text: '灵活性带来责任：\n堆内存必须确保**有人释放**，否则就是泄漏。',
    },
    {
      type: 'multiple-choice',
      question: '下面哪个是堆的特点？',
      options: [
        { text: '变量离开作用域自动销毁', correct: false, explanation: '那是栈的特点' },
        { text: '需要手动用 new 分配、delete 释放', correct: true, explanation: '堆必须手动管理' },
        { text: '空间很小，只有几 KB', correct: false, explanation: '堆空间很大，栈才小' },
        { text: '不需要指针也能用', correct: false, explanation: '堆必须通过指针访问' },
      ],
    },
    {
      type: 'exposition',
      text: '一个直观比喻：\n- 栈 = 你办公桌上的便签纸（随手写随手扔）\n- 堆 = 公司的大文件柜（要钥匙开、要登记、要归还）',
    },
    {
      type: 'type-it',
      instruction: '敲下面的代码，感受栈和堆的区别：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int stackVar = 42;     // 栈上\n  int* heapVar = new int; // 堆上\n  *heapVar = 99;\n  cout << "栈: " << stackVar << endl;\n  cout << "堆: " << *heapVar << endl;\n  delete heapVar;         // 释放堆\n}',
      hints: ['栈变量直接声明就能用，不需要 new', '堆变量必须用 new 分配，返回指针', '堆内存用完必须 delete，否则泄漏'],
    },
    {
      type: 'exposition',
      text: '为什么叫"栈"？\n想象一摞盘子——**后放上去的先拿下来**。变量也是这样：后声明的先销毁。',
    },
    {
      type: 'exposition',
      text: '为什么叫"堆"？\n内存块散落在各处，像一堆杂物——你要哪块就申请哪块，用完归还。',
    },
    {
      type: 'multiple-choice',
      question: '栈变量和堆变量的生命周期谁更长？',
      options: [
        { text: '栈变量，因为它更底层', correct: false, explanation: '栈变量随作用域销毁' },
        { text: '堆变量，只要不 delete 就一直存在', correct: true, explanation: '堆变量由程序员控制，理论上可以活到程序结束' },
        { text: '一样长，都和程序一致', correct: false, explanation: '栈变量离开作用域就没了' },
        { text: '堆变量更短，因为要手动管理', correct: false, explanation: '堆变量可以活更久' },
      ],
    },
    {
      type: 'exposition',
      text: '记住：\n- 栈 = 自动管理，快但小\n- 堆 = 手动管理，慢但大\n- 从下节课开始，我们正式进入堆的世界——`new` 和 `delete`。',
      textAnimation: 'typewriter',
    },
  ],
}

export default lesson
