"use client";

const symptomsList = [
  "Chest Pain",
  "Difficulty Breathing",
  "Shortness of Breath",
  "Stroke Symptoms",
  "Severe Headache",
  "Confusion",
  "Fever",
  "High Fever",
  "Cough",
  "Sore Throat",
  "Abdominal Pain",
  "Nausea",
  "Vomiting",
  "Dizziness",
  "Fatigue",
  "Headache",
  "Joint Pain",
  "Back Pain",
];

export default function StepSymptoms({ formData, setFormData, next, prev }: any) {
  const toggleSymptom = (symptom: string) => {
    const updated = formData.symptoms.includes(symptom)
      ? formData.symptoms.filter((s: string) => s !== symptom)
      : [...formData.symptoms, symptom];

    setFormData({ ...formData, symptoms: updated });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Select Symptoms
        </h2>
        <p className="text-gray-500 text-sm">
          Choose all that apply
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {symptomsList.map((symptom) => {
          const selected = formData.symptoms.includes(symptom);

          return (
            <button
              key={symptom}
              onClick={() => toggleSymptom(symptom)}
              className={`p-4 rounded-lg font-medium transition-all ${
                selected
                  ? "bg-blue-600 text-white shadow-lg scale-105 border-2 border-blue-700"
                  : "bg-white border-2 border-gray-300 text-gray-700 hover:border-blue-400 hover:shadow-md"
              }`}
            >
              {symptom}
            </button>
          );
        })}
      </div>

      {formData.symptoms.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>Selected:</strong> {formData.symptoms.join(", ")}
          </p>
        </div>
      )}

      <div className="flex justify-between pt-4">
        <button
          onClick={prev}
          className="px-8 py-3 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition"
        >
          ← Previous
        </button>
        <button
          onClick={() => {
            if (formData.symptoms.length === 0) {
              alert("Please select at least one symptom");
            } else {
              next();
            }
          }}
          className="px-8 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition shadow-md"
        >
          Continue →
        </button>
      </div>
    </div>
  );
}
