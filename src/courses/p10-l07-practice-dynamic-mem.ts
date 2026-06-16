import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'practice-dynamic-mem',
    chapter: 11,
    title: '动态内存练习',
    subtitle: '巩固 01-06',
    description: '综合练习 new/delete、数组、泄漏、悬空指针和双重删除。',
    objectives: ['能熟练使用 new/delete 和 new[]/delete[]', '能避免内存泄漏和悬空指针', '能写出安全的动态内存代码'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '前 6 课学了动态内存的基础操作。\n这一课来动手巩固——不引入新概念，只练习。',
      textAnimation: 'typewriter',
    },
    {
      type: 'type-it',
      instruction: '敲这段：堆上分配 int，赋值，释放。',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int* score = new int(100);\n  cout << "分数: " << *score << endl;\n  *score = 95;\n  cout << "修改后: " << *score << endl;\n  delete score;\n}',
      hints: ['`new int(100)` 分配并初始化', '用 `*score` 读写值', '最后 delete 释放'],
    },
    {
      type: 'exposition',
      text: '第一步热身完成——new、赋值、输出、delete。\n这是最标准的流程。',
    },
    {
      type: 'type-it',
      instruction: '敲这段：在堆上分配数组并求和。',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int n = 4;\n  int* arr = new int[n]{10, 20, 30, 40};\n  int sum = 0;\n  for (int i = 0; i < n; i++) {\n    sum += arr[i];\n  }\n  cout << "总和: " << sum << endl;\n  delete[] arr;\n}',
      hints: ['`new int[n]{...}` 初始化数组', '用循环遍历堆数组', '用 delete[] 释放数组'],
    },
    {
      type: 'multiple-choice',
      question: '复习第 1-6 课：下面哪个说法正确？',
      options: [
        { text: 'new 必须配 delete，new[] 必须配 delete[]', correct: true, explanation: '严格配对，不能混用' },
        { text: 'new[] 也可以用 delete 释放', correct: false, explanation: '数组版本必须用 delete[]' },
        { text: '忘记 delete 没事，程序结束会自动回收', correct: false, explanation: '长时间运行的程序等不到结束' },
        { text: 'delete 后指针自动变 nullptr', correct: false, explanation: '需要手动置空' },
      ],
    },
    {
      type: 'exposition',
      text: '安全写法要点回顾：\n- delete 后马上置空\n- 检查指针再使用\n- 谁 new 谁 delete',
    },
    {
      type: 'type-it',
      instruction: '敲这段：安全写法——delete 后置空。',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int* p = new int(88);\n  cout << "值: " << *p << endl;\n  delete p;\n  p = nullptr;\n  if (p == nullptr) {\n    cout << "已置空" << endl;\n  }\n}',
      hints: ['delete 后立即 p = nullptr', '置空后可以安全判断', '避免悬空和双删'],
    },
    {
      type: 'exposition',
      text: '下面来几个场景判断——看你能不能识别问题。',
    },
    {
      type: 'multiple-choice',
      question: '下面代码有什么问题？\n`int* p = new int(5); int* q = p; delete p; delete q;`',
      options: [
        { text: '没有问题，正常释放', correct: false, explanation: 'q 和 p 指向同一地址，重复 delete' },
        { text: 'double delete：p 和 q 指向同一内存', correct: true, explanation: '两个指针指向同一内存，delete 了两次' },
        { text: '内存泄漏：没释放干净', correct: false, explanation: '是释放多了，不是没释放' },
        { text: '悬空指针：p 还在用', correct: false, explanation: '这里的问题是 double delete' },
      ],
    },
    {
      type: 'exposition',
      text: '刚才的例子：两个指针指向同一块内存，其中一个释放了，另一个不知道。\n这也是多指针共享内存的危险。',
    },
    {
      type: 'exposition',
      text: '再看看泄漏的情况：',
      code: 'int* p = new int(10);\np = new int(20);  // 第一个 int 泄漏了\ndelete p;          // 只释放了第二个',
    },
    {
      type: 'fill-in',
      prompt: '补全代码：在堆上分配 100 个 double 的数组，给第一个元素赋值 3.14，然后释放。',
      template: 'double* data = ____ ____;\\ndata[0] = 3.14;\\n____ ____;',
      answers: ['new', 'double[100]', 'delete[]', 'data'],
      hints: ['第一个空是分配关键字', '第二个空是类型和大小', '第三和第四个空是释放语句'],
    },
    {
      type: 'exposition',
      text: '**练习要点总结**：\n- new/delete 是基本操作\n- 配对规则不能忘\n- 释放后置空\n- 避免泄漏、悬空、双删',
    },
    {
      type: 'type-it',
      instruction: '最后敲一个综合练习：函数返回堆数组，外部释放。',
      code: '#include <iostream>\nusing namespace std;\n\nint* makeRange(int start, int count) {\n  int* arr = new int[count];\n  for (int i = 0; i < count; i++) {\n    arr[i] = start + i;\n  }\n  return arr;\n}\n\nint main() {\n  int* nums = makeRange(5, 3);\n  for (int i = 0; i < 3; i++) {\n    cout << nums[i] << " ";\n  }\n  cout << endl;\n  delete[] nums;\n}',
      hints: ['函数内用 new[] 创建数组', '返回指针给调用方', '调用方负责 delete[] 释放'],
    },
    {
      type: 'exposition',
      text: '再看一个常见陷阱：**new 了之后忘记初始化。**\n堆内存不会自动清零，里面的值是上次使用留下的。',
      code: 'int* p = new int;  // *p 的值不确定！\ncout << *p;          // 可能输出任意值\n*p = 0;              // 一定要初始化',
    },
    {
      type: 'exposition',
      text: '解决方案：\n- `new int(0)` —— 构造时初始化\n- `new int[n]()` —— 值初始化（所有元素置 0）\n- 或者用 `vector` 自动管理',
    },
    {
      type: 'multiple-choice',
      question: '下面哪个写法能在 new 的同时初始化？',
      options: [
        { text: 'int* p = new int;', correct: false, explanation: '没有初始化，值不确定' },
        { text: 'int* p = new int(0);', correct: true, explanation: 'new int(0) 分配并初始化为 0' },
        { text: 'int* p = new int[];', correct: false, explanation: '语法错误' },
        { text: 'int* p = new int{};', correct: false, explanation: '这是 C++11 的列表初始化，但写法不对' },
      ],
    },
    {
      type: 'exposition',
      text: '记住：动态内存是 C++ 的重要能力，但也是 bug 的温床。\n熟练掌握配对规则和置空习惯，能避开 80% 的坑。',
      textAnimation: 'typewriter',
    },
  ],
}

export default lesson
