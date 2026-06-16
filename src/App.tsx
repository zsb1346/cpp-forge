import React, { useEffect } from 'react'
import { useStore } from './store/useStore'
import StartScreen from './pages/StartScreen'
import LevelSelect from './pages/LevelSelect'
import LessonPlayer from './pages/LessonPlayer'
import ErrorBoundary from './components/ErrorBoundary'
import Celebration from './components/Celebration'
import { courses } from './courses'
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts'

const App: React.FC = () => {
  useKeyboardShortcuts()
  const screen = useStore(s => s.screen)
  const loadCourses = useStore(s => s.loadCourses)
  const celebration = useStore(s => s.celebration)

  useEffect(() => { loadCourses(courses) }, [loadCourses])

  const page = (() => {
    switch (screen) {
      case 'start': return <StartScreen />
      case 'level-select': return <LevelSelect />
      case 'lesson': return <LessonPlayer />
      default: return <StartScreen />
    }
  })()

  return (
    <ErrorBoundary>
      {page}
      {celebration && <Celebration />}
    </ErrorBoundary>
  )
}

export default App
