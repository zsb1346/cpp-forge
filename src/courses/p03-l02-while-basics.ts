import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'while-basics',
    chapter: 4,
    title: 'while——重复直到不满足',
    subtitle: 'while 语法入门',
    description: '学习 while 循环的基本语法和执行逻辑。',
    objectives: ['能用 while 写出简单循环', '理解条件为 true 就继续执行'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '`while` 是最简单的循环——它的逻辑只有一句话：\n**"条件为 true，就一直重复执行"**。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '语法格式：',
      code: 'while (条件) {\n  // 循环体——条件为 true 时反复执行\n}',
    },
    {
      type: 'exposition',
      text: '和 `if` 很像对不对？区别在于：\n`if` 执行 **一次**，`while` 执行 **多次，直到条件变成 false**。',
    },
    {
      type: 'concept-cards',
      instruction: 'while 循环的四个部件：',
      cards: [
        { glyph: '🔤', term: 'while', meaning: '关键字，告诉编译器开始循环', example: 'while (x > 0)' },
        { glyph: '()', term: '条件', meaning: '放 true 或 false 的表达式', example: 'count < 5' },
        { glyph: '{}', term: '循环体', meaning: '花括号包住的重复代码', example: '{ cout << i; }' },
        { glyph: '🔄', term: '迭代', meaning: '每次执行完循环体回到条件判断', example: '第 1 轮 → 第 2 轮' },
      ],
    },
    {
      type: 'type-it',
      instruction: '敲一个最简单的 while 循环——它会一直输出 "hi"：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  while (true) {\n    cout << "hi\\n";\n  }\n}',
      hints: ['`while (true)` 的条件永远为 true，会无限循环', '花括号 `{}` 包住循环体', '运行后可以用 Ctrl+C 强制停止'],
    },
    {
      type: 'multiple-choice',
      question: '复习上一课：循环最大的好处是什么？',
      options: [
        { text: '让代码看起来更短', correct: false, explanation: '变短是结果，不是核心目的' },
        { text: '让计算机自动重复执行，避免手动复制粘贴', correct: true, explanation: '循环代替我们重复劳动' },
        { text: '让程序运行更快', correct: false, explanation: '循环不会让程序变快，只是你不用写那么多代码' },
        { text: '让变量自动增加', correct: false, explanation: '变量增加是手动写的，不是循环自动做的' },
      ],
    },
    {
      type: 'exposition',
      text: '真实世界不会写 `while (true)`——\n我们会设一个**会让条件变成 false** 的终止条件。',
    },
    {
      type: 'exposition',
      text: '带终止条件的 while：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int count = 3;\n  while (count > 0) {\n    cout << "还剩" << count << "秒\\n";\n    count = count - 1;\n  }\n  cout << "时间到！\\n";\n}',
    },
    {
      type: 'type-it',
      instruction: '敲这个 3 秒倒计时的 while 循环：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int count = 3;\n  while (count > 0) {\n    cout << count << endl;\n    count = count - 1;\n  }\n  cout << "发射！\\n";\n}',
      hints: ['`count = count - 1` 每次把 count 减 1', 'count 从 3 变成 2 → 1 → 0 后，条件 `count > 0` 为 false 就停止', '`endl` 和 `\\n` 都表示换行'],
    },
    {
      type: 'exposition',
      text: '执行过程拆解：\n第 1 轮：count=3，3>0 为 true → 输出 3 → count 变成 2\n第 2 轮：count=2，2>0 为 true → 输出 2 → count 变成 1\n第 3 轮：count=1，1>0 为 true → 输出 1 → count 变成 0\n第 4 轮：count=0，0>0 为 false → **退出循环** → 输出"发射！"',
    },
    {
      type: 'multiple-choice',
      question: '执行 `while (count > 0)` 且 count 初始为 3，循环体会执行几次？',
      options: [
        { text: '2 次', correct: false, explanation: '3→2→1 要执行 3 次才对' },
        { text: '3 次', correct: true, explanation: 'count 为 3、2、1 时条件成立，共 3 次' },
        { text: '4 次', correct: false, explanation: 'count=0 时条件为 false 就不执行了' },
        { text: '无数次', correct: false, explanation: 'count 每次减 1，最终会变成 0 停止' },
      ],
    },
    {
      type: 'type-it',
      instruction: '敲一个倒计时 5 到 1 的 while 循环：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int n = 5;\n  while (n >= 1) {\n    cout << n << " "; \n    n = n - 1;\n  }\n}',
      hints: ['`n >= 1` 意思是 n 大于或等于 1 就继续', '`n = n - 1` 每次减 1', '空格 `" "` 让输出变成 "5 4 3 2 1"'],
    },
    {
      type: 'multiple-choice',
      question: '回顾阶段 2：以下代码输出什么？\n`int x = 10; x = x + 5; cout << x;`',
      options: [
        { text: '10', correct: false, explanation: 'x = x + 5 把 10+5 的结果赋给了 x' },
        { text: '15', correct: true, explanation: 'x 从 10 变成 10+5=15' },
        { text: '105', correct: false, explanation: '= 不是拼接，= 是数学赋值运算' },
        { text: 'x + 5', correct: false, explanation: '代码会计算值，不会输出公式' },
      ],
    },
    {
      type: 'exposition',
      text: '写 while 循环的三步口诀：\n1. **设初值**——给循环变量一个起点\n2. **写条件**——什么时候继续\n3. **改变量**——让条件最终能变成 false',
    },
    {
      type: 'type-it',
      instruction: '敲一个 while 循环，反复打招呼：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int times = 1;\n  while (times <= 3) {\n    cout << "你好！\\n";\n    times = times + 1;\n  }\n}',
      hints: ['`times <= 3` 是继续条件', '`times = times + 1` 每次加 1', '输出会是三行 "你好！"'],
    },
    {
      type: 'code-runner',
      instruction: '运行并修改这个 while 循环，让它从 1 输出到 5：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int i = 1;\n  while (i <= 5) {\n    cout << i << endl;\n    i = i + 1;\n  }\n}',
      expectedOutput: '1\n2\n3\n4\n5',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'exposition',
      text: '记住了：**while 的条件是准入证**——条件为 true 就进去执行一次，执行完了回来再检查。\n直到条件为 false，循环结束。',
    },
    {
      type: 'exposition',
      text: '下一课：用 while 实现"数数"——计数循环模式。',
    },
  ],
}

export default lesson
