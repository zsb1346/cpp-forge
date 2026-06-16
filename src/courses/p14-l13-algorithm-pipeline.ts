import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'algorithm-pipeline',
    chapter: 15,
    title: '算法流水线',
    subtitle: 'sort+unique+erase',
    description: '学会用 sort+unique+erase 的去重组合模式。',
    objectives: ['能实现 sort+unique+erase 去重', '能组合多个 STL 算法完成任务'],
    estimatedMinutes: 8,
  },
  blocks: [
    {
      type: 'exposition',
      text: '**算法流水线**（pipeline）是指把多个算法串起来——\n一个算法的输出作为下一个算法的输入范围。\n最经典的流水线：`sort` + `unique` + `erase`。',
    },
    {
      type: 'exposition',
      text: '`unique` 把**相邻的重复元素**移到末尾。\n注意：`unique` 只处理相邻重复，\n所以要先去重必须**先排序**。\n`unique` 返回新逻辑末尾。',
      code: 'vector<int> v = {1, 2, 2, 3, 1, 1, 4};\nsort(v.begin(), v.end());\n// v = {1, 1, 1, 2, 2, 3, 4}\n\nauto new_end = unique(v.begin(), v.end());\n// v = {1, 2, 3, 4, ?, ?, ?}\n// new_end 指向第四个位置',
    },
    {
      type: 'exposition',
      text: '完整去重流水线：\n`sort(v.begin(), v.end());` 排序\n`auto it = unique(v.begin(), v.end());` 去重\n`v.erase(it, v.end());` 真正删除',
      code: 'vector<int> v = {3, 1, 2, 1, 3, 2, 4};\nsort(v.begin(), v.end());\nauto it = unique(v.begin(), v.end());\nv.erase(it, v.end());\n// v = {1, 2, 3, 4}',
    },
    {
      type: 'type-it',
      instruction: '实现 sort + unique + erase 去重：',
      code: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n  vector<int> v = {4, 2, 2, 4, 1, 3, 1};\n  sort(v.begin(), v.end());\n  auto it = unique(v.begin(), v.end());\n  v.erase(it, v.end());\n  for (int x : v) {\n    cout << x << " ";\n  }\n}',
      hints: [
        'sort 排序让相同元素相邻',
        'unique 把相邻重复移到后面',
        'erase 真正删除重复元素',
      ],
    },
    {
      type: 'exposition',
      text: '`remove_if` + `erase` 也是一种流水线：\n删除不满足条件的元素。\n可以和其他算法组合，比如先排序再条件删除。',
    },
    {
      type: 'type-it',
      instruction: '先排序再删除大于 3 的元素：',
      code: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n  vector<int> v = {5, 2, 4, 1, 3};\n  sort(v.begin(), v.end());\n  auto it = remove_if(v.begin(), v.end(), [](int x) {\n    return x > 3;\n  });\n  v.erase(it, v.end());\n  for (int x : v) {\n    cout << x << " ";\n  }\n}',
      hints: [
        '先排序让数据有序',
        'remove_if 把 >3 的元素移到后面',
        'erase 真正删除，剩下 {1, 2, 3}',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾：`unique` 算法要求数据满足什么条件？',
      options: [
        { text: '数据必须已经排序', correct: true, explanation: 'unique 只处理相邻重复，所以需要先排序' },
        { text: '数据必须是从大到小', correct: false, explanation: '升序降序都行，但必须有序' },
        { text: '数据不能有负数', correct: false, explanation: 'unique 对任何可比较类型都适用' },
        { text: '数据必须唯一', correct: false, explanation: '如果已经唯一就不需要用 unique 了' },
      ],
    },
    {
      type: 'exposition',
      text: '更复杂的流水线：**先 sort，再 unique，\n然后 copy_if 到新容器**。\n每个算法处理前一个算法的结果。',
      code: 'vector<int> v = {3, 1, 2, 1, 3, 2, 4};\nsort(v.begin(), v.end());\nauto it = unique(v.begin(), v.end());\n\nvector<int> result;\ncopy_if(v.begin(), it, back_inserter(result), [](int x) {\n  return x > 2;\n});\n// result = {3, 4}',
    },
    {
      type: 'type-it',
      instruction: '流水线：去重后再筛选大于 2 的元素：',
      code: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n  vector<int> v = {3, 1, 2, 1, 3, 2, 4};\n  sort(v.begin(), v.end());\n  auto it = unique(v.begin(), v.end());\n\n  vector<int> result;\n  copy_if(v.begin(), it, back_inserter(result), [](int x) {\n    return x > 2;\n  });\n\n  for (int x : result) {\n    cout << x << " ";\n  }\n}',
      hints: [
        'unique 后的 it 是新逻辑末尾',
        'copy_if 只从有效范围复制',
        '结果是 {3, 4}',
      ],
    },
    {
      type: 'exposition',
      text: '流水线的核心思想：每个算法做一件事，\n组合起来完成复杂任务。\n就像工厂流水线——每个工位只做一道工序。',
    },
    {
      type: 'code-runner',
      instruction: '运行程序：完整的去重流水线：',
      code: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n  vector<int> v = {5, 2, 3, 2, 5, 1, 3, 4, 1};\n\n  cout << "原始: ";\n  for (int x : v) cout << x << " ";\n  cout << endl;\n\n  sort(v.begin(), v.end());\n  cout << "排序: ";\n  for (int x : v) cout << x << " ";\n  cout << endl;\n\n  auto it = unique(v.begin(), v.end());\n  cout << "去重(逻辑): ";\n  for (auto i = v.begin(); i != it; i++) cout << *i << " ";\n  cout << endl;\n\n  v.erase(it, v.end());\n  cout << "最终: ";\n  for (int x : v) cout << x << " ";\n  cout << endl;\n}',
      expectedOutput: '原始: 5 2 3 2 5 1 3 4 1 \n排序: 1 1 2 2 3 3 4 5 5 \n去重(逻辑): 1 2 3 4 5 \n最终: 1 2 3 4 5',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'fill-in',
      prompt: '补全代码：完成去重流水线',
      template: '#include <algorithm>\n#include <vector>\n\nint main() {\n  std::vector<int> v = {3, 1, 2, 1, 3};\n  std::____(v.begin(), v.end());\n  auto it = std::____(v.begin(), v.end());\n  v.____(it, v.end());\n  // v = {1, 2, 3}\n}',
      answers: ['sort', 'unique', 'erase'],
      hints: ['第一个空是排序算法', '第二个空是去重算法', '第三个空是删除元素的成员函数'],
    },
    {
      type: 'exposition',
      text: '**流水线的优势**：\n1. 每步清晰——知道每个算法做什么\n2. 易于调试——可以分步检查结果\n3. 易于修改——加一个步骤或换一个算法都方便',
    },
    {
      type: 'multiple-choice',
      question: '回顾：`remove_if` 需要配合什么才能真正删除元素？',
      options: [
        { text: 'sort', correct: false, explanation: 'sort 排序不是删除必需的步骤' },
        { text: 'erase', correct: true, explanation: 'erase-remove 惯用法，erase 真正删除' },
        { text: 'unique', correct: false, explanation: 'unique 是去重，不是删除' },
        { text: 'copy', correct: false, explanation: 'copy 是复制，不是删除' },
      ],
    },
    {
      type: 'code-runner',
      instruction: '运行程序：复杂流水线——去重 + 筛选 + 排序：',
      code: '#include <iostream>\n#include <vector>\n#include <algorithm>\n#include <string>\nusing namespace std;\n\nint main() {\n  vector<string> words = {"apple", "banana", "apple",\n                          "cherry", "banana", "date"};\n\n  sort(words.begin(), words.end());\n  auto it = unique(words.begin(), words.end());\n  words.erase(it, words.end());\n\n  cout << "去重后: ";\n  for (string s : words) cout << s << " ";\n  cout << endl;\n\n  // 只保留长度 >= 5 的单词\n  vector<string> long_words;\n  copy_if(words.begin(), words.end(),\n          back_inserter(long_words), [](string s) {\n    return s.length() >= 5;\n  });\n\n  cout << "长单词: ";\n  for (string s : long_words) cout << s << " ";\n  cout << endl;\n}',
      expectedOutput: '去重后: apple banana cherry date \n长单词: apple banana cherry ',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'fill-in',
      prompt: '补全代码：去重流水线的三个步骤',
      template: '#include <algorithm>\n#include <vector>\n\nint main() {\n  std::vector<int> v = {2, 1, 2, 3, 1};\n  // 第一步：排序\n  std::____(v.begin(), v.end());\n  // 第二步：去重\n  auto it = std::____(v.begin(), v.end());\n  // 第三步：删除\n  v.____(it, v.end());\n}',
      answers: ['sort', 'unique', 'erase'],
      hints: ['第一步是排序', '第二步是去重算法', '第三步是成员函数'],
    },
    {
      type: 'multiple-choice',
      question: '回顾：`for_each` 和 `transform` 使用场景的区别？',
      options: [
        { text: 'for_each 用于操作，transform 用于转换', correct: true, explanation: 'for_each 执行操作（如打印），transform 生成新值' },
        { text: 'for_each 更快', correct: false, explanation: '两者性能相当' },
        { text: 'transform 不能修改原容器', correct: false, explanation: 'transform 可以写回原位置' },
        { text: 'for_each 必须用引用捕获', correct: false, explanation: 'for_each 可以用任何捕获方式' },
      ],
    },
    {
      type: 'exposition',
      text: '算法流水线是 STL 的精髓——\n把小的算法组合起来完成复杂任务。\n下一课做**综合练习**，\n把 Lambda 和算法结合起来用。',
    },
  ],
}

export default lesson
