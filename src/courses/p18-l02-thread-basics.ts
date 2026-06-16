import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'thread-basics',
    chapter: 19,
    title: 'std::thread——创建线程',
    subtitle: '启动一个线程',
    description: '学会用 std::thread 创建线程，用 join() 等待线程结束。',
    objectives: ['能用 std::thread 创建并启动线程', '能用 join() 等待线程结束', '能理解线程函数的写法'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '上一课我们说了并发的基本思想。\n现在看 C++ 如何实现——用 `std::thread` 创建线程。\n**`<thread>` 头文件提供了线程支持。**',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '创建线程非常简单：\n\n```cpp\n#include <thread>\n\nvoid hello() {\n  cout << "Hello from thread!\\n";\n}\n\nint main() {\n  thread t(hello);  // 创建线程，执行 hello 函数\n  t.join();          // 等待线程结束\n}\n```\n\n`thread t(hello)` 启动一个新线程来执行 `hello` 函数。',
    },
    {
      type: 'concept-cards',
      instruction: '认识 std::thread 的关键概念：',
      cards: [
        { glyph: '🧵', term: 'std::thread', meaning: '线程对象，管理一个执行线程', example: 'thread t(func)' },
        { glyph: '🔗', term: '.join()', meaning: '等待线程执行完毕再继续', example: 't.join()' },
        { glyph: '🎯', term: '线程函数', meaning: '线程启动时执行的函数', example: '普通函数 / lambda' },
        { glyph: '🆔', term: 'this_thread::get_id()', meaning: '获取当前线程的唯一 ID', example: '查看线程编号' },
      ],
    },
    {
      type: 'exposition',
      text: '**join() 的必要性**：\n\n创建线程后，必须在它被销毁之前决定：\n- 调用 `join()` 等待它结束\n- 或者调用 `detach()` 让它独立运行\n\n如果 `thread` 对象析构时既没有 join 也没有 detach，程序会**调用 terminate() 直接终止**。',
    },
    {
      type: 'exposition',
      text: '线程函数的写法有很多种：\n\n```cpp\n// 方式 1：普通函数\nvoid work() { /* ... */ }\nthread t1(work);\n\n// 方式 2：lambda 表达式\nthread t2([]{\n  cout << "lambda thread\\n";\n});\n\n// 方式 3：带参数的函数\nvoid print(string msg) {\n  cout << msg << "\\n";\n}\nthread t3(print, "hello");\n```\n\n第三种方式，参数自动传递给函数。',
    },
    {
      type: 'type-it',
      instruction: '敲一个创建线程并等待的程序：',
      code: '#include <iostream>\n#include <thread>\nusing namespace std;\n\nvoid work() {\n  cout << "working\\n";\n}\n\nint main() {\n  thread t(work);\n  t.join();\n}',
      hints: ['`thread t(work)` 创建线程，`work` 是函数名不需要括号', '`t.join()` 必须调用，否则程序会崩溃', '执行顺序不确定——主线程和子线程谁先跑不确定'],
    },
    {
      type: 'exposition',
      text: '**多线程的执行顺序是不确定的！**\n\n```cpp\nvoid say_hello() {\n  cout << "Hello from thread\\n";\n}\n\nint main() {\n  thread t(say_hello);\n  cout << "Hello from main\\n";\n  t.join();\n}\n```\n\n两个 "Hello" 谁先输出？**不一定。**\n这取决于操作系统的线程调度。每次运行都可能不同。',
    },
    {
      type: 'exposition',
      text: '**传递引用参数**要小心：\n\n```cpp\nvoid update(int& x) { x = 42; }\n\nint main() {\n  int value = 0;\n  thread t(update, ref(value));  // 必须用 ref() 包装引用\n  t.join();\n  cout << value;  // 42\n}\n```\n\n默认情况下 `thread` 会拷贝参数。要传递引用必须用 `std::ref()`。\n不加 `ref()` 编译会报错。',
    },
    {
      type: 'exposition',
      text: '**线程 ID**：\n\n```cpp\nint main() {\n  cout << "main thread id: "\n       << this_thread::get_id() << "\\n";\n\n  thread t([]{\n    cout << "child thread id: "\n         << this_thread::get_id() << "\\n";\n  });\n  t.join();\n}\n```\n\n每个线程有唯一的 ID，调试时可以用来区分线程。',
    },
    {
      type: 'type-it',
      instruction: '敲一个带参数的线程：',
      code: '#include <iostream>\n#include <thread>\nusing namespace std;\n\nvoid greet(string name) {\n  cout << "Hello, " << name << "\\n";\n}\n\nint main() {\n  thread t(greet, "C++");\n  t.join();\n}',
      hints: ['`greet` 接收一个 string 参数', '参数在 `thread` 构造函数的第二个位置传入', '`t.join()` 确保子线程输出完再结束主程序'],
    },
    {
      type: 'multiple-choice',
      question: '以下哪种情况会导致程序调用 `terminate()` 终止？',
      options: [
        { text: '线程函数返回了错误值', correct: false, explanation: '线程函数返回不会导致 terminate' },
        { text: 'thread 对象销毁时既没有 join 也没有 detach', correct: true, explanation: '这叫"不可结合的线程"，销毁时会调用 terminate()' },
        { text: 'join() 被调用了两次', correct: false, explanation: '调用两次 join 会抛出 std::system_error，但不一定 terminate' },
        { text: '线程函数参数太多', correct: false, explanation: '编译期就会报错' },
      ],
    },
    {
      type: 'exposition',
      text: '**线程的生命周期**：\n\n```\nthread t(func);  // 创建 → 线程开始执行\n     ↓\nt.join();        // 等待线程结束\n     ↓\n（t 被销毁或重用）\n```\n\n创建线程后，它立即开始执行（别等什么"启动"函数）。\n`join()` 阻塞当前线程，直到线程函数返回。',
    },
    {
      type: 'exposition',
      text: '**多个线程的执行顺序**：\n\n当你有多个线程时，它们的执行顺序是完全不可预测的：\n\n```cpp\nvoid print_id(int id) {\n  cout << "Thread " << id << "\\n";\n}\n\nint main() {\n  thread t1(print_id, 1);\n  thread t2(print_id, 2);\n  thread t3(print_id, 3);\n  t1.join();\n  t2.join();\n  t3.join();\n}\n```\n\n输出可能是 1-2-3，也可能是 3-1-2，每次运行都可能不同。\n这就是**非确定性执行**。',
    },
    {
      type: 'exposition',
      text: '**线程开销**：\n\n创建线程不是免费的：\n- 每个线程需要独立的栈空间（通常 1-8 MB）\n- 线程创建本身需要系统调用（微秒级开销）\n- 上下文切换涉及寄存器保存/恢复\n\n所以不是越多越好——线程数一般不超过 CPU 核心数的 2-4 倍。',
    },
    {
      type: 'multiple-choice',
      question: '复习第 01 课：并发和并行的区别是什么？',
      options: [
        { text: '并发 = 单核同时做多件事，并行 = 多核同时做多件事', correct: false, explanation: '并发也可以在单核上通过切换实现' },
        { text: '并发是逻辑上的同时，并行是物理上的同时', correct: true, explanation: '并发关注任务组织，并行关注实际执行' },
        { text: '它们是一回事，只是不同说法', correct: false, explanation: '两个概念有本质区别' },
        { text: '并行的代码更难写', correct: false, explanation: '两者都可能难写，这不是它们的定义区别' },
      ],
    },
    {
      type: 'code-runner',
      instruction: '运行以下程序，观察两个线程的输出顺序。',
      code: '#include <iostream>\n#include <thread>\nusing namespace std;\n\nvoid task(int id) {\n  cout << "Thread " << id << " running\\n";\n}\n\nint main() {\n  thread t1(task, 1);\n  thread t2(task, 2);\n  t1.join();\n  t2.join();\n  cout << "Both done\\n";\n}',
      expectedOutput: 'Thread 1 running\nThread 2 running\nBoth done',
      comparison: 'contains',
      editable: true,
    },
    {
      type: 'exposition',
      text: '**线程的常见错误**：\n\n1. **忘记 join 或 detach** → 程序 terminate\n2. **多次 join** → 抛出 system_error\n3. **传递局部变量地址给 detach 的线程** → 未定义行为\n4. **线程函数抛异常** → 不捕获会导致程序终止\n\n```cpp\n// 错误示例：传递局部变量地址\nvoid f(int& x) { }\nint main() {\n  int a = 5;\n  thread t(f, ref(a));\n  t.detach();  // a 可能在 t 使用前销毁\n}  // ⚠️ a 在此销毁\n```',
    },
    {
      type: 'exposition',
      text: '**总结**：\n\n- `std::thread t(func)` 创建并启动线程\n- `.join()` 等待线程结束\n- 线程函数可以是普通函数、lambda、函数对象\n- 传递参数用额外的构造函数参数\n- 传递引用必须用 `std::ref()`\n- 必须 join 或 detach，否则程序终止',
    },
  ],
}

export default lesson
