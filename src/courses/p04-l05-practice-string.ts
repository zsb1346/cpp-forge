import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'practice-string',
    chapter: 5,
    title: '字符串练习',
    subtitle: '巩固 01-04',
    description: '综合练习字符串声明、拼接、索引和输入。',
    objectives: ['能熟练声明和使用 string 变量', '能综合运用字符串的各种操作'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'type-it',
      instruction: '声明一个 string 变量并输出：',
      code: '#include <iostream>\n#include <string>\n\nint main() {\n  std::string fruit = "苹果";\n  std::cout << fruit;\n}',
      hints: [
        '先包含 <string> 头文件',
        '字符串值用双引号括起来',
        'cout 可以直接输出 string 变量',
      ],
    },
    {
      type: 'code-runner',
      instruction: '将两个字符串拼接后输出：',
      code: '#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n  string a = "Hello";\n  string b = "World";\n  string c = a + " " + b;\n  cout << c;\n}',
      expectedOutput: 'Hello World',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'multiple-choice',
      question: '`std::string s = "ABCD";` 之后，`s[1]` 的值是什么？',
      options: [
        { text: "'A'", correct: false, explanation: 's[0] 才是 A，下标从 0 开始' },
        { text: "'B'", correct: true, explanation: 's[0]=A, s[1]=B, s[2]=C, s[3]=D' },
        { text: "'C'", correct: false, explanation: 's[2] 才是 C' },
        { text: "数字 1", correct: false, explanation: '下标是位置，s[1] 返回的是字符值，不是下标' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾：以下哪个是合法的变量名？',
      options: [
        { text: 'int 2x = 5;', correct: false, explanation: '变量名不能以数字开头' },
        { text: 'int my-age = 5;', correct: false, explanation: '变量名不能包含减号 -' },
        { text: 'int myAge = 5;', correct: true, explanation: 'myAge 是合法的变量名，驼峰命名' },
        { text: 'int int = 5;', correct: false, explanation: 'int 是关键字，不能做变量名' },
      ],
    },
    {
      type: 'type-it',
      instruction: '用 .size() 获取字符串长度：',
      code: 'std::string s = "C++编程";\nint len = s.size();',
      hints: [
        '.size() 返回字符串的字符个数',
        '注意中文字符在 C++ 中每个占多个字节，但 .size() 返回的是字节数',
        '纯英文字符串中 .size() 就是字母个数',
      ],
    },
    {
      type: 'type-it',
      instruction: '用 getline 读入一行并输出：',
      code: '#include <iostream>\n#include <string>\n\nint main() {\n  std::string s;\n  std::getline(std::cin, s);\n  std::cout << s;\n}',
      hints: [
        'getline 可以读入包含空格的一整行',
        '第一个参数是 cin，第二个参数是 string 变量',
        '按下回车键表示输入结束',
      ],
    },
    {
      type: 'code-runner',
      instruction: '读入两个字符串，拼接后输出：',
      code: '#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n  string a, b;\n  cin >> a >> b;\n  string c = a + b;\n  cout << c;\n}',
      expectedOutput: 'AB',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'multiple-choice',
      question: '回顾：以下关于 string 的说法，哪个是正确的？',
      options: [
        { text: 'string 用单引号赋值', correct: false, explanation: '单引号是 char 字符，string 要用双引号' },
        { text: 'string 的 + 是数学加法', correct: false, explanation: 'string 的 + 是拼接，不是加法' },
        { text: 'string 可以用 [] 访问单个字符', correct: true, explanation: '[] 下标运算符可以读取 string 中的字符' },
        { text: 'string 不需要头文件', correct: false, explanation: '使用 string 必须包含 <string> 头文件' },
      ],
    },
  ],
}

export default lesson
