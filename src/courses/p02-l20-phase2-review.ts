import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'phase2-review',
    chapter: 3,
    title: '阶段总复习',
    subtitle: '运算符/I/O/条件总复习',
    description: '全面回顾阶段 2 的算术运算符、输入输出、条件判断等核心概念。',
    objectives: ['巩固阶段 2 全部知识点', '能够分辨易混淆的概念（= vs ==、截断等）'],
    estimatedMinutes: 12,
  },
  blocks: [
    {
      type: 'multiple-choice',
      question: '`(2 + 3) * 4` 的结果是多少？',
      options: [
        { text: '14', correct: false, explanation: '先算括号 2+3=5，再 5*4=20' },
        { text: '20', correct: true, explanation: '括号优先：2+3=5，5*4=20' },
        { text: '24', correct: false, explanation: '那是 2+3*4 先乘后加的结果' },
        { text: '9', correct: false, explanation: '计算顺序不对' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '以下哪个是正确的 cout 输出语句？',
      options: [
        { text: 'cout >> "hello"', correct: false, explanation: '输出应该用 << 而不是 >>' },
        { text: 'std::cout << "hello"', correct: true, explanation: '正确的输出格式' },
        { text: 'std::cout >> "hello"', correct: false, explanation: '>> 是 cin 用的' },
        { text: 'cout < "hello"', correct: false, explanation: '缺少 std:: 且符号不对' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '`int x = 7; if (x == 7) { }` 中的 `==` 是什么意思？',
      options: [
        { text: '把 7 赋给 x', correct: false, explanation: '= 才是赋值，== 是比较' },
        { text: '判断 x 是否等于 7', correct: true, explanation: '== 是比较运算符，检查是否相等' },
        { text: '声明变量', correct: false, explanation: 'int 才是声明变量的关键字' },
        { text: '输出值', correct: false, explanation: '== 不是输出' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '`9 / 2` 的结果是什么？',
      options: [
        { text: '4.5', correct: false, explanation: 'int/int 不会保留小数' },
        { text: '4', correct: true, explanation: '9÷2=4.5，砍掉小数得 4' },
        { text: '5', correct: false, explanation: '不四舍五入' },
        { text: '1', correct: false, explanation: '那是 9%2 的结果' },
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全代码：输入一个数，如果大于 0 输出"ok"：',
      template: 'int n;\nstd::cin >> ____;\nif (____ ____ 0) {\n  std::cout << "ok";\n}',
      answers: ['n', 'n', '>'],
      hints: ['第一个空是 cin 读取的目标变量', '第二个空是条件左边的变量', '第三个空是比较运算符'],
    },
    {
      type: 'fill-in',
      prompt: '计算 25 除以 4 的余数：',
      template: 'int r = 25 ____ ____;',
      answers: ['%', '4'],
      hints: ['第一个空是运算符', '第二个空是除数'],
    },
    {
      type: 'multiple-choice',
      question: '`cin >> x;` 执行时如果用户输入了 42，x 的值是多少？',
      options: [
        { text: '字符串"42"', correct: false, explanation: '如果 x 是 int，cin 读入的是整数 42' },
        { text: '整数 42', correct: true, explanation: 'cin >> x 把输入存进 x，x 的类型决定存什么' },
        { text: '42.0', correct: false, explanation: 'int 类型不会存小数' },
        { text: '不确定', correct: false, explanation: '确定是 42' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '以下哪个是合法的 if-else 语句？',
      options: [
        { text: 'if x > 5 else { }', correct: false, explanation: 'if 条件需要括号' },
        { text: 'if (x > 5) { } else { }', correct: true, explanation: '标准的 if-else 格式' },
        { text: 'if (x > 5) { } else { } else { }', correct: false, explanation: 'else 只能有一个' },
        { text: 'if (x > 5) else { }', correct: false, explanation: 'if 后面要有执行代码或花括号' },
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全链式输出：输出"和是"再加变量 sum：',
      template: 'std::cout << "____" << ____;',
      answers: ['和是', 'sum'],
      hints: ['第一个空是文字内容', '第二个空是变量名'],
    },
    {
      type: 'exposition',
      text: '阶段 2 全部完成！🎉\n你已经学会了：\n1. 算术运算符 `+ - * / %`\n2. 输入输出 `cin cout`\n3. 条件判断 `if else` 和比较运算符\n\n下一阶段将进入更强大的"循环"——让代码自动重复执行！',
    },
  ],
}

export default lesson
