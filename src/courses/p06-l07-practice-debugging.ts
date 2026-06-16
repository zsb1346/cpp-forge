import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'practice-debugging',
    chapter: 7,
    title: '调试综合练习',
    subtitle: '巩固 01-06',
    description: '三段含有 bug 的代码，综合运用前面学到的调试知识来找出并修复问题。',
    objectives: [
      '能通过观察输出找出 bug',
      '能分析 bug 的可能原因',
      '能利用调试思维修复代码',
    ],
    estimatedMinutes: 12,
  },
  blocks: [
    {
      type: 'exposition',
      text: '前 6 课学了调试的基础知识和工具。\n这一课不学新内容——纯粹**练习**。\n三段有 bug 的代码，你来找出问题。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '我们学了什么？\n- 调试 = 观察运行时的内部状态\n- 读懂编译错误的三要素\n- 用 cout 打印变量值\n- 断点让程序暂停\n- Step Over 和 Step Into 的区别\n- 观察窗口看所有变量\n\n现在把这些都用上。',
    },
    {
      type: 'code-runner',
      instruction: '练习 1：这个程序应该输出 1 到 10 的和（55），但实际输出不对。运行看看：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int sum = 0;\n  for (int i = 1; i < 10; i++) {\n    sum += i;\n  }\n  cout << sum << "\\n";\n}',
      expectedOutput: '45',
      comparison: 'trimmed',
      editable: false,
    },
    {
      type: 'exposition',
      text: '程序输出 45，但 1 到 10 的和应该是 55。\n差了 10——少加了什么？\n\n用调试思维：循环条件 `i < 10` 让 i 只到 9，漏掉了 10。\n如果加个 cout 看最后的 i 值，就能发现 i 最大只到 9。',
    },
    {
      type: 'multiple-choice',
      question: '练习 1 的 bug 是什么？',
      options: [
        { text: '循环条件 `i < 10` 应该是 `i <= 10`', correct: true, explanation: 'i < 10 让 i 最大到 9，漏掉了 10。改成 i <= 10 就对了' },
        { text: 'sum 没有初始化', correct: false, explanation: 'sum = 0 已经初始化了，不是这个问题' },
        { text: 'for 循环语法写错了', correct: false, explanation: 'for 循环语法没问题，能正常编译和运行' },
        { text: 'i++ 应该改成 ++i', correct: false, explanation: 'i++ 和 ++i 在这个场景下效果一样，不影响结果' },
      ],
    },
    {
      type: 'exposition',
      text: '修复方法：把 `i < 10` 改成 `i <= 10`。\n或者把 `i = 1` 改成 `i = 0`，同时把条件改成 `i < 11`。\n关键是确保 10 这个值被加进去。',
    },
    {
      type: 'code-runner',
      instruction: '修复后的程序，验证输出是否 55：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int sum = 0;\n  for (int i = 1; i <= 10; i++) {\n    sum += i;\n  }\n  cout << sum << "\\n";\n}',
      expectedOutput: '55',
      comparison: 'trimmed',
      editable: false,
    },
    {
      type: 'exposition',
      text: '练习 2：这段代码用函数计算平均分。三个分数 80、90、100 的平均应该是 90，但结果不对。',
    },
    {
      type: 'code-runner',
      instruction: '运行这个程序，看看输出是多少。然后分析问题：',
      code: '#include <iostream>\nusing namespace std;\n\ndouble average(int a, int b, int c) {\n  double result = a + b + c / 3;\n  return result;\n}\n\nint main() {\n  double avg = average(80, 90, 100);\n  cout << avg << "\\n";\n}',
      expectedOutput: '203.333',
      comparison: 'trimmed',
      editable: false,
    },
    {
      type: 'exposition',
      text: '输出是 203.333，但预期应该是 90。\n问题出在哪？\n\n如果用调试思维——拆解表达式：\n`a + b + c / 3` 实际上是 `a + b + (c / 3)`，因为除法优先级高于加法。\n算一下：80 + 90 + (100 / 3) = 80 + 90 + 33.333 = 203.333。\n我们需要的是 `(a + b + c) / 3`。',
    },
    {
      type: 'multiple-choice',
      question: '练习 2 的 bug 是什么？',
      options: [
        { text: '函数名拼写错误', correct: false, explanation: 'average 拼写正确，调用也匹配' },
        { text: '平均值的计算公式少了括号', correct: true, explanation: '应该写成 (a + b + c) / 3，先加再除' },
        { text: '参数类型应该是 double 不是 int', correct: false, explanation: 'int 参数可以，函数内部已经用了 double result' },
        { text: '忘记 return 了', correct: false, explanation: '有 return result;，return 没问题' },
      ],
    },
    {
      type: 'exposition',
      text: '修复很简单——加括号：\n`double result = (a + b + c) / 3;`\n\n运算符优先级用括号控制是最安全的方法。\n自己觉得"应该先算这个"，就加括号明确告诉编译器。',
    },
    {
      type: 'code-runner',
      instruction: '修复后的程序，验证平均分是否正确：',
      code: '#include <iostream>\nusing namespace std;\n\ndouble average(int a, int b, int c) {\n  double result = (a + b + c) / 3;\n  return result;\n}\n\nint main() {\n  double avg = average(80, 90, 100);\n  cout << avg << "\\n";\n}',
      expectedOutput: '90',
      comparison: 'trimmed',
      editable: false,
    },
    {
      type: 'exposition',
      text: '练习 3：这段代码应该计算购物总价（商品单价 * 数量），但每次运行结果都不一样。',
    },
    {
      type: 'code-runner',
      instruction: '多次运行这个程序，观察输出的变化：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int price = 25;\n  int count = 4;\n  int total;\n  total = total + price * count;\n  cout << total << "\\n";\n}',
      expectedOutput: '100',
      comparison: 'trimmed',
      editable: false,
    },
    {
      type: 'exposition',
      text: '你可能发现每次运行的结果不一样！\n可能第一次是 100，第二次是 15784123，第三次是 -384721。\n\n因为 `int total;` 只声明了变量但没有初始化。\ntotal 的值是内存中残留的"垃圾值"。\n然后 `total = total + price * count` 是在垃圾值上加 100。',
    },
    {
      type: 'multiple-choice',
      question: '练习 3 的 bug 是什么？',
      options: [
        { text: 'total 变量没有被初始化为 0', correct: true, explanation: 'int total; 没有给初始值，total 是垃圾值。应该 int total = 0;' },
        { text: 'price * count 算错了', correct: false, explanation: '25 * 4 = 100，运算本身没问题' },
        { text: '忘记加括号了', correct: false, explanation: '* 优先级高于 +，不需要括号' },
        { text: '变量名 total 有歧义', correct: false, explanation: '变量名没问题，问题是没有初始化' },
      ],
    },
    {
      type: 'exposition',
      text: '修复方法：声明时直接初始化。\n`int total = 0;`\n\n这个 bug 最隐蔽之处在于——有时候恰好垃圾值是 0，程序偶尔输出正确的 100。\n所以"偶尔正确"本身就是 bug 的信号！\n如果调试时观察 total 的初始值就能发现。',
    },
    {
      type: 'code-runner',
      instruction: '修复后的程序，多次运行确认输出稳定为 100：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int price = 25;\n  int count = 4;\n  int total = 0;\n  total = total + price * count;\n  cout << total << "\\n";\n}',
      expectedOutput: '100',
      comparison: 'trimmed',
      editable: false,
    },
    {
      type: 'multiple-choice',
      question: '回顾阶段 06 全部内容：以下哪个是调试时最不应该做的事？',
      options: [
        { text: '在可疑位置设断点，单步执行观察变量', correct: false, explanation: '这是标准的调试操作，非常应该做' },
        { text: '看到变量值不对，就用 cout 打印更多信息', correct: false, explanation: '这是合理的调试方法，可以扩大排查范围' },
        { text: '不确定 bug 原因就随便改一行代码试试', correct: true, explanation: '盲目改代码是最危险的——可能修不好还引入新 bug。先观察再分析最后才改' },
        { text: '先复现问题，再开始调试', correct: false, explanation: '这是调试的正确第一步' },
      ],
    },
    {
      type: 'exposition',
      text: '**总结——调试心法**：\n\n1. 不要慌——bug 是正常的，专业程序员每天都在和 bug 打交道\n2. 先复现——不能稳定复现的 bug 最难修\n3. 先观察，再分析，最后才改\n4. 用工具——cout、断点、单步、观察窗口\n5. 改完一个地方，验证是否修好了',
    },
    {
      type: 'exposition',
      text: '本阶段结束了。\n\n你学会了一个最重要的技能——**调试思维**。\n后面写更复杂的程序（指针、类、动态内存）时，bug 只会更多。\n但有了调试这个武器，任何 bug 都不可怕：\n暂停 → 观察 → 分析 → 修复。',
      textAnimation: 'typewriter',
    },
  ],
}

export default lesson
