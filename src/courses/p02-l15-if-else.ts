import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'if-else',
    chapter: 3,
    title: '二选一',
    subtitle: 'if-else 分支',
    description: '学习用 else 分支处理"条件不成立时"的情况。',
    objectives: ['能用 if-else 写出二选一的分支', '理解 if 和 else 只能执行其中一个'],
    estimatedMinutes: 8,
  },
  blocks: [
    {
      type: 'exposition',
      text: '`if` 只能处理"条件成立时"的情况。\n如果还想处理"条件不成立时"的情况，就加 `else`。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '`if-else` 结构——二选一：',
      code: 'if (score >= 60) {\n  std::cout << "及格";\n} else {\n  std::cout << "不及格";\n}',
    },
    {
      type: 'type-it',
      instruction: '输入一个 if-else 语句：',
      code: 'if (10 > 5) {\n  std::cout << "大了";\n} else {\n  std::cout << "小了";\n}',
      hints: [
        '`if` 条件成立时执行第一个花括号',
        '条件不成立时执行 `else` 后面的花括号',
        '注意 `else` 前面不用写条件',
      ],
    },
    {
      type: 'match-blocks',
      instruction: '拼出一个 if-else 语句：',
      fragments: ['if', '(x > 0)', '{', 'cout << "正数";', '}', 'else', '{', 'cout << "非正数";', '}'],
      distractors: ['else if'],
    },
    {
      type: 'exposition',
      text: '`if` 和 `else` 是"互斥"的——\n条件为 true 就走 if，条件为 false 就走 else。\n**两个分支只会执行一个**。',
    },
    {
      type: 'type-it',
      instruction: '输入一个判断正负数的 if-else：',
      code: 'int num = -3;\nif (num > 0) {\n  std::cout << "正数";\n} else {\n  std::cout << "非正数";\n}',
      hints: [
        '先声明变量 num 为 -3',
        '条件 num > 0 是 false',
        '所以执行 else 分支输出"非正数"',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾：if 不加花括号时，if 能控制几行代码？',
      options: [
        { text: '0 行', correct: false, explanation: '至少能控制一行' },
        { text: '1 行', correct: true, explanation: '不写花括号的话，if 只控制紧跟着的一行' },
        { text: '所有缩进的行', correct: false, explanation: '缩进只是视觉上的，C++ 不认缩进' },
        { text: '直到遇到 } 为止', correct: false, explanation: '没有花括号就没有闭合符号' },
      ],
    },
    {
      type: 'type-it',
      instruction: '用 if-else 实现奇偶判断：',
      code: 'int n = 7;\nif (n % 2 == 0) {\n  std::cout << "偶数";\n} else {\n  std::cout << "奇数";\n}',
      hints: [
        '`n % 2` 是 n 除以 2 的余数',
        '余数为 0 就是偶数，否则是奇数',
        '7 % 2 = 1，所以走 else 分支',
      ],
    },
    {
      type: 'exposition',
      text: '`if-else` 是"二选一"的开关。\n条件成立走 if，不成立走 else——**永远不会两个都走**。',
    },
  ],
}

export default lesson
