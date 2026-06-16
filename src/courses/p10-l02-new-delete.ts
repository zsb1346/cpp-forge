import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'new-delete',
    chapter: 11,
    title: 'new 和 delete',
    subtitle: '手动申请手动释放',
    description: '学习用 new 在堆上分配内存，用 delete 释放内存，理解配对规则。',
    objectives: ['能用 new 在堆上分配基本类型内存', '能用 delete 释放堆内存', '能理解 new/delete 必须配对使用'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '在堆上分配内存，用 `new`。\n`new` 会返回一个指针，指向新分配的内存。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '最基本的写法：',
      code: 'int* p = new int;  // 在堆上分配一个 int',
    },
    {
      type: 'exposition',
      text: '`new int` 做了两件事：\n1. 在堆上分配一块足够存 `int` 的内存\n2. 返回这块内存的地址\n存在 `p` 里，通过 `p` 来操作它。',
    },
    {
      type: 'concept-cards',
      instruction: '认识 new/delete 的各个部分：',
      cards: [
        { glyph: '🆕', term: 'new int', meaning: '在堆上分配 int 大小的内存', example: 'new int' },
        { glyph: '🔙', term: '返回指针', meaning: 'new 返回分配好的内存地址', example: 'int* p = new int;' },
        { glyph: '🗑️', term: 'delete p', meaning: '释放 p 指向的堆内存', example: 'delete p;' },
        { glyph: '⚠️', term: '配对规则', meaning: 'new 配 delete，缺一不可', example: 'new → delete' },
      ],
    },
    {
      type: 'exposition',
      text: '分配后怎么用？用 `*p` 解引用——就像普通指针一样。',
      code: 'int* p = new int;\n*p = 42;               // 通过指针赋值\ncout << *p << endl;   // 输出 42',
    },
    {
      type: 'exposition',
      text: '用完一定要 `delete`，把内存还给系统：',
      code: 'delete p;  // 释放 p 指向的堆内存\n// p 本身还在，但指向的内存已释放',
    },
    {
      type: 'type-it',
      instruction: '敲下面的代码：分配一个堆上的 int，赋值，输出，释放。',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int* p = new int;\n  *p = 100;\n  cout << *p << endl;\n  delete p;\n}',
      hints: ['`new int` 在堆上分配内存', '`*p = 100` 给堆上的变量赋值', '最后一定要 `delete p` 释放'],
    },
    {
      type: 'exposition',
      text: '`new` 也可以同时初始化：',
      code: 'int* p = new int(42);  // 分配并初始化为 42\ndouble* d = new double(3.14);',
    },
    {
      type: 'exposition',
      text: '`new` 分配的堆内存，在 `delete` 之前**永远存活**。\n即使创建它的函数结束了，内存还在。',
      code: 'int* createInt() {\n  int* p = new int(99);\n  return p;  // 返回堆地址\n}  // p 本地变量销毁了，但堆内存还在',
    },
    {
      type: 'type-it',
      instruction: '敲这段代码：函数返回堆地址，在外部释放。',
      code: '#include <iostream>\nusing namespace std;\n\nint* makeValue(int x) {\n  int* p = new int(x);\n  return p;\n}\n\nint main() {\n  int* ptr = makeValue(77);\n  cout << *ptr << endl;\n  delete ptr;\n}',
      hints: ['函数内 new 的内存可以返回地址', '在调用方用 delete 释放', 'new 和 delete 可以不在同一个函数'],
    },
    {
      type: 'multiple-choice',
      question: '`int* p = new int(5);` 执行后，p 指向的内存里存的值是多少？',
      options: [
        { text: '不确定的随机值', correct: false, explanation: 'new int(5) 用 5 初始化了' },
        { text: '5', correct: true, explanation: 'new int(5) 分配并初始化为 5' },
        { text: 'p 的地址', correct: false, explanation: 'p 存的是地址，不是 5' },
        { text: '0', correct: false, explanation: 'new int(5) 会初始化为 5，不是 0' },
      ],
    },
    {
      type: 'exposition',
      text: '**铁律**：每次 `new` 必须对应一次 `delete`。\n多删或少删都是问题——接下来几课会讲。',
    },
    {
      type: 'exposition',
      text: '如果忘记 `delete`，内存会一直占用直到程序结束。\n程序跑得越久，占得越多——这叫**内存泄漏**。',
    },
    {
      type: 'multiple-choice',
      question: '复习上一课：栈上的变量什么时候销毁？',
      options: [
        { text: '程序结束时', correct: false, explanation: '栈变量在离开作用域时销毁' },
        { text: '离开所在的作用域时', correct: true, explanation: '栈变量在 } 处自动销毁' },
        { text: '调用 delete 时', correct: false, explanation: '栈变量不需要 delete' },
        { text: '永远不会销毁', correct: false, explanation: '栈变量会自动销毁' },
      ],
    },
    {
      type: 'exposition',
      text: '常见错误：混用 `new` 和 `malloc`。\nC++ 中用 `new`/`delete`，不要混 C 的 `malloc`/`free`。',
    },
    {
      type: 'exposition',
      text: '另一个常见错误：`delete` 后继续使用指针。\n`delete` 后指针还在，但指向的内存已经还给系统了——**不要再用了**。',
    },
    {
      type: 'type-it',
      instruction: '最后敲一个完整示例：分配、赋值、输出、释放。',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  double* d = new double(2.718);\n  cout << "e ≈ " << *d << endl;\n  *d = 3.14;\n  cout << "改为: " << *d << endl;\n  delete d;\n}',
      hints: ['`new double(2.718)` 分配并初始化', '可以随时修改 *d 的值', '最后 delete 释放，养成习惯'],
    },
    {
      type: 'exposition',
      text: '记住：\n- `new` = 向堆申请内存\n- `delete` = 把内存还给堆\n- 一一配对，不要漏，不要多。',
      textAnimation: 'typewriter',
    },
  ],
}

export default lesson
