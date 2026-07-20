"use client";

import React from "react";
import { MedicineBuilder } from "./MedicineBuilder";
import { PatientContextSidebar } from "./PatientContextSidebar";
import { usePrescription } from "@/context/PrescriptionContext";
import { Plus } from "lucide-react";

interface SmartEditorAreaProps {
  onFinalize: () => void;
}

export function SmartEditorArea({ onFinalize }: SmartEditorAreaProps) {
  const { data, updateData, updateVitals } = usePrescription();

  const appendToState = (field: keyof typeof data, newText: string) => {
    const currentVal = data[field] as string;
    updateData({ [field]: currentVal ? `${currentVal}, ${newText}` : newText });
  };

  return (
    <div className="flex flex-col h-auto xl:h-full bg-white relative">
      <div className="flex-1 overflow-visible xl:overflow-y-auto custom-scrollbar p-5 lg:p-6">
        <div className="w-full flex flex-col gap-5">
          
          {/* Patient Info Header */}
          <PatientContextSidebar isDesktop={false} />

          {/* Section 1: CHIEF COMPLAINT */}
          <div className="w-full min-h-[100px] p-4 bg-white border border-slate-200 rounded-[12px] shadow-sm flex flex-col gap-2 group transition-colors hover:border-slate-300">
            <h3 className="text-[16px] font-semibold text-[#111827]">CHIEF COMPLAINT</h3>
            <textarea 
              value={data.chiefComplaint}
              onChange={(e) => updateData({ chiefComplaint: e.target.value })}
              placeholder="Describe the patient's primary complaints..."
              className="w-full bg-transparent text-[#6B7280] text-[15px] leading-[1.6] placeholder:text-slate-300 resize-none outline-none focus:ring-0 flex-1"
            />
          </div>

          {/* Section 2: PHYSICAL EXAM */}
          <div className="w-full min-h-[120px] p-4 bg-white border border-slate-200 rounded-[12px] shadow-sm flex flex-col gap-2 group transition-colors hover:border-slate-300">
            <h3 className="text-[16px] font-semibold text-[#111827]">PHYSICAL EXAM</h3>
            <textarea 
              value={data.physicalExam}
              onChange={(e) => updateData({ physicalExam: e.target.value })}
              placeholder="Document physical examination findings..."
              className="w-full bg-transparent text-[#6B7280] text-[15px] leading-[1.6] placeholder:text-slate-300 resize-none outline-none focus:ring-0 flex-1"
            />
          </div>

          {/* Section 3: VITALS TODAY */}
          <div className="w-full p-4 bg-white border border-slate-200 rounded-[12px] shadow-sm flex flex-col gap-3 transition-colors hover:border-slate-300">
            <h3 className="text-[16px] font-semibold text-[#111827]">VITALS TODAY</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { label: "Blood Pressure", unit: "mmHg", placeholder: "120/80", field: "bp" },
                { label: "Pulse", unit: "bpm", placeholder: "72", field: "pulse" },
                { label: "Temperature", unit: "°F", placeholder: "98.6", field: "temp" },
                { label: "Weight", unit: "kg", placeholder: "70", field: "weight" },
                { label: "Height", unit: "cm", placeholder: "170", field: "height" },
                { label: "BMI", unit: "kg/m²", placeholder: "24.2", field: "bmi" },
                { label: "SpO₂", unit: "%", placeholder: "98", field: "spo2" },
                { label: "Blood Sugar", unit: "mg/dL", placeholder: "110", field: "bloodSugar" },
              ].map((vital, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-100 rounded-[10px] p-2.5 flex flex-col justify-center h-[72px]">
                  <span className="text-[11px] font-semibold text-slate-500 mb-0.5">{vital.label}</span>
                  <div className="flex items-center gap-1">
                    <input 
                      type="text" 
                      value={data.vitals[vital.field as keyof typeof data.vitals]}
                      onChange={(e) => updateVitals({ [vital.field]: e.target.value })}
                      placeholder={vital.placeholder}
                      className="bg-transparent border-none outline-none text-[15px] font-bold text-slate-800 w-full p-0 focus:ring-0"
                    />
                    <span className="text-[11px] text-slate-400 font-medium">{vital.unit}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: DIAGNOSIS */}
          <div className="w-full min-h-[100px] p-4 bg-white border border-slate-200 rounded-[12px] shadow-sm flex flex-col gap-2 group transition-colors hover:border-slate-300">
            <h3 className="text-[16px] font-semibold text-[#111827]">DIAGNOSIS</h3>
            <textarea 
              value={data.diagnosis}
              onChange={(e) => updateData({ diagnosis: e.target.value })}
              placeholder="Enter diagnosis..."
              className="w-full bg-transparent text-[#6B7280] text-[15px] leading-[1.6] placeholder:text-slate-300 resize-none outline-none focus:ring-0 flex-1"
            />
          </div>

          {/* Section 5: INVESTIGATIONS (RX) */}
          <div className="w-full p-4 bg-white border border-slate-200 rounded-[12px] shadow-sm flex flex-col gap-3 transition-colors hover:border-slate-300">
            <h3 className="text-[16px] font-semibold text-[#111827]">INVESTIGATIONS (RX)</h3>
            <textarea 
              value={data.investigations}
              onChange={(e) => updateData({ investigations: e.target.value })}
              placeholder="Type investigations..."
              className="w-full bg-transparent text-[#6B7280] text-[15px] leading-[1.6] placeholder:text-slate-300 resize-none outline-none focus:ring-0 h-[40px]"
            />
            <div className="flex flex-wrap gap-2 mt-1">
              {["CBC", "Blood Sugar", "Lipid Profile", "ECG", "Chest X-Ray", "Urine RME"].map((chip, idx) => (
                <button 
                  key={idx} 
                  onClick={() => appendToState("investigations", chip)}
                  className="h-[32px] px-3 bg-slate-50 border border-slate-200 rounded-[8px] text-[12px] font-semibold text-slate-600 hover:bg-[#2F80ED] hover:text-white hover:border-[#2F80ED] transition-colors flex items-center justify-center active:scale-95"
                >
                  + {chip}
                </button>
              ))}
            </div>
          </div>

          {/* Section 6: Rx Medicines */}
          <MedicineBuilder />

          {/* Section 7: ADVICE & DIET */}
          <div className="w-full min-h-[120px] p-4 bg-white border border-slate-200 rounded-[12px] shadow-sm flex flex-col gap-3 group transition-colors hover:border-slate-300">
            <h3 className="text-[16px] font-semibold text-[#111827]">ADVICE & DIET</h3>
            <textarea 
              value={data.advice}
              onChange={(e) => updateData({ advice: e.target.value })}
              placeholder="Type advice..."
              className="w-full bg-transparent text-[#6B7280] text-[15px] leading-[1.6] placeholder:text-slate-300 resize-none outline-none focus:ring-0 h-[60px]"
            />
            <div className="flex flex-wrap gap-2 mt-1">
              {["Drink Water", "Exercise", "Reduce Salt", "Avoid Smoking", "Diabetic Diet", "Low Fat Diet"].map((chip, idx) => (
                <button 
                  key={idx} 
                  onClick={() => appendToState("advice", chip)}
                  className="px-3 py-1.5 bg-slate-50 text-slate-600 text-[13px] rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors flex items-center gap-1.5"
                >
                  <Plus size={12} className="text-slate-400" />
                  {chip}
                </button>
              ))}
            </div>
          </div>

          {/* Section 8: FOLLOW-UP */}
          <div className="w-full p-4 bg-white border border-slate-200 rounded-[12px] shadow-sm flex flex-col gap-3 transition-colors hover:border-slate-300">
            <h3 className="text-[16px] font-semibold text-[#111827]">FOLLOW-UP</h3>
            <textarea 
              value={data.followUp}
              onChange={(e) => updateData({ followUp: e.target.value })}
              placeholder="Next visit instructions..."
              className="w-full bg-transparent text-[#6B7280] text-[15px] leading-[1.6] placeholder:text-slate-300 resize-none outline-none focus:ring-0 h-[40px]"
            />
            <div className="flex flex-wrap gap-2 mt-1">
              {["3 Days", "7 Days", "14 Days", "1 Month", "3 Months"].map((chip, idx) => (
                <button 
                  key={idx} 
                  onClick={() => appendToState("followUp", chip)}
                  className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-[8px] text-[12px] font-medium text-slate-600 hover:bg-[#2F80ED] hover:text-white hover:border-[#2F80ED] transition-colors active:scale-95"
                >
                  + {chip}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
