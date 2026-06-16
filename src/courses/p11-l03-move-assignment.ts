import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'move-assignment',
    chapter: 12,
    title: '移动赋值',
    subtitle: '= 的移动版本',
    description: 'operator=(ClassName&& other)——移动赋值运算符把临时对象的资源偷过来。',
    objectives: ['能定义移动赋值运算符', '能理解移动赋值的执行步骤', '能区分拷贝赋值和移动赋值'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '拷贝赋值运算符 `operator=(const T&)` 是"复制一份数据"。\n**移动赋值运算符** `operator=(T&&)` 是"偷走数据，把原对象置空"。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '移动赋值的签名：',
      code: 'class MyString {\npublic:\n  // 移动赋值运算符\n  MyString& operator=(MyString&& other) noexcept {\n    if (this != &other) {\n      delete[] data;            // 释放自己的资源\n      data = other.data;        // 偷对方的指针\n      other.data = nullptr;     // 把对方置空\n    }\n    return *this;\n  }\n};',
    },
    {
      type: 'exposition',
      text: '移动赋值的步骤：\n1. **检查自赋值**（防止 `a = std::move(a)`）\n2. **释放**自己的旧资源\n3. **偷**对方的资源（指针拷贝）\n4. **置空**对方（防止对方析构时释放资源）',
    },
    {
      type: 'exposition',
      text: '自赋值检查为什么重要？',
      code: 'MyString& operator=(MyString&& other) noexcept {\n  if (this != &other) {  // 防止 a = std::move(a)\n    delete[] data;\n    data = other.data;\n    other.data = nullptr;\n  }\n  return *this;\n}',
    },
    {
      type: 'type-it',
      instruction: '写一个简单的移动赋值运算符：',
      code: 'MyString& operator=(MyString&& other) noexcept {\n  if (this != &other) {\n    delete[] data;\n    data = other.data;\n    other.data = nullptr;\n  }\n  return *this;\n}',
      hints: ['返回类型是 MyString&，用引用', '加 noexcept 保证不抛异常', '自赋值检查用 this != &other'],
    },
    {
      type: 'exposition',
      text: '对比拷贝赋值和移动赋值：\n- 拷贝赋值：复制所有数据，**O(n)**\n- 移动赋值：偷指针置空原对象，**O(1)**',
      code: '// 拷贝赋值——深拷贝\nMyString& operator=(const MyString& other) {\n  delete[] data;\n  data = new char[other.len];\n  copy(other.data);\n  return *this;\n}\n\n// 移动赋值——偷指针\nMyString& operator=(MyString&& other) noexcept {\n  delete[] data;\n  data = other.data;      // 偷！\n  other.data = nullptr;   // 置空\n  return *this;\n}',
    },
    {
      type: 'multiple-choice',
      question: '移动赋值运算符的参数类型是什么？',
      options: [
        { text: 'const T&', correct: false, explanation: '那是拷贝赋值的参数' },
        { text: 'T&&', correct: true, explanation: '移动赋值接受右值引用参数' },
        { text: 'T', correct: false, explanation: '传值会多一次拷贝' },
        { text: 'const T&&', correct: false, explanation: 'const 右值引用无法移动' },
      ],
    },
    {
      type: 'exposition',
      text: '`noexcept` 关键字：\n移动赋值/构造通常标记为 `noexcept`，\n表示不会抛异常——这样标准库容器才愿意在重新分配时使用移动而不是拷贝。',
    },
    {
      type: 'fill-in',
      prompt: '补全移动赋值运算符的内容：',
      template: 'MyString& operator=(MyString&& other) ____ {\n  if (____ != ____) {\n    ____[] data;\n    data = ____.data;\n    other.____ = nullptr;\n  }\n  return *____;\n}',
      answers: ['noexcept', 'this', '&other', 'delete', 'other', 'data', 'this'],
      hints: ['第一空是异常保证', '自赋值检查的是地址', '最后要返回当前对象'],
    },
    {
      type: 'exposition',
      text: '什么时候触发移动赋值？',
      code: 'MyString a("hello");\nMyString b("world");\na = std::move(b);  // ✅ 触发移动赋值\n// b 的资源被偷走了\n\na = getTemp();      // ✅ getTemp() 返回右值，自动触发移动赋值',
    },
    {
      type: 'exposition',
      text: '如果没有移动赋值，但有拷贝赋值——\n编译器会退回到拷贝赋值，性能变差。\n所以**手动实现移动赋值可以优化性能**。',
    },
    {
      type: 'multiple-choice',
      question: '复习上一课：std::move 做了什么？',
      options: [
        { text: '移动数据到新对象', correct: false, explanation: 'move 本身不移动' },
        { text: '把左值转成右值引用', correct: true, explanation: 'move 就是转型，触发移动赋值的是接收端' },
        { text: '销毁原对象', correct: false, explanation: 'move 不销毁对象' },
        { text: '分配新内存', correct: false, explanation: 'move 不分配内存' },
      ],
    },
    {
      type: 'exposition',
      text: '移动赋值的"五步法"记忆口诀：\n1. 自赋值检查\n2. 释放自有资源\n3. 偷对方资源\n4. 置空对方\n5. 返回自身',
    },
    {
      type: 'type-it',
      instruction: '写一个数字类的移动赋值：',
      code: 'Number& operator=(Number&& other) noexcept {\n  if (this != &other) {\n    delete ptr;\n    ptr = other.ptr;\n    other.ptr = nullptr;\n  }\n  return *this;\n}',
      hints: ['ptr 是动态分配的 int*', '记得检查自赋值', 'noexcept 很重要'],
    },
    {
      type: 'exposition',
      text: '`noexcept` 对容器的意义：\n`vector` 扩容时，如果元素是 `noexcept` 移动构造的，就会用移动而不是拷贝——**性能差距巨大**。',
    },
    {
      type: 'exposition',
      text: '移动赋值和移动构造的异同：\n- 相同：都偷资源 + 置空原对象\n- 不同：赋值要释放自己的旧资源，构造不用',
      code: '// 移动构造：不需要释放\nBuffer(Buffer&& other) noexcept\n  : data(other.data), size(other.size) {\n  other.data = nullptr;\n}\n\n// 移动赋值：需要先释放自己的\nBuffer& operator=(Buffer&& other) noexcept {\n  if (this != &other) {\n    delete[] data;     // ⚠️ 多这一步\n    data = other.data;\n    other.data = nullptr;\n  }\n  return *this;\n}',
    },
    {
      type: 'exposition',
      text: '实际开发中：\n- 写类时**先写移动构造，再写移动赋值**\n- 移动赋值可以复用移动构造 + 拷贝赋值的部分逻辑\n- 但需要注意自赋值检查和异常安全',
    },
    {
      type: 'exposition',
      text: '总结：\n- 移动赋值接受 `T&&`，偷资源不拷贝\n- 三个关键操作：释放 → 偷 → 置空\n- 加 `noexcept` 让容器用移动\n- 和拷贝赋值搭配使用',
    },
  ],
}

export default lesson
