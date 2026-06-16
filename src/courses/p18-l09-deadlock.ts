import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'deadlock',
    chapter: 19,
    title: '死锁——互相等待',
    subtitle: 'A 等 B，B 等 A',
    description: '理解死锁的定义、产生条件，学会识别死锁场景。',
    objectives: ['能解释死锁的产生条件', '能识别代码中的死锁风险', '能理解死锁的四个必要条件'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '使用锁会引入一个新问题——**死锁**。\n两个线程各持有一把锁，同时等待对方释放另一把锁。\n结果：**双方永远等下去，程序卡死。**',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '经典的"哲学家就餐"问题比喻死锁：\n\n- 五位哲学家围坐在圆桌前\n- 每人需要两支筷子才能吃饭\n- 但只有五支筷子（每人左一支右一支）\n- 如果所有人同时拿起左边的筷子\n- **每个人都等右边的人放下筷子——永远等下去**\n\n程序中的死锁完全一样。',
    },
    {
      type: 'exposition',
      text: '看这个死锁代码：\n\n```cpp\nmutex mtx_a, mtx_b;\n\nvoid thread_a() {\n  mtx_a.lock();\n  this_thread::sleep_for(chrono::milliseconds(10));\n  mtx_b.lock();  // 可能等不到！\n  // ...\n  mtx_b.unlock();\n  mtx_a.unlock();\n}\n\nvoid thread_b() {\n  mtx_b.lock();\n  this_thread::sleep_for(chrono::milliseconds(10));\n  mtx_a.lock();  // 可能等不到！\n  // ...\n  mtx_a.unlock();\n  mtx_b.unlock();\n}\n```\n\n线程 A 持有 mtx_a 等 mtx_b\n线程 B 持有 mtx_b 等 mtx_a\n→ **死锁！**',
    },
    {
      type: 'concept-cards',
      instruction: '死锁的四个必要条件（缺一不可）：',
      cards: [
        { glyph: '🔒', term: '互斥 (Mutual Exclusion)', meaning: '每个资源只能被一个线程占用', example: 'mutex 的本质' },
        { glyph: '⏳', term: '持有并等待 (Hold & Wait)', meaning: '线程拿着一个锁等另一个锁', example: 'mtx_a 锁着等 mtx_b' },
        { glyph: '🚫', term: '不可剥夺 (No Preemption)', meaning: '不能强行拿走线程持有的锁', example: '只能由持有者 unlock' },
        { glyph: '🔄', term: '循环等待 (Circular Wait)', meaning: 'A 等 B，B 等 A（链条）', example: '两个以上线程也可能' },
      ],
    },
    {
      type: 'exposition',
      text: '**死锁不一定只有两个线程**：\n\n```\n线程 1: 持有 mtx_a，等 mtx_b\n线程 2: 持有 mtx_b，等 mtx_c\n线程 3: 持有 mtx_c，等 mtx_a\n```\n\n三个线程形成循环等待链条——也是死锁。\n链条可以有任意多个线程参与。\n\n**打破四个条件中任何一个就能防止死锁。**',
    },
    {
      type: 'exposition',
      text: '**死锁的隐蔽性**：\n\n死锁和数据竞争一样难以调试：\n- 不是每次都会触发（需要恰好时间交叉）\n- 低负载时可能永远不出现\n- 高负载或特定调度时突然卡死\n- 没有标准的方法来检测\n\n这就是为什么**预防死锁**比"出了再调"重要得多。',
    },
    {
      type: 'concept-cards',
      instruction: '常见的死锁场景：',
      cards: [
        { glyph: '🏦', term: '转账死锁', meaning: 'A 转给 B 和 B 转给 A 同时发生', example: '两个账户两把锁' },
        { glyph: '📋', term: '嵌套锁', meaning: '一个函数内有 lock_guard，又调用了另一个需要锁的函数', example: '同一线程锁两次' },
        { glyph: '🔗', term: '多锁链条', meaning: '多个线程以不同顺序请求多个锁', example: 'A 锁甲等乙，B 锁乙等甲' },
        { glyph: '⏰', term: '条件触发', meaning: '高负载或特定时机才暴露', example: '测试时正常，上线卡死' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '以下哪种情况一定会发生死锁？',
      options: [
        { text: '两个线程各自 lock 自己的 mutex', correct: false, explanation: '各自锁自己的，没有竞争，不会死锁' },
        { text: '线程 A 持有锁 1 等锁 2，线程 B 持有锁 2 等锁 1', correct: true, explanation: '循环等待——经典的死锁场景' },
        { text: '一个线程 lock 后忘记 unlock', correct: false, explanation: '这会导致其他线程永远等待，但不是严格意义上的死锁' },
        { text: '多个线程同时 lock 同一个 mutex', correct: false, explanation: '它们会排队等待，不会死锁' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '死锁的四个必要条件中，哪个是最容易通过代码设计打破的？',
      options: [
        { text: '互斥条件', correct: false, explanation: '互斥是锁的本质，不能打破' },
        { text: '循环等待条件', correct: true, explanation: '通过固定加锁顺序避免循环等待，是最常用的策略' },
        { text: '持有并等待条件', correct: false, explanation: '可以用一次性获取所有锁来打破，但实现复杂' },
        { text: '不可剥夺条件', correct: false, explanation: 'C++ mutex 不支持强行剥夺' },
      ],
    },
    {
      type: 'exposition',
      text: '**同一线程重复 lock 同一 mutex——另一种"死锁"**：\n\n```cpp\nmutex mtx;\n\nvoid inner() {\n  lock_guard<mutex> g(mtx);  // 再次请求锁！\n}\n\nvoid outer() {\n  lock_guard<mutex> g(mtx);\n  inner();  // inner 又请求同一锁——阻塞！\n}\n```\n\n普通 `mutex` 不允许同一线程重复加锁。\n如果确实需要，用 `recursive_mutex`（可重入锁）。\n但大部分情况下这说明设计有问题。',
    },
    {
      type: 'multiple-choice',
      question: '复习第 07 课：`unique_lock` 比 `lock_guard` 多提供了什么功能？',
      options: [
        { text: '自动加锁和解锁', correct: false, explanation: '两者都提供 RAII 自动管理' },
        { text: '提前 unlock 和 defer_lock 延迟加锁', correct: true, explanation: 'unique_lock 支持手动 unlock 和延迟加锁' },
        { text: '支持递归加锁', correct: false, explanation: '两者都不支持递归，需要 recursive_mutex' },
        { text: '更快的性能', correct: false, explanation: 'lock_guard 更轻量，unique_lock 有少许额外开销' },
      ],
    },
    {
      type: 'exposition',
      text: '**预防死锁比修复死锁更容易**\n\n死锁一旦发生，没有通用的"解锁"方式：\n- 不能强行释放线程持有的锁\n- 不能从外部终止死锁的线程（会破坏数据）\n- 唯一的办法是**重启程序**\n\n所以：**在写代码时就预防死锁。**\n\n下一课学习具体的预防策略。',
    },
    {
      type: 'exposition',
      text: '**lock_guard 导致死锁的例子**：\n\n```cpp\nmutex mtx_a, mtx_b;\n\nvoid func_a() {\n  lock_guard<mutex> g1(mtx_a);\n  this_thread::sleep_for(chrono::milliseconds(10));\n  lock_guard<mutex> g2(mtx_b);  // 等 mtx_b\n  // ...\n}\n\nvoid func_b() {\n  lock_guard<mutex> g1(mtx_b);  // 先锁 b\n  this_thread::sleep_for(chrono::milliseconds(10));\n  lock_guard<mutex> g2(mtx_a);  // 再锁 a——相反顺序！\n  // ...\n}\n```\n\n即使使用 RAII 锁，加锁顺序不正确仍然会死锁。',
    },
    {
      type: 'type-it',
      instruction: '敲一个会导致死锁的程序（不要在实际运行中使用）：',
      code: '#include <iostream>\n#include <thread>\n#include <mutex>\nusing namespace std;\n\nmutex mtx_a, mtx_b;\n\nvoid foo() {\n  lock_guard<mutex> g1(mtx_a);\n  this_thread::sleep_for(chrono::milliseconds(50));\n  lock_guard<mutex> g2(mtx_b);\n  cout << "foo done\\n";\n}\n\nvoid bar() {\n  lock_guard<mutex> g1(mtx_b);\n  this_thread::sleep_for(chrono::milliseconds(50));\n  lock_guard<mutex> g2(mtx_a);\n  cout << "bar done\\n";\n}\n\nint main() {\n  thread t1(foo);\n  thread t2(bar);\n  t1.join();\n  t2.join();\n}',
      hints: ['`foo` 先锁 a 再锁 b，`bar` 先锁 b 再锁 a——相反顺序', '`sleep_for` 增加了死锁发生的概率', '如果两个线程同时运行，可能永远卡住'],
    },
    {
      type: 'multiple-choice',
      question: '复习第 08 课：用 `lock_guard` 保护 `vector::push_back` 时要注意什么？',
      options: [
        { text: '什么也不用注意，lock_guard 自动解决所有问题', correct: false, explanation: 'lock_guard 只管理锁，不解决所有并发问题' },
        { text: 'push_back 和 size() 等所有 vector 操作都要加同一个锁', correct: true, explanation: '所有对同一容器的访问都要用同一把锁保护' },
        { text: '只能用 unique_lock，lock_guard 不够', correct: false, explanation: 'lock_guard 足够保护 push_back' },
        { text: 'vector 本身是线程安全的', correct: false, explanation: '标准库容器不是线程安全的' },
      ],
    },
    {
      type: 'exposition',
      text: '**递归加锁的死锁**：\n\n同一个线程不能重复 lock 同一个普通 mutex：\n\n```cpp\nmutex mtx;\n\nvoid inner() {\n  lock_guard<mutex> g(mtx);  // 第二次请求——死锁！\n}\n\nvoid outer() {\n  lock_guard<mutex> g(mtx);  // 第一次请求\n  inner();                    // inner 又请求同样的锁\n}\n```\n\n解决方案：\n- 用 `recursive_mutex`（可重入）\n- 或重构代码避免嵌套加锁',
    },
    {
      type: 'exposition',
      text: '**检测死锁的方法**：\n\nWindows 和 Linux 都有工具检测死锁：\n\n- **Windows**：Visual Studio 调试器 → 线程窗口 → 冻结/解冻\n- **Valgrind (Linux)**：`valgrind --tool=helgrind ./program`\n- **ThreadSanitizer**：`-fsanitize=thread` 编译选项\n- **代码审查**：手动检查加锁顺序\n\n但最好的方法仍然是**预防**——在写代码时就注意。',
    },
    {
      type: 'multiple-choice',
      question: '复习第 08 课：`lock_guard` 和 `unique_lock` 都可以用来做什么？',
      options: [
        { text: '创建新线程', correct: false, explanation: '创建线程用 std::thread' },
        { text: 'RAII 方式自动管理 mutex 的加锁和解锁', correct: true, explanation: '两者都是 RAII 锁管理器' },
        { text: '在多个线程之间传递数据', correct: false, explanation: '锁不传数据，只提供互斥访问' },
        { text: '检测数据竞争', correct: false, explanation: '锁防止数据竞争，但不检测' },
      ],
    },
  ],
}

export default lesson
