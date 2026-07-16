"use client";

import React, { useState } from "react";
import { MedicineBuilder } from "./MedicineBuilder";

interface SmartEditorAreaProps {
  onFinalize: () => void;
}

export function SmartEditorArea({ onFinalize }: SmartEditorAreaProps) {
  // States for text areas to allow chips to append text
  const [investigations, setInvestigations] = useState("");
  const [advice, setAdvice] = useState("");
  const [followUpNotes, setFollowUpNotes] = useState("");

  const appendToState = (setter: React.Dispatch<React.SetStateAction<string>>, currentVal: string, newText: string) => {
    setter(currentVal ? `${currentVal}, ${newText}` : newText);
  };

  return (
    <div className="flex flex-col h-full bg-white relative">
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 lg:p-8">
        <div className="max-w-[720px] mx-auto flex flex-col gap-5">
          
          {/* Section 1: CHIEF COMPLAINT */}
          <div className="w-full min-h-[100px] p-4 bg-white border border-slate-200 rounded-[12px] shadow-sm flex flex-col gap-2 group transition-colors hover:border-slate-300">
            <h3 className="text-[16px] font-semibold text-[#111827]">CHIEF COMPLAINT</h3>
            <textarea 
              placeholder="Describe the patient's primary complaints..."
              className="w-full bg-transparent text-[#6B7280] text-[15px] leading-[1.6] placeholder:text-slate-300 resize-none outline-none focus:ring-0 flex-1"
            />
          </div>

          {/* Section 2: PHYSICAL EXAM */}
          <div className="w-full min-h-[120px] p-4 bg-white border border-slate-200 rounded-[12px] shadow-sm flex flex-col gap-2 group transition-colors hover:border-slate-300">
            <h3 className="text-[16px] font-semibold text-[#111827]">PHYSICAL EXAM</h3>
            <textarea 
              placeholder="Document physical examination findings..."
              className="w-full bg-transparent text-[#6B7280] text-[15px] leading-[1.6] placeholder:text-slate-300 resize-none outline-none focus:ring-0 flex-1"
            />
          </div>

          {/* Section 3: VITALS TODAY */}
          <div className="w-full p-4 bg-white border border-slate-200 rounded-[12px] shadow-sm flex flex-col gap-3 transition-colors hover:border-slate-300">
            <h3 className="text-[16px] font-semibold text-[#111827]">VITALS TODAY</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { label: "Blood Pressure", unit: "mmHg", placeholder: "120/80" },
                { label: "Pulse", unit: "bpm", placeholder: "72" },
                { label: "Temperature", unit: "°F", placeholder: "98.6" },
                { label: "Weight", unit: "kg", placeholder: "70" },
                { label: "Height", unit: "cm", placeholder: "170" },
                { label: "BMI", unit: "kg/m²", placeholder: "24.2" },
                { label: "SpO₂", unit: "%", placeholder: "98" },
                { label: "Blood Sugar", unit: "mg/dL", placeholder: "110" },
              ].map((vital, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-100 rounded-[10px] p-2.5 flex flex-col justify-center h-[72px]">
                  <span className="text-[11px] font-semibold text-slate-500 mb-0.5">{vital.label}</span>
                  <div className="flex items-center gap-1">
                    <input 
                      type="text" 
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
              placeholder="Enter diagnosis..."
              className="w-full bg-transparent text-[#6B7280] text-[15px] leading-[1.6] placeholder:text-slate-300 resize-none outline-none focus:ring-0 flex-1"
            />
          </div>

          {/* Section 5: INVESTIGATIONS (RX) */}
          <div className="w-full p-4 bg-white border border-slate-200 rounded-[12px] shadow-sm flex flex-col gap-3 transition-colors hover:border-slate-300">
            <h3 className="text-[16px] font-semibold text-[#111827]">INVESTIGATIONS (RX)</h3>
            <textarea 
              value={investigations}
              onChange={(e) => setInvestigations(e.target.value)}
              placeholder="Type investigations..."
              className="w-full bg-transparent text-[#6B7280] text-[15px] leading-[1.6] placeholder:text-slate-300 resize-none outline-none focus:ring-0 h-[40px]"
            />
            <div className="flex flex-wrap gap-2 mt-1">
              {["CBC", "Blood Sugar", "Lipid Profile", "ECG", "Chest X-Ray", "Urine RME"].map((chip, idx) => (
                <button 
                  key={idx} 
                  onClick={() => appendToState(setInvestigations, investigations, chip)}
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
              value={advice}
              onChange={(e) => setAdvice(e.target.value)}
              placeholder="Write lifestyle advice, dietary recommendations, and patient instructions..."
              className="w-full bg-transparent text-[#6B7280] text-[15px] leading-[1.6] placeholder:text-slate-300 resize-none outline-none focus:ring-0 flex-1"
            />
            <div className="flex flex-wrap gap-2">
              {["Drink Water", "Exercise", "Reduce Salt", "Avoid Smoking", "Diabetic Diet", "Low Fat Diet"].map((chip, idx) => (
                <button 
                  key={idx} 
                  onClick={() => appendToState(setAdvice, advice, chip)}
                  className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-[8px] text-[12px] font-medium text-slate-600 hover:bg-[#6DDA6E] hover:text-white hover:border-[#6DDA6E] transition-colors active:scale-95"
                >
                  + {chip}
                </button>
              ))}
            </div>
          </div>

          {/* Section 8: FOLLOW-UP */}
          <div className="w-full min-h-[100px] p-4 bg-white border border-slate-200 rounded-[12px] shadow-sm flex flex-col gap-3 group transition-colors hover:border-slate-300">
            <h3 className="text-[16px] font-semibold text-[#111827]">FOLLOW-UP</h3>
            <div className="flex items-center gap-3">
              <input type="date" className="bg-slate-50 border border-slate-200 rounded-[8px] px-3 py-2 text-[13px] font-medium text-slate-700 outline-none focus:border-[#2F80ED]" />
              <input 
                type="text" 
                value={followUpNotes}
                onChange={(e) => setFollowUpNotes(e.target.value)}
                placeholder="Follow-up notes..." 
                className="flex-1 bg-slate-50 border border-slate-200 rounded-[8px] px-3 py-2 text-[13px] text-slate-700 outline-none focus:border-[#2F80ED]" 
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {["3 Days", "7 Days", "14 Days", "1 Month", "3 Months"].map((chip, idx) => (
                <button 
                  key={idx} 
                  onClick={() => appendToState(setFollowUpNotes, followUpNotes, chip)}
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
