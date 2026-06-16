import type { Chapter, Lesson } from '../types/protocol'

import p00l01 from './p00-l01-what-is-program'
import p00l02 from './p00-l02-code-is-text'
import p00l03 from './p00-l03-symbols-you-see'
import p00l04 from './p00-l04-first-program-glance'
import p00l05 from './p00-l05-practice-1'

import p01l01 from './p01-l01-what-is-value'
import p01l02 from './p01-l02-what-is-name'
import p01l03 from './p01-l03-int-type'
import p01l04 from './p01-l04-double-type'
import p01l05 from './p01-l05-char-type'
import p01l06 from './p01-l06-bool-type'
import p01l07 from './p01-l07-practice-types'
import p01l08 from './p01-l08-declare-variable'
import p01l09 from './p01-l09-assign-value'
import p01l10 from './p01-l10-equals-is-assign'
import p01l11 from './p01-l11-semicolon-rule'
import p01l12 from './p01-l12-declare-and-init'
import p01l13 from './p01-l13-practice-var-declare'
import p01l14 from './p01-l14-type-mismatch'
import p01l15 from './p01-l15-phase1-review'

import p02l01 from './p02-l01-arithmetic-plus-minus'
import p02l02 from './p02-l02-multiply-divide-mod'
import p02l03 from './p02-l03-integer-division-trap'
import p02l04 from './p02-l04-operator-precedence'
import p02l05 from './p02-l05-practice-arithmetic'
import p02l06 from './p02-l06-cout-basics'
import p02l07 from './p02-l07-cout-multiple'
import p02l08 from './p02-l08-cin-basics'
import p02l09 from './p02-l09-cin-cout-combo'
import p02l10 from './p02-l10-practice-io'
import p02l11 from './p02-l11-comparison-six'
import p02l12 from './p02-l12-comparison-result'
import p02l13 from './p02-l13-if-intro'
import p02l14 from './p02-l14-if-braces'
import p02l15 from './p02-l15-if-else'
import p02l16 from './p02-l16-equals-vs-assign'
import p02l17 from './p02-l17-practice-conditions'
import p02l18 from './p02-l18-practice-comprehensive'
import p02l19 from './p02-l19-practice-all-p2'
import p02l20 from './p02-l20-phase2-review'

import p03l01 from './p03-l01-why-loops'
import p03l02 from './p03-l02-while-basics'
import p03l03 from './p03-l03-while-counter'
import p03l04 from './p03-l04-infinite-loop'
import p03l05 from './p03-l05-for-basics'
import p03l06 from './p03-l06-for-vs-while'
import p03l07 from './p03-l07-do-while'
import p03l08 from './p03-l08-practice-loops'
import p03l09 from './p03-l09-array-concept'
import p03l10 from './p03-l10-array-index'
import p03l11 from './p03-l11-loop-and-array'
import p03l12 from './p03-l12-practice-loops-arrays'

import p04l01 from './p04-l01-string-init'
import p04l02 from './p04-l02-string-concat'
import p04l03 from './p04-l03-string-index-size'
import p04l04 from './p04-l04-string-input'
import p04l05 from './p04-l05-practice-string'
import p04l06 from './p04-l06-why-functions'
import p04l07 from './p04-l07-function-definition'
import p04l08 from './p04-l08-function-call'
import p04l09 from './p04-l09-function-return'
import p04l10 from './p04-l10-void-function'
import p04l11 from './p04-l11-function-parameters'
import p04l12 from './p04-l12-multiple-parameters'
import p04l13 from './p04-l13-practice-functions'
import p04l14 from './p04-l14-what-is-scope'
import p04l15 from './p04-l15-local-vs-global'
import p04l16 from './p04-l16-scope-nesting'
import p04l17 from './p04-l17-practice-scope'

import p05l01 from './p05-l01-pointer-motivation'
import p05l02 from './p05-l02-address-of-operator'
import p05l03 from './p05-l03-pointer-variable'
import p05l04 from './p05-l04-dereference-operator'
import p05l05 from './p05-l05-star-two-meanings'
import p05l06 from './p05-l06-nullptr'
import p05l07 from './p05-l07-reference-intro'
import p05l08 from './p05-l08-ref-vs-ptr'
import p05l09 from './p05-l09-pass-by-value'
import p05l10 from './p05-l10-pass-by-reference'
import p05l11 from './p05-l11-function-overload'
import p05l12 from './p05-l12-default-arguments'
import p05l13 from './p05-l13-practice-ptr-ref'
import p05l14 from './p05-l14-separate-compilation'
import p05l15 from './p05-l15-practice-organization'

