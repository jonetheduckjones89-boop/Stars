import { useState } from "react";

export default function App() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [extractedText, setExtractedText] = useState("");
  const [automation, setAutomation] = useState("");

  const backendURL = "https://common-czt5.onrender.com";

  async function handleProcess() {
    if (!file) return alert("Please select a file first!");

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(`${backendURL}/process`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      setExtractedText(data.extractedText || "");
      setAutomation(data.automation || "");
    } catch (e) {
      alert("Backend error: " + e.message);
    }

    setLoading(false);
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Documents AI Automation</h1>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-4"
      />

      <button
        onClick={handleProcess}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Processing..." : "Upload & Process"}
      </button>

      {extractedText && (
        <>
          <h2 className="text-xl font-semibold mt-6">Extracted Text:</h2>
          <pre className="bg-gray-100 p-4 rounded">{extractedText}</pre>
        </>
      )}

      {automation && (
        <>
          <h2 className="text-xl font-semibold mt-6">Automation Suggestions:</h2>
          <pre className="bg-gray-100 p-4 rounded">{automation}</pre>
        </>
      )}
    </div>
  );
}
