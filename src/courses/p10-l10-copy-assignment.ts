import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'copy-assignment',
    chapter: 11,
    title: '拷贝赋值运算符',
    subtitle: '= 的拷贝版本',
    description: '学习重载拷贝赋值运算符，实现深拷贝的赋值操作，注意自赋值检查。',
    objectives: ['能重载拷贝赋值运算符', '能实现自赋值检查', '能区分拷贝构造和拷贝赋值'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '拷贝赋值运算符是**给已存在的对象赋值**。\n用 `operator=` 重载。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '声明语法：',
      code: 'class ClassName {\npublic:\n  ClassName& operator=(const ClassName& other);\n};',
    },
    {
      type: 'exposition',
      text: '返回 `ClassName&`（自身的引用），支持链式赋值：`a = b = c;`。\n参数是 `const ClassName&`——和拷贝构造一样。',
    },
    {
      type: 'exposition',
      text: '默认的拷贝赋值也是**浅拷贝**——复制指针地址。\n和默认拷贝构造一样危险。',
    },
    {
      type: 'type-it',
      instruction: '敲这段：声明拷贝赋值运算符。',
      code: '#include <iostream>\n#include <cstring>\nusing namespace std;\n\nclass MyString {\npublic:\n  char* data;\n  MyString(const char* s) {\n    data = new char[strlen(s) + 1];\n    strcpy(data, s);\n  }\n  MyString& operator=(const MyString& other) {\n    if (this == &other) return *this;\n    delete[] data;\n    data = new char[strlen(other.data) + 1];\n    strcpy(data, other.data);\n    return *this;\n  }\n  ~MyString() { delete[] data; }\n  void print() { cout << data << endl; }\n};',
      hints: ['先检查自赋值 `this == &other`', '释放旧内存再分配新的', '返回 *this 支持链式赋值'],
    },
    {
      type: 'exposition',
      text: '拷贝赋值的标准步骤：\n1. **自赋值检查**：`if (this == &other) return *this;`\n2. **释放旧资源**：`delete[] data;`\n3. **分配新资源**：`data = new char[...];`\n4. **复制内容**：`strcpy(data, other.data);`\n5. **返回自身**：`return *this;`',
    },
    {
      type: 'exposition',
      text: '自赋值检查为什么重要？\n如果 `a = a;`，没有检查的话，先 `delete[] data` 就把自己的数据删了。',
    },
    {
      type: 'type-it',
      instruction: '敲这段：使用拷贝赋值。',
      code: '#include <iostream>\n#include <cstring>\nusing namespace std;\n\nclass MyString {\npublic:\n  char* data;\n  MyString(const char* s) {\n    data = new char[strlen(s) + 1];\n    strcpy(data, s);\n  }\n  MyString& operator=(const MyString& other) {\n    if (this == &other) return *this;\n    delete[] data;\n    data = new char[strlen(other.data) + 1];\n    strcpy(data, other.data);\n    return *this;\n  }\n  ~MyString() { delete[] data; }\n};\n\nint main() {\n  MyString a("hello");\n  MyString b("world");\n  b = a;\n  cout << b.data << endl;\n}',
      hints: ['b = a 调用拷贝赋值', 'b 已有数据，先释放旧的', '再分配新内存复制内容'],
    },
    {
      type: 'exposition',
      text: '拷贝构造 vs 拷贝赋值：',
      code: 'MyString a("hello");\nMyString b = a;  // 拷贝构造：b 还不存在\n\nMyString c("world");\nc = a;            // 拷贝赋值：c 已经存在',
    },
    {
      type: 'match-blocks',
      instruction: '按正确顺序排列拷贝赋值运算符的实现步骤：',
      fragments: ['if (this == &other) return *this;', 'delete[] data;', 'data = new char[...];', 'strcpy(data, other.data);', 'return *this;'],
      distractors: ['data = other.data;'],
    },
    {
      type: 'exposition',
      text: '**区分关键**：\n- 拷贝构造：**初始化**（对象还不存在）\n- 拷贝赋值：**赋值**（对象已存在，需要释放旧资源）',
    },
    {
      type: 'exposition',
      text: '如果类里没有指针成员，默认的拷贝赋值就够用。\n有指针成员时，必须自己实现深拷贝版本。',
    },
    {
      type: 'exposition',
      text: '注意："拷贝赋值"和"拷贝构造"同时需要实现——\n如果类需要深拷贝，这两个都必须写。',
    },
    {
      type: 'multiple-choice',
      question: '复习上一课：拷贝构造函数的参数为什么必须是引用？',
      options: [
        { text: '为了兼容 C 语言', correct: false, explanation: '与 C 无关' },
        { text: '为了性能，避免拷贝', correct: false, explanation: '真正原因不是性能' },
        { text: '因为传值会无限递归调用拷贝构造', correct: true, explanation: '传值本身就要调拷贝构造，形成死循环' },
        { text: '引用参数更安全', correct: false, explanation: '真正原因是防止递归' },
      ],
    },
    {
      type: 'exposition',
      text: '总结拷贝赋值的要点：\n1. 返回 `ClassName&`\n2. 参数是 `const ClassName&`\n3. 检查自赋值\n4. 释放旧资源 → 分配新资源 → 复制\n5. 返回 `*this`',
    },
    {
      type: 'exposition',
      text: '记住：**拷贝构造 + 拷贝赋值 + 析构**——这三者通常一起出现。\n这就是下一课的主角：**Rule of Three**。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '还有一个细节：拷贝赋值中，**先释放旧资源再分配新资源**。\n如果 `new` 失败了抛出异常，旧资源已经被释放了怎么办？',
    },
    {
      type: 'exposition',
      text: '高级写法：**先复制再释放**（copy-and-swap 惯用法）。\n不过现阶段你只需记住自赋值检查和先释放后分配的标准流程。',
    },
    {
      type: 'exposition',
      text: '下一讲我们学习把这些组合在一起的规则——\n**Rule of Three**：三剑客缺一不可。',
    },
  ],
}

export default lesson
