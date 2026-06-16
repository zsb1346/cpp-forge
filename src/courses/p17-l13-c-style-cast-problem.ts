import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'c-style-cast-problem',
    chapter: 18,
    title: 'C 风格强转的问题',
    subtitle: '(int) 可以做一切',
    description: '了解 C 风格强转的隐患和为什么 C++ 提供了更具体的四种命名转换。',
    objectives: ['能识别 C 风格强转的问题', '能理解 C++ 四种 cast 的设计意图', '能避免在新代码中使用 C 风格强转'],
    estimatedMinutes: 8,
  },
  blocks: [
    {
      type: 'exposition',
      text: 'C 语言的类型转换写法：`(目标类型)表达式`。\n它什么都能做——但什么都不检查。',
      code: 'double d = 3.14;\nint i = (int)d;  // C 风格\n// 相当于 static_cast',
    },
    {
      type: 'exposition',
      text: '**问题一：什么都能做**。一个语法能做所有事情——数值转换、去 const、指针类型转换——你根本看不出它到底做了什么。',
      code: 'const int* cip = &ci;\nint* ip = (int*)cip;  // 做了 const_cast\n\nint* p = &x;\nchar* cp = (char*)p;  // 做了 reinterpret_cast',
    },
    {
      type: 'exposition',
      text: '代码审查时，一个 `(int)` 强转出现在 10 处地方——有的是去 const，有的是数值转换，有的是指针转换。你无法快速判断每处的意图。',
    },
    {
      type: 'multiple-choice',
      question: 'C 风格强转 (int)3.14 对应 C++ 的哪种 cast？',
      options: [
        { text: 'static_cast<int>(3.14)', correct: true, explanation: '数值转换对应 static_cast' },
        { text: 'reinterpret_cast<int>(3.14)', correct: false, explanation: 'reinterpret 用于指针相关' },
        { text: 'const_cast<int>(3.14)', correct: false, explanation: 'const_cast 不涉及数值转换' },
        { text: 'dynamic_cast<int>(3.14)', correct: false, explanation: 'dynamic_cast 用于多态类型' },
      ],
    },
    {
      type: 'exposition',
      text: '**问题二：代码中难以搜索**。用 grep 搜 `static_cast` 能精确找到所有使用处。搜 `(int)`？太多误报了。',
    },
    {
      type: 'exposition',
      text: '**问题三：可能做错转换**。C 风格强转能执行 `reinterpret_cast`，即使你不想要。',
      code: 'int* ptr = &x;\n// 程序员以为只是数值转换？错了！\ndouble* dp = (double*)ptr;  // 实际是 reinterpret_cast！',
    },
    {
      type: 'multiple-choice',
      question: '以下哪个是 C 风格强转可能实施但程序员未必预期的转换？',
      options: [
        { text: 'int 到 double', correct: false, explanation: 'int 到 double 是正常的数值转换' },
        { text: '去掉 const 属性', correct: true, explanation: 'C 风格强转可能悄悄去掉 const，而程序员可能没意识到' },
        { text: 'char 到 int', correct: false, explanation: '这是正常的提升转换' },
        { text: 'float 到 double', correct: false, explanation: '这是正常的提升转换' },
      ],
    },
    {
      type: 'exposition',
      text: 'C++ 的四种 cast 每种只做一件事：\n- `static_cast`：编译期安全转换\n- `dynamic_cast`：运行时安全向下转型\n- `const_cast`：改 const/volatile\n- `reinterpret_cast`：按位重解释',
    },
    {
      type: 'exposition',
      text: '这四种 cast 让转换的**意图**明确。看到 `const_cast`——"哦，这里在去掉 const"。看到 `reinterpret_cast`——"哦，这里在做低层位转换"。',
    },
    {
      type: 'exposition',
      text: 'C++ 编译器对 C 风格强转可以做更多检查——但它仍然允许一切。编译器倾向于不报错，因为 C 兼容性要求。',
    },
    {
      type: 'multiple-choice',
      question: 'C++ 项目中，以下哪个是最佳的转换实践？',
      options: [
        { text: '全部用 C 风格强转，更简洁', correct: false, explanation: 'C 风格强转不明确意图，且容易隐藏错误' },
        { text: '混合使用 C 风格和 C++ 风格', correct: false, explanation: '混合使用让意图不统一' },
        { text: '用 C++ 四种命名 cast 替代 C 风格强转', correct: true, explanation: '命名 cast 意图明确，便于搜索和审查' },
        { text: '完全不做类型转换', correct: false, explanation: '很多场景必须有类型转换' },
      ],
    },
    {
      type: 'exposition',
      text: '如何迁移旧代码中的 C 风格强转：\n1. 逐处检查强转的实际用途\n2. 替换为对应的 C++ cast\n3. 编译验证',
    },
    {
      type: 'exposition',
      text: '团队规范建议：在代码规范中禁止 C 风格强转（除了与 C 库接口时必须）。用静态检查工具（如 clang-tidy）自动检测。',
    },
    {
      type: 'exposition',
      text: '`static_cast` 替换 `(type)` 在数值转换中。`const_cast` 替换去 const。`reinterpret_cast` 替换指针位重解释。`dynamic_cast` 替换多态强制转换。',
    },
    {
      type: 'multiple-choice',
      question: '复习前一课：reinterpret_cast 的典型用途是什么？',
      options: [
        { text: '将 double 转换为 int', correct: false, explanation: '这应该用 static_cast' },
        { text: '将 const char* 转为 char*', correct: false, explanation: '这应该用 const_cast' },
        { text: '将结构体指针转为字节数组指针', correct: true, explanation: 'reinterpret_cast 适合低层位操作' },
        { text: '子类指针转父类指针', correct: false, explanation: '这应该用 static_cast 或隐式转换' },
      ],
    },
    {
      type: 'exposition',
      text: '唯一例外：在非常老的 C++ 代码（C++98 之前的标准）或纯 C 代码中，C 风格强转是唯一选择。但新代码不应该使用。',
    },
    {
      type: 'exposition',
      text: '有些编译器会对 C 风格强转发出警告（例如 clang 的 `-Wold-style-cast`）。开启这些警告可以帮助团队避免使用 C 风格强转。',
    },
    {
      type: 'exposition',
      text: '记住：**C 风格强转能用一条语法做所有事——恰恰是它的问题。** C++ 的四种 cast 每种做一件事，是更好的设计。',
    },
  ],
}

export default lesson
