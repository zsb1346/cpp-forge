import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'const-cast-reinterpret',
    chapter: 18,
    title: 'const_cast 和 reinterpret_cast',
    subtitle: '去 const 和位重解释',
    description: '学习 const_cast 去掉 const 属性，reinterpret_cast 按位重解释内存。',
    objectives: ['能用 const_cast 去掉 const 属性', '能用 reinterpret_cast 做低层转换', '能理解这两种 cast 的风险和使用场景'],
    estimatedMinutes: 8,
  },
  blocks: [
    {
      type: 'exposition',
      text: '`static_cast` 不能去掉 `const`。需要专门的工具——`const_cast`。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '`const_cast` 的唯一用途：去掉（或添加）`const`（或 `volatile`）属性。',
      code: 'const int ci = 42;\nint* ip = const_cast<int*>(&ci);  // 去掉 const\n*ip = 100;  // 危险！如果 ci 本身是 const，修改是 UB',
    },
    {
      type: 'exposition',
      text: '⚠️ 只能对**原本不是 const** 的对象用 const_cast 去修改它。对真正的 const 变量去 const 再修改，是未定义行为。',
    },
    {
      type: 'multiple-choice',
      question: 'const_cast 的主要用途是什么？',
      options: [
        { text: '将整数转换为浮点数', correct: false, explanation: '数值转换用 static_cast' },
        { text: '去掉对象的 const 属性', correct: true, explanation: 'const_cast 唯一用途就是改变 const/volatile 限定' },
        { text: '在继承体系里做类型转换', correct: false, explanation: '继承体系中用 static_cast 或 dynamic_cast' },
        { text: '将一种指针类型转为另一种', correct: false, explanation: '指针类型转换用 reinterpret_cast' },
      ],
    },
    {
      type: 'exposition',
      text: '实际场景：有些旧 C 库函数的参数是 `char*` 但不是 const，但你有 `const char*`。这种情况下用 `const_cast` 适配。',
      code: 'void old_c_library_func(char* str);\n\nconst char* msg = "hello";\n// 合法：msg 指向的字符串字面量本身不是 const\nold_c_library_func(const_cast<char*>(msg));',
    },
    {
      type: 'exposition',
      text: '接下来——`reinterpret_cast`。它"重新解释"内存的二进制位，不管类型系统。',
    },
    {
      type: 'exposition',
      text: '`reinterpret_cast` 几乎什么都能转——但它不修改二进制位，只是告诉编译器"把这串二进制位当作另一种类型看"。',
      code: 'int i = 42;\nint* ip = &i;\n// 把 int* 转成 char*——按字节看内存\nchar* cp = reinterpret_cast<char*>(ip);',
    },
    {
      type: 'multiple-choice',
      question: 'reinterpret_cast 的主要风险是什么？',
      options: [
        { text: '运行速度太慢', correct: false, explanation: 'reinterpret_cast 不产生任何代码，编译期完成' },
        { text: '绕过了类型系统，容易产生未定义行为', correct: true, explanation: '它让编译器不再检查类型，容易出错' },
        { text: '每次使用都需要 try/catch', correct: false, explanation: 'reinterpret_cast 不抛异常' },
        { text: '不能用于指针', correct: false, explanation: 'reinterpret_cast 主要用于指针和整数之间的转换' },
      ],
    },
    {
      type: 'exposition',
      text: '典型场景：序列化——把结构体指针转成 `char*` 写入文件或网络。',
      code: 'struct Packet {\n  int id;\n  float value;\n};\n\nPacket p{1, 3.14f};\nchar* bytes = reinterpret_cast<char*>(&p);\n// 现在可以把 bytes 写入文件',
    },
    {
      type: 'exposition',
      text: '指针和整数之间的转换：',
      code: 'int x = 42;\nuintptr_t addr = reinterpret_cast<uintptr_t>(&x);\n// 把地址存为整数\nint* back = reinterpret_cast<int*>(addr);',
    },
    {
      type: 'type-it',
      instruction: '练习 const_cast——去除 const 调用旧函数：',
      code: '#include <iostream>\nusing namespace std;\n\nvoid print(char* s) {\n  cout << s << endl;\n}\n\nint main() {\n  const char* msg = "Hello";\n  print(const_cast<char*>(msg));\n}',
      hints: ['`const_cast<char*>(msg)` 去掉 const', '只有原始对象非 const 才安全', 'const_cast 只改变类型，运行时无开销'],
    },
    {
      type: 'type-it',
      instruction: '练习 reinterpret_cast——查看整数的字节表示：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int x = 0x12345678;\n  char* p = reinterpret_cast<char*>(&x);\n  for (int i = 0; i < 4; i++) {\n    cout << hex << (int)p[i] << " ";\n  }\n}',
      hints: ['`reinterpret_cast<char*>(&x)` 按字节看 int', '输出依赖于系统大小端', 'hex 让 cout 输出十六进制'],
    },
    {
      type: 'exposition',
      text: '⚠️ `reinterpret_cast` 是最危险的 cast。大多数情况下不应该使用它。只在低层系统编程、序列化、硬件交互等场景使用。',
    },
    {
      type: 'multiple-choice',
      question: '以下哪种场景应该考虑 reinterpret_cast？',
      options: [
        { text: 'int 转 double 做数学计算', correct: false, explanation: '数值转换用 static_cast' },
        { text: '父类指针转子类指针', correct: false, explanation: '向下转型用 dynamic_cast 或 static_cast' },
        { text: '将结构体指针转成字节数组做序列化', correct: true, explanation: 'reinterpret_cast 适合低层内存操作' },
        { text: '去掉 const 调用函数', correct: false, explanation: '去掉 const 用 const_cast' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '复习前一课：dynamic_cast 在引用形式下转换失败会怎样？',
      options: [
        { text: '返回 nullptr', correct: false, explanation: '引用不能为 null，指针才返回 nullptr' },
        { text: '抛出 bad_cast 异常', correct: true, explanation: '引用形式失败时抛出 std::bad_cast' },
        { text: '返回默认值', correct: false, explanation: '不返回默认值' },
        { text: '编译错误', correct: false, explanation: '编译期不检查具体类型' },
      ],
    },
    {
      type: 'exposition',
      text: 'const_cast 的一个重要原则：如果你发现自己需要 const_cast 来修改一个原本定义为 const 的对象，说明设计有问题。',
    },
    {
      type: 'exposition',
      text: 'reinterpret_cast 的一个重要限制：不能用它去掉 `const` 属性。必须先 const_cast 再去 const，或者用 static_cast 做组合。',
    },
    {
      type: 'exposition',
      text: '总结：\n- `const_cast`：改 const/volatile，仅此而已\n- `reinterpret_cast`：按位重解释，风险最高\n- 这两种 cast 都说明代码在做"特殊操作"——需要仔细检查和注释',
    },
  ],
}

export default lesson
