import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'iterator-categories',
    chapter: 15,
    title: '迭代器分类',
    subtitle: '输入/输出/前向/双向/随机',
    description: '了解五种迭代器分类及其能力区别。',
    objectives: ['能说出五种迭代器分类', '能根据能力判断迭代器类型'],
    estimatedMinutes: 8,
  },
  blocks: [
    {
      type: 'exposition',
      text: '迭代器不只是"一种东西"——\nC++ 的迭代器有**五种分类**，\n每种能力不同，像游戏里的装备等级。',
    },
    {
      type: 'exposition',
      text: '能力从弱到强：\n`输入` → `输出` → `前向` → `双向` → `随机访问`。\n越靠右，能做的事越多。',
    },
    {
      type: 'exposition',
      text: '**输入迭代器**：只能**向前读**一次。\n像从键盘输入——读完了就没了。\n`cin` 的迭代器就是输入迭代器。',
      code: 'istream_iterator<int> it(cin);\nint x = *it;  // 读一个整数\n++it;         // 移到下一个',
    },
    {
      type: 'exposition',
      text: '**输出迭代器**：只能**向前写**一次。\n像往打印机输出——写了就不能改。\n`cout` 的迭代器就是输出迭代器。',
      code: 'ostream_iterator<int> it(cout, " ");\n*it = 42;  // 写入 42\n++it;      // 准备写下一个',
    },
    {
      type: 'exposition',
      text: '**前向迭代器**：可以**多次读取**，\n但只能**向前**走。\n`forward_list` 的迭代器就是这个。\n能读能写，但不能后退。',
    },
    {
      type: 'exposition',
      text: '**双向迭代器**：既能 `++` 向前，\n也能 `--` 向后。\n`list`、`set`、`map` 的迭代器都是双向的。',
      code: 'list<int> lst = {1, 2, 3};\nauto it = lst.begin();\n++it;  // 向前\n--it;  // 向后',
    },
    {
      type: 'exposition',
      text: '**随机访问迭代器**：最强能力——\n不仅能 `++` `--`，还能直接 `+n` `-n`、\n用 `[]` 下标、比大小。\n`vector` 和 `deque` 的迭代器就是随机访问。',
      code: 'vector<int> v = {10, 20, 30, 40};\nauto it = v.begin();\nit += 2;\ncout << it[1];\ncout << (it > v.begin());',
    },
    {
      type: 'multiple-choice',
      question: '回顾：`auto it = v.begin(); *it; ++it;` 中 `*it` 的作用是什么？',
      options: [
        { text: '获取迭代器指向的元素', correct: true, explanation: '*it 解引用，获取迭代器指向的元素值' },
        { text: '获取迭代器的地址', correct: false, explanation: '* 是解引用，不是取地址' },
        { text: '让迭代器前进', correct: false, explanation: '那是 ++it 的作用' },
        { text: '删除当前元素', correct: false, explanation: '* 只是读取值，不会删除' },
      ],
    },
    {
      type: 'exposition',
      text: '能力等级一览：\n`++`：所有迭代器都支持。\n`*it` 读：输入、前向、双向、随机支持。\n`*it =` 写：输出、前向、双向、随机支持。\n`--`：双向和随机支持。\n`it + n`：仅随机访问支持。',
    },
    {
      type: 'exposition',
      text: '最常用的迭代器是**双向**和**随机访问**。\n`list` 是双向，`vector` 是随机访问。\n算法的要求决定了它需要哪种迭代器。',
    },
    {
      type: 'multiple-choice',
      question: '以下哪个操作是**随机访问**迭代器独有的？',
      options: [
        { text: '++it', correct: false, explanation: '所有迭代器都支持 ++' },
        { text: '*it', correct: false, explanation: '读操作在很多迭代器上都支持' },
        { text: 'it + 5', correct: true, explanation: '只有随机访问迭代器支持直接加减整数' },
        { text: 'it != end()', correct: false, explanation: '比较不等是所有迭代器都支持的' },
      ],
    },
    {
      type: 'exposition',
      text: '掌握了一个容器是什么迭代器，\n就知道它支持哪些算法。\n比如 `sort` 需要随机访问迭代器——\n所以 `list` 不能直接用 `sort`。',
    },
    {
      type: 'multiple-choice',
      question: '回顾：`vector` 可以用 `[]` 下标访问，说明它提供什么迭代器？',
      options: [
        { text: '前向迭代器', correct: false, explanation: '前向迭代器只能 ++，不支持随机访问' },
        { text: '双向迭代器', correct: false, explanation: '双向迭代器只能 ++ 和 --，不支持下标' },
        { text: '随机访问迭代器', correct: true, explanation: 'vector 提供随机访问迭代器，支持下标和加减' },
        { text: '输入迭代器', correct: false, explanation: '输入迭代器只能读一次，不支持下标' },
      ],
    },
    {
      type: 'exposition',
      text: '给新手的建议：不需要背五种分类的细节。\n只需要知道：`vector` 的迭代器最强（随机访问），\n`list` 的迭代器只能前后走（双向），\n`forward_list` 只能往前走（前向）。',
    },
    {
      type: 'type-it',
      instruction: '验证不同类型容器的迭代器能力：',
      code: '#include <iostream>\n#include <vector>\n#include <list>\nusing namespace std;\n\nint main() {\n  vector<int> v = {1, 2, 3};\n  auto vit = v.begin();\n  cout << *(vit + 1) << endl;\n\n  list<int> lst = {1, 2, 3};\n  auto lit = lst.begin();\n  ++lit;\n  cout << *lit << endl;\n}',
      hints: [
        'vector 迭代器支持 +1 直接跳',
        'list 迭代器只能 ++ 一步步走',
        '两种容器的迭代器能力不同',
      ],
    },
    {
      type: 'exposition',
      text: '关键记忆：\n`vector` / `string` / `deque` → 随机访问\n`list` / `set` / `map` → 双向\n`forward_list` → 前向\n输入/输出迭代器 → 配合流使用',
    },
    {
      type: 'multiple-choice',
      question: '回顾：`v.push_back(1)` 中 push_back 的参数是什么？',
      options: [
        { text: '迭代器', correct: false, explanation: 'push_back 的参数是元素值，不是迭代器' },
        { text: '容器中元素类型的值', correct: true, explanation: 'push_back 接收一个元素值添加到尾部' },
        { text: '整数', correct: false, explanation: '不一定是整数，由 vector 元素类型决定' },
        { text: '下标位置', correct: false, explanation: 'push_back 总是在尾部添加，不需要下标' },
      ],
    },
    {
      type: 'exposition',
      text: '理解了迭代器分类，\n就能理解为什么有些算法不能用在某些容器上。\n下一课我们看**为什么要用算法**而不是手写循环。',
    },
  ],
}

export default lesson
