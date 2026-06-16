import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'practice-scope',
    chapter: 5,
    title: '作用域练习',
    subtitle: '巩固 14-16',
    description: '综合练习作用域、局部/全局变量和嵌套作用域规则。',
    objectives: ['能正确判断变量的作用域', '能区分局部和全局变量'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'multiple-choice',
      question: '在函数外声明的变量叫？',
      options: [
        { text: '局部变量', correct: false, explanation: '局部变量声明在函数内部' },
        { text: '全局变量', correct: true, explanation: '函数外声明的变量叫全局变量，所有函数都能访问' },
        { text: '参数变量', correct: false, explanation: '参数是函数括号里的，不是函数外声明的' },
        { text: '临时变量', correct: false, explanation: '没有"临时变量"这个分类' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '内层作用域可以看到外层作用域的变量吗？',
      options: [
        { text: '可以，内层能访问外层变量', correct: true, explanation: '内层能看到外层，这是嵌套作用域的核心规则' },
        { text: '不可以，内外完全隔离', correct: false, explanation: '隔离只是单向的——外层看不到内层，但内层能看到外层' },
        { text: '只有在同名时才可以看到', correct: false, explanation: '嵌套访问和外层变量是否同名无关' },
        { text: '只能在 if 语句里看到', correct: false, explanation: '任何嵌套 {} 都遵循这个规则，不限于 if' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾：`for (int i = 0; i < 5; i++)` 中变量 i 的作用域是？',
      options: [
        { text: '整个程序', correct: false, explanation: 'i 只在 for 循环内有效' },
        { text: 'for 循环内部', correct: true, explanation: '在 for 循环中声明的 i，作用域仅限于这个循环' },
        { text: 'main 函数全部', correct: false, explanation: 'for 循环的变量 i 不属于 main 的整个作用域' },
        { text: '直到程序结束', correct: false, explanation: '循环结束后 i 就失效了' },
      ],
    },
    {
      type: 'type-it',
      instruction: '定义全局变量和局部变量，观察输出结果：',
      code: '#include <iostream>\n\nint g = 10;\n\nvoid show() {\n  int g = 20;\n  std::cout << g << "\\n";\n}\n\nint main() {\n  std::cout << g << "\\n";\n  show();\n}',
      hints: [
        '全局变量 g = 10',
        'show 函数内局部变量 g = 20，遮盖了全局的 g',
        'main 中的 g 是全局变量，输出 10',
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全代码：内层作用域访问外层变量',
      template: 'int main() {\n  int outer = 5;\n  {\n    // 声明内层变量 inner，值为 outer 的两倍\n    int ____ = ____ * 2;\n    cout << ____;\n  }\n}',
      answers: ['inner', 'outer', 'inner'],
      hints: ['第一个空：变量名', '第二个空：外层变量 outer', '第三个空：输出内层变量'],
    },
    {
      type: 'type-it',
      instruction: '看明白这个嵌套作用域的例子：',
      code: '#include <iostream>\n\nint main() {\n  int a = 1;\n  {\n    int b = 2;\n    {\n      int c = 3;\n      std::cout << a << b << c << "\\n";\n    }\n  }\n}',
      hints: [
        '最深层的 {} 可以访问 a、b、c',
        '中间的 {} 可以访问 a、b，但不能访问 c',
        '最外层的 {}（main）只能访问 a',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾：C++ 中字符串用什么符号括起来？',
      options: [
        { text: '单引号 \'\'', correct: false, explanation: '单引号是 char 字符，不是字符串' },
        { text: '双引号 ""', correct: true, explanation: '字符串字面量用双引号括起来' },
        { text: '尖括号 <>', correct: false, explanation: '尖括号用于头文件包含' },
        { text: '花括号 {}', correct: false, explanation: '花括号用于函数体或代码块' },
      ],
    },
    {
      type: 'code-runner',
      instruction: '运行程序，验证你的作用域理解：',
      code: '#include <iostream>\nusing namespace std;\n\nint x = 0;\n\nint main() {\n  int x = 5;\n  cout << "局部: " << x << endl;\n  {\n    x = 10;\n    cout << "修改局部: " << x << endl;\n  }\n  cout << "局部仍是: " << x << endl;\n}',
      expectedOutput: '局部: 5\n修改局部: 10\n局部仍是: 10',
      comparison: 'trimmed',
      editable: true,
    },
  ],
}

export default lesson
