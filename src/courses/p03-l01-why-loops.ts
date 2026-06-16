import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'why-loops',
    chapter: 4,
    title: '为什么需要循环',
    subtitle: '告别复制粘贴',
    description: '感受重复写代码的痛苦，理解循环的价值。',
    objectives: ['能说出复制粘贴的痛点', '理解循环可以自动重复'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '假设你要在屏幕上输出"第 1 关"到"第 5 关"——\n最简单的方法是什么？`cout` 写五遍。',
    },
    {
      type: 'exposition',
      text: '不循环的写法：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  cout << "第1关\\n";\n  cout << "第2关\\n";\n  cout << "第3关\\n";\n  cout << "第4关\\n";\n  cout << "第5关\\n";\n}',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '5 行还行对吧？\n那如果要输出 **1 到 100** 呢？\n——你打算写 100 行 `cout`？',
    },
    {
      type: 'multiple-choice',
      question: '回顾阶段 2：`if (score >= 60)` 中，`>=` 是什么意思？',
      options: [
        { text: '赋值', correct: false, explanation: '= 才是赋值，>= 是比较运算符' },
        { text: '大于等于', correct: true, explanation: '>= 表示左边大于或等于右边' },
        { text: '箭头', correct: false, explanation: 'C++ 没有这样的箭头运算符' },
        { text: '输入符号', correct: false, explanation: '>> 才是输入符号' },
      ],
    },
    {
      type: 'exposition',
      text: '真的有人写过 100 行 `cout` 吗？\n——有的。而且改需求时要改 100 处，漏一个就出现 bug。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '复制粘贴 100 次的**三大问题**：\n1. **手累**——浪费时间\n2. **容易漏**——可能写到 50 就数乱了\n3. **难改**——想加个"关"字得改 100 处',
    },
    {
      type: 'exposition',
      text: '这时候你渴望一个东西：\n**"你帮我重复，我告诉你怎么做就行"**\n——这就是循环。',
      textAnimation: 'typewriter',
    },
    {
      type: 'concept-cards',
      instruction: '循环的核心概念：',
      cards: [
        { glyph: '🔄', term: '循环', meaning: '让一段代码自动重复执行', example: 'while / for' },
        { glyph: '⏹', term: '终止条件', meaning: '决定什么时候停止重复', example: 'i <= 100' },
        { glyph: '📦', term: '循环体', meaning: '被重复执行的代码块', example: '{ cout << i; }' },
        { glyph: '🏃', term: '迭代', meaning: '每次重复叫做一次迭代', example: '第 1 次、第 2 次' },
      ],
    },
    {
      type: 'type-it',
      instruction: '热身：先敲一条普通的输出语句：',
      code: 'cout << "Hello\\n";',
      hints: ['`<<` 是两个小于号，方向朝左', '字符串用英文双引号包起来', '`\\n` 是换行符，别忘了'],
    },
    {
      type: 'multiple-choice',
      question: '下面哪种情况**最适合**用循环？',
      options: [
        { text: '判断一个数是不是正数', correct: false, explanation: '判断一次用 if 就够了，不需要循环' },
        { text: '输出"你好"10 遍', correct: true, explanation: '重复 10 次输出正是循环最擅长的' },
        { text: '定义一个变量', correct: false, explanation: '声明变量一次就够，不需要重复' },
        { text: '交换两个数的值', correct: false, explanation: '交换一次就够了，不需要重复执行' },
      ],
    },
    {
      type: 'exposition',
      text: '等你学了 `while` 和 `for`，输出 1 到 100 就变成这样：',
      code: 'int i = 1;\nwhile (i <= 100) {\n  cout << "第" << i << "关\\n";\n  i++;\n}',
    },
    {
      type: 'exposition',
      text: '只用 4 行代码就完成了 100 次输出。\n这就是循环的威力——**你定规则，计算机照办**。',
    },
    {
      type: 'type-it',
      instruction: '再敲一条输出语句，为进入循环热身：',
      code: 'cout << "准备学习循环！\\n";',
      hints: ['分号 `;` 在语句末尾不能漏', '双引号必须是英文半角', '`\\n` 不要写成 `/n`'],
    },
    {
      type: 'multiple-choice',
      question: '回顾阶段 2：以下哪个代码能正确判断 `age` 是否大于 18？',
      options: [
        { text: 'if age > 18', correct: false, explanation: 'if 条件需要括号：if (age > 18)' },
        { text: 'if (age > 18)', correct: true, explanation: 'if 后面跟括号，括号里写条件表达式' },
        { text: 'if (age = 18)', correct: false, explanation: '= 是赋值，== 才是比较是否相等' },
        { text: 'if age = 18', correct: false, explanation: '缺少括号，且 = 是赋值不是比较' },
      ],
    },
    {
      type: 'type-it',
      instruction: '敲完整的 main 框架——之后的课会反复用到：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  cout << "循环来了\\n";\n}',
      hints: ['`#include <iostream>` 引入输入输出功能', '`using namespace std;` 让我们直接用 cout', '`int main()` 是程序入口，花括号里的代码会执行'],
    },
    {
      type: 'code-runner',
      instruction: '运行这个程序——它已经用 while 循环输出了 1 到 10。先感受一下"循环"的样子，不需要自己写：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int i = 1;\n  while (i <= 10) {\n    cout << i << endl;\n    i++;\n  }\n}',
      expectedOutput: '1\n2\n3\n4\n5\n6\n7\n8\n9\n10',
      comparison: 'trimmed',
      editable: false,
    },
    {
      type: 'exposition',
      text: '看到了吗？几行代码就输出了 10 个数字。\n下一课正式学习 `while` 循环怎么写。',
    },
    {
      type: 'exposition',
      text: '记住这节课的核心理念：\n**你不喜欢重复，所以让循环来干。**',
    },
  ],
}

export default lesson
