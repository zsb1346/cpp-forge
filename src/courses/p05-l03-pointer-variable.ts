import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'pointer-variable',
    chapter: 6,
    title: '指针变量',
    subtitle: '存地址的变量',
    description: '学习用指针变量存储地址，理解指针的声明和基本用法。',
    objectives: ['能用 int* 声明指针变量', '能用 & 给指针赋值', '能理解指针存的是地址'],
    estimatedMinutes: 12,
  },
  blocks: [
    {
      type: 'exposition',
      text: '上一课我们用 `&` 取到了地址——但地址输出完就没了。\n能不能把地址**存起来**，以后再用？',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '能！用**指针变量**。\n指针变量就是一个"专门存地址"的变量。',
    },
    {
      type: 'exposition',
      text: '声明一个指针的写法：`int* p;`\n读作：**"指向 int 的指针 p"**——p 可以存一个 int 变量的地址。',
      code: 'int x = 42;\nint* p = &x;  // p 存了 x 的地址',
    },
    {
      type: 'concept-cards',
      instruction: '认识指针声明的各个部分：',
      cards: [
        { glyph: '📦', term: 'int*', meaning: '类型：指向 int 的指针', example: 'int* p;' },
        { glyph: '🏷️', term: 'p', meaning: '指针变量的名字', example: 'p = &x;' },
        { glyph: '🔍', term: '&x', meaning: '取 x 的地址，赋值给指针', example: 'int* p = &x;' },
        { glyph: '📋', term: '*', meaning: '在这里表示"指针"，不是乘法', example: 'int* → int 的指针' },
      ],
    },
    {
      type: 'exposition',
      text: '指针变量**存的是地址**，不是普通的值。\n所以如果 x 的值是 42，`p` 存的是 x 的地址（比如 0x7ffe12），不是 42。',
    },
    {
      type: 'type-it',
      instruction: '敲这段代码：声明指针、存地址、输出看看：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int x = 99;\n  int* p = &x;\n  cout << "x 的值: " << x << endl;\n  cout << "p 存的地址: " << p << endl;\n}',
      hints: ['`int* p` 声明一个指针变量 p', '`p = &x` 把 x 的地址赋值给 p', '输出 p 就能看到地址值'],
    },
    {
      type: 'multiple-choice',
      question: '复习前一课：`&` 运算符的作用是什么？',
      options: [
        { text: '声明引用', correct: false, explanation: '那是 & 的另一个用途，目前还没学到' },
        { text: '取变量的地址', correct: true, explanation: '& 在变量前取它的内存地址' },
        { text: '取指针的值', correct: false, explanation: '取指针的值不用 &' },
        { text: '做按位与运算', correct: false, explanation: '那是 & 在表达式中的另一个含义' },
      ],
    },
    {
      type: 'exposition',
      text: '注意：指针的**类型必须匹配**。\n`int*` 只能存 `int` 变量的地址，不能存 `double` 变量的地址。',
      code: 'int x = 10;\ndouble y = 3.14;\n\nint* p = &x;     // ✅ 正确\nint* q = &y;     // ❌ 错误：int* 不能存 double 的地址',
    },
    {
      type: 'multiple-choice',
      question: '`double value = 3.14; double* ptr = &value;` ptr 存的是什么？',
      options: [
        { text: '3.14', correct: false, explanation: '3.14 是 value 的值，不是地址' },
        { text: 'value 的内存地址', correct: true, explanation: '&value 取地址存入 ptr' },
        { text: 'value 的变量名', correct: false, explanation: '变量名是 value，ptr 存的是地址' },
        { text: 'double 类型的大小', correct: false, explanation: 'ptr 存地址，不是大小' },
      ],
    },
    {
      type: 'exposition',
      text: '指针也可以**先声明，再赋值**：',
      code: 'int* p;     // 声明一个指针，但还没指向任何东西\nint x = 5;\np = &x;     // 现在 p 指向 x',
    },
    {
      type: 'type-it',
      instruction: '敲这段代码，先声明指针再赋值：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int* ptr;\n  int num = 77;\n  ptr = &num;\n  cout << ptr << endl;\n}',
      hints: ['先声明 `int* ptr;` 不赋值', '用 `ptr = &num;` 再赋地址', '声明时没有 *，赋值时也没有 *，只有 &'],
    },
    {
      type: 'exposition',
      text: '常见新手写法错误：',
      code: 'int* p;     // ✅ 声明指针\n*p = &x;    // ❌ 错误！声明之后用 p 而不是 *p',
    },
    {
      type: 'exposition',
      text: '区分清楚：\n- **声明时**的 `int* p` —— 表示"p 是一个指针"\n- **使用时的 `p`** —— 就是指针变量本身，存的是地址',
    },
    {
      type: 'match-blocks',
      instruction: '按正确顺序排列，声明指针并让它指向变量 x：',
      fragments: ['int*', 'p', '=', '&x', ';'],
      distractors: ['*p', 'int'],
    },
    {
      type: 'exposition',
      text: '指针有什么用？目前你看到了它"存地址"——\n但你可能会想：存地址又不能直接拿来当数用……',
    },
    {
      type: 'exposition',
      text: '别急——下一课我们学**解引用**：\n通过指针存的地址，找到并操作那个地址里的值。',
    },
    {
      type: 'type-it',
      instruction: '最后敲一个完整的指针示例：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int level = 5;\n  int* p = &level;\n  cout << "level 的地址: " << p << endl;\n  cout << "level 的值: " << level << endl;\n}',
      hints: ['`int* p = &level` 声明指针并初始化', '`p` 存的是 level 的地址', '输出 p 看到十六进制地址'],
    },
    {
      type: 'exposition',
      text: '记住了：指针变量 = 存地址的变量。\n类型告诉编译器"这个指针应该指向哪种变量"。',
    },
  ],
}

export default lesson
