import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'what-is-stl',
    chapter: 14,
    title: 'STL 是什么',
    subtitle: '容器+算法+迭代器',
    description: '建立 C++ 标准模板库的整体心智模型。',
    objectives: ['能说出 STL 三大组成部分', '理解容器是什么'],
    estimatedMinutes: 8,
  },
  blocks: [
    {
      type: 'exposition',
      text: '从第 1 课到现在，你学了变量、函数、类、指针……\n你有没有想过：**别人写好的轮子**在哪里？\n比如"存一堆数据"——每次都自己写数组逻辑？太累了。',
    },
    {
      type: 'exposition',
      text: 'STL 就是 **Standard Template Library（标准模板库）**。\n它是 C++ 内置的"工具箱"——里面有各种**容器**、**算法**、**迭代器**。\n你不用自己造，拿来就用。',
      textAnimation: 'typewriter',
    },
    {
      type: 'concept-cards',
      instruction: 'STL 三大部件：',
      cards: [
        { glyph: '📦', term: '容器', meaning: '存数据的东西，比如 vector/map/set', example: 'vector<int> v;' },
        { glyph: '🔧', term: '算法', meaning: '对容器做操作，比如排序/查找', example: 'sort(v.begin(), v.end());' },
        { glyph: '👉', term: '迭代器', meaning: '像指针一样遍历容器的工具', example: 'v.begin() / v.end()' },
      ],
    },
    {
      type: 'exposition',
      text: '**容器**是存数据的地方。就像不同型号的收纳盒——\n有的能动态伸缩（vector）、有的能快速插入（list）、有的自动排序（set）。\n你按需求选就行。',
    },
    {
      type: 'exposition',
      text: '**算法**是对容器做的事。\n比如 `sort` 排序、`find` 查找、`count` 计数。\n算法不关心容器里是什么，只要提供了迭代器，就能工作。',
    },
    {
      type: 'exposition',
      text: '**迭代器**是连接容器和算法的"桥梁"。\n它像指针一样指向容器中的一个元素，\n`begin()` 指向第一个，`end()` 指向最后一个的后面。',
    },
    {
      type: 'concept-cards',
      instruction: '几个常用容器速览：',
      cards: [
        { glyph: '📐', term: 'vector', meaning: '动态数组，尾部插入快', example: 'vector<int> v; v.push_back(1);' },
        { glyph: '🔗', term: 'list', meaning: '双向链表，中间插入快', example: 'list<int> l; l.push_back(1);' },
        { glyph: '🌳', term: 'set', meaning: '有序集合，自动去重', example: 'set<int> s; s.insert(1);' },
        { glyph: '📖', term: 'map', meaning: '键值对字典，按名查值', example: 'map<string,int> m;' },
      ],
    },
    {
      type: 'type-it',
      instruction: '包含 <vector> 头文件并声明一个 vector：',
      code: '#include <iostream>\n#include <vector>\n\nint main() {\n  std::vector<int> nums;\n  nums.push_back(10);\n  std::cout << nums.size();\n}',
      hints: [
        '使用 vector 需要 #include <vector>',
        'vector 的类型写在尖括号里：vector<类型>',
        'push_back 在尾部添加元素',
      ],
    },
    {
      type: 'multiple-choice',
      question: 'STL 的三个组成部分是？',
      options: [
        { text: '容器、算法、迭代器', correct: true, explanation: 'STL 三大核心：容器存数据、算法处理数据、迭代器连接两者' },
        { text: '类、对象、函数', correct: false, explanation: '这是 OOP 的基本概念，不是 STL 独有的' },
        { text: '指针、引用、数组', correct: false, explanation: '这些都是语言本身的特性，不是 STL' },
        { text: '输入、输出、异常', correct: false, explanation: '输入输出是 iostream，不是 STL 的核心组成' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾：在 C++ 中使用别人的代码，可以通过什么方式？',
      options: [
        { text: '#include 包含头文件', correct: true, explanation: '包含标准库或第三方库的头文件，就能使用里面的功能' },
        { text: '全部自己写', correct: false, explanation: 'C++ 标准库提供大量现成工具，不需要从头造' },
        { text: '复制粘贴全部代码', correct: false, explanation: '应该包含头文件而不是复制代码' },
        { text: '用 import 关键字', correct: false, explanation: 'C++ 标准使用 #include，不是 import' },
      ],
    },
    {
      type: 'exposition',
      text: 'STL 中的容器分为两大类：\n**序列容器**——元素按顺序排列（vector、list、deque）\n**关联容器**——元素按键查找（set、map）。\n这一阶段我们就学这些容器的用法。',
    },
    {
      type: 'concept-cards',
      instruction: '序列 vs 关联容器：',
      cards: [
        { glyph: '📋', term: '序列容器', meaning: '元素有序排列，按位置访问', example: 'vector / list / deque' },
        { glyph: '🔑', term: '关联容器', meaning: '元素按键访问，自动排序或哈希', example: 'set / map / unordered_set' },
      ],
    },
    {
      type: 'type-it',
      instruction: '输入代码：包含 list 头文件并声明：',
      code: '#include <iostream>\n#include <list>\n\nint main() {\n  std::list<int> myList;\n  myList.push_back(5);\n  myList.push_front(1);\n}',
      hints: [
        'list 的头文件是 <list>',
        'list 支持 push_front（头部插入）',
        'push_back 和 push_front 都是成员函数',
      ],
    },
    {
      type: 'multiple-choice',
      question: 'STL 中迭代器的作用是什么？',
      options: [
        { text: '连接容器和算法之间的桥梁', correct: true, explanation: '迭代器让算法不依赖容器具体实现，只要提供迭代器就能操作' },
        { text: '直接存储数据', correct: false, explanation: '存数据是容器的事，迭代器只负责访问' },
        { text: '编译代码', correct: false, explanation: '编译是编译器的事' },
        { text: '管理内存分配', correct: false, explanation: '容器内部处理内存，迭代器只负责遍历' },
      ],
    },
    {
      type: 'exposition',
      text: '一句话总结：\n**STL 是 C++ 给你的"乐高套装"**——\n你不用从零造轮子，选合适的零件拼一起就行。\n接下来几课，我们逐一认识每个容器。',
    },
    {
      type: 'multiple-choice',
      question: '在 STL 中，vector、list、deque 属于哪一类容器？',
      options: [
        { text: '序列容器', correct: true, explanation: '它们都是按顺序存放元素的序列容器' },
        { text: '关联容器', correct: false, explanation: '关联容器是 set、map 这类按键查找的容器' },
        { text: '容器适配器', correct: false, explanation: 'stack 和 queue 是容器适配器' },
        { text: '无序容器', correct: false, explanation: '无序容器是 unordered_set、unordered_map' },
      ],
    },
    {
      type: 'type-it',
      instruction: '包含 <set> 头文件并声明 set：',
      code: '#include <iostream>\n#include <set>\n\nint main() {\n  std::set<int> s;\n  s.insert(3);\n  s.insert(1);\n  s.insert(2);\n  for (int x : s) {\n    std::cout << x << " ";\n  }\n}',
      hints: [
        'set 自动升序排列',
        '输出是 1 2 3，不是插入顺序',
        'set 不允许重复元素',
      ],
    },
    {
      type: 'type-it',
      instruction: '包含 <map> 头文件并声明 map：',
      code: '#include <iostream>\n#include <map>\n#include <string>\n\nint main() {\n  std::map<std::string, int> scores;\n  scores["Alice"] = 95;\n  scores["Bob"] = 87;\n  std::cout << scores["Alice"] << "\\n";\n}',
      hints: [
        'map 头文件是 <map>',
        '键是 string，值是 int',
        '用 [] 可以按键取值',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾：为什么 C++ 有了数组还要有 STL 容器？',
      options: [
        { text: '数组更快', correct: false, explanation: '数组大小固定，不能自动扩容，STL 容器更灵活' },
        { text: 'STL 容器更灵活、更安全、自动管理内存', correct: true, explanation: '容器自动扩容，有丰富的成员函数，边界检查（at()）等' },
        { text: '数组不能存整数', correct: false, explanation: '数组可以存整数' },
        { text: '没有区别', correct: false, explanation: '区别很大，STL 容器提供了大量现成的功能' },
      ],
    },
    {
      type: 'exposition',
      text: 'STL 中还有一个重要的概念：**头文件**。\n每个容器都有自己的头文件：\n`<vector>`、`<list>`、`<deque>`、`<set>`、`<map>`、`<unordered_set>`、`<unordered_map>`、`<stack>`、`<queue>`。\n用哪个容器就包含哪个头文件。',
    },
    {
      type: 'exposition',
      text: '准备好了吗？从最常用的 `vector` 开始。',
    },
  ],
}

export default lesson
