import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'ref-vs-ptr',
    chapter: 6,
    title: '引用 vs 指针的区别',
    subtitle: '不能 null、不能改指',
    description: '系统对比引用和指针的异同，建立清晰的心智模型。',
    objectives: ['能列出引用和指针的三个主要区别', '能根据场景选择用引用还是指针', '能读懂含引用和指针的代码'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '引用和指针都能"间接操作变量"，\n但它们是**不同的东西**——很多人一开始就混淆。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '先看代码对比：',
      code: 'int x = 10;\n\nint& r = x;   // 引用——r 就是 x\nint* p = &x;  // 指针——p 存 x 的地址\n\nr = 20;        // x 变成 20\n*p = 20;       // x 也变成 20',
    },
    {
      type: 'exposition',
      text: '三大核心区别：\n\n**区别 1：能否为空**\n- 引用**不能**为空，必须绑定一个变量\n- 指针**可以**为 nullptr',
    },
    {
      type: 'exposition',
      text: '**区别 2：能否改指**\n- 引用绑定后**不能**改绑到其他变量\n- 指针可以**改指**到另一个变量',
    },
    {
      type: 'exposition',
      text: '**区别 3：使用方式**\n- 引用用起来就像普通变量（`r = 20`）\n- 指针需要解引用（`*p = 20`）',
    },
    {
      type: 'concept-cards',
      instruction: '引用 vs 指针对比：',
      cards: [
        { glyph: '🔗', term: '引用 int& r = x', meaning: '别名，不能空不能改指', example: 'r = 5 直接改 x' },
        { glyph: '📍', term: '指针 int* p = &x', meaning: '存地址，可空可改指', example: '*p = 5 解引用改 x' },
        { glyph: '✅', term: '引用更安全', meaning: '天生非空，不用检查', example: '但功能受限' },
        { glyph: '🔧', term: '指针更灵活', meaning: '可空、可改指、可运算', example: '但需要小心维护' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '以下哪个关于引用的说法是错误的？',
      options: [
        { text: '引用必须在声明时初始化', correct: false, explanation: '这是对的，引用必须绑定变量' },
        { text: '引用可以重新绑定到另一个变量', correct: true, explanation: '这是错的！引用不能改绑' },
        { text: '引用不能为 nullptr', correct: false, explanation: '这是对的，引用必须绑定真实变量' },
        { text: '引用用起来像普通变量', correct: false, explanation: '这是对的，不需要解引用' },
      ],
    },
    {
      type: 'exposition',
      text: '一个容易混淆的细节：**声明引用的 `&` 和解引用地址的 `&` 看起来一样**。',
      code: 'int x = 5;\nint& r = x;   // 这里的 & 是"声明引用"\ncout << &x;   // 这里的 & 是"取地址"',
    },
    {
      type: 'exposition',
      text: '区分方法：\n- **声明语句中的 `&`**：`int& r` → 引用\n- **表达式中的 `&`**：`&x` → 取地址',
    },
    {
      type: 'multiple-choice',
      question: '复习上一课：引用 r 绑定变量 x 后，执行 `r = r + 1;` 会怎样？',
      options: [
        { text: 'x 加 1，r 不变', correct: false, explanation: 'r 就是 x，r 变 x 也变' },
        { text: 'x 和 r 都加 1', correct: true, explanation: 'r 是 x 的别名，r+1 就是 x+1' },
        { text: '编译错误', correct: false, explanation: '引用可用于赋值表达式' },
        { text: 'r 改绑到新变量', correct: false, explanation: '引用不能改绑，r+1 是给 x 加 1' },
      ],
    },
    {
      type: 'exposition',
      text: '**什么时候用引用？**\n- 函数参数想直接操作原变量（引用传递）\n- 确定一定有绑定对象\n- 想要更简洁安全的写法',
    },
    {
      type: 'exposition',
      text: '**什么时候用指针？**\n- 可能没有绑定对象（用 nullptr）\n- 需要改指向不同的变量\n- 需要指针运算（后续会学）',
    },
    {
      type: 'type-it',
      instruction: '敲这段代码——同时使用引用和指针，对比差异：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int x = 10, y = 20;\n  int& r = x;     // 引用绑定 x\n  int* p = &x;    // 指针指向 x\n  r = 30;         // x = 30\n  cout << "x = " << x << endl;\n  p = &y;         // 指针改指向 y\n  *p = 999;       // y = 999\n  cout << "y = " << y << endl;\n}',
      hints: ['引用 r 绑定 x，修改 r 就是修改 x', '指针 p 可以改指到 y', '引用不能改绑，但指针可以'],
    },
    {
      type: 'multiple-choice',
      question: '回忆阶段 2：以下代码输出什么？`int a = 5; int b = a; b = 10; cout << a;`',
      options: [
        { text: '5', correct: true, explanation: 'b = a 是拷贝，b 改成 10 不影响 a' },
        { text: '10', correct: false, explanation: 'b 是 a 的拷贝，不是引用' },
        { text: '15', correct: false, explanation: '没有加法操作' },
        { text: '编译错误', correct: false, explanation: '代码完全合法' },
      ],
    },
    {
      type: 'type-it',
      instruction: '最后敲一个完整对比——改绑演示：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int a = 1, b = 2;\n  int& r = a;\n  int* p = &a;\n  cout << "r = " << r << ", *p = " << *p << endl;\n  p = &b;\n  *p = 99;\n  cout << "b 被指针改为: " << b << endl;\n  cout << "a 还是: " << a << " (引用没变)" << endl;\n}',
      hints: ['指针可以改指到 b', '引用始终绑定 a', '*p = 99 修改了 b 而不是 a'],
    },
    {
      type: 'exposition',
      text: '还有一个细节：**引用不是对象，指针是对象**。\n引用没有独立的内存地址（它就是别名），指针有自己的地址。',
    },
    {
      type: 'multiple-choice',
      question: '`int x; int& r = x; int* p = &x;` 以下正确的说法是？',
      options: [
        { text: 'r 有自己的内存地址', correct: false, explanation: '引用是别名，没有独立地址' },
        { text: '&r 和 &x 是同一个地址', correct: true, explanation: '引用就是原变量，地址相同' },
        { text: 'p 和 r 是同一个东西', correct: false, explanation: '指针和引用是不同的概念' },
        { text: 'p 不能指向 x', correct: false, explanation: 'p 指向 x，这是合法的' },
      ],
    },
    {
      type: 'exposition',
      text: '一句话总结：\n引用 = 安全但受限的别名\n指针 = 灵活但需要小心的地址工具',
    },
    {
      type: 'exposition',
      text: '下一课：值传递——函数参数默认是拷贝。',
    },
  ],
}

export default lesson
