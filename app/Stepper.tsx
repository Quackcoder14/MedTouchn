"use client";

import { translations } from "./translations";

export default function Stepper({ step, language }: { step: number; language: string }) {
  const t = translations[language] || translations.en;
  const steps = [t.step1, t.step2, t.step3, t.step4];

  return (
    <div className="flex justify-between items-center relative pb-4">
      {/* Progress Line */}
      <div className="absolute top-4 left-0 w-full h-1 bg-gray-200 -z-10 rounded-full">
        <div
          className="h-full bg-gradient-powder rounded-full transition-all duration-500"
          style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
        />
      </div>

      {/* Steps */}
      {steps.map((label, index) => {
        const stepNumber = index + 1;
        const isActive = step === stepNumber;
        const isCompleted = step > stepNumber;

        return (
          <div
            key={index}
            className="flex flex-col items-center flex-1 relative animate-fade-in"
          >
            {/* Circle */}
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                isActive
                  ? "bg-powder-blue text-navy-deep scale-110 shadow-lg ring-4 ring-powder-blue/30"
                  : isCompleted
                  ? "bg-powder-blue-dark text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {isCompleted ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                stepNumber
              )}
            </div>

            {/* Label */}
            <div
              className={`mt-2 text-xs sm:text-sm font-medium transition-all duration-300 ${
                isActive
                  ? "text-navy-deep font-bold scale-105"
                  : isCompleted
                  ? "text-powder-blue-dark font-semibold"
                  : "text-gray-500"
              }`}
            >
              {label}
            </div>
          </div>
        );
      })}
    </div>
  );
}