import p06l01 from './p06-l01-what-is-debugging'
import p06l02 from './p06-l02-reading-errors'
import p06l03 from './p06-l03-print-debugging'
import p06l04 from './p06-l04-breakpoint-concept'
import p06l05 from './p06-l05-step-over-into'
import p06l06 from './p06-l06-watch-variables'
import p06l07 from './p06-l07-practice-debugging'

import p07l01 from './p07-l01-why-class'
import p07l02 from './p07-l02-define-class'
import p07l03 from './p07-l03-create-object'
import p07l04 from './p07-l04-member-access'
import p07l05 from './p07-l05-public-vs-private'
import p07l06 from './p07-l06-member-functions'
import p07l07 from './p07-l07-practice-class'
import p07l08 from './p07-l08-struct-vs-class'
import p07l09 from './p07-l09-constructor-intro'
import p07l10 from './p07-l10-constructor-overload'
import p07l11 from './p07-l11-init-list'
import p07l12 from './p07-l12-init-order'
import p07l13 from './p07-l13-destructor-intro'
import p07l14 from './p07-l14-practice-ctor-dtor'
import p07l15 from './p07-l15-this-pointer'
import p07l16 from './p07-l16-static-members'
import p07l17 from './p07-l17-const-member-func'
import p07l18 from './p07-l18-class-separation'
import p07l19 from './p07-l19-practice-oop-fund'
import p07l20 from './p07-l20-phase7-review'

import p08l01 from './p08-l01-why-inheritance'
import p08l02 from './p08-l02-inheritance-basics'
import p08l03 from './p08-l03-protected-access'
import p08l04 from './p08-l04-inheritance-modes'
import p08l05 from './p08-l05-construction-chain'
import p08l06 from './p08-l06-practice-inheritance'
import p08l07 from './p08-l07-why-polymorphism'
import p08l08 from './p08-l08-virtual-function'
import p08l09 from './p08-l09-override-specifier'
import p08l10 from './p08-l10-polymorphism-in-action'
import p08l11 from './p08-l11-virtual-destructor'
import p08l12 from './p08-l12-abstract-class'
import p08l13 from './p08-l13-interface-design'
import p08l14 from './p08-l14-practice-polymorphism'
import p08l15 from './p08-l15-object-slicing'
import p08l16 from './p08-l16-diamond-problem'
import p08l17 from './p08-l17-phase8-review'

import p09l01 from './p09-l01-const-value'
import p09l02 from './p09-l02-const-ptr'
import p09l03 from './p09-l03-const-ref'
import p09l04 from './p09-l04-const-methods'
import p09l05 from './p09-l05-const-overload'
import p09l06 from './p09-l06-practice-const'
import p09l07 from './p09-l07-static-local'
import p09l08 from './p09-l08-static-in-class-review'
import p09l09 from './p09-l09-friend-function'
import p09l10 from './p09-l10-friend-class'
import p09l11 from './p09-l11-why-operator-overload'
import p09l12 from './p09-l12-op-overload-syntax'
import p09l13 from './p09-l13-overload-arithmetic'
import p09l14 from './p09-l14-overload-stream'
import p09l15 from './p09-l15-overload-rules'
import p09l16 from './p09-l16-practice-op-overload'
import p09l17 from './p09-l17-phase9-review'

import p10l01 from './p10-l01-stack-vs-heap'
import p10l02 from './p10-l02-new-delete'
import p10l03 from './p10-l03-new-array-delete-array'
import p10l04 from './p10-l04-memory-leak'
import p10l05 from './p10-l05-dangling-pointer'
import p10l06 from './p10-l06-double-delete'
import p10l07 from './p10-l07-practice-dynamic-mem'
import p10l08 from './p10-l08-deep-vs-shallow'
import p10l09 from './p10-l09-copy-constructor'
import p10l10 from './p10-l10-copy-assignment'
import p10l11 from './p10-l11-rule-of-three'
import p10l12 from './p10-l12-practice-copy'
import p10l13 from './p10-l13-raii-concept'
import p10l14 from './p10-l14-raii-in-action'
import p10l15 from './p10-l15-raii-beyond-memory'
import p10l16 from './p10-l16-practice-raii'
import p10l17 from './p10-l17-move-motivation'
import p10l18 from './p10-l18-rvalue-reference'
import p10l19 from './p10-l19-move-constructor'
import p10l20 from './p10-l20-phase10-review'

