import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'double-delete',
    chapter: 11,
    title: '重复 delete',
    subtitle: '同一内存释放两次',
    description: '对同一块内存 delete 两次是未定义行为，可能导致程序崩溃。',
    objectives: ['能理解 double delete 的危害', '能避免重复 delete', '能理解 delete 后置空的作用'],
    estimatedMinutes: 8,
  },
  blocks: [
    {
      type: 'exposition',
      text: '前面说了 `new` 配 `delete`——但同一个指针不能 `delete` 两次。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '**双重删除（double delete）**：对同一块堆内存调用两次 `delete`。\n这是未定义行为——后果不可预测。',
    },
    {
      type: 'exposition',
      text: '看一个例子：',
      code: 'int* p = new int(42);\ndelete p;   // 第一次释放\n\n// ... 很多代码后 ...\n\ndelete p;   // ❌ 第二次释放！未定义行为',
    },
    {
      type: 'exposition',
      text: '第一次 `delete` 后，那块内存已经还给系统。\n第二次 `delete` 时，那块内存可能已经被分配给别的变量了——你正在删别人的东西。',
    },
    {
      type: 'exposition',
      text: '后果：\n- 程序直接崩溃\n- 内存管理结构被破坏\n- 产生难以调试的 bug',
    },
    {
      type: 'multiple-choice',
      question: '下面哪个会导致 double delete？',
      options: [
        { text: 'int* p = new int; delete p; p = nullptr; delete p;', correct: false, explanation: 'delete 空指针是安全的' },
        { text: 'int* p = new int; delete p; delete p;', correct: true, explanation: '对同一指针 delete 两次' },
        { text: 'int* p = new int[10]; delete[] p;', correct: false, explanation: '配对正确，只有一次' },
        { text: 'int* p = nullptr; delete p;', correct: false, explanation: 'delete 空指针安全' },
      ],
    },
    {
      type: 'exposition',
      text: '**解决办法**：`delete` 后立刻置空！\n如果 p 是 `nullptr`，第二次 `delete` 什么都不会做。',
      code: 'int* p = new int(42);\ndelete p;\np = nullptr;  // 关键一步\n\ndelete p;     // ✅ 安全：delete 空指针无效果',
    },
    {
      type: 'exposition',
      text: '置空的好处：\n- 双重删除变安全\n- 悬空指针变空指针\n- 一箭双雕',
    },
    {
      type: 'exposition',
      text: '还有一种情况：**两个指针指向同一块内存**。',
      code: 'int* p = new int(10);\nint* q = p;  // q 也指向同一地址\n\ndelete p;    // 释放\np = nullptr;\n\ndelete q;    // ❌ double delete！q 没置空',
    },
    {
      type: 'multiple-choice',
      question: '复习上一课：delete 后指针变成什么？',
      options: [
        { text: '变成 nullptr', correct: false, explanation: 'delete 不会自动置空，需要手动赋值' },
        { text: '仍然存着原来的地址', correct: true, explanation: '指针变量还在，地址还在，只是内存已释放' },
        { text: '变成随机值', correct: false, explanation: '指针本身的值不改变' },
        { text: '变成 0', correct: false, explanation: 'delete 不会修改指针变量的值' },
      ],
    },
    {
      type: 'exposition',
      text: '函数之间传递指针要格外小心。\n一个函数 delete 了，另一个函数不知道——再来一次。',
      code: 'void cleanup(int* p) {\n  delete p;  // 第一次 delete\n}\n\nint main() {\n  int* data = new int(5);\n  cleanup(data);\n  delete data;  // ❌ double delete\n}',
    },
    {
      type: 'exposition',
      text: '解决方案：明确**所有权**——谁负责释放。\n或者更简单：不要传裸指针，用智能指针。',
    },
    {
      type: 'exposition',
      text: 'RAII 和智能指针天然解决 double delete：\n- 智能指针内部有引用计数\n- 只有最后一个销毁时才会释放',
    },
    {
      type: 'multiple-choice',
      question: '如何避免 double delete？',
      options: [
        { text: '每次 new 后马上 delete', correct: false, explanation: '关键是要用 delete 后置空' },
        { text: 'delete 后把指针置为 nullptr', correct: true, explanation: '置空后再次 delete 是安全的' },
        { text: '只用栈变量，不用 new', correct: false, explanation: '堆有时是必要的' },
        { text: 'delete 前先判断指针是不是 0', correct: false, explanation: 'delete 空指针本身就安全，关键是置空' },
      ],
    },
    {
      type: 'exposition',
      text: '总结三种内存错误：\n1. **内存泄漏**——new 了不 delete\n2. **悬空指针**——delete 了继续用\n3. **双重删除**——delete 了又 delete',
    },
    {
      type: 'exposition',
      text: '三种错误的共同解：\n1. `delete` 后置空\n2. 用 RAII / 智能指针\n3. 明确所有权责任',
    },
    {
      type: 'exposition',
      text: '还有一个很实用的经验：\n如果在编码阶段就用 `unique_ptr` 代替裸指针——\n泄漏、悬空、双删，三个问题一起解决。',
    },
    {
      type: 'exposition',
      text: '记住：\n- 不要重复 delete\n- delete 后置空\n- 一指针一释放，清清楚楚。',
      textAnimation: 'typewriter',
    },
  ],
}

export default lesson
