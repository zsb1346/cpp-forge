import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'struct-padding',
    chapter: 17,
    title: '结构体对齐',
    subtitle: 'sizeof 不是你以为的',
    description: '学习结构体成员的"对齐"机制——为什么 struct 的大小不等于成员大小简单相加。',
    objectives: ['能解释什么是结构体对齐', '能估算结构体的大小', '能使用 #pragma pack 控制对齐'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '试试看：\n\n```cpp\nstruct Example {\n  char c;      // 1 字节\n  int i;       // 4 字节\n};\n\ncout << sizeof(Example);  // 结果是？\n```\n\n你可能会猜 5。但实际通常是 **8**。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '为什么是 8 不是 5？\n\n因为 CPU 读取内存的**对齐要求**（Alignment）。\n\n- CPU 读取 4 字节整数时，如果地址是 4 的倍数，一次就读完了\n- 如果地址不是 4 的倍数，要分两次读，慢！\n\n编译器为了提高性能，在成员之间插入**填充字节（Padding）**。',
    },
    {
      type: 'exposition',
      text: '上面的例子实际布局：\n\n```\nchar c  → 偏移 0（1 字节）\n// 3 字节填充（为了把 i 对齐到 4 的倍数）\nint i   → 偏移 4（4 字节）\n--------------------------\n总大小：8 字节\n```\n\n`c` 占了 1 个字节，然后编译器空出 3 个字节，\n再把 `i` 放在偏移 4 的位置——4 的倍数。',
    },
    {
      type: 'exposition',
      text: '不同数据类型的对齐要求：\n\n| 类型 | 大小 | 对齐要求 |\n|------|------|---------|\n| `char` | 1 | 1（任意地址）|\n| `short` | 2 | 2（偶数地址）|\n| `int` | 4 | 4（4 的倍数）|\n| `double` | 8 | 8（8 的倍数）|\n\n每个成员要从"对齐要求倍数"的偏移处开始存放。',
    },
    {
      type: 'concept-cards',
      instruction: '对齐相关的概念：',
      cards: [
        { glyph: '📏', term: '对齐(Alignment)', meaning: '数据从地址倍数处开始', example: 'int 在 4 的倍数地址' },
        { glyph: '🧱', term: '填充(Padding)', meaning: '成员之间的空字节', example: 'char 后的 3 个空字节' },
        { glyph: '📐', term: '结构体总大小', meaning: '成员 + 填充，对齐到最大成员', example: '末尾也可能有填充' },
      ],
    },
    {
      type: 'exposition',
      text: '另一个例子——**成员顺序影响大小**：\n\n```cpp\nstruct A {              // struct B {\n  char c;     // 1       //   double d;  // 8\n  double d;   // 8       //   char c;    // 1\n  short s;    // 2       //   short s;   // 2\n};                      // };\n// sizeof(A) = ?        // sizeof(B) = ?\n```\n\n把大的成员放在前面能减少填充！',
    },
    {
      type: 'exposition',
      text: '`A` 的布局（`char → double → short`）：\n\n```\nc → 偏移 0（1 字节）\n// 7 字节填充（对齐 double 到 8）\nd → 偏移 8（8 字节）\ns → 偏移 16（2 字节）\n// 6 字节填充（结构体末尾对齐到 8）\n总大小：24\n```',
    },
    {
      type: 'exposition',
      text: '`B` 的布局（`double → short → char`）：\n\n```\nd → 偏移 0（8 字节）\ns → 偏移 8（2 字节）\nc → 偏移 10（1 字节）\n// 5 字节填充（末尾对齐到 8）\n总大小：16\n```\n\n**把大的成员放前面更省空间！**',
    },
    {
      type: 'type-it',
      instruction: '敲一个结构体，把最大的成员放在第一来减少填充：',
      code: 'struct Optimized {\n  double val;\n  int count;\n  char name[8];\n};',
      hints: ['`double` 最大（8 字节），放第一', '大成员在前可以减少填充字节', '结构体总大小会按最大成员对齐'],
    },
    {
      type: 'multiple-choice',
      question: '以下关于结构体对齐的说法，哪个正确？',
      options: [
        { text: 'struct 大小就是成员大小之和', correct: false, explanation: '由于 padding，通常大于成员之和' },
        { text: 'struct 大小 ≥ 成员大小之和', correct: true, explanation: 'padding 会使总大小等于或大于成员之和' },
        { text: '改变成员顺序不影响 struct 大小', correct: false, explanation: '成员顺序影响 padding 的多少' },
        { text: 'struct 中不能有 padding', correct: false, explanation: '编译器会自动插入 padding 满足对齐' },
      ],
    },
    {
      type: 'exposition',
      text: '**`#pragma pack`**——强制紧凑对齐：\n\n```cpp\n#pragma pack(push, 1)  // 按 1 字节对齐（不填充）\nstruct Packed {\n  char c;\n  int i;\n};\n#pragma pack(pop)      // 恢复默认\n// sizeof(Packed) = 5\n```\n\n但这是以**牺牲速度**为代价的——可能访问变慢。',
    },
    {
      type: 'concept-cards',
      instruction: '对齐优化建议：',
      cards: [
        { glyph: '📏', term: '大成员在前', meaning: '按大小降序排列成员', example: 'double → int → char' },
        { glyph: '💨', term: '默认对齐最快', meaning: 'CPU 一次读完整数据', example: 'int 在 4 倍数地址' },
        { glyph: '📦', term: '#pragma pack', meaning: '强制紧凑但可能变慢', example: '网络协议传输用' },
      ],
    },
    {
      type: 'code-runner',
      instruction: '运行下面的代码，观察结构体的大小。试着改变成员顺序看看结果：',
      code: `#include <iostream>
using namespace std;

struct Test {
  char a;
  int  b;
  short c;
};

int main() {
  cout << "char size: " << sizeof(char) << endl;
  cout << "int size: " << sizeof(int) << endl;
  cout << "short size: " << sizeof(short) << endl;
  cout << "Test size: " << sizeof(Test) << endl;
  return 0;
}`,
      expectedOutput: 'char size: 1\nint size: 4\nshort size: 2\nTest size: 12',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'exposition',
      text: '上面代码输出 12 而不是 1+4+2=7，因为：\n- `char a` 在偏移 0\n- 3 字节填充（对齐 `int` 到 4）\n- `int b` 在偏移 4\n- `short c` 在偏移 8\n- 2 字节末尾填充（对齐结构体到 4）\n- 总大小 = 12',
    },
    {
      type: 'type-it',
      instruction: '敲一个结构体，让成员按大小降序排列：',
      code: 'struct Descending {\n  double big;\n  int medium;\n  short small;\n  char tiny;\n};',
      hints: ['从最大类型到最小类型', '`double` → `int` → `short` → `char`', '这样填充字节最少'],
    },
    {
      type: 'multiple-choice',
      question: '复习第 10 课：全局变量`int arr[1000];`（未初始化）存放在哪个区域？',
      options: [
        { text: '栈（Stack）', correct: false, explanation: '全局变量不在栈上' },
        { text: '堆（Heap）', correct: false, explanation: '堆用于动态分配' },
        { text: 'BSS 段', correct: true, explanation: '未初始化的全局变量在 BSS 段' },
        { text: '代码段（Text）', correct: false, explanation: '代码段存的是指令' },
      ],
    },
    {
      type: 'exposition',
      text: '结构体对齐总结：\n\n- 编译器在成员之间自动插入填充字节\n- 这是为了 CPU 读取效率\n- 成员顺序影响结构体大小——大成员在前更省空间\n- `#pragma pack` 可以压紧，但可能降低速度',
    },
    {
      type: 'type-it',
      instruction: '敲一个包含 char、int、double 的结构体，按最大在前排列：',
      code: 'struct Aligned {\n  double d;\n  int i;\n  char c;\n};',
      hints: ['double（8 字节）排第一', 'int（4 字节）排第二', 'char（1 字节）排最后'],
    },
    {
      type: 'exposition',
      text: '**`offsetof` 宏**——查看成员在结构体中的偏移量：\n\n```cpp\n#include <cstddef>\n#include <iostream>\nusing namespace std;\n\nstruct Test { char c; int i; };\n\nint main() {\n  cout << offsetof(Test, c);  // 0\n  cout << offsetof(Test, i);  // 4（不是 1！因为 padding）\n}\n```\n\n可以用 `offsetof` 来验证你的对齐分析是否正确。',
    },
  ],
}

export default lesson
