import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'dereference-operator',
    chapter: 6,
    title: '* 解引用——从地址找值',
    subtitle: '顺着地址找值',
    description: '学习用 * 运算符解引用指针，获取或修改指针指向的值。',
    objectives: ['能用 *p 获取指针指向的值', '能用 *p 修改指针指向的值', '区分 p 和 *p 的含义'],
    estimatedMinutes: 12,
  },
  blocks: [
    {
      type: 'exposition',
      text: '上一课我们学了：\n`int* p = &x;` — 指针 p 存了 x 的地址。',
    },
    {
      type: 'exposition',
      text: '现在问题来了：**我拿到了地址，怎么找到这个地址里的值？**\n用 `*` 运算符——这次叫**解引用**。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '`*p` 的意思是：**"去 p 存的地址那里，找到值"**。',
      code: 'int x = 42;\nint* p = &x;\n\ncout << *p;  // 输出 42——因为 p 指向 x，*p 就是 x 的值',
    },
    {
      type: 'concept-cards',
      instruction: '解引用操作的三个角色：',
      cards: [
        { glyph: '🗺️', term: 'p', meaning: '指针，存了一个地址', example: 'p = &x' },
        { glyph: '📍', term: '*p', meaning: '顺着地址找到的值', example: '*p → x 的值' },
        { glyph: '✏️', term: '*p = 新值', meaning: '修改指针指向的变量', example: '*p = 99; → x=99' },
      ],
    },
    {
      type: 'type-it',
      instruction: '敲这段代码，用 *p 获取 x 的值：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int x = 42;\n  int* p = &x;\n  cout << "x = " << x << endl;\n  cout << "*p = " << *p << endl;\n}',
      hints: ['`*p` 取出 p 指向的值，应该和 x 一样', '第一行输出 x 的值，第二行输出 *p 的值', 'p 存地址，*p 取该地址的值'],
    },
    {
      type: 'multiple-choice',
      question: '复习一下：声明 `int* p;` 中的 `*` 表示什么？',
      options: [
        { text: '乘法运算符', correct: false, explanation: '乘法是二元运算符，如 a * b' },
        { text: '解引用运算符', correct: false, explanation: '解引用是在使用指针时用的，不是声明时' },
        { text: '表示 p 是指针类型', correct: true, explanation: '声明中的 * 表示"这是一个指针"' },
        { text: '取地址', correct: false, explanation: '取地址用 &，不是 *' },
      ],
    },
    {
      type: 'exposition',
      text: '**重要：解引用不仅能读，还能写。**\n`*p = 新值` — 通过指针修改它指向的变量。',
      code: 'int x = 10;\nint* p = &x;\n\n*p = 100;      // 等价于 x = 100\ncout << x;     // 输出 100',
    },
    {
      type: 'type-it',
      instruction: '敲这段代码，用 *p 修改 x 的值：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int x = 10;\n  int* p = &x;\n  cout << "修改前: x = " << x << endl;\n  *p = 999;\n  cout << "修改后: x = " << x << endl;\n}',
      hints: ['`*p = 999;` 通过指针把 x 改成 999', '修改前输出 x=10，修改后 x=999', '*p 就是 x 的别名'],
    },
    {
      type: 'exposition',
      text: '所以 `p` 和 `*p` 的区别：\n- `p` 是**地址**（比如 0x7ffe12）\n- `*p` 是**这个地址里的值**（比如 42）',
    },
    {
      type: 'multiple-choice',
      question: 'int x = 5; int* p = &x; 之后执行 *p = 20;，x 的值是多少？',
      options: [
        { text: '5', correct: false, explanation: '*p = 20 修改了 x，x 不再是 5' },
        { text: '20', correct: true, explanation: '*p = 20 等价于 x = 20' },
        { text: 'x 的地址', correct: false, explanation: 'x 存的是值，不是地址' },
        { text: '不确定', correct: false, explanation: '确定是 20，*p 就是 x' },
      ],
    },
    {
      type: 'exposition',
      text: '新手常见错误：弄混 `p` 和 `*p`。',
      code: 'int x = 5;\nint* p = &x;\n\ncout << p;   // 输出地址（十六进制数）\ncout << *p;  // 输出 5（x 的值）',
    },
    {
      type: 'fill-in',
      prompt: '声明一个 int 变量 val=88，再声明指针 ptr 指向 val，然后用解引用输出 val 的值。',
      template: 'int ____ = 88;\nint* ____ = &val;\ncout << ____;',
      answers: ['val', 'ptr', '*ptr'],
      hints: ['第一个空：变量名', '第二个空：指针名', '第三个空：解引用得到值'],
    },
    {
      type: 'type-it',
      instruction: '敲这个完整例子——演示解引用读取和写入：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int score = 75;\n  int* p = &score;\n  cout << "原始分数: " << *p << endl;\n  *p = 100;\n  cout << "修改后分数: " << score << endl;\n}',
      hints: ['`*p` 读出 score 的值 75', '`*p = 100` 修改 score 为 100', '解引用可以出现在赋值符号两边'],
    },
    {
      type: 'exposition',
      text: '解引用只能用于**已经指向有效变量的指针**。\n如果指针没有指向有效变量，解引用会导致程序崩溃。',
      code: 'int* p;      // p 未初始化\ncout << *p;   // ❌ 危险！可能崩溃',
    },
    {
      type: 'multiple-choice',
      question: '以下哪些说法正确？（多选）',
      mode: 'multiple',
      options: [
        { text: 'p 存地址，*p 取该地址的值', correct: true, explanation: '这是指针和解引用的基本关系' },
        { text: '可以用 *p = 值 来修改指向的变量', correct: true, explanation: '解引用可以出现在赋值号左边' },
        { text: '指针未初始化时可以安全解引用', correct: false, explanation: '未初始化的指针解引用会导致崩溃' },
        { text: '& 和 * 是互逆操作', correct: true, explanation: '&x 取地址，*p 从地址找值' },
      ],
    },
    {
      type: 'type-it',
      instruction: '敲一个综合练习——声明指针、取地址、解引用读和写：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int x = 7;\n  int* p = &x;\n  cout << "原始值: " << *p << endl;\n  *p = 77;\n  cout << "新值: " << x << endl;\n  *p = *p + 23;\n  cout << "最终值: " << x << endl;\n}',
      hints: ['`int* p = &x` 声明指针并初始化', '`*p = 77` 通过指针修改 x', '`*p = *p + 23` 读取再修改'],
    },
    {
      type: 'exposition',
      text: '总结：\n- `&x` → 取 x 的地址\n- `*p` → 从 p 存的地址中取值\n- `*p = 值` → 修改 p 指向的变量',
    },
    {
      type: 'exposition',
      text: '下一课：`*` 有两个完全不同的含义——声明指针和解引用。\n分不清会出大问题。',
    },
  ],
}

export default lesson
