import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'unique-ptr-motivation',
    chapter: 18,
    title: '为什么需要 unique_ptr',
    subtitle: '裸指针的问题',
    description: '回顾裸指针的典型问题，理解 RAII 思想，为智能指针的引入打下基础。',
    objectives: ['能说出裸指针的三个典型问题', '能理解 RAII 的基本思想', '能说出智能指针如何解决裸指针的问题'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '在阶段 10 我们学了 `new` 和 `delete`。手动管理内存很灵活，但也容易出问题。',
    },
    {
      type: 'exposition',
      text: '**问题一：忘记 delete**——内存泄漏。',
      code: 'int* p = new int(42);\n// 用完了……忘了 delete\n// 内存泄漏了',
    },
    {
      type: 'exposition',
      text: '程序跑得越久，泄漏的内存越多。服务器程序跑几天就占满内存崩溃了。',
    },
    {
      type: 'multiple-choice',
      question: '内存泄漏会导致什么后果？',
      options: [
        { text: '程序立即崩溃', correct: false, explanation: '内存泄漏是慢慢积累的' },
        { text: '可用内存越来越少，最终可能崩溃', correct: true, explanation: '泄漏的内存在程序运行期间无法回收' },
        { text: '代码编译失败', correct: false, explanation: '内存泄漏是运行时问题，编译器检查不到' },
        { text: '不影响程序运行', correct: false, explanation: '严重泄漏会让程序崩溃' },
      ],
    },
    {
      type: 'exposition',
      text: '**问题二：悬空指针（dangling pointer）**——delete 后继续使用。',
      code: 'int* p = new int(42);\ndelete p;\n// p 现在指向已释放的内存\n*p = 100;  // 未定义行为！',
    },
    {
      type: 'exposition',
      text: '悬空指针是"定时炸弹"——有时能运行，有时崩溃，有时悄悄改坏数据。极难排查。',
    },
    {
      type: 'multiple-choice',
      question: 'delete 一个指针后，这个指针：',
      options: [
        { text: '被自动设为 nullptr', correct: false, explanation: 'delete 不会自动置空指针' },
        { text: '指向的内存已被释放，指针本身还在', correct: true, explanation: '指针变量还在，但指向的内存已归还系统' },
        { text: '指向一个新的有效地址', correct: false, explanation: '不会自动指向新地址' },
        { text: '变成 int 变量', correct: false, explanation: '指针仍然是指针' },
      ],
    },
    {
      type: 'exposition',
      text: '**问题三：双重删除（double delete）**——两个指针指向同一块内存，都调用了 delete。',
      code: 'int* p = new int(42);\nint* q = p;\ndelete p;\ndelete q;  // 双重删除！未定义行为',
    },
    {
      type: 'exposition',
      text: '双重删除会导致堆损坏，轻则程序崩溃，重则在之后某个不可预测的时机出错。',
    },
    {
      type: 'multiple-choice',
      question: '三个裸指针问题——哪个是"两个指针指向同块内存，都调用了 delete"？',
      options: [
        { text: '内存泄漏', correct: false, explanation: '内存泄漏是忘记 delete' },
        { text: '悬空指针', correct: false, explanation: '悬空指针是 delete 后继续用' },
        { text: '双重删除', correct: true, explanation: '两个指针分别 delete 同块内存' },
        { text: '野指针', correct: false, explanation: '野指针是未初始化的指针' },
      ],
    },
    {
      type: 'exposition',
      text: '这些问题有个共同根源：**手动管理内存**。人总会犯错。',
    },
    {
      type: 'exposition',
      text: 'C++ 的解决方案是 **RAII**（Resource Acquisition Is Initialization）——资源获取即初始化。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: 'RAII 的核心思想：资源在构造函数中获取，在析构函数中释放。C++ 保证析构函数在对象离开作用域时自动调用。',
    },
    {
      type: 'exposition',
      text: '这样就不需要手动配对 new/delete 了——对象销毁时自动释放资源。',
    },
    {
      type: 'multiple-choice',
      question: 'RAII 中的"资源释放"发生在什么时候？',
      options: [
        { text: '程序结束时', correct: false, explanation: 'RAII 在对象离开作用域时释放' },
        { text: '对象离开作用域、析构函数被调用时', correct: true, explanation: '析构函数自动调用，释放资源' },
        { text: '调用 free() 时', correct: false, explanation: 'RAII 不需要手动调用 free' },
        { text: '程序员手动写 release 时', correct: false, explanation: 'RAII 自动释放，不需要手动操作' },
      ],
    },
    {
      type: 'exposition',
      text: '**智能指针（smart pointer）** 就是 RAII 在内存管理上的实践。它包装了一个裸指针，在析构函数中自动 delete。',
    },
    {
      type: 'exposition',
      text: 'C++ 标准库提供了三种智能指针：\n- `unique_ptr`：独占所有权\n- `shared_ptr`：共享所有权\n- `weak_ptr`：弱引用，不控制生命周期',
    },
    {
      type: 'exposition',
      text: '这一阶段我们会逐一学习它们。你已经理解了手动内存管理的问题——接下来看智能指针如何优雅地解决。',
    },
    {
      type: 'exposition',
      text: '从下一课开始，你不再需要手动 delete 了。智能指针会替你安全地管理内存。',
    },
    {
      type: 'multiple-choice',
      question: '复习阶段 10：`delete` 的作用是什么？',
      options: [
        { text: '删除指针变量本身', correct: false, explanation: 'delete 释放指针指向的内存，不是删除指针变量' },
        { text: '释放 new 分配的堆内存', correct: true, explanation: 'delete 匹配 new，释放堆上的内存' },
        { text: '将指针置为 nullptr', correct: false, explanation: 'delete 不会置空指针' },
        { text: '删除栈上的变量', correct: false, explanation: '栈变量自动销毁，不能用 delete' },
      ],
    },
    {
      type: 'exposition',
      text: '记住这三个问题——它们就是智能指针要解决的目标。\n下一课开始学习 `unique_ptr`。',
    },
  ],
}

export default lesson
