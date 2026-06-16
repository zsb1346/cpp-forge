import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'while-counter',
    chapter: 4,
    title: '用 while 数数',
    subtitle: '计数循环模式',
    description: '掌握初值→条件→更新的计数循环三步法。',
    objectives: ['能用 while 实现计数循环', '理解初值、条件、更新三要素'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '上一课学会了 while 的基本语法。\n这一课聚焦一种**最常用的模式**：计数循环。',
    },
    {
      type: 'exposition',
      text: '计数循环的标准三步：\n1. **初始化**——给计数器一个起始值\n2. **条件判断**——什么时候继续数\n3. **更新计数器**——每次加 1（或减 1）',
      code: 'int i = 0;         // ① 初始化\nwhile (i < 5) {    // ② 条件\n  cout << i;       // 循环体\n  i++;             // ③ 更新：i++ 等价于 i = i + 1\n}',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '看一个从 1 数到 5 的例子：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int i = 1;\n  while (i <= 5) {\n    cout << i << " ";\n    i++;\n  }\n}',
    },
    {
      type: 'concept-cards',
      instruction: '计数循环三要素：',
      cards: [
        { glyph: '🎬', term: '初始化', meaning: '给计数器一个起点', example: 'int i = 0;' },
        { glyph: '🧪', term: '条件', meaning: '继续循环的条件表达式', example: 'i < 10' },
        { glyph: '📈', term: '更新', meaning: '每次改变计数器的值', example: 'i++ 或 i = i + 1' },
      ],
    },
    {
      type: 'type-it',
      instruction: '敲一个从 0 数到 4 的计数循环：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int i = 0;\n  while (i < 5) {\n    cout << i << endl;\n    i++;\n  }\n}',
      hints: ['`i < 5` 表示 i 小于 5 时继续', '`i++` 等价于 `i = i + 1`，每次加 1', 'i 从 0→1→2→3→4，到 5 时条件为 false 停止'],
    },
    {
      type: 'multiple-choice',
      question: '复习上一课：while 循环的条件为 false 时会发生什么？',
      options: [
        { text: '程序报错', correct: false, explanation: '条件为 false 是正常退出，不会报错' },
        { text: '跳过循环体，继续执行后面的代码', correct: true, explanation: '条件为 false 时退出循环，继续往后走' },
        { text: '再执行一次才退出', correct: false, explanation: 'while 先检查条件，false 就直接跳过' },
        { text: '重新初始化变量', correct: false, explanation: '不会自动初始化，需要你自己写' },
      ],
    },
    {
      type: 'exposition',
      text: '**重要：i < n 和 i <= n 的区别**\n`while (i < 5)` → i 从 0 数到 4（5 次）\n`while (i <= 5)` → i 从 0 数到 5（6 次）\n差一个数字，看清楚了！',
    },
    {
      type: 'type-it',
      instruction: '用 `<=` 数从 1 到 10：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int i = 1;\n  while (i <= 10) {\n    cout << i << " ";\n    i++;\n  }\n}',
      hints: ['`i <= 10` 包含等于，所以 10 会输出', '`i++` 写在循环体最后，每次加 1', '`" "` 在两个数字之间加空格'],
    },
    {
      type: 'fill-in',
      prompt: '补全循环条件，让 i 从 1 数到 100：',
      template: 'int i = 1;\nwhile (i ____ 100) {\n  cout << i;\n  ____;\n}',
      answers: ['<=', 'i++'],
      hints: ['第一个空：i 从 1 到 100，包含 100', '第二个空：每次加 1'],
    },
    {
      type: 'multiple-choice',
      question: '`int i = 0; while (i < 3) { i++; }` 循环结束后 i 的值是多少？',
      options: [
        { text: '2', correct: false, explanation: '最后一轮 i=2 时条件成立，执行 i++ 变成 3' },
        { text: '3', correct: true, explanation: 'i=0→1→2→3，i=3 时条件 i<3 为 false 退出' },
        { text: '4', correct: false, explanation: 'i 最多增加到 3 就退出了' },
        { text: '0', correct: false, explanation: 'i 在循环里被不断加 1' },
      ],
    },
    {
      type: 'exposition',
      text: '也可以**倒着数**：从大到小，用 `i--` 或 `i = i - 1`。',
      code: 'int i = 5;\nwhile (i >= 1) {\n  cout << i << " ";\n  i--;\n}\n// 输出：5 4 3 2 1',
    },
    {
      type: 'type-it',
      instruction: '敲一个倒着数的循环——从 10 数到 1：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int i = 10;\n  while (i >= 1) {\n    cout << i << " ";\n    i--;\n  }\n}',
      hints: ['`i >= 1` 确保当 i=1 时还执行一次', '`i--` 等价于 `i = i - 1`', '最后输出 "10 9 8 7 6 5 4 3 2 1"'],
    },
    {
      type: 'fill-in',
      prompt: '补全代码，输出 2、4、6、8、10（每次加 2）：',
      template: 'int i = 2;\nwhile (i ____ 10) {\n  cout << i << " ";\n  ____;\n}',
      answers: ['<=', 'i += 2'],
      hints: ['第一个空：包含 10', '第二个空：每次加 2，用 `+=` 简写'],
    },
    {
      type: 'multiple-choice',
      question: '回顾阶段 2：`i += 3` 等价于什么？',
      options: [
        { text: 'i = i + 3', correct: true, explanation: '+= 是复合赋值运算符，等价于 i = i + 3' },
        { text: 'i = 3', correct: false, explanation: '= 是赋值，+= 是加后再赋值' },
        { text: 'i + 3', correct: false, explanation: '不加等号只是表达式，不会改变 i 的值' },
        { text: 'i++', correct: false, explanation: 'i++ 等价于 i += 1，不是加 3' },
      ],
    },
    {
      type: 'exposition',
      text: '计数循环的常见变量名习惯：\n- `i` —— 最常用\n- `j`、`k` —— 第二层、第三层循环\n- `count`、`num` —— 更明确的名字',
    },
    {
      type: 'type-it',
      instruction: '敲一个用 count 作为变量名的计数循环：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int count = 0;\n  while (count < 5) {\n    cout << "第" << count << "次\\n";\n    count++;\n  }\n}',
      hints: ['变量名 count 读作"计数"', '`count < 5` 执行 5 次（0→4）', '输出："第0次" 到 "第4次"'],
    },
    {
      type: 'code-runner',
      instruction: '写一个计数循环，输出从 1 到 20 中所有偶数（提示：每次加 2 或者用条件判断）：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int i = 2;\n  while (i <= 20) {\n    cout << i << " ";\n    i += 2;\n  }\n}',
      expectedOutput: '2 4 6 8 10 12 14 16 18 20',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'exposition',
      text: '总结：计数循环 = 初值 + 条件 + 更新。\n这是编程里**最经典、最常用**的模式，一定练熟。',
    },
  ],
}

export default lesson
