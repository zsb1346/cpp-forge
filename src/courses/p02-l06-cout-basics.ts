import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'cout-basics',
    chapter: 3,
    title: '输出基础',
    subtitle: '让程序说话',
    description: '学习用 cout 把文字和数值输出到屏幕上。',
    objectives: ['能用 cout 输出文字', '理解 << 是"送给 cout"的符号'],
    estimatedMinutes: 8,
  },
  blocks: [
    {
      type: 'exposition',
      text: '到现在为止，程序计算完结果我们"看不见"。\n如果想让程序把结果**显示出来**，就要用到 `cout`。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '`cout` 的用法像"把东西送到屏幕上"：',
      code: '#include <iostream>\nint main() {\n  std::cout << "你好";\n}',
    },
    {
      type: 'concept-cards',
      instruction: '认识这两个新符号：',
      cards: [
        { glyph: '🖥️', term: 'cout', meaning: '屏幕输出工具，让程序显示文字', example: 'std::cout' },
        { glyph: '➡️', term: '<<', meaning: '流向符号，把数据送到 cout', example: 'cout << "hi"' },
      ],
    },
    {
      type: 'type-it',
      instruction: '输入一个完整的输出程序：',
      code: '#include <iostream>\nint main() {\n  std::cout << "你好";\n}',
      hints: [
        '第一行 `#include <iostream>` 是引入输入输出库',
        '`int main() { }` 是程序的入口',
        '文字要用双引号 `"` 括起来',
      ],
    },
    {
      type: 'exposition',
      text: '`std::cout` 的意思是"标准输出设备"（一般就是屏幕）。\n`<<` 把右边的数据"送"到左边。\n\n`<< "你好"` → 把"你好"送到屏幕。',
    },
    {
      type: 'multiple-choice',
      question: '回顾：`int x = 10 % 3;` 执行后 x 的值是？',
      options: [
        { text: '3', correct: false, explanation: '% 是取余，10÷3 余 1' },
        { text: '1', correct: true, explanation: '10 ÷ 3 = 3 余 1，% 得到余数 1' },
        { text: '0', correct: false, explanation: '10 不是 3 的倍数' },
        { text: '10', correct: false, explanation: '% 会做除法运算' },
      ],
    },
    {
      type: 'type-it',
      instruction: '用 cout 输出一个数字：',
      code: 'std::cout << 42;',
      hints: [
        '输出数字不用双引号',
        '`42` 直接写数字就行',
        '和输出文字一样用 `<<`',
      ],
    },
    {
      type: 'code-runner',
      instruction: '点击运行，看看这个程序输出了什么：',
      code: '#include <iostream>\nint main() {\n  std::cout << "Hello C++";\n}',
      editable: false,
      comparison: 'trimmed',
    },
    {
      type: 'exposition',
      text: '`cout` 和 `<<` 配合使用，就能让程序"说话"了。\n下一课学怎么一次性输出多个东西。',
    },
  ],
}

export default lesson
