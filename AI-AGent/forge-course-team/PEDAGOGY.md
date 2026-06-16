# Pedagogy Guide

## 1. Learner model

Assume the learner:
- is truly 0-base
- does not know what code is made of
- does not parse symbols fluently
- will confuse names, values, types, punctuation, and operations
- can easily imitate before they can explain
- feels smart when they succeed early and lost when abstraction arrives too fast

Design for the learner's real internal questions:
- 这是什么？
- 这玩意是干嘛的？
- 为什么这里要写这个符号？
- 我是记名字，还是记规则？
- 这一行里每一部分分别是什么意思？
- 为什么这样写对，那样写错？

Never design for the fantasy learner who can absorb a whole textbook paragraph in one pass.

## 2. Teaching progression

Use this sequence by default:
1. Recognition — “见过、认得出来”
2. Meaning — “知道它大概是干嘛的”
3. Imitation — “能照着打出来”
4. Discrimination — “能分辨哪个对、哪个错”
5. Guided recall — “给一点框架能补出来”
6. Independent production — “能自己写出简短答案”
7. Transfer — “换个语境还能用”

Map these stages to Forge blocks:
- Recognition/meaning: `exposition`, `concept-cards`
- Imitation: `type-it`
- Discrimination: `multiple-choice`, light `match-blocks`
- Guided recall: `fill-in`
- Early production: `match-blocks`, short `fill-in`, simple `type-it` from prompt only
- Transfer/verification: later `code-runner`

## 3. Early-stage block policy

For early beginner content, heavily prefer:
- exposition
- concept-cards
- type-it
- single-choice multiple-choice

Use carefully:
- match-blocks when order itself is the concept
- fill-in only after the learner has seen the pattern multiple times
- multi-select only when the distinction is already stable

Use late and intentionally:
- code-runner, because execution adds cognitive load: editing, syntax, output, debugging, and causal reasoning all at once

## 4. Granularity rules

Split topics smaller than standard curriculum usually does.

Examples of good splitting:
- “变量” ≠ one lesson; may become:
  - 什么是“值”
  - 什么是“变量名”
  - `int` 是什么
  - 声明 vs 赋值
  - `=` 不是数学等于
  - 分号为什么存在
- “条件” ≠ one lesson; may become:
  - `bool` 是什么
  - 真与假如何表示
  - 比较会产生布尔值
  - `if` 的读法
  - `if` 的花括号
  - else 的含义

Heuristic:
- If one lesson introduces more than one new symbol family, split.
- If one lesson needs more than 3 brand-new terms, split.
- If a wrong answer could come from 2+ different confusions, split earlier.

## 5. Checkpoint philosophy

The user wants many checkpoints. Honor that.

Aim for lesson experiences made of many tiny wins:
- 1 concept explanation
- 1 concept card set
- 2-4 copying reps
- 2-4 recognition questions
- 1-2 order questions
- 1-3 fill-ins later in the lesson

A long lesson should feel like 20 small steps, not 1 lecture plus 3 exercises.

## 6. Language style

Write in Simplified Chinese that is:
- concrete
- direct
- emotionally steady
- respectful, never patronizing
- low-jargon
- low-compression

Good style:
- “这不是数学里的等于。这里的 `=` 更像‘把右边的值放进左边的盒子里’。”
- “先别急着记规则。先把这一行看熟。”
- “你现在只需要认出它，不需要一下子全会。”

Avoid:
- textbook abstraction
- compressed definitions with stacked terminology
- “顾名思义”“显然”“我们知道”
- long paragraphs with multiple new ideas

## 7. Misconception-first design

Every lesson should explicitly defend against likely misconceptions.

Examples:
- `=` is not mathematical equality
- `int` is not the variable name
- `"hello"` is not the same kind of thing as `hello`
- `true/false` are values, not comments about correctness
- `if` does not “repeat”; `for`/`while` do
- `==` asks a question; `=` performs assignment

When possible, convert misconceptions into exercises early.

## 8. Difficulty gating

Before moving to the next lesson, ask:
- Has the learner seen the pattern enough times?
- Can they tell right from wrong quickly?
- Can they complete partial code without panic?
- Is failure likely due to one concept, not five?

If not, add another small lesson before advancing.

## 9. What top-tier quality means here

Top-tier does not mean “dense” or “smart-sounding”. It means:
- fewer hidden leaps
- tighter sequencing
- cleaner examples
- safer pacing
- better anticipation of confusion
- stronger emotional ergonomics for beginners

The teaching should feel patient, inevitable, and hard to misunderstand.
