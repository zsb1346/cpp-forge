import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'const-methods',
    chapter: 10,
    title: 'const 成员函数',
    subtitle: '深化理解',
    description: '回顾并深化 const 成员函数——在函数声明后加 const，承诺不修改成员变量。',
    objectives: ['能写出 const 成员函数', '理解 const 成员函数的限制'],
    estimatedMinutes: 8,
  },
  blocks: [
    {
      type: 'exposition',
      text: '在类的成员函数后面加 `const`，表示**这个函数不会修改任何成员变量**。\n这是对调用者的承诺。',
      code: 'class Hero {\n  int hp;\npublic:\n  int getHp() const {  // const 成员函数\n    return hp;         // 只读，不修改\n  }\n};',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: 'const 成员函数内部不能修改成员变量。\n如果你尝试赋值，编译器会报错。',
      code: 'int getHp() const {\n  hp = 100;   // 编译错误！\n  return hp;\n}',
    },
    {
      type: 'multiple-choice',
      question: '回顾 p07-17：在类中 public 和 private 的区别是什么？',
      options: [
        { text: 'public 只能被类内部访问', correct: false, explanation: 'public 谁都能访问' },
        { text: 'private 只能被类内部访问', correct: true, explanation: 'private 成员只有类自己的函数能访问' },
        { text: 'public 和 private 没区别', correct: false, explanation: '它们是访问权限控制' },
        { text: 'private 是 C++ 独有的', correct: false, explanation: '很多语言都有访问控制' },
      ],
    },
    {
      type: 'concept-cards',
      instruction: '认识 const 成员函数的规则：',
      cards: [
        { glyph: '🔒', term: 'const 成员函数', meaning: '承诺不修改任何成员变量', example: 'int get() const' },
        { glyph: '📖', term: '只读访问', meaning: '可以读成员变量，不能写', example: 'return name;' },
        { glyph: '❌', term: '不能调非 const 函数', meaning: 'const 函数内只能调其他 const 函数', example: '不能调 setHp()' },
      ],
    },
    {
      type: 'exposition',
      text: '哪些函数应该加 const？\n- 取值函数（getter）——`getName()`、`getScore()`\n- 只读查询——`isEmpty()`、`size()`\n- 任何不改成员变量的函数',
    },
    {
      type: 'type-it',
      instruction: '定义一个含 const 成员函数的类：',
      code: 'class Player {\n  string name;\n  int level;\npublic:\n  string getName() const {\n    return name;\n  }\n  int getLevel() const {\n    return level;\n  }\n  void levelUp() {\n    level++;  // 非 const，可以修改\n  }\n};',
      hints: [
        'getName 和 getLevel 加了 const',
        'levelUp 没有 const，因为它要修改 level',
        'const 函数只能调 const 函数',
      ],
    },
    {
      type: 'multiple-choice',
      question: 'const 成员函数可以修改成员变量吗？',
      options: [
        { text: '可以，没有限制', correct: false, explanation: 'const 成员函数有修改限制' },
        { text: '不可以，编译器会报错', correct: true, explanation: 'const 成员函数承诺不修改成员变量' },
        { text: '取决于变量的类型', correct: false, explanation: '跟类型无关，任何成员变量都不能改' },
        { text: '只有在调试模式下不能改', correct: false, explanation: '编译阶段就禁止修改' },
      ],
    },
    {
      type: 'exposition',
      text: 'const 成员函数背后是：**this 指针被当作 const 指针**。\n也就是说，在 const 成员函数里，`this` 的类型是 `const ClassName*`，不能修改对象。',
    },
    {
      type: 'fill-in',
      prompt: '给函数加上 const 修饰。',
      template: 'int getMaxHP() ____ {\n  return ____;\n}',
      answers: ['const', 'maxHP'],
      hints: ['第一个空：放在函数参数列表后面', '第二个空：返回哪个成员变量'],
    },
    {
      type: 'multiple-choice',
      question: '回顾 p07-17：类的成员函数默认是哪个访问权限？',
      options: [
        { text: 'public', correct: false, explanation: 'class 的成员默认是 private' },
        { text: 'private', correct: true, explanation: 'class 中未指定权限时默认 private' },
        { text: 'protected', correct: false, explanation: 'protected 不是默认权限' },
        { text: '没有默认权限', correct: false, explanation: 'C++ class 有默认权限 private' },
      ],
    },
    {
      type: 'type-it',
      instruction: '更多 const 成员函数的例子：',
      code: 'class Rectangle {\n  double w, h;\npublic:\n  double area() const {\n    return w * h;\n  }\n  double perimeter() const {\n    return 2 * (w + h);\n  }\n  void scale(double factor) {\n    w *= factor;\n    h *= factor;\n  }\n};',
      hints: [
        'area 和 perimeter 只读，加了 const',
        'scale 要修改成员变量，不能加 const',
        'const 函数内部可以调其他 const 函数',
      ],
    },
    {
      type: 'exposition',
      text: '习惯：**所有不修改成员变量的函数都应该加 const**。\n这让你和你的队友一眼就能看出哪些函数是"安全的"（不会乱改数据）。',
    },
    {
      type: 'multiple-choice',
      question: '以下哪个函数声明是正确的 const 成员函数？',
      options: [
        { text: 'void const func();', correct: false, explanation: 'const 应该放在函数参数列表后面' },
        { text: 'void func() const;', correct: true, explanation: 'const 放在 ) 后面是标准写法' },
        { text: 'const void func();', correct: false, explanation: 'const 放在返回值前表示返回值不可改' },
        { text: 'void func(const);', correct: false, explanation: '括号里是参数名，不是 const 成员函数' },
      ],
    },
    {
      type: 'type-it',
      instruction: '练习完整的 const 成员函数：',
      code: 'class Student {\n  int score;\npublic:\n  void setScore(int s) { score = s; }\n  int getScore() const { return score; }\n  bool passed() const { return score >= 60; }\n};',
      hints: [
        'getScore 和 passed 不会修改 score',
        'setScore 要修改 score，不能加 const',
        'passed 虽然是查询，但计算了条件判断',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾 01：以下哪个是正确的 const 变量声明？',
      options: [
        { text: 'const int x; x = 5;', correct: false, explanation: 'const 变量声明时必须初始化' },
        { text: 'const int x = 5;', correct: true, explanation: 'const 变量声明时初始化' },
        { text: 'int const x = 5;', correct: true, explanation: 'int const 和 const int 等价' },
        { text: 'const x = 5;', correct: false, explanation: '不能省略类型' },
      ],
      mode: 'multiple',
    },
    {
      type: 'concept-cards',
      instruction: 'const 成员函数的总结：',
      cards: [
        { glyph: '✅', term: '只读', meaning: '不能修改成员变量', example: 'int get() const' },
        { glyph: '❌', term: '不能调非 const 函数', meaning: '只能调其他 const 函数', example: 'this 是 const' },
        { glyph: '📖', term: '用于 getter', meaning: '取值函数通常加 const', example: 'getName() const' },
      ],
    },
    {
      type: 'type-it',
      instruction: '定义一个同时包含 const 和非 const 的类：',
      code: 'class Data {\n  int value;\npublic:\n  Data(int v) : value(v) {}\n  int get() const { return value; }\n  void set(int v) { value = v; }\n  void print() const { cout << value; }\n};',
      hints: [
        'get 和 print 是 const 函数',
        'set 不是 const，因为它要修改 value',
        'const 对象只能调 get 和 print',
      ],
    },
    {
      type: 'exposition',
      text: '总结：const 成员函数 = 只读函数。\n在函数后面加 `const`，编译器会确保你在这个函数里不会修改任何成员变量。',
      textAnimation: 'typewriter',
    },
  ],
}

export default lesson