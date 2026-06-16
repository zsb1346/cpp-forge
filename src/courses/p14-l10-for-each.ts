import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'for-each',
    chapter: 15,
    title: 'for_each',
    subtitle: '对每个元素操作',
    description: '学会用 for_each 对容器中的每个元素执行操作。',
    objectives: ['能用 for_each 遍历容器', '能用 for_each 修改元素或统计信息'],
    estimatedMinutes: 8,
  },
  blocks: [
    {
      type: 'exposition',
      text: '`for_each` 对范围内的**每个元素**执行指定操作。\n它接受三个参数：起始迭代器、结束迭代器、操作函数。\n操作函数可以是 lambda。',
      code: '#include <algorithm>\n\nvector<int> v = {1, 2, 3, 4, 5};\nfor_each(v.begin(), v.end(), [](int x) {\n  cout << x << " ";\n});\n// 输出: 1 2 3 4 5',
    },
    {
      type: 'exposition',
      text: '`for_each` 和范围 for 很像，\n但 `for_each` 是一个算法，可以和其他算法组合。\n此外，`for_each` 返回传入的函数对象——\n可以用来收集结果。',
    },
    {
      type: 'type-it',
      instruction: '用 for_each 打印 vector 的每个元素：',
      code: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n  vector<int> v = {10, 20, 30, 40};\n  for_each(v.begin(), v.end(), [](int x) {\n    cout << x << " ";\n  });\n}',
      hints: [
        'for_each 在 <algorithm> 中',
        '第三个参数是 lambda 操作',
        '对每个元素依次执行 lambda',
      ],
    },
    {
      type: 'exposition',
      text: '`for_each` 的 lambda 如果接收**引用**参数，\n可以修改原容器的元素。\n`[](int& x) { x *= 2; }` 让每个元素翻倍。',
      code: 'vector<int> v = {1, 2, 3};\nfor_each(v.begin(), v.end(), [](int& x) {\n  x *= 2;\n});\n// v 变成了 {2, 4, 6}',
    },
    {
      type: 'type-it',
      instruction: '用 for_each 让每个元素翻倍：',
      code: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n  vector<int> v = {1, 2, 3, 4};\n  for_each(v.begin(), v.end(), [](int& x) {\n    x *= 2;\n  });\n  for (int x : v) {\n    cout << x << " ";\n  }\n}',
      hints: [
        '参数写 int&（引用）才能修改原值',
        'x *= 2 等价于 x = x * 2',
        '输出应该是 2 4 6 8',
      ],
    },
    {
      type: 'exposition',
      text: '`for_each` 配合**引用捕获**可以统计信息：\n比如用 `[&sum]` 累加元素，用 `[&count]` 计数。\n捕获外部变量来"收集"结果。',
      code: 'int sum = 0;\nfor_each(v.begin(), v.end(), [&sum](int x) {\n  sum += x;\n});\ncout << sum;  // 输出总和',
    },
    {
      type: 'type-it',
      instruction: '用 for_each 计算元素总和：',
      code: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n  vector<int> v = {5, 10, 15};\n  int sum = 0;\n  for_each(v.begin(), v.end(), [&sum](int x) {\n    sum += x;\n  });\n  cout << "总和: " << sum;\n}',
      hints: [
        '[&sum] 引用捕获 sum 用于累加',
        'lambda 内修改 sum 影响外部',
        '总和是 5+10+15 = 30',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾：lambda 的 `[=]` 表示什么？',
      options: [
        { text: '所有外部变量按值捕获', correct: true, explanation: '[=] 默认按值捕获所有使用到的外部变量' },
        { text: '所有外部变量按引用捕获', correct: false, explanation: '那是 [&]' },
        { text: '不捕获任何变量', correct: false, explanation: '那是 []' },
        { text: '捕获第一个外部变量', correct: false, explanation: '[=] 捕获所有，不是第一个' },
      ],
    },
    {
      type: 'exposition',
      text: '`for_each` 返回传入的函数对象。\n对于有状态的函数对象（如保存了计数器的 lambda），\n可以通过返回值获取最终状态。',
    },
    {
      type: 'fill-in',
      prompt: '补全代码：用 for_each 打印每个元素',
      template: '#include <algorithm>\n#include <iostream>\n#include <vector>\n\nint main() {\n  std::vector<int> v = {1, 2, 3};\n  std::____(v.begin(), v.end(), [](int x) {\n    std::cout << x << " ";\n  });\n}',
      answers: ['for_each'],
      hints: ['算法名：对每个元素执行操作'],
    },
    {
      type: 'code-runner',
      instruction: '运行程序，用 for_each 统计和分析数据：',
      code: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n  vector<int> v = {3, 7, 2, 8, 4};\n  int sum = 0;\n  int cnt = 0;\n\n  for_each(v.begin(), v.end(), [&sum, &cnt](int x) {\n    sum += x;\n    cnt++;\n  });\n\n  cout << "个数: " << cnt << endl;\n  cout << "总和: " << sum << endl;\n  cout << "平均: " << sum / cnt << endl;\n\n  for_each(v.begin(), v.end(), [](int& x) {\n    x = x * 10;\n  });\n\n  cout << "翻十倍: ";\n  for (int x : v) cout << x << " ";\n  cout << endl;\n}',
      expectedOutput: '个数: 5\n总和: 24\n平均: 4\n翻十倍: 30 70 20 80 40',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'multiple-choice',
      question: '回顾：`sort` 需要哪种迭代器？',
      options: [
        { text: '输入迭代器', correct: false, explanation: '输入迭代器只能读一次' },
        { text: '前向迭代器', correct: false, explanation: '前向迭代器不能后退' },
        { text: '随机访问迭代器', correct: true, explanation: 'sort 需要随机访问迭代器来高效排序' },
        { text: '双向迭代器', correct: false, explanation: '双向迭代器不支持快速随机访问' },
      ],
    },
    {
      type: 'exposition',
      text: '`for_each` 和**范围 for**（`for (int x : v)`）很像。\n区别在于：`for_each` 是 STL 算法，可以嵌入算法流水线；\n范围 for 是语言特性，更简洁。\n两者都可以用，习惯用哪个都行。',
    },
    {
      type: 'type-it',
      instruction: '用 for_each 修改容器元素为平方：',
      code: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n  vector<int> v = {1, 2, 3, 4, 5};\n  for_each(v.begin(), v.end(), [](int& x) {\n    x = x * x;\n  });\n  for (int x : v) {\n    cout << x << " ";\n  }\n}',
      hints: [
        'int& x 引用参数才能修改元素',
        'x = x * x 计算平方',
        '输出应该是 1 4 9 16 25',
      ],
    },
    {
      type: 'code-runner',
      instruction: '用 for_each 输出元素及其平方：',
      code: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n  vector<int> v = {2, 3, 4, 5};\n  for_each(v.begin(), v.end(), [](int x) {\n    cout << x << "^2 = " << x * x << endl;\n  });\n}',
      expectedOutput: '2^2 = 4\n3^2 = 9\n4^2 = 16\n5^2 = 25',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'multiple-choice',
      question: '回顾：`count_if` 和 `for_each` 的共同点？',
      options: [
        { text: '都返回迭代器', correct: false, explanation: 'count_if 返回整数，for_each 返回函数对象' },
        { text: '都有范围参数和操作函数', correct: true, explanation: '两者都接受 begin/end + 函数/lambda' },
        { text: '都不修改容器', correct: false, explanation: 'for_each 通过引用参数可以修改' },
        { text: '都需要随机访问迭代器', correct: false, explanation: '两者只需要输入迭代器' },
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全代码：用 for_each 计算所有元素的乘积',
      template: '#include <algorithm>\n#include <iostream>\n#include <vector>\n\nint main() {\n  std::vector<int> v = {2, 3, 4};\n  int product = ____;\n  std::for_each(v.begin(), v.end(), [&product](int x) {\n    product ____ x;\n  });\n  std::cout << product;  // 输出 24\n}',
      answers: ['1', '*='],
      hints: ['第一个空是乘积的初始值（不能是 0）', '第二个空是累乘运算符'],
    },
    {
      type: 'exposition',
      text: '`for_each` 是对每个元素做操作的通用工具。\n下一课学 `transform`——\n**转换**每个元素成一个新序列。',
    },
  ],
}

export default lesson
