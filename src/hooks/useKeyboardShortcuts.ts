import { useEffect } from 'react'
import { useStore } from '../store/useStore'

/**
 * Global keyboard shortcuts for the lesson player.
 * Only fires when screen === 'lesson' and no input/textarea is focused.
 *
 * Enter / Space  → advance block (if completed or exposition)
 * ArrowRight     → next block
 * ArrowLeft      → prev block
 * Escape         → exit to level select
 * h              → toggle hint
 */
export function useKeyboardShortcuts() {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const state = useStore.getState()

      // Only respond in lesson screen
      if (state.screen !== 'lesson') return

      // Don't capture keystrokes when user is typing in a form control
      const el = e.target as HTMLElement | null
      if (!el) return
      const tag = el.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || el.isContentEditable) return

      switch (e.key) {
        case 'Enter':
        case ' ': {
          // Space
          e.preventDefault()
          if (!state.currentLesson) break
          const block = state.currentLesson.blocks[state.currentBlockIndex]
          const passive = block?.type === 'exposition'
          const canAdvance = state.blockCompleted || passive
          if (canAdvance) {
            if (state.currentBlockIndex >= state.currentLesson.blocks.length - 1) {
              state.completeLesson(3)
            } else {
              state.nextBlock()
            }
          }
          break
        }

        case 'ArrowRight':
          e.preventDefault()
          state.nextBlock()
          break

        case 'ArrowLeft':
          e.preventDefault()
          state.prevBlock()
          break

        case 'Escape':
          e.preventDefault()
          state.setScreen('level-select')
          break

        case 'h':
          e.preventDefault()
          state.toggleHint()
          break
      }
    }

    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])
}
