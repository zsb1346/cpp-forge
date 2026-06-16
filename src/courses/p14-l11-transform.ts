import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'transform',
    chapter: 15,
    title: 'transform',
    subtitle: '一个序列变另一个',
    description: '学会用 transform 对每个元素做变换生成新序列。',
    objectives: ['能用 transform 转换容器元素', '能区分 transform 和 for_each'],
    estimatedMinutes: 8,
  },
  blocks: [
    {
      type: 'exposition',
      text: '`transform` 对范围内的每个元素**做变换**，\n结果写入另一个位置（可以是同一容器的起始位置）。\n和 `for_each` 不同——`transform` 关注**输出结果**。',
      code: '#include <algorithm>\n\nvector<int> src = {1, 2, 3, 4};\nvector<int> dst(4);  // 预先分配空间\n\ntransform(src.begin(), src.end(), dst.begin(), [](int x) {\n  return x * 2;\n});\n// dst = {2, 4, 6, 8}',
    },
    {
      type: 'exposition',
      text: '`transform` 的参数：\n1. 源范围起始迭代器\n2. 源范围结束迭代器\n3. 目标范围起始迭代器\n4. 变换函数（lambda）',
    },
    {
      type: 'type-it',
      instruction: '用 transform 让每个元素翻倍：',
      code: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n  vector<int> src = {1, 2, 3, 4};\n  vector<int> dst(4);\n\n  transform(src.begin(), src.end(), dst.begin(), [](int x) {\n    return x * 2;\n  });\n\n  for (int x : dst) {\n    cout << x << " ";\n  }\n}',
      hints: [
        '目标容器需要预先分配空间',
        'transform 的 lambda 用 return 返回结果',
        'dst 结果是 {2, 4, 6, 8}',
      ],
    },
    {
      type: 'exposition',
      text: '目标容器必须**预先分配空间**。\n`vector<int> dst(4)` 创建了 4 个元素的 vector。\n如果 dst 是空的，transform 会**越界写入**。',
    },
    {
      type: 'exposition',
      text: '也可以用 **back_inserter** 自动在尾部添加：\n`back_inserter(dst)` 创建一个特殊的迭代器，\n每次写入时自动 `push_back`。\n这样 dst 不需要预先分配空间。',
      code: 'vector<int> src = {1, 2, 3, 4};\nvector<int> dst;  // 空容器\n\ntransform(src.begin(), src.end(),\n          back_inserter(dst), [](int x) {\n  return x * 2;\n});\n// dst = {2, 4, 6, 8}',
    },
    {
      type: 'type-it',
      instruction: '用 back_inserter 避免预分配：',
      code: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n  vector<int> src = {1, 2, 3};\n  vector<int> dst;\n\n  transform(src.begin(), src.end(),\n            back_inserter(dst), [](int x) {\n    return x * x;\n  });\n\n  for (int x : dst) {\n    cout << x << " ";\n  }\n}',
      hints: [
        'back_inserter 自动 push_back',
        'dst 初始为空，无需分配空间',
        '结果是 {1, 4, 9}',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾：`for_each` 和 `transform` 的区别是什么？',
      options: [
        { text: 'for_each 不生成新序列，transform 生成', correct: true, explanation: 'for_each 只执行操作，transform 生成新序列' },
        { text: '没有区别', correct: false, explanation: '两者用途不同' },
        { text: 'transform 不能修改元素', correct: false, explanation: 'transform 可以生成变换后的值' },
        { text: 'for_each 需要 lambda', correct: false, explanation: '两者都可以用 lambda' },
      ],
    },
    {
      type: 'exposition',
      text: '`transform` 可以把一个类型转换为另一个类型：\n比如 `int` 转 `string`、`double` 转 `int`。\n源容器和目标容器可以是不同类型。',
      code: 'vector<int> nums = {1, 2, 3};\nvector<string> strs(3);\n\ntransform(nums.begin(), nums.end(), strs.begin(), [](int x) {\n  return to_string(x) + "!";\n});\n// strs = {"1!", "2!", "3!"}',
    },
    {
      type: 'type-it',
      instruction: '用 transform 将 int 转为 string：',
      code: '#include <iostream>\n#include <vector>\n#include <algorithm>\n#include <string>\nusing namespace std;\n\nint main() {\n  vector<int> nums = {1, 2, 3};\n  vector<string> strs(3);\n\n  transform(nums.begin(), nums.end(), strs.begin(), [](int x) {\n    return to_string(x) + "点";\n  });\n\n  for (string s : strs) {\n    cout << s << " ";\n  }\n}',
      hints: [
        '源和目标类型可以不同',
        'to_string(x) 把整数转成字符串',
        '+ "点" 拼接成最终字符串',
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全代码：用 transform 求每个元素的平方',
      template: '#include <algorithm>\n#include <vector>\n\nint main() {\n  std::vector<int> src = {1, 2, 3};\n  std::vector<int> dst(3);\n  std::____(src.begin(), src.end(), dst.begin(), [](int x) {\n    return x ____ x;\n  });\n}',
      answers: ['transform', '*'],
      hints: ['第一个空是转换算法名', '第二个空是乘法运算符，计算平方'],
    },
    {
      type: 'exposition',
      text: '`transform` 可以把变换结果写回源容器：\n`transform(v.begin(), v.end(), v.begin(), ...)`\n这样就在原位置上做变换。',
      code: 'vector<int> v = {1, 2, 3, 4};\ntransform(v.begin(), v.end(), v.begin(), [](int x) {\n  return x * 10;\n});\n// v = {10, 20, 30, 40}',
    },
    {
      type: 'type-it',
      instruction: 'transform 结果写回原容器：',
      code: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n  vector<int> v = {1, 2, 3, 4};\n  transform(v.begin(), v.end(), v.begin(), [](int x) {\n    return x + 1;\n  });\n  for (int x : v) {\n    cout << x << " ";\n  }\n}',
      hints: [
        '源和目标用同一个 begin()',
        '每个元素加 1，结果就是 {2, 3, 4, 5}',
        'transform 在原容器上修改',
      ],
    },
    {
      type: 'code-runner',
      instruction: '运行程序，观察 transform 的多种用法：',
      code: '#include <iostream>\n#include <vector>\n#include <algorithm>\n#include <string>\nusing namespace std;\n\nint main() {\n  vector<int> nums = {1, 2, 3, 4, 5};\n  vector<int> squares;\n\n  transform(nums.begin(), nums.end(),\n            back_inserter(squares), [](int x) {\n    return x * x;\n  });\n\n  cout << "平方: ";\n  for (int x : squares) cout << x << " ";\n  cout << endl;\n\n  vector<string> labels;\n  transform(nums.begin(), nums.end(),\n            back_inserter(labels), [](int x) {\n    return "第" + to_string(x) + "号";\n  });\n\n  cout << "标签: ";\n  for (string s : labels) cout << s << " ";\n  cout << endl;\n}',
      expectedOutput: '平方: 1 4 9 16 25 \n标签: 第1号 第2号 第3号 第4号 第5号',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'fill-in',
      prompt: '补全代码：温度转换（摄氏度转华氏度）',
      template: '#include <algorithm>\n#include <iostream>\n#include <vector>\n\nint main() {\n  std::vector<double> celsius = {0, 25, 100};\n  std::vector<double> fahrenheit(3);\n  std::____(celsius.begin(), celsius.end(), fahrenheit.begin(), [](double c) {\n    return c * 9.0 / 5.0 + ____;\n  });\n}',
      answers: ['transform', '32'],
      hints: ['第一个空是算法名', '第二个空是华氏度的偏移量（冰点是 32°F）'],
    },
    {
      type: 'multiple-choice',
      question: '回顾：`back_inserter` 的作用是什么？',
      options: [
        { text: '在容器开头插入', correct: false, explanation: 'back_inserter 在尾部插入' },
        { text: '在容器尾部自动插入元素', correct: true, explanation: 'back_inserter 返回一个迭代器，每次写入就 push_back' },
        { text: '删除最后一个元素', correct: false, explanation: 'back_inserter 是插入，不是删除' },
        { text: '获取尾部迭代器', correct: false, explanation: 'back_inserter 是插入适配器，不是 end()' },
      ],
    },
    {
      type: 'exposition',
      text: '`transform` 是"映射"操作——\n把一种值映射为另一种值。\n在函数式编程中这叫 `map`，\n是数据处理的核心模式。',
    },
    {
      type: 'code-runner',
      instruction: '运行程序：transform 实战——计算 BMI：',
      code: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n  vector<double> heights = {1.75, 1.60, 1.80};\n  vector<double> weights = {70, 55, 80};\n  vector<double> bmi(3);\n\n  // 用 transform 计算 BMI = 体重 / 身高^2\n  for (int i = 0; i < 3; i++) {\n    double h = heights[i];\n    double w = weights[i];\n    bmi[i] = w / (h * h);\n  }\n\n  for (double b : bmi) {\n    cout << b << " ";\n  }\n}',
      expectedOutput: '22.8571 21.4844 24.6914',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'multiple-choice',
      question: '回顾：`lambda` 的 `[&]` 捕获模式表示什么？',
      options: [
        { text: '所有变量按值捕获', correct: false, explanation: '那是 [=]' },
        { text: '所有变量按引用捕获', correct: true, explanation: '[&] 默认按引用捕获所有使用到的变量' },
        { text: '不捕获任何变量', correct: false, explanation: '那是 []' },
        { text: '只捕获整数变量', correct: false, explanation: '[&] 捕获所有类型的变量' },
      ],
    },
    {
      type: 'exposition',
      text: '`transform` 是数据转换的核心算法。\n下一课学 `copy` 和 `remove_if`——\n**复制**和**条件删除**。',
    },
  ],
}

export default lesson
