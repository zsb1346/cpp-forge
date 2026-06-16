import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'pass-by-value',
    chapter: 6,
    title: '值传递——函数收到副本',
    subtitle: '拷贝不修改原值',
    description: '理解函数参数默认是值传递，函数内部修改参数不会影响外部变量。',
    objectives: ['能解释值传递的含义', '能通过代码验证值传递的行为', '理解拷贝开销的概念'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '从阶段 4 开始你就一直在用函数——\n但你有没有想过：传给函数的变量，函数里改了会怎样？',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '答案是：**不会怎样**。\n因为默认情况下，函数拿到的是参数的**副本**。',
    },
    {
      type: 'exposition',
      text: '这叫做**值传递**（pass by value）：\n- 调用函数时，实参的值被**拷贝**一份给形参\n- 函数内部操作的是拷贝，不影响原来的变量',
    },
    {
      type: 'exposition',
      text: '看这个例子：',
      code: '#include <iostream>\nusing namespace std;\n\nvoid change(int x) {\n  x = 999;  // 修改的是拷贝\n}\n\nint main() {\n  int a = 10;\n  change(a);\n  cout << a;  // 还是 10，没变！\n}',
    },
    {
      type: 'concept-cards',
      instruction: '值传递的三个要点：',
      cards: [
        { glyph: '📋', term: '实参', meaning: '调用时传入的变量', example: 'change(a) 中的 a' },
        { glyph: '📄', term: '形参', meaning: '函数定义中的参数', example: 'change(int x) 中的 x' },
        { glyph: '📦', term: '拷贝', meaning: '形参是实参的副本', example: '修改 x 不影响 a' },
      ],
    },
    {
      type: 'code-runner',
      instruction: '运行这段代码——观察 a 为什么没变？',
      code: '#include <iostream>\nusing namespace std;\n\nvoid doubleIt(int x) {\n  x = x * 2;\n  cout << "函数内部: x = " << x << endl;\n}\n\nint main() {\n  int a = 5;\n  cout << "调用前: a = " << a << endl;\n  doubleIt(a);\n  cout << "调用后: a = " << a << endl;\n}',
      expectedOutput: '调用前: a = 5\n函数内部: x = 10\n调用后: a = 5',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'exposition',
      text: '运行结果证明：\n- 函数内部 x 变成了 10\n- 但外部的 a 还是 5\n- 因为 x 是 a 的**副本**',
    },
    {
      type: 'multiple-choice',
      question: '复习前一课：引用和指针的三个主要区别中哪个最重要？',
      options: [
        { text: '引用更短，指针更长', correct: false, explanation: '这不是核心区别' },
        { text: '引用不能为空且不能改绑', correct: true, explanation: '这是引用最核心的安全特性' },
        { text: '指针只能用 int 类型', correct: false, explanation: '指针可以是任何类型' },
        { text: '引用不能用在函数里', correct: false, explanation: '引用完全可以用于函数' },
      ],
    },
    {
      type: 'exposition',
      text: '好处：值传递**安全**——你不用担心函数把你的变量改乱了。',
    },
    {
      type: 'exposition',
      text: '坏处：如果数据很大（比如一个巨大的数组），\n**每次拷贝都花时间和内存**。',
    },
    {
      type: 'code-runner',
      instruction: '修改这段代码，在函数里把 x 加 3，验证外部 a 不变：',
      code: '#include <iostream>\nusing namespace std;\n\nvoid addThree(int x) {\n  x = x + 3;\n}\n\nint main() {\n  int a = 10;\n  addThree(a);\n  cout << a << endl;\n}',
      expectedOutput: '10',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'multiple-choice',
      question: '回忆阶段 4：`void sayHello() { cout << "Hi"; }` 这个函数的返回类型是什么？',
      options: [
        { text: 'int', correct: false, explanation: '返回类型是 void' },
        { text: 'void', correct: true, explanation: 'void 表示不返回任何值' },
        { text: '没有返回类型', correct: false, explanation: 'void 也是一种返回类型' },
        { text: 'string', correct: false, explanation: '没有字符串返回类型' },
      ],
    },
    {
      type: 'exposition',
      text: '值传递的"复制"行为也适用于指针本身：',
      code: 'void func(int* p) {\n  p = nullptr;  // 只修改了 p 的拷贝\n}\n\nint main() {\n  int x = 5;\n  int* ptr = &x;\n  func(ptr);\n  // ptr 仍然指向 x，没有变成 nullptr\n}',
    },
    {
      type: 'exposition',
      text: '注意：指针 **本身是值传递**，但通过指针**可以修改指向的值**：',
      code: 'void func(int* p) {\n  *p = 999;  // 修改的是 p 指向的值\n}\n\nint main() {\n  int x = 5;\n  func(&x);\n  cout << x;  // 999\n}',
    },
    {
      type: 'multiple-choice',
      question: '以下关于值传递的说法哪个正确？',
      options: [
        { text: '函数修改形参会影响实参', correct: false, explanation: '值传递形参是副本，修改不影响实参' },
        { text: '函数拿到的是实参的副本', correct: true, explanation: '值传递就是拷贝实参的值给形参' },
        { text: '值传递不会拷贝内存', correct: false, explanation: '每次值传递都会发生拷贝' },
        { text: '值传递比引用传递快', correct: false, explanation: '值传递有拷贝开销，大数据时更慢' },
      ],
    },
    {
      type: 'code-runner',
      instruction: '运行这段——观察值传递中指针参数的行为：',
      code: '#include <iostream>\nusing namespace std;\n\nvoid tryChange(int* p) {\n  p = nullptr;  // 尝试把指针本身改成 nullptr\n}\n\nint main() {\n  int x = 5;\n  int* ptr = &x;\n  tryChange(ptr);\n  if (ptr) {\n    cout << "ptr 没变: " << *ptr << endl;\n  } else {\n    cout << "ptr 变了" << endl;\n  }\n}',
      expectedOutput: 'ptr 没变: 5',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'exposition',
      text: '看到了吗？指针本身也是值传递——函数里改了 p，外部的 ptr 不受影响。\n但如果函数通过 `*p` 修改指向的值，那就能改到。',
    },
    {
      type: 'exposition',
      text: '总结：\n- 值传递 = 函数拿到**副本**\n- 修改形参 **不**影响实参\n- 好处是安全\n- 坏处是大数据时慢',
    },
    {
      type: 'exposition',
      text: '下一课：**引用传递**——不拷贝，直接操作原变量。',
    },
  ],
}

export default lesson
