import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'nullptr',
    chapter: 6,
    title: '空指针——不指向任何东西',
    subtitle: '指针无目标',
    description: '学习用 nullptr 表示指针当前没有指向任何变量，以及空指针的安全检查。',
    objectives: ['能用 nullptr 初始化指针', '能在解引用前检查空指针', '理解空指针解引用的危险'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '有时候你声明了一个指针，但**暂时没有要指向的变量**。\n这时候该给它存什么？用 `nullptr`。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '`nullptr` 是 C++11 引入的关键字，表示**"空指针"**——\n这个指针当前不指向任何变量。',
      code: 'int* p = nullptr;  // p 现在是空的，没有指向任何 int',
    },
    {
      type: 'concept-cards',
      instruction: '空指针相关概念：',
      cards: [
        { glyph: '🚫', term: 'nullptr', meaning: '空指针，不指向任何东西', example: 'int* p = nullptr;' },
        { glyph: '⚠️', term: '解引用空指针', meaning: '对 nullptr 用 * 会崩溃', example: '*p → 程序崩溃' },
        { glyph: '✅', term: '判空检查', meaning: '用 if(p) 判断指针是否有效', example: 'if (p) { *p = 5; }' },
      ],
    },
    {
      type: 'exposition',
      text: '为什么需要空指针？\n1. **初始化**：声明指针时给个安全默认值\n2. **标记无效**：表示"这个指针目前没有目标"\n3. **安全检查**：用之前判断一下是否为 nullptr',
    },
    {
      type: 'type-it',
      instruction: '敲这段代码——用 nullptr 初始化指针：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int* p = nullptr;\n  cout << "p 是空指针" << endl;\n  cout << "p 的值: " << p << endl;\n}',
      hints: ['`int* p = nullptr` 声明空指针', '输出 p 显示 0（nullptr 的数值）', '不要对 p 解引用，会崩溃'],
    },
    {
      type: 'multiple-choice',
      question: '复习上一课：`int* p;` 中的 `*` 是哪种含义？',
      options: [
        { text: '解引用', correct: false, explanation: '在声明中不是解引用' },
        { text: '声明指针类型', correct: true, explanation: 'int* p 表示 p 是一个 int 指针' },
        { text: '乘法', correct: false, explanation: '这里没有乘法' },
        { text: '取地址', correct: false, explanation: '取地址用 & 运算符' },
      ],
    },
    {
      type: 'exposition',
      text: '**千万不要解引用空指针！**\n这会导致程序崩溃（段错误）。',
      code: 'int* p = nullptr;\ncout << *p;   // ❌ 程序崩溃！p 没有指向有效内存',
    },
    {
      type: 'exposition',
      text: '解引用前要检查指针是否为 `nullptr`：',
      code: 'int* p = nullptr;\n\nif (p != nullptr) {\n  cout << *p;   // 安全：只有 p 有效才解引用\n} else {\n  cout << "指针为空";\n}',
    },
    {
      type: 'type-it',
      instruction: '敲这段代码——安全地检查空指针：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int* p = nullptr;\n  if (p != nullptr) {\n    cout << *p << endl;\n  } else {\n    cout << "指针是空的，不能解引用" << endl;\n  }\n}',
      hints: ['`if (p != nullptr)` 判断是否为空', '为空就不解引用', '程序不会崩溃，因为跳过了解引用'],
    },
    {
      type: 'multiple-choice',
      question: '以下哪段代码是安全的？',
      options: [
        { text: '`int* p = nullptr; cout << *p;`', correct: false, explanation: '对空指针解引用会崩溃' },
        { text: '`int* p = nullptr; if(p) cout << *p;`', correct: true, explanation: '检查指针非空后才解引用' },
        { text: '`int* p; cout << *p;`', correct: false, explanation: '未初始化的指针解引用同样危险' },
        { text: '`int* p = nullptr; *p = 5;`', correct: false, explanation: '解引用空指针赋值也会崩溃' },
      ],
    },
    {
      type: 'exposition',
      text: '`if (p)` 和 `if (p != nullptr)` 是等价的：\n- `p` 不是 nullptr → 条件为 true\n- `p` 是 nullptr → 条件为 false',
    },
    {
      type: 'type-it',
      instruction: '用 if(p) 简化写法来检查空指针：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int x = 100;\n  int* p = &x;\n  if (p) {\n    cout << "p 指向的值: " << *p << endl;\n  }\n}',
      hints: ['`if (p)` 等价于 `if (p != nullptr)`', 'p 指向 x，所以条件为 true', '输出 *p 得到 100'],
    },
    {
      type: 'exposition',
      text: '**旧式写法**：你可能在旧代码中看到 `NULL` 或 `0`。',
      code: 'int* p = NULL;   // C 风格，不推荐\nint* q = 0;       // 不推荐\nint* r = nullptr; // ✅ 现代 C++ 推荐',
    },
    {
      type: 'exposition',
      text: '`nullptr` 比 `NULL` 和 `0` 更安全，\n因为它有**自己的类型** `nullptr_t`，不会和整数混淆。',
    },
    {
      type: 'multiple-choice',
      question: '回忆阶段 3：while 循环中以下哪个是正确的条件写法？',
      options: [
        { text: 'while (x = 5)', correct: false, explanation: '= 是赋值，不是比较。条件应该用 ==' },
        { text: 'while (x == 5)', correct: true, explanation: '== 是比较运算符，判断是否相等' },
        { text: 'while (x != 5)', correct: false, explanation: '!= 判断不等，题目没说具体需求' },
        { text: 'while {x > 0}', correct: false, explanation: '条件必须放在圆括号 () 中' },
      ],
    },
    {
      type: 'exposition',
      text: '记住：\n1. 指针声明时用 `nullptr` 初始化\n2. 解引用前用 `if (p)` 检查\n3. 绝对不要对空指针解引用',
    },
    {
      type: 'type-it',
      instruction: '敲一个综合练习——空指针检查 + 解引用：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int* p = nullptr;\n  int score = 90;\n  p = &score;\n  if (p) {\n    cout << "分数: " << *p << endl;\n  }\n}',
      hints: ['先声明 nullptr，再赋有效地址', '`if (p)` 检查指针是否有效', '`*p` 输出 score 的值 90'],
    },
    {
      type: 'exposition',
      text: '下一课：**引用**——一个完全不同但和指针容易混淆的概念。',
    },
  ],
}

export default lesson
