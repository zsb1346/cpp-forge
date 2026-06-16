import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'print-debugging',
    chapter: 7,
    title: '用 cout 调试',
    subtitle: '最简调试法',
    description: '学会在关键位置用 cout 打印变量值，观察程序运行状态。',
    objectives: [
      '能用 cout 打印变量值进行调试',
      '能通过 cout 定位逻辑错误',
    ],
    estimatedMinutes: 11,
  },
  blocks: [
    {
      type: 'exposition',
      text: '最简单的调试方法——在代码里加 `cout`。\n不需要额外的工具，不需要学调试器，\n只需要一条输出语句，就能看到你想看的变量值。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '原理很简单：\n你觉得某个变量可能不对，就在它后面加一行 `cout` 把它打印出来。\n运行程序，看输出的值——和你预期的一样吗？',
    },
    {
      type: 'exposition',
      text: '是不是有点像前面说的"在黑箱里装个摄像头"？\n`cout` 就是这个摄像头的画面输出线——\n你把线接在哪个变量上，就能看到那个变量的值。',
    },
    {
      type: 'exposition',
      text: '举个例子：\n计算 `(5 + 3) * 2` 但结果不对，你想看看中间值。',
      code: 'int a = 5 + 3;\nint b = a * 2;\ncout << "结果是：" << b;',
    },
    {
      type: 'exposition',
      text: '你可以在每个步骤后面加 `cout` 来观察：',
      code: 'int a = 5 + 3;\ncout << "a = " << a << "\\n";  // 看 a 是多少\nint b = a * 2;\ncout << "b = " << b << "\\n";  // 看 b 是多少',
    },
    {
      type: 'type-it',
      instruction: '敲这个程序，加一个 cout 查看变量 x 的值：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int x = 42;\n  cout << "x 的值是：" << x << "\\n";\n}',
      hints: [
        'cout << 后面跟要输出的内容，用 << 连接',
        '字符串用双引号括起来，变量名直接写',
        '别忘了 `\\n` 换行，或者用 `endl` 也行',
      ],
    },
    {
      type: 'exposition',
      text: '除了看变量值，你还可以用 `cout` 看**执行顺序**。\n在可能执行到的位置加一行标记，比如 `cout << "到这里了\\n";`。\n如果输出了说明执行了这段，没输出说明没走到。',
    },
    {
      type: 'type-it',
      instruction: '敲一段代码，用 cout 标记执行路径：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int x = 10;\n  if (x > 5) {\n    cout << "进入了 if 分支\\n";\n  } else {\n    cout << "进入了 else 分支\\n";\n  }\n  cout << "程序结束\\n";\n}',
      hints: [
        'cout 可以作为"足迹"，标记程序走到了哪里',
        '输出 "进入了 if 分支" 说明条件成立',
        '如果把 x 改成 3，输出的内容会变化',
      ],
    },
    {
      type: 'multiple-choice',
      question: '你想调试一个循环，看看每次循环时 `i` 的值对不对。最合适的做法是？',
      options: [
        { text: '在循环里面加 `cout << i << "\\n";`', correct: true, explanation: '每次循环输出 i 的值，就能看到 i 的变化过程' },
        { text: '循环结束后加 `cout << i;`', correct: false, explanation: '只能看到最终值，看不到中间的每一步变化' },
        { text: '在循环前面加 `cout << "开始循环\\n";`', correct: false, explanation: '只显示一次"开始循环"，看不到每次的 i 值' },
        { text: '不用 cout，直接盯着代码看', correct: false, explanation: '人脑跑循环容易出错，让计算机输出更可靠' },
      ],
    },
    {
      type: 'exposition',
      text: '实战例子：下面这段代码本来应该求和 1 到 5，但结果不对。',
      code: 'int sum = 0;\nint i = 1;\nwhile (i <= 5) {\n  sum = sum + i;\n  i++;\n}\ncout << sum;  // 预期 15，但输出不对？',
    },
    {
      type: 'exposition',
      text: '加几个 `cout` 看看：',
      code: 'int sum = 0;\nint i = 1;\nwhile (i <= 5) {\n  cout << "i=" << i << " sum=" << sum << "\\n";\n  sum = sum + i;\n  cout << "  sum 变成了 " << sum << "\\n";\n  i++;\n}',
    },
    {
      type: 'code-runner',
      instruction: '运行这个有 bug 的程序，输出应该是什么？然后用 cout 找出 bug：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int sum = 0;\n  for (int i = 1; i <= 5; i++) {\n    sum = sum + i;\n    i++;  // 这里多了一个 i++！\n  }\n  cout << sum;\n}',
      expectedOutput: '9',
      comparison: 'trimmed',
      editable: false,
    },
    {
      type: 'exposition',
      text: '上面程序输出 9 而不是 15。\n因为循环体里多了一个 `i++`，导致 i 每次循环实际上加了 2。\ni 只经过 1、3、5，所以 sum = 1 + 3 + 5 = 9。\n如果加了 cout 就能看到 i 跳过了偶数。',
    },
    {
      type: 'exposition',
      text: 'cout 调试的优缺点：\n\n**优点**：\n- 不需要学调试器，会 cout 就行\n- 在任何环境下都能用（包括在线编译器）\n- 可以批量打印多个变量的值',
    },
    {
      type: 'exposition',
      text: '**缺点**：\n- 需要改代码（加 cout，删 cout）\n- 调试完要记得删掉加的那些 cout\n- 不能暂停——输出哗哗地过，可能错过信息\n- 对数组成员输出比较麻烦',
    },
    {
      type: 'multiple-choice',
      question: '以下哪个**不是** cout 调试的缺点？',
      options: [
        { text: '需要修改源代码', correct: false, explanation: '这是缺点——加 cout 和删 cout 都要改代码' },
        { text: '可以同时打印多个变量的值', correct: true, explanation: '这是优点不是缺点，cout 可以一次性输出多个变量' },
        { text: '调试完要记得删掉 cout 语句', correct: false, explanation: '这是缺点——很容易忘了删' },
        { text: '不能暂停，输出一闪而过', correct: false, explanation: '这是缺点——变量多的时候看不过来' },
      ],
    },
    {
      type: 'code-runner',
      instruction: '运行修复后的程序，确认输出 15：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int sum = 0;\n  for (int i = 1; i <= 5; i++) {\n    sum = sum + i;\n  }\n  cout << sum;\n}',
      expectedOutput: '15',
      comparison: 'trimmed',
      editable: false,
    },
    {
      type: 'multiple-choice',
      question: '复习上一课：`cout << x` 报错 `\'x\' was not declared in this scope`，最可能的原因是？',
      options: [
        { text: '变量 x 没有定义就用了', correct: true, explanation: '这个错误告诉你编译器找不到 x，需要先 `int x;`' },
        { text: 'cout 拼写错了', correct: false, explanation: 'cout 拼错会报 cout 的问题，不是 x 的问题' },
        { text: '忘了加 `\\n`', correct: false, explanation: '换行符是可选的，不写不会报错' },
        { text: '变量名不能用在 cout 里', correct: false, explanation: '变量名当然可以用在 cout 里，这是基本用法' },
      ],
    },
    {
      type: 'concept-cards',
      instruction: 'cout 调试的三种用法：',
      cards: [
        { glyph: '\uD83D\uDCCA', term: '\u6253\u5370\u53D8\u91CF\u503C', meaning: '\u5728\u53D8\u91CF\u540E\u9762\u8F93\u51FA\u5F53\u524D\u503C', example: 'cout << x;' },
        { glyph: '\uD83D\uDEE3\uFE0F', term: '\u6807\u8BB0\u6267\u884C\u8DEF\u5F84', meaning: '\u8F93\u51FA\u201C\u5230\u8FD9\u91CC\u4E86\u201D\u770B\u8D70\u54EA\u6761\u8DEF', example: 'cout << "enter if";' },
        { glyph: '\uD83D\uDD0D', term: '\u8F93\u51FA\u4E2D\u95F4\u7ED3\u679C', meaning: '\u8BA1\u7B97\u4E2D\u95F4\u6B65\u9AA4\u7684\u503C', example: 'cout << a + b;' },
      ],
    },
    {
      type: 'code-runner',
      instruction: '综合练习：运行这个程序（求 1 到 10 的和），看看它有没有 bug：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int sum = 0;\n  int i = 1;\n  while (i <= 10) {\n    sum = sum + i;\n  }\n  cout << sum;\n}',
      expectedOutput: '55',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'exposition',
      text: '注意到问题了吗？\n循环里没有 `i++`，i 永远等于 1，这是一个死循环！\n但是浏览器里的编译器会有超时保护，运行一段时间后自动停止——这就是 cout 调试能帮你发现的问题。',
    },
    {
      type: 'exposition',
      text: '总结：\n- cout 调试是最简单直接的调试方式\n- 三种用途：看变量值、标执行路径、看中间结果\n- 优点是零门槛，缺点是要改代码\n- 下一课学更高级的——断点调试，不用改代码也能看变量',
    },
  ],
}

export default lesson
