import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'breakpoint-concept',
    chapter: 7,
    title: '断点——让程序停下来',
    subtitle: '暂停给你看',
    description: '理解断点的概念：在指定行暂停程序，然后单步执行、观察变量。',
    objectives: [
      '知道断点是什么以及为什么要用断点',
      '理解断点后可以做什么',
      '能描述断点调试的基本流程',
    ],
    estimatedMinutes: 11,
  },
  blocks: [
    {
      type: 'exposition',
      text: '用 `cout` 调试有一个很大的问题——你得改代码。\n加一行 cout、运行、看完、删掉……\n而且 cout 不能"暂停"——输出一闪而过。',
    },
    {
      type: 'exposition',
      text: '**断点**（breakpoint）解决了这个问题：\n让程序在指定的那一行**暂停**，像按了暂停键。\n暂停的时候你可以慢慢看所有变量的当前值。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '想象你看电影，想看清楚某个画面的细节。\n你按暂停——画面定格。\n你可以慢慢看这个画面里的每个元素。\n断点就是这个暂停键。',
    },
    {
      type: 'exposition',
      text: '在调试器里设置断点非常简单：\n在代码行号旁边点一下，出现一个红点。\n然后启动调试运行，程序会自动运行到红点那一行，然后停下来等你。',
    },
    {
      type: 'exposition',
      text: '举个例子：',
      code: 'int x = 5;      // ← 在这里设断点\nint y = x * 2;   // 程序会先停在这行\nint z = y + 1;   // 然后你一步步走过来',
    },
    {
      type: 'concept-cards',
      instruction: '断点的核心概念：',
      cards: [
        { glyph: '\uD83D\uDD34', term: '\u65AD\u70B9', meaning: '\u5728\u6307\u5B9A\u884C\u8BBE\u7F6E\u7684\u6682\u505C\u6807\u8BB0', example: '\u70B9\u51FB\u884C\u53F7\u65C1\u8FB9\u51FA\u73B0\u7EA2\u70B9' },
        { glyph: '\u23F8\uFE0F', term: '\u6682\u505C', meaning: '\u7A0B\u5E8F\u8FD0\u884C\u5230\u65AD\u70B9\u884C\u524D\u505C\u4E0B\u6765', example: '\u9EC4\u8272\u7BAD\u5934\u6307\u793A\u5F53\u524D\u884C' },
        { glyph: '\uD83D\uDC40', term: '\u89C2\u5BDF\u7A97\u53E3', meaning: '\u6682\u505C\u65F6\u67E5\u770B\u6240\u6709\u53D8\u91CF\u7684\u503C', example: 'x = 5, y = 10' },
      ],
    },
    {
      type: 'exposition',
      text: '程序停在断点后，你能做什么？\n\n**看变量**：把鼠标悬停在变量名上，会弹出当前值。\n**单步执行**：一行一行往下走。\n**继续运行**：按"继续"跑到下一个断点或程序结束。',
    },
    {
      type: 'multiple-choice',
      question: '你在第 8 行设了断点，程序调试运行时：',
      options: [
        { text: '程序会在运行第 8 行之前停下来', correct: true, explanation: '断点让程序在执行第 8 行之前暂停，让你看到前 7 行执行完的状态' },
        { text: '程序运行完第 8 行再停下来', correct: false, explanation: '断点是在到达该行时暂停，不是执行完后暂停' },
        { text: '程序从第 1 行跳到第 8 行直接运行', correct: false, explanation: '程序不会跳行，断点只是暂停，顺序不会变' },
        { text: '程序不会执行第 8 行', correct: false, explanation: '断点只是暂停，你可以选择继续执行' },
      ],
    },
    {
      type: 'exposition',
      text: '停在断点后，最重要的操作：**单步执行**（step over）。\n按一下执行一行，再按一下再执行一行。\n就像电影的"逐帧播放"——一帧一帧地看。',
    },
    {
      type: 'exposition',
      text: '每一步之后，变量的值都可能变化：',
      code: 'int sum = 0;        // 停 ① sum=0\nsum = sum + 5;       // 停 ② sum=5\nsum = sum + 10;      // 停 ③ sum=15\ncout << sum;         // 停 ④ 输出 15',
    },
    {
      type: 'concept-cards',
      instruction: '断点调试的三个步骤：',
      cards: [
        { glyph: '1\uFE0F\u20E3', term: '\u8BBE\u7F6E\u65AD\u70B9', meaning: '\u5728\u53EF\u7591\u7684\u884C\u524D\u70B9\u51FB\u8BBE\u7F6E\u7EA2\u70B9', example: '\u5FAA\u73AF\u91CC\u3001\u51FD\u6570\u8C03\u7528\u5904' },
        { glyph: '2\uFE0F\u20E3', term: '\u5355\u6B65\u6267\u884C', meaning: '\u4E00\u884C\u4E00\u884C\u8D70\uFF0C\u89C2\u5BDF\u6BCF\u6B65\u53D8\u5316', example: 'F10 \u952E\u4E00\u6B65\u4E00\u6B65' },
        { glyph: '3\uFE0F\u20E3', term: '\u89C2\u5BDF\u53D8\u91CF', meaning: '\u6BCF\u6B65\u90FD\u770B\u770B\u53D8\u91CF\u503C\u53D8\u4E86\u6CA1', example: '\u9F20\u6807\u60AC\u505C\u5728\u53D8\u91CF\u540D\u4E0A' },
      ],
    },
    {
      type: 'type-it',
      instruction: '这是一个"假装在用调试器"的练习——敲出这段代码，想象你在调试它：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int a = 10;\n  int b = 20;\n  int c = a + b;\n  cout << "c = " << c << "\\n";\n}',
      hints: [
        '如果停在第 6 行（int c = a + b;），此时 a=10, b=20',
        '执行完第 6 行后，c 的值变成 30',
        '调试就是观察这些变量值是否符合你的预期',
      ],
    },
    {
      type: 'multiple-choice',
      question: '程序停在断点处，你发现变量 `count` 的值是 5，但你觉得应该是 6。这说明什么？',
      options: [
        { text: '在断点之前的代码中，count 的计算可能出了问题', correct: true, explanation: 'count 值不对说明前面的代码有问题，需要往前排查' },
        { text: '编译器有问题', correct: false, explanation: '编译器不会算错，是你代码的问题' },
        { text: '这个断点设错了位置', correct: false, explanation: '断点位置没有对错，观察到异常值本身就是有效信息' },
        { text: 'count 这个变量名有问题', correct: false, explanation: '变量名只是名字，不影响值' },
      ],
    },
    {
      type: 'exposition',
      text: '断点应该设在哪里？\n\n**好位置**：\n- 循环开始的地方（观察每次迭代的变化）\n- 函数调用前（看传入的参数对不对）\n- 条件判断前（看条件值是否如预期）\n- 变量被修改的地方',
    },
    {
      type: 'exposition',
      text: '**不好的位置**：\n- 空行（没有代码可执行）\n- 变量声明行（还没赋值，看了也没意义）\n- 注释行（不执行）\n- 大括号单独一行（通常没有实际作用）',
    },
    {
      type: 'multiple-choice',
      question: '你想调试一个循环 `for (int i=0; i<10; i++) { sum += i; }`，断点应该设在哪里？',
      options: [
        { text: '在 `sum += i;` 这一行', correct: true, explanation: '在循环体内设断点，每次循环都会停，可以看到 i 和 sum 的变化' },
        { text: '在 `int i=0;` 这一行', correct: false, explanation: '只执行一次，看不到循环过程中的变化' },
        { text: '在 `}` 这一行', correct: false, explanation: '大括号行不是可执行代码行' },
        { text: '在 `for` 关键字上', correct: false, explanation: 'for 本身不是执行行，通常停在循环体内更有效' },
      ],
    },
    {
      type: 'exposition',
      text: '断点调试的完整流程：\n1. 在可疑行设置断点\n2. 启动调试运行\n3. 程序自动停在断点处\n4. 用单步执行逐行前进\n5. 每一步观察变量值\n6. 找到变量值不符合预期的位置\n7. 分析前面的代码为什么导致了这个值\n\n调试完记得**删除断点**——再点一下红点取消，保留无用断点会让程序莫名其妙地停下来。',
    },
    {
      type: 'exposition',
      text: '断点还支持"条件断点"——只在满足条件时才暂停。\n比如你只关心 `i == 50` 时的情况，不用按 50 次单步，设条件断点就行。',
    },
    {
      type: 'multiple-choice',
      question: '回顾上一课：cout 调试和断点调试的一个关键区别是什么？',
      options: [
        { text: 'cout 调试不需要改代码，断点需要改代码', correct: false, explanation: '反了——cout 调试需要加代码，断点不需要改源文件' },
        { text: '断点可以暂停，cout 不能暂停', correct: true, explanation: '断点的核心是"暂停让你慢慢看"，cout 只能输出一闪而过' },
        { text: 'cout 调试只能用在 Windows 上', correct: false, explanation: 'cout 在哪个平台都能用' },
        { text: '断点调试不需要编译器', correct: false, explanation: '断点调试需要调试器，也需要编译器' },
      ],
    },
    {
      type: 'type-it',
      instruction: '敲一个带循环的程序，想象在 sum += i 那一行设断点：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int sum = 0;\n  for (int i = 1; i <= 3; i++) {\n    sum += i;\n    cout << "i=" << i << " sum=" << sum << "\\n";\n  }\n}',
      hints: [
        '循环会执行 3 次，每次 i 递增 1',
        'sum 的值从 0 变成 1，再变成 3，再变成 6',
        '在 `sum += i;` 处设断点可以看到 sum 的每次变化',
      ],
    },
    {
      type: 'exposition',
      text: '**小结**：\n- 断点 = 代码里的暂停标记\n- 程序运行到断点行前停下\n- 停下后可以单步执行、看变量\n- 断点不需要改代码，设/取消只需点一下\n- 配合单步执行和观察变量，是调试的核心操作',
    },
    {
      type: 'exposition',
      text: '下一课学单步执行的两个模式——**跳过**和**进入**函数，它们有什么区别？',
    },
  ],
}

export default lesson
