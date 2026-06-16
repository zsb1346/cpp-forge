import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'loop-and-array',
    chapter: 4,
    title: '用循环遍历数组',
    subtitle: 'for + 数组 = 王炸',
    description: '用 for 循环从 0 到 N-1 遍历数组的每个元素。',
    objectives: ['能用 for 循环遍历数组', '能用循环实现求和、查找等操作'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '上一课学了 `arr[i]`——下标可以是变量。\n如果 `i` 从 0 变到 4，就能访问数组的**每一个元素**。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '**遍历数组**——标准写法：',
      code: 'int arr[5] = {10, 20, 30, 40, 50};\nfor (int i = 0; i < 5; i++) {\n  cout << arr[i] << " ";\n}\n// 输出：10 20 30 40 50',
    },
    {
      type: 'exposition',
      text: '关键模式：`for (int i = 0; i < 数组长度; i++)`\n`i` 从 0 到 长度-1，正好覆盖所有下标。',
    },
    {
      type: 'concept-cards',
      instruction: '遍历数组三要素：',
      cards: [
        { glyph: '🏁', term: '从 0 开始', meaning: '数组第一个元素下标是 0', example: 'int i = 0' },
        { glyph: '⏹', term: '到 N-1 结束', meaning: '条件用 i < 长度', example: 'i < 5' },
        { glyph: '📈', term: '每次加 1', meaning: '逐个访问每个元素', example: 'i++' },
      ],
    },
    {
      type: 'type-it',
      instruction: '敲一个完整的遍历——输出数组所有元素：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int arr[4] = {5, 10, 15, 20};\n  for (int i = 0; i < 4; i++) {\n    cout << arr[i] << " ";\n  }\n}',
      hints: ['`i < 4` 让 i 从 0 到 3', '`arr[i]` 依次访问每个元素', '输出：5 10 15 20'],
    },
    {
      type: 'multiple-choice',
      question: '复习上一课：`int a[6] = {1,2,3,4,5,6};` 中最后一个元素的下标是？',
      options: [
        { text: '6', correct: false, explanation: '下标从 0 开始，6 是长度不是有效下标' },
        { text: '5', correct: true, explanation: '长度为 6，下标 0~5，最后一个下标是 5' },
        { text: '4', correct: false, explanation: '长度为 6，下标范围是 0~5' },
        { text: '7', correct: false, explanation: '7 超出了数组范围' },
      ],
    },
    {
      type: 'exposition',
      text: '用循环**求和**：',
      code: 'int arr[5] = {10, 20, 30, 40, 50};\nint sum = 0;\nfor (int i = 0; i < 5; i++) {\n  sum = sum + arr[i];\n}\ncout << "总和：" << sum;  // 150',
    },
    {
      type: 'type-it',
      instruction: '敲一个完整程序——计算数组中所有元素的和：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int nums[6] = {3, 5, 7, 2, 8, 1};\n  int sum = 0;\n  for (int i = 0; i < 6; i++) {\n    sum = sum + nums[i];\n  }\n  cout << "和=" << sum;\n}',
      hints: ['`sum = sum + nums[i]` 累加每个元素', '循环结束后 sum 包含所有元素的和', '3+5+7+2+8+1=26'],
    },
    {
      type: 'fill-in',
      prompt: '补全代码，遍历数组并输出每个元素的平方：',
      template: 'int sq[4] = {1, 2, 3, 4};\nfor (int i = ____; i < 4; ____) {\n  cout << sq[i] * sq[i] << " ";\n}',
      answers: ['0', 'i++'],
      hints: ['第一空：从下标 0 开始', '第二空：每次加 1'],
    },
    {
      type: 'multiple-choice',
      question: '`int a[3] = {2, 4, 6};` 遍历求和的结果是？',
      options: [
        { text: '10', correct: false, explanation: '2+4+6=12，再算算' },
        { text: '12', correct: true, explanation: '2+4+6=12' },
        { text: '14', correct: false, explanation: '2+4+6=12，不是 14' },
        { text: '6', correct: false, explanation: '6 是最后一个元素，不是总和' },
      ],
    },
    {
      type: 'exposition',
      text: '用循环**找最大值**：',
      code: 'int arr[5] = {8, 3, 12, 5, 9};\nint max = arr[0];  // 假设第一个最大\nfor (int i = 1; i < 5; i++) {\n  if (arr[i] > max) {\n    max = arr[i];  // 发现更大的就更新\n  }\n}\ncout << "最大值：" << max;  // 12',
    },
    {
      type: 'type-it',
      instruction: '敲一个找最大值的程序：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int a[5] = {15, 8, 22, 13, 9};\n  int max = a[0];\n  for (int i = 1; i < 5; i++) {\n    if (a[i] > max) {\n      max = a[i];\n    }\n  }\n  cout << "最大值：" << max;\n}',
      hints: ['`int max = a[0]` 先假设第一个最大', '`if (a[i] > max) max = a[i]` 发现更大的就更新', '输出：最大值：22'],
    },
    {
      type: 'fill-in',
      prompt: '补全代码：遍历数组，输出所有偶数：',
      template: 'int arr[6] = {1, 2, 3, 4, 5, 6};\nfor (int i = 0; i < 6; i++) {\n  if (arr[i] % ____ == 0) {\n    cout << arr[____] << " ";\n  }\n}',
      answers: ['2', 'i'],
      hints: ['第一空：偶数能被 2 整除', '第二空：用 i 作为下标访问当前元素'],
    },
    {
      type: 'code-runner',
      instruction: '在 TODO 处补全代码：遍历数组，找出所有大于 15 的元素输出：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int arr[7] = {12, 25, 8, 30, 17, 6, 22};\n  for (int i = 0; i < 7; i++) {\n    // TODO: 如果 arr[i] > 15 就输出\n    if (arr[i] > 15) {\n      cout << arr[i] << " ";\n    }\n  }\n}',
      expectedOutput: '25 30 17 22',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'exposition',
      text: '循环遍历数组是最重要的编程模式之一。\n**总结：for 循环的 i 控制下标，arr[i] 访问元素。**',
    },
    {
      type: 'code-runner',
      instruction: '挑战：把数组中的每个元素都翻倍，然后输出所有元素：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int arr[4] = {3, 7, 2, 9};\n  for (int i = 0; i < 4; i++) {\n    arr[i] = arr[i] * 2;\n    cout << arr[i] << " ";\n  }\n}',
      expectedOutput: '6 14 4 18',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'multiple-choice',
      question: '回顾：以下哪段代码能正确输出数组 `arr` 的所有元素？',
      options: [
        { text: 'for (int i=1; i<=5; i++) { cout << arr[i]; }', correct: false, explanation: 'i 从 1 开始漏了 arr[0]，且 i<=5 可能越界' },
        { text: 'for (int i=0; i<5; i++) { cout << arr[i]; }', correct: true, explanation: 'i 从 0 到 4，正好覆盖所有 5 个元素' },
        { text: 'for (int i=0; i<=5; i++) { cout << arr[i]; }', correct: false, explanation: 'i=5 时 arr[5] 越界了' },
        { text: 'for (int i=5; i>0; i--) { cout << arr[i]; }', correct: false, explanation: '从 5 开始 arr[5] 越界，且漏了 arr[0]' },
      ],
    },
    {
      type: 'exposition',
      text: '下一课：循环与数组综合练习——用学过的所有知识解决实际问题。',
    },
  ],
}

export default lesson
