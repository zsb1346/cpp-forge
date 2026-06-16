import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'function-overload',
    chapter: 6,
    title: '函数重载——同名不同参',
    subtitle: '名字相同参数不同',
    description: '学习 C++ 的函数重载机制，同名函数可以有不同的参数列表。',
    objectives: ['能定义重载函数', '能理解重载的匹配规则', '能区分重载函数'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '**同一个函数名，能不能有不同的版本？**\n比如"打印"——打印 int、打印 double、打印字符串……',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: 'C++ 说：**可以！** 这叫**函数重载**。\n只要参数列表不同，函数名可以相同。',
    },
    {
      type: 'exposition',
      text: '看这个例子：',
      code: '#include <iostream>\nusing namespace std;\n\nvoid print(int x) {\n  cout << "整数: " << x << endl;\n}\n\nvoid print(double x) {\n  cout << "小数: " << x << endl;\n}\n\nint main() {\n  print(5);     // 调 int 版本\n  print(3.14);  // 调 double 版本\n}',
    },
    {
      type: 'concept-cards',
      instruction: '函数重载的三个条件：',
      cards: [
        { glyph: '🔄', term: '相同函数名', meaning: '多个函数用同一个名字', example: 'print(int) / print(double)' },
        { glyph: '📋', term: '不同参数', meaning: '类型、个数、顺序不同', example: 'add(int,int) / add(int,int,int)' },
        { glyph: '🚫', term: '不依赖返回类型', meaning: '只有返回值不同不算重载', example: 'int f() / void f() // ❌' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '复习前一课：引用参数用 `int& x`，那 `const int& x` 表示什么？',
      options: [
        { text: 'x 是引用，且不能通过 x 修改原变量', correct: true, explanation: 'const 引用是只读的' },
        { text: 'x 是 const int 的引用，但能修改', correct: false, explanation: 'const 表示不能修改' },
        { text: 'x 是普通值传递', correct: false, explanation: '& 表示是引用传递' },
        { text: 'x 不能用于函数参数', correct: false, explanation: 'const 引用是常用且安全的做法' },
      ],
    },
    {
      type: 'exposition',
      text: '重载规则——**参数列表必须不同**：',
      code: '// ✅ 参数个数不同\nvoid f(int a);\nvoid f(int a, int b);\n\n// ✅ 参数类型不同\nvoid f(int a);\nvoid f(double a);\n\n// ✅ 参数顺序不同\nvoid f(int a, double b);\nvoid f(double a, int b);',
    },
    {
      type: 'exposition',
      text: '**不能仅靠返回类型区分重载**：',
      code: 'int getValue();     // ❌ 不能和下面共存\nvoid getValue();    // ❌ 仅返回类型不同',
    },
    {
      type: 'multiple-choice',
      question: '以下哪组函数不能构成重载？',
      options: [
        { text: '`void f(int)` 和 `void f(double)`', correct: false, explanation: '参数类型不同，可以重载' },
        { text: '`int f(int)` 和 `void f(int)`', correct: true, explanation: '仅返回类型不同，不能重载' },
        { text: '`void f(int)` 和 `void f(int, int)`', correct: false, explanation: '参数个数不同，可以重载' },
        { text: '`void f(int, double)` 和 `void f(double, int)`', correct: false, explanation: '参数顺序不同，可以重载' },
      ],
    },
    {
      type: 'exposition',
      text: '编译器怎么知道调用的是哪个版本？\n**根据实参的类型匹配**。',
      code: 'print(5);     // int → 匹配 void print(int)\nprint(3.14);  // double → 匹配 void print(double)\nprint(\"hi\");  // ❌ 没有匹配的版本',
    },
    {
      type: 'type-it',
      instruction: '敲这个重载示例——一个求和的函数，支持 int 和 double：',
      code: '#include <iostream>\nusing namespace std;\n\nint sum(int a, int b) {\n  return a + b;\n}\n\ndouble sum(double a, double b) {\n  return a + b;\n}\n\nint main() {\n  cout << sum(1, 2) << endl;\n  cout << sum(1.5, 2.5) << endl;\n}',
      hints: ['`sum(int, int)` 和 `sum(double, double)` 是重载', '第一次调用匹配 int 版本', '第二次调用匹配 double 版本'],
    },
    {
      type: 'exposition',
      text: '**注意重载解析规则**：编译器会找"最佳匹配"。',
      code: 'void f(int x);\nvoid f(double x);\n\nf(5);    // int → int 版本（精确匹配）\nf(5.0);  // double → double 版本（精确匹配）\nf(\'A\'); // char → int 版本（char 可提升为 int）',
    },
    {
      type: 'fill-in',
      prompt: '声明两个重载函数：一个返回两 int 最大值，一个返回两 double 最大值。',
      template: 'int ____(int a, int b) {\n  return (a > b) ? a : b;\n}\n\ndouble ____(double a, double b) {\n  return (a > b) ? a : b;\n}',
      answers: ['max', 'max'],
      hints: ['两个函数同名', '一个参数是 int，一个是 double', '函数名用英语 max'],
    },
    {
      type: 'exposition',
      text: '参数个数不同的重载：',
      code: 'void show(int a) {\n  cout << "一个参数: " << a << endl;\n}\n\nvoid show(int a, int b) {\n  cout << "两个参数: " << a << " " << b << endl;\n}',
    },
    {
      type: 'type-it',
      instruction: '敲多个重载版本——show 一个、两个、三个参数：',
      code: '#include <iostream>\nusing namespace std;\n\nvoid show(int a) {\n  cout << "一个数: " << a << endl;\n}\n\nvoid show(int a, int b) {\n  cout << "两个数: " << a << " " << b << endl;\n}\n\nint main() {\n  show(10);\n  show(10, 20);\n}',
      hints: ['两个 show 函数同名但参数个数不同', '`show(10)` 调一个参数的', '`show(10, 20)` 调两个参数的'],
    },
    {
      type: 'exposition',
      text: '**重载让代码更自然**——\n你不需要记住 `print_int`、`print_double`、`print_string` 之类的名字。',
    },
    {
      type: 'multiple-choice',
      question: '回忆阶段 3：`for (int i = 0; i < 5; i++)` 中，循环体执行几次？',
      options: [
        { text: '4 次', correct: false, explanation: 'i 从 0 到 4，共 5 次' },
        { text: '5 次', correct: true, explanation: 'i=0,1,2,3,4 各一次，共 5 次' },
        { text: '6 次', correct: false, explanation: 'i=5 时条件 i<5 为 false，停止' },
        { text: '无限次', correct: false, explanation: 'i 递增，最终会到 5 退出' },
      ],
    },
    {
      type: 'type-it',
      instruction: '敲这段——不同类型的重载：print 一个数或一个数组：',
      code: '#include <iostream>\nusing namespace std;\n\nvoid print(int x) {\n  cout << "整数: " << x << endl;\n}\n\nvoid print(int arr[], int size) {\n  cout << "数组: ";\n  for (int i = 0; i < size; i++) {\n    cout << arr[i] << " ";\n  }\n  cout << endl;\n}\n\nint main() {\n  print(42);\n  int nums[3] = {1, 2, 3};\n  print(nums, 3);\n}',
      hints: ['两个函数同名 print 但参数不同', '第一个 print 接收 int', '第二个 print 接收数组和大小'],
    },
    {
      type: 'multiple-choice',
      question: '重载函数 `void f(int)` 和 `void f(double)`，调用 `f(5)` 会用哪个？',
      options: [
        { text: 'void f(int)', correct: true, explanation: '5 是 int，精确匹配 int 版本' },
        { text: 'void f(double)', correct: false, explanation: '5 不会自动转 double，有 int 版本优先' },
        { text: '编译错误', correct: false, explanation: '有两个匹配但 int 是最佳匹配' },
        { text: '随机选一个', correct: false, explanation: 'C++ 根据参数类型确定' },
      ],
    },
    {
      type: 'exposition',
      text: '下一课：**默认参数**——不传参时自动用默认值。',
    },
  ],
}

export default lesson
