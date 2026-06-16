import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'pointer-motivation',
    chapter: 6,
    title: '为什么需要地址',
    subtitle: '变量在内存的位置',
    description: '理解变量在内存中的存储位置，引出"直接操作变量 vs 知道它在哪"的区别。',
    objectives: ['能说出变量存储在内存中', '理解每个变量都有地址', '体会为什么需要地址的概念'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '到目前为止，你写的代码都是**直接操作变量名**——\n`x = 5`、`cout << x`……你告诉计算机"操作 x"，计算机就去找到 x。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '但你有没有想过一个问题：\n**计算机是怎么找到 x 的？**',
    },
    {
      type: 'exposition',
      text: '答案藏在内存里。\n程序运行时，每个变量都住在**内存**中——内存就是一排排带编号的"格子"。',
    },
    {
      type: 'concept-cards',
      instruction: '认识这几个概念：',
      cards: [
        { glyph: '🧠', term: '内存', meaning: '程序运行时存数据的地方，像一排柜子', example: '8GB RAM' },
        { glyph: '🔢', term: '地址', meaning: '每个格子的编号，唯一标识一个位置', example: '0x7ffe12' },
        { glyph: '📦', term: '变量', meaning: '一个有名字的内存格子，存了一个值', example: 'int x = 5;' },
      ],
    },
    {
      type: 'exposition',
      text: '上一阶段你学过数组——数组的元素在内存里是**挨着排**的：',
      code: 'int arr[3] = {10, 20, 30};',
    },
    {
      type: 'multiple-choice',
      question: '复习：`int arr[3] = {10, 20, 30};` 中，arr[0] 和 arr[1] 在内存中是什么关系？',
      options: [
        { text: '它们相隔很远，中间有空洞', correct: false, explanation: '数组元素是连续存放的' },
        { text: '它们在同一个格子里', correct: false, explanation: '每个变量有自己的格子' },
        { text: '它们是相邻的，地址连续', correct: true, explanation: '数组元素在内存中紧密相邻' },
        { text: 'arr[1] 在 arr[0] 的上面', correct: false, explanation: '内存是线性地址空间，没有上下' },
      ],
    },
    {
      type: 'exposition',
      text: '既然每个变量都有一个"门牌号"（地址），\n你就有了两种操作变量的方式：',
    },
    {
      type: 'exposition',
      text: '**方式 1：直接**——通过变量名操作\n`x = 10;` 你直接告诉计算机"把 10 放进 x"。',
    },
    {
      type: 'exposition',
      text: '**方式 2：间接**——通过地址操作\n你知道 x 的门牌号，告诉计算机"去 0x7ffe12 那个格子放 10"。',
    },
    {
      type: 'multiple-choice',
      question: '以下哪种操作是"间接操作"变量？',
      options: [
        { text: '`x = 5;` 通过变量名赋值', correct: false, explanation: '这是直接通过变量名操作' },
        { text: '知道 x 的地址后，通过地址读写', correct: true, explanation: '间接操作就是通过位置而不是名字' },
        { text: '`cin >> x;` 从键盘读入', correct: false, explanation: 'cin 还是通过变量名操作的' },
        { text: '`cout << x;` 输出值', correct: false, explanation: '这也是直接通过变量名' },
      ],
    },
    {
      type: 'exposition',
      text: '你可能觉得"直接操作不就行了吗？为什么要绕一圈？"\n因为**有时候你不能直接操作变量名**。',
    },
    {
      type: 'exposition',
      text: '场景 1：**函数之间**\n一个函数里的变量，另一个函数不能直接用名字访问。\n但你**可以把地址传过去**——对方就能通过地址找到它。',
    },
    {
      type: 'exposition',
      text: '场景 2：**大块数据**\n如果你的数据很大（比如一个包含 10000 个元素的数组），\n每次"复制"一份传给函数会非常慢。\n但只传一个**地址**（只有几个字节）就快多了。',
    },
    {
      type: 'multiple-choice',
      question: '为什么通过地址传递大数据比复制数据快？',
      options: [
        { text: '地址比数据本身占的空间小', correct: true, explanation: '地址只有几个字节，而大数据可能有几千字节' },
        { text: '地址传递不用内存', correct: false, explanation: '也要用内存，只是用量少' },
        { text: '复制数据会让程序崩溃', correct: false, explanation: '复制是安全的，只是慢' },
        { text: '地址传递不会改变原数据', correct: false, explanation: '通过地址也能修改原数据' },
      ],
    },
    {
      type: 'exposition',
      text: '把内存想象成**快递柜**：',
    },
    {
      type: 'exposition',
      text: '- 每个柜子有一个编号（地址）\n- 你放东西进去（存值）\n- 你记住编号就能找到它\n- 你可以把编号告诉朋友，朋友也能找到',
    },
    {
      type: 'exposition',
      text: '在 C++ 里，"编号"就是**地址**，\n而"存地址的变量"叫做**指针**——这就是接下来几课要学的。',
      textAnimation: 'typewriter',
    },
    {
      type: 'type-it',
      instruction: '先回顾一下数组——元素地址是连续的，敲一下看看：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int arr[3] = {10, 20, 30};\n  cout << arr[0] << " " << arr[1] << " " << arr[2] << endl;\n}',
      hints: ['数组元素 `arr[0]`、`arr[1]`、`arr[2]` 在内存中地址连续', '`cout << arr[0]` 输出第一个元素的值', '分号 `;` 别忘了'],
    },
    {
      type: 'exposition',
      text: '下一课：用 `&` 运算符拿到变量的地址，亲眼看看它长什么样。',
    },
  ],
}

export default lesson
