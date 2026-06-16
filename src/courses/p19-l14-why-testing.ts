import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'why-testing',
    chapter: 20,
    title: '为什么需要测试',
    subtitle: '没测试等于没写完',
    description: '测试是代码质量的生命线——不是可选项，是必需品。',
    objectives: ['能理解测试的价值', '能区分测试金字塔的不同层级'],
    estimatedMinutes: 8,
  },
  blocks: [
    {
      type: 'exposition',
      text: '「我把代码写完了，能跑就行」——这是最常见的错觉。\n**没有测试的代码，等于不知道它什么时候会坏。**',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '### 没有测试的后果\n\n- 改一行代码 → 不知道哪里炸了\n- 新功能上线 → 祈祷老功能没坏\n- 重构 → 不敢动，一动就崩\n- 团队协作 → 别人的修改破坏你的代码',
    },
    {
      type: 'exposition',
      text: '### 一个真实场景\n\n你写了一个 `sortArray` 函数：',
      code: 'vector<int> sortArray(vector<int> arr) {\n  sort(arr.begin(), arr.end());\n  return arr;\n}',
    },
    {
      type: 'exposition',
      text: '没有测试，你怎么知道它真的排对了？\n\n- 空数组呢？\n- 重复元素呢？\n- 已经排好的呢？\n- 逆序的呢？\n- 负数呢？\n\n**全都要测。**',
    },
    {
      type: 'concept-cards',
      instruction: '测试的基本概念：',
      cards: [
        { glyph: '🛡️', term: '测试', meaning: '验证代码行为符合预期', example: '写断言检查输出' },
        { glyph: '🔄', term: '回归测试', meaning: '改代码后重跑确保没破坏旧功能', example: '防止回归 bug' },
        { glyph: '📊', term: '测试覆盖率', meaning: '测试覆盖了哪些代码路径', example: '行覆盖 / 分支覆盖' },
        { glyph: '🏗️', term: '可测试性', meaning: '代码设计得容易测试', example: '依赖注入 / 接口分离' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾 13（CMake 目标）：add_library 默认创建什么类型的库？',
      options: [
        { text: 'STATIC', correct: true, explanation: '不指定类型时默认 STATIC' },
        { text: 'SHARED', correct: false, explanation: 'SHARED 需要显式指定' },
        { text: 'INTERFACE', correct: false, explanation: 'INTERFACE 需要显式指定' },
        { text: '不创建库', correct: false, explanation: 'add_library 就是用来创建库的' },
      ],
    },
    {
      type: 'exposition',
      text: '### 测试金字塔\n\n不同粒度的测试组成金字塔：\n\n```\n    ⬆️  端到端测试（少）\n   ⬆️⬆️  集成测试（中等）\n ⬆️⬆️⬆️⬆️  单元测试（多）\n```\n\n- **单元测试**：测试单个函数/类\n- **集成测试**：测试多个组件协作\n- **端到端测试**：测试完整业务流程',
    },
    {
      type: 'exposition',
      text: '### 测试能带来什么\n\n- **安全感**：改代码时不怕\n- **文档作用**：测试就是可执行的文档\n- **设计反馈**：难以测试的代码往往设计不好\n- **自动化**：CI 自动运行，不用人工点来点去',
    },
    {
      type: 'multiple-choice',
      question: '为什么说「没测试等于没写完」？',
      options: [
        { text: '因为测试能提升运行速度', correct: false, explanation: '测试不提升运行速度' },
        { text: '因为不知道代码是否正确，也不知道改代码会不会破坏现有功能', correct: true, explanation: '测试是验证代码正确性的唯一自动化手段' },
        { text: '因为考官要求测试', correct: false, explanation: '不是应试，是工程实践' },
        { text: '因为测试让代码更短', correct: false, explanation: '测试通常会增加代码量' },
      ],
    },
    {
      type: 'exposition',
      text: '### 什么时候写测试？\n\n**先写测试再写实现（TDD）**：\n1. 写一个会失败的测试\n2. 写足够代码让测试通过\n3. 重构代码\n\n**或者：写完功能立刻补测试。**\n\n千万别：写完功能，上线了，然后说「以后补测试」。',
    },
    {
      type: 'exposition',
      text: '### 开发者的借口\n\n- 「没时间写测试」→ 修 bug 更花时间\n- 「代码太简单不需要测」→ 越简单越容易测\n- 「测试也没测出 bug」→ 那是测试写得不够好\n- 「让 QA 测就行了」→ QA 不是给你擦屁股的',
    },
    {
      type: 'exposition',
      text: '### 好测试的特征\n\n- **快速**：一秒跑完几千个\n- **独立**：测试之间不互相依赖\n- **可重复**：跑一百次结果一样\n- **自验证**：自动判断通过/失败\n- **及时**：写代码时就写了测试',
    },
    {
      type: 'multiple-choice',
      question: '测试金字塔中，数量最多的是哪种测试？',
      options: [
        { text: '端到端测试', correct: false, explanation: '端到端测试最慢，数量最少' },
        { text: '集成测试', correct: false, explanation: '集成测试中等数量' },
        { text: '单元测试', correct: true, explanation: '单元测试最快最轻量，应该最多' },
        { text: '手动测试', correct: false, explanation: '手动测试不是自动化测试金字塔的一部分' },
      ],
    },
    {
      type: 'exposition',
      text: '### 总结\n\n- 没有测试的代码没有质量保证\n- 测试金字塔：单元 > 集成 > 端到端\n- 好测试：快速、独立、可重复、自验证\n- 写代码时就要写测试，不是「以后再说」',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '下一课：Google Test 入门——C++ 最流行的测试框架。',
    },
    {
      type: 'exposition',
      text: '### 测试不是给别人看的\n\n写测试不是为了应付 KPI 或领导要求。\n测试是你自己的安全网——改代码时敢不敢重构，看测试覆盖率就知道。',
    },
    {
      type: 'type-it',
      instruction: '思考需要哪些测试用例：',
      code: 'int divide(int a, int b) {\n  return a / b;\n}\n\n// 需要测试：\n// divide(10, 2) → 5\n// divide(0, 5)  → 0\n// divide(7, 3)  → 2（整数除法）\n// divide(5, 0)  → 未定义行为（需要处理）',
      hints: [
        '正常情况要测',
        '边界值要测（0 作为被除数）',
        '异常情况要测（除数为 0）',
      ],
    },
    {
      type: 'multiple-choice',
      question: 'TDD（测试驱动开发）的步骤是什么？',
      options: [
        { text: '写代码 → 写测试 → 重构', correct: false, explanation: 'TDD 先写测试再写代码' },
        { text: '写失败测试 → 写代码通过测试 → 重构', correct: true, explanation: 'TDD 红-绿-重构循环' },
        { text: '写测试 → 上线 → 不管', correct: false, explanation: '这是反模式' },
        { text: '写代码 → 写测试 → 上线', correct: false, explanation: '测试应该在代码之前或同时写' },
      ],
    },
  ],
}

export default lesson
