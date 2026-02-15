// app/api/predict/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const patientData = await request.json();
    
    // Call Python backend (you'll need to deploy this separately)
    // For now, we'll implement a simple rule-based system
    const result = analyzePrediction(patientData);
    
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: 'Prediction failed' },
      { status: 500 }
    );
  }
}

function analyzePrediction(data: any) {
  const {
    age,
    gender,
    systolic_bp,
    diastolic_bp,
    heart_rate,
    temperature,
    symptoms,
    pre_existing
  } = data;

  // Simple rule-based risk assessment
  let riskScore = 0;
  
  // Age factor
  if (age > 65) riskScore += 2;
  else if (age > 50) riskScore += 1;
  
  // BP factor
  if (systolic_bp > 180 || diastolic_bp > 100) riskScore += 3;
  else if (systolic_bp > 140 || diastolic_bp > 90) riskScore += 2;
  else if (systolic_bp < 90) riskScore += 3;
  
  // Heart rate factor
  if (heart_rate > 120) riskScore += 3;
  else if (heart_rate > 100) riskScore += 2;
  else if (heart_rate < 50) riskScore += 2;
  
  // Temperature factor
  if (temperature > 39) riskScore += 3;
  else if (temperature > 38) riskScore += 2;
  else if (temperature < 36) riskScore += 2;
  
  // Symptoms factor
  const criticalSymptoms = [
    'Chest Pain',
    'Difficulty Breathing',
    'Stroke Symptoms',
    'Severe Headache',
    'Confusion',
    'Seizure'
  ];
  
  const hasCriticalSymptom = Array.isArray(symptoms) 
    ? symptoms.some(s => criticalSymptoms.includes(s))
    : criticalSymptoms.includes(symptoms);
  
  if (hasCriticalSymptom) riskScore += 3;
  
  // Pre-existing condition factor
  const highRiskConditions = ['Heart Disease', 'Stroke History', 'COPD', 'Kidney Disease'];
  if (highRiskConditions.includes(pre_existing)) riskScore += 2;
  
  // Determine risk level
  let riskLevel = 'Low';
  let riskConfidence = 85;
  
  if (riskScore >= 8) {
    riskLevel = 'High';
    riskConfidence = 95;
  } else if (riskScore >= 4) {
    riskLevel = 'Medium';
    riskConfidence = 88;
  } else {
    riskConfidence = 92;
  }
  
  // Department recommendation
  const department = determineDepartment(symptoms, riskLevel);
  
  // Contributing factors
  const factors = generateFactors(data, riskLevel);
  
  return {
    risk_level: riskLevel,
    risk_confidence: riskConfidence,
    risk_probabilities: {
      High: riskLevel === 'High' ? riskConfidence : (100 - riskConfidence) / 2,
      Medium: riskLevel === 'Medium' ? riskConfidence : (100 - riskConfidence) / 2,
      Low: riskLevel === 'Low' ? riskConfidence : (100 - riskConfidence) / 2
    },
    department: department,
    dept_confidence: 90,
    factors: factors
  };
}

function determineDepartment(symptoms: any, riskLevel: string): string {
  const symptom = Array.isArray(symptoms) ? symptoms[0] : symptoms;
  
  if (riskLevel === 'High') return 'Emergency';
  
  const departmentMap: { [key: string]: string } = {
    'Chest Pain': 'Cardiology',
    'Heart Palpitations': 'Cardiology',
    'Stroke Symptoms': 'Neurology',
    'Severe Headache': 'Neurology',
    'Confusion': 'Neurology',
    'Difficulty Breathing': 'Respiratory',
    'Cough': 'Respiratory',
    'Wheezing': 'Respiratory',
    'Abdominal Pain': 'Gastroenterology',
    'Nausea': 'Gastroenterology',
    'Vomiting': 'Gastroenterology',
    'Fracture': 'Orthopedics',
    'Joint Pain': 'Orthopedics',
    'Back Pain': 'Orthopedics'
  };
  
  return departmentMap[symptom] || 'General Medicine';
}

function generateFactors(data: any, riskLevel: string): string[] {
  const factors: string[] = [];
  
  // Age
  if (data.age > 65 && riskLevel === 'High') {
    factors.push(`🔴 Advanced age (${data.age} years) increases risk significantly`);
  } else if (data.age > 65) {
    factors.push(`⚠️ Elderly patient (${data.age} years)`);
  } else if (data.age < 30) {
    factors.push(`✅ Young patient (${data.age} years) - lower baseline risk`);
  }
  
  // Blood Pressure
  if (data.systolic_bp > 180 || data.diastolic_bp > 100) {
    factors.push(`🔴 Hypertensive crisis (BP: ${data.systolic_bp}/${data.diastolic_bp})`);
  } else if (data.systolic_bp > 140 || data.diastolic_bp > 90) {
    factors.push(`⚠️ Elevated blood pressure (${data.systolic_bp}/${data.diastolic_bp})`);
  } else if (data.systolic_bp < 90) {
    factors.push(`🔴 Low blood pressure (${data.systolic_bp}/${data.diastolic_bp})`);
  } else {
    factors.push(`✅ Normal blood pressure (${data.systolic_bp}/${data.diastolic_bp})`);
  }
  
  // Heart Rate
  if (data.heart_rate > 120) {
    factors.push(`🔴 Severe tachycardia (${data.heart_rate} BPM)`);
  } else if (data.heart_rate > 100) {
    factors.push(`⚠️ Tachycardia (${data.heart_rate} BPM)`);
  } else if (data.heart_rate < 50) {
    factors.push(`⚠️ Bradycardia (${data.heart_rate} BPM)`);
  } else {
    factors.push(`✅ Normal heart rate (${data.heart_rate} BPM)`);
  }
  
  // Temperature
  if (data.temperature > 39) {
    factors.push(`🔴 High fever (${data.temperature}°C)`);
  } else if (data.temperature > 38) {
    factors.push(`⚠️ Fever present (${data.temperature}°C)`);
  } else if (data.temperature < 36) {
    factors.push(`🔴 Hypothermia (${data.temperature}°C)`);
  } else {
    factors.push(`✅ Normal temperature (${data.temperature}°C)`);
  }
  
  return factors;
}
