import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'bit-fields',
    chapter: 17,
    title: '位域',
    subtitle: '精确控制 bits',
    description: '学习结构体中的位域语法——用 : n 指定成员占用的位数，精确控制数据布局。',
    objectives: ['能写出位域结构体的定义', '能理解位域的适用场景', '能估算位域结构体的大小'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '有时你不需要一个完整的 `int`（32 位）来存数据。\n比如一个布尔值只需要 1 位，一个 0-7 的数字只需要 3 位。\n\n**位域（Bit Field）** 让你精确控制每个成员占用的位数。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '位域的语法——在结构体成员后面加 `: 位数`：\n\n```cpp\nstruct Flags {\n  unsigned int read : 1;    // 只占 1 位\n  unsigned int write : 1;   // 只占 1 位\n  unsigned int exec : 1;    // 只占 1 位\n  unsigned int mode : 5;    // 占 5 位（0-31）\n};\n```\n\n三个标志位只用了 3 位，而不是 3 个 int（96 位）。',
    },
    {
      type: 'exposition',
      text: '位域的实际布局：\n\n```cpp\nstruct Flags {\n  unsigned int read : 1;    // 位 0\n  unsigned int write : 1;   // 位 1\n  unsigned int exec : 1;    // 位 2\n  unsigned int mode : 5;    // 位 3-7\n};  // 总共 8 位 = 1 字节\n\nFlags f;\nf.read = 1;      // 设置读权限\nf.mode = 7;      // 设置模式为 7\n```\n\n但 `sizeof(Flags)` 可能不是 1——因为对齐！',
    },
    {
      type: 'exposition',
      text: '位域使用的注意事项：\n\n1. **只能用于整数类型**：`int`、`unsigned int`、`signed int`、`bool`\n2. **不能取地址**：`&f.read` 不行（因为位域不是字节对齐的）\n3. **不能有引用**：`int& ref = f.read;` 不行\n4. **不能是静态成员**',
    },
    {
      type: 'concept-cards',
      instruction: '位域的关键特性：',
      cards: [
        { glyph: '🎯', term: ': n 语法', meaning: '指定成员占 n 个位', example: 'int flag : 1;' },
        { glyph: '📦', term: '空间节省', meaning: '多个小值挤在一个 int 里', example: '8 个布尔值 = 1 字节' },
        { glyph: '🚫', term: '不能取地址', meaning: '位域没有字节地址', example: 'int* p = &f.bit; 报错' },
      ],
    },
    {
      type: 'exposition',
      text: '位域的典型用途——**硬件寄存器映射**：\n\n```cpp\nstruct DeviceControl {\n  unsigned int enabled : 1;\n  unsigned int interrupt : 1;\n  unsigned int speed : 2;     // 00=低, 01=中, 10=高, 11=极高\n  unsigned int reserved : 4;  // 保留位\n  unsigned int error : 1;\n  // 总共 9 位\n};\n\n// 直接映射到硬件寄存器地址\nvolatile DeviceControl* reg = (DeviceControl*)0x40001000;\nreg->enabled = 1;  // 启动设备\n```',
    },
    {
      type: 'type-it',
      instruction: '敲一个简单的位域结构体，存储 RGB 颜色分量：',
      code: 'struct RgbColor {\n  unsigned int r : 8;\n  unsigned int g : 8;\n  unsigned int b : 8;\n};',
      hints: ['每个颜色分量 0-255，正好 8 位', '三个分量共 24 位 = 3 字节', '但 sizeof 可能也是 4（对齐到 4）'],
    },
    {
      type: 'type-it',
      instruction: '敲一个位域的定义和使用：',
      code: 'struct Status {\n  unsigned int ready : 1;\n  unsigned int error : 1;\n  unsigned int code : 6;\n};\n\nStatus s{};\ns.ready = 1;',
      hints: ['`: 1` 表示该成员只占 1 位', '位域成员赋值跟普通成员一样', '`Status s{};` 把所有位初始化为 0'],
    },
    {
      type: 'exposition',
      text: '**匿名位域**——用于填充占位，不命名：\n\n```cpp\nstruct Packet {\n  unsigned int type : 4;\n  unsigned int : 4;         // 4 位填充（跳过不用的位）\n  unsigned int length : 8;\n};\n```\n\n无名位域用于"跳过"一些比特位（比如硬件协议中的保留位）。',
    },
    {
      type: 'exposition',
      text: '位域大小为 0 的特殊用法——**强制下一个成员从新的存储单元开始**：\n\n```cpp\nstruct Example {\n  unsigned int a : 4;\n  unsigned int : 0;          // 强制对齐到下一个 unsigned int\n  unsigned int b : 4;        // 从新的 4 字节边界开始\n};\n```',
    },
    {
      type: 'concept-cards',
      instruction: '位域 vs 普通结构体：',
      cards: [
        { glyph: '📏', term: '普通 struct', meaning: '每个成员有自己的字节', example: 'int flag; // 4 字节' },
        { glyph: '📐', term: '位域 struct', meaning: '成员可以跨字节挤一起', example: 'int flag : 1; // 1 位' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '关于位域，以下哪个说法正确？',
      options: [
        { text: '位域成员可以用 `int&` 引用', correct: false, explanation: '位域不能取地址，也不能绑定引用' },
        { text: '位域成员可以像普通成员一样赋值', correct: true, explanation: '赋值语法和普通成员一样' },
        { text: '位域可以定义任意类型', correct: false, explanation: '只能用于整数类型' },
        { text: '位域成员一定比普通成员快', correct: false, explanation: '位域需要额外的位操作，可能更慢' },
      ],
    },
    {
      type: 'type-it',
      instruction: '敲一个包含匿名位域的协议头结构体：',
      code: 'struct ProtocolHeader {\n  unsigned int version : 4;\n  unsigned int type : 4;\n  unsigned int : 8;\n  unsigned int length : 16;\n};',
      hints: ['匿名位域 `: 8` 表示 8 位填充', '用于对应硬件的保留位', '总大小可能是 4 字节（32 位）'],
    },
    {
      type: 'multiple-choice',
      question: '复习上一课：`1 << 4` 的值是多少？',
      options: [
        { text: '4', correct: false, explanation: '左移 4 位是乘 16' },
        { text: '16', correct: true, explanation: '1 << 4 = 2^4 = 16' },
        { text: '5', correct: false, explanation: '二进制 101 是 5' },
        { text: '8', correct: false, explanation: '1 << 3 才是 8' },
      ],
    },
    {
      type: 'exposition',
      text: '**位域的 sizeof 陷阱**：\n\n`struct Bits { unsigned int a : 3; unsigned int b : 5; };`\n虽然只用了 8 位（1 字节），\n但 `sizeof(Bits)` 很可能仍然是 **4 字节**——\n编译器按 `unsigned int` 的大小分配存储单元。\n\n所以位域节省的是"逻辑组合空间"，不是"单个结构体物理空间"。',
    },
    {
      type: 'exposition',
      text: '**位域的可移植性问题**：\n\n位域的**内存布局依赖于编译器实现**：\n- 不同的编译器可能从不同的方向分配位（从左到右或从右到左）\n- 位域能否跨字节边界也不一定\n\n因此位域在跨平台硬件编程中需要特别注意。\n如果需要精确布局，通常用位运算 + 手动移位更可靠。',
    },
    {
      type: 'type-it',
      instruction: '敲一个用 bool 类型的位域（在 C++ 中合法）：',
      code: 'struct BoolFlags {\n  bool isReady : 1;\n  bool isError : 1;\n  bool isBusy : 1;\n};',
      hints: ['`bool` 也可以作为位域类型', '每个布尔标志只用 1 位', '相比普通 bool 节省了 3/4 的空间'],
    },
    {
      type: 'exposition',
      text: '**位域总结**：\n\n- 用 `: n` 指定位数，节省空间\n- 适用于标志位、硬件寄存器、网络协议等\n- 不能取地址，效率未必更高\n- `: 0` 强制对齐，匿名位域做填充',
    },
  ],
}

export default lesson
