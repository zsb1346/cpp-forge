import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'scope-nesting',
    chapter: 5,
    title: '嵌套作用域',
    subtitle: '内层能看到外层',
    description: '理解花括号可以嵌套，以及内外层变量的可见规则。',
    objectives: ['理解嵌套作用域的访问规则', '能区分内外层变量'],
    estimatedMinutes: 8,
  },
  blocks: [
    {
      type: 'exposition',
      text: '花括号可以**嵌套**——一个 {} 里面再套一个 {}。\n规则很简单：**内层能看到外层，外层看不到内层**。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '嵌套作用域示例：',
      code: 'int main() {\n  int a = 10;       // 外层变量\n  if (a > 0) {\n    int b = 20;     // 内层变量\n    std::cout << a;  // ✅ 内层能看到外层\n  }\n  std::cout << b;  // ❌ 外层看不到内层\n}',
    },
    {
      type: 'type-it',
      instruction: '尝试内层访问外层变量：',
      code: '#include <iostream>\n\nint main() {\n  int x = 100;\n  {\n    int y = 200;\n    std::cout << x << "\\n";\n    std::cout << y << "\\n";\n  }\n}',
      hints: [
        '内层 {} 可以访问外层声明的变量 x',
        '内层也可以访问自己的变量 y',
        '出了内层 } 之后，y 就失效了',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾：在函数内声明的变量叫____，在所有函数外声明的叫____。',
      options: [
        { text: '局部/全局', correct: true, explanation: '函数内是局部变量，函数外是全局变量' },
        { text: '全局/局部', correct: false, explanation: '顺序反了' },
        { text: '内部/外部', correct: false, explanation: '正确的术语是局部和全局' },
        { text: '自动/手动', correct: false, explanation: '这不是作用域分类的术语' },
      ],
    },
    {
      type: 'exposition',
      text: '内层和外层有**同名变量**时，内层的会"遮盖"外层的：',
      code: 'int main() {\n  int v = 1;\n  {\n    int v = 2;  // 内层的 v 遮盖了外层的 v\n    std::cout << v;  // 输出 2\n  }\n  std::cout << v;  // 输出 1（外层 v 没变）\n}',
    },
    {
      type: 'type-it',
      instruction: '观察内外层同名变量的行为：',
      code: '#include <iostream>\n\nint main() {\n  int n = 5;\n  {\n    int n = 10;\n    std::cout << "内层: " << n << "\\n";\n  }\n  std::cout << "外层: " << n << "\\n";\n}',
      hints: [
        '内层的 n 遮盖了外层的 n',
        '内层 } 之后外层 n 恢复',
        '两个 n 是不同变量，只是名字相同',
      ],
    },
    {
      type: 'multiple-choice',
      question: '嵌套作用域中，以下哪条规则是正确的？',
      options: [
        { text: '外层可以访问内层的变量', correct: false, explanation: '外层看不见内层，内层的变量在外面无效' },
        { text: '内层可以访问外层的变量', correct: true, explanation: '内层作用域可以访问外层中声明的变量' },
        { text: '内外层完全隔离，互不可见', correct: false, explanation: '内层可以看到外层，但外层看不到内层' },
        { text: '同名变量会报错', correct: false, explanation: '不同作用域可以有同名变量，内层会遮盖外层' },
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全代码：内层访问外层变量并计算',
      template: 'int main() {\n  int base = 10;\n  {\n    int ____ = base * 2;\n    cout << bonus;\n  }\n}',
      answers: ['bonus'],
      hints: ['声明一个 int 变量，名字自取', '用 base * 2 初始化它'],
    },
    {
      type: 'code-runner',
      instruction: '运行程序，观察嵌套作用域的行为：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int level = 1;\n  cout << "外层: " << level << endl;\n  {\n    int level = 2;\n    cout << "内层: " << level << endl;\n  }\n  cout << "外层: " << level << endl;\n}',
      expectedOutput: '外层: 1\n内层: 2\n外层: 1',
      comparison: 'trimmed',
      editable: true,
    },
  ],
}

export default lesson
