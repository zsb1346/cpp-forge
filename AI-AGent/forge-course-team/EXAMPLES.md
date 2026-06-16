# Example Uses

## 1. Design a chapter arc

Prompt:

```txt
Use forge-course-team to design a beginner-safe chapter arc for introducing values, variable names, int, declaration, assignment, and semicolons.
```

Expected shape:
- chapter goal
- micro-lesson list
- rationale for ordering
- risks and reinforcement points

## 2. Audit a lesson topic for over-compression

Prompt:

```txt
Use forge-course-team to judge whether a lesson called “数据类型” is too broad for 0-base learners, then split it into safer micro-lessons.
```

Expected shape:
- critique
- beginner risk analysis
- replacement lesson list

## 3. Generate lesson code

Prompt:

```txt
Use forge-course-team to generate a full src/courses lesson for “什么是 bool”. Keep it very beginner-safe and bias toward concept-cards, copying, and single-choice checks.
```

Expected shape:
- short design rationale
- complete TypeScript lesson file

## 4. Review an existing lesson file

Prompt:

```txt
Use forge-course-team to review src/courses/02-data-types.ts for zero-base safety, pacing, block fit, and hidden assumptions. Then propose a rewrite plan.
```

Expected shape:
- findings grouped by pedagogy concern
- what to split
- what to reorder
- what to rewrite

## 5. Build at scale

Prompt:

```txt
Use forge-course-team to design the next 40 micro-lessons after variables, keeping the transition into bool, strings, comparisons, and if-statements smooth for absolute beginners.
```

Expected shape:
- grouped chapter plan
- lesson slugs and titles
- prerequisites
- lesson purpose
- recommended block emphasis
