import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'watch-variables',
    chapter: 7,
    title: '观察窗口',
    subtitle: '暂停时看所有变量',
    description: '学会使用调试器的观察窗口，在暂停时查看所有变量的当前值。',
    objectives: [
      '知道观察窗口的作用',
      '能在调试时查看和监视变量',
      '理解观察窗口和 cout 的区别',
    ],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '程序停在断点上之后，你面临一个问题：\n怎么**方便地**查看当前所有变量的值？\n你可以把鼠标悬停在变量名上，但如果变量很多呢？',
    },
    {
      type: 'exposition',
      text: '这就是**观察窗口**（Watch Window）的作用。\n一个专门的区域，列出你关心的所有变量——\n变量名、当前值、甚至数据类型。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '观察窗口通常长这样：\n\n| 变量名 | 值 | 类型 |\n|--------|-----|------|\n| x | 5 | int |\n| y | 10 | int |\n| sum | 15 | int |\n\n一目了然。',
    },
    {
      type: 'concept-cards',
      instruction: '观察窗口的三列信息：',
      cards: [
        { glyph: '\uD83C\uDFF7\uFE0F', term: '\u53D8\u91CF\u540D', meaning: '\u4F60\u60F3\u89C2\u5BDF\u7684\u53D8\u91CF\u540D\u79F0', example: 'x, sum, result' },
        { glyph: '\uD83D\uDCCA', term: '\u5F53\u524D\u503C', meaning: '\u53D8\u91CF\u5728\u5F53\u524D\u6682\u505C\u70B9\u7684\u503C', example: '5, 15, 3.14' },
        { glyph: '\uD83D\uDCDD', term: '数据类型', meaning: '\u53D8\u91CF\u7684\u7C7B\u578B\uFF0CIDE \u81EA\u52A8\u663E\u793A', example: 'int, double, string' },
      ],
    },
    {
      type: 'exposition',
      text: '当你在单步执行时，观察窗口会**实时更新**。\n每执行一行，观察窗口里的值都可能变化——\n颜色还会变化：新改变的值会变成红色，提醒你注意。',
    },
    {
      type: 'exposition',
      text: '举个例子，单步执行下面这段代码，观察窗口的变化：',
      code: 'int x = 5;   // 观察窗口：x = 5\nint y = 3;   // 观察窗口：x = 5, y = 3\nint z = x + y;  // z 变成 8（红色高亮）',
    },
    {
      type: 'exposition',
      text: '观察窗口不仅能看基本类型，还能展开看**数组**和**结构体**。\n数组旁边有个小箭头，点一下就能看到每个元素。\n\n比如 `int arr[5]` —> 展开后看到 arr[0]、arr[1]…… 每个的值。',
    },
    {
      type: 'type-it',
      instruction: '敲一个带数组的程序，想象在观察窗口展开数组看每个元素：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int scores[5] = {88, 92, 76, 85, 90};\n  int sum = 0;\n  for (int i = 0; i < 5; i++) {\n    sum += scores[i];\n  }\n  cout << sum << "\\n";\n}',
      hints: [
        '观察变量：i 从 0 变到 4，sum 逐步累加',
        'scores 数组展开后可以看到每个元素的值',
        '在 sum += scores[i] 处设断点，每次循环观察变化',
      ],
    },
    {
      type: 'exposition',
      text: '除了自动显示的变量，你还可以**手动添加监视**。\n在观察窗口的空白处输入一个变量名或表达式。\n\n比如你输入 `i * 2`，观察窗口就会显示 `i * 2 = 10`（假设 i=5）。\n这在检查复杂表达式时非常有用。',
    },
    {
      type: 'multiple-choice',
      question: '你在调试循环 `for (int i=0; i<100; i++)`，只想看 `i` 等于 50 时的情况。观察窗口能帮你做什么？',
      options: [
        { text: '不能做什么，必须按 50 次单步', correct: false, explanation: '可以用条件断点，或者观察窗口配合断点' },
        { text: '在观察窗口添加 `i`，设条件断点 i==50', correct: true, explanation: '条件断点让程序在 i==50 时停，观察窗口随时看 i 的值' },
        { text: '观察窗口会自动跳到 i=50', correct: false, explanation: '观察窗口只显示变量的值，不会自动跳转' },
        { text: '把 i 改成 50 再运行', correct: false, explanation: '改了初始值会改变程序的逻辑' },
      ],
    },
    {
      type: 'exposition',
      text: '观察窗口 vs cout 调试：\n\n**观察窗口好处**：\n- 不需要改代码\n- 实时更新，自动显示变化\n- 可以展开数组和结构体\n- 可以监视表达式',
    },
    {
      type: 'exposition',
      text: '**cout 调试的好处**：\n- 任何环境都能用（不需要 IDE）\n- 不打断程序运行流程\n- 可以保留输出结果作为日志\n\n两者不冲突——在不同的场景选不同的工具。',
    },
    {
      type: 'multiple-choice',
      question: '以下哪个**不是**观察窗口的好处？',
      options: [
        { text: '不需要修改代码就能看变量值', correct: false, explanation: '这是观察窗口最大的好处——不用加 cout 也不用删' },
        { text: '可以在没有 IDE 的环境下使用', correct: true, explanation: '观察窗口是 IDE 调试器的功能，没有 IDE 就用不了' },
        { text: '可以展开数组看每个元素', correct: false, explanation: '观察窗口支持展开数组和结构体，这是 cout 不方便做的' },
        { text: '变量值变化时自动高亮', correct: false, explanation: '变色提示是观察窗口的实用功能' },
      ],
    },
    {
      type: 'exposition',
      text: '观察窗口还有一个隐藏功能——在调试时**修改变量值**。\n你可以在观察窗口里双击值，输入新的值。\n\n比如你猜"如果 x 是 10 而不是 5，程序会怎么样？"\n直接改成 10，继续运行看看结果。\n不需要改代码重新编译。',
    },
    {
      type: 'code-runner',
      instruction: '运行这个程序，先看看输出是多少。如果你能在调试器里把 bonus 改成 200，结果会变吗？（模拟思考）',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int score = 85;\n  int bonus = 50;\n  int total = score + bonus;\n  cout << total << "\\n";\n}',
      expectedOutput: '135',
      comparison: 'trimmed',
      editable: false,
    },
    {
      type: 'exposition',
      text: '上面程序输出 135（85 + 50）。\n如果调试时在观察窗口把 bonus 改成 200，\ntotal 就会变成 285——不修改代码，只看效果。\n这个功能在做"试错"时非常有用。',
    },
    {
      type: 'type-it',
      instruction: '敲一段多层作用域的程序，练习观察不同作用域的变量：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int x = 10;\n  if (x > 5) {\n    int y = 20;\n    int z = x + y;\n    cout << z << "\\n";\n  }\n}',
      hints: [
        '进入 if 块后，观察窗口会显示 y 和 z',
        '离开 if 块后，y 和 z 消失（它们的作用域结束了）',
        'x 在整个 main 函数中都可以观察到',
      ],
    },
    {
      type: 'exposition',
      text: '总结观察窗口的用法：\n\n- 暂停时自动显示当前作用域内的变量\n- 变量值变化时高亮\n- 可展开数组、结构体\n- 可手动添加监视表达式\n- 可以在调试时临时修改值',
    },
    {
      type: 'exposition',
      text: '**完整的调试流程**：\n设断点 → 运行到断点 → 观察窗口看变量 → Step Over/Into → 观察窗口自动更新 → 发现值不对的地方 → 定位原因 → 修复 → 验证',
    },
    {
      type: 'multiple-choice',
      question: '回顾上一课：你 Step Into 了一个函数，观察窗口里自动出现了函数的参数。这说明什么？',
      options: [
        { text: '观察窗口自动显示当前作用域的变量', correct: true, explanation: 'Step Into 进入了函数，作用域变成函数内部，参数自动显示' },
        { text: '观察窗口出错了', correct: false, explanation: '这是正常行为，观察窗口会自动显示当前作用域的变量' },
        { text: '参数不是变量，不应该显示', correct: false, explanation: '参数也是变量，当然应该显示' },
        { text: '需要手动添加参数到观察窗口', correct: false, explanation: '参数是函数作用域内的变量，会自动显示' },
      ],
    },
    {
      type: 'exposition',
      text: '下一课是阶段 06 的最后一课——**综合练习**。给你一段有 bug 的代码，用前面学的所有方法来找出问题。',
    },
  ],
}

export default lesson
