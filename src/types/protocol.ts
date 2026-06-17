/* ============================
   C++ Adventure - 内容协议 (Barrel)
   重新导出所有类型，保持向后兼容
   ============================ */

// 共享基础类型
export type {
  Subject,
  ContentKind,
  CognitiveStage,
  KnowledgePointRef,
  MisconceptionRef,
} from './shared'
export type {
  Subject as Subject_2,
} from './shared'

// 课程体系
export type {
  Chapter,
  LessonMeta,
  Lesson,
  LessonReward,
} from './curriculum'

// 教学呈现
export type {
  TeachingMeta,
  TeachingAnimationPreset,
  TeachingAnimationStep,
  TeachingAnimationSpec,
  TeachingLayoutSpec,
  BaseTeachingBlock,
} from './teaching'

// 所有 Block 类型
export type {
  BlockType,
  OutputComparison,
  ExpositionBlock,
  ConceptCardsBlock,
  TypeItBlock,
  MultipleChoiceBlock,
  MatchBlocksBlock,
  FillInBlock,
  CodeRunnerBlock,
  PredictOutputBlock,
  TraceStateBlock,
  FixCodeBlock,
  ChooseNextLineBlock,
  CompareSnippetsBlock,
  SceneBlock,
  SceneStep,
  MemoryBox,
  MemoryVisualizerBlock,
  MemoryStep,
  StackVar,
  HeapVar,
  FlowVisualizerBlock,
  FlowStep,
  ScrollNarrativeBlock,
  NarrativeSection,
  Block,
} from './blocks'

// 用户进度
export type {
  UserProgress,
  LessonCompletion,
  NodeStatus,
} from './progress'
