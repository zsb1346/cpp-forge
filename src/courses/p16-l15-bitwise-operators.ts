import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'bitwise-operators',
    chapter: 17,
    title: '位运算',
    subtitle: '& | ^ ~ << >>',
    description: '学习 C++ 的位运算符——直接操作二进制位，用于设置标志位、位掩码等底层编程。',
    objectives: ['能说出六种位运算符的名称和功能', '能写出位运算表达式', '能使用位掩码设置和检查标志位'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '程序中的数据最终都是二进制位（bit）。\n**位运算**直接操作这些二进制位——速度极快，常用于底层编程。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '六种位运算符：\n\n| 运算符 | 名称 | 举例 |\n|--------|------|------|\n| `&` | 按位与 | `5 & 3` → `1` |\n| `\\|` | 按位或 | `5 \\| 3` → `7` |\n| `^` | 按位异或 | `5 ^ 3` → `6` |\n| `~` | 按位取反 | `~5` → `-6` |\n| `<<` | 左移 | `5 << 1` → `10` |\n| `>>` | 右移 | `5 >> 1` → `2` |',
    },
    {
      type: 'exposition',
      text: '**按位与 `&`**——两个位都是 1 结果才是 1：\n\n```\n  0101  (5)\n& 0011  (3)\n--------\n  0001  (1)\n```\n\n常用于**取出某些位**或**清零**特定位置。',
    },
    {
      type: 'exposition',
      text: '**按位或 `|`**——只要有一个位是 1 结果就是 1：\n\n```\n  0101  (5)\n| 0011  (3)\n--------\n  0111  (7)\n```\n\n常用于**设置某些位为 1**。',
    },
    {
      type: 'exposition',
      text: '**按位异或 `^`**——两个位不同结果才是 1：\n\n```\n  0101  (5)\n^ 0011  (3)\n--------\n  0110  (6)\n```\n\n相同为 0，不同为 1。\n异或两次同一个数会**恢复原值**：`(a ^ b) ^ b == a`。',
    },
    {
      type: 'exposition',
      text: '**按位取反 `~`**——0 变 1，1 变 0：\n\n```\n~ 0000 0000 0000 0101  (5)\n  ---------------------------\n  1111 1111 1111 1010  (-6，补码表示)\n```\n\n注意有符号整数的最高位是符号位。',
    },
    {
      type: 'exposition',
      text: '**左移 `<<`**——所有位向左移动：\n\n```\n  0101  (5) << 1 = 1010 (10)   // 左移 1 位 = 乘 2\n  0101  (5) << 2 = 10100 (20)  // 左移 2 位 = 乘 4\n```\n\n**右移 `>>`**——所有位向右移动：\n\n```\n  0101  (5) >> 1 = 0010 (2)    // 右移 1 位 = 整除 2\n```',
    },
    {
      type: 'concept-cards',
      instruction: '六种位运算符：',
      cards: [
        { glyph: '🔀', term: '& 按位与', meaning: '同 1 才 1，清零用', example: 'flags & MASK' },
        { glyph: '🔀', term: '| 按位或', meaning: '有 1 就 1，设值用', example: 'flags |= BIT' },
        { glyph: '🔀', term: '^ 异或', meaning: '不同才 1，翻转用', example: 'flags ^= BIT' },
        { glyph: '🔀', term: '~ 取反', meaning: '0↔1 翻转所有位', example: '~flags' },
        { glyph: '⬅️', term: '<< 左移', meaning: '位向左移 ×2ⁿ', example: '1 << 3 = 8' },
        { glyph: '➡️', term: '>> 右移', meaning: '位向右移 ÷2ⁿ', example: '16 >> 2 = 4' },
      ],
    },
    {
      type: 'type-it',
      instruction: '敲一个左移运算，把 1 左移 3 位：',
      code: 'int result = 1 << 3;',
      hints: ['`<<` 左移运算符', '`1 << 3` 等于 `1 * 2^3 = 8`', '每个左移一位相当于乘以 2'],
    },
    {
      type: 'exposition',
      text: '**位掩码（Bit Mask）**——用位运算管理一组开关：\n\n```cpp\n// 定义标志位（每个位代表一个状态）\nconst int READ_PERM  = 1 << 0;  // 0001（读权限）\nconst int WRITE_PERM = 1 << 1;  // 0010（写权限）\nconst int EXEC_PERM  = 1 << 2;  // 0100（执行权限）\n\nint permissions = 0;\n\n// 设置写权限\npermissions |= WRITE_PERM;       // permissions = 0010\n\n// 检查是否有读权限\nif (permissions & READ_PERM) { ... }  // false（没有）\n\n// 取消写权限\npermissions &= ~WRITE_PERM;      // permissions = 0000\n```',
    },
    {
      type: 'type-it',
      instruction: '敲一段用位掩码检查标志位的代码：',
      code: 'int flags = 0b0101;\nint mask = 0b0100;\nif (flags & mask) {\n  cout << "位已设置" << endl;\n}',
      hints: ['`flags & mask` 结果非零表示该位为 1', '`0b0101` 是 C++14 起的二进制字面量', '位运算的结果是一个整数，if 判断它是否非 0'],
    },
    {
      type: 'concept-cards',
      instruction: '位运算的常见用途：',
      cards: [
        { glyph: '🏁', term: '标志位管理', meaning: '用一个整数存多个布尔值', example: '权限/属性' },
        { glyph: '⚡', term: '快速乘除', meaning: '<< 乘 2，>> 除 2', example: 'x << 3 = x × 8' },
        { glyph: '🔄', term: '异或交换', meaning: 'a ^= b; b ^= a; a ^= b', example: '不需要临时变量' },
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全位运算代码：定义一个左移常量来标识第 3 位。',
      template: 'const int BIT_3 = 1 ____ 3;\nint value = 0;\nvalue ____ BIT_3;  // 设置第 3 位',
      answers: ['<<', '|='],
      hints: ['左移用 <<', '设置位用按位或赋值 |='],
    },
    {
      type: 'exposition',
      text: '**小心有符号数的右移**：\n\n- **无符号数**：右移时左边补 0（逻辑右移）\n- **有符号负数**：右移时左边补 1（算术右移，保持符号）\n\n```cpp\nunsigned int u = 0x80000000;\nu >>= 1;   // → 0x40000000（补 0）\n\nint s = -8;  // 1111...1000\ns >>= 1;     // → -4（补 1，仍然为负数）\n```',
    },
    {
      type: 'type-it',
      instruction: '敲一段检查某一位是否为 1 的代码：',
      code: 'bool isSet(int value, int bit) {\n  return (value >> bit) & 1;\n}',
      hints: ['`value >> bit` 把目标位移到最低位', '`& 1` 只保留最低位', '结果是 1 表示该位被设置了'],
    },
    {
      type: 'multiple-choice',
      question: '`5 ^ 5` 的结果是什么？',
      options: [
        { text: '5', correct: false, explanation: '异或相同的数结果为 0' },
        { text: '0', correct: true, explanation: '任何数与自身异或结果为 0' },
        { text: '10', correct: false, explanation: '那是 5 << 1 的结果' },
        { text: '25', correct: false, explanation: '那是乘法' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '复习第 12 课：以下哪项是堆的正确使用方式？',
      options: [
        { text: '`int x = new int;`', correct: false, explanation: 'new 返回指针，x 应该是 int*' },
        { text: '`int* p = new int(10); delete p;`', correct: true, explanation: '正确分配和释放堆内存' },
        { text: '`int* p = new int[10]; delete p;`', correct: false, explanation: '数组应该用 delete[]' },
        { text: '`int x; delete x;`', correct: false, explanation: 'delete 只能用于 new 分配的指针' },
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全代码：使用位运算清除（设置为 0）第 2 位。',
      template: 'int flags = 0b1111;\nint mask = 1 ____ 2;\nflags ____ ~mask;',
      answers: ['<<', '&='],
      hints: ['先左移构造一个在第 2 位的 1', '用按位与赋值清除特定位', '~mask 把目标位变成 0，其他位都是 1'],
    },
  ],
}

export default lesson
