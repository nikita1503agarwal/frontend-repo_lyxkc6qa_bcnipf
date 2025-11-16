import { useState } from "react";
import { PenSquare, CheckSquare, Undo2 } from "lucide-react";

export default function InteractiveTools() {
  const [text, setText] = useState("");
  const [answer, setAnswer] = useState("");
  const [corrected, setCorrected] = useState(null);

  const checkAnswer = () => {
    setCorrected(answer.trim().length > 0 ? "Looks good!" : "Please write an answer.");
  };

  const reset = () => {
    setText("");
    setAnswer("");
    setCorrected(null);
  };

  return (
    <section className="bg-white">
      <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-6">
        <div className="p-4 border rounded-lg">
          <div className="flex items-center gap-2 text-gray-700 font-medium">
            <PenSquare className="w-4 h-4" /> Lesson visualization board
          </div>
          <textarea
            className="mt-3 w-full h-40 border rounded p-2 text-sm"
            placeholder="Describe what you'd like to visualize (e.g., Water Cycle on smart board)"
            value={text}
            onChange={(e)=>setText(e.target.value)}
          />
          <div className="text-xs text-gray-500 mt-2">This creates a structured outline you can present on the board.</div>
        </div>
        <div className="p-4 border rounded-lg">
          <div className="flex items-center gap-2 text-gray-700 font-medium">
            <CheckSquare className="w-4 h-4" /> Fillable answer & correction
          </div>
          <input
            className="mt-3 w-full border rounded p-2 text-sm"
            placeholder="Student answer..."
            value={answer}
            onChange={(e)=>setAnswer(e.target.value)}
          />
          <div className="mt-3 flex gap-2">
            <button onClick={checkAnswer} className="bg-green-600 text-white px-3 py-2 rounded text-sm">Check</button>
            <button onClick={reset} className="bg-gray-100 text-gray-700 px-3 py-2 rounded text-sm inline-flex items-center gap-2"><Undo2 className="w-4 h-4"/>Reset</button>
          </div>
          {corrected && (
            <div className="mt-3 text-sm">
              <span className="font-medium">Feedback: </span>{corrected}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
