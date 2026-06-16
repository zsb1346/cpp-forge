import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'string-index-size',
    chapter: 5,
    title: '长度和字符',
    subtitle: '.size() 和 [ ]',
    description: '学习用 .size() 获取字符串长度，用 [ ] 访问单个字符。',
    objectives: ['能用 .size() 获取字符串长度', '能用 [下标] 访问字符串中的字符'],
    estimatedMinutes: 8,
  },
  blocks: [
    {
      type: 'exposition',
      text: '字符串是一串字符排在一起。\n你可以问它"你有多长？"——用 `.size()`，也可以按位置取出某个字符——用 `[下标]`。',
    },
    {
      type: 'concept-cards',
      instruction: '认识两个新操作：',
      cards: [
        { glyph: '📏', term: '.size()', meaning: '返回字符串的字符个数', example: '"Hi".size() → 2' },
        { glyph: '🎯', term: '[下标]', meaning: '访问某个位置的字符，从 0 开始', example: 's[0] 是第一个字符' },
        { glyph: '🔢', term: '下标从 0 开始', meaning: '第一个字符是[0]，第二个是[1]……', example: 's[0] s[1] s[2]' },
      ],
    },
    {
      type: 'exposition',
      text: '下标从 0 开始计数，和数组一样：',
      code: 'std::string s = "C++";\n// 下标:  0 1 2\n// 字符:  C + +\nint len = s.size();  // len = 3',
    },
    {
      type: 'type-it',
      instruction: '用 .size() 获取字符串长度：',
      code: 'std::string s = "Hello";\nint len = s.size();',
      hints: [
        '.size() 是 string 的成员函数，用点号调用',
        '返回值是 int 类型，表示字符个数',
        '"Hello" 有 5 个字母，len 等于 5',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾：`std::string s = "AB" + "C";` 之后 s 的值是？',
      options: [
        { text: '"ABC"', correct: true, explanation: '+ 拼接字符串，"AB" + "C" 得到 "ABC"' },
        { text: '"AB+C"', correct: false, explanation: '+ 是运算符，不会把字符 + 拼进去' },
        { text: '"A B C"', correct: false, explanation: '拼接不会自动加空格' },
        { text: '会报错', correct: false, explanation: 'string 支持 + 拼接，不会报错' },
      ],
    },
    {
      type: 'exposition',
      text: '用 `[下标]` 可以**读取**字符串中某个位置的字符：',
      code: 'std::string name = "Alice";\nchar first = name[0];  // \'A\'\nchar third = name[2]; // \'i\'',
    },
    {
      type: 'type-it',
      instruction: '用下标访问字符串中的字符：',
      code: 'std::string s = "C++";\nchar c = s[1];',
      hints: [
        's[1] 是第二个字符，因为下标从 0 开始',
        'c 的值是 '+'，也就是第 2 个字符',
        '下标不能超过 size()-1，否则会越界',
      ],
    },
    {
      type: 'code-runner',
      instruction: '运行程序，看字符串长度和每个字符：',
      code: '#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n  string s = "Hi!";\n  cout << "长度: " << s.size() << endl;\n  cout << "第一个: " << s[0] << endl;\n  cout << "第二个: " << s[1] << endl;\n}',
      expectedOutput: '长度: 3\n第一个: H\n第二个: i',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'exposition',
      text: '注意：下标从 0 开始，所以最后一个字符的下标是 `size() - 1`。\n`.size()` 和 `[]` 是操作字符串最常用的两个工具。',
    },
  ],
}

export default lesson
