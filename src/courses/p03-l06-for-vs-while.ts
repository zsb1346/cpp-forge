import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'for-vs-while',
    chapter: 4,
    title: 'for vs while 怎么选',
    subtitle: '两种循环的场景',
    description: '掌握 for 和 while 各自的适用场景。',
    objectives: ['能判断什么时候用 for、什么时候用 while'],
    estimatedMinutes: 9,
  },
  blocks: [
    {
      type: 'exposition',
      text: '学了 `for` 和 `while` 两种循环，你肯定想问：\n**到底用哪个？**',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '一个简单的判断标准：\n- **知道要循环几次** → `for`\n- **不知道要循环几次，只知道什么时候停** → `while`',
      textAnimation: 'typewriter',
    },
    {
      type: 'concept-cards',
      instruction: '选择指南：',
      cards: [
        { glyph: '🔢', term: '知道次数 → for', meaning: '遍历数组、计数等次数明确', example: 'for (int i=0; i<10; i++)' },
        { glyph: '❓', term: '不知道次数 → while', meaning: '等待输入、读到文件尾等', example: 'while (cin >> x)' },
        { glyph: '⚖️', term: '两者皆可', meaning: '个人风格，但团队要统一', example: '两者都能实现' },
      ],
    },
    {
      type: 'exposition',
      text: '**典型 for 场景**：输出 1 到 100\n因为"1 到 100"就是明确的次数——100 次。\n`for (int i = 1; i <= 100; i++)`',
    },
    {
      type: 'exposition',
      text: '**典型 while 场景**：不断读入数字直到用户输入 0\n因为你不知道用户会输入多少个数字。\n`while (cin >> x && x != 0)`',
    },
    {
      type: 'multiple-choice',
      question: '复习上一课：for 循环的三个部分分别是什么？',
      options: [
        { text: '初始化、循环体、更新', correct: false, explanation: '循环体不在括号里，是三段式中的一段' },
        { text: '初始化、条件、更新', correct: true, explanation: 'for (初始化; 条件; 更新) 三部分' },
        { text: '变量、判断、输出', correct: false, explanation: '输出是循环体里的内容，不是三段之一' },
        { text: '声明、比较、赋值', correct: false, explanation: '第三段是更新，不一定是赋值' },
      ],
    },
    {
      type: 'exposition',
      text: '同样的功能，用两种循环写：\n\nfor 版：\n`for (int i = 0; i < 5; i++) { cout << i; }`\n\nwhile 版：\n`int i = 0; while (i < 5) { cout << i; i++; }`\n\n**结果一样，但 for 更紧凑。**',
    },
    {
      type: 'type-it',
      instruction: '用 for 循环实现"输出 1 到 5 的平方"：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  for (int i = 1; i <= 5; i++) {\n    cout << i * i << " ";\n  }\n}',
      hints: ['`i * i` 计算平方', '输出：1 4 9 16 25', '这个任务次数明确，适合用 for'],
    },
    {
      type: 'multiple-choice',
      question: '下面哪种情况**更适合用 while**？',
      options: [
        { text: '输出 1 到 1000', correct: false, explanation: '次数明确（1000 次），更适合 for' },
        { text: '用户不断输入成绩，输入 -1 停止', correct: true, explanation: '不知道用户何时输入 -1，用 while 更合适' },
        { text: '计算 1 加到 50', correct: false, explanation: '已知加 50 次，适合用 for' },
        { text: '打印数组的每个元素', correct: false, explanation: '知道数组长度，适合用 for' },
      ],
    },
    {
      type: 'type-it',
      instruction: '用 while 循环实现"不断读入数字，直到输入 0"：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int x = 1;\n  while (x != 0) {\n    cout << "输入一个数字（0 退出）：";\n    cin >> x;\n  }\n  cout << "结束\\n";\n}',
      hints: ['`cin >> x` 从键盘读取输入', '`while (x != 0)` 当 x 不等于 0 时继续', '不知道用户会输入几次，所以用 while'],
    },
    {
      type: 'exposition',
      text: '对比看看两种风格的差异：\n- `for`：初始化、条件、更新**集中在一行**，一看就知道循环范围\n- `while`：条件**单独在顶部**，适合"等到某个条件满足就停"的场景',
    },
    {
      type: 'multiple-choice',
      question: '回顾阶段 2：`||` 运算符表示什么？',
      options: [
        { text: '并且', correct: false, explanation: '&& 才是并且' },
        { text: '或者', correct: true, explanation: '|| 表示"或者"，两边只要一个为 true 结果就是 true' },
        { text: '不等于', correct: false, explanation: '!= 才是不等于' },
        { text: '取反', correct: false, explanation: '! 才是取反' },
      ],
    },
    {
      type: 'type-it',
      instruction: '用 while 实现"不断输出，直到随机条件"——这里用 `i < 8` 模拟：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int i = 0;\n  while (i < 8) {\n    cout << i << " ";\n    i++;\n  }\n}',
      hints: ['虽然用 while 也能写计数循环', '但次数明确时 for 更简洁', '输出：0 1 2 3 4 5 6 7'],
    },
    {
      type: 'exposition',
      text: '**行业习惯（不必须，但建议遵守）**：\n- 用 `for`——遍历数组、计数循环、次数已知\n- 用 `while`——条件驱动的循环、读到文件尾、等待事件\n- 用 `do-while`——至少要执行一次的情况（下一课学）',
    },
    {
      type: 'type-it',
      instruction: '最后一个练习——用 for 输出 9×9 乘法表的一行 "1×3=3 2×3=6 3×3=9"：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  for (int i = 1; i <= 3; i++) {\n    cout << i << "×3=" << i * 3 << " ";\n  }\n}',
      hints: ['`i << "×3=" << i*3` 拼出乘法式', '次数固定（3 次），用 for 最合适', '输出：1×3=3 2×3=6 3×3=9'],
    },
    {
      type: 'code-runner',
      instruction: '把下面的 while 循环改写成 for 循环：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  // TODO: 用 for 循环改写\n  // int i = 0;\n  // while (i < 10) {\n  //   cout << i << " ";\n  //   i++;\n  // }\n  for (int i = 0; i < 10; i++) {\n    cout << i << " ";\n  }\n}',
      expectedOutput: '0 1 2 3 4 5 6 7 8 9',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'exposition',
      text: '总结：\n- **次数明确 → for**\n- **条件驱动 → while**\n- 两者都可以时——选你更顺手的，但建议优先用 for',
    },
  ],
}

export default lesson
