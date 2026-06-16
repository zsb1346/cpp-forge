import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'multiple-parameters',
    chapter: 5,
    title: '多个参数',
    subtitle: '逗号分隔参数列表',
    description: '学会定义和调用有多个参数的函数。',
    objectives: ['能定义带多个参数的函数', '能正确传递多个参数'],
    estimatedMinutes: 8,
  },
  blocks: [
    {
      type: 'exposition',
      text: '一个函数可以有**不止一个参数**——用逗号隔开即可。\n每个参数都要写类型和名字。',
    },
    {
      type: 'exposition',
      text: '两个参数用逗号分隔：',
      code: 'void showSum(int a, int b) {\n  std::cout << a + b;\n}\n\nint main() {\n  showSum(3, 5);  // 输出 8\n}',
      textAnimation: 'typewriter',
    },
    {
      type: 'type-it',
      instruction: '定义有两个参数的函数：',
      code: '#include <iostream>\n\nvoid showSum(int x, int y) {\n  std::cout << x + y << "\\n";\n}\n\nint main() {\n  showSum(10, 20);\n}',
      hints: [
        '两个参数之间用逗号分隔',
        '每个参数都要写类型，int x, int y',
        '调用时传的值按顺序对应参数',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾：`void show(int x)` 调用 show(5) 时，5 传给哪个变量？',
      options: [
        { text: 'show', correct: false, explanation: 'show 是函数名，不是参数变量' },
        { text: 'x', correct: true, explanation: '调用时 5 传给参数 x，函数体里 x 就是 5' },
        { text: 'int', correct: false, explanation: 'int 是类型关键字，不是变量' },
        { text: 'void', correct: false, explanation: 'void 是返回值类型，不是参数' },
      ],
    },
    {
      type: 'exposition',
      text: '多个参数的类型可以不一样：\n`void showInfo(string name, int age)` —— 一个字符串 + 一个整数。',
    },
    {
      type: 'type-it',
      instruction: '定义两个不同类型的参数：',
      code: '#include <iostream>\n#include <string>\n\nvoid introduce(std::string name, int age) {\n  std::cout << name << "今年" << age << "岁\\n";\n}\n\nint main() {\n  introduce("小明", 18);\n}',
      hints: [
        '第一个参数 string，第二个参数 int',
        '调用时两个参数用逗号隔开',
        '参数的顺序必须和定义时一致',
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全函数，接收两个 int 参数并输出它们的乘积：',
      template: 'void showProduct(int a, int ____) {\n  cout << ____ * ____ << "\\n";\n}',
      answers: ['b', 'a', 'b'],
      hints: ['第一个空：第二个参数的名字', '第二、三个空：两个参数相乘'],
    },
    {
      type: 'multiple-choice',
      question: '`void calc(int a, double b)` 调用 calc(3, 2.5) 时，参数怎么对应？',
      options: [
        { text: 'a=2.5, b=3', correct: false, explanation: '参数按位置顺序对应，不是按类型' },
        { text: 'a=3, b=2.5', correct: true, explanation: '第一个值 3 给 int a，第二个值 2.5 给 double b' },
        { text: 'a=3, b 没有值', correct: false, explanation: '两个参数都需要传值' },
        { text: '会报错，类型不匹配', correct: false, explanation: 'int 和 double 类型不同也可以作为参数' },
      ],
    },
    {
      type: 'code-runner',
      instruction: '定义查找最大值函数并调用：',
      code: '#include <iostream>\nusing namespace std;\n\nint max(int a, int b) {\n  if (a > b) return a;\n  else return b;\n}\n\nint main() {\n  cout << max(10, 20) << " " << max(50, 30);\n}',
      expectedOutput: '20 50',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'exposition',
      text: '多个参数 = 让函数接收**更多信息**，做更复杂的事情。\n注意顺序和类型要一一对应。',
    },
  ],
}

export default lesson
