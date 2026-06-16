import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'practice-type-erasure',
    chapter: 21,
    title: '类型擦除练习',
    subtitle: '巩固 04-06',
    description: '通过选择题和概念卡巩固 Type Erasure、std::function 和 std::any 的核心理解。',
    objectives: ['能区分 Type Erasure 的三种应用场景', '能判断代码中是否使用了类型擦除', '能理解 Concept/Model 模式的工作原理'],
    estimatedMinutes: 12,
  },
  blocks: [
    {
      type: 'multiple-choice',
      question: 'Type Erasure 的核心思想是什么？',
      options: [
        { text: '在编译期消除所有类型检查', correct: false, explanation: '类型擦除不是消除类型检查，而是隐藏具体类型' },
        { text: '用统一接口隐藏具体类型，不同类型通过相同方式使用', correct: true, explanation: '核心是"对外统一，对内灵活"' },
        { text: '把 C++ 类型系统变成动态类型', correct: false, explanation: 'C++ 仍是静态类型语言，Type Erasure 不改变语言本身' },
        { text: '用宏替代模板', correct: false, explanation: 'Type Erasure 不依赖宏' },
      ],
    },
    {
      type: 'multiple-choice',
      question: 'Type Erasure 中 Concept 和 Model 分别是什么角色？',
      options: [
        { text: 'Concept 是模板，Model 是虚函数', correct: false, explanation: 'Concept 是基类（虚函数），Model 是模板派生类' },
        { text: 'Concept 定接口，Model 包装具体类型', correct: true, explanation: 'Concept 定义虚函数接口，Model<T> 包装具体类型 T' },
        { text: 'Concept 存值，Model 存调用', correct: false, explanation: '两者都有值存储功能，取决于业务' },
        { text: 'Concept 处理拷贝，Model 处理析构', correct: false, explanation: '两者职责不是这样分的' },
      ],
    },
    {
      type: 'multiple-choice',
      question: 'std::function 和 std::any 的共同技术是什么？',
      options: [
        { text: '都使用 Concept/Model 模式做类型擦除', correct: true, explanation: '两者底层机制是一样的——Type Erasure' },
        { text: '都不需要虚函数', correct: false, explanation: '两者都需要虚函数实现多态' },
        { text: '都不支持拷贝', correct: false, explanation: '两者都支持拷贝' },
        { text: '都要求类型是默认可构造的', correct: false, explanation: '两者都不要求默认可构造' },
      ],
    },
    {
      type: 'concept-cards',
      instruction: 'Type Erasure 的三个关键组件：',
      cards: [
        { glyph: '📐', term: 'Concept（基类）', meaning: '纯虚函数定义接口契约', example: 'virtual int invoke(int) = 0' },
        { glyph: '🏭', term: 'Model<T>（派生类）', meaning: '模板类包装具体类型，实现接口', example: 'Model<LambdaType>' },
        { glyph: '🎁', term: 'Wrapper（对外类）', meaning: '暴露统一接口，隐藏内部实现', example: 'std::function / std::any' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '以下哪个不是 Type Erasure 的应用？',
      options: [
        { text: 'std::function 存储 lambda', correct: false, explanation: '这是典型的 Type Erasure' },
        { text: 'std::any 存储任意值', correct: false, explanation: '这也是 Type Erasure' },
        { text: 'std::shared_ptr 的自定义删除器', correct: false, explanation: '删除器也用了类型擦除' },
        { text: 'std::array<int, 5>', correct: true, explanation: 'array 是固定大小数组，不涉及类型擦除' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '小对象优化（SBO）的目的是什么？',
      options: [
        { text: '让对象在栈上分配而非堆上', correct: true, explanation: 'SBO 避免小对象的动态内存分配' },
        { text: '让对象变小的编译器优化', correct: false, explanation: 'SBO 不改变对象本身大小' },
        { text: '减少模板实例化的数量', correct: false, explanation: 'SBO 不影响模板实例化' },
        { text: '提高编译速度', correct: false, explanation: 'SBO 不影响编译速度' },
      ],
    },
    {
      type: 'concept-cards',
      instruction: '三种类型擦除的应用对比：',
      cards: [
        { glyph: '📞', term: 'std::function', meaning: '存"可调用对象"，提供 operator()', example: 'function<int(int)>' },
        { glyph: '📦', term: 'std::any', meaning: '存"任意值"，需 any_cast 取回', example: 'any = 42 / string / 自定义' },
        { glyph: '🗑️', term: 'shared_ptr 删除器', meaning: '存"删除函数"，类型擦除释放方式', example: 'shared_ptr<T>(p, custom_deleter)' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '从 std::any 中取值时，如果类型不匹配会发生什么？',
      options: [
        { text: '编译错误', correct: false, explanation: 'any_cast 是运行时检查，不会编译时报错' },
        { text: '抛出 std::bad_any_cast', correct: true, explanation: '运行时类型检查失败会抛异常' },
        { text: '返回默认值', correct: false, explanation: '不会返回默认值，而是抛异常' },
        { text: '未定义行为', correct: false, explanation: '标准库有安全机制，不会 UB' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾：lambda 被 std::function 存储时，如果 lambda 很小，存储在哪里？',
      options: [
        { text: '在堆上分配', correct: false, explanation: '小 lambda 通过 SBO 存在栈上' },
        { text: '在 function 内部的栈缓冲区（SBO）', correct: true, explanation: '小对象优化直接存在缓冲区' },
        { text: '在全局静态区', correct: false, explanation: '不是静态区' },
        { text: '在 lambda 自己的栈帧里', correct: false, explanation: 'lambda 被移动进 function 内部' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '以下关于 std::any 的说法，哪个正确？',
      options: [
        { text: 'any 不需要虚函数也可以实现', correct: false, explanation: 'Type Erasure 需要虚函数实现运行时多态' },
        { text: 'any 在赋值时会拷贝值', correct: true, explanation: 'any 会拷贝或移动值到内部存储' },
        { text: 'any 不会做动态内存分配', correct: false, explanation: '大对象会堆分配，小对象用 SBO' },
        { text: 'any 可以直接调用存储的值', correct: false, explanation: 'any 不提供调用功能' },
      ],
    },
    {
      type: 'multiple-choice',
      question: 'Type Erasure 对比传统继承多态的主要优势是什么？',
      options: [
        { text: '更快', correct: false, explanation: '虚函数开销类似，Type Erasure 不一定更快' },
        { text: '被存储的类型不需要继承自特定基类', correct: true, explanation: '非侵入式——任何类型都可以被包装' },
        { text: '不需要头文件', correct: false, explanation: '和头文件无关' },
        { text: '可以绕过所有类型检查', correct: false, explanation: '仍然是类型安全的' },
      ],
    },
    {
      type: 'concept-cards',
      instruction: '什么时候用哪个？',
      cards: [
        { glyph: '📞', term: '需要存"可调用对象"', meaning: '用 std::function', example: '回调、事件处理' },
        { glyph: '📦', term: '需要存"任意类型的值"', meaning: '用 std::any', example: '动态配置、类型不确定的字段' },
        { glyph: '🔀', term: '需要存"类型不同的同类事物"', meaning: '用 std::variant（编译期类型联合）', example: '有限集合的几种类型' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾：`std::variant<int, string>` 和 `std::any` 的关键区别是什么？',
      options: [
        { text: 'variant 能存的类型在编译期固定，any 可以存任意类型', correct: true, explanation: 'variant 是类型安全的联合体，any 是运行时类型擦除' },
        { text: 'any 比 variant 更快', correct: false, explanation: 'variant 通常更快（编译期分发）' },
        { text: 'variant 只能存基本类型', correct: false, explanation: 'variant 可以存任何列出的类型' },
        { text: '它们没有区别', correct: false, explanation: '用法和性能特点都不同' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '为什么 function 和 any 都用 SBO？',
      options: [
        { text: '为了省内存', correct: true, explanation: '避免堆分配的开销，提升性能' },
        { text: '为了支持移动语义', correct: false, explanation: 'SBO 和移动语义是独立特性' },
        { text: '为了让代码更短', correct: false, explanation: 'SBO 反而让实现更复杂' },
        { text: '为了支持所有类型', correct: false, explanation: 'SBO 处理小对象，大对象仍需堆' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '以下哪个正确描述了 Type Erasure 在 C++ 中的角色？',
      options: [
        { text: '它是 C++ 的运行时反射系统', correct: false, explanation: 'C++ 没有完整的反射，Type Erasure 是一种替代方案' },
        { text: '它是"非侵入式多态"的实现手段', correct: true, explanation: '不需要继承基类，也能实现多态行为' },
        { text: '它是编译期优化技术', correct: false, explanation: 'Type Erasure 主要影响运行时的类型处理' },
        { text: '它是智能指针的另一种名称', correct: false, explanation: '智能指针和 Type Erasure 是不同的概念' },
      ],
    },
    {
      type: 'exposition',
      text: '练习完成！你巩固了 Type Erasure 的核心概念。\n\n下一组课程进入**变参模板（Variadic Templates）**——\n让模板可以接受任意数量的参数。',
      textAnimation: 'typewriter',
    },
  ],
}

export default lesson
