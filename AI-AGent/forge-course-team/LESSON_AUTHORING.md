# Lesson Authoring Guide

## 1. Project contract

Lessons in this project are plain TypeScript data objects shaped like:

```ts
import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'example-id',
    chapter: 1,
    title: '标题',
    subtitle: '副标题',
    description: '一句话描述',
    objectives: ['目标1', '目标2'],
    estimatedMinutes: 8,
  },
  blocks: [
    // block objects
  ],
}

export default lesson
```

Match `src/types/protocol.ts` and the style of `src/courses/*.ts`.

## 2. Available block types

### exposition
Use for one idea at a time.
Fields:
- `text`
- optional `code`
- optional `language`
- optional `textAnimation`

Notes from the UI:
- supports inline backticks in text
- can show optional code
- is passive and can advance after reading

### concept-cards
Use to establish vocabulary and parts.
Fields:
- `instruction`
- `cards[]` with `term`, `meaning`, optional `example`, optional `glyph`

Notes from the UI:
- learner clicks each card to reveal it
- all cards seen marks the block complete
- best for 2-4 tightly related concepts

### type-it
Use for copying exact patterns and building syntax familiarity.
Fields:
- `instruction`
- `code`
- `hints`
- optional `exactMatch`

Notes from the UI:
- supports code completion from target tokens
- gives character-level correctness feedback
- very suitable for early learning because copying is low-friction here

### multiple-choice
Use for distinguishing right/wrong meaning or syntax.
Fields:
- `question`
- `options[]` with `text`, `correct`, optional `explanation`
- optional `mode`

Notes from the UI:
- default is single-choice
- explanations matter; write useful ones
- ideal for misconception checks

### match-blocks
Use when order itself is the idea.
Fields:
- `instruction`
- `fragments`
- optional `distractors`

Notes from the UI:
- fragments are shuffled automatically
- best for syntax sequence or part ordering
- do not use when the learner still does not know the parts

### fill-in
Use for guided recall after enough exposure.
Fields:
- `prompt`
- `template`
- `answers`
- optional `hints`

Notes from the UI:
- blanks are marked with `____`
- use only after the learner has copied and recognized the pattern several times

### code-runner
Use for later validation and causal understanding.
Fields:
- `instruction`
- `code`
- optional `language`
- optional `expectedOutput`
- optional `comparison`
- optional `editable`
- optional `flags`

Notes from the UI:
- compiles/runs in browser
- can auto-complete when output matches expectation
- adds heavy cognitive load; use sparingly for beginners

## 3. Recommended lesson skeletons

### Early beginner lesson
- exposition
- concept-cards
- type-it
- multiple-choice
- type-it
- match-blocks or multiple-choice
- fill-in only if the pattern has become familiar

### Disambiguation lesson
- exposition
- concept-cards
- multiple-choice x2-4
- type-it
- fill-in

### Pattern reinforcement lesson
- short exposition
- type-it x2-3
- multiple-choice x2
- fill-in x1-2

## 4. Block-writing rules

For every block:
- know the exact learner question it answers
- know the exact confusion it prevents
- keep the task narrow
- avoid decorative complexity

## 5. Output rules for generated lesson files

When generating lesson code:
- write valid TypeScript
- include `import type { Lesson } from '../types/protocol'`
- export default the lesson
- make `meta.id` unique and slug-like
- keep `title` short
- keep `subtitle` clear and concrete
- keep `objectives` teachable, not vague
- keep `estimatedMinutes` realistic

## 6. Difficulty control inside one lesson

Inside a single lesson, do not move too fast through these stages:
- see it
- read it
- copy it
- distinguish it
- recall it

If the lesson is doing too many of these at once, split the lesson.

## 7. Author self-check before finalizing lesson code

Ask:
- what exactly is new here?
- what prior knowledge am I assuming?
- did I accidentally introduce a second lesson's worth of concepts?
- are the hints actually helpful to a frightened beginner?
- are wrong options plausible in the way beginners are plausibly wrong?
- did I ask for recall before enough imitation?
