import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import LessonPlanBoard from './components/LessonPlanBoard'
import InteractiveTools from './components/InteractiveTools'

function App() {
  const [search, setSearch] = useState("")
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      <Navbar onSearch={setSearch} />
      <Hero />
      <LessonPlanBoard query={search} />
      <InteractiveTools />
      <footer className="text-center text-xs text-gray-500 py-8">TeachFlow LMS • Demo</footer>
    </div>
  )
}

export default App
