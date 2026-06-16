import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'practice-casting',
    chapter: 18,
    title: '类型转换练习',
    subtitle: '巩固 10-13',
    description: '综合练习四种 C++ 类型转换的使用和选择。',
    objectives: ['能根据需要选择合适的 C++ 类型转换', '能正确编写四种 cast 的代码', '能理解并避免 C 风格强转'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '这个练习课巩固四种 C++ 类型转换。通过动手练习加深理解。',
    },
    {
      type: 'type-it',
      instruction: '练习 1：static_cast——数值转换：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  double a = 9.99;\n  int b = static_cast<int>(a);\n  cout << b << endl;\n  char c = static_cast<char>(b + 55);\n  cout << c << endl;\n}',
      hints: ['`static_cast<int>(9.99)` 截断小数部分', 'ASCII 65 对应 A，67 对应 C', 'static_cast 编译期完成，零运行时开销'],
    },
    {
      type: 'exposition',
      text: '练习 2：在继承体系中选择正确的 cast。',
    },
    {
      type: 'multiple-choice',
      question: '场景：一个 Animal 引用，你要调用 Dog 特有的 bark() 方法。需要先检查实际类型是否为 Dog。选哪个？',
      options: [
        { text: 'static_cast<Dog*>(&animal)', correct: false, explanation: 'static_cast 不检查类型，可能产生 UB' },
        { text: 'dynamic_cast<Dog*>(&animal)', correct: true, explanation: 'dynamic_cast 运行时检查，失败返回 nullptr' },
        { text: 'reinterpret_cast<Dog*>(&animal)', correct: false, explanation: 'reinterpret_cast 是位重解释，不做类型检查' },
        { text: 'const_cast<Dog*>(&animal)', correct: false, explanation: 'const_cast 只处理 const 属性' },
      ],
    },
    {
      type: 'type-it',
      instruction: '练习 3：dynamic_cast 的多态判断：',
      code: '#include <iostream>\nusing namespace std;\n\nstruct Base {\n  virtual ~Base() = default;\n};\nstruct A : Base {};\nstruct B : Base {};\n\nint main() {\n  A a;\n  Base* bp = &a;\n  if (dynamic_cast<B*>(bp)) {\n    cout << "是 B" << endl;\n  } else {\n    cout << "不是 B" << endl;\n  }\n}',
      hints: ['`dynamic_cast<B*>(bp)` 检查 bp 实际指向的是否为 B', '因为 bp 指向 A，所以转型失败', 'dynamic_cast 需要基类有虚函数'],
    },
    {
      type: 'exposition',
      text: '练习 4：const_cast 的正确使用场景。',
    },
    {
      type: 'multiple-choice',
      question: '场景：你有一个 const char*，需要传给一个旧 C 函数 void edit(char* s)。该函数实际上不会修改字符串。选哪个？',
      options: [
        { text: '直接传参，让编译器隐式转换', correct: false, explanation: '编译器不允许 const char* 隐式转 char*' },
        { text: 'const_cast<char*>(str)', correct: true, explanation: 'const_cast 去掉 const，适合与旧 C 库兼容' },
        { text: 'reinterpret_cast<char*>(str)', correct: false, explanation: '这里只需要去 const，不需要位重解释' },
        { text: 'static_cast<char*>(str)', correct: false, explanation: 'static_cast 不能去 const' },
      ],
    },
    {
      type: 'type-it',
      instruction: '练习 5：const_cast 配合旧 C 函数：',
      code: '#include <iostream>\n#include <cstring>\nusing namespace std;\n\nint main() {\n  const char* src = "Hello World";\n  char buf[32];\n  strcpy(buf, const_cast<char*>(src));\n  cout << buf << endl;\n}',
      hints: ['`const_cast<char*>(src)` 去掉 const 调用 strlen/strcpy', '确保原始对象本身不是真正的 const', 'const_cast 仅去除类型检查，无运行时开销'],
    },
    {
      type: 'exposition',
      text: '练习 6：reinterpret_cast 的底层操作。',
    },
    {
      type: 'multiple-choice',
      question: '场景：你要将一个 int 的地址以字节形式写入二进制文件。选哪个？',
      options: [
        { text: 'static_cast<char*>(&x)', correct: false, explanation: 'static_cast 不能把 int* 转 char*' },
        { text: 'dynamic_cast<char*>(&x)', correct: false, explanation: 'dynamic_cast 用于多态类型' },
        { text: 'reinterpret_cast<char*>(&x)', correct: true, explanation: 'reinterpret_cast 适合位重解释' },
        { text: 'const_cast<char*>(&x)', correct: false, explanation: 'const_cast 只处理 const 属性' },
      ],
    },
    {
      type: 'exposition',
      text: '练习 7：用 fill-in 检查你对四种 cast 的掌握。',
    },
    {
      type: 'fill-in',
      prompt: '选择合适的 C++ 转换，将 const int* 转为 int* 以便修改（假设原始对象非 const）：',
      template: 'const int* cp = &x;\nint* p = ____<int*>(cp);',
      answers: ['const_cast'],
      hints: ['去掉 const 属性', 'static_cast 不能去 const', 'reinterpret_cast 可以但没必要'],
    },
    {
      type: 'exposition',
      text: '最终检查：能否根据场景回忆四种 cast 的名字？',
    },
    {
      type: 'multiple-choice',
      question: '复习课程 10-13：以下哪种对应关系不正确？',
      options: [
        { text: '编译期数值转换 → static_cast', correct: false, explanation: '这是正确的对应关系' },
        { text: '运行时多态检查 → dynamic_cast', correct: false, explanation: '这是正确的对应关系' },
        { text: '去掉 const 属性 → reinterpret_cast', correct: true, explanation: '去 const 应该是 const_cast，不是 reinterpret_cast' },
        { text: '指针位重解释 → reinterpret_cast', correct: false, explanation: '这是正确的对应关系' },
      ],
    },
    {
      type: 'exposition',
      text: '练习完成！你巩固了四种 cast 的核心用法和选择策略。',
    },
    {
      type: 'exposition',
      text: '记住的选择口诀：\n- 数值转 → static_cast\n- 多态查 → dynamic_cast\n- 去 const → const_cast\n- 字节转 → reinterpret_cast',
    },
    {
      type: 'exposition',
      text: '下一课是阶段 17 的最后一课——综合复习，全面回顾智能指针和类型转换。',
    },
    {
      type: 'exposition',
      text: '如果你在练习中发现薄弱环节，建议回到对应课程重新学习后再继续。',
    },
  ],
}

export default lesson
