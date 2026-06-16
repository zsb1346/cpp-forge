import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'string-concat',
    chapter: 5,
    title: '拼接字符串',
    subtitle: '+ 不是加是拼',
    description: '理解 + 在字符串中表示拼接而不是加法。',
    objectives: ['能用 + 拼接多个字符串', '能区分数字加法与字符串拼接'],
    estimatedMinutes: 8,
  },
  blocks: [
    {
      type: 'exposition',
      text: '之前我们学 `int` 时，`+` 表示加法：`3 + 5` 结果是 8。\n但 string 不一样——`+` 对字符串来说意思是**拼接**。',
    },
    {
      type: 'exposition',
      text: '把两个字符串"粘"在一起：',
      code: 'std::string a = "C++";\nstd::string b = "真好玩";\nstd::string c = a + b;   // "C++真好玩"',
      textAnimation: 'typewriter',
    },
    {
      type: 'type-it',
      instruction: '试试拼接两个字符串：',
      code: 'std::string a = "Hello";\nstd::string b = "World";\nstd::string c = a + b;',
      hints: [
        'a + b 就是把 a 和 b 的字符连起来',
        'c 的结果是 "HelloWorld"，中间没有空格',
        '如果需要空格，可以写成 a + " " + b',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾：声明 string 变量需要包含哪个头文件？',
      options: [
        { text: '#include <iostream>', correct: false, explanation: 'iostream 管的是输入输出，不是 string' },
        { text: '#include <string>', correct: true, explanation: '<string> 头文件提供了 string 类型' },
        { text: '#include <cmath>', correct: false, explanation: 'cmath 是数学函数库' },
        { text: '#include <vector>', correct: false, explanation: 'vector 是另一种类型，不是 string' },
      ],
    },
    {
      type: 'exposition',
      text: '注意顺序：`"C" + "A"` 得到 `"CA"`，不是 `"AC"`。\n拼接就是**把第二个字符串接到第一个后面**。',
    },
    {
      type: 'type-it',
      instruction: '拼接三个字符串：',
      code: 'std::string s = "我" + "爱" + "C++";',
      hints: [
        '三个字符串用两个 + 连接',
        '结果是 "我爱C++"，注意没有空格',
        '可以加中间字符串来加空格：s = "我" + " " + "爱"',
      ],
    },
    {
      type: 'multiple-choice',
      question: '`std::string s = "1" + "2";` 之后，s 的值是什么？',
      options: [
        { text: '3', correct: false, explanation: 'string 的 + 不是数学加法，不会算成 3' },
        { text: '"12"', correct: true, explanation: '字符串拼接是把字符连起来，结果是 "12"' },
        { text: '"1+2"', correct: false, explanation: '不会把 + 符号加进去，而是执行拼接操作' },
        { text: '会报错', correct: false, explanation: 'string 可以用 + 拼接，不会报错' },
      ],
    },
    {
      type: 'code-runner',
      instruction: '运行程序，观察字符串拼接的结果：',
      code: '#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n  string a = "C++";\n  string b = "语言";\n  string c = a + b;\n  cout << c;\n}',
      expectedOutput: 'C++语言',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'exposition',
      text: '总结：`+` 对数字是加法，对 string 是拼接——**编译器会根据类型决定含义**。',
    },
  ],
}

export default lesson
