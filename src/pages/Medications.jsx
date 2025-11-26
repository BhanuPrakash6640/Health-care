import { useState } from "react";
import { medicationMap } from "../data/medications";

export default function Medications() {
  const [symptom, setSymptom] = useState("");
  const data = medicationMap[symptom];

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-semibold mb-4">Medication Recommendations</h1>
      <p className="opacity-70 mb-6">
        Select your symptom to view safe OTC suggestions.
      </p>

      <select
        className="bg-slate-800 p-3 rounded-lg text-white mb-6"
        value={symptom}
        onChange={(e) => setSymptom(e.target.value)}
      >
        <option value="">Select a symptom</option>
        {Object.keys(medicationMap).map((key) => (
          <option key={key} value={key}>
            {key}
          </option>
        ))}
      </select>

      {data && (
        <div className="bg-slate-800 p-5 rounded-xl border border-white/10">
          <h2 className="text-xl font-semibold mb-3 capitalize">
            {symptom} – OTC Medications
          </h2>

          <ul className="list-disc ml-5 mb-4">
            {data.meds.map((m, i) => (
              <li key={i}>{m}</li>
            ))}
          </ul>

          <p className="opacity-80 text-sm">{data.advice}</p>

          <p className="text-xs text-yellow-500 mt-4">
            ⚠️ This is general OTC guidance for educational/demo use only. Not a
            medical diagnosis. Consult a doctor if symptoms worsen.
          </p>
        </div>
      )}
      
      <p className="text-xs opacity-60 mt-6">
        This tool provides general OTC suggestions for demo purposes only and is not
        a medical device or diagnostic tool.
      </p>
    </div>
  );
}