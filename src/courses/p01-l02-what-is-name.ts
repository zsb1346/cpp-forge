import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'what-is-name',
    chapter: 2,
    title: '给值取个名字',
    subtitle: '变量名的概念',
    description: '理解名字是值的标签，值可以通过名字来引用。',
    objectives: ['理解"名字是值的标签"', '能区分名字和值', '知道同一个值可以有不同名字'],
    estimatedMinutes: 8,
  },
  blocks: [
    {
      type: 'exposition',
      text: '值有了，但怎么找到它？\n给值**取个名字**就行。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '想象你把手机放在桌上。你管它叫"我的手机"，而不是"那个长方形的金属块"。\n名字，就是一个东西的标签。\n\n在程序里也一样——给值取个名字，以后就能直接叫这个名字来用那个值。',
    },
    {
      type: 'concept-cards',
      instruction: '认识这两个概念：',
      cards: [
        { glyph: '📦', term: '值', meaning: '程序里的数据本身', example: '42 / "你好" / true' },
        { glyph: '🏷️', term: '名字', meaning: '你给值贴的标签', example: 'score / name / isReady' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '上节课学的：`42` 是什么？',
      options: [
        { text: '一个值', correct: true, explanation: '42 就是一个整数类型的值' },
        { text: '一个名字', correct: false, explanation: '42 是数字本身，不是名字' },
        { text: '一个类型', correct: false, explanation: '类型是 int、double 这些' },
        { text: '一条指令', correct: false, explanation: '42 只是数据，不是指令' },
      ],
    },
    {
      type: 'exposition',
      text: '比如你的游戏里有一个分数 `100`。\n你每次提到分数时，总不能都说"那个 100 的数字"吧？\n给它取个名字就好办了：`score`。\n\n以后 `score` 就代表 `100`。',
    },
    {
      type: 'multiple-choice',
      question: '如果值 `85` 有个名字叫 `grade`，下面哪个是对的？',
      options: [
        { text: 'grade 是值，85 是名字', correct: false, explanation: '搞反了。85 是值，grade 是名字' },
        { text: '85 是值，grade 是名字', correct: true, explanation: '没错，grade 就是值 85 的名字' },
        { text: 'grade 和 85 都是值', correct: false, explanation: 'grade 是名字，不是值' },
        { text: 'grade 和 85 都是名字', correct: false, explanation: '85 是值本身，不是名字' },
      ],
    },
    {
      type: 'exposition',
      text: '名字可以自己取。你可以叫它 `score`、叫它 `health`、叫它 `myAge`。\n规则只有一个：**名字帮你在后面找到那个值**。',
    },
    {
      type: 'multiple-choice',
      question: '同一个值能不能有两个不同的名字？',
      options: [
        { text: '不能，一个值只能有一个名字', correct: false, explanation: '不同的名字可以指向同一个值' },
        { text: '能，不同名字可以指向同一个值', correct: true, explanation: '就像一个人可以有绰号和大名一样' },
        { text: '不能，名字会冲突', correct: false, explanation: '不会冲突，它们只是不同的标签' },
        { text: '能，但必须同时用', correct: false, explanation: '不需要同时用，随时可以用任意名字' },
      ],
    },
  ],
}

export default lesson
