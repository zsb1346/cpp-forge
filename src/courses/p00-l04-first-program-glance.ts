import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'first-program-glance',
    chapter: 1,
    title: '看一眼完整程序',
    subtitle: 'C++ 程序长什么样',
    description: '看一个完整的 C++ 小程序，认识程序的基本框架，不要求写。',
    objectives: ['能认出 C++ 程序的基本框架', '能说出 main 函数的作用', '能区分代码中的不同部分'],
    estimatedMinutes: 8,
  },
  blocks: [
    {
      type: 'exposition',
      text: '前几课我们学了概念。今天来看一个**真正完整的 C++ 程序**长什么样。\n不用写，只用看。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '下面是一个完整的 C++ 程序：',
      code: `#include <iostream>
using namespace std;

int main() {
  cout << "Hello, C++!";
  return 0;
}`,
    },
    {
      type: 'concept-cards',
      instruction: '这个程序由四部分组成：',
      cards: [
        { glyph: '📥', term: '#include', meaning: '导入工具——告诉编译器要用什么功能', example: '#include <iostream>' },
        { glyph: '🏠', term: 'int main()', meaning: '程序的入口——从这里开始执行', example: 'int main() { ... }' },
        { glyph: '💬', term: 'cout <<', meaning: '输出——让程序说句话', example: 'cout << "Hello";' },
        { glyph: '🔚', term: 'return 0;', meaning: '结束——告诉系统"程序正常退出"', example: 'return 0;' },
      ],
    },
    {
      type: 'exposition',
      text: '解读这段代码：\n\n`#include <iostream>` → 导入"输入输出"工具\n`int main()` → 程序从这里开始跑\n`{ }` → 花括号包起来的都是 main 要做的事\n`cout << "Hello, C++!";` → 在屏幕上输出文字\n`return 0;` → 告诉系统"我正常结束了"',
    },
    {
      type: 'multiple-choice',
      question: '程序运行时，从哪个位置开始执行？',
      options: [
        { text: '第一行 #include', correct: false, explanation: '#include 只是导入工具，不是执行起点' },
        { text: 'int main() 里面的代码', correct: true, explanation: 'main 是程序的入口，所有程序都从 main 开始执行' },
        { text: '最后一行 return 0', correct: false, explanation: 'return 0 是结束，不是开始' },
        { text: 'cout 那一行', correct: false, explanation: 'cout 只是 main 里面的其中一条指令' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '花括号 `{}` 在这个程序中起什么作用？',
      options: [
        { text: '标注注释', correct: false, explanation: '注释用 // 或 /* */，不是花括号' },
        { text: '包裹 main 函数要执行的指令', correct: true, explanation: '花括号把属于 main 的指令包在一起' },
        { text: '表示字符串', correct: false, explanation: '字符串用双引号' },
        { text: '什么都没有', correct: false, explanation: '花括号非常重要，不能省略' },
      ],
    },
    {
      type: 'concept-cards',
      instruction: '回顾学过的符号，这次放在程序里看：',
      cards: [
        { glyph: '📦', term: '#include', meaning: '导入头文件' },
        { glyph: '🏠', term: 'main()', meaning: '程序入口函数' },
        { glyph: '📋', term: '{ }', meaning: '代码块，包裹一组指令' },
        { glyph: '💬', term: 'cout <<', meaning: '输出到屏幕' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '上节课学的分号 `;` 在这里出现在哪里？',
      options: [
        { text: 'cout 那一行的末尾', correct: true, explanation: '没错，每条语句末尾都有分号' },
        { text: '#include 后面', correct: false, explanation: '#include 后面没有分号' },
        { text: '花括号后面', correct: false, explanation: '花括号后面不加分号' },
        { text: '哪里都没有', correct: false, explanation: '有分号，在 cout << 和 return 0 行末' },
      ],
    },
  ],
}

export default lesson
