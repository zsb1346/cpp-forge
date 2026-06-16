import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'why-algorithms',
    chapter: 15,
    title: '为什么用算法',
    subtitle: '算法更安全更清晰',
    description: '理解 STL 算法比手写循环更安全、更清晰的原因。',
    objectives: ['能说出 STL 算法的三个优势', '能对比手写循环和算法的区别'],
    estimatedMinutes: 8,
  },
  blocks: [
    {
      type: 'exposition',
      text: '先看一个**手写循环**找最大值的例子。\n代码越长，越容易写错——\n比如下标写错、边界搞错。',
      code: 'vector<int> v = {3, 7, 2, 9, 5};\nint max_val = v[0];\nfor (int i = 1; i <= v.size(); i++) {\n  if (v[i] > max_val) {\n    max_val = v[i];\n  }\n}',
    },
    {
      type: 'exposition',
      text: '用 STL 算法 `max_element` 一行搞定：\n`auto it = max_element(v.begin(), v.end());`\n不会越界、不会写错下标、意图一目了然。',
      code: '#include <algorithm>\n\nvector<int> v = {3, 7, 2, 9, 5};\nauto it = max_element(v.begin(), v.end());\ncout << *it;  // 输出 9',
    },
    {
      type: 'exposition',
      text: '**优势一：更清晰**\n`max_element` 这个名字直接告诉你"找最大元素"。\n而手写循环你需要读完整段代码才能明白在做什么。\n代码就是文档。',
    },
    {
      type: 'exposition',
      text: '**优势二：更安全**\nSTL 算法由标准委员会编写，经过了无数测试。\n你自己写的循环很可能有**差一错误**、\n**越界访问**、**空容器崩溃**等问题。',
      code: 'vector<int> empty;\n// 手写: empty[0] 崩溃！\n// 算法:\nauto it = max_element(empty.begin(), empty.end());\nif (it == empty.end()) {\n  cout << "空的";  // 安全处理\n}',
    },
    {
      type: 'exposition',
      text: '**优势三：更通用**\n`max_element` 可以用在任何提供输入迭代器的容器上——\n`vector`、`list`、`deque`、`array`，甚至普通数组。\n手写循环换一个容器就得重写。',
      code: 'int arr[] = {3, 7, 2, 9, 5};\nauto it = max_element(begin(arr), end(arr));\n// 普通数组也能用！',
    },
    {
      type: 'type-it',
      instruction: '用 max_element 找最大值：',
      code: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n  vector<int> v = {10, 3, 8, 15, 6};\n  auto it = max_element(v.begin(), v.end());\n  cout << "最大值: " << *it;\n}',
      hints: [
        'max_element 返回迭代器，不是值',
        '用 *it 获取最大值',
        'max_element 在 <algorithm> 中',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾：`auto it = v.begin();` 中 `auto` 的作用是什么？',
      options: [
        { text: '自动推导迭代器类型', correct: true, explanation: 'auto 让编译器自动推断 it 的类型' },
        { text: '让变量自动初始化', correct: false, explanation: 'auto 是类型推导，不是自动初始化值' },
        { text: '声明一个动态变量', correct: false, explanation: 'auto 不涉及动态分配' },
        { text: '让变量不能被修改', correct: false, explanation: 'auto 和 const 不同，不控制可修改性' },
      ],
    },
    {
      type: 'exposition',
      text: '`min_element` 与 `max_element` 类似——找最小值。\n两个一起用也能：`auto [min, max] = minmax_element(...)`。\nSTL 算法越用越觉得方便。',
      code: 'vector<int> v = {5, 2, 8, 1, 9};\nauto min_it = min_element(v.begin(), v.end());\nauto max_it = max_element(v.begin(), v.end());\ncout << *min_it << " " << *max_it;  // 1 9',
    },
    {
      type: 'type-it',
      instruction: '同时找最小值和最大值：',
      code: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n  vector<int> v = {7, 2, 9, 4, 1};\n  auto min_it = min_element(v.begin(), v.end());\n  auto max_it = max_element(v.begin(), v.end());\n  cout << "最小: " << *min_it << endl;\n  cout << "最大: " << *max_it;\n}',
      hints: [
        'min_element 和 max_element 用法一样',
        '注意两个算法需要分别调用',
        '*min_it 获取最小值，*max_it 获取最大值',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾：为什么 `list` 不能直接用 `std::sort`？',
      options: [
        { text: 'list 没有迭代器', correct: false, explanation: 'list 有迭代器，是双向迭代器' },
        { text: 'sort 需要随机访问迭代器', correct: true, explanation: 'list 的迭代器是双向的，不支持随机访问' },
        { text: 'list 的元素不能排序', correct: false, explanation: 'list 可以用自己的 sort 成员函数排序' },
        { text: 'list 太大', correct: false, explanation: '大小不是原因' },
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全代码：用 max_element 找最大值',
      template: '#include <algorithm>\n#include <vector>\n\nint main() {\n  std::vector<int> v = {4, 7, 2};\n  auto it = std::____(v.____(), v.____());\n}',
      answers: ['max_element', 'begin', 'end'],
      hints: ['第一个空是找最大值的算法', '第二个空是起始迭代器', '第三个空是结束迭代器'],
    },
    {
      type: 'exposition',
      text: '**另一个常见场景**：手写循环容易忘记处理**空容器**。\n如果 `v` 是空的，`v[0]` 直接崩溃。\n但算法对空容器安全——返回 `end()`。',
    },
    {
      type: 'multiple-choice',
      question: 'STL 算法相比手写循环的优势不包括以下哪个？',
      options: [
        { text: '更清晰直观', correct: false, explanation: '算法名直接说明意图，这确实是优势' },
        { text: '运行速度更快', correct: true, explanation: '算法不一定比手写快，优势是安全和清晰' },
        { text: '更安全不易出错', correct: false, explanation: '标准算法经过充分测试，更安全' },
        { text: '更通用，适配多种容器', correct: false, explanation: '算法可以用于不同容器，这是优势' },
      ],
    },
    {
      type: 'exposition',
      text: 'STL 算法的通用模式：\n`algorithm_name(begin, end, ...)`\n前两个参数是**迭代器范围**，\n后面的参数是额外条件或目标。',
      code: 'sort(v.begin(), v.end());\nauto it = find(v.begin(), v.end(), 5);\ncopy(src.begin(), src.end(), dst.begin());',
    },
    {
      type: 'code-runner',
      instruction: '运行程序，感受算法的简洁：',
      code: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n  vector<int> v = {8, 3, 12, 5, 1};\n\n  auto it = max_element(v.begin(), v.end());\n  cout << "最大: " << *it << endl;\n\n  auto it2 = min_element(v.begin(), v.end());\n  cout << "最小: " << *it2 << endl;\n\n  sort(v.begin(), v.end());\n  cout << "排序后: ";\n  for (int x : v) cout << x << " ";\n  cout << endl;\n\n  cout << "第一: " << v[0] << " 最后: " << v[v.size()-1];\n}',
      expectedOutput: '最大: 12\n最小: 1\n排序后: 1 3 5 8 12 \n第一: 1 最后: 12',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'fill-in',
      prompt: '补全代码：用 min_element 找最小值',
      template: '#include <algorithm>\n#include <vector>\n\nint main() {\n  std::vector<int> v = {9, 1, 5};\n  auto it = std::____(v.begin(), v.____());\n  // *it 是 1\n}',
      answers: ['min_element', 'end'],
      hints: ['第一个空是找最小值的算法', '第二个空是结束迭代器'],
    },
    {
      type: 'type-it',
      instruction: '用 max_element 找最大值（空容器安全处理）：',
      code: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n  vector<int> v;\n  auto it = max_element(v.begin(), v.end());\n  if (it == v.end()) {\n    cout << "容器是空的";\n  }\n}',
      hints: [
        '空容器时 max_element 返回 end()',
        '一定要检查是否等于 end()',
        '如果不检查就 *it 会出问题',
      ],
    },
    {
      type: 'exposition',
      text: '**总结**：STL 算法的三个"更"：\n**更清晰**、**更安全**、**更通用**。\n从下一课开始，正式学习具体算法。',
    },
  ],
}

export default lesson
