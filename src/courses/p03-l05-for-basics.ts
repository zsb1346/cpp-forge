import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'for-basics',
    chapter: 4,
    title: 'for——更紧凑的循环',
    subtitle: 'for 的三段式',
    description: '学习 for 循环的语法和执行顺序。',
    objectives: ['能用 for 循环写计数循环', '理解三段式的执行顺序'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '`while` 循环把初始化、条件、更新分开写，容易漏。\n`for` 循环把它们**打包在一起**，更紧凑、更不容易出错。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: 'for 循环语法：',
      code: 'for (初始化; 条件; 更新) {\n  // 循环体\n}',
    },
    {
      type: 'exposition',
      text: '和 while 对比：\nfor 版本：`for (int i = 0; i < 5; i++) { cout << i; }`\nwhile 版本：`int i = 0; while (i < 5) { cout << i; i++; }`\n**功能一模一样，但 for 把三件事写在一行里。**',
    },
    {
      type: 'concept-cards',
      instruction: 'for 的三段式：',
      cards: [
        { glyph: '🎬', term: '初始化', meaning: '在循环开始前执行一次', example: 'int i = 0' },
        { glyph: '🧪', term: '条件', meaning: '每次执行前检查，true 才继续', example: 'i < 5' },
        { glyph: '📈', term: '更新', meaning: '每次执行完循环体后执行', example: 'i++' },
      ],
    },
    {
      type: 'type-it',
      instruction: '敲一个最基本的 for 循环：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  for (int i = 0; i < 5; i++) {\n    cout << i << " ";\n  }\n}',
      hints: ['分号 `;` 分隔三段，不能少', '`int i = 0` 声明循环变量', '`i++` 是每次循环后的更新操作'],
    },
    {
      type: 'multiple-choice',
      question: '复习上一课：死循环是怎么产生的？',
      options: [
        { text: '代码太长', correct: false, explanation: '代码长短和死循环无关' },
        { text: '条件永远为 true，无法变成 false', correct: true, explanation: '循环条件始终成立就变成死循环' },
        { text: '循环体写了太多行', correct: false, explanation: '循环体行数不影响条件判断' },
        { text: '写了 cout 语句', correct: false, explanation: 'cout 只是输出，不影响循环条件' },
      ],
    },
    {
      type: 'exposition',
      text: 'for 的执行顺序：\n① **初始化**执行一次（int i = 0）\n② **判断条件**（i < 5）→ 如果为 false 跳出\n③ 执行**循环体**\n④ 执行**更新**（i++）\n→ 回到 ②',
    },
    {
      type: 'concept-cards',
      instruction: '执行流程记忆卡：',
      cards: [
        { glyph: '1️⃣', term: '初', meaning: '初始化只执行一次', example: 'int i = 0' },
        { glyph: '2️⃣', term: '判', meaning: '判断条件，true 才进', example: 'i < 5' },
        { glyph: '3️⃣', term: '体', meaning: '执行循环体代码', example: 'cout << i' },
        { glyph: '4️⃣', term: '更', meaning: '执行更新语句', example: 'i++ → 回到第 2 步' },
      ],
    },
    {
      type: 'type-it',
      instruction: '敲一个从 1 数到 10 的 for 循环：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  for (int i = 1; i <= 10; i++) {\n    cout << i << endl;\n  }\n}',
      hints: ['`i = 1` 从 1 开始数', '`i <= 10` 包含 10', '`i++` 每次加 1'],
    },
    {
      type: 'multiple-choice',
      question: '`for (int i = 0; i < 3; i++)` 的循环体执行几次？',
      options: [
        { text: '2 次', correct: false, explanation: 'i=0,1,2 共三次' },
        { text: '3 次', correct: true, explanation: 'i=0→执行，i=1→执行，i=2→执行，i=3→条件 false 停止' },
        { text: '4 次', correct: false, explanation: 'i=3 时条件 false，不会执行' },
        { text: '无限次', correct: false, explanation: 'i 每次加 1，最终会到 3 停止' },
      ],
    },
    {
      type: 'match-blocks',
      instruction: '按正确顺序排列一个 for 循环片段的三个部分：',
      fragments: ['int i = 0', 'i < 5', 'i++'],
      distractors: ['while', 'if'],
    },
    {
      type: 'exposition',
      text: 'for 的更新部分不只是 `i++`，可以写任何操作：\n- `i = i + 2` → 每次加 2\n- `i--` → 每次减 1\n- `i += 3` → 每次加 3',
    },
    {
      type: 'match-blocks',
      instruction: '把下面代码碎片排成正确的 for 循环（从 0 到 4 输出）：',
      fragments: ['for', '(', 'int i = 0', ';', 'i < 5', ';', 'i++', ')', '{', 'cout << i;', '}'],
      distractors: ['while', 'i--'],
    },
    {
      type: 'type-it',
      instruction: '敲一个 for 循环输出 10、8、6、4、2、0（倒着每次减 2）：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  for (int i = 10; i >= 0; i = i - 2) {\n    cout << i << " ";\n  }\n}',
      hints: ['`i = 10` 从 10 开始', '`i >= 0` 直到 0 为止', '`i = i - 2` 每次减 2'],
    },
    {
      type: 'multiple-choice',
      question: '回顾阶段 2：`cout << 10 / 3;` 输出什么？',
      options: [
        { text: '3.333', correct: false, explanation: '整型除法会截断小数部分' },
        { text: '3', correct: true, explanation: '10/3 整数除法结果是 3' },
        { text: '3.0', correct: false, explanation: '整数除法不会保留小数' },
        { text: '报错', correct: false, explanation: '整数除法是合法的操作' },
      ],
    },
    {
      type: 'type-it',
      instruction: '最后一个练习——用 for 输出 "第1次" 到 "第5次"：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  for (int i = 1; i <= 5; i++) {\n    cout << "第" << i << "次\\n";\n  }\n}',
      hints: ['`<<` 可以连续拼接输出', '`"第" << i << "次"` 把文字和变量拼一起', '`i` 在每次迭代中自动变化'],
    },
    {
      type: 'code-runner',
      instruction: '在 TODO 位置补全 for 循环，输出 1 到 100 的和（提示：循环里累加）：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int sum = 0;\n  for (int i = 1; i <= 100; i++) {\n    // TODO: sum = sum + i\n  }\n  cout << sum;\n}',
      expectedOutput: '5050',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'exposition',
      text: '`for` 把初始化、条件、更新写在一行里，代码更整洁、更不易遗漏。\n下一课：`for` vs `while` —— 什么时候用哪个？',
    },
  ],
}

export default lesson
