import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'bool-type',
    chapter: 2,
    title: 'bool——真与假',
    subtitle: '认识布尔类型',
    description: '认识 bool 类型，只有 true 和 false 两个值。',
    objectives: ['知道 bool 代表布尔类型', '能说出 true 和 false 的含义'],
    estimatedMinutes: 8,
  },
  blocks: [
    {
      type: 'exposition',
      text: '有一种类型只有两个值：**真** 和 **假**。它叫 `bool`。',
      textAnimation: 'typewriter',
    },
    {
      type: 'concept-cards',
      instruction: '认识 bool：',
      cards: [
        { glyph: '📦', term: 'bool', meaning: '布尔类型，只有两个值', example: 'bool / int' },
        { glyph: '✅', term: 'true', meaning: '真，表示"是"、"对"、"成立"', example: 'true' },
        { glyph: '❌', term: 'false', meaning: '假，表示"否"、"错"、"不成立"', example: 'false' },
      ],
    },
    {
      type: 'exposition',
      text: '`bool` 只有两个值：\n- `true`（真/是/对）\n- `false`（假/否/错）\n\n没有第三个。像灯的开关——只有开和关。',
      code: 'true   // 表示"是"\nfalse  // 表示"否"',
    },
    {
      type: 'multiple-choice',
      question: '上节课学的：`\'A\'` 是什么类型？',
      options: [
        { text: '字符串', correct: false, explanation: '单引号是 char，不是字符串' },
        { text: 'char', correct: true, explanation: '单引号括起来的单个字符就是 char' },
        { text: 'int', correct: false, explanation: 'int 是整数，没有引号' },
        { text: 'bool', correct: false, explanation: 'bool 只有 true/false' },
      ],
    },
    {
      type: 'exposition',
      text: '`bool` 经常用来回答"是或否"的问题：\n- 游戏通关了吗？→ 答案是 `true` 或 `false`\n- 用户登录了吗？→ `true` 或 `false`\n- 这个数大于 10 吗？→ `true` 或 `false`',
    },
    {
      type: 'multiple-choice',
      question: '下面哪个是 bool 类型的值？',
      options: [
        { text: '0', correct: false, explanation: '0 是整数，不是 bool' },
        { text: 'true', correct: true, explanation: 'true 是 bool 类型的值' },
        { text: '"false"', correct: false, explanation: '双引号括起来的是字符串，不是 bool' },
        { text: "'T'", correct: false, explanation: '这是 char 类型的字符' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '`bool` 类型有几个可能的取值？',
      options: [
        { text: '1 个', correct: false, explanation: '两个值：true 和 false' },
        { text: '2 个', correct: true, explanation: '没错，只有 true 和 false 两个' },
        { text: '3 个', correct: false, explanation: '没有第三个' },
        { text: '无数个', correct: false, explanation: 'bool 只有两个值' },
      ],
    },
    {
      type: 'exposition',
      text: '到今天为止，我们学了四种基本类型：`int`、`double`、`char`、`bool`。\n\n下一节就是专门练习分辨它们。',
    },
  ],
}

export default lesson
