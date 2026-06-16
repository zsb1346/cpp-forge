import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'step-over-into',
    chapter: 7,
    title: '跳过 vs 进入函数',
    subtitle: '单步的技巧',
    description: '理解 Step Over 和 Step Into 的区别，学会在不同场景选择合适的单步方式。',
    objectives: [
      '能区分 Step Over 和 Step Into',
      '知道什么时候该用 Step Into',
      '知道什么时候不该 Step Into',
    ],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '程序停在断点后，你按"单步执行"——\n但如果当前行是一个**函数调用**，问题来了：\n要不要进到函数里面去？',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '调试器给你两个选择：\n**Step Over**（跳过）和 **Step Into**（进入）。\n这两个操作处理函数调用时完全不同。',
    },
    {
      type: 'exposition',
      text: '**Step Over**（快捷键 F10）：\n把函数调用当成一个"黑箱"，一步执行完整个函数。\n不进去看函数内部发生了什么，直接跳到下一行。\n\n你只关心函数返回的结果，不关心函数内部怎么实现的。',
    },
    {
      type: 'exposition',
      text: '**Step Into**（快捷键 F11）：\n进入函数内部，一行一行地执行函数里的代码。\n你想知道函数里发生了什么，每一步变量怎么变的。\n\n你关心函数内部的实现细节。',
    },
    {
      type: 'concept-cards',
      instruction: '两种单步方式的区别：',
      cards: [
        { glyph: '\uD83D\uDE04', term: 'Step Over', meaning: '\u4E0D\u8FDB\u51FD\u6570\uFF0C\u4E00\u6B65\u6267\u884C\u5B8C', example: '\u770B\u7ED3\u679C\uFF0C\u4E0D\u770B\u5185\u90E8' },
        { glyph: '\uD83D\uDC46', term: 'Step Into', meaning: '\u8FDB\u51FD\u6570\u5185\u90E8\u9010\u884C\u8C03\u8BD5', example: '\u770B\u5185\u90E8\u6BCF\u4E00\u6B65\u53D8\u5316' },
      ],
    },
    {
      type: 'exposition',
      text: '举个例子：',
      code: 'int add(int a, int b) {\n  int result = a + b;\n  return result;\n}\n\nint main() {\n  int x = add(3, 4);  // ← 断点设在这里\n  cout << x;\n}',
    },
    {
      type: 'exposition',
      text: '断点停在 `int x = add(3, 4);` 这一行。\n\n按 **Step Over**：直接执行完 `add` 函数，跳到下一行 `cout << x;`。\n你看到结果 `x = 7`，但不关心 `add` 里面怎么算的。\n\n按 **Step Into**：跳进 `add` 函数，停在 `int result = a + b;` 这一行。\n你可以看到 `a=3`、`b=4`、`result=7`。',
    },
    {
      type: 'multiple-choice',
      question: '你调试一段代码，遇到函数调用 `int area = calcArea(5, 10);`，你想确认 `calcArea` 内部的计算公式对不对。应该用哪种？',
      options: [
        { text: 'Step Into，进函数里面看', correct: true, explanation: '你关心函数内部实现是否正确，就需要 Step Into' },
        { text: 'Step Over，跳过函数', correct: false, explanation: '跳过就看不到内部了，只能看到结果' },
        { text: '重新设一个断点在 calcArea 里面', correct: false, explanation: '这也是可以的，但 Step Into 更方便，不用提前设断点' },
        { text: '不用管，直接运行完', correct: false, explanation: '那你就没法确认内部实现了' },
      ],
    },
    {
      type: 'exposition',
      text: '第三种操作：**Step Out**（快捷键 Shift+F11）。\n如果你 Step Into 了一个函数，但看着看着发现没问题，\n想直接跳出去回到调用处，就用 Step Out。\n它会执行完当前函数的剩余部分，跳出到调用者那里。',
    },
    {
      type: 'exposition',
      text: '三种操作的配合使用：\n- 遇到自定义函数，不确定内部是否正确 → **Step Into**\n- 遇到标准库或别人的函数，确信没问题 → **Step Over**\n- 不小心进去了，想出来 → **Step Out**',
    },
    {
      type: 'multiple-choice',
      question: '你 Step Into 了一个函数，看了一半发现这个函数没问题，想回到原来的调用处。应该按哪个？',
      options: [
        { text: 'Step Out', correct: true, explanation: 'Step Out 执行完当前函数剩余部分，跳出到调用者' },
        { text: 'Step Over', correct: false, explanation: 'Step Over 在当前函数内跳到下一行，不会跳出函数' },
        { text: 'Step Into', correct: false, explanation: 'Step Into 是往更深层走，不是往回走' },
        { text: '重新启动调试', correct: false, explanation: '太极端了，Step Out 就够了' },
      ],
    },
    {
      type: 'exposition',
      text: '一个常见的错误：**Step Into 了标准库函数**。\n比如你按了 Step Into，而当前行是 `cout << x;`——\n你会一头栽进 cout 的几百行内部代码里。',
    },
    {
      type: 'exposition',
      text: '标准库的函数（`cout`、`cin`、`sqrt`、`vector` 的方法等等）——\n**不要 Step Into**。\n这些是别人写好的、经过无数测试的代码，不可能是 bug 的来源。\n进去只会看到一堆你暂时看不懂的底层实现。',
    },
    {
      type: 'multiple-choice',
      question: '调试到 `int root = sqrt(16);` 这一行，你应该怎么操作？',
      options: [
        { text: 'Step Over，因为 sqrt 是标准库函数', correct: true, explanation: 'sqrt 是数学库的函数，不需要进去看' },
        { text: 'Step Into，看看 sqrt 怎么算的', correct: false, explanation: '标准库内部实现很复杂，初学者进去也看不懂' },
        { text: 'Step Out，跳过这行', correct: false, explanation: 'Step Out 是往外出，不能用在当前行' },
        { text: '删掉这行重新写', correct: false, explanation: '没必要，sqrt 是对的' },
      ],
    },
    {
      type: 'exposition',
      text: '怎么判断一个函数能不能 Step Into？\n\n**应该 Step Into**：\n- 你自己写的函数\n- 你队友写的、你怀疑有 bug 的函数\n- 想学习某个函数的具体实现',
    },
    {
      type: 'exposition',
      text: '**应该 Step Over**：\n- 标准库函数（cout, cin, sqrt, vector 等）\n- 第三方库的函数（你确信没问题）\n- 已经调试过的、确认正确的函数',
    },
    {
      type: 'exposition',
      text: '实战场景：\n\n假设你写了三个函数：`input()`、`calc()`、`output()`。\n结果不对——你怀疑 `calc()` 出了问题。\n\n断点设在 `calc()` 调用的地方，然后 Step Into 进去。\n在 `calc()` 里面单步执行，观察每一步的变量。\n找到问题后修掉。',
    },
    {
      type: 'type-it',
      instruction: '敲一段有函数调用的代码，想象在调试时用 Step Into：',
      code: '#include <iostream>\nusing namespace std;\n\nint doubleIt(int n) {\n  return n * 2;\n}\n\nint main() {\n  int x = 5;\n  int y = doubleIt(x);\n  cout << y << "\\n";\n}',
      hints: [
        'main 里调用了 doubleIt 函数',
        'Step Into 会进入 doubleIt，看到 return n * 2',
        'Step Over 会直接得到 y = 10，跳过函数内部',
      ],
    },
    {
      type: 'multiple-choice',
      question: '复习上一课：程序停在断点后，你用 Step Over 跳过了函数 `calcScore(100)` 的调用。你怎么知道函数的返回值？',
      options: [
        { text: '在下一行把鼠标悬停在接收返回值的变量上', correct: true, explanation: '执行完函数后，变量就被赋值为返回值了，鼠标悬停可看' },
        { text: '重新运行一次', correct: false, explanation: '不需要重新运行，执行完后直接看变量就行' },
        { text: '用 cout 再输出一次', correct: false, explanation: '调试模式下直接看变量更方便，不一定要用 cout' },
        { text: '猜一个值', correct: false, explanation: '调试的核心是观察真实值，不是猜' },
      ],
    },
    {
      type: 'type-it',
      instruction: '敲一个两层函数调用的程序，练习"进"和"出"：',
      code: '#include <iostream>\nusing namespace std;\n\nint square(int n) {\n  return n * n;\n}\n\nint sumSquares(int a, int b) {\n  return square(a) + square(b);\n}\n\nint main() {\n  int result = sumSquares(3, 4);\n  cout << result << "\\n";\n}',
      hints: [
        'sumSquares 内部调用了 square 两次',
        'Step Into sumSquares 后，到 square(a) 时再 Step Into 可进入 square',
        'Step Out 可以从 square 跳回 sumSquares',
      ],
    },
    {
      type: 'exposition',
      text: '**记忆口诀**：\n- Step Over = 跳过（不进去看）\n- Step Into = 进入（进去看细节）\n- Step Out = 跳出（不想看了退出来）\n\n遇到自己的函数：可以进\n遇到标准库：不要进',
    },
    {
      type: 'exposition',
      text: '下一课学调试的另一个核心功能——**观察窗口**，暂停时一眼看到所有变量。',
    },
  ],
}

export default lesson
