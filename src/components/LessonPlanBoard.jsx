import { useEffect, useMemo, useState } from "react";
import { PlusCircle, FileText, Image as ImageIcon, Sparkles } from "lucide-react";

const API = import.meta.env.VITE_BACKEND_URL || "";

export default function LessonPlanBoard() {
  const [lessonPlans, setLessonPlans] = useState([]);
  const [resources, setResources] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [query, setQuery] = useState("");

  const fetchAll = async () => {
    const [lp, res, qs] = await Promise.all([
      fetch(`${API}/api/lesson-plans`).then(r => r.json()),
      fetch(`${API}/api/resources`).then(r => r.json()),
      fetch(`${API}/api/questions`).then(r => r.json()),
    ]);
    setLessonPlans(lp);
    setResources(res);
    setQuestions(qs);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const filteredLP = useMemo(() => {
    if (!query) return lessonPlans;
    const q = query.toLowerCase();
    return lessonPlans.filter(l =>
      l.title.toLowerCase().includes(q) ||
      l.subject.toLowerCase().includes(q) ||
      (l.grade || "").toLowerCase().includes(q)
    );
  }, [lessonPlans, query]);

  const createSample = async () => {
    // seed one sample lesson, resources, and questions
    const lpRes = await fetch(`${API}/api/lesson-plans`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'Plants and Their Parts', subject: 'Science', grade: 'Grade 2', objectives: ['Identify main parts of a plant'], content: 'Hands-on observation of a plant.' })
    }).then(r => r.json());

    const lpId = lpRes.id;

    const batch = [
      fetch(`${API}/api/resources`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title: 'Parts of a Plant Rhyme', type: 'rhyme', url: 'https://example.com/rhyme.mp4', lesson_plan_id: lpId }) }),
      fetch(`${API}/api/resources`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title: 'Plant Story', type: 'story_video', url: 'https://example.com/story.mp4', lesson_plan_id: lpId }) }),
      fetch(`${API}/api/resources`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title: 'Plant PPT', type: 'ppt', url: 'https://example.com/plant.pptx', lesson_plan_id: lpId }) }),
      fetch(`${API}/api/questions`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ lesson_plan_id: lpId, text: 'Name the parts of a plant we can see.', type: 'short', bloom_level: 'remember' }) }),
      fetch(`${API}/api/questions`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ lesson_plan_id: lpId, text: 'Match the part to its function', type: 'mcq', options: ['Leaf-Photosynthesis','Root-Absorbs water','Flower-Reproduction'], correct_answer: 'All', bloom_level: 'understand' }) }),
      fetch(`${API}/api/questions`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ lesson_plan_id: lpId, text: 'Why do leaves have a large surface area?', type: 'short', bloom_level: 'apply' }) }),
    ];
    await Promise.all(batch);
    await fetchAll();
  };

  const generateHomework = async (lesson_plan_id) => {
    const res = await fetch(`${API}/api/homework/generate`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lesson_plan_id })
    }).then(r => r.json());
    alert(`Homework created with id ${res.id}`);
  };

  return (
    <section id="lessonplans" className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">Lesson Plans</h2>
        <div className="flex items-center gap-3">
          <input placeholder="Search..." value={query} onChange={e=>setQuery(e.target.value)} className="border rounded px-3 py-2" />
          <button onClick={createSample} className="inline-flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded">
            <PlusCircle className="w-4 h-4"/> Sample Data
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mt-6">
        {filteredLP.map(lp => (
          <div key={lp.id} className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-800">{lp.title}</h3>
                <p className="text-xs text-gray-500">{lp.subject} • {lp.grade}</p>
              </div>
              <button onClick={()=>generateHomework(lp.id)} className="text-sm text-blue-600 hover:underline">Homework</button>
            </div>
            <p className="mt-3 text-sm text-gray-600 line-clamp-3">{lp.content}</p>

            <div className="mt-4">
              <p className="text-xs font-medium text-gray-500">Resources</p>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {resources.filter(r=>r.lesson_plan_id===lp.id).slice(0,3).map(r => (
                  <div key={r.id} className="bg-gray-50 rounded p-2 flex items-center gap-2 text-xs">
                    <FileText className="w-4 h-4 text-gray-400"/>
                    <span className="truncate">{r.title}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <p className="text-xs font-medium text-gray-500">Question Bank</p>
              <ul className="mt-2 space-y-1 list-disc list-inside text-sm text-gray-700 max-h-24 overflow-auto">
                {questions.filter(q=>q.lesson_plan_id===lp.id).map(q => (
                  <li key={q.id}>
                    <span className="uppercase text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded mr-2">{q.bloom_level}</span>
                    {q.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
