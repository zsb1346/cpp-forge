import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'practice-1',
    chapter: 1,
    title: '练习：认识代码',
    subtitle: '巩固前 4 课',
    description: '综合练习：识别符号、认识程序结构、理解编译流程。',
    objectives: ['能识别常见符号并说出用途', '能理解程序的基本结构', '能说出源代码到运行的全过程'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '前 4 课学了不少概念。这节课来**练一练**，看看你是不是真的认识了。',
      textAnimation: 'typewriter',
    },
    {
      type: 'multiple-choice',
      question: '以下哪个是"程序"的正确定义？',
      options: [
        { text: '一组按顺序执行的指令', correct: true, explanation: '程序就是按顺序执行的一组指令' },
        { text: '一台计算机', correct: false, explanation: '计算机是硬件，程序是软件' },
        { text: '一个键盘', correct: false, explanation: '键盘是输入设备' },
        { text: '一个文件图标', correct: false, explanation: '这只是程序的外观' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '编译器的任务是什么？',
      options: [
        { text: '运行写好的程序', correct: false, explanation: '运行程序的是操作系统' },
        { text: '把源代码翻译成机器指令', correct: true, explanation: '编译器让你不用写 0 和 1' },
        { text: '帮程序员写代码', correct: false, explanation: '写代码这件事还是得自己来' },
        { text: '管理内存', correct: false, explanation: '操作系统管理内存' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '`cout << "Hello";` 中，双引号的作用是什么？',
      options: [
        { text: '表示这是一个字符串', correct: true, explanation: '双引号包裹的是文本内容（字符串）' },
        { text: '表示这是一个变量', correct: false, explanation: '变量不需要引号' },
        { text: '表示这是一个数字', correct: false, explanation: '数字不需要引号' },
        { text: '表示这是一条注释', correct: false, explanation: '注释用 // 或 /* */' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '程序执行的起点是？',
      options: [
        { text: '#include 那行', correct: false, explanation: '#include 是导入指令，不是执行起点' },
        { text: 'main() 里面的代码', correct: true, explanation: '所有 C++ 程序都从 main 开始执行' },
        { text: '程序的最后一行', correct: false, explanation: '最后一行是结束，不是开始' },
        { text: '第一行写的东西', correct: false, explanation: '第一行通常是 #include，不是执行起点' },
      ],
    },
    {
      type: 'type-it',
      instruction: '敲一下完整的 C++ 程序框架，感受整体结构：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  cout << "Hello";\n  return 0;\n}',
      hints: [
        '`#include` 后面没有分号',
        '`main()` 后面的花括号不要漏',
        '`cout <<` 后面要有空格吗？空格不影响功能，但建议加一个',
      ],
    },
    {
      type: 'type-it',
      instruction: '再敲一次，这次换个词：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  cout << "C++ is fun";\n  return 0;\n}',
      hints: [
        '双引号里的内容可以随便换，那是输出的文字',
        '别忘了 `return 0;` 末尾的分号',
        '花括号要成对出现',
      ],
    },
    {
      type: 'exposition',
      text: '好！恭喜你完成了第一个"练习课"。\n\n你已经学会了：\n✅ 程序是什么\n✅ 源代码和编译器的概念\n✅ 常见符号的认知\n✅ C++ 程序长什么样\n\n准备进入真正的编程世界吧！',
    },
  ],
}

export default lesson
