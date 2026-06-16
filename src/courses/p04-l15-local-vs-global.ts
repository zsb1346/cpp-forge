import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'local-vs-global',
    chapter: 5,
    title: '局部 vs 全局变量',
    subtitle: '函数内外有别',
    description: '区分函数内外的变量——局部变量和全局变量。',
    objectives: ['能区分局部变量和全局变量', '能声明和使用全局变量'],
    estimatedMinutes: 8,
  },
  blocks: [
    {
      type: 'exposition',
      text: '之前学的变量都声明在**函数内部**——这叫**局部变量**，只在那个函数里有效。\n如果你想让变量在**所有函数之间共享**，需要声明在函数外面——叫**全局变量**。',
    },
    {
      type: 'exposition',
      text: '全局变量声明在**所有函数之外**，从声明位置到文件末尾都有效：',
      code: '#include <iostream>\n\nint globalX = 100;  // 全局变量，在函数外面\n\nvoid show() {\n  std::cout << globalX;  // ✅ 可以访问\n}\n\nint main() {\n  std::cout << globalX;  // ✅ 也可以访问\n}',
    },
    {
      type: 'type-it',
      instruction: '声明并使用一个全局变量：',
      code: '#include <iostream>\n\nint score = 0;\n\nvoid addScore() {\n  score = score + 10;\n}\n\nint main() {\n  addScore();\n  std::cout << score;\n}',
      hints: [
        'score 声明在函数外面，是全局变量',
        'addScore 里修改了全局变量 score',
        'main 中也能看到修改后的值',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾：在函数内部声明的变量叫什么？',
      options: [
        { text: '全局变量', correct: false, explanation: '全局变量声明在函数外面' },
        { text: '局部变量', correct: true, explanation: '在函数内部声明的变量是局部变量' },
        { text: '参数变量', correct: false, explanation: '参数是函数括号里的，不是内部声明的' },
        { text: '静态变量', correct: false, explanation: '静态变量是另一种概念，用 static 关键字' },
      ],
    },
    {
      type: 'exposition',
      text: '对比看区别：\n- **局部变量**：在函数内声明，只在该函数内有效\n- **全局变量**：在函数外声明，所有函数都能访问和修改',
    },
    {
      type: 'type-it',
      instruction: '全局变量和局部变量同名时谁优先？',
      code: '#include <iostream>\n\nint x = 1;\n\nint main() {\n  int x = 2;\n  std::cout << x;\n}',
      hints: [
        '全局变量 x = 1',
        'main 内部又声明了局部变量 x = 2',
        '局部变量会覆盖全局变量，输出 2',
      ],
    },
    {
      type: 'multiple-choice',
      question: '全局变量声明在哪里？',
      options: [
        { text: '在 main 函数内部', correct: false, explanation: '在 main 内部声明的是局部变量' },
        { text: '在所有函数的外部', correct: true, explanation: '全局变量声明在函数外面，所有函数都能用' },
        { text: '在 #include 的上一行', correct: false, explanation: '#include 上面不能写代码' },
        { text: '在 cout 语句里', correct: false, explanation: 'cout 是输出语句，不能声明变量' },
      ],
    },
    {
      type: 'code-runner',
      instruction: '观察局部变量和全局变量的区别：',
      code: '#include <iostream>\nusing namespace std;\n\nint total = 0;\n\nvoid add(int n) {\n  total = total + n;\n}\n\nint main() {\n  add(5);\n  add(10);\n  cout << total;\n}',
      expectedOutput: '15',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'exposition',
      text: '全局变量很方便——但也要小心使用。\n太多全局变量会让代码难以管理，建议只在**真正需要共享**的时候用。',
    },
  ],
}

export default lesson
