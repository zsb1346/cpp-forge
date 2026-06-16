import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'string-init',
    chapter: 5,
    title: '字符串',
    subtitle: '字符类型入门',
    description: '学会用 string 类型存储文字信息。',
    objectives: ['能用 string 声明字符串变量', '能给字符串变量赋值'],
    estimatedMinutes: 8,
  },
  blocks: [
    {
      type: 'exposition',
      text: '之前我们学的是 `int`、`double` 这些存"数字"的类型。\n那如果要存一段**文字**呢？比如"你的名字"——就需要 `string` 类型。',
    },
    {
      type: 'exposition',
      text: '用 `string` 之前要先告诉编译器："我要用 string 了"——加一行 `#include <string>`。',
      code: '#include <iostream>\n#include <string>\n\nint main() {\n  std::string name = "Alice";\n  std::cout << name;\n}',
    },
    {
      type: 'concept-cards',
      instruction: '认识 string 相关的几个部件：',
      cards: [
        { glyph: '📦', term: '#include <string>', meaning: '使用 string 前要引的头文件', example: '#include <string>' },
        { glyph: '🏷️', term: 'std::string', meaning: '字符串类型，存文字', example: 'std::string s;' },
        { glyph: '✏️', term: '"Alice"', meaning: '字符串字面量，用双引号括起来', example: '双引号不是单引号' },
      ],
    },
    {
      type: 'type-it',
      instruction: '声明一个 string 变量并赋值：',
      code: '#include <string>\nstd::string name = "C++";',
      hints: [
        '记得包含 <string> 头文件',
        '变量名后面跟 = 号',
        '字符串值要用双引号包起来',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾：下面哪个是合法的 int 变量声明？',
      options: [
        { text: 'int x = 5;', correct: true, explanation: '正确声明了一个 int 变量并赋值为 5' },
        { text: 'int 5 = x;', correct: false, explanation: '值不能放在变量名的位置' },
        { text: 'x int = 5;', correct: false, explanation: '类型 int 必须写在变量名前面' },
        { text: 'INT x = 5;', correct: false, explanation: 'C++ 关键字大小写敏感，int 不能写成 INT' },
      ],
    },
    {
      type: 'exposition',
      text: '`string` 和 `int` 的声明方式一样：**类型 + 变量名 + 可选初始值**。\n只是 string 存的是文字，int 存的是整数。',
    },
    {
      type: 'type-it',
      instruction: '声明一个 string 变量，先用 `#include <string>`：',
      code: '#include <iostream>\n#include <string>\n\nint main() {\n  std::string greeting = "你好";\n  std::cout << greeting;\n}',
      hints: [
        '#include <string> 要写在文件最上面',
        '字符串值要用双引号，不能用单引号',
        'cout 可以输出 string 变量',
      ],
    },
    {
      type: 'code-runner',
      instruction: '运行下面的程序，观察 string 变量的输出：',
      code: '#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n  string city = "Shanghai";\n  cout << city;\n}',
      expectedOutput: 'Shanghai',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'exposition',
      text: '你现在可以用 `string` 来存**名字、城市、任何文字**了。\n下一课我们学怎么把多个字符串拼在一起。',
    },
  ],
}

export default lesson
