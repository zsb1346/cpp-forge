import type { Subject } from '../types/protocol'

export interface KnowledgeSystem {
  /** Stable subject id used by lesson metadata and filters. */
  id: Subject;
  /** Human-facing name in navigation. */
  label: string;
  /** Short author-facing description. */
  description: string;
  /** Optional display accent. Keep values semantic; UI maps them to classes. */
  accent?: 'ember' | 'sage' | 'gold' | 'ink';
  /**
   * Author-managed course membership.
   * Use this when a subject is assembled from existing lesson ids without editing lesson files.
   */
  courseIds?: string[];
  /** Treat untagged lessons as belonging to this system. Only one system should set this. */
  defaultForUntagged?: boolean;
}

export const knowledgeSystems: KnowledgeSystem[] = [
  {
    id: 'cpp',
    label: 'C++',
    description: '当前主线课程：从 0 基础到现代 C++。',
    accent: 'ember',
    defaultForUntagged: true,
  },
  {
    id: 'c',
    label: 'C',
    description: '为 C 语言路线预留。作者可在这里登记 courseIds。',
    accent: 'ink',
    courseIds: [],
  },
  {
    id: 'dsa',
    label: '数据结构与算法',
    description: '为算法与数据结构体系预留。',
    accent: 'sage',
    courseIds: [],
  },
  {
    id: 'unreal-cpp',
    label: 'Unreal C++',
    description: '为 Unreal 工程化 C++ 体系预留。',
    accent: 'gold',
    courseIds: [],
  },
  {
    id: 'sql',
    label: 'SQL 数据库',
    description: '数据库技术与应用——从核心理论到 SQL 实操，覆盖关系数据库、MySQL、ACID、视图索引。',
    accent: 'sage',
    courseIds: [
      'db-core-concepts',
      'db-core-practice',
      'db-er-practice',
      'db-data-types',
      'db-data-types-practice',
      'db-constraints',
      'db-constraints-practice',
      'db-ch1-review',
      'db-transaction-acid',
      'db-acid-practice',
      'db-views',
      'db-indexes',
      'db-views-indexes-practice',
      'db-ch2-review',
      'db-ddl',
      'db-ddl-practice',
      'db-dml',
      'db-dml-practice',
      'db-basic-query',
      'db-basic-query-practice',
      'db-aggregate-groupby',
      'db-join-subquery',
      'db-advanced-query-practice',
      'db-er-to-schema',
      'db-comprehensive-sql',
    ],
  },
]

export const defaultKnowledgeSystemId: Subject =
  knowledgeSystems.find(system => system.defaultForUntagged)?.id ?? knowledgeSystems[0]?.id ?? 'cpp'

export function getKnowledgeSystem(subject: Subject): KnowledgeSystem | undefined {
  return knowledgeSystems.find(system => String(system.id) === String(subject))
}

export function getSubjectForCourseId(courseId: string): Subject | null {
  const explicit = knowledgeSystems.find(system => system.courseIds?.includes(courseId))
  return explicit?.id ?? null
}
