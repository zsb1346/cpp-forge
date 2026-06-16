import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'practice-variadic',
    chapter: 21,
    title: '变参练习',
    subtitle: '巩固 08-09',
    description: '通过动手练习巩固变参模板和折叠表达式的使用。',
    objectives: ['能独立写出使用变参模板的函数', '能用折叠表达式简化代码', '能区分参数包和普通参数'],
    estimatedMinutes: 12,
  },
  blocks: [
    {
      type: 'type-it',
      instruction: '输入一个用变参模板加折叠表达式实现的任意参数相乘函数：',
      code: '#include <iostream>\nusing namespace std;\n\ntemplate<typename... Args>\nauto multiply(Args... args) {\n  return (... * args);\n}\n\nint main() {\n  cout << multiply(2, 3, 4) << "\\n";\n}',
      hints: [
        '用 * 操作符的折叠表达式',
        '2 * 3 * 4 = 24',
        '(... * args) 左折叠',
      ],
    },
    {
      type: 'type-it',
      instruction: '输入一个函数，用逗号折叠对每个参数执行同一操作：',
      code: '#include <iostream>\nusing namespace std;\n\ntemplate<typename... Args>\nvoid show(Args... args) {\n  (cout << ... << args) << "\\n";\n}\n\nint main() {\n  show(1, 2, 3);\n}',
      hints: [
        '(cout << ... << args) 依次打印每个参数',
        '注意 << 是左折叠',
        '最后 << "\\n" 换行',
      ],
    },
    {
      type: 'code-runner',
      instruction: '运行这个用变参模板实现的最小值函数，观察输出：',
      code: '#include <iostream>\nusing namespace std;\n\ntemplate<typename T>\nT min(T a, T b) {\n  return a < b ? a : b;\n}\n\ntemplate<typename T, typename... Args>\nT min(T first, Args... rest) {\n  return min(first, min(rest...));\n}\n\nint main() {\n  cout << min(5, 2, 8, 1, 9) << "\\n";\n}',
      expectedOutput: '1',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'type-it',
      instruction: '输入一个检查是否所有参数都不为 0 的函数：',
      code: '#include <iostream>\nusing namespace std;\n\ntemplate<typename... Args>\nbool noneZero(Args... args) {\n  return (... && (args != 0));\n}\n\nint main() {\n  cout << boolalpha;\n  cout << noneZero(1, 2, 3) << " " << noneZero(1, 0, 3) << "\\n";\n}',
      hints: [
        'args != 0 每个参数做判断',
        '... && ... 全部满足才为真',
        '1,0,3 中 0 会导致返回 false',
      ],
    },
    {
      type: 'multiple-choice',
      question: '以下哪个折叠表达式能正确计算参数数量？',
      options: [
        { text: '`(... + args)`', correct: false, explanation: '这会计算参数值的和，不是数量' },
        { text: '`(0 + ... + 1)` 的空包展开', correct: false, explanation: '这是错误语法' },
        { text: '无法直接计算参数数量，需要用 sizeof...', correct: true, explanation: 'sizeof...(args) 是专用的参数计数方式' },
        { text: '`sizeof...(args)`', correct: false, explanation: '不，这就是正确答案。它是编译期计算参数个数的方式' },
      ],
    },
    {
      type: 'type-it',
      instruction: '输入一个把任意参数拼接成字符串返回的 lambda（结合折叠和 string）：',
      code: '#include <iostream>\n#include <string>\nusing namespace std;\n\ntemplate<typename... Args>\nstring concat(Args... args) {\n  return (string(args) + ...);\n}\n\nint main() {\n  cout << concat("Hello", " ", "World") << "\\n";\n}',
      hints: [
        '每个参数先转成 string',
        '用 + 折叠拼接所有字符串',
        '注意参数必须能转 string',
      ],
    },
    {
      type: 'code-runner',
      instruction: '运行一个程序，验证折叠表达式左右折叠的区别：',
      code: '#include <iostream>\nusing namespace std;\n\ntemplate<typename... Args>\nauto leftFold(Args... args) {\n  return (... - args);\n}\n\ntemplate<typename... Args>\nauto rightFold(Args... args) {\n  return (args - ...);\n}\n\nint main() {\n  cout << "左折叠: " << leftFold(10, 1, 2) << "\\n";\n  cout << "右折叠: " << rightFold(10, 1, 2) << "\\n";\n}',
      expectedOutput: '左折叠: 7\n右折叠: 9',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'multiple-choice',
      question: '回顾阶段 08：变参模板中如何获取参数包中参数的类型？',
      options: [
        { text: '用 typeof(args)', correct: false, explanation: 'C++ 没有 typeof，C++11 用 decltype' },
        { text: '用 decltype(args)', correct: true, explanation: 'decltype 可以获取表达式类型' },
        { text: '用 typeid(args)', correct: false, explanation: 'typeid 获得 type_info，不是类型本身' },
        { text: '不能获取参数的类型', correct: false, explanation: '可以通过 decltype 获取参数类型' },
      ],
    },
    {
      type: 'type-it',
      instruction: '输入一个用折叠表达式对每个参数调用函数并收集结果的例子：',
      code: '#include <iostream>\nusing namespace std;\n\ntemplate<typename... Args>\nvoid callAll(Args... args) {\n  ([](const auto& v) {\n    cout << v << " -> " << v * 2 << "\\n";\n  }(args), ...);\n}\n\nint main() {\n  callAll(1, 2, 3);\n}',
      hints: [
        '对每一个参数调用一个 lambda',
        'lambda 接受任意类型（auto）',
        '逗号折叠依次执行每个 lambda',
      ],
    },
    {
      type: 'multiple-choice',
      question: '以下哪个是变参模板**不能**做的事？',
      options: [
        { text: '接受任意数量和类型的参数', correct: false, explanation: '这正是变参模板能做的' },
        { text: '在运行时遍历参数包', correct: true, explanation: '参数包是编译期概念，不能在运行时遍历' },
        { text: '通过递归展开处理每个参数', correct: false, explanation: '递归展开是标准做法' },
        { text: '用折叠表达式简化操作', correct: false, explanation: 'C++17 支持折叠表达式' },
      ],
    },
    {
      type: 'type-it',
      instruction: '输入一个变参模板 + 折叠表达式实现的最简日志函数（带前缀）：',
      code: '#include <iostream>\nusing namespace std;\n\ntemplate<typename... Args>\nvoid log(const string& prefix, Args... args) {\n  cout << prefix << ": ";\n  (cout << ... << args) << "\\n";\n}\n\nint main() {\n  log("INFO", 1, " ", 2.5, " ", "hello");\n}',
      hints: [
        'prefix 是普通参数，不是包的一部分',
        '(cout << ... << args) 折叠打印参数包',
        '信息格式：前缀 + 内容',
      ],
    },
    {
      type: 'multiple-choice',
      question: '变参模板 + 完美转发写作 `Args&&... args` 时，`args...` 展开时应该用什么转发？',
      options: [
        { text: '`args...` 直接展开', correct: false, explanation: '直接展开不保留值类别' },
        { text: '`std::forward<Args>(args)...`', correct: true, explanation: '完美转发每个参数保留左值/右值性质' },
        { text: '`std::move(args)...`', correct: false, explanation: 'move 会强制转右值，丢失左值信息' },
        { text: '`std::ref(args)...`', correct: false, explanation: 'ref 用于引用包装器，不是转发场景' },
      ],
    },
    {
      type: 'exposition',
      text: '练习完成！你巩固了变参模板和折叠表达式的核心用法。\n\n下一组课程进入**内存序（Memory Order）**——\n多线程编程中理解和控制指令重排的关键概念。',
      textAnimation: 'typewriter',
    },
  ],
}

export default lesson
