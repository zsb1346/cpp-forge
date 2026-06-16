import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'template-compilation-model',
    chapter: 13,
    title: '模板为什么写在 .h 里',
    subtitle: '实例化时机问题',
    description: '理解模板必须在头文件中定义的原因——实例化发生在编译期，需要完整定义可见，不能像普通函数那样分离声明和实现。',
    objectives: ['能解释模板为什么不能分离编译', '理解实例化时机对文件组织的影响', '能正确组织模板代码'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '普通函数可以这样组织：\n- `.h` 头文件放声明\n- `.cpp` 源文件放实现\n- 链接器把它们连起来\n\n**但模板不行。**',
      code: '// max.h —— 声明\nint max(int a, int b);\n\n// max.cpp —— 实现\nint max(int a, int b) {\n  return a > b ? a : b;\n}\n\n// main.cpp —— 使用\n#include "max.h"\nint main() { max(3, 7); }',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '如果模板也这样分文件：',
      code: '// max_template.h —— 声明\ntemplate<typename T>\nT max(T a, T b);\n\n// max_template.cpp —— 实现\ntemplate<typename T>\nT max(T a, T b) {\n  return a > b ? a : b;\n}\n\n// main.cpp —— 使用\n#include "max_template.h"\nint main() { max(3, 7); }  // ❌ 链接错误！',
    },
    {
      type: 'concept-cards',
      instruction: '分离编译失败的原因：',
      cards: [
        { glyph: '⏰', term: '实例化时机', meaning: '使用模板时（编译期）就需要完整定义', example: '编译器需要看到完整函数体' },
        { glyph: '🔗', term: '链接器看不到模板', meaning: '链接时模板信息已不存在', example: '只有实例化后的具体函数' },
        { glyph: '📂', term: '解决方式', meaning: '把模板定义放在头文件中', example: '声明和实现在同一个 .h 文件' },
      ],
    },
    {
      type: 'exposition',
      text: '为什么编译器需要看到完整定义？\n当 `main.cpp` 调用 `max(3, 7)` 时，编译器必须在**当前编译单元**中生成 `int max(int,int)`。\n如果只有声明没有定义，编译器无法生成代码——它没法去别的 .cpp 文件里找。',
    },
    {
      type: 'multiple-choice',
      question: '回顾 03：模板实例化时编译器做了什么？',
      options: [
        { text: '在运行时生成代码', correct: false, explanation: '实例化在编译期' },
        { text: '用具体类型替换 T，生成完整函数', correct: true, explanation: '编译器根据模板+"蓝图"生成具体函数' },
        { text: '等待链接器处理', correct: false, explanation: '链接器不处理模板实例化' },
        { text: '生成一个通用的函数', correct: false, explanation: '没有"通用函数"，每个类型都是独立的' },
      ],
    },
    {
      type: 'exposition',
      text: '正确做法：**全部放在头文件中**。\n把模板的定义直接放在 .h 文件里，使用时 `#include` 就能看到完整代码。',
      code: '// max.h\ntemplate<typename T>\nT max(T a, T b) {        // 定义放在头文件\n  return a > b ? a : b;\n}\n\n// main.cpp\n#include "max.h"          // 包含完整定义\nint main() {\n  max(3, 7);              // 实例化成功\n}',
    },
    {
      type: 'concept-cards',
      instruction: '模板代码组织方案：',
      cards: [
        { glyph: '📄', term: '方式一：全在 .h', meaning: '声明和实现都写在头文件', example: '最常见、最简单' },
        { glyph: '📁', term: '方式二：.hpp 文件', meaning: '用 .hpp 后缀表示含模板实现', example: '模板专用头文件' },
        { glyph: '📎', term: '方式三：.tpp 分离', meaning: '声明在 .h，实现在 .tpp，最后 #include', example: '大型库使用的方式' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾 02-03：编译器在实例化函数模板时需要看到什么？',
      options: [
        { text: '只需要看到声明', correct: false, explanation: '只有声明无法实例化' },
        { text: '需要看到完整定义（函数体）', correct: true, explanation: '编译器需要知道 T 在函数体里怎么用' },
        { text: '需要看到注释', correct: false, explanation: '注释不影响编译' },
        { text: '不需要看到任何东西', correct: false, explanation: '编译器必须看到模板才能实例化' },
      ],
    },
    {
      type: 'exposition',
      text: '例外情况：如果只在当前 .cpp 文件中使用某个类型的实例化，可以在 .cpp 中定义模板。\n但一旦需要跨文件使用，就必须进头文件。',
    },
    {
      type: 'type-it',
      instruction: '输入正确组织的模板代码（声明和实现在同一头文件）：',
      code: '#ifndef MATH_UTILS_H\n#define MATH_UTILS_H\n\ntemplate<typename T>\nT max(T a, T b) {\n  return a > b ? a : b;\n}\n\n#endif',
      hints: [
        '#ifndef 头文件保护，防止重复包含',
        'max 的完整定义在头文件中',
        '使用者 #include "math_utils.h" 即可',
      ],
    },
    {
      type: 'exposition',
      text: '另一种方案：使用 `export` 关键字（C++98 引入，C++11 移除）。\nexport 原本想解决分离编译问题，但实现太复杂，已经被废弃。\n所以今天所有 C++ 模板都放在头文件中。',
    },
    {
      type: 'multiple-choice',
      question: '回顾 13：在依赖类型名前加 typename 的目的是什么？',
      options: [
        { text: '告诉编译器这是一个类型，不是静态成员', correct: true, explanation: 'typename 消除歧义' },
        { text: '让代码更美观', correct: false, explanation: '美观不是目的' },
        { text: '让编译器运行更快', correct: false, explanation: '不影响编译速度' },
        { text: '代替 class 关键字', correct: false, explanation: '这里不能用 class 代替 typename' },
      ],
    },
    {
      type: 'type-it',
      instruction: '输入一个完整的头文件（包含类模板）：',
      code: '#ifndef BOX_H\n#define BOX_H\n\ntemplate<typename T>\nclass Box {\n  T value;\npublic:\n  void set(T v) { value = v; }\n  T get() const { return value; }\n};\n\n#endif',
      hints: [
        '模板类 Box 完整定义在头文件中',
        '#ifndef / #define / #endif 防止重复包含',
        '使用方 #include "Box.h" 即可用 Box<int>',
      ],
    },
    {
      type: 'multiple-choice',
      question: '以下关于模板编译模型的描述哪个正确？',
      options: [
        { text: '模板可以像普通函数一样分离声明和实现', correct: false, explanation: '模板不支持分离编译' },
        { text: '模板定义必须在使用前可见，通常放在头文件', correct: true, explanation: '编译器需要看到完整定义才能实例化' },
        { text: '模板编译比普通函数更快', correct: false, explanation: '模板编译通常更慢（需要实例化）' },
        { text: '模板不需要头文件保护', correct: false, explanation: '模板头文件也需要头文件保护' },
      ],
    },
    {
      type: 'exposition',
      text: '总结：模板必须放在头文件中，因为实例化发生在编译期，编译器需要看到**完整定义**。\n这是 C++ 模板最重要的实践规则——几乎所有 C++ 开发者都被这个问题坑过。',
      textAnimation: 'typewriter',
    },
    {
      type: 'type-it',
      instruction: '输入一个包含类模板的头文件（完整方案）：',
      code: '#ifndef VECTOR_H\n#define VECTOR_H\n\ntemplate<typename T>\nclass Vec {\n  T* data;\n  int sz;\npublic:\n  Vec(int s) : sz(s) { data = new T[sz]; }\n  ~Vec() { delete[] data; }\n  T& operator[](int i) { return data[i]; }\n  int size() const { return sz; }\n};\n\n#endif',
      hints: [
        '类模板完整定义在头文件中',
        '#ifndef 头文件保护宏',
        '使用者 #include "Vector.h" 即可',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾 13：访问依赖类型时 typename 和 class 能互换吗？',
      options: [
        { text: '能，一直都是等价的', correct: false, explanation: '依赖类型前必须用 typename' },
        { text: '不能，只有 typename 可以用在依赖类型前', correct: true, explanation: 'class 在依赖类型名前是语法错误' },
        { text: '取决于编译器', correct: false, explanation: 'C++ 标准明确规定只能 typename' },
        { text: 'class 也可以，但不好', correct: false, explanation: 'class 在此处不合法' },
      ],
    },
    {
      type: 'type-it',
      instruction: '写一个使用 #include 包含模板头文件的 main 函数：',
      code: '#include <iostream>\n#include "Vector.h"\nusing namespace std;\n\nint main() {\n  Vec<int> vi(5);\n  for (int i = 0; i < vi.size(); i++) {\n    vi[i] = i * 10;\n    cout << vi[i] << " ";\n  }\n  return 0;\n}',
      hints: [
        '#include "Vector.h" 引入类模板定义',
        '编译器看到完整定义后可以实例化',
        'Vec<int> 在编译期生成 int 版本的类',
      ],
    },
  ],
}

export default lesson
