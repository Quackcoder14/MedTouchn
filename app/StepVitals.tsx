"use client";

import { useEffect } from "react";

interface Props {
  formData: any;
  setFormData: any;
  nextStep: () => void;
}

export default function StepVitals({
  formData,
  setFormData,
  nextStep,
}: Props) {
  const update = (field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Patient Information
        </h2>
        <p className="text-gray-500 text-sm">
          Demographics & Clinical Vitals
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* LEFT COLUMN */}
        <div className="space-y-6">
          {/* AGE */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Patient Age
            </label>
            <div className="flex items-center bg-gray-50 border border-gray-300 rounded-lg overflow-hidden">
              <button
                type="button"
                onClick={() => update("age", Math.max(0, formData.age - 1))}
                className="px-4 py-3 text-lg font-semibold hover:bg-gray-200 transition"
              >
                −
              </button>
              <input
                type="number"
                min={0}
                max={120}
                value={formData.age}
                onChange={(e) =>
                  update("age", Math.min(120, Math.max(0, Number(e.target.value))))
                }
                className="w-full text-center bg-transparent py-3 outline-none text-lg font-medium"
              />
              <button
                type="button"
                onClick={() => update("age", Math.min(120, formData.age + 1))}
                className="px-4 py-3 text-lg font-semibold hover:bg-gray-200 transition"
              >
                +
              </button>
            </div>
          </div>

          {/* GENDER */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Gender
            </label>
            <select
              value={formData.gender}
              onChange={(e) => update("gender", e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            >
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>

          {/* SYSTOLIC BP */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Systolic Blood Pressure (mmHg)
            </label>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-300 space-y-3">
              <div className="flex justify-between text-sm text-gray-600">
                <span>80</span>
                <span className="font-semibold text-blue-600">
                  {formData.systolic} mmHg
                </span>
                <span>220</span>
              </div>
              <input
                type="range"
                min={80}
                max={220}
                value={formData.systolic}
                onChange={(e) => update("systolic", Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>
          </div>

          {/* DIASTOLIC BP */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Diastolic Blood Pressure (mmHg)
            </label>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-300 space-y-3">
              <div className="flex justify-between text-sm text-gray-600">
                <span>40</span>
                <span className="font-semibold text-blue-600">
                  {formData.diastolic} mmHg
                </span>
                <span>130</span>
              </div>
              <input
                type="range"
                min={40}
                max={130}
                value={formData.diastolic}
                onChange={(e) => update("diastolic", Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">
          {/* HEART RATE */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Heart Rate (BPM)
            </label>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-300 space-y-3">
              <div className="flex justify-between text-sm text-gray-600">
                <span>30</span>
                <span className="font-semibold text-blue-600">
                  {formData.heartRate} BPM
                </span>
                <span>200</span>
              </div>
              <input
                type="range"
                min={30}
                max={200}
                value={formData.heartRate}
                onChange={(e) => update("heartRate", Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>
          </div>

          {/* TEMPERATURE */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Temperature (°C)
            </label>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-300 space-y-3">
              <div className="flex justify-between text-sm text-gray-600">
                <span>34°C</span>
                <span className="font-semibold text-blue-600">
                  {formData.temperature}°C
                </span>
                <span>42°C</span>
              </div>
              <input
                type="range"
                min={34}
                max={42}
                step={0.1}
                value={formData.temperature}
                onChange={(e) => update("temperature", Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>
          </div>
        </div>
      </div>

      {/* CONTINUE BUTTON */}
      <div className="pt-4">
        <button
          onClick={nextStep}
          className="w-full py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
        >
          Continue →
        </button>
      </div>
    </div>
  );
}
