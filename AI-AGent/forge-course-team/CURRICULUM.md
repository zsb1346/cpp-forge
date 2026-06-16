# Curriculum Architecture Guide

## Goal

Design a curriculum that can scale to hundreds or thousands of lessons without losing beginner safety.

## 1. Think in layers

Always design in this hierarchy:
1. Learning journey vision
2. Chapter clusters
3. Micro-lessons
4. Block checkpoints inside each lesson

Do not jump straight from topic name to lesson code when designing a large curriculum.

## 2. Curriculum responsibilities

A top curriculum team must control:
- concept order
- pacing
- prerequisite clarity
- review spacing
- difficulty spikes
- recurring misconceptions
- when a concept is introduced vs merely practiced

## 3. Chapter design rules

Each chapter should have:
- one dominant learning purpose
- a narrow concept family
- a controlled number of new syntax forms
- explicit entrance assumptions
- explicit exit capabilities

Examples:
- Chapter: “变量与值”
  - entrance: none
  - exit: can read and write basic variable declarations and assignments
- Chapter: “真假与判断”
  - entrance: can read variables and literal values
  - exit: can understand bool, comparisons, and basic `if`

## 4. Micro-lesson splitting rules

Split a chapter into micro-lessons whenever any of these change:
- the symbol set changes
- the mental model changes
- the error source changes
- the learner task changes from copy to reasoning to recall
- a new abstraction appears

Examples of valid micro-lessons inside a variable chapter:
- 什么是值
- 什么是名字
- `int` 只表示“整数盒子”
- 声明变量
- 给变量赋值
- 再次赋值
- 读懂 `int score = 0;`
- 常见错误：忘记分号

## 5. Difficulty staircase

A safe staircase for beginners:
- Stage A: recognize parts
- Stage B: copy exact patterns
- Stage C: distinguish valid/invalid code
- Stage D: fill tiny gaps
- Stage E: combine familiar parts
- Stage F: produce short answers in new surface forms
- Stage G: run code and connect output to cause

If a chapter jumps two stages at once, insert bridging lessons.

## 6. Review strategy

Use local review, not only end-of-unit review.

Recommended pattern:
- introduce
- imitate
- check
- reinforce in next lesson
- revisit after 3-5 lessons in slightly changed form

Do not assume one successful lesson means the concept is stable.

## 7. Lesson count philosophy

For this project, more smaller lessons is often better than fewer large lessons.

Working assumptions:
- one “normal textbook subtopic” may equal 3-10 Forge lessons
- early chapters should be especially granular
- if a concept feels “obvious” to a programmer, it may still deserve its own lesson

## 8. Output format for curriculum tasks

When asked to design curriculum, return this structure:

### A. Learner promise
- who this arc is for
- what they will be able to do at the end

### B. Chapter map
For each chapter:
- chapter name
- purpose
- prerequisites
- exit skills
- danger points

### C. Lesson map
For each lesson:
- id slug proposal
- title
- one-sentence purpose
- new idea count
- recommended block emphasis
- prerequisite lesson(s)

### D. Risk analysis
- where learners may hit a wall
- where to insert reinforcement lessons
- where not to use code-runner yet

## 9. Red flags in large curriculum planning

Bad signs:
- chapter names that are too broad
- lessons named after broad textbook headings only
- too many syntax forms in the same chapter
- introducing execution before syntax reading is stable
- using fill-in before copying is fluent
- treating “data types” as one lesson for true beginners

## 10. Top-tier standard

A top-tier curriculum makes progress feel smooth because the hidden design work is excellent.
The learner should feel:
- “I can follow this.”
- “I know what this lesson is about.”
- “This is hard, but not chaotic.”
- “The next step makes sense.”
