import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'nullptr-modern',
    chapter: 16,
    title: 'nullptr 类型安全',
    subtitle: '为什么用 nullptr 不是 NULL',
    description: '理解 nullptr 相比 NULL 的类型安全性，掌握现代 C++ 的空指针写法。',
    objectives: ['能用 nullptr 初始化指针', '理解 nullptr_t 类型', '知道 NULL 和 0 的问题'],
    estimatedMinutes: 8,
  },
  blocks: [
    {
      type: 'exposition',
      text: '在 C++11 之前，C++ 用 `NULL` 或 `0` 表示空指针。\n但这有一个问题：`NULL` 本质上是整数 0，\n不是真正的指针类型。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '`NULL` 的问题：\n它被定义为 `0` 或 `((void*)0)`。\n在 C++ 中，`0` 是整数，会导致**类型混淆**。\n比如重载函数调用时可能选错版本。',
      code: '#include <iostream>\nusing namespace std;\n\nvoid func(int x) {\n  cout << "int: " << x << endl;\n}\n\nvoid func(char* p) {\n  cout << "ptr: " << p << endl;\n}\n\nint main() {\n  func(0);      // 调用 func(int)，因为 0 是整数\n  func(NULL);   // NULL 也是 0！还是调用 func(int) ❌\n  func(nullptr); // ✅ 正确调用 func(char*)\n}',
    },
    {
      type: 'type-it',
      instruction: '观察 NULL 和 nullptr 在重载中的区别：',
      code: '#include <iostream>\nusing namespace std;\n\nvoid show(int x) {\n  cout << "int: " << x << endl;\n}\n\nvoid show(void* p) {\n  cout << "ptr" << endl;\n}\n\nint main() {\n  show(nullptr);\n}',
      hints: [
        'nullptr 有 std::nullptr_t 类型',
        '编译器会匹配到 void* 版本',
        '而 NULL 会匹配 int 版本',
      ],
    },
    {
      type: 'exposition',
      text: '`nullptr` 的类型是 `std::nullptr_t`。\n它可以隐式转换为任何**指针类型**和**成员指针类型**，\n但不能转换为整数。这就解决了类型安全问题。',
      code: 'int* p1 = nullptr;      // ✅ nullptr → int*\nchar* p2 = nullptr;     // ✅ nullptr → char*\nvoid* p3 = nullptr;     // ✅ nullptr → void*\n\nauto p = nullptr;        // p 是 std::nullptr_t\nint x = nullptr;         // ❌ 不能隐式转换为 int\n\nbool b = nullptr;        // ✅ 可以转为 bool（false）',
    },
    {
      type: 'type-it',
      instruction: 'nullptr 的类型安全和隐式转换：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int* p = nullptr;\n  double* q = nullptr;\n  \n  if (p == q) {\n    cout << "空指针相等" << endl;\n  }\n  \n  // nullptr 可以比较\n  if (nullptr == nullptr) {\n    cout << "nullptr 自等" << endl;\n  }\n}',
      hints: [
        'nullptr 可以赋给任何指针类型',
        '空指针之间比较结果为 true',
        'nullptr 有明确的类型，不是整数',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾 p05-06：对空指针解引用会发生什么？',
      options: [
        { text: '返回 0', correct: false, explanation: '会崩溃，不是返回值' },
        { text: '程序崩溃', correct: true, explanation: '解引用空指针是未定义行为，通常导致崩溃' },
        { text: '什么也不发生', correct: false, explanation: '这是严重错误' },
        { text: '自动分配内存', correct: false, explanation: '不会自动分配' },
      ],
    },
    {
      type: 'exposition',
      text: '现代 C++ 规则：\n- **声明指针时用 `nullptr` 初始化**\n- 检查指针是否有效用 `if (ptr)` 或 `if (ptr != nullptr)`\n- **不再使用 `NULL` 或 `0`** 表示空指针',
      code: '// ✅ 现代 C++\nint* ptr = nullptr;\n\nif (ptr) {\n  // ptr 有效\n}\n\n// ❌ 旧式写法\nint* old = NULL;   // 不推荐\nint* bad = 0;      // 不推荐',
    },
    {
      type: 'type-it',
      instruction: '用 nullptr 初始化和检查：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int* ptr = nullptr;\n  \n  if (ptr == nullptr) {\n    cout << "ptr 是空指针" << endl;\n  }\n  \n  int x = 42;\n  ptr = &x;\n  \n  if (ptr != nullptr) {\n    cout << "ptr 指向: " << *ptr << endl;\n  }\n}',
      hints: [
      '先初始化为 nullptr，再赋值有效地址',
      'if (ptr != nullptr) 检查指针有效性',
      '也可以简写为 if (ptr)',
      ],
    },
    {
      type: 'multiple-choice',
      question: 'nullptr 的类型是什么？',
      options: [
        { text: 'int', correct: false, explanation: 'nullptr 不是整数类型' },
        { text: 'void*', correct: false, explanation: '不同于 C 的 (void*)0' },
        { text: 'std::nullptr_t', correct: true, explanation: 'nullptr 的类型是 std::nullptr_t' },
        { text: 'int*', correct: false, explanation: 'nullptr 本身不是指针，但可以转为任意指针' },
      ],
    },
    {
      type: 'exposition',
      text: '`nullptr` 可以用于模板和 auto：\n`auto p = nullptr;` 推导出 `std::nullptr_t`。\n模板中 `nullptr` 也保持类型安全。',
      code: 'auto p = nullptr;  // p 是 std::nullptr_t\n\n// 在模板中\nvoid* f() {\n  return nullptr;  // 隐式转换为 void*\n}\n\ntemplate<typename T>\nT getNull() {\n  return T(nullptr);  // 构造 T 的空值\n}\n\nint* q = getNull<int*>();',
    },
    {
      type: 'type-it',
      instruction: 'nullptr 和模板的结合使用：',
      code: '#include <iostream>\nusing namespace std;\n\ntemplate<typename T>\nT* createNull() {\n  return nullptr;\n}\n\nint main() {\n  auto p = createNull<int>();\n  if (p == nullptr) {\n    cout << "p 是空指针" << endl;\n  }\n}',
      hints: [
        '模板函数返回 nullptr，类型安全',
        'auto 推导为 int*',
        'nullptr 可以返回给任意指针类型',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾 p05-06：在空指针前应该做什么？',
      options: [
        { text: '直接解引用', correct: false, explanation: '解引用空指针是未定义行为' },
        { text: '先检查是否为 nullptr', correct: true, explanation: '解引用前必须检查指针是否有效' },
        { text: '赋值 0', correct: false, explanation: '赋值不能解决空指针问题' },
        { text: '什么都不做', correct: false, explanation: '不能忽略空指针检查' },
      ],
    },
    {
      type: 'exposition',
      text: '`nullptr` 在类中的使用：\n可以用 `nullptr` 初始化类中的指针成员。\n也可以用于继承体系中的空基类指针。',
      code: 'class Node {\npublic:\n  int data;\n  Node* next = nullptr;  // 默认空\n  Node* prev = nullptr;\n  \n  Node(int val) : data(val) {}\n};\n\n// 链表判空\nNode* head = nullptr;\n\n// 添加节点\nvoid pushFront(Node*& head, int val) {\n  Node* newNode = new Node(val);\n  newNode->next = head;\n  head = newNode;\n}',
    },
    {
      type: 'type-it',
      instruction: '用 nullptr 初始化链表节点：',
      code: '#include <iostream>\nusing namespace std;\n\nstruct Node {\n  int data;\n  Node* next = nullptr;\n};\n\nint main() {\n  Node* head = new Node{1};\n  head->next = new Node{2};\n  head->next->next = new Node{3};\n  \n  Node* cur = head;\n  while (cur != nullptr) {\n    cout << cur->data << " ";\n    cur = cur->next;\n  }\n  cout << endl;\n}',
      hints: [
        'Node::next 用 nullptr 初始化',
        'while (cur != nullptr) 遍历链表',
        'cur = cur->next 移动到下一个节点',
      ],
    },
    {
      type: 'multiple-choice',
      question: '以下代码哪个是安全的指针使用？',
      options: [
        { text: 'int* p = nullptr; *p = 5;', correct: false, explanation: '解引用空指针崩溃' },
        { text: 'int* p = nullptr; if(p) *p = 5;', correct: false, explanation: 'p 是 null，if(p) 为 false，不执行' },
        { text: 'int* p = new int(5); delete p; p = nullptr;', correct: true, explanation: 'delete 后置 nullptr 是安全做法' },
        { text: 'int* p; *p = 5;', correct: false, explanation: '未初始化的指针解引用危险' },
      ],
    },
    {
      type: 'exposition',
      text: '**最佳实践总结**：\n1. 用 `nullptr` 而不是 `NULL` 或 `0`\n2. 声明指针时用 `nullptr` 初始化\n3. 解引用前检查 `if (ptr)`\n4. `delete` 后置指针为 `nullptr`',
    },
    {
      type: 'type-it',
      instruction: '综合练习：安全的指针使用模式：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int* ptr = nullptr;\n  \n  cout << "ptr 是: " << (ptr ? "非空" : "空") << endl;\n  \n  ptr = new int(42);\n  cout << "ptr 指向: " << *ptr << endl;\n  \n  delete ptr;\n  ptr = nullptr;\n  \n  if (ptr == nullptr) {\n    cout << "已安全释放" << endl;\n  }\n}',
      hints: [
        '用 nullptr 初始化指针',
        'delete 后置 nullptr 避免悬空指针',
        'if (ptr) 或 if (ptr == nullptr) 做检查',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾 p05-03：声明指针变量时用什么符号？',
      options: [
        { text: '&', correct: false, explanation: '& 是取地址符' },
        { text: '*', correct: true, explanation: 'int* p 中的 * 表示声明指针' },
        { text: '->', correct: false, explanation: '-> 是成员访问符' },
        { text: '::', correct: false, explanation: ':: 是作用域运算符' },
      ],
    },
    {
      type: 'exposition',
      text: '总结：\n`nullptr` 解决了 C++ 中长期存在的"NULL 是整数"的问题。\n它是类型安全的，有独立的类型 `std::nullptr_t`。\n**从今天起写 C++ 永远用 `nullptr`。**',
      textAnimation: 'typewriter',
    },
  ],
}

export default lesson
