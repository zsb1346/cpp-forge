import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'override-specifier',
    chapter: 9,
    title: 'override——确保写对了',
    subtitle: '编译器帮你检查',
    description: 'C++11 的 override 关键字确保派生类真的覆盖了基类的虚函数。',
    objectives: ['能使用 override 关键字', '能解释 override 避免什么错误'],
    estimatedMinutes: 8,
  },
  blocks: [
    {
      type: 'exposition',
      text: '写派生类覆盖基类函数时，很容易**"想覆盖但没覆盖成"**——因为签名写错了一个字母。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '看这个坑——函数签名不匹配：',
      code: 'class Base {\npublic:\n  virtual void draw(int x) { }\n};\n\nclass Derived : public Base {\npublic:\n  void draw(double x) { }  // 参数类型不同！不是覆盖！\n};',
    },
    {
      type: 'exposition',
      text: '你以为你覆盖了`draw`，实际上你**新增了一个函数**。\n基类的`draw(int)`仍然存在，没有被覆盖。\n这个 bug 很难发现，因为没有编译错误。',
    },
    {
      type: 'exposition',
      text: 'C++11 引入了`override`关键字来解决这个问题：',
      code: 'class Derived : public Base {\npublic:\n  void draw(double x) override { }  // 编译错误！没有覆盖任何函数\n};',
    },
    {
      type: 'type-it',
      instruction: '在派生类中用 override 标记覆盖函数：',
      code: 'class Base {\npublic:\n  virtual void update(int frame) { }\n};\n\nclass Derived : public Base {\npublic:\n  void update(int frame) override { }\n};',
      hints: [
        'Base 的 update 是虚函数',
        'Derived 的 update 加 override',
        'override 让编译器帮你检查',
      ],
    },
    {
      type: 'exposition',
      text: '### override 的作用\n\n- **明确告诉读者**：这个函数是覆盖基类的\n- **让编译器检查**：如果基类没有这个虚函数，编译报错\n- **防止拼写错误**：函数名、参数类型、const 限定符不匹配都能发现',
    },
    {
      type: 'exposition',
      text: '### 哪些不一致会导致 override 失败\n\n1. 函数名拼写错误\n2. 参数类型/数量不同\n3. 返回值类型不同（协变除外）\n4. const 限定符不同\n5. 基类函数不是 virtual',
    },
    {
      type: 'exposition',
      text: '看一个 const 限定符不匹配的例子：',
      code: 'class Base {\npublic:\n  virtual void show() const { }\n};\n\nclass Derived : public Base {\npublic:\n  void show() override { }  // 编译错误！缺少 const\n};',
    },
    {
      type: 'type-it',
      instruction: '故意写错参数类型，先不加 override 看看：',
      code: 'class Base {\npublic:\n  virtual void process(int a, int b) { }\n};\n\nclass Derived : public Base {\npublic:\n  void process(int a, double b) { }  // 参数类型不匹配\n};',
      hints: [
        '没有 override 时，这叫重载不是覆盖',
        '如果加 override 会编译错误',
        'override 就是安全网',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾：通过什么方式调用虚函数才能触发多态？',
      options: [
        { text: '对象值传递', correct: false, explanation: '值传递会切割对象，丢失派生类信息' },
        { text: '指针或引用', correct: true, explanation: '指针和引用才能触发动态绑定' },
        { text: '直接对象调用', correct: false, explanation: '直接调用编译时已确定函数地址' },
        { text: '静态函数', correct: false, explanation: '静态函数不能是虚函数' },
      ],
    },
    {
      type: 'type-it',
      instruction: '正确的 override 用法，包含 const：',
      code: 'class Base {\npublic:\n  virtual string toString() const { return "Base"; }\n};\n\nclass Derived : public Base {\npublic:\n  string toString() const override { return "Derived"; }\n};',
      hints: [
        'Base 的 toString 是 const 虚函数',
        'Derived 也必须加 const',
        'override 确保签名完全匹配',
      ],
    },
    {
      type: 'multiple-choice',
      question: '如果没有 override，函数签名不匹配时会发生什么？',
      options: [
        { text: '编译错误', correct: false, explanation: '没有 override 时编译器不会报错' },
        { text: '静默创建一个新函数，没有覆盖', correct: true, explanation: '派生类只是多了一个新函数，虚函数没有被覆盖' },
        { text: '程序运行报错', correct: false, explanation: '程序能正常编译和运行，但行为不对' },
        { text: '自动修正签名', correct: false, explanation: '编译器不会自动修正' },
      ],
    },
    {
      type: 'exposition',
      text: '### 最佳实践\n\n**每次覆盖基类虚函数时，都写 override。**\n这不是可选的，这是让你少加班的最佳习惯。',
    },
    {
      type: 'exposition',
      text: 'override 后的效果：\n- 签名匹配 ✅ → 正常编译\n- 签名不匹配 ❌ → 编译器报错\n\n让错误暴露在**编译阶段**，而不是运行时。',
    },
    {
      type: 'multiple-choice',
      question: '下面哪种情况 override 能帮你发现错误？',
      options: [
        { text: '基类函数不是 virtual', correct: true, explanation: 'override 要求基类必须有对应的虚函数' },
        { text: '派生类函数写对了', correct: false, explanation: '写对了就不用发现错误了' },
        { text: '程序运行速度慢', correct: false, explanation: 'override 不影响运行速度' },
        { text: '内存泄漏', correct: false, explanation: 'override 不检测内存问题' },
      ],
    },
    {
      type: 'exposition',
      text: '### override 不是关键字，是"标识符"\n\n`override` 是 C++11 引入的**特殊标识符**：\n- 在函数声明末尾使用时有特殊含义\n- 在其他位置可以用作普通变量名（但没人这么干）',
    },
    {
      type: 'exposition',
      text: '### 一个实际场景\n\n团队协作时，别人改了基类的函数名或参数，你的派生类编译不通过——**这正是 override 的价值**。\n没有 override，你们可能要花几小时 debug 才能发现。',
    },
    {
      type: 'exposition',
      text: '总结：\n- `override` 让编译器帮你检查覆盖是否正确\n- 避免"以为覆盖了实际上没覆盖"的 bug\n- **每次覆盖都写 override** → 安全 + 清晰\n- 签名不匹配：override 报错 vs 没有 override 静默失败',
      textAnimation: 'typewriter',
    },
  ],
}

export default lesson
