import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'raii-beyond-memory',
    chapter: 11,
    title: 'RAII 不限于内存',
    subtitle: '文件、锁、数据库',
    description: 'RAII 可以管理各种资源：文件句柄、互斥锁、数据库连接——原理完全一样。',
    objectives: ['能用 RAII 管理文件资源', '能理解 RAII 管理锁的好处', '能扩展 RAII 思想到其他资源'],
    estimatedMinutes: 9,
  },
  blocks: [
    {
      type: 'exposition',
      text: 'RAII 不只管理内存。\n任何需要"获取-释放"的资源都适用：文件、锁、数据库连接、网络 socket。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '**文件管理**：C++ 的 `std::fstream` 就是 RAII 类。\n构造时打开文件，析构时自动关闭。',
      code: '#include <fstream>\n\nvoid writeFile() {\n  std::ofstream file("data.txt");  // 构造：打开\n  file << "hello";\n}  // 析构：自动 fclose',
    },
    {
      type: 'exposition',
      text: '传统 C 方式要手动 `fclose`——经常忘了。\nC++ 的 `ofstream` 用 RAII 自动关闭。',
    },
    {
      type: 'exposition',
      text: '**锁管理**：多线程中，`std::lock_guard` 是经典的 RAII 类。\n构造时加锁，析构时解锁。',
      code: '#include <mutex>\n\nstd::mutex mtx;\n\nvoid criticalSection() {\n  std::lock_guard<std::mutex> lock(mtx);  // 构造：加锁\n  // ... 安全操作 ...\n}  // 析构：自动解锁',
    },
    {
      type: 'exposition',
      text: '如果没有 RAII：`mtx.lock()` 后必须记得 `mtx.unlock()`。\n如果中间有 `return` 或异常，锁就永远不解了——**死锁**。',
    },
    {
      type: 'exposition',
      text: '**数据库连接**：很多数据库库用 RAII 管理连接。',
      code: 'void queryDatabase() {\n  Database db("localhost");  // 构造：连接\n  db.query("SELECT * FROM ...");\n}  // 析构：自动断开',
    },
    {
      type: 'multiple-choice',
      question: 'RAII 管理文件的核心机制是什么？',
      options: [
        { text: '构造函数打开文件，析构函数关闭文件', correct: true, explanation: 'RAII 的标准模式' },
        { text: '使用 open() 和 close() 函数手动调用', correct: false, explanation: '那是传统 C 方式' },
        { text: '调用系统 API 自动管理', correct: false, explanation: 'RAII 并不直接调系统 API' },
        { text: '文件会在程序结束时自动关闭', correct: false, explanation: '程序异常退出可能丢失数据' },
      ],
    },
    {
      type: 'exposition',
      text: '所有 RAII 管理的资源，模式都一样：\n1. **构造函数**：获取资源（open/new/lock/connect）\n2. **析构函数**：释放资源（close/delete/unlock/disconnect）\n3. **用户**：零操心',
    },
    {
      type: 'exposition',
      text: '自己写一个 RAII 文件管理类：',
      code: 'class FileGuard {\n  FILE* file;\npublic:\n  FileGuard(const char* name) {\n    file = fopen(name, "w");\n  }\n  ~FileGuard() {\n    if (file) fclose(file);\n  }\n  void write(const char* text) {\n    fprintf(file, "%s", text);\n  }\n};',
    },
    {
      type: 'exposition',
      text: '使用 `FileGuard`：',
      code: 'void saveData() {\n  FileGuard fg("output.txt");\n  fg.write("RAII 太棒了");\n}  // 自动 fclose',
    },
    {
      type: 'multiple-choice',
      question: '复习上一课：RAII 类的构造函数和析构函数分别做什么？',
      options: [
        { text: '构造初始化成员，析构清理成员', correct: false, explanation: '不准确——核心是获取和释放资源' },
        { text: '构造获取资源，析构释放资源', correct: true, explanation: '这是 RAII 的精髓' },
        { text: '构造分配内存，析构释放内存', correct: false, explanation: '内存只是资源的一种' },
        { text: '构造什么都不做，析构什么都做', correct: false, explanation: '构造也要做重要的工作' },
      ],
    },
    {
      type: 'exposition',
      text: 'RAII 的统一原理：\n**资源生命周期 = 对象生命周期**\n不论资源是内存、文件、锁、网络连接——模式都一样。',
    },
    {
      type: 'exposition',
      text: '所以 C++ 程序员常说：\n**"RAII is the killer feature of C++"**\nRAII 是 C++ 的杀手级特性。',
    },
    {
      type: 'exposition',
      text: '记住：\n- RAII 适用于所有"获取-释放"型资源\n- 文件、锁、数据库、socket 都可以\n- 构造获取、析构释放——通用模式',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '来看一个更现实的例子——**网络连接**：',
      code: 'class TcpConnection {\n  int sockfd;\npublic:\n  TcpConnection(const char* host, int port) {\n    sockfd = connectTo(host, port);\n  }\n  ~TcpConnection() {\n    close(sockfd);\n  }\n  void send(const char* data) { ... }\n};',
    },
    {
      type: 'exposition',
      text: '用这个 RAII 类，即使 `send` 抛出异常，析构也会正确关闭连接。\n不会留下"连接泄漏"——这是 RAII 的异常安全保障。',
    },
    {
      type: 'exposition',
      text: '多线程中的 RAII：`lock_guard` 是最常见的例子。\n如果不用 RAII，手动 lock/unlock 在异常时会导致死锁。\nRAII 让锁永远不会忘记释放。',
    },
    {
      type: 'multiple-choice',
      question: '不使用 RAII 管理锁会有什么问题？',
      options: [
        { text: '锁会一直占用，导致性能下降', correct: false, explanation: '不只是性能问题' },
        { text: '异常或提前 return 可能导致死锁', correct: true, explanation: 'lock 后没 unlock，其他线程永远等不到' },
        { text: '编译器会报错', correct: false, explanation: '编译器不会报错' },
        { text: '锁会自动释放，没问题', correct: false, explanation: '锁不会自动释放，必须手动 unlock' },
      ],
    },
  ],
}

export default lesson
