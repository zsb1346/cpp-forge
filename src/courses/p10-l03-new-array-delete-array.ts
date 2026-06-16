import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'new-array-delete-array',
    chapter: 11,
    title: '数组 new/delete',
    subtitle: '数组在堆上',
    description: '学习用 new[] 在堆上分配数组，用 delete[] 释放数组。配对规则必须严格遵循。',
    objectives: ['能用 new[] 在堆上分配数组', '能用 delete[] 释放堆数组', '能理解 new/delete 和 new[]/delete[] 必须严格配对'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '不仅单个变量可以上堆，**数组**也可以。\n用 `new[]` 分配数组，用 `delete[]` 释放。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '在堆上分配一个数组：',
      code: 'int* arr = new int[10];  // 分配 10 个 int 的数组',
    },
    {
      type: 'exposition',
      text: '`new int[10]` 在堆上分配了**连续**的 10 个 `int` 空间。\n返回的指针指向第一个元素。',
    },
    {
      type: 'type-it',
      instruction: '敲这段：在堆上分配数组并赋值。',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int* arr = new int[5];\n  arr[0] = 10;\n  arr[1] = 20;\n  arr[2] = 30;\n  arr[3] = 40;\n  arr[4] = 50;\n  for (int i = 0; i < 5; i++) {\n    cout << arr[i] << " ";\n  }\n  delete[] arr;\n}',
      hints: ['`new int[5]` 分配 5 个 int 的数组', '用 `arr[i]` 访问元素，和普通数组一样', '释放时用 `delete[] arr`，注意 []'],
    },
    {
      type: 'exposition',
      text: '访问堆数组的元素和栈数组完全一样——用 `[]` 下标。',
      code: 'arr[0] = 1;\narr[1] = 2;\n// 和栈数组一样用',
    },
    {
      type: 'exposition',
      text: '**释放必须用 `delete[]`**——这是最关键的规则。\n如果用 `delete arr`（不加 `[]`），结果是**未定义行为**。',
    },
    {
      type: 'exposition',
      text: '同理：`new` 对应 `delete`，`new[]` 对应 `delete[]`。\n配对错误会导致程序崩溃或内存泄漏。',
      code: 'int* a = new int;      // ✅ 用 delete\nint* b = new int[10];  // ✅ 用 delete[]\n\ndelete a;    // ✅\ndelete[] b;  // ✅\n\n// delete[] a;  // ❌ 错误\n// delete b;    // ❌ 未定义行为',
    },
    {
      type: 'type-it',
      instruction: '敲这段：配对的 new[] 和 delete[]。',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int size = 3;\n  int* nums = new int[size];\n  nums[0] = 7;\n  nums[1] = 8;\n  nums[2] = 9;\n  cout << nums[0] + nums[2] << endl;\n  delete[] nums;\n}',
      hints: ['数组大小可以是变量（这里是 size）', '下标从 0 开始', '一定用 delete[] 释放'],
    },
    {
      type: 'exposition',
      text: '堆数组的大小可以是**运行时确定的变量**——这是栈数组做不到的。',
      code: 'int n;\ncin >> n;\nint* arr = new int[n];  // ✅ 正确，n 在运行时确定\n// int arr[n];           // ❌ 大部分编译器不允许',
    },
    {
      type: 'exposition',
      text: '`new[]` 也可以初始化：',
      code: 'int* arr = new int[3]{1, 2, 3};  // C++11 起支持',
    },
    {
      type: 'multiple-choice',
      question: '用 new[] 分配数组后，应该用什么释放？',
      options: [
        { text: 'delete', correct: false, explanation: 'delete 对应 new，不是 new[]' },
        { text: 'delete[]', correct: true, explanation: 'new[] 必须配 delete[]' },
        { text: 'free()', correct: false, explanation: 'free 是 C 的用法，和 new 不配对' },
        { text: '不需要释放', correct: false, explanation: '堆内存必须手动释放，否则泄漏' },
      ],
    },
    {
      type: 'exposition',
      text: '不配对的一个后果：\n- 用 `delete` 释放 `new[]` 的数组：可能只释放了第一个元素\n- 用 `delete[]` 释放 `new` 的单个变量：可能崩溃',
    },
    {
      type: 'exposition',
      text: '这些错误编译器不会报错——它们是**运行时的未定义行为**。\n可能现在没事，下个系统版本就崩了。',
    },
    {
      type: 'fill-in',
      prompt: '补全代码：在堆上分配 10 个 int 的数组，赋值第一个元素为 5，然后释放。',
      template: 'int* data = ____ ____;\\ndata[0] = 5;\\n____ ____;',
      answers: ['new', 'int[10]', 'delete[]', 'data'],
      hints: ['第一个空是分配关键字 new', '第二个空是类型和大小', '第三和第四个空是释放关键字和目标'],
    },
    {
      type: 'multiple-choice',
      question: '复习上一课：`new int(42)` 和 `new int[10]` 分别应该用什么释放？',
      options: [
        { text: '都用 delete', correct: false, explanation: '数组版本必须用 delete[]' },
        { text: 'delete 和 delete[]', correct: true, explanation: 'new 配 delete，new[] 配 delete[]' },
        { text: '都用 delete[]', correct: false, explanation: '单个变量不能用 delete[]' },
        { text: '都不需要释放', correct: false, explanation: '堆内存都需要手动释放' },
      ],
    },
    {
      type: 'exposition',
      text: '堆数组可以和函数配合：在函数内创建、返回，在外部释放。',
      code: 'int* makeArray(int n) {\n  return new int[n];  // 返回堆数组\n}\n\nint main() {\n  int* arr = makeArray(100);\n  // 使用 arr...\n  delete[] arr;\n}',
    },
    {
      type: 'type-it',
      instruction: '敲最后的示例：函数创建堆数组，main 中释放。',
      code: '#include <iostream>\nusing namespace std;\n\nint* createArray(int n) {\n  int* arr = new int[n];\n  for (int i = 0; i < n; i++) {\n    arr[i] = i * 2;\n  }\n  return arr;\n}\n\nint main() {\n  int* a = createArray(5);\n  for (int i = 0; i < 5; i++) {\n    cout << a[i] << " ";\n  }\n  delete[] a;\n}',
      hints: ['函数内 new[] 分配的数组可以返回', '外部接收后正常使用', '最后 delete[] 释放'],
    },
    {
      type: 'exposition',
      text: '记住核心规则：\n- `new` ↔ `delete`\n- `new[]` ↔ `delete[]`\n- **永不混用，一一配对**。',
      textAnimation: 'typewriter',
    },
  ],
}

export default lesson
