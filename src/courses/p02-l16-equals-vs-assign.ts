import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'equals-vs-assign',
    chapter: 3,
    title: '等于与赋值',
    subtitle: '== 和 = 不一样',
    description: '区分 ==（比较相等）和 =（赋值），避免最常见的 C++ 新手错误。',
    objectives: ['能清晰区分 = 和 == 的用途', '知道 if (x = 5) 不会报错但逻辑不对'],
    estimatedMinutes: 8,
  },
  blocks: [
    {
      type: 'exposition',
      text: '这是 C++ 新手**最容易犯的错误**——把 `=`（赋值）当成 `==`（比较）用。\n这个错误不会报错，但会让程序逻辑全乱。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '**`=` 是赋值**：把右边的值存进左边的变量。\n**`==` 是比较**：判断两边是否相等，结果是 true/false。',
      code: 'int x = 5;        // 赋值：x 变成 5\nbool r = (x == 5); // 比较：x 等于 5 吗？→ true',
    },
    {
      type: 'exposition',
      text: '危险的情况：`if (x = 5)` 不会报错！\n\n`x = 5` 是赋值——它会把 5 赋给 x，然后赋值表达式本身的值就是 5。\n而**非零值在条件里视为 true**，所以永远成立！',
      code: 'int x = 0;\nif (x = 5) {  // 不是 ==，是赋值！\n  // 这里永远会执行，因为 x=5 的值是 5，转为 true\n}',
    },
    {
      type: 'multiple-choice',
      question: '回顾：if-else 语句的特点是什么？',
      options: [
        { text: 'if 和 else 都会执行', correct: false, explanation: '只能执行一个分支' },
        { text: '条件成立走 if，不成立走 else', correct: true, explanation: '二选一，互斥' },
        { text: 'else 可以单独使用', correct: false, explanation: 'else 必须跟在 if 后面' },
        { text: 'if 和 else 的顺序可以互换', correct: false, explanation: '必须先 if 再 else' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '`int a = 3; if (a = 5) { }` 这个代码有什么问题？',
      options: [
        { text: '会报语法错误', correct: false, explanation: '语法上没问题，= 是合法的' },
        { text: '永远会进入 if 里面', correct: true, explanation: 'a=5 把 5 赋给 a，值为 5（非零→true）' },
        { text: '永远不进 if', correct: false, explanation: '赋值的结果是 5，是 true' },
        { text: 'a 变成 3', correct: false, explanation: 'a 被赋值为 5，不是 3' },
      ],
    },
    {
      type: 'type-it',
      instruction: '正确使用 == 比较：',
      code: 'int x = 10;\nif (x == 10) {\n  std::cout << "相等";\n}',
      hints: [
        '用 `==` 两个等号来比较',
        'x == 10 为 true',
        '这里千万不能写成 `=`',
      ],
    },
    {
      type: 'type-it',
      instruction: '演示赋值和比较的不同：',
      code: 'int a = 5;\nint b = 5;\nbool same = (a == b);',
      hints: [
        '第一行 `a = 5` 是赋值',
        '第三行 `a == b` 是比较',
        'same 的值是 true',
      ],
    },
    {
      type: 'multiple-choice',
      question: '如何检查变量 x 是否等于 3？',
      options: [
        { text: 'if (x = 3)', correct: false, explanation: '这是把 3 赋给 x，不是比较' },
        { text: 'if (x == 3)', correct: true, explanation: '== 才是比较是否相等' },
        { text: 'if (x != 3)', correct: false, explanation: '这是"不等于"的判断' },
        { text: 'if (x === 3)', correct: false, explanation: 'C++ 没有三个等号' },
      ],
    },
    {
      type: 'exposition',
      text: '记住这个口诀：\n**赋值一个等号，比较两个等号。**\n在 if 条件里看到 `=` 就要警惕。',
    },
  ],
}

export default lesson
