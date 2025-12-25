"use client";
import { useState } from "react";
import { FiFilePlus, FiMap } from "react-icons/fi";
import {useRouter} from "next/navigation";
import {extractTextFromPdf} from "../../components/ExtractText";

export default function Home() 
{
  const [notes, setNotes] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const Router = useRouter();

  const handlePdfUpload = async () =>
  {
    if (!file) return;
    setLoading(true);
    const text = await extractTextFromPdf(file);
    setNotes(text);
    await handleGenerate();
    setLoading(false);
  };

  async function handleGenerate()
  {
    if (!notes.trim()) return;
    setLoading(true);

    const res = await fetch("/api/mindmap", 
    {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({ text: notes })
    });

    const data = await res.json();
    console.log("Mindmap data:", data);
    sessionStorage.setItem("mindmapData", JSON.stringify(data));
    setLoading(false);
    Router.push("/map");
  };

  return (
    <div className="min-h-[90vh] h-[90vh] flex justify-center items-center flex-col bg-gray-950 p-2">
      <h2 className="max-w-3xl w-full text-gray-50 text-3xl text-center px-4 font-semibold">Notes to Mindmaps</h2>
      <h2 className="max-w-3xl w-full text-gray-200 text-md md:text-xl text-center px-4 font-normal mb-8 ">
        Create instant mindmaps through text or PDF to aid learning
      </h2>

      {!file ? 
      (<textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Enter your notes here..."
        className="max-w-3xl w-full rounded-4xl text-gray-200 text-left mx-auto p-5 h-32 outline-1 outline-gray-700 border-8 bg-gradient-to-b from-gray-950 to-gray-900 border-gray-900"
      />) :
      (
        <div className="max-w-3xl w-full rounded-4xl text-gray-200 text-left mx-auto flex-col p-5 h-max outline-1 outline-gray-700 border-8 bg-gradient-to-b from-gray-950 to-gray-900 border-gray-900 flex items-center justify-center">
          <p className="text-center">PDF uploaded: {file.name}</p>
          <button onClick={() => setFile(null)} className="ml-4 mt-3 bg-red-600 hover:bg-red-700 text-white font-semibold py-1 px-3 rounded transition-colors duration-300">
            Remove
          </button>
        </div>
      )}

      <div className="max-w-3xl w-full flex flex-col md:flex-row justify-center gap-1 items-center mt-4">
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => 
            {
              setFile(e.target.files?.[0] || null);
            }}
          className="hidden"
          id="pdf-upload"
        />
        {!file && (<label htmlFor="pdf-upload" className="bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer font-semibold py-2 px-6 rounded-xl transition-colors duration-300 flex items-center">
          <FiFilePlus className="inline-block mr-2 text-lg" />
          Upload PDF
        </label>)}

        <button
          onClick={file ? handlePdfUpload : handleGenerate}
          className={`bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer font-semibold py-2 px-6 rounded-xl transition-colors duration-300 flex items-center`}
        >
          <FiMap className="inline-block mr-2 text-lg" />
          {loading ? "Processing..." : "Generate Mindmap"}
        </button>
      </div>
    </div>
  );
}
