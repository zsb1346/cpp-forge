import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'dangling-pointer',
    chapter: 11,
    title: '悬空指针',
    subtitle: '指针还在数据没了',
    description: 'delete 后指针仍然指向原来的地址，但那里已经空了——这就是悬空指针。',
    objectives: ['能理解悬空指针的概念', '能识别悬空指针的危险', '能养成 delete 后置空指针的习惯'],
    estimatedMinutes: 9,
  },
  blocks: [
    {
      type: 'exposition',
      text: '`delete p` 之后，`p` 还在，地址还在。\n但那个地址上的内容——已经还给系统了。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '这就是**悬空指针（dangling pointer）**：\n指针指向了一块已经被释放的内存。',
    },
    {
      type: 'exposition',
      text: '就像一个门牌号还在，但门后的房子已经被拆了。\n你还按门牌号去找——找不到了。',
    },
    {
      type: 'exposition',
      text: '看示例：',
      code: 'int* p = new int(42);\ndelete p;  // 释放内存\n\ncout << *p;  // ❌ 悬空指针！p 指向的内存已释放',
    },
    {
      type: 'exposition',
      text: '访问悬空指针是**未定义行为（undefined behavior）**。\n可能崩溃、可能输出垃圾值、可能看起来正常——全看运气。',
    },
    {
      type: 'type-it',
      instruction: '敲这段代码，观察悬空指针：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int* p = new int(999);\n  cout << "delete 前: " << *p << endl;\n  delete p;\n  cout << "delete 后: " << *p << endl;\n}',
      hints: ['delete 前能正常输出值', 'delete 后访问 *p 是未定义行为', '可能输出垃圾值或崩溃'],
    },
    {
      type: 'exposition',
      text: '注意：`delete` 不会把指针本身变成 `nullptr`。\n`p` 仍然存着原来的地址，只是那里已经不属于你了。',
    },
    {
      type: 'exposition',
      text: '更危险的场景：**两个指针指向同一块内存**。',
      code: 'int* p = new int(100);\nint* q = p;  // q 也指向同一块内存\n\ndelete p;    // 释放内存\np = nullptr; // 好习惯：置空\n\ncout << *q;  // ❌ q 成了悬空指针！p 置空不影响 q',
    },
    {
      type: 'multiple-choice',
      question: '下面哪个是悬空指针？',
      options: [
        { text: 'int* p = nullptr;', correct: false, explanation: '空指针，不悬空' },
        { text: 'int* p = new int(5); delete p; 之后访问 *p', correct: true, explanation: '内存已释放，p 成了悬空指针' },
        { text: 'int* p = new int(5); *p = 10;', correct: false, explanation: 'p 有效，不是悬空' },
        { text: 'int x = 5; int* p = &x;', correct: false, explanation: 'p 指向栈变量，没悬空' },
      ],
    },
    {
      type: 'exposition',
      text: '**好习惯**：`delete` 后立刻把指针置为 `nullptr`。',
      code: 'int* p = new int(42);\ndelete p;\np = nullptr;  // p 不再指向任何地方\n\nif (p != nullptr) {\n  cout << *p;  // 安全：不会执行\n}',
    },
    {
      type: 'type-it',
      instruction: '敲这段：delete 后置空指针。',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int* p = new int(50);\n  cout << *p << endl;\n  delete p;\n  p = nullptr;\n  if (p == nullptr) {\n    cout << "指针已置空，安全" << endl;\n  }\n}',
      hints: ['delete 后马上 p = nullptr', '置空后的指针可以安全判断', '避免误访问已释放内存'],
    },
    {
      type: 'exposition',
      text: '`delete` 一个空指针是安全的——C++ 保证不会出问题。',
      code: 'int* p = nullptr;\ndelete p;  // ✅ 安全，什么都不做',
    },
    {
      type: 'multiple-choice',
      question: '复习上一课：内存泄漏和悬空指针的区别？',
      options: [
        { text: '泄漏是 new 不 delete，悬空是 delete 后继续用', correct: true, explanation: '泄漏：忘了还。悬空：还了还用' },
        { text: '泄漏是栈上的，悬空是堆上的', correct: false, explanation: '都是堆相关的' },
        { text: '泄漏比悬空更危险', correct: false, explanation: '两者都很危险，都是未定义行为' },
        { text: '悬空指针是泄漏的一种', correct: false, explanation: '两者是不同的概念' },
      ],
    },
    {
      type: 'exposition',
      text: '悬空指针 vs 野指针：\n- **悬空指针**：曾经有效，delete 后失效\n- **野指针**：从未初始化，指向随机地址',
    },
    {
      type: 'exposition',
      text: '两者都很危险，但野指针更不可预测。\n好在只要你**初始化所有指针**，就不会有野指针。',
    },
    {
      type: 'exposition',
      text: '最好的解决办法：不用裸指针，用**智能指针**。\n智能指针会自动置空、自动管理——后面会学。',
    },
    {
      type: 'type-it',
      instruction: '敲一个完整示例：安全地使用堆内存。',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int* p = new int(77);\n  cout << "值: " << *p << endl;\n  delete p;\n  p = nullptr;\n  cout << "已安全释放" << endl;\n}',
      hints: ['new-delete 配对', 'delete 后置空', '养成安全习惯'],
    },
    {
      type: 'exposition',
      text: '记住：\n- `delete` 后指针还在，但内存没了\n- 访问悬空指针 = 未定义行为\n- **delete 后立即置空**——小习惯，大安全。',
      textAnimation: 'typewriter',
    },
  ],
}

export default lesson
