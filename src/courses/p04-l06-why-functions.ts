import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'why-functions',
    chapter: 5,
    title: '为什么需要函数',
    subtitle: '告别代码重复',
    description: '感受没有函数时代码的重复问题，理解函数的价值。',
    objectives: ['能识别重复代码的问题', '理解函数可以避免重复'],
    estimatedMinutes: 9,
  },
  blocks: [
    {
      type: 'exposition',
      text: '想象你要在三个地方输出"欢迎来到 C++ 世界！"——\n如果没有函数，就得把这句话写三遍。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '没有函数的重复代码：',
      code: '#include <iostream>\nint main() {\n  std::cout << "欢迎来到C++世界！\\n";\n  std::cout << "开始学习吧\\n";\n  std::cout << "欢迎来到C++世界！\\n";\n  std::cout << "加油！\\n";\n  std::cout << "欢迎来到C++世界！\\n";\n}',
    },
    {
      type: 'exposition',
      text: '看到问题了吗？同一个输出写了三遍。\n如果我想改文案，要改三个地方——**容易漏、容易错、多了就乱**。',
    },
    {
      type: 'multiple-choice',
      question: '回顾：以下哪个循环结构会**先判断条件再执行**？',
      options: [
        { text: 'do-while', correct: false, explanation: 'do-while 是先执行一次再判断条件' },
        { text: 'while', correct: true, explanation: 'while 先判断条件，条件为 true 才执行循环体' },
        { text: 'for 循环', correct: false, explanation: 'for 也会先判断条件，但这里选最直接的' },
        { text: 'if 语句', correct: false, explanation: 'if 是条件判断，不是循环结构' },
      ],
    },
    {
      type: 'exposition',
      text: '有函数的做法：把重复的代码**包成一个函数**，想用的时候叫它的名字就行了。',
      code: 'void showWelcome() {\n  std::cout << "欢迎来到C++世界！\\n";\n}\n\nint main() {\n  showWelcome();  // 调用\n  std::cout << "开始学习吧\\n";\n  showWelcome();  // 又调用\n  std::cout << "加油！\\n";\n  showWelcome();  // 再调用\n}',
    },
    {
      type: 'exposition',
      text: '函数的好处：\n1. **避免重复**——代码只写一次\n2. **方便修改**——改一处全部生效\n3. **把代码分组**——功能更清晰',
    },
    {
      type: 'multiple-choice',
      question: '函数最大的好处是什么？',
      options: [
        { text: '让程序变短', correct: false, explanation: '变短是结果，但核心好处是避免重复和方便维护' },
        { text: '避免重复写同一段代码', correct: true, explanation: '函数把重复代码包起来，需要时直接调用名字即可' },
        { text: '让程序运行更快', correct: false, explanation: '函数不会让程序变快，主要好处是代码组织' },
        { text: '让变量名更好取', correct: false, explanation: '函数不影响变量命名' },
      ],
    },
    {
      type: 'type-it',
      instruction: '输入一个简单的函数定义和调用：',
      code: '#include <iostream>\n\nvoid sayHello() {\n  std::cout << "你好\\n";\n}\n\nint main() {\n  sayHello();\n  sayHello();\n}',
      hints: [
        '函数定义写在 main 外面',
        '调用函数时写函数名加括号',
        'sayHello() 被调用了两次，输出两行',
      ],
    },
    {
      type: 'code-runner',
      instruction: '运行程序，观察函数如何避免重复输出：',
      code: '#include <iostream>\nusing namespace std;\n\nvoid show() {\n  cout << "C++\\n";\n}\n\nint main() {\n  show();\n  cout << "真好玩\\n";\n  show();\n}',
      expectedOutput: 'C++\n真好玩\nC++',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'exposition',
      text: '下一课我们正式学习**怎么定义函数**。\n你现在先记住：函数就是**给一段代码取个名字，反复使用**。',
    },
  ],
}

export default lesson
