import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'why-concurrency',
    chapter: 19,
    title: '为什么需要并发',
    subtitle: '同时做多件事',
    description: '理解为什么需要并发，并发如何提高程序利用率和响应速度。',
    objectives: ['能说出并发解决的核心问题', '能区分并发和并行的概念', '能举出需要并发的实际场景'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '你现在写的程序都是**一条路走到黑**——做完一步才能做下一步。\n如果某一步要等很长时间（比如读文件、下载数据），整个程序就被卡住了。\n**并发就是同时做多件事的能力。**',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '想象你做饭：\n- 先烧水（等水开要几分钟）\n- 再切菜\n- 再炒菜\n\n如果你**先烧水再切菜再炒菜**——全程在等水开，浪费时间。\n如果你**烧水的同时切菜**——节省了等待时间。\n这就是并发的核心思想。',
    },
    {
      type: 'exposition',
      text: '程序中的"等待"无处不在：\n- 读文件（硬盘比 CPU 慢 1000 倍）\n- 网络请求（服务器响应需要毫秒到秒级）\n- 用户输入（用户思考需要几秒）\n- 数据库查询（查询本身要执行时间）\n\n如果没有并发，这些等待时间里 CPU 只能闲着什么都不做。',
    },
    {
      type: 'exposition',
      text: '计算机的 CPU 通常有**多个核心**（4 核 / 8 核 / 16 核）。\n但单线程程序只能用一个核，其他核都空着。\n并发可以充分利用多核，让程序**更快完成更多工作**。',
    },
    {
      type: 'concept-cards',
      instruction: '先区分几个核心概念：',
      cards: [
        { glyph: '🧵', term: '线程 (Thread)', meaning: '程序中的一条执行路线', example: '一个线程做一件事' },
        { glyph: '⚡', term: '并发 (Concurrency)', meaning: '逻辑上同时处理多个任务', example: '快速切换轮流执行' },
        { glyph: '🔀', term: '并行 (Parallelism)', meaning: '物理上同时执行多个任务', example: '多核同时运行' },
        { glyph: '🧱', term: '阻塞 (Blocking)', meaning: '等某件事完成才能继续', example: 'cin >> x 会阻塞' },
      ],
    },
    {
      type: 'exposition',
      text: '**并发 ≠ 并行**\n\n- **并发**：多个任务"看起来同时在推进"——可以快速切换轮流执行，哪怕只有一个 CPU 核\n- **并行**：多个任务"真的同时执行"——必须有多个 CPU 核\n\n并发是**结构**问题（怎么组织代码），并行是**执行**问题（怎么运行代码）。',
    },
    {
      type: 'exposition',
      text: '一个典型的并发场景——**网络服务器**：\n\n```cpp\n// 没有并发的服务器——只能一个一个处理\nwhile (true) {\n  auto req = accept_request();  // 等待新请求（阻塞）\n  handle_request(req);          // 处理请求\n}\n```\n\n如果有 100 个用户同时访问，后面的 99 个都得排队。\n用并发可以让**每个请求用一个独立线程处理**。',
    },
    {
      type: 'multiple-choice',
      question: '以下哪个**最准确**描述了并发的核心目标？',
      options: [
        { text: '让程序跑得更快', correct: false, explanation: '跑得更快是并行的主要目标' },
        { text: '让多个任务能独立推进，避免阻塞拖累整体', correct: true, explanation: '并发的核心是独立推进任务，减少等待浪费' },
        { text: '让程序变得更简单', correct: false, explanation: '并发通常让程序变得更复杂' },
        { text: '让每个变量可以同时读写', correct: false, explanation: '同时读写变量会导致数据竞争——这是并发要小心处理的问题' },
      ],
    },
    {
      type: 'exposition',
      text: '**单线程的局限**：\n\n假设你要写一个文件下载工具：\n1. 下载文件 A（等 5 秒）\n2. 解压文件 A（等 2 秒）\n3. 下载文件 B（等 5 秒）\n4. 解压文件 B（等 2 秒）\n\n顺序执行总计 **14 秒**。\n如果同时下载 A 和 B，总计只要 **7 秒**——**性能翻倍**。',
    },
    {
      type: 'exposition',
      text: '但并发也带来了麻烦：\n\n1. **数据竞争**：两个线程同时修改一个变量\n2. **死锁**：两个线程互相等待\n3. **调试困难**：并发 bug 不一定能稳定复现\n4. **复杂度上升**：代码更难理解和维护\n\n这个阶段的课程就是教你**安全使用并发**。',
    },
    {
      type: 'multiple-choice',
      question: '多个 CPU 核心可以真正同时运行多个线程，这叫什么？',
      options: [
        { text: '并发', correct: false, explanation: '并发是逻辑上的"同时"，重点是任务组织方式' },
        { text: '并行', correct: true, explanation: '并行是物理上的同时执行，需要多核支持' },
        { text: '阻塞', correct: false, explanation: '阻塞是等待某件事完成的状态' },
        { text: '线程', correct: false, explanation: '线程是执行单元，不是执行方式' },
      ],
    },
    {
      type: 'exposition',
      text: '另一个常见的并发动机——**保持响应**。\n\n想象一个图形界面程序：\n- 主线程负责响应用户点击、刷新界面\n- 如果主线程直接处理耗时任务，界面会"卡死"\n- 正确的做法：用另一个线程处理任务，主线程保持响应\n\n这就是为什么浏览器、IDE、游戏都大量使用并发。',
    },
    {
      type: 'exposition',
      text: '**操作系统调度**：\n\n操作系统负责把线程分配到 CPU 核上运行。\n- 如果线程数 ≤ CPU 核数 → 每个线程独占一个核（真正的并行）\n- 如果线程数 > CPU 核数 → 操作系统快速切换（时间片轮转），看起来像同时运行\n\n这种切换非常快（毫秒级），用户感觉不到。',
    },
    {
      type: 'type-it',
      instruction: '敲一个模拟阻塞的程序——用 sleep 模拟耗时操作：',
      code: '#include <iostream>\n#include <thread>\nusing namespace std;\n\nint main() {\n  cout << "开始下载\\n";\n  this_thread::sleep_for(chrono::seconds(2));\n  cout << "下载完成\\n";\n}',
      hints: ['`sleep_for` 让当前线程暂停指定的时间', '`chrono::seconds(2)` 表示 2 秒', '这个程序顺序执行，有 2 秒的空白等待'],
    },
    {
      type: 'exposition',
      text: '**并发的适用场景**：\n\n✅ 适合并发的场景：\n- I/O 密集型任务（读文件、网络请求）\n- 用户界面保持响应\n- 独立任务并行计算\n- 服务器同时处理多个客户端\n\n❌ 不适合并发的场景：\n- 简单顺序计算（反而增加开销）\n- 强依赖顺序的任务\n- 临界区极大的任务（锁争用严重）',
    },
    {
      type: 'multiple-choice',
      question: '复习阶段 15：`decltype` 关键字的作用是什么？',
      options: [
        { text: '声明一个新类型', correct: false, explanation: 'decltype 是查询类型，不是声明类型' },
        { text: '推导表达式的类型，不实际执行', correct: true, explanation: 'decltype 在编译期推断表达式类型，不会运行代码' },
        { text: '让变量变成动态类型', correct: false, explanation: 'C++ 是静态类型语言' },
        { text: '声明变量而不初始化', correct: false, explanation: '那是变量声明，不是 decltype 的作用' },
      ],
    },
    {
      type: 'exposition',
      text: '**总结**：\n\n- 并发 = 让多个任务独立推进\n- 并行 = 多核真正同时执行\n- 并发提高**利用率**和**响应速度**\n- 并发也带来**数据竞争**、**死锁**等新问题\n- 操作系统负责线程调度\n\n从下一课开始，我们用 `std::thread` 真正创建线程。',
    },
    {
      type: 'exposition',
      text: '**阶段 18 路线图**：\n\n创建线程 → 管理线程 → 数据竞争 → 互斥锁\n→ lock_guard / unique_lock → 死锁与避免\n→ 条件变量 → async/future → atomic\n\n你将从零开始，建成完整的并发编程知识体系。',
    },
  ],
}

export default lesson
