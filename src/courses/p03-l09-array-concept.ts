import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'array-concept',
    chapter: 4,
    title: '数组是什么',
    subtitle: '一排同类型的格子',
    description: '理解数组的概念、声明方式和元素含义。',
    objectives: ['能声明一个数组', '理解元素和下标的概念'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '之前学的变量——一个变量存一个值。\n那如果要存全班 50 个人的成绩呢？声明 50 个变量？',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '**数组（array）就是"一排同类型的格子"**。\n一个数组就是一个有名字的容器，里面装了多个相同类型的值。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '声明一个数组：\n`int scores[5];`\n这表示"声明一个叫 scores 的数组，能存 5 个 int"。',
      code: 'int scores[5];  // 5 个 int 格子\n// 就像一排放了 5 个箱子，每个箱子装一个整数',
    },
    {
      type: 'concept-cards',
      instruction: '数组的核心概念：',
      cards: [
        { glyph: '🏗️', term: '声明', meaning: '类型 + 名字 + [数量]', example: 'int arr[10];' },
        { glyph: '📦', term: '元素', meaning: '数组里的每个值叫一个元素', example: 'arr[0]、arr[1]' },
        { glyph: '🔢', term: '下标（索引）', meaning: '位置编号，从 0 开始', example: 'arr[0] 是第一个' },
        { glyph: '📏', term: '长度', meaning: '数组能装多少个元素', example: 'int arr[5] → 长度 5' },
      ],
    },
    {
      type: 'type-it',
      instruction: '敲一个完整的数组声明 + 初始化：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int numbers[3] = {10, 20, 30};\n  cout << numbers[0];\n}',
      hints: ['`int numbers[3]` 声明了 3 个格子的数组', '`= {10, 20, 30}` 依次给格子赋值', '`numbers[0]` 访问第一个元素，输出 10'],
    },
    {
      type: 'multiple-choice',
      question: '复习上一课（循环）：下面代码输出什么？\n`for (int i=0; i<3; i++) { cout << i; }`',
      options: [
        { text: '123', correct: false, explanation: 'i 从 0 开始，不是 1' },
        { text: '012', correct: true, explanation: 'i=0→输出0→i=1→输出1→i=2→输出2→i=3→停止' },
        { text: '0123', correct: false, explanation: 'i=3 时条件 i<3 为 false，不输出' },
        { text: '021', correct: false, explanation: 'i 从 0 开始递增的顺序输出' },
      ],
    },
    {
      type: 'exposition',
      text: '数组在内存里是**连续排列**的：\n`scores[0]` 紧挨着 `scores[1]`，就像宿舍的一排房间。\n\n`[ 10 | 20 | 30 | 40 | 50 ]`\n 0   1   2   3   4',
    },
    {
      type: 'concept-cards',
      instruction: '数组的两种声明方式：',
      cards: [
        { glyph: '📝', term: '先声明后赋值', meaning: '定义数组大小，再逐个赋值', example: 'int a[3]; a[0]=1; a[1]=2;' },
        { glyph: '🎯', term: '声明 + 初始化', meaning: '定义时直接给所有元素', example: 'int a[3] = {1, 2, 3};' },
      ],
    },
    {
      type: 'type-it',
      instruction: '敲一个先声明再逐个赋值的数组：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int a[3];\n  a[0] = 100;\n  a[1] = 200;\n  a[2] = 300;\n  cout << a[0] << " " << a[2];\n}',
      hints: ['先声明 `int a[3]` 分配 3 个格子', '`a[0]` 是第一个，`a[2]` 是第三个', '输出：100 300'],
    },
    {
      type: 'multiple-choice',
      question: '`int arr[4] = {5, 10, 15, 20};` 中 `arr[2]` 的值是多少？',
      options: [
        { text: '10', correct: false, explanation: 'arr[0]=5, arr[1]=10, arr[2]=15' },
        { text: '15', correct: true, explanation: '下标从 0 开始，arr[2] 是第三个元素 15' },
        { text: '20', correct: false, explanation: 'arr[3] 才是 20' },
        { text: '5', correct: false, explanation: 'arr[0] 才是 5' },
      ],
    },
    {
      type: 'exposition',
      text: '数组类型不仅限于 int：\n- `double prices[5];` → 存 5 个小数\n- `char letters[3];` → 存 3 个字符\n- `string names[4];` → 存 4 个字符串',
    },
    {
      type: 'type-it',
      instruction: '敲一个 double 数组和 char 数组：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  double prices[3] = {1.99, 2.99, 3.99};\n  char letters[3] = {\'A\', \'B\', \'C\'};\n  cout << prices[1] << " " << letters[2];\n}',
      hints: ['double 数组存小数', 'char 元素用单引号', '输出：2.99 C'],
    },
    {
      type: 'multiple-choice',
      question: '回顾阶段 1：`int` 类型能存什么？',
      options: [
        { text: '整数和小数', correct: false, explanation: 'int 只能存整数，小数要用 double' },
        { text: '整数', correct: true, explanation: 'int 就是整型（integer），存整数' },
        { text: '字符', correct: false, explanation: '字符用 char 类型' },
        { text: '文字', correct: false, explanation: '文字用 string 类型' },
      ],
    },
    {
      type: 'exposition',
      text: '数组的重要**规则**：\n- 数组长度在声明时就固定了，不能变\n- `int arr[5]` → 5 个格子，下标 0~4\n- 下标从 **0** 开始，不是 1\n- 如果写 `arr[5]`（超出范围）→ **越界访问**，可能引发严重 bug',
    },
    {
      type: 'type-it',
      instruction: '最后一个练习——声明一个 string 数组存 4 个名字，输出第一个和最后一个：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  string names[4] = {"张三", "李四", "王五", "赵六"};\n  cout << names[0] << " " << names[3];\n}',
      hints: ['string 数组存字符串', '下标 0 是第一个，下标 3 是第四个', '输出：张三 赵六'],
    },
    {
      type: 'code-runner',
      instruction: '运行程序，观察数组的输出——注意下标从 0 开始：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int nums[5] = {10, 20, 30, 40, 50};\n  cout << "第一个：" << nums[0];\n  cout << " 第三个：" << nums[2];\n  cout << " 第五个：" << nums[4];\n}',
      expectedOutput: '第一个：10 第三个：30 第五个：50',
      comparison: 'trimmed',
      editable: false,
    },
    {
      type: 'exposition',
      text: '下一课：用下标（索引）访问和修改数组元素。',
    },
  ],
}

export default lesson
