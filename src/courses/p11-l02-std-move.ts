import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'std-move',
    chapter: 12,
    title: 'std::move',
    subtitle: '不移动只是转换',
    description: 'std::move 不移动数据，它只是把左值变成右值引用。',
    objectives: ['能理解 std::move 只是转型函数', '能使用 std::move 将左值转为右值引用', '能注意移动后对象的有效但未指定状态'],
    estimatedMinutes: 8,
  },
  blocks: [
    {
      type: 'exposition',
      text: '`std::move` 的名字有点误导——**它并不移动任何东西**。\n它只是一个转型函数：把左值变成右值引用。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '`std::move` 的本质上就是：\n`static_cast<T&&>(x)`\n它告诉编译器："嘿，这个值我可以偷走"。',
      code: 'int x = 10;\nint&& r = std::move(x);  // 等价于 static_cast<int&&>(x)',
    },
    {
      type: 'exposition',
      text: '真正"移动"的不是 `move`，而是接收右值引用的**移动构造函数**或**移动赋值运算符**。',
      code: 'string a = "hello";\nstring b = std::move(a);  // move 只是转型\n// 真正移动的是 string 的移动构造函数',
    },
    {
      type: 'multiple-choice',
      question: '`std::move` 的作用是什么？',
      options: [
        { text: '移动数据到新位置', correct: false, explanation: 'move 本身不移动数据' },
        { text: '把左值转成右值引用', correct: true, explanation: 'move 只是一个转型 static_cast<T&&>' },
        { text: '拷贝数据到新变量', correct: false, explanation: '那是拷贝构造做的事' },
        { text: '释放原对象的内存', correct: false, explanation: 'move 不释放任何内存' },
      ],
    },
    {
      type: 'exposition',
      text: '**移动后状态**：\n被 `move` 的对象仍然存在，但处于"有效但未指定"的状态。\n——不要假设它的值，唯一安全的是销毁或重新赋值。',
      code: 'string a = "hello";\nstring b = std::move(a);\n// a 仍然存在，但值不确定\n// 不要再用 a 的值！\na = "new";  // ✅ 重新赋值是安全的',
    },
    {
      type: 'exposition',
      text: '典型的使用模式：\n用 `std::move` 把左值变成右值，然后传给需要右值的函数。',
      code: 'vector<string> v;\nstring s = "data";\nv.push_back(std::move(s));  // 把 s 的资源移入 vector\n// s 现在为空，但可以重新使用',
    },
    {
      type: 'type-it',
      instruction: '用 std::move 将字符串转为右值引用：',
      code: 'string a = "hello";\nstring&& r = std::move(a);',
      hints: ['std::move 在 <utility> 头文件中', 'move 只是转型，不移动数据', 'r 绑定到 a，但 a 的值不确定'],
    },
    {
      type: 'exposition',
      text: '`std::move` 的实现原理（简化版）：\n它返回 `T&&`，触发右值引用重载。',
      code: 'template<typename T>\ntypename remove_reference<T>::type&&\nmove(T&& t) noexcept {\n  return static_cast<typename remove_reference<T>::type&&>(t);\n}',
    },
    {
      type: 'exposition',
      text: '对基本类型（int, double 等）用 `std::move` 没有意义——\n**因为基本类型没有资源可以偷，拷贝和移动是一样快的**。',
      code: 'int x = 10;\nint y = std::move(x);  // 没有意义，int 的拷贝已经很快了',
    },
    {
      type: 'multiple-choice',
      question: '复习上一课：以下哪个是右值？',
      options: [
        { text: 'int x = 5; 中的 x', correct: false, explanation: 'x 是变量名，可取地址，是左值' },
        { text: 'x + 3 的结果', correct: true, explanation: '表达式的计算结果临时存在，是右值' },
        { text: 'int& ref = x; 中的 ref', correct: false, explanation: '引用本身是左值' },
        { text: 'const int& cr = 5; 中的 cr', correct: false, explanation: 'cr 是左值' },
      ],
    },
    {
      type: 'exposition',
      text: '`std::move` 常用于：\n1. 调用移动构造函数\n2. 调用移动赋值运算符\n3. 在容器中插入元素时避免拷贝',
    },
    {
      type: 'exposition',
      text: '和普通引用的对比：',
      code: 'int x = 10;\nint&  a = x;          // 左值引用\nint&& b = std::move(x); // move 后绑定到右值引用\n// 两者都是 x 的别名，但类型不同',
    },
    {
      type: 'type-it',
      instruction: '使用 std::move 将 vector 移入函数参数：',
      code: 'vector<int> v = {1, 2, 3};\nauto v2 = std::move(v);',
      hints: ['v2 会调用 vector 的移动构造函数', 'move 后 v 变为空', '#include <utility> 或 <iostream> 都行'],
    },
    {
      type: 'exposition',
      text: '`std::move` 配合容器能显著提升性能：\n移动一个大 vector 是 O(1) 的——只交换内部指针，不拷贝元素。',
    },
    {
      type: 'exposition',
      text: '**不要对 const 对象用 std::move**：\n`std::move` 返回 `const T&&`，没有移动构造函数接受 `const T&&`，\n最终会调用拷贝构造，白费功夫。',
      code: 'const string s = "hello";\nstring t = std::move(s);  // 实际调用拷贝构造！因为 s 是 const',
    },
    {
      type: 'exposition',
      text: '记住三条：\n1. `std::move` = 转型，不是移动\n2. 移动后原对象有效但值未指定\n3. 基本类型不要用 `std::move`',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '`std::move` 是为**移动构造函数**和**移动赋值运算符**准备的。\n下一课就来写移动赋值运算符。',
    },
    {
      type: 'exposition',
      text: '常见问题：`std::move` 和 `std::forward` 有什么区别？\n简答：**move 无条件转右值，forward 有条件保持原属性**。\n这个区别会在完美转发课中详细讲。',
    },
    {
      type: 'exposition',
      text: '一句话总结 `std::move`：\n**只转型，不移动。**\n真正的移动发生在移动构造/赋值中。',
    },
  ],
}

export default lesson
