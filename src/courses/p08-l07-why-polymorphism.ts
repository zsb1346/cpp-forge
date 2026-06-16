import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'why-polymorphism',
    chapter: 9,
    title: '为什么需要多态',
    subtitle: '同一操作不同表现',
    description: '不同子类对同一操作有不同实现，多态让代码更灵活。',
    objectives: ['能识别没有多态时的 if-else 问题', '能说出多态解决的核心问题'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '假设游戏中有多种角色：`Hero`、`Enemy`、`NPC`。\n它们都有`speak`行为，但说话内容不同。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '如果没有多态，你可能这样写：',
      code: 'void makeSpeak(Character& c, string type) {\n  if (type == "hero")\n    cout << "我来拯救世界！";\n  else if (type == "enemy")\n    cout << "受死吧！";\n  else if (type == "npc")\n    cout << "你好啊旅行者。";\n}',
    },
    {
      type: 'exposition',
      text: '### 这种写法的三个问题\n\n1. **每加一种新角色**，就要加一个`else if`\n2. 代码越来越长，**容易漏掉**\n3. **类型判断分散在各处**，改一处忘了改别处',
    },
    {
      type: 'exposition',
      text: '更糟糕的是，如果有多个函数都要判断类型——比如`makeSpeak`、`makeMove`、`makeAttack`——每个函数里都要写一遍 if-else 链。',
    },
    {
      type: 'multiple-choice',
      question: '回顾：public 继承下，基类的 public 成员在派生类中是什么权限？',
      options: [
        { text: 'private', correct: false, explanation: 'public 继承保持原有权限不变' },
        { text: 'public', correct: true, explanation: 'public 继承使基类 public 成员保持 public' },
        { text: 'protected', correct: false, explanation: '那是 protected 继承的效果' },
        { text: '不可见', correct: false, explanation: 'public 继承不隐藏任何成员' },
      ],
    },
    {
      type: 'exposition',
      text: '**多态（polymorphism）** 的解决思路：\n每个子类自己决定"怎么说话"。\n父类只规定"要说话"，不规定"怎么说"。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '用多态改写后——基类声明虚函数：',
      code: 'class Character {\npublic:\n  virtual void speak() {\n    cout << "......";\n  }\n};',
    },
    {
      type: 'exposition',
      text: '每个派生类覆盖自己的版本：',
      code: 'class Hero : public Character {\npublic:\n  void speak() override {\n    cout << "我来拯救世界！";\n  }\n};\n\nclass Enemy : public Character {\npublic:\n  void speak() override {\n    cout << "受死吧！";\n  }\n};',
    },
    {
      type: 'exposition',
      text: '调用时不再需要 if-else：',
      code: 'void makeSpeak(Character& c) {\n  c.speak();  // 自动调用正确版本\n}\n\nHero h;\nmakeSpeak(h);  // 输出：我来拯救世界！\nEnemy e;\nmakeSpeak(e);  // 输出：受死吧！',
    },
    {
      type: 'concept-cards',
      instruction: '多态的三个关键角色：',
      cards: [
        { glyph: '🎭', term: '多态 (Polymorphism)', meaning: '同一个接口，不同实现', example: '同一个 speak，不同说法' },
        { glyph: '🔌', term: 'virtual 关键字', meaning: '告诉编译器这个方法需要多态', example: 'virtual void speak();' },
        { glyph: '🔄', term: 'override 覆盖', meaning: '子类重新实现父类的 virtual 函数', example: 'void speak() override;' },
      ],
    },
    {
      type: 'exposition',
      text: '多态的好处：\n- 新增角色时**不需要改**现有代码\n- 代码更简洁，没有烦人的 if-else 链\n- 每个类自己负责自己的行为',
    },
    {
      type: 'exposition',
      text: '现实类比：\n**遥控器**（基类接口）的"开"按钮：\n- 电视→点亮屏幕\n- 空调→吹冷风\n- 音响→播放音乐\n同一个操作，不同表现——这就是多态。',
    },
    {
      type: 'multiple-choice',
      question: '没有多态时，处理不同子类的行为通常用什么方式？',
      options: [
        { text: 'switch 或 if-else 判断类型', correct: true, explanation: '没有多态时只能通过类型判断来分别处理' },
        { text: '让编译器自动选择', correct: false, explanation: '没有多态时编译器无法自动选择' },
        { text: '用全局变量控制', correct: false, explanation: '这不是解决方案' },
        { text: '多重继承', correct: false, explanation: '多重继承解决的是另一个问题' },
      ],
    },
    {
      type: 'exposition',
      text: '### 多态的核心思想\n\n**"对扩展开放，对修改关闭"**\n- 新增一种角色 → 加一个新类（扩展）\n- 不用改已有的 `makeSpeak` 函数（不修改）',
    },
    {
      type: 'exposition',
      text: '### 多态 vs 没有多态\n\n没有多态：\n```\nif (type == hero) hero.speak()\nelse if (type == enemy) enemy.speak()\n```\n\n有多态：\n```\ncharacter.speak()  // 自动！\n```',
    },
    {
      type: 'multiple-choice',
      question: '多态最核心的价值是什么？',
      options: [
        { text: '让程序跑得更快', correct: false, explanation: '多态反而有轻微的性能开销' },
        { text: '减少 if-else 判断，让代码更容易扩展', correct: true, explanation: '多态消除了类型判断，新增类型不需要改已有代码' },
        { text: '让类变得更多', correct: false, explanation: '多态不是为了让类变多' },
        { text: '隐藏所有数据', correct: false, explanation: '隐藏数据是封装的职责' },
      ],
    },
    {
      type: 'exposition',
      text: '记住：当你看到"同一操作对不同对象有不同表现"时，就该想到多态。',
    },
    {
      type: 'exposition',
      text: '下一课我们将学习多态的"开关"——`virtual`关键字。有了它，多态才能工作。',
    },
    {
      type: 'exposition',
      text: '### 本课小结\n\n- 没有多态 → if-else 泛滥，扩展困难\n- 多态 → 每个子类自己实现，调用方不用管\n- 现实类比：遥控器的按钮',
    },
  ],
}

export default lesson
