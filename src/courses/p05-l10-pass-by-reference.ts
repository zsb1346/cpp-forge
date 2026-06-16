import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'pass-by-reference',
    chapter: 6,
    title: '引用传递——操作原变量',
    subtitle: '不拷贝直接操作',
    description: '学习用引用作为函数参数，不拷贝直接操作原变量。',
    objectives: ['能用引用作为函数参数', '能理解引用传递与值传递的区别', '能判断什么时候用引用传递'],
    estimatedMinutes: 12,
  },
  blocks: [
    {
      type: 'exposition',
      text: '上一课我们看到：值传递只能拿到副本，改不了原变量。\n那如果**就是想改原变量**呢？',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '用**引用传递**。\n把参数声明为引用——函数操作的就是原变量本身。',
    },
    {
      type: 'exposition',
      text: '对比值传递和引用传递：',
      code: 'void byValue(int x) {    // 值传递：x 是副本\n  x = 999;\n}\n\nvoid byRef(int& x) {      // 引用传递：x 就是原变量\n  x = 999;\n}\n\nint main() {\n  int a = 10;\n  byValue(a);  // a 还是 10\n  byRef(a);    // a 变成 999\n}',
    },
    {
      type: 'concept-cards',
      instruction: '引用传递的关键要点：',
      cards: [
        { glyph: '🔗', term: 'int& x', meaning: '参数是引用，绑定到原变量', example: 'void func(int& x)' },
        { glyph: '✏️', term: '修改 x', meaning: '直接修改传入的变量', example: 'x = x + 1;' },
        { glyph: '📦', term: '无拷贝', meaning: '不复制数据，效率高', example: '大对象用引用省内存' },
      ],
    },
    {
      type: 'type-it',
      instruction: '敲这段代码——用引用传递实现"翻倍"：',
      code: '#include <iostream>\nusing namespace std;\n\nvoid doubleIt(int& x) {\n  x = x * 2;\n}\n\nint main() {\n  int score = 50;\n  doubleIt(score);\n  cout << "翻倍后: " << score << endl;\n}',
      hints: ['`int& x` 声明引用参数', '`x = x * 2` 修改的就是 score', '输出 100 而不是 50'],
    },
    {
      type: 'multiple-choice',
      question: '复习上一课：值传递时，函数修改形参会影响实参吗？',
      options: [
        { text: '会，因为形参就是实参', correct: false, explanation: '值传递形参是副本' },
        { text: '不会，因为形参是实参的副本', correct: true, explanation: '值传递就是拷贝' },
        { text: '看情况，有时会有时不会', correct: false, explanation: '值传递一定不影响实参' },
        { text: '如果形参名和实参名相同就会', correct: false, explanation: '和名字无关，值传递总是拷贝' },
      ],
    },
    {
      type: 'exposition',
      text: '多个参数的引用传递：',
      code: 'void swap(int& a, int& b) {\n  int temp = a;\n  a = b;\n  b = temp;\n}\n\nint main() {\n  int x = 1, y = 2;\n  swap(x, y);\n  cout << x << " " << y;  // 2 1\n}',
    },
    {
      type: 'type-it',
      instruction: '敲这个 swap 函数——用引用交换两个变量的值：',
      code: '#include <iostream>\nusing namespace std;\n\nvoid swap(int& a, int& b) {\n  int t = a;\n  a = b;\n  b = t;\n}\n\nint main() {\n  int x = 10, y = 20;\n  cout << "交换前: " << x << " " << y << endl;\n  swap(x, y);\n  cout << "交换后: " << x << " " << y << endl;\n}',
      hints: ['`int& a` 和 `int& b` 都是引用参数', '`int t = a` 暂存 a 的值', '没有引用的话 swap 无法实现'],
    },
    {
      type: 'multiple-choice',
      question: '以下函数能成功交换两个 int 变量值的是？',
      options: [
        { text: '`void swap(int a, int b) { int t=a; a=b; b=t; }`', correct: false, explanation: '值传递，交换的是副本' },
        { text: '`void swap(int& a, int& b) { int t=a; a=b; b=t; }`', correct: true, explanation: '引用传递，交换原变量' },
        { text: '`void swap(int* a, int* b) { int t=a; a=b; b=t; }`', correct: false, explanation: '这个交换的是指针本身，不是值' },
        { text: '`void swap(int a, int& b) { int t=a; a=b; b=t; }`', correct: false, explanation: '混合传递中 a 还是副本' },
      ],
    },
    {
      type: 'exposition',
      text: '**不想修改但想省拷贝**怎么办？\n用 `const` 引用——只读不写。',
      code: 'void show(const string& s) {\n  cout << s;  // 只读，不拷贝\n}',
    },
    {
      type: 'exposition',
      text: '`const int& x` 的意思是：\n- 引用传递（不拷贝）\n- 但不能通过 x 修改原变量（只读）',
    },
    {
      type: 'code-runner',
      instruction: '运行这段代码，观察 const 引用的只读行为：',
      code: '#include <iostream>\nusing namespace std;\n\nvoid print(const int& x) {\n  cout << x << endl;\n  // x = x + 1;  // 如果取消注释会编译报错\n}\n\nint main() {\n  int score = 100;\n  print(score);\n  cout << "score 还是: " << score << endl;\n}',
      expectedOutput: '100\nscore 还是: 100',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'exposition',
      text: '**值传递 vs 引用传递 选择指南**：',
    },
    {
      type: 'exposition',
      text: '选择指南：小数据用值传递，大数据用引用传递。需要修改原变量时用引用传递，只读不改时用 const 引用传递。',
    },
    {
      type: 'type-it',
      instruction: '敲一个综合练习——用引用实现"加法赋值"：',
      code: '#include <iostream>\nusing namespace std;\n\nvoid addTo(int& target, int value) {\n  target = target + value;\n}\n\nint main() {\n  int num = 10;\n  addTo(num, 5);\n  cout << num << endl;\n  addTo(num, 3);\n  cout << num << endl;\n}',
      hints: ['`int& target` 是引用参数', '`addTo(num, 5)` 让 num 加 5', '第一次输出 15，第二次输出 18'],
    },
    {
      type: 'multiple-choice',
      question: '`void func(int& x)` 中，如果调用 `func(a)`，函数里修改 x 会影响 a 吗？',
      options: [
        { text: '不会，因为 x 是 a 的拷贝', correct: false, explanation: '引用不是拷贝，x 就是 a' },
        { text: '会，因为 x 是 a 的引用', correct: true, explanation: '引用传递中 x 就是 a' },
        { text: '取决于 x 是否被 const 修饰', correct: false, explanation: '没有 const 就可以修改' },
        { text: '只有在 x 前加 & 才会', correct: false, explanation: '参数声明中的 & 已经是引用' },
      ],
    },
    {
      type: 'exposition',
      text: '一个常用的 const 引用场景——**避免拷贝但保证不修改**：',
      code: 'void showData(const string& data) {\n  // data 是引用，不拷贝\n  // const 保证不修改原变量\n  cout << data << endl;\n}',
    },
    {
      type: 'code-runner',
      instruction: '运行这段——用 const 引用打印数组，不拷贝不修改：',
      code: '#include <iostream>\nusing namespace std;\n\nvoid showArray(const int* arr, int size) {\n  for (int i = 0; i < size; i++) {\n    cout << arr[i] << " ";\n  }\n  cout << endl;\n}\n\nint main() {\n  int nums[5] = {10, 20, 30, 40, 50};\n  showArray(nums, 5);\n}',
      expectedOutput: '10 20 30 40 50',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'exposition',
      text: '下一课：**函数重载**——同一个函数名，可以有不同的参数版本。',
    },
  ],
}

export default lesson
