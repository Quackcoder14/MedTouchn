"use client";

import { useState, useEffect } from "react";

export default function StepReview({ formData, prev, setStep }: any) {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getPrediction() {
      setLoading(true);
      try {
        const response = await fetch("/api/predict", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            age: formData.age,
            gender: formData.gender,
            systolic_bp: formData.systolic,
            diastolic_bp: formData.diastolic,
            heart_rate: formData.heartRate,
            temperature: formData.temperature,
            symptoms: formData.symptoms[0] || "Fatigue",
            pre_existing: formData.conditions,
          }),
        });

        const data = await response.json();
        setResult(data);
      } catch (error) {
        console.error("Prediction error:", error);
      } finally {
        setLoading(false);
      }
    }

    getPrediction();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-16">
        <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
        <p className="mt-4 text-gray-600 font-medium">Analyzing patient data...</p>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="text-center py-16">
        <p className="text-red-600 font-medium">Failed to load prediction</p>
        <button
          onClick={prev}
          className="mt-4 px-6 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          ← Go Back
        </button>
      </div>
    );
  }

  const risk = result.risk_level;
  const riskColor =
    risk === "High"
      ? "bg-red-500"
      : risk === "Medium"
      ? "bg-orange-400"
      : "bg-green-500";

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          🎯 Analysis Results
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* LEFT COLUMN - Risk & Department */}
        <div className="space-y-6">
          {/* RISK LEVEL */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Risk Classification
            </h3>
            <div
              className={`${riskColor} text-white px-6 py-8 rounded-lg text-center shadow-lg`}
            >
              <div className="text-3xl font-bold mb-2">
                {risk === "High" ? "🔴" : risk === "Medium" ? "🟡" : "🟢"} {risk.toUpperCase()} RISK
              </div>
              <div className="text-lg opacity-90">
                {result.risk_confidence.toFixed(1)}% Confidence
              </div>
            </div>
          </div>

          {/* DEPARTMENT */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Recommended Department
            </h3>
            <div className="bg-blue-600 text-white px-6 py-6 rounded-lg text-center shadow-lg">
              <div className="text-2xl font-bold">📍 {result.department}</div>
              <div className="text-sm opacity-90 mt-2">
                {result.dept_confidence}% Match
              </div>
            </div>
          </div>

          {/* PROBABILITIES */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Risk Probabilities
            </h3>
            <div className="space-y-2">
              {Object.entries(result.risk_probabilities).map(([level, prob]: [string, any]) => (
                <div key={level} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                  <span className="font-medium text-gray-700">
                    {level === "High" ? "🔴" : level === "Medium" ? "🟡" : "🟢"} {level}
                  </span>
                  <span className="font-semibold text-blue-600">{prob.toFixed(1)}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN - Recommendations */}
        <div className="space-y-6">
          {/* CLINICAL RECOMMENDATIONS */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              🏥 Clinical Recommendations
            </h3>
            {risk === "High" && (
              <div className="bg-red-50 border-2 border-red-300 rounded-lg p-6 space-y-3">
                <div className="font-bold text-red-800 text-lg">
                  🔴 IMMEDIATE ACTION REQUIRED
                </div>
                <div className="text-sm text-red-800 space-y-2">
                  <p><strong>Priority:</strong> ESI Level 1 (Resuscitation)</p>
                  <p><strong>Actions:</strong></p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Immediate trauma bay assignment</li>
                    <li>Alert attending physician</li>
                    <li>Prepare emergency equipment</li>
                    <li>Continuous monitoring required</li>
                  </ul>
                  <p><strong>Target:</strong> Physician evaluation IMMEDIATELY</p>
                </div>
              </div>
            )}

            {risk === "Medium" && (
              <div className="bg-orange-50 border-2 border-orange-300 rounded-lg p-6 space-y-3">
                <div className="font-bold text-orange-800 text-lg">
                  🟡 URGENT ASSESSMENT NEEDED
                </div>
                <div className="text-sm text-orange-800 space-y-2">
                  <p><strong>Priority:</strong> ESI Level 2-3 (Emergent/Urgent)</p>
                  <p><strong>Actions:</strong></p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Move to urgent care area</li>
                    <li>Vitals every 15-30 minutes</li>
                    <li>Priority physician evaluation</li>
                  </ul>
                  <p><strong>Target:</strong> Physician evaluation within 15-30 min</p>
                </div>
              </div>
            )}

            {risk === "Low" && (
              <div className="bg-green-50 border-2 border-green-300 rounded-lg p-6 space-y-3">
                <div className="font-bold text-green-800 text-lg">
                  🟢 ROUTINE PROCESSING
                </div>
                <div className="text-sm text-green-800 space-y-2">
                  <p><strong>Priority:</strong> ESI Level 4-5 (Less/Non-Urgent)</p>
                  <p><strong>Actions:</strong></p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Assign to general waiting area</li>
                    <li>Standard monitoring protocol</li>
                    <li>Process in queue order</li>
                  </ul>
                  <p><strong>Expected Wait:</strong> 1-2 hours</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CONTRIBUTING FACTORS */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          💡 Why This Classification?
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="font-semibold text-gray-700">Contributing Factors</h4>
            {result.factors.map((factor: string, idx: number) => (
              <div
                key={idx}
                className="bg-blue-50 border-l-4 border-blue-600 p-3 rounded text-sm"
              >
                {factor}
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold text-gray-700">Patient Summary</h4>
            <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Age:</span>
                <span className="font-semibold">{formData.age} years</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Gender:</span>
                <span className="font-semibold">{formData.gender}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">BP:</span>
                <span className="font-semibold">
                  {formData.systolic}/{formData.diastolic} mmHg
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Heart Rate:</span>
                <span className="font-semibold">{formData.heartRate} BPM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Temperature:</span>
                <span className="font-semibold">{formData.temperature}°C</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Symptoms:</span>
                <span className="font-semibold text-right">
                  {formData.symptoms.slice(0, 2).join(", ")}
                  {formData.symptoms.length > 2 && "..."}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">History:</span>
                <span className="font-semibold">{formData.conditions}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex gap-4 pt-4">
        <button
          onClick={prev}
          className="px-8 py-3 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition"
        >
          ← Previous
        </button>
        <button
          onClick={() => setStep(1)}
          className="flex-1 px-8 py-3 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition shadow-md"
        >
          🔄 New Patient
        </button>
        <div className="px-8 py-3 rounded-lg bg-blue-600 text-white font-semibold text-center shadow-md">
          ✅ Complete
        </div>
      </div>
    </div>
  );
}
