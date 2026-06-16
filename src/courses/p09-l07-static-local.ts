import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'static-local',
    chapter: 10,
    title: 'static 局部变量',
    subtitle: '退出函数不销毁',
    description: '学习 static 局部变量——在函数内声明，但退出函数后值不消失，下次调用时继续存在。',
    objectives: ['能用 static 声明持久局部变量', '理解 static 局部变量的生命周期'],
    estimatedMinutes: 8,
  },
  blocks: [
    {
      type: 'exposition',
      text: '普通的局部变量：函数调用时创建，函数返回时销毁。\n下次再调这个函数，变量又重新创建——之前的值不在了。',
      code: 'void count() {\n  int c = 0;\n  c++;\n  cout << c;  // 每次都输出 1\n}',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '加上 `static` 后：变量在第一次调用时创建，之后**退出函数也不销毁**。\n下次调用时，它还是上次的值。',
      code: 'void count() {\n  static int c = 0;  // static 局部变量\n  c++;\n  cout << c;  // 依次输出 1, 2, 3...\n}',
    },
    {
      type: 'type-it',
      instruction: '声明一个 static 局部变量：',
      code: 'static int counter = 0;',
      hints: [
        'static 放在类型前面',
        '只在第一次调用时初始化',
        '之后每次调用都保留上次的值',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾 p04：函数调用时，局部变量是什么时候创建的？',
      options: [
        { text: '程序启动时', correct: false, explanation: '局部变量在函数被调用时创建' },
        { text: '函数被调用时', correct: true, explanation: '进入函数时创建局部变量' },
        { text: '编译时', correct: false, explanation: '编译时不会创建变量' },
        { text: '从未创建', correct: false, explanation: '局部变量会在栈上创建' },
      ],
    },
    {
      type: 'exposition',
      text: 'static 局部变量和普通局部变量的区别：\n- 普通局部变量：**每次调用都重新创建**\n- static 局部变量：**只创建一次，保留到程序结束**',
    },
    {
      type: 'concept-cards',
      instruction: '两种变量的生命周期：',
      cards: [
        { glyph: '⏱️', term: '普通局部变量', meaning: '函数返回即销毁', example: 'int c = 0;' },
        { glyph: '💾', term: 'static 局部变量', meaning: '函数返回后仍存在', example: 'static int c = 0;' },
      ],
    },
    {
      type: 'type-it',
      instruction: '写一个用 static 计数的函数：',
      code: 'void callCount() {\n  static int count = 0;\n  count++;\n  cout << "调用了 " << count << " 次" << endl;\n}',
      hints: [
        'count 在第一次调用时初始化为 0',
        '每次调用 count 加 1',
        '程序结束前 count 一直存在',
      ],
    },
    {
      type: 'exposition',
      text: '多次调用这个函数，每次输出的数字递增：\n- 第 1 次调用：输出 "调用了 1 次"\n- 第 2 次调用：输出 "调用了 2 次"\n- 第 3 次调用：输出 "调用了 3 次"',
    },
    {
      type: 'multiple-choice',
      question: 'static 局部变量在什么时候初始化？',
      options: [
        { text: '每次函数调用时', correct: false, explanation: 'static 变量只在第一次调用时初始化' },
        { text: '程序启动时', correct: false, explanation: 'static 局部变量在首次到达声明时初始化' },
        { text: '第一次调用到该声明时', correct: true, explanation: 'static 局部变量是懒初始化的' },
        { text: '从不初始化', correct: false, explanation: 'static 变量必须初始化' },
      ],
    },
    {
      type: 'exposition',
      text: 'static 局部变量的典型用途：\n- 函数调用计数器\n- 缓存计算结果（第一次算，后面直接取）\n- 生成唯一 ID（每次调用递增）',
    },
    {
      type: 'type-it',
      instruction: '用 static 生成唯一 ID：',
      code: 'int nextID() {\n  static int id = 0;\n  return id++;\n}',
      hints: [
        'id 初始为 0，每次调用返回并递增',
        '第一次返回 0，第二次返回 1，依此类推',
        '即使 nextID 被多次调用，id 始终在增长',
      ],
    },
    {
      type: 'multiple-choice',
      question: '以下代码输出什么？\n`void f() { static int x = 0; x++; cout << x; }`\n连续调用 f() 三次：',
      options: [
        { text: '111', correct: false, explanation: 'static 变量不会每次都重置' },
        { text: '123', correct: true, explanation: '第一次输出 1，第二次 2，第三次 3' },
        { text: '000', correct: false, explanation: 'static 变量会保留值' },
        { text: '编译错误', correct: false, explanation: '语法正确' },
      ],
    },
    {
      type: 'exposition',
      text: '注意：static 局部变量的初始化只执行一次。\n即使第二次调用时再次遇到 `static int x = 0;` 这一行，也不会再赋值。',
    },
    {
      type: 'fill-in',
      prompt: '补全函数：每次调用累加 total。',
      template: 'void add(int n) {\n  ____ ____ total = 0;\n  ____ += n;\n  cout << total;\n}',
      answers: ['static', 'int', 'total'],
      hints: ['第一空：让变量持久保存', '第二空：类型', '第三空：累加'],
    },
    {
      type: 'multiple-choice',
      question: '回顾 p04：什么是函数的作用域？',
      options: [
        { text: '变量存在的时间', correct: false, explanation: '生命周期是指存在时间' },
        { text: '变量能被访问的代码范围', correct: true, explanation: '作用域是变量可见的代码范围' },
        { text: '变量在内存中的位置', correct: false, explanation: '这不是作用域' },
        { text: '变量在文件中的行号', correct: false, explanation: '作用域和行号无关' },
      ],
    },
    {
      type: 'type-it',
      instruction: '用一个复杂一些的例子：',
      code: 'double average(double newVal) {\n  static double sum = 0;\n  static int count = 0;\n  sum += newVal;\n  count++;\n  return sum / count;\n}',
      hints: [
        'static double sum 保存总和',
        'static int count 保存次数',
        '每次调用传入新值，返回至今的平均值',
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全：用 static 局部变量保存调用次数。',
      template: 'void visit() {\n  ____ ____ count = 0;\n  ____++;\n  cout << count << " 次访问";\n}',
      answers: ['static', 'int', 'count'],
      hints: ['第一空：static 关键字', '第二空：类型', '第三空：变量名递增'],
    },
    {
      type: 'multiple-choice',
      question: '以下哪个说法正确描述了 static 局部变量的行为？',
      options: [
        { text: '每次调用都重新初始化为 0', correct: false, explanation: 'static 只初始化一次' },
        { text: '只在第一次调用时初始化，之后保留值', correct: true, explanation: 'static 局部变量的核心特性' },
        { text: '永远不会被初始化', correct: false, explanation: 'static 变量必须初始化' },
        { text: '在程序编译时就确定了值', correct: false, explanation: 'static 局部变量在第一次执行到声明时初始化' },
      ],
    },
    {
      type: 'type-it',
      instruction: '用 static 懒加载（缓存）一个值：',
      code: 'const string& getConfig() {\n  static string config = loadConfigFromFile();\n  return config;\n}',
      hints: [
        'loadConfigFromFile 只在第一次调用时执行',
        '之后的调用直接返回缓存的值',
        '这种模式叫 lazy initialization',
      ],
    },
    {
      type: 'exposition',
      text: '总结：`static` 在局部变量前的作用就是**让变量永生**（直到程序结束）。\n它既保留了局部变量的访问限制（只能在函数内用），又拥有了全局变量的持久性。',
      textAnimation: 'typewriter',
    },
  ],
}

export default lesson