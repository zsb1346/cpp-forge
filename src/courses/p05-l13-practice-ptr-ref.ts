import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'practice-ptr-ref',
    chapter: 6,
    title: '指针与引用练习',
    subtitle: '巩固 01-12',
    description: '综合练习指针、引用、参数传递、重载、默认参数，巩固前 12 课的核心概念。',
    objectives: ['能熟练运用指针和引用', '能区分值传递和引用传递', '能写出带默认参数和重载的函数'],
    estimatedMinutes: 12,
  },
  blocks: [
    {
      type: 'exposition',
      text: '前 12 课学了不少新东西：指针、引用、重载、默认参数……\n这课不做新概念，专门**练**。',
      textAnimation: 'typewriter',
    },
    {
      type: 'type-it',
      instruction: '敲这段代码——用指针解引用修改值：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int x = 1, y = 2, z = 3;\n  int* p = &x;\n  *p = 10;\n  p = &y;\n  *p = 20;\n  p = &z;\n  *p = 30;\n  cout << x << " " << y << " " << z << endl;\n}',
      hints: ['指针 p 先指向 x，改 x 为 10', '然后 p 改指向 y，改 y 为 20', '最后指向 z，改 z 为 30'],
    },
    {
      type: 'code-runner',
      instruction: '这段代码用了指针——运行看看结果，然后改成用引用实现同样的效果：',
      code: '#include <iostream>\nusing namespace std;\n\nvoid triple(int* p) {\n  *p = (*p) * 3;\n}\n\nint main() {\n  int n = 5;\n  triple(&n);\n  cout << n << endl;\n}',
      expectedOutput: '15',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'multiple-choice',
      question: '回顾 Lesson 04：`int x = 10; int* p = &x; *p = 20;` 后 x 的值是？',
      options: [
        { text: '10', correct: false, explanation: '*p = 20 修改了 x' },
        { text: '20', correct: true, explanation: '*p 就是 x，所以 x 变成 20' },
        { text: 'x 的地址', correct: false, explanation: 'x 存的是值，不是地址' },
        { text: '未定义', correct: false, explanation: '操作是合法的，x 被改为 20' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾 Lesson 08：引用和指针，哪个说法正确？',
      options: [
        { text: '引用可以为 null', correct: false, explanation: '引用必须绑定有效变量，不能为 null' },
        { text: '指针可以改指，引用不能改绑', correct: true, explanation: '这是引用和指针的核心区别之一' },
        { text: '引用需要解引用才能用', correct: false, explanation: '引用直接用，不需要 *' },
        { text: '指针必须初始化', correct: false, explanation: '指针可以不初始化，但不安全' },
      ],
    },
    {
      type: 'type-it',
      instruction: '敲这段——用引用做参数实现累加：',
      code: '#include <iostream>\nusing namespace std;\n\nvoid accumulate(int& total, int value) {\n  total = total + value;\n}\n\nint main() {\n  int sum = 0;\n  accumulate(sum, 10);\n  accumulate(sum, 20);\n  accumulate(sum, 30);\n  cout << sum << endl;\n}',
      hints: ['`int& total` 是引用参数', '每次调用累加到 sum 上', '三次调用后 sum = 0+10+20+30 = 60'],
    },
    {
      type: 'exposition',
      text: '接下来练函数重载和默认参数。',
    },
    {
      type: 'type-it',
      instruction: '敲这段重载函数——画不同字符的线：',
      code: '#include <iostream>\nusing namespace std;\n\nvoid line(int len) {\n  for (int i = 0; i < len; i++) cout << "-";\n  cout << endl;\n}\n\nvoid line(int len, char ch) {\n  for (int i = 0; i < len; i++) cout << ch;\n  cout << endl;\n}\n\nint main() {\n  line(5);\n  line(5, \'*\');\n}',
      hints: ['第一个 `line(5)` 输出 -----', '第二个 `line(5, \'*\')` 输出 *****', '两个函数同名但参数不同——重载'],
    },
    {
      type: 'code-runner',
      instruction: '用默认参数简化上面的画线函数——运行观察：',
      code: '#include <iostream>\nusing namespace std;\n\nvoid line(int len, char ch = \'-\') {\n  for (int i = 0; i < len; i++) cout << ch;\n  cout << endl;\n}\n\nint main() {\n  line(5);\n  line(5, \'*\');\n}',
      expectedOutput: '-----\n*****',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'fill-in',
      prompt: '实现一个函数，用指针参数交换两个 int 变量的值。',
      template: 'void swap(____ a, ____ b) {\n  int temp = ____;\n  ____;\n  *b = temp;\n}',
      answers: ['int*', 'int*', '*a', '*a = *b'],
      hints: ['参数类型用 int* 指针', 'temp 保存 a 指向的值', '*a = *b 把 b 的值赋给 a'],
    },
    {
      type: 'exposition',
      text: '接下来用指针操作数组——这是指针最常见的用途之一。',
    },
    {
      type: 'type-it',
      instruction: '敲这段——用指针遍历数组：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int arr[5] = {10, 20, 30, 40, 50};\n  int* p = arr;\n  for (int i = 0; i < 5; i++) {\n    cout << *(p + i) << " ";\n  }\n  cout << endl;\n}',
      hints: ['`int* p = arr` 数组名就是首地址', '`*(p + i)` 取第 i 个元素的值', '指针加整数 = 向后移动地址'],
    },
    {
      type: 'multiple-choice',
      question: '指针 p 指向 x，要修改 x 的值应该怎么写？',
      options: [
        { text: 'p = 新值', correct: false, explanation: 'p 存的是地址，改 p 不会改 x' },
        { text: '*p = 新值', correct: true, explanation: '*p 解引用直接修改 x' },
        { text: '&p = 新值', correct: false, explanation: '&p 是 p 自己的地址' },
        { text: 'x = *p', correct: false, explanation: '这是把 p 指向的值赋给 x' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '回忆阶段 4 的函数：以下代码输出什么？\n`int add(int a, int b) { return a + b; }` 然后 `cout << add(3, 4);`',
      options: [
        { text: '34', correct: false, explanation: '这是拼接，C++ 中 + 对 int 是加法' },
        { text: '7', correct: true, explanation: '3 + 4 = 7' },
        { text: '12', correct: false, explanation: '3*4=12，不是乘法' },
        { text: '编译错误', correct: false, explanation: '代码完全合法' },
      ],
    },
    {
      type: 'fill-in',
      prompt: '写一个引用传递的函数，把传入的整数翻三倍。',
      template: 'void ____(____& x) {\n  x = ____;\n}',
      answers: ['triple', 'int', 'x * 3'],
      hints: ['函数名用 triple', '参数是 int 的引用', '把 x 设为原来的 3 倍'],
    },
    {
      type: 'code-runner',
      instruction: '运行这个最终练习——用引用传递实现一个"增长"函数：',
      code: '#include <iostream>\nusing namespace std;\n\nvoid grow(int& value, int amount = 1) {\n  value += amount;\n}\n\nint main() {\n  int hp = 50;\n  grow(hp, 20);\n  cout << hp << endl;\n  grow(hp);\n  cout << hp << endl;\n  grow(hp, 10);\n  cout << hp << endl;\n}',
      expectedOutput: '70\n71\n81',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'exposition',
      text: '练习完成。你练了：指针解引用、指针改指、引用参数、重载、默认参数、指针遍历数组。',
    },
    {
      type: 'exposition',
      text: '下一课：**多文件编程**——把代码拆到 .h 和 .cpp 文件中。',
    },
  ],
}

export default lesson
