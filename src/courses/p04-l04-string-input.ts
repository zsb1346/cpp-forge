import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'string-input',
    chapter: 5,
    title: '读入字符串',
    subtitle: 'cin 遇空格停',
    description: '学会用 getline 读入包含空格的整行字符串。',
    objectives: ['能用 cin>> 读入字符串', '能用 getline 读入整行字符串', '能区分 cin>> 和 getline 的差异'],
    estimatedMinutes: 9,
  },
  blocks: [
    {
      type: 'exposition',
      text: '用 `cin >>` 读入 string 时，**遇到空格就会停**——因为它把空格当作分隔符。',
    },
    {
      type: 'exposition',
      text: '比如输入 "Hello World"，`cin >> s` 只读到 "Hello"：',
      code: 'std::string s;\nstd::cin >> s;   // 输入: Hello World\n// s 只有 "Hello"，World 留在缓冲区',
    },
    {
      type: 'type-it',
      instruction: '用 cin 读入一个字符串并输出：',
      code: '#include <iostream>\n#include <string>\n\nint main() {\n  std::string s;\n  std::cin >> s;\n  std::cout << s;\n}',
      hints: [
        '先声明 string 变量，再用 cin >> 读取',
        'cin >> 遇到空格/换行就会停止读取',
        '输入 "Hello World" 只会输出 "Hello"',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾：`std::string s = "Hi";` 中 `.size()` 的返回值是多少？',
      options: [
        { text: '1', correct: false, explanation: '"Hi" 有两个字符，不是 1' },
        { text: '2', correct: true, explanation: '"Hi" 有两个字符，size() 返回 2' },
        { text: '3', correct: false, explanation: '字符串字面量不包括结尾的 \\0 在 size 中' },
        { text: '0', correct: false, explanation: '"Hi" 有两个字符，不是空字符串' },
      ],
    },
    {
      type: 'exposition',
      text: '那如果要读入**一整行**（包括空格）呢？用 `getline`：\n`getline(cin, 变量名)` —— 一直读到换行才停。',
      code: 'std::string line;\nstd::getline(std::cin, line);  // 读一整行',
      textAnimation: 'typewriter',
    },
    {
      type: 'type-it',
      instruction: '用 getline 读一整行：',
      code: '#include <iostream>\n#include <string>\n\nint main() {\n  std::string line;\n  std::getline(std::cin, line);\n  std::cout << line;\n}',
      hints: [
        'getline 的参数格式：getline(cin, 变量名)',
        '它会一直读到用户按回车为止',
        '输入 "Hello World" 会输出完整的 "Hello World"',
      ],
    },
    {
      type: 'multiple-choice',
      question: '输入 "C++ is fun"，用 cin>> 读入 string s，s 的值是？',
      options: [
        { text: '"C++ is fun"', correct: false, explanation: 'cin>> 遇到空格就停了，读不到完整的句子' },
        { text: '"C++"', correct: true, explanation: 'cin>> 读到第一个空格就停止，只读到 "C++"' },
        { text: '""', correct: false, explanation: 'cin>> 会跳过开头的空白，然后一直读到遇到空白，不会返回空' },
        { text: '"is"', correct: false, explanation: 'cin>> 从头开始读，不会跳过前面的内容' },
      ],
    },
    {
      type: 'code-runner',
      instruction: '用 getline 读入一整行字符串并输出：',
      code: '#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n  string line;\n  getline(cin, line);\n  cout << "你输入的是: " << line;\n}',
      expectedOutput: '你输入的是: Hello World',
      comparison: 'contains',
      editable: true,
    },
    {
      type: 'exposition',
      text: '记住选择：只要**可能包含空格**的文字，就用 `getline`；\n如果是单个单词，`cin >>` 更方便。',
    },
  ],
}

export default lesson
