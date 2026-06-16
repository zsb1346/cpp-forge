import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'function-call',
    chapter: 5,
    title: '函数调用',
    subtitle: '函数名()执行它',
    description: '学会调用函数——执行函数体中的代码。',
    objectives: ['能用函数名()调用函数', '理解调用时执行流程跳到函数体'],
    estimatedMinutes: 8,
  },
  blocks: [
    {
      type: 'exposition',
      text: '定义函数只是**准备**——告诉编译器"我有个函数叫这个名字"。\n真正执行它需要**调用**：写上函数名加括号。',
    },
    {
      type: 'exposition',
      text: '调用就是执行函数体里的代码：',
      code: 'void sayHi() {\n  std::cout << "你好";\n}\n\nint main() {\n  sayHi();   // ← 调用！执行 cout << "你好"\n  sayHi();   // ← 再调用一次\n}',
      textAnimation: 'typewriter',
    },
    {
      type: 'type-it',
      instruction: '定义并调用一个函数：',
      code: '#include <iostream>\n\nvoid show() {\n  std::cout << "调用成功！\\n";\n}\n\nint main() {\n  show();\n  show();\n}',
      hints: [
        'show() 调用会执行函数体中的 cout',
        '调用了两次，所以输出两行',
        '函数定义在 main 之前，main 中调用',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾：函数定义中哪个部分用于放置要执行的代码？',
      options: [
        { text: '圆括号 ()', correct: false, explanation: '() 用来放参数，不是放函数体的' },
        { text: '花括号 {}', correct: true, explanation: '{} 是函数体，放要执行的代码' },
        { text: '函数名', correct: false, explanation: '函数名只是名字，不存放代码' },
        { text: '返回值类型', correct: false, explanation: '返回值类型表示函数返回什么类型的值' },
      ],
    },
    {
      type: 'match-blocks',
      instruction: '按正确顺序拼出一个函数调用（main 函数内调用 show）：',
      fragments: ['show', '(', ')', ';'],
      distractors: ['void', 'int'],
    },
    {
      type: 'exposition',
      text: '调用函数时，程序会：\n1. **跳到**函数定义的地方\n2. **执行**函数体的全部代码\n3. **返回**到调用位置继续往下走',
    },
    {
      type: 'type-it',
      instruction: '多个函数定义和调用：',
      code: '#include <iostream>\n\nvoid part1() {\n  std::cout << "第一段\\n";\n}\nvoid part2() {\n  std::cout << "第二段\\n";\n}\n\nint main() {\n  part1();\n  part2();\n  part1();\n}',
      hints: [
        'part1 和 part2 是两个不同的函数',
        'main 中依次调用 part1、part2、part1',
        '输出顺序由调用顺序决定',
      ],
    },
    {
      type: 'code-runner',
      instruction: '调用一个函数多次，观察输出顺序：',
      code: '#include <iostream>\nusing namespace std;\n\nvoid showMsg() {\n  cout << "你好\\n";\n}\n\nint main() {\n  cout << "开始\\n";\n  showMsg();\n  cout << "中间\\n";\n  showMsg();\n  cout << "结束\\n";\n}',
      expectedOutput: '开始\n你好\n中间\n你好\n结束',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'exposition',
      text: '记住：**定义**是"教编译器这个函数怎么做"，**调用**是"让它现在做"。\n定义一次，可以调用任意多次。',
    },
  ],
}

export default lesson
