import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'why-operator-overload',
    chapter: 10,
    title: '为什么重载运算符',
    subtitle: '让自定义类型像内置类型',
    description: '理解运算符重载的动机——让自定义类的对象也能使用 +、-、<< 等运算符，像 int、double 一样自然。',
    objectives: ['理解运算符重载的意义', '能说出运算符重载的典型场景'],
    estimatedMinutes: 8,
  },
  blocks: [
    {
      type: 'exposition',
      text: '你现在有一个 `Vector2D` 类，想计算两个向量相加：\n如果没有运算符重载，你得写 `add(v1, v2)` 或者 `v1.add(v2)`。',
      code: 'Vector2D v1(1, 2);\nVector2D v2(3, 4);\nVector2D v3 = v1 + v2;  // 如果 + 能直接用就好了',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '内置类型可以直接用 `+`：`int c = a + b;`\n自定义类型默认不行——`v1 + v2` 会编译错误。\n**运算符重载**就是教编译器怎么处理自定义类型的运算符。',
    },
    {
      type: 'concept-cards',
      instruction: '为什么需要运算符重载：',
      cards: [
        { glyph: '➕', term: '内置类型', meaning: 'int、double 可以直接用 + - * /', example: 'int c = a + b;' },
        { glyph: '🔧', term: '自定义类型', meaning: '默认不能用运算符，需要重载', example: 'Vector2D v3 = v1 + v2;' },
        { glyph: '🎯', term: '重载', meaning: '教编译器你的类型怎么用运算符', example: 'operator+ 函数' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾 p07：C++ 里面自定义类型主要通过什么来实现？',
      options: [
        { text: '函数', correct: false, explanation: '函数不是自定义类型' },
        { text: '类和结构体', correct: true, explanation: 'class 和 struct 是自定义类型的主要方式' },
        { text: '变量', correct: false, explanation: '变量是数据，不是类型' },
        { text: '指针', correct: false, explanation: '指针是类型修饰符' },
      ],
    },
    {
      type: 'exposition',
      text: '没有运算符重载，你得这样写：',
      code: 'Vector2D add(const Vector2D& a, const Vector2D& b) {\n  return Vector2D(a.x + b.x, a.y + b.y);\n}\nVector2D v3 = add(v1, v2);  // 函数调用方式',
    },
    {
      type: 'exposition',
      text: '有了运算符重载，可以这样写：',
      code: 'Vector2D operator+(const Vector2D& a, const Vector2D& b) {\n  return Vector2D(a.x + b.x, a.y + b.y);\n}\nVector2D v3 = v1 + v2;  // 自然！就像 int 一样',
    },
    {
      type: 'type-it',
      instruction: '调用重载后的运算符：',
      code: 'Vector2D v3 = v1 + v2;',
      hints: [
        'v1 + v2 等价于 operator+(v1, v2)',
        '编译器会自动匹配重载的 operator+',
        '返回一个新的 Vector2D 对象',
      ],
    },
    {
      type: 'multiple-choice',
      question: '运算符重载让自定义类型变得更像什么？',
      options: [
        { text: '更像函数', correct: false, explanation: '运算符重载不是为了像函数' },
        { text: '更像内置类型', correct: true, explanation: '让自定义类型也能像 int、double 一样用运算符' },
        { text: '更像指针', correct: false, explanation: '和指针没关系' },
        { text: '更像数组', correct: false, explanation: '和数组没关系' },
      ],
    },
    {
      type: 'exposition',
      text: 'C++ 允许重载大部分运算符：\n- 算术：`+ - * / %`\n- 比较：`== != < > <= >=`\n- 赋值：`=`\n- 下标：`[]`\n- 函数调用：`()`\n- 流：`<< >>`',
    },
    {
      type: 'concept-cards',
      instruction: '可重载的运算符类别：',
      cards: [
        { glyph: '🔢', term: '算术运算符', meaning: '+ - * / %', example: '分数相加、向量相加' },
        { glyph: '⚖️', term: '比较运算符', meaning: '== != < >', example: '判断两个对象是否相等' },
        { glyph: '📤', term: '流运算符', meaning: '<< >>', example: '用 cout 输出自定义对象' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '以下哪个不是运算符重载的典型好处？',
      options: [
        { text: '代码更直观易读', correct: false, explanation: 'a + b 比 add(a, b) 更直观' },
        { text: '让程序运行更快', correct: true, explanation: '运算符重载是语法糖，不影响性能' },
        { text: '可以和内置类型一样使用运算符', correct: false, explanation: '这是运算符重载的核心目的' },
        { text: '可以自然表达数学运算', correct: false, explanation: '比如复数、向量的运算' },
      ],
    },
    {
      type: 'exposition',
      text: 'C++ 独特的哲学：**不给语言加特殊语法，而是让你扩展已有语法**。\n运算符重载就是这种哲学的体现——`+` 对 int 做加法，对你的 Vector 也做加法。',
    },
    {
      type: 'type-it',
      instruction: '如果 Vector2D 重载了 +，使用方式：',
      code: 'Vector2D a(1, 2), b(3, 4);\nVector2D c = a + b;\nVector2D d = a + b + c;  // 甚至可以链式运算',
      hints: [
        'a + b 返回一个 Vector2D',
        'a + b + c 等价于 (a + b) + c',
        '链式运算让代码非常简洁',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾 p07 全部：运算符重载和函数重载有什么共同点？',
      options: [
        { text: '都允许同一个名字有多个版本', correct: true, explanation: '重载指同一个符号或函数名有多个含义' },
        { text: '都让代码变慢', correct: false, explanation: '重载不影响运行速度' },
        { text: '只能用于类', correct: false, explanation: '函数重载也可以用于普通函数' },
        { text: '都是 C 就有的', correct: false, explanation: 'C 不支持重载，C++ 才支持' },
      ],
    },
    {
      type: 'exposition',
      text: '关键认识：运算符重载本质上是**函数调用**的语法糖。\n`a + b` 在编译器看来就是 `operator+(a, b)`。\n重载运算符 = 定义一个叫 `operator+` 的函数。',
      textAnimation: 'typewriter',
    },
    {
      type: 'fill-in',
      prompt: '运算符重载的本质是一个特殊名字的函数。补全：',
      template: 'Vector2D ____(const Vector2D& a, const Vector2D& b) {\n  // ...\n}',
      answers: ['operator+'],
      hints: ['函数名是 operator 后面跟上运算符符号'],
    },
    {
      type: 'multiple-choice',
      question: '运算符重载的目的是什么？',
      options: [
        { text: '创造新的运算符', correct: false, explanation: '不能创造新运算符，只能重载已有的' },
        { text: '让自定义类型的使用更自然', correct: true, explanation: '正如 int 可以用 +，你的类也能用' },
        { text: '让代码变短', correct: false, explanation: '代码可能变短，但主要目的是可读性' },
        { text: '绕开 private 限制', correct: false, explanation: '和访问权限无关' },
      ],
    },
    {
      type: 'exposition',
      text: '总结：运算符重载让你自定义的类型用起来像内置类型一样自然。\n接下来几课会教你怎么实现它。',
      textAnimation: 'typewriter',
    },
  ],
}

export default lesson