import p11l01 from './p11-l01-lvalue-vs-rvalue'
import p11l02 from './p11-l02-std-move'
import p11l03 from './p11-l03-move-assignment'
import p11l04 from './p11-l04-rule-of-five'
import p11l05 from './p11-l05-practice-move'
import p11l06 from './p11-l06-perfect-forwarding-motivation'
import p11l07 from './p11-l07-forwarding-reference'
import p11l08 from './p11-l08-std-forward'
import p11l09 from './p11-l09-reference-collapsing'
import p11l10 from './p11-l10-practice-forwarding'

import p12l01 from './p12-l01-why-template'
import p12l02 from './p12-l02-function-template'
import p12l03 from './p12-l03-template-instantiation'
import p12l04 from './p12-l04-template-type-deduction'
import p12l05 from './p12-l05-class-template'
import p12l06 from './p12-l06-template-member-func'
import p12l07 from './p12-l07-practice-template-basics'
import p12l08 from './p12-l08-multi-template-params'
import p12l09 from './p12-l09-non-type-template-params'
import p12l10 from './p12-l10-template-specialization'
import p12l11 from './p12-l11-partial-specialization'
import p12l12 from './p12-l12-practice-template-advanced'
import p12l13 from './p12-l13-typename-vs-class'
import p12l14 from './p12-l14-template-compilation-model'
import p12l15 from './p12-l15-phase12-review'

import p13l01 from './p13-l01-what-is-stl'
import p13l02 from './p13-l02-vector-intro'
import p13l03 from './p13-l03-vector-operations'
import p13l04 from './p13-l04-vector-capacity'
import p13l05 from './p13-l05-list-intro'
import p13l06 from './p13-l06-deque-intro'
import p13l07 from './p13-l07-container-choose'
import p13l08 from './p13-l08-practice-seq-containers'
import p13l09 from './p13-l09-stack-queue'
import p13l10 from './p13-l10-priority-queue'
import p13l11 from './p13-l11-set-intro'
import p13l12 from './p13-l12-map-intro'
import p13l13 from './p13-l13-unordered-set-map'
import p13l14 from './p13-l14-set-vs-unordered'
import p13l15 from './p13-l15-practice-assoc-containers'
import p13l16 from './p13-l16-container-summary'
import p13l17 from './p13-l17-phase13-review'

import p14l01 from './p14-l01-what-is-iterator'
import p14l02 from './p14-l02-iterator-categories'
import p14l03 from './p14-l03-why-algorithms'
import p14l04 from './p14-l04-sort'
import p14l05 from './p14-l05-find'
import p14l06 from './p14-l06-count'
import p14l07 from './p14-l07-practice-find-sort'
import p14l08 from './p14-l08-lambda-intro'
import p14l09 from './p14-l09-lambda-capture'
import p14l10 from './p14-l10-for-each'
import p14l11 from './p14-l11-transform'
import p14l12 from './p14-l12-copy-remove_if'
import p14l13 from './p14-l13-algorithm-pipeline'
import p14l14 from './p14-l14-practice-algorithms'
import p14l15 from './p14-l15-phase14-review'

import p15l01 from './p15-l01-auto-keyword'
import p15l02 from './p15-l02-decltype'
import p15l03 from './p15-l03-range-for'
import p15l04 from './p15-l04-structured-binding'
import p15l05 from './p15-l05-constexpr'
import p15l06 from './p15-l06-static-assert'
import p15l07 from './p15-l07-practice-modern-features'
import p15l08 from './p15-l08-nullptr-modern'
import p15l09 from './p15-l09-optional'
import p15l10 from './p15-l10-variant'
import p15l11 from './p15-l11-any'
import p15l12 from './p15-l12-phase15-review'

