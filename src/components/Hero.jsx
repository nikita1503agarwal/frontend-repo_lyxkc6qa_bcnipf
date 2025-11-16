import { BookOpen, Play, FileText, Scan } from "lucide-react";

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight">
            A simple, visual LMS for early-years and primary teachers
          </h1>
          <p className="mt-3 text-gray-600">
            Access rhymes, story videos, lesson plans, PPTs, textbooks and generate
            Bloom's-aligned homework in seconds.
          </p>
        </div>
        <div className="bg-white rounded-xl shadow p-4 grid grid-cols-3 gap-3">
          <div className="col-span-1 bg-blue-600 text-white rounded-lg p-4 flex flex-col items-center">
            <Play className="w-6 h-6" />
            <span className="mt-2 text-sm">Rhymes</span>
          </div>
          <div className="col-span-1 bg-indigo-600 text-white rounded-lg p-4 flex flex-col items-center">
            <BookOpen className="w-6 h-6" />
            <span className="mt-2 text-sm">Stories</span>
          </div>
          <div className="col-span-1 bg-purple-600 text-white rounded-lg p-4 flex flex-col items-center">
            <FileText className="w-6 h-6" />
            <span className="mt-2 text-sm">Plans</span>
          </div>
        </div>
      </div>
    </section>
  );
}
