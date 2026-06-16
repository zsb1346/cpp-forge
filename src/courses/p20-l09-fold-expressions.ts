import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'fold-expressions',
    chapter: 21,
    title: '折叠表达式',
    subtitle: '(... + args)',
    description: '学习 C++17 折叠表达式的四种形式——简化参数包展开操作。',
    objectives: ['能写出四种折叠表达式的语法', '能区分一元和二元折叠', '能用折叠表达式简化递归展开'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '上节课我们看到变参模板的递归展开需要写两个函数。\nC++17 引入了**折叠表达式（Fold Expressions）**——\n一种更简洁的参数包展开方式。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '折叠表达式的核心语法：\n`( ... op args )`\n表示用操作符 `op` 把参数包 `args` 中的所有参数折叠起来。\n\n最经典的例子：`(... + args)` 计算所有参数的和。',
      code: 'template<typename... Args>\nauto sum(Args... args) {\n  return (... + args);  // args1 + args2 + args3 + ...\n}\n\ncout << sum(1, 2, 3, 4);  // 10\ncout << sum(1.5, 2.5);     // 4.0',
    },
    {
      type: 'exposition',
      text: '**折叠表达式的四种形式**：\n\n1. **一元右折叠**：`(args op ...)` → `arg1 op (arg2 op arg3)`\n2. **一元左折叠**：`(... op args)` → `(arg1 op arg2) op arg3`\n3. **二元右折叠**：`(args op ... op init)` → `arg1 op (arg2 op (arg3 op init))`\n4. **二元左折叠**：`(init op ... op args)` → `((init op arg1) op arg2) op arg3`',
      code: '// 一元左折叠（常用）\n (... + args)  →  ((a + b) + c) + d\n\n // 一元右折叠\n (args + ...)  →  a + (b + (c + d))\n\n // 对于 + 和 *，左右结果相同',
    },
    {
      type: 'type-it',
      instruction: '输入一个用折叠表达式实现求和函数的代码：',
      code: '#include <iostream>\nusing namespace std;\n\ntemplate<typename... Args>\nauto sum(Args... args) {\n  return (... + args);  // 左折叠\n}\n\nint main() {\n  cout << sum(1, 2, 3, 4, 5) << "\\n";\n}',
      hints: [
        '(... + args) 把所有参数加起来',
        '结果是 1+2+3+4+5 = 15',
        '适用于任何支持 + 操作符的类型',
      ],
    },
    {
      type: 'exposition',
      text: '**支持的操作符**：几乎所有二元操作符都可以用于折叠：\n`+` `-` `*` `/` `%` `^` `&` `|` `<<` `>>` `&&` `||` `,` `.` `==` `!=` `<` `>` 等。\n\n最常用的三个：\n- `(... + args)` — 求和\n- `(... && args)` — 全部为真\n- `(... || args)` — 至少一个为真',
    },
    {
      type: 'type-it',
      instruction: '输入一个用 && 折叠判断所有值都为 true 的例子：',
      code: '#include <iostream>\nusing namespace std;\n\ntemplate<typename... Args>\nbool allTrue(Args... args) {\n  return (... && args);\n}\n\nint main() {\n  cout << boolalpha;\n  cout << allTrue(true, true, true) << "\\n";\n  cout << allTrue(true, false, true) << "\\n";\n}',
      hints: [
        '(... && args) 依次做逻辑与',
        '所有参数为 true 才返回 true',
        'boolalpha 让输出显示 true/false',
      ],
    },
    {
      type: 'exposition',
      text: '**二元折叠——需要初始值**：\n有时你需要为折叠提供一个初始值（比如空包时）：\n\n`(args + ... + 0)` 等价于 `((a + b) + 0)`\n如果参数包为空，就返回 0。',
      code: 'template<typename... Args>\nauto sumWithDefault(Args... args) {\n  return (args + ... + 0);  // 空包时返回 0\n}\n\ncout << sumWithDefault() << "\\n";      // 0\n cout << sumWithDefault(1, 2, 3) << "\\n";  // 6',
    },
    {
      type: 'fill-in',
      prompt: '补全代码：用折叠表达式实现打印所有参数的函数',
      template: '#include <iostream>\nusing namespace std;\n\ntemplate<typename... Args>\nvoid printAll(Args... args) {\n  (____, ...);\n}\n\nint main() {\n  printAll(1, 2.5, "hello");\n}',
      answers: ['cout << args'],
      hints: ['使用逗号折叠', '每个参数调用 cout << args'],
    },
    {
      type: 'exposition',
      text: '**逗号折叠**是折叠表达式的一个特殊应用：\n`(cout << ... << args)` — 用 << 链式打印。\n但注意：`<<` 是左折叠，`(cout << ... << args)` 展开为 `(((cout << a) << b) << c)`。',
      code: 'template<typename... Args>\nvoid print(Args... args) {\n  (cout << ... << args) << "\\n";\n}\n\nprint(1, " ", 2.5, " ", "hello");  // 1 2.5 hello',
    },
    {
      type: 'multiple-choice',
      question: '折叠表达式 `(... && args)` 展开成什么？',
      options: [
        { text: 'a && b && c', correct: true, explanation: '一元左折叠，依次做 &&' },
        { text: 'a && (b && c)', correct: false, explanation: '这是右折叠 (args && ...)' },
        { text: 'a, b, c', correct: false, explanation: '这不是 && 折叠的结果' },
        { text: '(a && b) || c', correct: false, explanation: '折叠不会混合操作符' },
      ],
    },
    {
      type: 'exposition',
      text: '**折叠表达式的实际应用**：\n\n1. **类型安全的 printf**：`(cout << ... << args)`\n2. **调用多个函数**：`(f(args), ...)` — 对每个参数调用 f\n3. **检查所有元素**：`(... && pred(args))`\n4. **字符串拼接**：`(s + ... + args)`',
    },
    {
      type: 'fill-in',
      prompt: '补全代码：用折叠表达式检查所有参数是否大于 0',
      template: '#include <iostream>\nusing namespace std;\n\ntemplate<typename... Args>\nbool allPositive(Args... args) {\n  return (____);\n}\n\nint main() {\n  cout << boolalpha;\n  cout << allPositive(1, 2, 3) << " " << allPositive(1, -1, 3);\n}',
      answers: ['... && (args > 0)'],
      hints: ['每个参数都需要和 0 比较', '用 && 折叠确保全部满足条件'],
    },
    {
      type: 'multiple-choice',
      question: '如果参数包为空，`(... + args)` 会怎样？',
      options: [
        { text: '编译错误', correct: true, explanation: '一元折叠对空包不做处理，导致编译错误' },
        { text: '返回 0', correct: false, explanation: '只有二元折叠有初始值才会返回默认值' },
        { text: '返回空值', correct: false, explanation: '折叠表达式对空包的需求必须用二元折叠' },
        { text: '崩溃', correct: false, explanation: '这是编译期，不会运行期崩溃' },
      ],
    },
    {
      type: 'exposition',
      text: '**如何让空包也能工作**？用二元折叠提供初始值：\n\n- `(args + ... + 0)` — 空包返回 0\n- `(args && ... && true)` — 空包返回 true\n- `(cout << ... << args)` — 空包什么都不打印',
    },
    {
      type: 'exposition',
      text: '**左右折叠的区别**：\n对于满足结合律的操作符（`+`、`*`、`&&`、`||`），左右折叠结果相同。\n对于不满足结合律的（`-`、`/`），结果不同！\n\n`(... - args)` → `((1 - 2) - 3) - 4` = -8\n`(args - ...)` → `1 - (2 - (3 - 4))` = -2',
      code: 'template<typename... Args>\nauto leftSub(Args... args) { return (... - args); }  // ((1-2)-3) = -4\n\nauto rightSub(Args... args) { return (args - ...); }  // 1-(2-3) = 2',
    },
    {
      type: 'multiple-choice',
      question: '回顾：递归展开变参模板和折叠表达式的核心区别是什么？',
      options: [
        { text: '折叠表达式在编译期展开，递归在运行期', correct: false, explanation: '两者都是在编译期展开' },
        { text: '折叠表达式不需要递归终止函数', correct: true, explanation: '折叠表达式用操作符一次展开所有参数' },
        { text: '递归运行更快', correct: false, explanation: '性能取决于具体场景，两者展开后代码类似' },
        { text: '折叠表达式不能用于自定义类型', correct: false, explanation: '只要操作符可用，折叠表达式可以用于任何类型' },
      ],
    },
    {
      type: 'exposition',
      text: '总结：\n**折叠表达式 = 用操作符把参数包"折叠"成一个值**。\n- 一元折叠：`(op ... args)` 或 `(... op args)`\n- 二元折叠：`(args op ... init)` 或 `(init op ... op args)`\n- 空包需要二元折叠提供初始值\n- 注意结合律对非对称操作符的影响',
      textAnimation: 'typewriter',
    },
  ],
}

export default lesson
