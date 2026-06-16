import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'infinite-loop',
    chapter: 4,
    title: '死循环——最恐怖的 bug',
    subtitle: '认识死循环',
    description: '理解死循环的产生原因、避免方法和中断方式。',
    objectives: ['能识别死循环', '知道如何避免和中断死循环'],
    estimatedMinutes: 9,
  },
  blocks: [
    {
      type: 'exposition',
      text: '死循环（infinite loop）——程序**永远停不下来**。\n这是初学者最容易犯的错误之一，也是运行时的噩梦。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '死循环是怎么发生的？\n**条件永远为 true，所以循环永远不退出。**',
      code: 'int i = 1;\nwhile (i <= 5) {\n  cout << i << " ";\n  // 忘记写 i++！i 永远是 1\n}  // → 一直输出 1 1 1 1 1……',
    },
    {
      type: 'exposition',
      text: '看看上面——忘记写 `i++`，i 永远是 1，`i <= 5` 永远成立。\n程序就会疯狂输出永远不停。',
    },
    {
      type: 'concept-cards',
      instruction: '死循环的三类成因：',
      cards: [
        { glyph: '🚫', term: '忘记更新', meaning: '没写 i++ 或 i = i - 1', example: 'while (i < 5) { cout << i; }' },
        { glyph: '🎯', term: '条件写反', meaning: '条件永远成立，如 i >= 0', example: 'int i=0; while (i>=0) { i++; }' },
        { glyph: '⭕', term: '逻辑错误', meaning: '条件从不变为 false', example: 'while (x != 0) 但 x 永远不是 0' },
      ],
    },
    {
      type: 'type-it',
      instruction: '敲一个"死循环"体验一下——注意观察运行后怎么停止：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int i = 1;\n  while (i <= 5) {\n    cout << "停不下来！\\n";\n  }\n}',
      hints: ['注意：循环体里没有 `i++`，i 永远是 1', '运行后程序会一直输出无法停止', '按 Ctrl+C 可以强制终止程序'],
    },
    {
      type: 'exposition',
      text: '**怎么中断死循环？**\n- Windows/Linux：按 `Ctrl + C`\n- 或者在终端关闭窗口\n- 浏览器里的编译器也会有"停止"按钮\n- 不用怕——程序停不下来但你随时可以强制停',
      textAnimation: 'typewriter',
    },
    {
      type: 'multiple-choice',
      question: '复习上一课：以下哪段代码的循环体**不会执行**？\n`int i = 0; while (i < 0) { cout << i; i++; }`',
      options: [
        { text: '不会执行，因为 i<0 一开始就是 false', correct: true, explanation: 'i=0，0<0 为 false，循环体被跳过' },
        { text: '执行一次输出 0', correct: false, explanation: 'i=0 不满足 i<0，所以一次都不执行' },
        { text: '变成死循环', correct: false, explanation: '条件一开始就是 false，不会进入循环' },
        { text: '编译错误', correct: false, explanation: '语法正确，可以编译通过' },
      ],
    },
    {
      type: 'exposition',
      text: '另一个经典死循环——条件永远成立：',
      code: 'int i = 1;\nwhile (i >= 0) {\n  cout << i << " ";\n  i++;  // i 越来越大，永远 >= 0\n}  // → 死循环！',
    },
    {
      type: 'type-it',
      instruction: '敲这个"往错误方向走"的循环——看看为什么它会死循环：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int i = 10;\n  while (i >= 1) {\n    cout << i << " ";\n    i++;  // 应该 i-- 才对！\n  }\n}',
      hints: ['`i++` 让 i 变得越来越大', 'i 从 10→11→12… 永远 >= 1', '正确的应该是 `i--` 让 i 变小'],
    },
    {
      type: 'multiple-choice',
      question: '以下哪个循环**不会**死循环？',
      options: [
        { text: 'while (true) { cout << "x"; }', correct: false, explanation: 'true 永远为 true，是故意的死循环' },
        { text: 'int i=0; while (i<10) { cout << i; }', correct: false, explanation: '缺少 i++，i 永远为 0，死循环' },
        { text: 'int i=5; while (i>0) { i--; }', correct: true, explanation: 'i 从 5 减到 0，条件变成 false，正常结束' },
        { text: 'while (1) { cout << "ok"; }', correct: false, explanation: '1 在 C++ 里等价于 true，也是死循环' },
      ],
    },
    {
      type: 'exposition',
      text: '**有时候死循环是有意写的**——游戏的主循环就是故意的：\n`while (true) { 读取玩家输入; 更新游戏; 渲染画面; }`\n这种叫**事件循环**，有专门的退出机制。',
    },
    {
      type: 'exposition',
      text: '但作为初学者，90% 的死循环都是 **bug**——\n最常见的：**忘记写更新语句**。',
    },
    {
      type: 'type-it',
      instruction: '敲一段**正确的**循环，不会死循环：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int i = 0;\n  while (i < 5) {\n    cout << "安全！\\n";\n    i++;\n  }\n}',
      hints: ['`i++` 是安全的关键——每次让 i 增大', 'i 从 0→1→2→3→4→5，i<5 变成 false', '输出 5 行 "安全！" 后正常结束'],
    },
    {
      type: 'multiple-choice',
      question: '回顾阶段 2：`int x = 5; while (x > 0) { x = x - 2; }` 循环执行几次？',
      options: [
        { text: '2 次', correct: false, explanation: 'x=5→3→1→-1，条件判断了 4 次，执行了 3 次' },
        { text: '3 次', correct: true, explanation: 'x=5(执行)→x=3(执行)→x=1(执行)→x=-1(条件为false停止)' },
        { text: '4 次', correct: false, explanation: 'x=1 时还满足 x>0，会再执行一次变成 -1' },
        { text: '5 次', correct: false, explanation: '每次减 2，不会经过所有 5 次' },
      ],
    },
    {
      type: 'exposition',
      text: '死循环的预防\n✅ 每次写完 while，检查循环体里**有没有改变条件中的变量**\n✅ 检查**条件的方向**——`>` 还是 `<`，方向对不对\n✅ 想想循环能不能正常结束——边界条件',
    },
    {
      type: 'code-runner',
      instruction: '运行这个正常循环对比一下，它不会死循环：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int i = 1;\n  while (i <= 5) {\n    cout << "第" << i << "次\\n";\n    i++;\n  }\n  cout << "循环正常结束";\n}',
      expectedOutput: '第1次\n第2次\n第3次\n第4次\n第5次\n循环正常结束',
      comparison: 'trimmed',
      editable: false,
    },
    {
      type: 'exposition',
      text: '**一句话：写 while 时问自己——条件里的变量变不变？能不能变成 false？**',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '下一课学 `for` 循环——它的设计天然帮你避免忘记写更新语句。',
    },
  ],
}

export default lesson
