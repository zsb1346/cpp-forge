import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'address-of-operator',
    chapter: 6,
    title: '& 运算符——取地址',
    subtitle: '拿到变量的地址',
    description: '学习用 & 运算符获取变量在内存中的地址。',
    objectives: ['能用 & 取变量的地址', '能输出地址值观察', '理解地址是编号数字'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '上一课我们说了——每个变量都有一个地址。\n怎么拿到这个地址？用 **`&` 运算符**。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '`&` 是"取地址符"——放在变量前面，返回它的地址。',
      code: 'int x = 42;\ncout << &x;  // 输出 x 的地址，比如 0x7ffe1234',
    },
    {
      type: 'exposition',
      text: '输出的地址是一串**十六进制数**，比如 `0x7ffe1234`。\n`0x` 开头表示十六进制，后面的数字就是地址编号。',
    },
    {
      type: 'concept-cards',
      instruction: '认识 & 取地址：',
      cards: [
        { glyph: '🔍', term: '&x', meaning: '取 x 的地址，结果是一个地址值', example: '&x → 0x7ffe12' },
        { glyph: '🔢', term: '地址值', meaning: '内存位置的编号，十六进制数', example: '0x7ffe1234' },
        { glyph: '📋', term: '十六进制', meaning: '0-9 + a-f 的计数方式，地址常用', example: '0xff = 255' },
      ],
    },
    {
      type: 'type-it',
      instruction: '敲这段代码，输出变量的地址：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int x = 42;\n  cout << &x << endl;\n}',
      hints: ['`&x` 取 x 的地址', '`&x` 前面不要加空格，`&`紧贴变量名', '地址输出是十六进制数，每次运行可能不一样'],
    },
    {
      type: 'exposition',
      text: '好奇的话可以多声明几个变量，看看它们的地址：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int a = 1, b = 2, c = 3;\n  cout << &a << endl;\n  cout << &b << endl;\n  cout << &c << endl;\n}',
    },
    {
      type: 'exposition',
      text: '每个变量在内存中都有自己的独立地址，\n它们是**不同的格子**，所以地址也不同。',
    },
    {
      type: 'type-it',
      instruction: '敲这段代码，看看三个变量的地址：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int x = 10;\n  int y = 20;\n  int z = 30;\n  cout << &x << " " << &y << " " << &z << endl;\n}',
      hints: ['每个变量都有独立地址', '地址之间通常相差 4 个字节（int 的大小）', '用空格分隔三个地址输出'],
    },
    {
      type: 'multiple-choice',
      question: '复习前一课：为什么有时候要通过地址操作变量而不是直接操作名字？',
      options: [
        { text: '地址比变量名好记', correct: false, explanation: '地址是十六进制数，比名字难记得多' },
        { text: '函数之间不能直接访问对方的变量，但可以用地址', correct: true, explanation: '地址可以跨函数传递，变量名不行' },
        { text: '用地址操作更快', correct: false, explanation: '不是速度问题，是能不能访问到的问题' },
        { text: '& 运算符很好写', correct: false, explanation: '好写不是核心理由' },
      ],
    },
    {
      type: 'exposition',
      text: '注意：`&` 出现在**声明引用**时和**取地址**时含义不同——但那是后面的事。\n现在你只需要记住：**`&x` 就是"给我 x 的地址"**。',
    },
    {
      type: 'exposition',
      text: '再看一个细节：不同类型的变量地址之间的距离不同。',
      code: 'char c = \'A\';\nint i = 100;\ndouble d = 3.14;\n\ncout << &c << endl;\ncout << &i << endl;\ncout << &d << endl;',
    },
    {
      type: 'exposition',
      text: '`char` 占 1 字节、`int` 占 4 字节、`double` 占 8 字节——\n这会影响变量之间的地址间隔。',
    },
    {
      type: 'type-it',
      instruction: '敲这段代码，观察不同大小变量的地址格差：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  char c = \'X\';\n  int i = 999;\n  double d = 3.1415;\n  cout << (void*)&c << endl;\n  cout << &i << endl;\n  cout << &d << endl;\n}',
      hints: ['char 用 (void*)&c 才能正确输出地址', 'int 和 double 直接用 & 就行', '不同类型的变量地址间隔不同'],
    },
    {
      type: 'multiple-choice',
      question: '`int x = 5;` 中，`&x` 得到的是什么？',
      options: [
        { text: '变量 x 的值 5', correct: false, explanation: '&x 取的是地址，不是值' },
        { text: 'x 在内存中的地址编号', correct: true, explanation: '&x 返回 x 的地址' },
        { text: 'x 的变量名', correct: false, explanation: '变量名是 x，&x 是地址' },
        { text: '5 的地址', correct: false, explanation: '5 是字面值，& 只能用于变量' },
      ],
    },
    {
      type: 'exposition',
      text: '重要提醒：**每次运行程序，变量的地址都可能不同**。\n这是操作系统的内存保护机制——地址是运行时分配的。',
    },
    {
      type: 'exposition',
      text: '所以不要写死地址！\n地址每次运行都可能变，但 `&x` 总能在运行时拿到正确的那个。',
    },
    {
      type: 'type-it',
      instruction: '敲一个完整的取地址程序：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int score = 100;\n  cout << "值: " << score << endl;\n  cout << "地址: " << &score << endl;\n}',
      hints: ['`&score` 取 score 的地址', '输出第一行是值，第二行是地址', '地址每次运行可能不同'],
    },
    {
      type: 'exposition',
      text: '拿到了地址之后，怎么"顺着地址找到值"？\n下一课：指针变量——把地址存起来。',
    },
  ],
}

export default lesson