import p16l01 from './p16-l01-compilation-steps'
import p16l02 from './p16-l02-preprocessor'
import p16l03 from './p16-l03-header-guards'
import p16l04 from './p16-l04-how-include-works'
import p16l05 from './p16-l05-decl-vs-defn'
import p16l06 from './p16-l06-one-definition-rule'
import p16l07 from './p16-l07-translation-unit'
import p16l08 from './p16-l08-practice-compilation'
import p16l09 from './p16-l09-linking-errors'
import p16l10 from './p16-l10-memory-layout'
import p16l11 from './p16-l11-stack-deep'
import p16l12 from './p16-l12-heap-deep'
import p16l13 from './p16-l13-struct-padding'
import p16l14 from './p16-l14-practice-memory-layout'
import p16l15 from './p16-l15-bitwise-operators'
import p16l16 from './p16-l16-bit-fields'
import p16l17 from './p16-l17-phase16-review'

import p17l01 from './p17-l01-unique-ptr-motivation'
import p17l02 from './p17-l02-unique-ptr-basics'
import p17l03 from './p17-l03-unique-ptr-transfer'
import p17l04 from './p17-l04-unique-ptr-container'
import p17l05 from './p17-l05-shared-ptr-intro'
import p17l06 from './p17-l06-weak-ptr'
import p17l07 from './p17-l07-make-shared'
import p17l08 from './p17-l08-smart-ptr-choose'
import p17l09 from './p17-l09-practice-smart-ptr'
import p17l10 from './p17-l10-static-cast'
import p17l11 from './p17-l11-dynamic-cast'
import p17l12 from './p17-l12-const-cast-reinterpret'
import p17l13 from './p17-l13-c-style-cast-problem'
import p17l14 from './p17-l14-practice-casting'
import p17l15 from './p17-l15-phase17-review'

import p18l01 from './p18-l01-why-concurrency'
import p18l02 from './p18-l02-thread-basics'
import p18l03 from './p18-l03-thread-detach'
import p18l04 from './p18-l04-data-race'
import p18l05 from './p18-l05-mutex-intro'
import p18l06 from './p18-l06-lock-guard'
import p18l07 from './p18-l07-unique-lock'
import p18l08 from './p18-l08-practice-mutex'
import p18l09 from './p18-l09-deadlock'
import p18l10 from './p18-l10-deadlock-avoidance'
import p18l11 from './p18-l11-condition-variable'
import p18l12 from './p18-l12-async-future'
import p18l13 from './p18-l13-atomic-intro'
import p18l14 from './p18-l14-practice-concurrency'
import p18l15 from './p18-l15-phase18-review'

import p19l01 from './p19-l01-singleton-pattern'
import p19l02 from './p19-l02-singleton-thread-safe'
import p19l03 from './p19-l03-factory-pattern'
import p19l04 from './p19-l04-observer-pattern'
import p19l05 from './p19-l05-practice-patterns'
import p19l06 from './p19-l06-pimpl-idiom'
import p19l07 from './p19-l07-crtp'
import p19l08 from './p19-l08-practice-idioms'
import p19l09 from './p19-l09-sfinae-concept'
import p19l10 from './p19-l10-enable-if'
import p19l11 from './p19-l11-concepts-cpp20'
import p19l12 from './p19-l12-cmake-basics'
import p19l13 from './p19-l13-cmake-targets'
import p19l14 from './p19-l14-why-testing'
import p19l15 from './p19-l15-gtest-basics'
import p19l16 from './p19-l16-test-organization'
import p19l17 from './p19-l17-phase19-review'

import p20l01 from './p20-l01-adl'
import p20l02 from './p20-l02-rvo-nrvo'
import p20l03 from './p20-l03-copy-elision-cpp17'
import p20l04 from './p20-l04-type-erasure'
import p20l05 from './p20-l05-function-implementation'
import p20l06 from './p20-l06-any-implementation'
import p20l07 from './p20-l07-practice-type-erasure'
import p20l08 from './p20-l08-variadic-templates'
import p20l09 from './p20-l09-fold-expressions'
import p20l10 from './p20-l10-practice-variadic'
import p20l11 from './p20-l11-memory-order-intro'
import p20l12 from './p20-l12-memory-order-modes'
import p20l13 from './p20-l13-rtti-cost'
import p20l14 from './p20-l14-practice-advanced-concepts'
import p20l15 from './p20-l15-undefined-behavior'
import p20l16 from './p20-l16-ub-not-error'
import p20l17 from './p20-l17-zero-overhead'
import p20l18 from './p20-l18-you-pay-only'
import p20l19 from './p20-l19-cpp-philosophy-review'
import p20l20 from './p20-l20-final-reflection'

