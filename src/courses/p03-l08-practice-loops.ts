import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'practice-loops',
    chapter: 4,
    title: '循环综合练习',
    subtitle: '巩固 01-07',
    description: '用 for、while、do-while 解决三类典型问题。',
    objectives: ['能用三种循环解决实际问题', '能判断何时用哪种循环'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'type-it',
      instruction: '热身——敲一个 while 循环输出 1 到 10：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int i = 1;\n  while (i <= 10) {\n    cout << i << " ";\n    i++;\n  }\n}',
      hints: ['`i <= 10` 条件包含等于', '`i++` 每次加 1', '输出：1 2 3 4 5 6 7 8 9 10'],
    },
    {
      type: 'exposition',
      text: '今天的任务：用三种循环完成**三个经典题目**。\n每题都有不同的循环最适合。',
    },
    {
      type: 'type-it',
      instruction: '先敲一个 for 循环——计算 1+2+...+10 的和：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int sum = 0;\n  for (int i = 1; i <= 10; i++) {\n    sum = sum + i;\n  }\n  cout << sum;\n}',
      hints: ['`sum = sum + i` 每次累加', 'for 适合这种次数明确的累加', '输出：55'],
    },
    {
      type: 'code-runner',
      instruction: '题目 1：用 for 循环计算 1 到 N 的和。把 TODO 替换成循环代码（N=100）：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int N = 100;\n  int sum = 0;\n  // TODO: 用 for 循环从 1 加到 N\n  for (int i = 1; i <= N; i++) {\n    sum = sum + i;\n  }\n  cout << sum;\n}',
      expectedOutput: '5050',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'multiple-choice',
      question: '复习上一课：do-while 和 while 的关键区别是什么？',
      options: [
        { text: 'do-while 的语法更复杂', correct: false, explanation: '只是多了一个 do 关键字，不是关键区别' },
        { text: 'do-while 至少执行一次循环体', correct: true, explanation: 'do-while 先执行再判断，所以至少一次' },
        { text: 'do-while 不能倒着数', correct: false, explanation: 'do-while 也可以倒着数，只是语法不同' },
        { text: 'while 不需要花括号', correct: false, explanation: 'while 也需要花括号（只有一行时可以省略但不推荐）' },
      ],
    },
    {
      type: 'exposition',
      text: '题目 2：不断读入数字，直到输入负数——这种不知道次数的场景适合用 while。',
    },
    {
      type: 'code-runner',
      instruction: '题目 2：用 while 不断读入数字，直到输入负数为止，输出所有输入数的总和：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int num;\n  int total = 0;\n  cout << "输入数字（负数结束）：";\n  cin >> num;\n  while (num >= 0) {\n    total = total + num;\n    cin >> num;\n  }\n  cout << "总和：" << total;\n}',
      expectedOutput: '总和：15',
      comparison: 'contains',
      editable: true,
    },
    {
      type: 'type-it',
      instruction: '敲一个 do-while——至少执行一次，确保用户至少输入一次：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int score;\n  do {\n    cout << "输入成绩（0-100）：";\n    cin >> score;\n  } while (score < 0 || score > 100);\n  cout << "有效成绩：" << score;\n}',
      hints: ['do-while 保证至少输出一次提示', '条件 `score < 0 || score > 100` 时继续问', '末尾分号不要漏！'],
    },
    {
      type: 'code-runner',
      instruction: '题目 3：用 do-while 实现"猜数字"——程序设定一个数 42，用户不断猜直到猜对：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int secret = 42;\n  int guess;\n  do {\n    cout << "猜一个数字：";\n    cin >> guess;\n    if (guess < secret) cout << "太小了\\n";\n    if (guess > secret) cout << "太大了\\n";\n  } while (guess != secret);\n  cout << "猜对了！\\n";\n}',
      expectedOutput: '猜对了！',
      comparison: 'contains',
      editable: true,
    },
    {
      type: 'multiple-choice',
      question: '以下哪个场景最适合用 **do-while** 循环？',
      options: [
        { text: '输出数组的每个元素', correct: false, explanation: '数组长度已知，用 for 更合适' },
        { text: '至少让用户输入一次密码，不对再重试', correct: true, explanation: '至少执行一次正是 do-while 的特点' },
        { text: '计算 1 加到 1000', correct: false, explanation: '次数明确，用 for 更简洁' },
        { text: '无限循环游戏主循环', correct: false, explanation: '这种情况下 while(true) 更常见' },
      ],
    },
    {
      type: 'type-it',
      instruction: '综合练习——用 for 输出所有 3 的倍数（1 到 30）：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  for (int i = 3; i <= 30; i = i + 3) {\n    cout << i << " ";\n  }\n}',
      hints: ['从 3 开始，每次加 3', '`i = i + 3` 跳步', '输出：3 6 9 12 15 18 21 24 27 30'],
    },
    {
      type: 'exposition',
      text: '三种循环的选择总结：\n\n**for**：知道次数 → 计数、遍历\n**while**：条件驱动 → 等待事件、不确定次数\n**do-while**：至少执行一次 → 输入验证',
    },
    {
      type: 'code-runner',
      instruction: '终极挑战——用你最擅长的循环，输出 1 到 50 中所有能被 7 整除的数：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  for (int i = 1; i <= 50; i++) {\n    if (i % 7 == 0) {\n      cout << i << " ";\n    }\n  }\n}',
      expectedOutput: '7 14 21 28 35 42 49',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'multiple-choice',
      question: '回顾：以下代码中 `sum` 的作用是什么？\n`int sum = 0; for (int i=1; i<=5; i++) { sum = sum + i; }`',
      options: [
        { text: '记录循环次数', correct: false, explanation: '循环次数由 i 控制' },
        { text: '累加 1 到 5 的结果', correct: true, explanation: 'sum 不断累加 i 的值，最终得到 1+2+3+4+5=15' },
        { text: '输出到屏幕', correct: false, explanation: 'sum 只是存储，要输出还需要 cout' },
        { text: '控制循环什么时候结束', correct: false, explanation: '循环结束由 i <= 5 控制' },
      ],
    },
    {
      type: 'exposition',
      text: '多练！循环是编程的基础工具，后面的数组、字符串处理都离不开它。',
    },
  ],
}

export default lesson
