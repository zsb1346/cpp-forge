import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'semicolon-rule',
    chapter: 2,
    title: '分号 ; 为什么存在',
    subtitle: '语句结束符',
    description: '分号是 C++ 每条语句的结束标记。',
    objectives: ['知道每条语句末尾要加分号', '能指出忘记分号是常见错误'],
    estimatedMinutes: 8,
  },
  blocks: [
    {
      type: 'exposition',
      text: '你有没有注意到，每行代码最后都有一个 `;`？\n分号 = C++ 里**语句的句号**。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '中文句子以句号结束。\nC++ 语句以分号 `;` 结束。\n\n告诉编译器："这句话到此为止，准备看下一句。"',
      code: 'int x;        // 声明语句结束\nx = 5;        // 赋值语句结束\nint y = 10;   // 初始化语句结束',
    },
    {
      type: 'multiple-choice',
      question: '上节课的关键概念：`x = 5;` 中 `=` 在 C++ 里是什么？',
      options: [
        { text: '判断 x 等于 5', correct: false, explanation: '那是 ==，不是 =' },
        { text: '把 5 放进 x', correct: true, explanation: '= 是把右边值赋给左边变量' },
        { text: '声明变量 x', correct: false, explanation: '声明需要类型关键字如 int' },
        { text: '输出 x 的值', correct: false, explanation: '赋值不会输出' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '下面哪个正确结束了一条语句？',
      options: [
        { text: 'int x', correct: false, explanation: '没有分号，编译器不知道语句结束了' },
        { text: 'int x;', correct: true, explanation: '分号表示声明语句结束' },
        { text: 'int x.', correct: false, explanation: 'C++ 用分号，不用句号' },
        { text: 'int x:', correct: false, explanation: '冒号不是语句结束符' },
      ],
    },
    {
      type: 'type-it',
      instruction: '输入一条完整的声明语句（带分号）：',
      code: 'int count;',
      hints: [
        '格式：类型 + 空格 + 名字 + 分号',
        '分号 ; 在键盘右下角，一般在 L 键右边',
        '忘了分号会编译报错，这是新手最常见的错误之一',
      ],
    },
    {
      type: 'exposition',
      text: '为什么需要分号？因为 C++ 允许一条语句跨多行。\n\n有分号，编译器就知道"不管占几行，碰到分号才算完"。',
      code: 'int\nx\n;    // 这样也行，分行写了但分号结束',
    },
    {
      type: 'exposition',
      text: '常见错误：初学者总是忘分号。编译器会报错，告诉你"缺分号"。看到这种错误，先检查行尾有没有 `;`。',
    },
    {
      type: 'multiple-choice',
      question: '忘了写分号会发生什么？',
      options: [
        { text: '程序正常运行', correct: false, explanation: '编译器会报错' },
        { text: '编译器报错，编译失败', correct: true, explanation: '没有分号，编译器不知道语句在哪结束' },
        { text: '程序自己加上分号', correct: false, explanation: '编译器不会帮你补分号' },
        { text: '程序运行但结果不对', correct: false, explanation: '根本不会运行，编译阶段就错了' },
      ],
    },
  ],
}

export default lesson
