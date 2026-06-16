import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'overload-rules',
    chapter: 10,
    title: '重载注意事项',
    subtitle: '不能新造不能改优先级',
    description: '学习运算符重载的限制和规则——不能发明新运算符、不能改变优先级和结合性。',
    objectives: ['能说出运算符重载的限制', '能避免常见的重载错误'],
    estimatedMinutes: 8,
  },
  blocks: [
    {
      type: 'exposition',
      text: '运算符重载虽然灵活，但有一些**铁律**。\n违反这些规则会导致编译错误或者写出迷惑的代码。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '**规则 1：不能发明新运算符**\n只能重载已有的 C++ 运算符，不能自己创造 `**` 或者 `<>`。',
      code: 'void operator**(...);  // 编译错误！** 不是 C++ 运算符',
    },
    {
      type: 'concept-cards',
      instruction: '三大铁律：',
      cards: [
        { glyph: '🚫', term: '不能发明新符号', meaning: '只能重载已有的运算符', example: '不能造 ** 或 <>' },
        { glyph: '🔢', term: '不能改优先级', meaning: '+ 永远比 * 低', example: 'a + b * c 先算 b * c' },
        { glyph: '🔗', term: '不能改结合性', meaning: '赋值永远右结合', example: 'a = b = c 等价于 a = (b = c)' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾 12：以下哪种写法是合法的重载？',
      options: [
        { text: 'operator**', correct: false, explanation: '** 不是 C++ 运算符' },
        { text: 'operator+', correct: true, explanation: '+ 是合法的可重载运算符' },
        { text: 'operator.', correct: false, explanation: '. 不能重载' },
        { text: 'operator?:', correct: false, explanation: '?: 不能重载' },
      ],
    },
    {
      type: 'exposition',
      text: '**规则 2：不能改优先级和结合性**\n`a + b * c` 永远先算 `b * c`，即使你的类型重载了 + 和 * 也一样。\n优先级由语言规定，和你写的 operator 无关。',
    },
    {
      type: 'type-it',
      instruction: '验证优先级不能被改变：',
      code: 'Vector2D a(1, 2), b(3, 4), c(5, 6);\nVector2D d = a + b * c;  // 永远先算 b * c，再算 a + result',
      hints: [
        '即使你重载了 + 和 *，优先级不变',
        '乘法套件于加法',
        '想先加要用括号 (a + b) * c',
      ],
    },
    {
      type: 'multiple-choice',
      question: '以下哪个说法正确？',
      options: [
        { text: '重载运算符可以改变优先级', correct: false, explanation: '优先级不能通过重载改变' },
        { text: '重载运算符不能改变优先级', correct: true, explanation: '优先级是语言固定的' },
        { text: '通过某种技巧可以改变优先级', correct: false, explanation: '任何技巧都不能改变' },
        { text: '只有自定义类型才能改变优先级', correct: false, explanation: '优先级是固定的' },
      ],
    },
    {
      type: 'exposition',
      text: '**规则 3：不能重载某些运算符**\n这些是禁区：\n- `::`（作用域解析）\n- `.`（成员访问）\n- `.*`（成员指针访问）\n- `?:`（三目运算符）\n- `sizeof`\n- `typeid`',
    },
    {
      type: 'multiple-choice',
      question: '回顾 11-14：以下哪个运算符可以重载？',
      options: [
        { text: '::', correct: false, explanation: '作用域解析不能重载' },
        { text: '.', correct: false, explanation: '成员访问不能重载' },
        { text: '[]', correct: true, explanation: '下标运算符可以重载' },
        { text: '?:', correct: false, explanation: '三目运算符不能重载' },
      ],
    },
    {
      type: 'exposition',
      text: '**规则 4：保持语义一致**\n`operator+` 应该做加法/拼接，`operator==` 应该判断相等。\n如果你让 `operator+` 做减法——代码会变得非常迷惑。',
      code: '// ❌ 迷惑行为：+ 做减法\nint operator+(const MyType& a, const MyType& b) {\n  return a.val - b.val;  // 用 + 符号做减法，离谱\n}',
    },
    {
      type: 'type-it',
      instruction: '合理的 operator+ 实现：',
      code: 'int operator+(const Score& a, const Score& b) {\n  return a.value + b.value;  // 加法语义\n}',
      hints: [
        'operator+ 应该做加法',
        '保持和内置类型一致的语义',
        '别人看到 + 会期待加法操作',
      ],
    },
    {
      type: 'multiple-choice',
      question: '为什么应该保持运算符的语义一致？',
      options: [
        { text: '因为编译器要求语义一致', correct: false, explanation: '编译器不检查语义，只检查语法' },
        { text: '因为其他程序员看到 + 会期待加法', correct: true, explanation: '代码的可读性和可维护性' },
        { text: '因为语义不一致会导致性能下降', correct: false, explanation: '语义不影响性能' },
        { text: '没有为什么，随便写', correct: false, explanation: '写迷惑代码会害人害己' },
      ],
    },
    {
      type: 'exposition',
      text: '**规则 5：某些运算符必须重载为成员函数**\n- `=`（赋值运算符）\n- `[]`（下标运算符）\n- `()`（函数调用运算符）\n- `->`（成员访问运算符）\n其他运算符既可以成员也可以全局。',
    },
    {
      type: 'concept-cards',
      instruction: '运算符分类：',
      cards: [
        { glyph: '✅', term: '必须成员', meaning: '= [] () ->', example: '只能作为成员函数重载' },
        { glyph: '🉑', term: '两种均可', meaning: '+ - * / == != << >>', example: '成员或全局均可' },
        { glyph: '❌', term: '流运算符建议全局', meaning: '<< >> 必须为全局', example: '否则调用顺序反了' },
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全：以下哪个运算符必须作为成员函数。',
      template: '____（赋值运算符）必须作为____函数重载。',
      answers: ['=', '成员'],
      hints: ['第一个空：符号', '第二个空：成员或全局中的一种'],
    },
    {
      type: 'multiple-choice',
      question: '回顾 12：以下哪个运算符可以重载？',
      options: [
        { text: '? :', correct: false, explanation: '三目运算符不能重载' },
        { text: '[]', correct: true, explanation: '下标运算符可以重载' },
        { text: '.', correct: false, explanation: '成员访问运算符不能重载' },
        { text: '::', correct: false, explanation: '作用域解析不能重载' },
      ],
    },
    {
      type: 'type-it',
      instruction: '重载 < 运算符（用于排序）：',
      code: 'bool operator<(const Student& a, const Student& b) {\n  return a.score < b.score;\n}',
      hints: [
        'operator< 返回 bool',
        '常用于排序（sort 函数需要 <）',
        '保持语义一致：小于就是小于',
      ],
    },
    {
      type: 'concept-cards',
      instruction: '运算符重载的注意事项总结：',
      cards: [
        { glyph: '🚫', term: '不能发明', meaning: '只能重载已有运算符', example: '** 不行' },
        { glyph: '📏', term: '优先级固定', meaning: '不能改变优先级和结合性', example: '* 先于 +' },
        { glyph: '🎯', term: '语义一致', meaning: '+ 就做加法，不要做减法', example: '让别人能猜到' },
      ],
    },
    {
      type: 'exposition',
      text: '总结运算符重载的规则：\n1. 不能发明新运算符\n2. 不能改优先级和结合性\n3. 有些运算符不能重载\n4. 保持语义一致\n5. =、[]、()、-> 必须为成员函数',
      textAnimation: 'typewriter',
    },
  ],
}

export default lesson