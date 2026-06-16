import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'lambda-capture',
    chapter: 15,
    title: 'Lambda 捕获',
    subtitle: '[=] [&] [x]',
    description: '理解值捕获、引用捕获和指定捕获的区别。',
    objectives: ['能区分值捕获和引用捕获', '能根据需要选择合适的捕获模式'],
    estimatedMinutes: 8,
  },
  blocks: [
    {
      type: 'exposition',
      text: 'lambda 的**捕获列表** `[]` 控制它能访问外部的哪些变量。\n默认空 `[]` 不能访问任何外部变量。\n需要访问时就要在 `[]` 中声明。',
      code: 'int threshold = 10;\n// ❌ 编译错误：[] 不能访问 threshold\n// auto f = [](int x) { return x > threshold; };\n\n// ✅ 需要捕获 threshold\nauto f = [threshold](int x) { return x > threshold; };',
    },
    {
      type: 'exposition',
      text: '**值捕获 `[x]`**：把变量 x 的**副本**复制进 lambda。\nlambda 内部用的是 x 的拷贝，修改不影响外部。\n就像函数传参时的**传值**。',
      code: 'int x = 5;\nauto f = [x]() { return x + 1; };\n// f() 返回 6\n// 但外部的 x 仍然是 5',
    },
    {
      type: 'exposition',
      text: '**引用捕获 `[&x]`**：捕获 x 的**引用**。\nlambda 内部用的是 x 本身，\n修改会影响到外部的 x。\n就像函数传参时的**传引用**。',
      code: 'int x = 5;\nauto f = [&x]() { x += 1; };\nf();\n// 外部的 x 变成了 6',
    },
    {
      type: 'exposition',
      text: '**默认捕获 `[=]`**：所有用到的外部变量都按**值**捕获。\n**默认捕获 `[&]`**：所有用到的外部变量都按**引用**捕获。\n可以混合：`[=, &x]` 表示 x 引用捕获，其他值捕获。',
      code: 'int a = 1, b = 2;\n[=]() { return a + b; };      // a 和 b 都值捕获\n[&]() { a += b; };            // a 和 b 都引用捕获\n[=, &a]() { a += b; };        // a 引用，b 值捕获',
    },
    {
      type: 'type-it',
      instruction: '对比值捕获和引用捕获的区别：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int x = 10;\n\n  auto by_val = [x]() { return x + 5; };\n  auto by_ref = [&x]() { x += 5; };\n\n  cout << "by_val: " << by_val() << endl;\n  cout << "x 现在是: " << x << endl;\n\n  by_ref();\n  cout << "by_ref 后 x: " << x << endl;\n}',
      hints: [
        '值捕获 [x] 时内部是 x 的副本',
        '引用捕获 [&x] 修改会影响外部',
        '观察 x 值的变化',
      ],
    },
    {
      type: 'exposition',
      text: '**什么时候用值捕获？**\n当你只需要变量**当前的值**，\n不想让 lambda 修改外部变量时。\n这是最安全的选择。',
    },
    {
      type: 'exposition',
      text: '**什么时候用引用捕获？**\n当你想让 lambda **修改外部变量**，\n或者变量很大（如 vector）不想复制时。\n注意：lambda 执行时外部变量必须仍然存在。',
    },
    {
      type: 'multiple-choice',
      question: '回顾：lambda 的语法 `[ ](int x) { return x; }` 中 `[]` 叫什么？',
      options: [
        { text: '参数列表', correct: false, explanation: '参数列表是 (int x)' },
        { text: '捕获列表', correct: true, explanation: '[] 是捕获列表，控制外部变量访问' },
        { text: '函数体', correct: false, explanation: '{ return x; } 是函数体' },
        { text: '返回类型', correct: false, explanation: '没有 -> 表示自动推断返回类型' },
      ],
    },
    {
      type: 'type-it',
      instruction: '用 [=] 默认值捕获所有外部变量：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int a = 3, b = 4;\n  auto f = [=]() { return a + b; };\n  a = 10;  // 修改外部变量\n  cout << f();  // 输出 7 还是 14？\n}',
      hints: [
        '[=] 在定义时就捕获了 a 和 b 的值',
        '后面修改 a 不影响 lambda 内部的副本',
        '所以输出是 7（3+4），不是 14',
      ],
    },
    {
      type: 'type-it',
      instruction: '用 [&] 默认引用捕获修改外部变量：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int sum = 0;\n  auto add = [&](int x) { sum += x; };\n\n  add(5);\n  add(10);\n  cout << "sum = " << sum;\n}',
      hints: [
        '[&] 捕获 sum 的引用',
        '每次调用 add 都会修改 sum',
        'add(5) 后 sum=5, add(10) 后 sum=15',
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全代码：值捕获 x，不修改外部 x',
      template: '#include <iostream>\n\nint main() {\n  int x = 5;\n  auto f = [____]() { return x + 1; };\n  // f() 返回 6，x 不变\n}',
      answers: ['x'],
      hints: ['在捕获列表中写变量名 x，表示值捕获'],
    },
    {
      type: 'multiple-choice',
      question: '回顾：`sort(v.begin(), v.end(), [](int a, int b) { return a < b; })` 排序结果是什么？',
      options: [
        { text: '降序', correct: false, explanation: 'a < b 是升序条件，小的在前' },
        { text: '升序', correct: true, explanation: 'a < b 表示 a 应该在 b 前面，即升序' },
        { text: '不排序', correct: false, explanation: 'sort 一定会排序' },
        { text: '随机排序', correct: false, explanation: 'sort 是稳定排序，不是随机的' },
      ],
    },
    {
      type: 'exposition',
      text: '**注意**：引用捕获的 lambda 要注意**悬空引用**。\n如果 lambda 在外部变量销毁后才执行，\n引用捕获的变量就失效了。\n值捕获没有这个问题。',
      code: 'auto bad_lambda() {\n  int x = 5;\n  return [&x]() { return x; };  // ❌ x 离开函数就没了\n}  // 调用返回的 lambda 会出问题',
    },
    {
      type: 'fill-in',
      prompt: '补全代码：引用捕获 x 并增加它',
      template: '#include <iostream>\n\nint main() {\n  int x = 1;\n  auto add_one = [____]() { ____; };\n  add_one();\n  std::cout << x;  // 输出 2\n}',
      answers: ['&x', 'x++'],
      hints: ['第一个空是引用捕获 x', '第二个空是让 x 增加 1'],
    },
    {
      type: 'exposition',
      text: '**总结**：\n- `[x]` 值捕获——安全，但不修改外部\n- `[&x]` 引用捕获——能修改，但注意悬空\n- `[=]` 全部值捕获——方便，可能多复制\n- `[&]` 全部引用捕获——方便，注意悬空\n- `[=, &x]` 混合——大变量引用，小变量值',
    },
    {
      type: 'multiple-choice',
      question: '回顾：`count_if` 的返回值是什么类型？',
      options: [
        { text: '迭代器', correct: false, explanation: 'count_if 返回整数，不是迭代器' },
        { text: 'bool', correct: false, explanation: 'count_if 返回统计个数，不是 bool' },
        { text: '整数（size_t）', correct: true, explanation: 'count_if 返回满足条件的元素个数' },
        { text: 'double', correct: false, explanation: 'count 系列返回整数' },
      ],
    },
    {
      type: 'code-runner',
      instruction: '运行程序，观察各种捕获模式：',
      code: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n  int threshold = 5;\n  int total = 0;\n\n  vector<int> v = {2, 6, 4, 8, 3};\n\n  int big = count_if(v.begin(), v.end(), [=](int x) {\n    return x > threshold;\n  });\n  cout << "大于 " << threshold << " 的数: " << big << endl;\n\n  for_each(v.begin(), v.end(), [&](int x) {\n    total += x;\n  });\n  cout << "总和: " << total << endl;\n\n  sort(v.begin(), v.end(), [](int a, int b) {\n    return a > b;\n  });\n  cout << "降序: ";\n  for (int x : v) cout << x << " ";\n  cout << endl;\n}',
      expectedOutput: '大于 5 的数: 2\n总和: 23\n降序: 8 6 4 3 2',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'exposition',
      text: '理解捕获是用好 lambda 的关键。\n下一课学 `for_each`——\n对容器**每个元素**执行操作。',
    },
  ],
}

export default lesson
