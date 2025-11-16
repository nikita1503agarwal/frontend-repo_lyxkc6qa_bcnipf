import { BookOpen, Home, FileText, Video, Layers, Search } from "lucide-react";

export default function Navbar({ onSearch }) {
  return (
    <header className="sticky top-0 z-30 backdrop-blur bg-white/70 border-b">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
        <div className="flex items-center gap-2 text-blue-600 font-bold text-lg">
          <Layers className="w-6 h-6" />
          <span>TeachFlow LMS</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600">
          <a className="hover:text-blue-600" href="#rhymes">Rhymes</a>
          <a className="hover:text-blue-600" href="#stories">Stories</a>
          <a className="hover:text-blue-600" href="#lessonplans">Lesson Plans</a>
          <a className="hover:text-blue-600" href="#questionbank">Question Bank</a>
        </nav>
        <div className="ml-auto relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search lessons, resources..."
            onChange={(e) => onSearch?.(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </header>
  );
}
