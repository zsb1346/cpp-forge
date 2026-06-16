import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'reference-intro',
    chapter: 6,
    title: '引用——变量的另一个名字',
    subtitle: '就是别名',
    description: '学习引用的概念，引用就是给已有变量起一个别名，操作引用就是操作原变量。',
    objectives: ['能用 & 声明引用', '理解引用是变量的别名', '能区分引用和变量的关系'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '指针给了你一种"间接操作变量"的能力。\n但 C++ 还有另一种方式——**引用**。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '引用就是**给一个已经存在的变量起另一个名字**。\n就像你有一个大名"张三"，小名"三儿"——叫哪个都是在叫你。',
    },
    {
      type: 'exposition',
      text: '声明引用用 `&`：',
      code: 'int x = 10;\nint& r = x;   // r 是 x 的引用（别名）\n\nr = 20;        // 等价于 x = 20\ncout << x;     // 输出 20',
    },
    {
      type: 'concept-cards',
      instruction: '引用相关的核心概念：',
      cards: [
        { glyph: '🏷️', term: 'int& r', meaning: 'r 是 int 类型的引用', example: 'int& r = x;' },
        { glyph: '🔄', term: 'r = x', meaning: 'r 绑定到 x，成为别名', example: 'r = 5 → x = 5' },
        { glyph: '🔗', term: '绑定', meaning: '引用必须在声明时绑定', example: 'int& r = x;' },
        { glyph: '🚫', term: '不能空', meaning: '引用必须绑定已有变量，不能为 null', example: 'int& r; // ❌' },
      ],
    },
    {
      type: 'type-it',
      instruction: '敲这段代码——声明引用并操作：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int x = 5;\n  int& r = x;\n  cout << "x = " << x << ", r = " << r << endl;\n  r = 100;\n  cout << "修改后: x = " << x << ", r = " << r << endl;\n}',
      hints: ['`int& r = x` 声明引用 r 绑定到 x', 'r 和 x 的值始终相同', '修改 r 相当于修改 x'],
    },
    {
      type: 'exposition',
      text: '引用和指针的关键区别（初步）：\n- 引用用 `&` 声明，指针用 `*` 声明\n- 引用用起来**就像普通变量**，不用加 `*`\n- 引用必须在声明时**立即绑定**一个变量',
    },
    {
      type: 'multiple-choice',
      question: '复习：`int* p = &x;` 中 `&x` 是什么意思？',
      options: [
        { text: '声明引用', correct: false, explanation: '在表达式里 &x 不是声明' },
        { text: '取 x 的地址', correct: true, explanation: '&x 取 x 在内存中的地址' },
        { text: 'x 的别名', correct: false, explanation: '别名用 int& r = x 声明' },
        { text: '对 x 解引用', correct: false, explanation: '解引用是 *p' },
      ],
    },
    {
      type: 'exposition',
      text: '**引用声明后就不能再改绑到别的变量**。\n一旦 `int& r = x;`，r 永远是 x 的别名，不能再变成 y 的别名。',
    },
    {
      type: 'exposition',
      text: '而且引用**不能为 nullptr**——它必须绑定一个真实存在的变量：',
      code: 'int& r;        // ❌ 错误：引用必须初始化\nint& r = nullptr; // ❌ 错误：引用不能为空',
    },
    {
      type: 'multiple-choice',
      question: '以下哪段代码是正确的引用声明？',
      options: [
        { text: '`int& r;`', correct: false, explanation: '引用必须初始化，不能只声明不绑定' },
        { text: '`int& r = nullptr;`', correct: false, explanation: '引用不能为空' },
        { text: '`int x = 5; int& r = x;`', correct: true, explanation: 'r 绑定到 x，是 x 的别名' },
        { text: '`int& r = &x;`', correct: false, explanation: '&x 是地址，引用不能绑定地址' },
      ],
    },
    {
      type: 'type-it',
      instruction: '敲这段代码——体会引用就是原变量的别名：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int a = 10;\n  int b = 20;\n  int& ref = a;\n  cout << "ref 是 a 的别名: " << ref << endl;\n  ref = b;\n  cout << "ref = b 之后，a 变成了: " << a << endl;\n}',
      hints: ['`int& ref = a` 让 ref 成为 a 的别名', '`ref = b` 不是让 ref 绑定到 b', '`ref = b` 是把 b 的值赋给 a（因为 ref 就是 a）'],
    },
    {
      type: 'exposition',
      text: '注意上一个例子：`ref = b;` **不是让 ref 改绑到 b**，\n而是**把 b 的值赋给 a**——因为 ref 就是 a。',
    },
    {
      type: 'exposition',
      text: '这就像：你的小名叫"阿三"，大名叫"张三"。\n有人喊"阿三"→就是你。有人喊"张三"→也是你。\n你不能"把阿三这个名字改成李四"——因为阿三就是你。',
    },
    {
      type: 'type-it',
      instruction: '再敲一段——引用和原始变量始终同步：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int x = 1;\n  int& r = x;\n  x = x + 1;\n  cout << "x 变了: " << r << endl;\n  r = r + 10;\n  cout << "r 变了: " << x << endl;\n}',
      hints: ['x 改变后，r 的值也跟着变', 'r 改变后，x 的值也跟着变', '它们始终是同一个变量的不同名字'],
    },
    {
      type: 'multiple-choice',
      question: '回忆阶段 4：以下函数声明中哪个参数可以通过函数调用修改原变量？',
      options: [
        { text: '`void func(int a)`', correct: false, explanation: '普通参数传递的是副本，修改 a 不影响原变量' },
        { text: '`void func(int& a)`', correct: true, explanation: '引用参数修改 a 就是修改原变量' },
        { text: '`void func(int* a)`', correct: false, explanation: '指针参数需要解引用才能修改，但参数本身是拷贝' },
        { text: '`void func(const int a)`', correct: false, explanation: 'const 禁止修改' },
      ],
    },
    {
      type: 'type-it',
      instruction: '敲这段——用引用交换两个变量的值（回顾引用的别名效果）：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int x = 1, y = 2;\n  int& rx = x;\n  int& ry = y;\n  int temp = rx;\n  rx = ry;\n  ry = temp;\n  cout << x << " " << y << endl;\n}',
      hints: ['`rx` 是 x 的引用，`ry` 是 y 的引用', '`rx = ry` 等价于 `x = y`', '交换后 x=2, y=1'],
    },
    {
      type: 'multiple-choice',
      question: '以下哪些是引用的特性？（多选）',
      mode: 'multiple',
      options: [
        { text: '必须在声明时初始化', correct: true, explanation: '引用必须绑定一个变量' },
        { text: '可以为 nullptr', correct: false, explanation: '引用不能为空' },
        { text: '用起来像普通变量', correct: true, explanation: '不需要解引用' },
        { text: '可以改绑到其他变量', correct: false, explanation: '引用不能改绑' },
      ],
    },
    {
      type: 'exposition',
      text: '引用看起来比指针简单——\n不需要 `*` 解引用，用起来就像普通变量。',
    },
    {
      type: 'exposition',
      text: '但引用和指针的区别不止这些。\n下一课详细对比：**引用 vs 指针**。',
    },
  ],
}

export default lesson
