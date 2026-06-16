import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'static-cast',
    chapter: 18,
    title: 'static_cast——编译期转换',
    subtitle: '安全可预期的转换',
    description: '学习 static_cast 编译期类型转换的基本用法和场景。',
    objectives: ['能用 static_cast 做编译期类型转换', '能理解 static_cast 的安全边界', '能区分 static_cast 和隐式转换'],
    estimatedMinutes: 8,
  },
  blocks: [
    {
      type: 'exposition',
      text: 'C 语言用 `(int)3.14` 做类型转换——随意且危险。C++ 提供了四种更安全的命名转换。\n第一种：`static_cast`。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '`static_cast` 用于编译器能确定的、安全可预期的类型转换。语法：',
      code: 'double d = 3.14;\nint i = static_cast<int>(d);  // 显式浮点转整数',
    },
    {
      type: 'exposition',
      text: '与 C 风格 `(int)d` 相同的结果，但更安全——编译器会做更多类型检查，不会让你做完全无意义的转换。',
    },
    {
      type: 'type-it',
      instruction: '练习基本的 static_cast 转换：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  double d = 3.14159;\n  int i = static_cast<int>(d);\n  cout << i << endl;\n  char c = static_cast<char>(65);\n  cout << c << endl;\n}',
      hints: ['`static_cast<int>(d)` 将 double 截断为 int', '`static_cast<char>(65)` 将整数转为 ASCII 字符', 'static_cast 在编译期完成，没有运行时开销'],
    },
    {
      type: 'exposition',
      text: '常见场景：数值类型转换（int ↔ double、int ↔ char 等）。',
      code: 'double pi = 3.14159;\nint approx = static_cast<int>(pi);          // 3\nchar ch = static_cast<char>(65);            // A\nfloat f = static_cast<float>(pi);           // 3.14159f',
    },
    {
      type: 'exposition',
      text: '**向上转型（upcast）**：子类指针/引用转成父类指针/引用。在继承体系中，这是安全的。',
      code: 'class Base {};\nclass Derived : public Base {};\n\nDerived d;\nBase* bp = static_cast<Base*>(&d);  // 向上转型',
    },
    {
      type: 'multiple-choice',
      question: '以下哪个转换适合用 static_cast？',
      options: [
        { text: 'int* 转成 double*', correct: false, explanation: '指针类型不同不能随意 static_cast' },
        { text: 'double 转 int', correct: true, explanation: '数值类型转换是 static_cast 的典型用法' },
        { text: '去掉 const 属性', correct: false, explanation: '去 const 要用 const_cast' },
        { text: '运行时检查多态类型', correct: false, explanation: '运行时类型检查要用 dynamic_cast' },
      ],
    },
    {
      type: 'exposition',
      text: '`static_cast` 可以把 `void*` 转回原来的指针类型：',
      code: 'int x = 42;\nvoid* vp = &x;                        // 隐式转 void*\nint* ip = static_cast<int*>(vp);    // 转回 int*',
    },
    {
      type: 'exposition',
      text: '`static_cast` **不能**做的事：\n- 去掉 `const`（用 `const_cast`）\n- 运行时多态向下转型（用 `dynamic_cast`）\n- 两个不相关的类型之间转换',
    },
    {
      type: 'type-it',
      instruction: '练习 void* 与 static_cast 的配合：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int value = 42;\n  void* ptr = &value;\n  int* back = static_cast<int*>(ptr);\n  cout << *back << endl;\n}',
      hints: ['`void*` 可以隐式接收任意指针', '`static_cast<int*>(ptr)` 将 void* 恢复为 int*', '必须确保原来的类型确实是 int*'],
    },
    {
      type: 'exposition',
      text: '枚举类型和整数之间的转换：',
      code: 'enum class Color { Red, Green, Blue };\nint idx = static_cast<int>(Color::Green);   // 1\nColor c = static_cast<Color>(2);             // Color::Blue',
    },
    {
      type: 'multiple-choice',
      question: 'static_cast 的转换检查在什么时候进行？',
      options: [
        { text: '运行时', correct: false, explanation: 'static_cast 在编译期检查' },
        { text: '编译期', correct: true, explanation: 'static_cast 是编译期转换' },
        { text: '链接时', correct: false, explanation: '类型检查发生在编译期间' },
        { text: '不检查，和 C 风格一样', correct: false, explanation: 'static_cast 比 C 风格多做了一些编译期检查' },
      ],
    },
    {
      type: 'exposition',
      text: '`static_cast` 与隐式转换的区别：隐式转换是编译器自动做的，`static_cast` 是程序员显式写的。',
    },
    {
      type: 'exposition',
      text: '为什么显式写更好？代码读起来明确——"这里确实有个类型转换，我知道我在做什么"。而隐式转换可能被读代码的人忽略。',
    },
    {
      type: 'multiple-choice',
      question: '复习 p08-15 多态与继承：派生类转基类是哪种转换？',
      options: [
        { text: '向下转型（downcast）', correct: false, explanation: '派生类转基类是向上转型' },
        { text: '向上转型（upcast）', correct: true, explanation: '子类转父类是向上转型' },
        { text: '交叉转型', correct: false, explanation: '兄弟类之间是交叉转型' },
        { text: '不能转型', correct: false, explanation: '向上转型是安全的' },
      ],
    },
    {
      type: 'exposition',
      text: 'static_cast 的代码效率：因为编译期完成，不会产生运行时开销。比 dynamic_cast 轻量得多。',
    },
    {
      type: 'exposition',
      text: 'static_cast 的安全边界：\n- 可以做隐式允许的转换\n- 可以做反向隐式转换（显式缩窄）\n- 不能做不相关的类型间转换',
    },
    {
      type: 'exposition',
      text: '总结：\n- `static_cast` 用于编译期安全转换\n- 常见用法：数值转换、void* 恢复、向上转型、枚举转整数\n- 不能去 const，不能做运行时类型检查',
    },
  ],
}

export default lesson