export const courses: Lesson[] = [
  p00l01, p00l02, p00l03, p00l04, p00l05,
  p01l01, p01l02, p01l03, p01l04, p01l05,
  p01l06, p01l07, p01l08, p01l09, p01l10,
  p01l11, p01l12, p01l13, p01l14, p01l15,
  p02l01, p02l02, p02l03, p02l04, p02l05,
  p02l06, p02l07, p02l08, p02l09, p02l10,
  p02l11, p02l12, p02l13, p02l14, p02l15,
  p02l16, p02l17, p02l18, p02l19, p02l20,
  p03l01, p03l02, p03l03, p03l04, p03l05,
  p03l06, p03l07, p03l08, p03l09, p03l10,
  p03l11, p03l12,
  p04l01, p04l02, p04l03, p04l04, p04l05,
  p04l06, p04l07, p04l08, p04l09, p04l10,
  p04l11, p04l12, p04l13, p04l14, p04l15,
  p04l16, p04l17,
  p05l01, p05l02, p05l03, p05l04, p05l05,
  p05l06, p05l07, p05l08, p05l09, p05l10,
  p05l11, p05l12, p05l13, p05l14, p05l15,
  p06l01, p06l02, p06l03, p06l04, p06l05,
  p06l06, p06l07,
  p07l01, p07l02, p07l03, p07l04, p07l05,
  p07l06, p07l07, p07l08, p07l09, p07l10,
  p07l11, p07l12, p07l13, p07l14, p07l15,
  p07l16, p07l17, p07l18, p07l19, p07l20,
  p08l01, p08l02, p08l03, p08l04, p08l05,
  p08l06, p08l07, p08l08, p08l09, p08l10,
  p08l11, p08l12, p08l13, p08l14, p08l15,
  p08l16, p08l17,
  p09l01, p09l02, p09l03, p09l04, p09l05,
  p09l06, p09l07, p09l08, p09l09, p09l10,
  p09l11, p09l12, p09l13, p09l14, p09l15,
  p09l16, p09l17,
  p10l01, p10l02, p10l03, p10l04, p10l05,
  p10l06, p10l07, p10l08, p10l09, p10l10,
  p10l11, p10l12, p10l13, p10l14, p10l15,
  p10l16, p10l17, p10l18, p10l19, p10l20,
  p11l01, p11l02, p11l03, p11l04, p11l05,
  p11l06, p11l07, p11l08, p11l09, p11l10,
  p12l01, p12l02, p12l03, p12l04, p12l05,
  p12l06, p12l07, p12l08, p12l09, p12l10,
  p12l11, p12l12, p12l13, p12l14, p12l15,
  p13l01, p13l02, p13l03, p13l04, p13l05,
  p13l06, p13l07, p13l08, p13l09, p13l10,
  p13l11, p13l12, p13l13, p13l14, p13l15,
  p13l16, p13l17,
  p14l01, p14l02, p14l03, p14l04, p14l05,
  p14l06, p14l07, p14l08, p14l09, p14l10,
  p14l11, p14l12, p14l13, p14l14, p14l15,
  p15l01, p15l02, p15l03, p15l04, p15l05,
  p15l06, p15l07, p15l08, p15l09, p15l10,
  p15l11, p15l12,
  p16l01, p16l02, p16l03, p16l04, p16l05,
  p16l06, p16l07, p16l08, p16l09, p16l10,
  p16l11, p16l12, p16l13, p16l14, p16l15,
  p16l16, p16l17,
  p17l01, p17l02, p17l03, p17l04, p17l05,
  p17l06, p17l07, p17l08, p17l09, p17l10,
  p17l11, p17l12, p17l13, p17l14, p17l15,
  p18l01, p18l02, p18l03, p18l04, p18l05,
  p18l06, p18l07, p18l08, p18l09, p18l10,
  p18l11, p18l12, p18l13, p18l14, p18l15,
  p19l01, p19l02, p19l03, p19l04, p19l05,
  p19l06, p19l07, p19l08, p19l09, p19l10,
  p19l11, p19l12, p19l13, p19l14, p19l15,
  p19l16, p19l17,
  p20l01, p20l02, p20l03, p20l04, p20l05,
  p20l06, p20l07, p20l08, p20l09, p20l10,
  p20l11, p20l12, p20l13, p20l14, p20l15,
  p20l16, p20l17, p20l18, p20l19, p20l20,
]

