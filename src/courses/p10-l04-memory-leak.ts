import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'memory-leak',
    chapter: 11,
    title: '内存泄漏',
    subtitle: '只 new 不 delete',
    description: '理解内存泄漏的危害——new 了不 delete，内存越占越多，最终程序崩溃。',
    objectives: ['能识别内存泄漏的场景', '能理解内存泄漏的危害', '能养成 new 后不忘 delete 的习惯'],
    estimatedMinutes: 9,
  },
  blocks: [
    {
      type: 'exposition',
      text: '`new` 在堆上申请了内存，**必须**用 `delete` 还回去。\n如果你只借不还——那就是**内存泄漏**。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '内存泄漏的定义：\n**堆上分配的内存，失去了所有指向它的指针，再也无法释放。**',
    },
    {
      type: 'exposition',
      text: '简单说：你盖了个仓库，然后把钥匙丢了。\n仓库还在，但谁也打不开、谁也进不去了。',
    },
    {
      type: 'exposition',
      text: '看一个泄漏的例子：',
      code: 'void leak() {\n  int* p = new int(42);\n  // 忘记 delete p\n}  // p 销毁了，但堆内存还在\n   // 再也没有指针指向它了',
    },
    {
      type: 'exposition',
      text: '`leak()` 调用一次，少 4 字节。调用一万次，少 40KB。\n如果程序一直跑——服务器跑几天——内存被吃光。',
    },
    {
      type: 'code-runner',
      instruction: '运行下面的代码，观察泄漏的效果（不可编辑）：',
      code: '#include <iostream>\nusing namespace std;\n\nvoid leakMemory() {\n  int* p = new int(123);\n  // 忘了 delete\n  cout << "分配了一个 int，但没释放" << endl;\n}\n\nint main() {\n  for (int i = 0; i < 5; i++) {\n    leakMemory();\n  }\n  cout << "5 次泄漏完成" << endl;\n}',
      expectedOutput: '分配了一个 int，但没释放\n分配了一个 int，但没释放\n分配了一个 int，但没释放\n分配了一个 int，但没释放\n分配了一个 int，但没释放\n5 次泄漏完成',
      comparison: 'trimmed',
      editable: false,
    },
    {
      type: 'exposition',
      text: '上面的代码每调用一次 `leakMemory()`，就丢失 4 字节。\n每次 `new` 不配 `delete`，泄漏一点点——积少成多。',
    },
    {
      type: 'exposition',
      text: '泄漏的危害：\n1. 程序内存越占越多\n2. 系统变慢\n3. 最终程序被系统杀掉（OOM——Out of Memory）',
    },
    {
      type: 'multiple-choice',
      question: '下面哪个是内存泄漏的典型场景？',
      options: [
        { text: '函数内 new 了一个数组，最后 delete[] 了', correct: false, explanation: '释放了就不算泄漏' },
        { text: '函数内 new 了一个 int，忘了 delete 就结束了', correct: true, explanation: 'new 了没 delete，指针丢了，就是泄漏' },
        { text: '声明了一个栈上的 int 变量', correct: false, explanation: '栈变量自动释放，不涉及堆' },
        { text: 'delete 了一个空指针', correct: false, explanation: 'delete 空指针是安全的，不算泄漏' },
      ],
    },
    {
      type: 'exposition',
      text: '还有更隐蔽的泄漏：**提前 return 忘了 delete**。',
      code: 'void process() {\n  int* data = new int[1000];\n  if (/* 某些条件 */) {\n    return;  // ❌ 忘了 delete[] data\n  }\n  delete[] data;\n}',
    },
    {
      type: 'exposition',
      text: '上面的代码，如果条件满足提前 `return`，`delete[]` 就永远不会执行。\n**路径越多，越容易漏。**',
    },
    {
      type: 'exposition',
      text: '另一个常见场景：**指针被重新赋值**。',
      code: 'int* p = new int(10);\np = new int(20);  // 第一个 int 泄漏了！\ndelete p;          // 只释放了第二个',
    },
    {
      type: 'multiple-choice',
      question: '复习上一课：new[] 应该对应什么来释放？',
      options: [
        { text: 'delete', correct: false, explanation: '数组版本必须用 delete[]' },
        { text: 'delete[]', correct: true, explanation: 'new[] 配 delete[]' },
        { text: 'free()', correct: false, explanation: 'C 的 free 不能和 new 混用' },
        { text: '不需要释放，会自动回收', correct: false, explanation: '堆内存不会自动回收' },
      ],
    },
    {
      type: 'exposition',
      text: '如何避免内存泄漏？\n1. 每次 `new` 立刻写对应的 `delete`\n2. 用 RAII（后面会学）\n3. 用智能指针 `unique_ptr`、`shared_ptr`',
    },
    {
      type: 'exposition',
      text: '规则：**谁 `new` 谁 `delete`**。\n分配内存的代码负责释放——不要扔给别人。',
    },
    {
      type: 'exposition',
      text: '工具可以检测泄漏：\n- Valgrind（Linux）\n- Visual Studio 的调试堆\n- ASan（AddressSanitizer）',
    },
    {
      type: 'multiple-choice',
      question: '下列哪个说法正确？',
      options: [
        { text: '内存泄漏只影响当前程序，不影响系统', correct: false, explanation: '泄漏多了系统内存不足，影响全局' },
        { text: 'new 了不 delete，内存会一直占用', correct: true, explanation: '堆内存不会自动释放，直到程序结束' },
        { text: '程序结束时泄漏的内存会被自动回收，所以没关系', correct: false, explanation: '长期运行的程序等不到程序结束就崩了' },
        { text: '内存泄漏只在 debug 模式下发生', correct: false, explanation: 'release 模式一样泄漏' },
      ],
    },
    {
      type: 'exposition',
      text: '不要想"才 4 字节，没关系"。\n每行泄漏的代码都是定时炸弹——量变引起质变。',
    },
    {
      type: 'exposition',
      text: '记住：\n- **new = 借内存**\n- **delete = 还内存**\n- **不还 = 泄漏**\n- 养成配对习惯，别给未来的自己埋坑。',
      textAnimation: 'typewriter',
    },
  ],
}

export default lesson
