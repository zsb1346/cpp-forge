import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'interface-design',
    chapter: 9,
    title: '接口设计',
    subtitle: '用抽象类定义规范',
    description: '抽象类就是一份契约，规定子类必须实现哪些方法。',
    objectives: ['能用抽象类设计接口', '能理解接口在大型项目中的作用'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '当你用抽象类来定义"你必须实现什么"时，你就是在做**接口设计**。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '接口（在 C++ 中用抽象类实现）是一份**契约**：\n- 基类规定"你要做什么"\n- 派生类决定"怎么做"',
    },
    {
      type: 'exposition',
      text: '看一个接口设计的例子——`IPrintable`：',
      code: 'class IPrintable {\npublic:\n  virtual void print() const = 0;\n  virtual ~IPrintable() { }\n};',
    },
    {
      type: 'exposition',
      text: '任何实现了`IPrintable`的类都可以被"打印"：',
      code: 'class Document : public IPrintable {\npublic:\n  void print() const override {\n    cout << "打印文档";\n  }\n};\n\nclass Image : public IPrintable {\npublic:\n  void print() const override {\n    cout << "打印图片";\n  }\n};',
    },
    {
      type: 'exposition',
      text: '### 接口命名约定\n\n在 C++ 中，接口类常以`I`开头：\n- `IPrintable`\n- `ISerializable`\n- `IDrawable`\n- `IUpdatable`\n- `IRenderable`',
    },
    {
      type: 'exposition',
      text: '### 接口设计原则\n\n1. **单一职责**：一个接口只做一件事\n   - `IDrawable`：只负责绘制\n   - `IUpdatable`：只负责更新\n   - `ISerializable`：只负责序列化\n\n2. **小而专**：接口方法不要太多（通常 1-3 个）\n\n3. **纯虚 + 虚析构**：接口通常只有纯虚函数和虚析构',
    },
    {
      type: 'code-runner',
      instruction: '实现 IPrintable 接口：',
      code: `#include <iostream>
using namespace std;

class IPrintable {
public:
  virtual void print() const = 0;
  virtual ~IPrintable() { }
};

class Document : public IPrintable {
public:
  void print() const override {
    cout << "打印文档";
  }
};

class Image : public IPrintable {
public:
  void print() const override {
    cout << "打印图片";
  }
};

int main() {
  IPrintable* items[2];
  items[0] = new Document();
  items[1] = new Image();
  for (int i = 0; i < 2; i++) {
    items[i]->print();
    cout << " ";
  }
}`,
      expectedOutput: '打印文档 打印图片',
      comparison: 'trimmed',
      editable: false,
    },
    {
      type: 'multiple-choice',
      question: '回顾：抽象类为什么不能创建对象？',
      options: [
        { text: '因为内存不够', correct: false, explanation: '抽象类不能实例化是语法规则，不是内存原因' },
        { text: '因为纯虚函数没有实现', correct: true, explanation: '纯虚函数没有函数体，编译器禁止创建不完整的对象' },
        { text: '因为构造是私有的', correct: false, explanation: '抽象类不能实例化和构造访问权限无关' },
        { text: '因为 C++ 语法限制', correct: false, explanation: '具体原因是有未实现的纯虚函数' },
      ],
    },
    {
      type: 'exposition',
      text: '### 接口的好处\n\n- **统一调用方式**：不论什么类型，统一用基类指针调用\n- **解耦合**：调用方不关心具体类型，只关心接口\n- **可替换**：随时换一个实现，调用方代码不用改\n- **测试友好**：可以轻松 mock 接口进行单元测试',
    },
    {
      type: 'exposition',
      text: '### 现实类比\n\nUSB 接口就是一个"接口"：\n- USB 协议规定"必须能传输数据"\n- 鼠标、键盘、U盘各自实现\n- 电脑只认 USB 接口，不关心具体设备\n- 换个设备，电脑代码不用改——这就是解耦合',
    },
    {
      type: 'code-runner',
      instruction: '设计一个 IPlayable 接口并实现：',
      code: `#include <iostream>
using namespace std;

class IPlayable {
public:
  virtual void play() = 0;
  virtual void pause() = 0;
  virtual ~IPlayable() { }
};

class Music : public IPlayable {
public:
  void play() override { cout << "播放音乐"; }
  void pause() override { cout << "暂停音乐"; }
};

class Video : public IPlayable {
public:
  void play() override { cout << "播放视频"; }
  void pause() override { cout << "暂停视频"; }
};

int main() {
  IPlayable* media = new Music();
  media->play();
  cout << " / ";
  media->pause();
}`,
      expectedOutput: '播放音乐 / 暂停音乐',
      comparison: 'trimmed',
      editable: false,
    },
    {
      type: 'exposition',
      text: '### 纯接口类 vs 抽象基类\n\n- **纯接口类**：只有纯虚函数 + 虚析构（C++ 中模拟接口）\n- **抽象基类**：有纯虚函数 + 普通成员（提供共享实现）\n\n一般建议：先用纯接口类，需要共享代码时再转抽象基类。',
    },
    {
      type: 'multiple-choice',
      question: '接口设计最核心的价值是什么？',
      options: [
        { text: '让代码看起来更专业', correct: false, explanation: '专业不是目的，可维护才是' },
        { text: '统一调用方式，解耦合', correct: true, explanation: '接口让调用方不依赖具体实现，只依赖抽象' },
        { text: '让派生类不能修改接口方法', correct: false, explanation: '派生类必须实现接口方法，但可以实现自己的逻辑' },
        { text: '减少类的数量', correct: false, explanation: '接口通常会增加抽象层次' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '接口类中的方法通常是什么？',
      options: [
        { text: '普通成员函数', correct: false, explanation: '接口类的方法通常没有实现' },
        { text: '纯虚函数', correct: true, explanation: '接口类用纯虚函数定义契约' },
        { text: '静态函数', correct: false, explanation: '静态函数不能是虚函数，不适合接口' },
        { text: '内联函数', correct: false, explanation: '接口类的方法没有实现，不能内联' },
      ],
    },
    {
      type: 'exposition',
      text: '### 常见的接口例子\n\n标准库中的接口思想无处不在：\n- 迭代器接口：`begin()` / `end()` / `operator++`\n- 比较接口：`operator<` / `operator==`\n- 流接口：`operator<<` / `operator>>`',
    },
    {
      type: 'exposition',
      text: '### 思考题\n\n如果你要设计一个"所有游戏对象都能更新和绘制"的系统，\n接口应该怎么定义？提示：需要`update()`和`render()`。',
    },
    {
      type: 'exposition',
      text: '### 接口 vs 继承\n\n- **继承**：共享代码实现（代码复用）\n- **接口**：统一行为规范（契约设计）\n\n两者可以同时使用。先定接口，再用抽象基类提供默认实现，最后用具体类完成业务。',
    },
    {
      type: 'exposition',
      text: '总结：\n- 接口 = 纯虚函数集合 = 契约\n- 调用方只依赖接口，不依赖具体实现\n- 接口设计让系统更灵活、可扩展\n- C++ 中用抽象类模拟接口，以 I 开头命名',
      textAnimation: 'typewriter',
    },
  ],
}

export default lesson
