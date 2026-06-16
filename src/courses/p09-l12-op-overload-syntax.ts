import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'op-overload-syntax',
    chapter: 10,
    title: '运算符重载语法',
    subtitle: '返回值 operator 符号(参数)',
    description: '学习运算符重载的固定格式——返回值类型、operator 关键字、符号、参数列表。',
    objectives: ['能写出运算符重载函数', '理解运算符重载的语法规则'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '运算符重载的语法是：\n`返回值 operator 符号(参数列表)`\n\n看起来就是在一个普通函数前面加 `operator` 关键字。',
      code: 'Vector2D operator+(const Vector2D& a, const Vector2D& b) {\n  return Vector2D(a.x + b.x, a.y + b.y);\n}',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '解析这个函数：\n- `Vector2D` 是返回值类型\n- `operator+` 是函数名（operator 关键字 + 运算符符号）\n- `(const Vector2D& a, const Vector2D& b)` 是两个参数',
    },
    {
      type: 'concept-cards',
      instruction: '运算符重载的三个要素：',
      cards: [
        { glyph: '📤', term: '返回值类型', meaning: '运算符运算后的结果类型', example: 'operator+ 返回 Vector2D' },
        { glyph: '🔣', term: 'operator 符号', meaning: '函数名由 operator + 符号组成', example: 'operator+ / operator- / operator==' },
        { glyph: '📥', term: '参数列表', meaning: '运算符的操作数', example: '二元运算符有 2 个参数' },
      ],
    },
    {
      type: 'type-it',
      instruction: '重载加法运算符的基本语法：',
      code: 'Vector2D operator+(const Vector2D& a, const Vector2D& b) {\n  return Vector2D(a.x + b.x, a.y + b.y);\n}',
      hints: [
        '函数名是 operator+，不是普通的函数名',
        '参数是两个 const Vector2D 引用',
        '返回一个新的 Vector2D',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾 11：运算符重载的本质是什么？',
      options: [
        { text: '修改运算符的优先级', correct: false, explanation: '不能修改优先级' },
        { text: '定义一个特殊名字的函数', correct: true, explanation: 'operator+ 就是一个特殊名字的函数' },
        { text: '创造一个全新的运算符', correct: false, explanation: '不能创造新运算符' },
        { text: '删除已有的运算符', correct: false, explanation: '不能删除运算符' },
      ],
    },
    {
      type: 'exposition',
      text: '二元运算符（如 +、-、*、/）如果定义为**全局函数**，参数是两个操作数。\n如果定义为**成员函数**，参数是一个操作数（左操作数是 this）。',
      code: '// 全局函数形式\nVector2D operator+(const Vector2D& a, const Vector2D& b);\n\n// 成员函数形式\nVector2D Vector2D::operator+(const Vector2D& other) const;',
    },
    {
      type: 'type-it',
      instruction: '成员函数形式的运算符重载：',
      code: 'class Vector2D {\n  int x, y;\npublic:\n  Vector2D operator+(const Vector2D& other) const {\n    return Vector2D(x + other.x, y + other.y);\n  }\n};',
      hints: [
        '成员函数只有一个参数（右操作数）',
        '左操作数是 this，通过 this->x 和 this->y 访问',
        'const 表示不会修改 this 的内容',
      ],
    },
    {
      type: 'concept-cards',
      instruction: '两种形式的对比：',
      cards: [
        { glyph: '🌐', term: '全局函数', meaning: '两个操作数都是参数', example: 'friend 常配合使用' },
        { glyph: '👤', term: '成员函数', meaning: '左操作数是 this，右是参数', example: 'v1 + v2 中 v1 是 this' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '全局函数形式的 operator+ 有几个参数？',
      options: [
        { text: '0 个', correct: false, explanation: '需要操作数' },
        { text: '1 个', correct: false, explanation: '二元运算符需要两个操作数' },
        { text: '2 个', correct: true, explanation: '左操作数和右操作数' },
        { text: '3 个', correct: false, explanation: '二元运算符只需要两个操作数' },
      ],
    },
    {
      type: 'match-blocks',
      instruction: '按正确顺序排列运算符重载函数：',
      fragments: ['Vector2D', 'operator+', '(const Vector2D& a, const Vector2D& b)', '{', 'return Vector2D(a.x + b.x, a.y + b.y);', '}'],
      distractors: ['operator='],
    },
    {
      type: 'exposition',
      text: '可以重载的运算符例子：\n- `operator==`：判断相等，返回 bool\n- `operator<<`：输出到流，返回 ostream&\n- `operator[]`：下标访问，返回引用\n- `operator()`：函数调用',
    },
    {
      type: 'type-it',
      instruction: '重载 == 运算符：',
      code: 'bool operator==(const Vector2D& a, const Vector2D& b) {\n  return a.x == b.x && a.y == b.y;\n}',
      hints: [
        'operator== 返回 bool 类型',
        '比较两个向量的 x 和 y 是否相等',
        '返回值可以用 if (v1 == v2) 来判断',
      ],
    },
    {
      type: 'multiple-choice',
      question: '以下哪个是合法的运算符重载函数名？',
      options: [
        { text: 'operator+', correct: true, explanation: 'operator 加运算符符号是标准格式' },
        { text: '+operator', correct: false, explanation: 'operator 必须在前面' },
        { text: 'operatorplus', correct: false, explanation: '必须用 operator 关键字加符号' },
        { text: 'add_operator', correct: false, explanation: '这是普通函数名，不是运算符重载' },
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全减法运算符重载。',
      template: 'Vector2D ____(const Vector2D& a, const Vector2D& b) {\n  return Vector2D(a.x - b.x, ____ - b.y);\n}',
      answers: ['operator-', 'a.y'],
      hints: ['第一个空：函数名', '第二个空：y 坐标相减'],
    },
    {
      type: 'exposition',
      text: '注意：不能重载的运算符有：\n- `.`（成员访问）\n- `::`（作用域解析）\n- `?:`（三目运算符）\n- `sizeof`\n- `.*`（成员指针访问）',
    },
    {
      type: 'match-blocks',
      instruction: '排列成员函数形式的 operator==：',
      fragments: ['bool', 'Vector2D::', 'operator==', '(const Vector2D& other)', 'const', '{', 'return x == other.x && y == other.y;', '}'],
      distractors: ['friend'],
    },
    {
      type: 'multiple-choice',
      question: '回顾 11：以下哪个是运算符重载的好处？',
      options: [
        { text: '可以发明新的运算符', correct: false, explanation: '不能发明新运算符' },
        { text: '让自定义类型用起来更自然', correct: true, explanation: '自定义类型也能用 + - << 等运算符' },
        { text: '可以改变运算符优先级', correct: false, explanation: '优先级是固定的' },
        { text: '可以删除运算符', correct: false, explanation: '不能删除运算符' },
      ],
    },
    {
      type: 'type-it',
      instruction: '写一个 operator!= 的重载：',
      code: 'bool operator!=(const Vector2D& a, const Vector2D& b) {\n  return !(a == b);\n}',
      hints: [
        'operator!= 可以复用 operator==',
        '返回 bool 类型',
        '!(a == b) 就是 a != b',
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全：重载取负运算符（一元 -）。',
      template: 'Vector2D operator-(____ Vector2D& v) {\n  return Vector2D(____, -v.y);\n}',
      answers: ['const', '-v.x'],
      hints: ['第一空：一元运算符只有一个参数', '第二空：x 坐标取负'],
    },
    {
      type: 'exposition',
      text: '总结语法公式：\n`返回类型 operator符号(参数列表) { 实现 }`\n记住这个公式，所有运算符重载都长这样。',
      textAnimation: 'typewriter',
    },
  ],
}

export default lesson