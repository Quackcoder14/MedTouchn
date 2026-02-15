"use client";

const conditionsList = [
  "No History",
  "Heart Disease",
  "Diabetes",
  "Hypertension",
  "Asthma",
  "COPD",
  "Kidney Disease",
  "Liver Disease",
  "Cancer",
  "Stroke History",
  "Epilepsy",
  "Thyroid Disorder",
  "Arthritis",
];

export default function StepHistory({ formData, setFormData, next, prev }: any) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Medical History
        </h2>
        <p className="text-gray-500 text-sm">
          Pre-existing conditions
        </p>
      </div>

      <div>
        <label className="block mb-3 font-medium text-gray-700">
          Select Pre-Existing Condition
        </label>
        <select
          value={formData.conditions}
          onChange={(e) => setFormData({ ...formData, conditions: e.target.value })}
          className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-gray-50"
        >
          {conditionsList.map((condition) => (
            <option key={condition} value={condition}>
              {condition}
            </option>
          ))}
        </select>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          💡 Select "No History" if patient has no pre-existing conditions
        </p>
      </div>

      <div className="flex justify-between pt-4">
        <button
          onClick={prev}
          className="px-8 py-3 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition"
        >
          ← Previous
        </button>
        <button
          onClick={next}
          className="px-8 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition shadow-md"
        >
          Analyze Patient →
        </button>
      </div>
    </div>
  );
}