export const chapters: Chapter[] = [
  {
    id: 'icebreaking',
    badge: '起点',
    title: '破冰——认识代码',
    description: '从零开始，认识程序、代码、符号，建立编程的基本认知。',
    courseIds: [
      'what-is-program',
      'code-is-text',
      'symbols-you-see',
      'first-program-glance',
      'practice-1',
    ],
  },
  {
    id: 'values-variables-types',
    badge: '基础',
    title: '基础积木（上）',
    description: '值、变量、类型——编程世界最基本的积木。',
    courseIds: [
      'what-is-value',
      'what-is-name',
      'int-type',
      'double-type',
      'char-type',
      'bool-type',
      'practice-types',
      'declare-variable',
      'assign-value',
      'equals-is-assign',
      'semicolon-rule',
      'declare-and-init',
      'practice-var-declare',
      'type-mismatch',
      'phase1-review',
    ],
  },
  {
    id: 'operators-io-flow',
    badge: '基础',
    title: '基础积木（下）',
    description: '算术运算、输入输出、条件判断——程序的核心逻辑能力。',
    courseIds: [
      'arithmetic-plus-minus',
      'multiply-divide-mod',
      'integer-division-trap',
      'operator-precedence',
      'practice-arithmetic',
      'cout-basics',
      'cout-multiple',
      'cin-basics',
      'cin-cout-combo',
      'practice-io',
      'comparison-six',
      'comparison-result',
      'if-intro',
      'if-braces',
      'if-else',
      'equals-vs-assign',
      'practice-conditions',
      'practice-comprehensive',
      'practice-all-p2',
      'phase2-review',
    ],
  },
  {
    id: 'loops-and-arrays',
    badge: '分水岭',
    title: '循环与数组',
    description: '循环让代码重复执行，数组让数据成批管理——编程的第一个分水岭。',
    courseIds: [
      'why-loops',
      'while-basics',
      'while-counter',
      'infinite-loop',
      'for-basics',
      'for-vs-while',
      'do-while',
      'practice-loops',
      'array-concept',
      'array-index',
      'loop-and-array',
      'practice-loops-arrays',
    ],
  },
  {
    id: 'strings-functions',
    badge: '进阶',
    title: '模块化思维',
    description: '字符串处理、函数封装、作用域规则——写出可复用代码。',
    courseIds: [
      'string-init',
      'string-concat',
      'string-index-size',
      'string-input',
      'practice-string',
      'why-functions',
      'function-definition',
      'function-call',
      'function-return',
      'void-function',
      'function-parameters',
      'multiple-parameters',
      'practice-functions',
      'what-is-scope',
      'local-vs-global',
      'scope-nesting',
      'practice-scope',
    ],
  },
  {
    id: 'pointers-refs-overload',
    badge: '进阶',
    title: 'C++ 特色',
    description: '指针、引用、重载、多文件——进入 C++ 特有的工程世界。',
    courseIds: [
      'pointer-motivation',
      'address-of-operator',
      'pointer-variable',
      'dereference-operator',
      'star-two-meanings',
      'nullptr',
      'reference-intro',
      'ref-vs-ptr',
      'pass-by-value',
      'pass-by-reference',
      'function-overload',
      'default-arguments',
      'practice-ptr-ref',
      'separate-compilation',
      'practice-organization',
    ],
  },
  {
    id: 'debugging-mindset',
    badge: '技能',
    title: '调试思维',
    description: '不会调试等于不会编程——读懂错误、打印调试、断点观察。',
    courseIds: [
      'what-is-debugging',
      'reading-errors',
      'print-debugging',
      'breakpoint-concept',
      'step-over-into',
      'watch-variables',
      'practice-debugging',
    ],
  },
  {
    id: 'oop-foundation',
    badge: '核心',
    title: 'OOP 地基',
    description: '类与对象、封装、构造析构——面向对象编程的核心思想。',
    courseIds: [
      'why-class',
      'define-class',
      'create-object',
      'member-access',
      'public-vs-private',
      'member-functions',
      'practice-class',
      'struct-vs-class',
      'constructor-intro',
      'constructor-overload',
      'init-list',
      'init-order',
      'destructor-intro',
      'practice-ctor-dtor',
      'this-pointer',
      'static-members',
      'const-member-func',
      'class-separation',
      'practice-oop-fund',
      'phase7-review',
    ],
  },
  {
    id: 'inheritance-polymorphism',
    badge: '核心',
    title: '继承与多态',
    description: 'OOP 的灵魂——代码复用、多态、虚函数、抽象接口。',
    courseIds: [
      'why-inheritance',
      'inheritance-basics',
      'protected-access',
      'inheritance-modes',
      'construction-chain',
      'practice-inheritance',
      'why-polymorphism',
      'virtual-function',
      'override-specifier',
      'polymorphism-in-action',
      'virtual-destructor',
      'abstract-class',
      'interface-design',
      'practice-polymorphism',
      'object-slicing',
      'diamond-problem',
      'phase8-review',
    ],
  },
  {
    id: 'cpp-idioms',
    badge: '黑话',
    title: 'C++ 黑话入门',
    description: 'const 的六种面孔、static、友元、运算符重载——C++ 特有的语法武器。',
    courseIds: [
      'const-value',
      'const-ptr',
      'const-ref',
      'const-methods',
      'const-overload',
      'practice-const',
      'static-local',
      'static-in-class-review',
      'friend-function',
      'friend-class',
      'why-operator-overload',
      'op-overload-syntax',
      'overload-arithmetic',
      'overload-stream',
      'overload-rules',
      'practice-op-overload',
      'phase9-review',
    ],
  },
  {
    id: 'memory-war',
    badge: '分水岭',
    title: '内存战争',
    description: '堆与栈、new/delete、深浅拷贝、RAII、移动语义——C++ 最核心的内存管理。',
    courseIds: [
      'stack-vs-heap',
      'new-delete',
      'new-array-delete-array',
      'memory-leak',
      'dangling-pointer',
      'double-delete',
      'practice-dynamic-mem',
      'deep-vs-shallow',
      'copy-constructor',
      'copy-assignment',
      'rule-of-three',
      'practice-copy',
      'raii-concept',
      'raii-in-action',
      'raii-beyond-memory',
      'practice-raii',
      'move-motivation',
      'rvalue-reference',
      'move-constructor',
      'phase10-review',
    ],
  },
  {
    id: 'modern-cpp-start',
    badge: '现代',
    title: '现代 C++ 起点',
    description: '左值右值、移动语义、完美转发——C++11 最重要的发明。',
    courseIds: [
      'lvalue-vs-rvalue',
      'std-move',
      'move-assignment',
      'rule-of-five',
      'practice-move',
      'perfect-forwarding-motivation',
      'forwarding-reference',
      'std-forward',
      'reference-collapsing',
      'practice-forwarding',
    ],
  },
  {
    id: 'generic-programming',
    badge: '进阶',
    title: '泛型编程',
    description: '函数模板、类模板、特化、偏特化——从具体类型到通用代码。',
    courseIds: [
      'why-template',
      'function-template',
      'template-instantiation',
      'template-type-deduction',
      'class-template',
      'template-member-func',
      'practice-template-basics',
      'multi-template-params',
      'non-type-template-params',
      'template-specialization',
      'partial-specialization',
      'practice-template-advanced',
      'typename-vs-class',
      'template-compilation-model',
      'phase12-review',
    ],
  },
  {
    id: 'stl-containers',
    badge: '核心',
    title: 'STL 容器',
    description: 'vector、list、map、set——不再自己造轮子。',
    courseIds: [
      'what-is-stl',
      'vector-intro',
      'vector-operations',
      'vector-capacity',
      'list-intro',
      'deque-intro',
      'container-choose',
      'practice-seq-containers',
      'stack-queue',
      'priority-queue',
      'set-intro',
      'map-intro',
      'unordered-set-map',
      'set-vs-unordered',
      'practice-assoc-containers',
      'container-summary',
      'phase13-review',
    ],
  },
  {
    id: 'stl-algorithms',
    badge: '核心',
    title: 'STL 算法',
    description: '迭代器、算法、Lambda——用算法替代手写循环，写出地道 C++。',
    courseIds: [
      'what-is-iterator',
      'iterator-categories',
      'why-algorithms',
      'sort',
      'find',
      'count',
      'practice-find-sort',
      'lambda-intro',
      'lambda-capture',
      'for-each',
      'transform',
      'copy-remove_if',
      'algorithm-pipeline',
      'practice-algorithms',
      'phase14-review',
    ],
  },
  {
    id: 'modern-cpp-features',
    badge: '现代',
    title: '现代 C++ 特性',
    description: 'auto、decltype、范围 for、constexpr、optional——C++17/20 日常利器。',
    courseIds: [
      'auto-keyword',
      'decltype',
      'range-for',
      'structured-binding',
      'constexpr',
      'static-assert',
      'practice-modern-features',
      'nullptr-modern',
      'optional',
      'variant',
      'any',
      'phase15-review',
    ],
  },
  {
    id: 'compilation-memory',
    badge: '深入',
    title: '内存与你',
    description: '编译流程、链接、内存布局、位运算——理解你的程序如何变成机器码。',
    courseIds: [
      'compilation-steps',
      'preprocessor',
      'header-guards',
      'how-include-works',
      'decl-vs-defn',
      'one-definition-rule',
      'translation-unit',
      'practice-compilation',
      'linking-errors',
      'memory-layout',
      'stack-deep',
      'heap-deep',
      'struct-padding',
      'practice-memory-layout',
      'bitwise-operators',
      'bit-fields',
      'phase16-review',
    ],
  },
  {
    id: 'smart-ptr-type-safety',
    badge: '现代',
    title: '智能指针与类型安全',
    description: 'unique_ptr、shared_ptr、weak_ptr、类型转换——告别裸指针和 C 风格转型。',
    courseIds: [
      'unique-ptr-motivation',
      'unique-ptr-basics',
      'unique-ptr-transfer',
      'unique-ptr-container',
      'shared-ptr-intro',
      'weak-ptr',
      'make-shared',
      'smart-ptr-choose',
      'practice-smart-ptr',
      'static-cast',
      'dynamic-cast',
      'const-cast-reinterpret',
      'c-style-cast-problem',
      'practice-casting',
      'phase17-review',
    ],
  },
  {
    id: 'concurrency-basics',
    badge: '进阶',
    title: '并发入门',
    description: '线程、互斥锁、死锁、条件变量、async、atomic——进入多线程世界。',
    courseIds: [
      'why-concurrency',
      'thread-basics',
      'thread-detach',
      'data-race',
      'mutex-intro',
      'lock-guard',
      'unique-lock',
      'practice-mutex',
      'deadlock',
      'deadlock-avoidance',
      'condition-variable',
      'async-future',
      'atomic-intro',
      'practice-concurrency',
      'phase18-review',
    ],
  },
  {
    id: 'engineering-cpp',
    badge: '工程',
    title: '工程化——设计模式/构建/测试',
    description: '设计模式、C++ 惯用法、SFINAE/Concepts、CMake、测试——写出可维护的工程代码。',
    courseIds: [
      'singleton-pattern',
      'singleton-thread-safe',
      'factory-pattern',
      'observer-pattern',
      'practice-patterns',
      'pimpl-idiom',
      'crtp',
      'practice-idioms',
      'sfinae-concept',
      'enable-if',
      'concepts-cpp20',
      'cmake-basics',
      'cmake-targets',
      'why-testing',
      'gtest-basics',
      'test-organization',
      'phase19-review',
    ],
  },
  {
    id: 'cpp-deep-black',
    badge: '大师',
    title: 'C++ 深度黑话',
    description: 'ADL、RVO/NRVO、类型擦除、变参模板、内存序、UB 哲学——C++ 宇宙的尽头。',
    courseIds: [
      'adl',
      'rvo-nrvo',
      'copy-elision-cpp17',
      'type-erasure',
      'function-implementation',
      'any-implementation',
      'practice-type-erasure',
      'variadic-templates',
      'fold-expressions',
      'practice-variadic',
      'memory-order-intro',
      'memory-order-modes',
      'rtti-cost',
      'practice-advanced-concepts',
      'undefined-behavior',
      'ub-not-error',
      'zero-overhead',
      'you-pay-only',
      'cpp-philosophy-review',
      'final-reflection',
    ],
  },
]
