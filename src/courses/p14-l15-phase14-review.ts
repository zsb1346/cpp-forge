import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'phase14-review',
    chapter: 15,
    title: '阶段 14 复习',
    subtitle: 'STL 算法总复习',
    description: '全面回顾迭代器、STL 算法和 Lambda 表达式。',
    objectives: ['能说出迭代器的种类和作用', '能用 STL 算法处理数据', '能用 Lambda 自定义操作'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'multiple-choice',
      question: '`begin()` 和 `end()` 返回的是什么？',
      options: [
        { text: '元素的值', correct: false, explanation: 'begin/end 返回迭代器，不是元素值' },
        { text: '迭代器，分别指向第一个和最后一个之后', correct: true, explanation: 'begin() 指向第一个元素，end() 指向最后一个之后' },
        { text: '容器的地址', correct: false, explanation: 'begin/end 不是地址，是迭代器' },
        { text: '布尔值', correct: false, explanation: 'begin/end 返回迭代器，不是布尔值' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '`sort` 默认按什么顺序排序？',
      options: [
        { text: '降序（从大到小）', correct: false, explanation: '默认是升序，降序需要传入 greater<int>() 或 lambda' },
        { text: '升序（从小到大）', correct: true, explanation: 'sort 默认按 operator< 升序排列' },
        { text: '随机顺序', correct: false, explanation: 'sort 是稳定的排序算法' },
        { text: '按插入顺序', correct: false, explanation: 'sort 按值排序，不是插入顺序' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '`find_if` 和 `count_if` 的共同点是什么？',
      options: [
        { text: '都修改容器内容', correct: false, explanation: '两者都是只读算法，不修改容器' },
        { text: '都接受一个条件谓词（lambda）', correct: true, explanation: '两者都通过条件判断来工作' },
        { text: '都返回迭代器', correct: false, explanation: 'count_if 返回整数' },
        { text: '都只能用于 vector', correct: false, explanation: '两者可用于任何提供输入迭代器的容器' },
      ],
    },
    {
      type: 'multiple-choice',
      question: 'Lambda `[&]` 的捕获方式是什么？',
      options: [
        { text: '所有变量按引用捕获', correct: true, explanation: '[&] 默认按引用捕获所有使用到的外部变量' },
        { text: '所有变量按值捕获', correct: false, explanation: '那是 [=]' },
        { text: '不捕获任何变量', correct: false, explanation: '那是 []' },
        { text: '只捕获第一个变量', correct: false, explanation: '[&] 捕获所有，不是第一个' },
      ],
    },
    {
      type: 'concept-cards',
      instruction: '重要概念回顾：',
      cards: [
        { glyph: '🔗', term: '迭代器', meaning: '连接容器和算法的桥梁，像指针一样遍历', example: 'vector<int>::iterator' },
        { glyph: '🔄', term: 'sort/unique/erase', meaning: '经典去重流水线', example: 'sort + unique + erase' },
        { glyph: '🔍', term: 'find / find_if', meaning: '查找第一个符合条件的元素', example: 'find(begin, end, val)' },
        { glyph: '📊', term: 'count / count_if', meaning: '统计满足条件的元素个数', example: 'count(begin, end, val)' },
      ],
    },
    {
      type: 'type-it',
      instruction: '复习：用迭代器遍历并输出 vector：',
      code: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n  vector<int> v = {10, 20, 30};\n  for (auto it = v.begin(); it != v.end(); ++it) {\n    cout << *it << " ";\n  }\n}',
      hints: [
        'begin() 获取首迭代器',
        'it != v.end() 循环条件',
        '*it 获取元素值',
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全代码：lambda 捕获变量 sum 并累加',
      template: '#include <iostream>\n#include <vector>\n#include <algorithm>\n\nint main() {\n  std::vector<int> v = {1, 2, 3};\n  int sum = 0;\n  std::for_each(v.begin(), v.end(), [____](int x) {\n    sum += x;\n  });\n  std::cout << sum;  // 输出 6\n}',
      answers: ['&sum'],
      hints: ['引用捕获 sum 才能在 lambda 中修改它'],
    },
    {
      type: 'multiple-choice',
      question: '`remove_if` 之后为什么要调用 `erase`？',
      options: [
        { text: 'remove_if 只是移动元素，erase 删除作废的', correct: true, explanation: 'remove_if 把要删除的移到后面，erase 真正删除' },
        { text: 'remove_if 会报错', correct: false, explanation: 'remove_if 不会报错，只是不删除' },
        { text: 'erase 让 remove_if 生效', correct: false, explanation: '不是让生效，是真正清理' },
        { text: 'remove_if 只能用在 list 上', correct: false, explanation: 'remove_if 可以用在任何容器的迭代器范围上' },
      ],
    },
    {
      type: 'type-it',
      instruction: '复习：用 sort + lambda 做降序排列：',
      code: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n  vector<int> v = {3, 7, 1, 9, 4};\n  sort(v.begin(), v.end(), [](int a, int b) {\n    return a > b;\n  });\n  for (int x : v) {\n    cout << x << " ";\n  }\n}',
      hints: [
        'lambda 参数 a 和 b 是比较的两个元素',
        'return a > b 表示降序',
        '结果是 9 7 4 3 1',
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全代码：find_if 找第一个大于 5 的数',
      template: '#include <algorithm>\n#include <iostream>\n#include <vector>\n\nint main() {\n  std::vector<int> v = {1, 3, 7, 2, 9};\n  auto it = std::____(v.begin(), v.end(), [](int x) {\n    return x ____ 5;\n  });\n  if (it != v.end()) {\n    std::cout << *it;  // 输出 7\n  }\n}',
      answers: ['find_if', '>'],
      hints: ['第一个空是条件查找算法', '第二个空是比较运算符'],
    },
    {
      type: 'code-runner',
      instruction: '运行最终复习程序：综合运用 STL 算法：',
      code: '#include <iostream>\n#include <vector>\n#include <algorithm>\n#include <string>\nusing namespace std;\n\nint main() {\n  vector<int> data = {3, 8, 1, 8, 4, 3, 7, 2, 7};\n\n  cout << "原始: ";\n  for (int x : data) cout << x << " ";\n  cout << endl;\n\n  sort(data.begin(), data.end());\n  cout << "排序: ";\n  for (int x : data) cout << x << " ";\n  cout << endl;\n\n  auto it = unique(data.begin(), data.end());\n  data.erase(it, data.end());\n  cout << "去重: ";\n  for (int x : data) cout << x << " ";\n  cout << endl;\n\n  int sum = 0;\n  for_each(data.begin(), data.end(), [&sum](int x) {\n    sum += x;\n  });\n  cout << "总和: " << sum << endl;\n\n  double avg = (double)sum / data.size();\n  cout << "平均: " << avg << endl;\n\n  auto max_it = max_element(data.begin(), data.end());\n  cout << "最大: " << *max_it << endl;\n\n  int big = count_if(data.begin(), data.end(), [&avg](int x) {\n    return x > avg;\n  });\n  cout << "大于平均: " << big << " 个" << endl;\n\n  vector<string> bars;\n  transform(data.begin(), data.end(),\n            back_inserter(bars), [](int x) {\n    return string(x, \'#\');\n  });\n  cout << "柱状图:\\n";\n  for (string b : bars) cout << b << endl;\n}',
      expectedOutput: '原始: 3 8 1 8 4 3 7 2 7 \n排序: 1 2 3 3 4 7 7 8 8 \n去重: 1 2 3 4 7 8 \n总和: 25\n平均: 4.16667\n最大: 8\n大于平均: 2 个\n柱状图:\n#\n##\n###\n####\n#######\n########',
      comparison: 'contains',
      editable: true,
    },
    {
      type: 'multiple-choice',
      question: 'STL 算法相比手写循环的三个优势是什么？',
      options: [
        { text: '更清晰、更安全、更通用', correct: true, explanation: '算法名说明意图，经过测试更安全，适配多种容器' },
        { text: '更快、更小、更简单', correct: false, explanation: '清晰、安全、通用是主要优势' },
        { text: '更短、更快、更省内存', correct: false, explanation: '主要优势是可读性和安全性' },
        { text: '更复杂、更强大、更灵活', correct: false, explanation: '算法应该让代码更简单，不是更复杂' },
      ],
    },
    {
      type: 'concept-cards',
      instruction: 'STL 算法速查：',
      cards: [
        { glyph: '🔢', term: 'sort', meaning: '排序，需随机访问迭代器', example: 'sort(v.begin(), v.end())' },
        { glyph: '🔎', term: 'find / find_if', meaning: '查找第一个匹配的元素', example: 'find_if(b, e, pred)' },
        { glyph: '📈', term: 'count / count_if', meaning: '统计满足条件的元素个数', example: 'count(b, e, val)' },
        { glyph: '🔄', term: 'for_each / transform', meaning: '遍历做操作 / 映射转换', example: 'for_each(b, e, f)' },
      ],
    },
    {
      type: 'type-it',
      instruction: '最终挑战：用 transform 计算平方并筛选：',
      code: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n  vector<int> v = {1, 2, 3, 4, 5};\n  vector<int> squares;\n\n  transform(v.begin(), v.end(),\n            back_inserter(squares), [](int x) {\n    return x * x;\n  });\n\n  int n = count_if(squares.begin(), squares.end(), [](int x) {\n    return x > 10;\n  });\n  cout << "平方大于 10: " << n << " 个";\n}',
      hints: [
        '先 transform 计算平方',
        '再 count_if 统计 > 10 的个数',
        '平方: 1, 4, 9, 16, 25 → 2 个 > 10',
      ],
    },
    {
      type: 'exposition',
      text: '阶段 14 到这里就结束了！\n你已经学会了：\n- 迭代器——容器和算法的桥梁\n- sort、find、count 等核心算法\n- Lambda 表达式\n- 算法流水线',
    },
    {
      type: 'fill-in',
      prompt: '补全代码：用 sort + unique + erase 去重',
      template: '#include <algorithm>\n#include <vector>\n\nint main() {\n  std::vector<int> v = {3, 1, 2, 1, 3};\n  std::____(v.begin(), v.end());\n  auto it = std::____(v.begin(), v.end());\n  v.erase(it, v.____());\n}',
      answers: ['sort', 'unique', 'end'],
      hints: ['第一个空是排序', '第二个空是去重', '第三个空是末尾迭代器'],
    },
    {
      type: 'type-it',
      instruction: '复习：用 count_if + lambda 统计能被 3 整除的数：',
      code: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n  vector<int> v = {3, 5, 9, 10, 12};\n  int n = count_if(v.begin(), v.end(), [](int x) {\n    return x % 3 == 0;\n  });\n  cout << "能被 3 整除: " << n;\n}',
      hints: [
        'lambda 条件 x % 3 == 0',
        'count_if 统计满足条件的个数',
        '结果是 3（3, 9, 12）',
      ],
    },
    {
      type: 'exposition',
      text: '下一阶段我们将进入**阶段 15**——\n学习更多 C++ 进阶内容。\n继续加油！',
    },
  ],
}

export default lesson
