import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'reading-errors',
    chapter: 7,
    title: '读懂编译错误',
    subtitle: '编译器在说什么',
    description: '学会看懂编译器的报错信息，不再被满屏红色吓跑。',
    objectives: [
      '能读出编译器错误信息的三要素',
      '能识别 4 种常见编译错误',
      '知道错误连锁现象的处理方法',
    ],
    estimatedMinutes: 11,
  },
  blocks: [
    {
      type: 'exposition',
      text: '编译错误（compile error）是不是你见过最吓人的东西？\n满屏红色、看不懂的英文、还有一堆行号。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '别怕。编译器其实在**帮你**——它发现了你代码里的问题，\n并且很努力地告诉你在哪、是什么问题。\n你只需要学会"翻译"它在说什么。',
    },
    {
      type: 'exposition',
      text: '一条编译错误信息长这样：\n`test.cpp(5,3): error C2143: syntax error: missing \';\' before \'{\'`\n拆开来看有三部分：**位置** + **类型** + **描述**。\n\n**位置** `(5,3)` 表示第 5 行第 3 列——你盯着第 5 行附近找就对了。',
    },
    {
      type: 'exposition',
      text: '**错误类型**：`error` 还是 `warning`。\n- `error`：必须改，编译不通过\n- `warning`：可以编译通过，但可能有问题\n\n初学者最好一个 warning 都不要放过。',
    },
    {
      type: 'concept-cards',
      instruction: '错误信息的三个部分：',
      cards: [
        { glyph: '\uD83D\uDCCD', term: '\u4F4D\u7F6E', meaning: '\u6587\u4EF6\u540D(\u884C\u53F7:\u5217\u53F7)', example: 'main.cpp(12,5)' },
        { glyph: '\u26A0\uFE0F', term: '\u9519\u8BEF\u7C7B\u578B', meaning: 'error \u5FC5\u987B\u6539\uFF0Cwarning \u5EFA\u8BAE\u6539', example: 'error C2143' },
        { glyph: '\uD83D\uDCAC', term: '\u63CF\u8FF0', meaning: '\u7F16\u8BD1\u5668\u8BA4\u4E3A\u95EE\u9898\u662F\u4EC0\u4E48', example: 'missing \';\' before \'{\'' },
      ],
    },
    {
      type: 'exposition',
      text: '最常见的编译错误第一名：**忘记写分号** `;`。',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int x = 5\n  cout << x;\n}',
    },
    {
      type: 'exposition',
      text: '第 5 行 `int x = 5` 后面没有分号。\n但编译器可能会报错在第 6 行——它读到第 6 行才发现不对劲。\n记住：**编译器报错的行不一定就是问题所在行，可能在上一行**。',
    },
    {
      type: 'multiple-choice',
      question: '这段代码第 4 行报错 `missing \';\'`：\n```\nint x = 10\nint y = 20;\n```\n问题实际在哪？',
      options: [
        { text: '第 4 行 `int x = 10` 后面缺分号', correct: true, explanation: '第 4 行结尾没写分号，编译器到第 5 行才发现报错' },
        { text: '第 5 行 `int y = 20;` 多了一个分号', correct: false, explanation: '分号是必须的，没有多' },
        { text: '第 4 行和第 5 行都缺分号', correct: false, explanation: '第 5 行有分号，只有第 4 行缺' },
        { text: '变量名写错了', correct: false, explanation: '变量名 x 和 y 都没问题' },
      ],
    },
    {
      type: 'exposition',
      text: '常见错误第二名：**大括号不匹配**。\n`expected \'}\'` 或 `expected \'{\'` ——编译器说它期待一个大括号但没找到。',
      code: 'int main() {\n  cout << "hello";\n  // 忘记写 }',
    },
    {
      type: 'multiple-choice',
      question: '看到 `expected \'}\' at end of input` 是什么意思？',
      options: [
        { text: '文件末尾少了一个右大括号', correct: true, explanation: '程序结束了但大括号没闭合，补上 } 就好了' },
        { text: '多了一个左大括号', correct: false, explanation: '少的是 } 不是多 {，当然多了 { 也可能导致类似问题' },
        { text: '输入结束符有问题', correct: false, explanation: '和输入没关系，是代码结构没闭合' },
        { text: '缺少分号', correct: false, explanation: '缺少分号是另一个错误 missing \';\'' },
      ],
    },
    {
      type: 'exposition',
      text: '常见错误第三名：**变量未声明**。\n`identifier "something" is undefined` 或 `\'x\' was not declared in this scope`。\n意思是你用了一个变量但在之前没有定义它。',
      code: 'int main() {\n  score = 100;  // score 没定义\n  cout << score;\n}',
    },
    {
      type: 'multiple-choice',
      question: '编译器报 `\'result\' was not declared in this scope`，最可能的原因是？',
      options: [
        { text: '变量 `result` 在使用前没有定义', correct: true, explanation: '要先 `int result;` 才能用，编译器找不到这个变量' },
        { text: '变量名拼写错了', correct: false, explanation: '如果拼写错了也属于"未声明"，但更常见的确实是忘了定义' },
        { text: '忘了加分号', correct: false, explanation: '缺分号报的是 missing \';\'，不是未声明' },
        { text: '作用域搞错了', correct: false, explanation: '也有可能是作用域问题，但最常见原因就是忘记定义了' },
      ],
    },
    {
      type: 'exposition',
      text: '常见错误第四名：**类型不匹配**。\n`cannot convert \'double\' to \'int\'` 或者 `invalid conversion`。\n你给了一个类型的值，但编译器期待另一个类型。\n\nC++ 对类型要求严格——`int x = 3.14;` 会警告数据丢失，\n`int x = "hello";` 直接报错。',
      code: 'int x = 3.14;  // double 赋值给 int，数据会丢失',
    },
    {
      type: 'multiple-choice',
      question: '`error: invalid conversion from \'double\' to \'int\'` 最可能的原因是？',
      options: [
        { text: '把一个浮点数赋值给了整数变量', correct: true, explanation: 'double 不能自动转成 int，编译器认为这可能导致数据丢失' },
        { text: '整数赋值给了浮点数变量', correct: false, explanation: 'int 可以自动转 double，不会报错' },
        { text: '两个整数相加', correct: false, explanation: 'int + int 结果是 int，没问题' },
        { text: '函数参数类型写错了', correct: false, explanation: '虽然也是类型不匹配，但最常见的还是赋值场景' },
      ],
    },
    {
      type: 'exposition',
      text: '**错误连锁**：一个错误可能引发十几个报错。\n比如忘记写 `using namespace std;`，\n所有 `cout`、`cin`、`endl` 都会报"未声明"——\n实际上罪魁祸首只有一个。',
    },
    {
      type: 'exposition',
      text: '遇到一堆错误怎么办？\n**只看第一个错误**。\n修复第一个，然后重新编译。很多后续错误会自动消失。\n因为编译器被第一个错误搞糊涂了，后面的报错可能都是误报。',
    },
    {
      type: 'multiple-choice',
      question: '编译器一口气报了 15 个错误，你应该先做什么？',
      options: [
        { text: '一个一个全部修完', correct: false, explanation: '很多错误是连锁反应，修完第一个剩下的可能自己消失' },
        { text: '只看第一个错误，修完重新编译', correct: true, explanation: '第一个错误最准确，修完它再编译，很可能后面全没了' },
        { text: '关掉编译器重新打开', correct: false, explanation: '重新打开不会修复代码' },
        { text: '直接重写整个程序', correct: false, explanation: '有点极端，你可能只需要修一个分号' },
      ],
    },
    {
      type: 'type-it',
      instruction: '敲一段有编译错误的代码，看看报错长什么样：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int x = 5\n  cout << "x 的值是：" << x << "\\n";\n}',
      hints: [
        '第 5 行结尾缺了一个分号',
        '编译器会报错在第 5 行或第 6 行',
        '加上分号后重新编译就通过了',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾上一课：以下哪种情况**不需要**调试，看编译错误就够了？',
      options: [
        { text: '程序运行结果比预期少了一半', correct: false, explanation: '这是逻辑错误，编译通过但结果不对，需要调试' },
        { text: '编译报错 error C2146: missing \';\'', correct: true, explanation: '编译错误直接看报错信息修就行，不需要进入调试模式' },
        { text: '程序运行时报"访问冲突"', correct: false, explanation: '这是运行时错误，可以用调试器定位' },
        { text: '函数返回了错误的值', correct: false, explanation: '这是逻辑错误，需要调试观察变量' },
      ],
    },
    {
      type: 'exposition',
      text: '总结：\n- 编译错误不可怕，编译器是你的检查员\n- 错误信息三要素：位置、类型、描述\n- 常见 4 种错误：缺分号、缺大括号、变量未声明、类型不匹配\n- 错误会连锁，**先修第一个**\n- 看不懂就搜索——几乎每一条编译错误都有人问过',
    },
    {
      type: 'exposition',
      text: '下一课我们学最简单的调试方法——用 `cout` 打印变量值来观察程序运行状态。',
    },
  ],
}

export default lesson
