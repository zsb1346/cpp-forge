import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'array-index',
    chapter: 4,
    title: '用下标访问数组',
    subtitle: '位置从 0 开始',
    description: '学会用下标读写数组元素，理解从 0 编号的原因。',
    objectives: ['能用 [n] 访问和修改数组元素', '理解下标从 0 开始'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '数组的每个元素都有一个**编号**，叫做**下标**（index）或**索引**。\n通过 `数组名[下标]` 就能访问对应的元素。',
    },
    {
      type: 'exposition',
      text: '下标规则：\n1. 从 **0** 开始\n2. 最后一个元素的下标是 **长度 - 1**\n3. `arr[5]` 长度 5 的数组，下标范围 0~4',
      code: 'int arr[5] = {10, 20, 30, 40, 50};\n// 下标:  0   1   2   3   4\n// arr[0] = 10, arr[4] = 50',
      textAnimation: 'typewriter',
    },
    {
      type: 'concept-cards',
      instruction: '访问数组元素的方式：',
      cards: [
        { glyph: '👀', term: '读取元素', meaning: '用下标取值', example: 'int x = arr[2];' },
        { glyph: '✏️', term: '修改元素', meaning: '用下标赋值', example: 'arr[1] = 99;' },
        { glyph: '⚠️', term: '越界访问', meaning: '下标超出范围，危险！', example: 'arr[10] → bug' },
      ],
    },
    {
      type: 'type-it',
      instruction: '敲一段代码——声明数组并读取一个元素：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int scores[5] = {88, 92, 76, 85, 90};\n  cout << "第三个成绩：" << scores[2];\n}',
      hints: ['`scores[2]` 是第三个元素（下标 2）', '下标 0→88, 1→92, 2→76', '输出：第三个成绩：76'],
    },
    {
      type: 'multiple-choice',
      question: '复习上一课：`int arr[3] = {5, 10, 15};` 中 `arr[3]` 是什么？',
      options: [
        { text: '0', correct: false, explanation: 'arr[3] 超出范围了，不会自动给 0' },
        { text: '越界访问，可能读取到随机值或导致程序崩溃', correct: true, explanation: 'arr[3] 下标超出 0~2，是越界访问' },
        { text: '15', correct: false, explanation: '最后一个有效元素是 arr[2]=15' },
        { text: '编译错误', correct: false, explanation: 'C++ 编译不会检查下标越界，运行时才会出问题' },
      ],
    },
    {
      type: 'exposition',
      text: '修改数组元素——和给变量赋值完全一样：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int a[3] = {1, 2, 3};\n  a[1] = 999;  // 把第二个元素改为 999\n  cout << a[0] << " " << a[1] << " " << a[2];\n  // 输出：1 999 3\n}',
    },
    {
      type: 'type-it',
      instruction: '敲代码——修改数组元素：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int a[4] = {10, 20, 30, 40};\n  a[0] = 99;\n  a[3] = 88;\n  cout << a[0] << " " << a[3];\n}',
      hints: ['`a[0] = 99` 把第一个元素改成 99', '`a[3] = 88` 把第四个元素改成 88', '输出：99 88'],
    },
    {
      type: 'fill-in',
      prompt: '补全代码：把数组第三个元素改为 77：',
      template: 'int nums[5] = {1, 2, 3, 4, 5};\nnums[____] = 77;\ncout << nums[____];',
      answers: ['2', '2'],
      hints: ['第一空：第三个元素下标是 2', '第二空：输出刚才改的那个位置'],
    },
    {
      type: 'multiple-choice',
      question: '`int arr[4] = {0, 0, 0, 0}; arr[1] = 5; arr[3] = 8;` 后数组内容是什么？',
      options: [
        { text: '{5, 0, 0, 8}', correct: false, explanation: 'arr[1]=5 是第二个元素，不是第一个' },
        { text: '{0, 5, 0, 8}', correct: true, explanation: 'arr[0]=0 不变，arr[1]=5，arr[2]=0 不变，arr[3]=8' },
        { text: '{5, 8, 0, 0}', correct: false, explanation: 'arr[1] 是第二个元素，arr[3] 是第四个' },
        { text: '{0, 0, 5, 8}', correct: false, explanation: 'arr[1] 是第二个不是第三个' },
      ],
    },
    {
      type: 'exposition',
      text: '想象一排信箱：\n| 101 | 102 | 103 | 104 | 105 |\n信箱编号从 101 开始，但数组编号从 **0** 开始。\n\n**为什么从 0 开始？**\n因为"第一个元素距离数组起始位置偏移为 0"，这是计算机内存的工作方式。',
    },
    {
      type: 'type-it',
      instruction: '敲代码——用变量作为下标访问数组：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int arr[5] = {10, 20, 30, 40, 50};\n  int index = 2;\n  cout << arr[index];\n}',
      hints: ['`index` 是一个 int 变量，值为 2', '`arr[index]` 等价于 `arr[2]`', '输出：30'],
    },
    {
      type: 'exposition',
      text: '**下标可以是变量**——这是循环遍历数组的关键！\n`arr[i]` 中的 `i` 变化时就访问到不同元素。',
    },
    {
      type: 'fill-in',
      prompt: '补全代码：用变量 i 作为下标访问倒数第二个元素：',
      template: 'int arr[5] = {2, 4, 6, 8, 10};\nint i = ____;\ncout << arr[____];',
      answers: ['3', 'i'],
      hints: ['第一空：倒数第二个元素的下标是 3', '第二空：用变量 i 作为下标'],
    },
    {
      type: 'multiple-choice',
      question: '回顾阶段 2：`i++` 和 `++i` 的第一个效果是什么？',
      options: [
        { text: '让 i 减 1', correct: false, explanation: '++ 是自增运算符，让变量加 1' },
        { text: '让 i 加 1', correct: true, explanation: 'i++ 和 ++i 都让 i 增加 1，只是返回值顺序不同' },
        { text: '让 i 变成 0', correct: false, explanation: '++ 不会重置变量，只是加 1' },
        { text: '让 i 翻倍', correct: false, explanation: '++ 是自增 1，不是乘以 2' },
      ],
    },
    {
      type: 'type-it',
      instruction: '最后一个练习——数组读写混合：先写再读：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int data[3];\n  data[0] = 7;\n  data[1] = 8;\n  data[2] = data[0] + data[1];\n  cout << data[2];\n}',
      hints: ['`data[2] = data[0] + data[1]` 用前两个元素算第三个', 'data[2] = 7 + 8 = 15', '输出：15'],
    },
    {
      type: 'code-runner',
      instruction: '把 TODO 替换为：把第 2 个和第 4 个元素相加，结果存入最后一个元素：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int arr[5] = {3, 7, 2, 8, 0};\n  // TODO: arr[4] = arr[1] + arr[3];\n  arr[4] = arr[1] + arr[3];\n  cout << arr[4];\n}',
      expectedOutput: '15',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'exposition',
      text: '下一课：用 for 循环遍历数组——把下标变量 `i` 和数组 `arr[i]` 结合，一次性处理所有元素！',
    },
  ],
}

export default lesson
