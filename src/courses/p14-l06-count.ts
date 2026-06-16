import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'count',
    chapter: 15,
    title: 'count 计数',
    subtitle: '统计符合条件个数',
    description: '学会用 count 和 count_if 统计容器中满足条件的元素个数。',
    objectives: ['能用 count 统计特定值出现次数', '能用 count_if 统计满足条件的元素个数'],
    estimatedMinutes: 8,
  },
  blocks: [
    {
      type: 'exposition',
      text: '`count` 统计指定范围内**等于某值**的元素个数。\n返回一个整数（`size_t` 类型）。\n不像 `find` 返回迭代器，`count` 直接给数字。',
      code: '#include <algorithm>\n\nvector<int> v = {1, 2, 2, 3, 2, 4};\nint n = count(v.begin(), v.end(), 2);\ncout << n;  // 输出 3',
    },
    {
      type: 'exposition',
      text: '`count` 返回的是元素个数，不是迭代器。\n所以不需要检查是否找到——\n返回 0 就是没有找到，返回正数就是找到了。\n比 `find` 更直接。',
    },
    {
      type: 'type-it',
      instruction: '用 count 统计数字出现次数：',
      code: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n  vector<int> v = {3, 1, 4, 1, 5, 1};\n  int n = count(v.begin(), v.end(), 1);\n  cout << "1 出现了 " << n << " 次";\n}',
      hints: [
        'count 返回的是整数，不是迭代器',
        '统计 1 在 vector 中出现的次数',
        '结果是 3',
      ],
    },
    {
      type: 'exposition',
      text: '`count_if` 是条件版本——\n统计**满足条件**的元素个数。\n用 lambda 写条件，和 `find_if` 一样。',
      code: 'vector<int> v = {1, 2, 3, 4, 5, 6};\nint n = count_if(v.begin(), v.end(), [](int x) {\n  return x % 2 == 0;\n});\ncout << n;  // 输出 3（偶数个数）',
    },
    {
      type: 'multiple-choice',
      question: '回顾：`find` 返回什么类型？',
      options: [
        { text: 'int 表示下标', correct: false, explanation: 'find 返回迭代器，不是下标' },
        { text: '迭代器', correct: true, explanation: 'find 返回指向找到元素的迭代器' },
        { text: 'bool 表示是否找到', correct: false, explanation: 'find 返回迭代器，需要和 end() 比较' },
        { text: '元素的值', correct: false, explanation: '需要 *it 才能获取值' },
      ],
    },
    {
      type: 'type-it',
      instruction: '用 count_if 统计偶数个数：',
      code: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n  vector<int> v = {1, 2, 3, 4, 5, 6, 7, 8};\n  int n = count_if(v.begin(), v.end(), [](int x) {\n    return x % 2 == 0;\n  });\n  cout << "偶数个数: " << n;\n}',
      hints: [
        'count_if 的第三个参数是条件 lambda',
        'lambda 返回 true 表示满足条件',
        'x % 2 == 0 判断是否是偶数',
      ],
    },
    {
      type: 'exposition',
      text: '`count` 和 `count_if` 的返回值是 `size_t`——\n一个**无符号整数类型**。\n可以和 `int` 混用，但最好直接用它。',
    },
    {
      type: 'fill-in',
      prompt: '补全代码：统计 vector 中 0 的个数',
      template: '#include <algorithm>\n#include <iostream>\n#include <vector>\n\nint main() {\n  std::vector<int> v = {0, 1, 0, 3, 0};\n  int n = std::____(v.begin(), v.end(), ____);\n  std::cout << n;  // 输出 3\n}',
      answers: ['count', '0'],
      hints: ['第一个空是计数算法名', '第二个空是要统计的值'],
    },
    {
      type: 'multiple-choice',
      question: '回顾：`sort` 默认的排序顺序是什么？',
      options: [
        { text: '降序（大到小）', correct: false, explanation: 'sort 默认是升序' },
        { text: '升序（小到大）', correct: true, explanation: 'sort 默认从小到大排序' },
        { text: '随机顺序', correct: false, explanation: 'sort 不会随机排列' },
        { text: '不排序', correct: false, explanation: 'sort 就是用来排序的' },
      ],
    },
    {
      type: 'exposition',
      text: '`count` 可以用于**字符串**中的字符统计：\n`count(s.begin(), s.end(), \'a\')` 统计 `a` 的出现次数。\n对字母频率分析等场景很有用。',
      code: 'string s = "banana";\nint n = count(s.begin(), s.end(), \'a\');\ncout << n;  // 输出 3',
    },
    {
      type: 'type-it',
      instruction: '统计字符串中字母出现的次数：',
      code: '#include <iostream>\n#include <algorithm>\n#include <string>\nusing namespace std;\n\nint main() {\n  string s = "hello world";\n  int n = count(s.begin(), s.end(), \'l\');\n  cout << "字母 l 出现 " << n << " 次";\n}',
      hints: [
        'count 也可以用于 string',
        '字符用单引号包围',
        '\'l\' 在 "hello world" 中出现 3 次',
      ],
    },
    {
      type: 'exposition',
      text: '`count_if` 可以结合复杂的条件：\n比如统计**大于 5 且小于 20** 的元素个数。\n条件灵活组合，lambda 里写任意逻辑。',
      code: 'int n = count_if(v.begin(), v.end(), [](int x) {\n  return x > 5 && x < 20;\n});',
    },
    {
      type: 'type-it',
      instruction: '用 count_if 统计大于 5 的元素个数：',
      code: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n  vector<int> v = {3, 8, 2, 10, 5, 12};\n  int n = count_if(v.begin(), v.end(), [](int x) {\n    return x > 5;\n  });\n  cout << "大于 5 的数有 " << n << " 个";\n}',
      hints: [
        'lambda 中写 x > 5 作为条件',
        'count_if 统计满足条件的个数',
        '结果是 3（8, 10, 12）',
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全代码：统计大于 0 的数的个数',
      template: '#include <algorithm>\n#include <iostream>\n#include <vector>\n\nint main() {\n  std::vector<int> v = {-1, 2, -3, 4, 0, 5};\n  int n = std::____(v.____(), v.end(), [](int x) {\n    return x ____ 0;\n  });\n  std::cout << n;  // 输出 3\n}',
      answers: ['count_if', 'begin', '>'],
      hints: ['第一个空是条件计数算法', '第二个空是起始迭代器', '第三个空是比较运算符'],
    },
    {
      type: 'code-runner',
      instruction: '运行程序，观察 count 和 count_if 的用法：',
      code: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n  vector<int> v = {2, 5, 2, 8, 2, 1, 4};\n\n  int c1 = count(v.begin(), v.end(), 2);\n  cout << "2 出现了 " << c1 << " 次" << endl;\n\n  int c2 = count_if(v.begin(), v.end(), [](int x) {\n    return x > 3;\n  });\n  cout << "大于 3 的数有 " << c2 << " 个" << endl;\n\n  int c3 = count_if(v.begin(), v.end(), [](int x) {\n    return x % 2 == 0;\n  });\n  cout << "偶数有 " << c3 << " 个" << endl;\n}',
      expectedOutput: '2 出现了 3 次\n大于 3 的数有 3 个\n偶数有 5 个',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'multiple-choice',
      question: '回顾：`find_if` 和 `count_if` 的共同点是什么？',
      options: [
        { text: '都返回迭代器', correct: false, explanation: 'count_if 返回整数，find_if 返回迭代器' },
        { text: '都用迭代器范围 + lambda 条件', correct: true, explanation: '两者都接受 begin/end + 条件谓词' },
        { text: '都修改容器内容', correct: false, explanation: '查找和计数都不会修改容器' },
        { text: '都返回 bool', correct: false, explanation: 'find_if 返回迭代器，count_if 返回整数' },
      ],
    },
    {
      type: 'code-runner',
      instruction: '运行程序，用 count 分析数据分布：',
      code: '#include <iostream>\n#include <vector>\n#include <algorithm>\n#include <string>\nusing namespace std;\n\nint main() {\n  vector<int> scores = {85, 92, 76, 85, 90, 85, 88};\n\n  int c85 = count(scores.begin(), scores.end(), 85);\n  cout << "85 分出现 " << c85 << " 次" << endl;\n\n  int pass = count_if(scores.begin(), scores.end(), [](int x) {\n    return x >= 60;\n  });\n  cout << "及格人数: " << pass << endl;\n\n  int high = count_if(scores.begin(), scores.end(), [](int x) {\n    return x >= 90;\n  });\n  cout << "优秀人数: " << high << endl;\n\n  string s = "programming";\n  int cm = count(s.begin(), s.end(), \'m\');\n  cout << "字母 m 出现 " << cm << " 次" << endl;\n}',
      expectedOutput: '85 分出现 3 次\n及格人数: 7\n优秀人数: 2\n字母 m 出现 2 次',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'exposition',
      text: '`count` 和 `count_if` 是最直观的统计算法。\n下一课做**综合练习**——\n把 sort、find、count 结合起来用。',
    },
  ],
}

export default lesson
