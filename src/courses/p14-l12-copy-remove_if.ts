import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'copy-remove_if',
    chapter: 15,
    title: 'copy 和 remove_if',
    subtitle: '条件删除和复制',
    description: '学会用 copy 复制元素和 remove_if 条件删除。',
    objectives: ['能用 copy 复制容器', '能用 remove_if 条件删除', '理解 erase-remove 惯用法'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '`copy` 把范围中的元素**复制**到目标位置。\n参数：源起始、源结束、目标起始。\n和 `transform` 类似，但 `copy` 不做变换，只原样复制。',
      code: '#include <algorithm>\n\nvector<int> src = {1, 2, 3, 4};\nvector<int> dst(4);\n\ncopy(src.begin(), src.end(), dst.begin());\n// dst = {1, 2, 3, 4}',
    },
    {
      type: 'exposition',
      text: '`copy` 也可以搭配 `back_inserter`，\n不需要目标容器预先分配空间：\n`copy(src.begin(), src.end(), back_inserter(dst));`',
    },
    {
      type: 'type-it',
      instruction: '用 copy 复制一个 vector：',
      code: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n  vector<int> src = {10, 20, 30};\n  vector<int> dst;\n\n  copy(src.begin(), src.end(), back_inserter(dst));\n\n  for (int x : dst) {\n    cout << x << " ";\n  }\n}',
      hints: [
        'copy 需要源范围加目标起始',
        'back_inserter 自动追加元素',
        'dst 是 src 的完整复制',
      ],
    },
    {
      type: 'exposition',
      text: '`remove_if` 把**不满足条件的元素移到前面**。\n注意：它不删除元素，只是重新排列。\n返回值指向"新范围"的末尾。',
      code: 'vector<int> v = {1, 2, 3, 4, 5, 6};\nauto new_end = remove_if(v.begin(), v.end(), [](int x) {\n  return x % 2 == 0;  // 移除偶数\n});\n// v 的内容变成了 {1, 3, 5, ?, ?, ?}\n// new_end 指向新逻辑末尾',
    },
    {
      type: 'exposition',
      text: '`remove_if` 返回**新的逻辑末尾**迭代器。\n原来的物理容器大小不变，后面的元素"作废"。\n要真正删除，需要配合 `erase`：\n`v.erase(new_end, v.end());`',
      code: 'vector<int> v = {1, 2, 3, 4, 5, 6};\nauto new_end = remove_if(v.begin(), v.end(), [](int x) {\n  return x % 2 == 0;\n});\nv.erase(new_end, v.end());\n// v = {1, 3, 5}',
    },
    {
      type: 'type-it',
      instruction: 'remove_if + erase 删除所有偶数：',
      code: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n  vector<int> v = {1, 2, 3, 4, 5, 6};\n  auto new_end = remove_if(v.begin(), v.end(), [](int x) {\n    return x % 2 == 0;\n  });\n  v.erase(new_end, v.end());\n\n  for (int x : v) {\n    cout << x << " ";\n  }\n}',
      hints: [
        'remove_if 只移动元素，不删除',
        'erase 真正删除 "作废" 的元素',
        '这个模式叫做 erase-remove 惯用法',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾：`transform` 和 `copy` 的主要区别？',
      options: [
        { text: 'transform 可以变换元素，copy 原样复制', correct: true, explanation: 'transform 做映射变换，copy 原样复制' },
        { text: '没有区别', correct: false, explanation: '两者功能不同' },
        { text: 'copy 只能用于 vector', correct: false, explanation: 'copy 可用于任何容器' },
        { text: 'transform 不能配合 back_inserter', correct: false, explanation: '两者都可以配合 back_inserter' },
      ],
    },
    {
      type: 'exposition',
      text: '`copy_if` 是带条件的复制——\n只复制满足条件的元素。\n类似 `remove_if` 的逆操作。\n`copy_if` 保留原容器不变，只复制符合条件的元素。',
      code: 'vector<int> src = {1, 2, 3, 4, 5};\nvector<int> dst;\n\ncopy_if(src.begin(), src.end(), back_inserter(dst), [](int x) {\n  return x % 2 == 0;  // 只复制偶数\n});\n// dst = {2, 4}',
    },
    {
      type: 'type-it',
      instruction: '用 copy_if 复制所有大于 3 的元素：',
      code: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n  vector<int> src = {2, 5, 3, 8, 1};\n  vector<int> dst;\n\n  copy_if(src.begin(), src.end(), back_inserter(dst), [](int x) {\n    return x > 3;\n  });\n\n  for (int x : dst) {\n    cout << x << " ";\n  }\n}',
      hints: [
        'copy_if 的第四个参数是条件 lambda',
        '只有满足条件的元素被复制',
        '结果是 {5, 8}',
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全代码：用 copy 复制容器',
      template: '#include <algorithm>\n#include <vector>\n\nint main() {\n  std::vector<int> src = {4, 5, 6};\n  std::vector<int> dst;\n  std::____(src.begin(), src.end(), std::____(dst));\n}',
      answers: ['copy', 'back_inserter'],
      hints: ['第一个空是复制算法', '第二个空是尾部插入迭代器适配器'],
    },
    {
      type: 'exposition',
      text: '**erase-remove 惯用法**是 C++ 中的经典模式：\n1. `remove_if` 把要删除的元素移到后面\n2. 它返回新的逻辑末尾\n3. `erase` 真正删除后面的元素\n记住这个三部曲。',
    },
    {
      type: 'type-it',
      instruction: '用 erase-remove 删除所有等于 0 的元素：',
      code: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n  vector<int> v = {1, 0, 3, 0, 5};\n  auto new_end = remove(v.begin(), v.end(), 0);\n  v.erase(new_end, v.end());\n\n  for (int x : v) {\n    cout << x << " ";\n  }\n}',
      hints: [
        'remove 删除特定值，remove_if 按条件',
        'remove 也是只移动，需要 erase 配合',
        '结果是 {1, 3, 5}',
      ],
    },
    {
      type: 'code-runner',
      instruction: '运行程序，观察 copy 和 remove_if 的组合：',
      code: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n  vector<int> data = {3, 7, 1, 7, 4, 7, 2};\n\n  // 复制所有元素\n  vector<int> copy_all;\n  copy(data.begin(), data.end(), back_inserter(copy_all));\n  cout << "复制全部: ";\n  for (int x : copy_all) cout << x << " ";\n  cout << endl;\n\n  // 复制大于 3 的元素\n  vector<int> copy_big;\n  copy_if(data.begin(), data.end(), back_inserter(copy_big), [](int x) {\n    return x > 3;\n  });\n  cout << "大于 3: ";\n  for (int x : copy_big) cout << x << " ";\n  cout << endl;\n\n  // 在原容器上删除 7\n  auto new_end = remove(data.begin(), data.end(), 7);\n  data.erase(new_end, data.end());\n  cout << "删除 7 后: ";\n  for (int x : data) cout << x << " ";\n  cout << endl;\n}',
      expectedOutput: '复制全部: 3 7 1 7 4 7 2 \n大于 3: 7 7 4 7 \n删除 7 后: 3 1 4 2',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'fill-in',
      prompt: '补全代码：删除所有小于 0 的元素',
      template: '#include <algorithm>\n#include <vector>\n\nint main() {\n  std::vector<int> v = {-1, 2, -3, 4};\n  auto new_end = std::____(v.begin(), v.end(), [](int x) {\n    return x ____ 0;\n  });\n  v.erase(new_end, v.end());\n  // v = {2, 4}\n}',
      answers: ['remove_if', '<'],
      hints: ['第一个空是条件删除算法', '第二个空是比较运算符，表示小于'],
    },
    {
      type: 'multiple-choice',
      question: '回顾：`remove_if` 返回什么？',
      options: [
        { text: '被删除元素的个数', correct: false, explanation: 'remove_if 返回迭代器，不是数字' },
        { text: '新逻辑末尾的迭代器', correct: true, explanation: 'remove_if 返回指向新范围末尾的迭代器' },
        { text: 'bool 表示是否删除了元素', correct: false, explanation: 'remove_if 总是返回迭代器' },
        { text: '被删除的元素值', correct: false, explanation: 'remove_if 返回迭代器，不是值' },
      ],
    },
    {
      type: 'exposition',
      text: '**核心总结**：\n- `copy`：原样复制到目标\n- `copy_if`：条件复制\n- `remove`：删除特定值（移动）\n- `remove_if`：条件删除（移动）\n- `erase`：真正从容器删除',
    },
    {
      type: 'code-runner',
      instruction: '运行程序：综合运用 copy_if 和 remove_if：',
      code: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n  vector<int> grades = {55, 78, 92, 48, 63, 88, 71};\n\n  // 复制及格成绩\n  vector<int> passed;\n  copy_if(grades.begin(), grades.end(), back_inserter(passed), [](int x) {\n    return x >= 60;\n  });\n  cout << "及格: ";\n  for (int x : passed) cout << x << " ";\n  cout << endl;\n\n  // 在原容器中删除不及格\n  auto new_end = remove_if(grades.begin(), grades.end(), [](int x) {\n    return x < 60;\n  });\n  grades.erase(new_end, grades.end());\n  cout << "删除后: ";\n  for (int x : grades) cout << x << " ";\n  cout << endl;\n}',
      expectedOutput: '及格: 78 92 63 88 71 \n删除后: 78 92 63 88 71',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'multiple-choice',
      question: '回顾：`[=]` 和 `[&]` 在 lambda 中的区别？',
      options: [
        { text: '[=] 值捕获，[&] 引用捕获', correct: true, explanation: '[=] 按值拷贝，[&] 按引用捕获' },
        { text: '[=] 引用捕获，[&] 值捕获', correct: false, explanation: '搞反了' },
        { text: '两者一样', correct: false, explanation: '功能完全不同' },
        { text: '不能同时使用', correct: false, explanation: '可以混合使用如 [=, &x]' },
      ],
    },
    {
      type: 'exposition',
      text: '`copy` 和 `remove_if` 是处理数据的核心工具。\n下一课学**算法流水线**——\n把多个算法串起来完成复杂任务。',
    },
  ],
}

export default lesson
