import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'what-is-program',
    chapter: 1,
    title: '程序是什么',
    subtitle: '指令的集合',
    description: '建立「程序=指令序列」的心智模型，用生活类比理解程序的概念。',
    objectives: ['能用生活中的例子类比解释"程序"', '理解程序是由一条条指令组成的', '知道计算机按顺序执行指令'],
    estimatedMinutes: 8,
  },
  blocks: [
    {
      type: 'exposition',
      text: '你有没有想过——计算机是怎么听懂人话的？',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '其实计算机听不懂"人话"。它只听得懂 **指令**——一条一条、非常明确的命令。',
    },
    {
      type: 'exposition',
      text: '比如你做一道番茄炒蛋，步骤就是一组指令：\n1. 切番茄\n2. 打鸡蛋\n3. 热油\n4. 炒蛋\n5. 加番茄\n6. 出锅',
    },
    {
      type: 'exposition',
      text: '程序也是一样。\n**程序 = 一组按顺序执行的指令**，告诉计算机"先做什么、再做什么"。',
    },
    {
      type: 'concept-cards',
      instruction: '认识这三个核心概念：',
      cards: [
        { glyph: '📋', term: '指令', meaning: '计算机能执行的一个具体命令', example: '输出一句话' },
        { glyph: '🔢', term: '顺序', meaning: '指令按从上到下的顺序执行', example: '先做 A，再做 B' },
        { glyph: '📦', term: '程序', meaning: '一组指令的集合，完成一个任务', example: '计算器、游戏都是程序' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '下面哪个最像"程序"的定义？',
      options: [
        { text: '一台电脑', correct: false, explanation: '电脑是运行程序的机器，不是程序本身' },
        { text: '一组按顺序执行的指令', correct: true, explanation: '程序就是一组按顺序执行的指令集合' },
        { text: '一个文件', correct: false, explanation: '程序以文件形式存储，但本质是指令序列' },
        { text: '一个键盘', correct: false, explanation: '键盘是输入设备，不是程序' },
      ],
    },
    {
      type: 'exposition',
      text: '我们生活里到处都是"程序"：\n- 洗衣机程序：进水→洗→漂→脱水\n- 微波炉程序：设时间→加热→叮\n- C++ 程序也是一样的逻辑。',
    },
    {
      type: 'multiple-choice',
      question: '如果计算机程序"先做 A 再做 B"，下面哪个是对的？',
      options: [
        { text: 'A 和 B 同时做', correct: false, explanation: '计算机默认按顺序执行，不是同时' },
        { text: '先做 A，做完再做 B', correct: true, explanation: '程序就是按顺序一条一条执行的' },
        { text: '先做 B 再做 A', correct: false, explanation: '除非特别指定，否则从上往下执行' },
        { text: '做 B 的时候跳过 A', correct: false, explanation: '不会跳过，除非有特殊指令（如 if）' },
      ],
    },
    {
      type: 'exposition',
      text: '记住：**程序 = 指令 + 顺序**。\n接下来我们要学的 C++，就是用来写这些指令的语言。',
    },
  ],
}

export default lesson
