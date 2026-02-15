"use client";

import { useState, useEffect } from "react";
import StepVitals from "./StepVitals";
import StepSymptoms from "./StepSymptoms";
import StepHistory from "./StepHistory";
import StepReview from "./StepReview";
import Stepper from "./Stepper";
import LanguageSelector from "./LanguageSelector";
import { translations } from "./translations";

export default function PatientPage() {
  const [step, setStep] = useState(1);
  const [language, setLanguage] = useState("en");

  const [formData, setFormData] = useState({
    age: 45,
    gender: "Male",
    heartRate: 80,
    temperature: 36.8,
    systolic: 120,
    diastolic: 80,
    symptoms: [] as string[],
    conditions: "No History",
    medicalReports: [] as File[],
    reportAnalysis: "",
  });

  const next = () => setStep((prev) => prev + 1);
  const prev = () => setStep((prev) => prev - 1);

  const t = translations[language] || translations.en;

  return (
    <div className="min-h-screen bg-gradient-to-br from-powder-blue via-white to-powder-blue-light flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
      
      <div className="w-full max-w-6xl bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-powder-blue-dark/20 overflow-hidden relative z-10">
        
        {/* Header Section */}
        <div className="bg-gradient-to-r from-navy-deep via-navy-medium to-navy-deep px-8 py-6 sm:px-12 sm:py-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-powder-blue rounded-full flex items-center justify-center">
                  <svg className="w-7 h-7 text-navy-deep" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                  MedTouch.ai
                </h1>
              </div>
              <p className="text-powder-blue text-sm sm:text-base font-medium">
                {t.subtitle}
              </p>
            </div>
            
            {/* Language Selector */}
            <LanguageSelector language={language} setLanguage={setLanguage} />
          </div>
        </div>

        {/* Content Section */}
        <div className="px-6 py-8 sm:px-12 sm:py-10">
          
          {/* Progress Stepper */}
          <div className="mb-10">
            <Stepper step={step} language={language} />
          </div>

          {/* Steps */}
          <div className="mt-8">
            {step === 1 && (
              <StepVitals 
                formData={formData} 
                setFormData={setFormData} 
                nextStep={next}
                t={t}
              />
            )}

            {step === 2 && (
              <StepSymptoms
                formData={formData}
                setFormData={setFormData}
                next={next}
                prev={prev}
                t={t}
                language={language}
              />
            )}

            {step === 3 && (
              <StepHistory
                formData={formData}
                setFormData={setFormData}
                next={next}
                prev={prev}
                t={t}
              />
            )}

            {step === 4 && (
              <StepReview 
                formData={formData} 
                prev={prev} 
                setStep={setStep}
                t={t}
              />
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-8 py-4 border-t border-gray-200">
          <p className="text-center text-sm text-charcoal-gray">
            {t.footer}
          </p>
        </div>
      </div>
    </div>
  );
}
