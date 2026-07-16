"use client";

import React from "react";
import { Save, Check, Mic, Search } from "lucide-react";
import { useSearchParams } from "next/navigation";

interface PrescriptionTopbarProps {
  onFinalize: () => void;
  onPreview: () => void;
}

export function PrescriptionTopbar({ onFinalize, onPreview }: PrescriptionTopbarProps) {
  const searchParams = useSearchParams();
  const patientName = searchParams?.get('patientName') || "Select Patient";
  const patientId = searchParams?.get('patientId') || "N/A";
  const appointmentTime = searchParams?.get('appointmentTime') || "Quick Consult";
  const doctorName = "Dr. Rafin"; // Mock context
  const clinicName = "ABC Medical Center"; // Mock context

  return (
    <div className="bg-white border-b border-slate-200 px-6 h-[72px] flex items-center justify-between shrink-0 shadow-sm z-30">
      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-3 mb-1">
          <h2 className="font-bold text-slate-800 text-[16px]">Prescription Editor</h2>
          <span className="bg-amber-100 text-amber-700 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Draft</span>
        </div>
        
        {/* Dynamic Context Breadcrumb */}
        <div className="flex items-center gap-2 text-[12px] font-medium text-slate-500">
          <span className="text-[#2F80ED] font-bold">{patientName}</span>
          <span className="text-slate-300">•</span>
          <span>{appointmentTime}</span>
          <span className="text-slate-300">•</span>
          <span>{doctorName}</span>
          <span className="text-slate-300">•</span>
          <span>{clinicName}</span>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        {patientName === "Select Patient" && (
          <button className="flex items-center gap-2 text-sm font-bold text-[#2F80ED] bg-blue-50 px-3 py-2 rounded-[10px] hover:bg-blue-100 transition-colors h-[40px] mr-2">
            <Search size={16} />
            Search Patient
          </button>
        )}
        <button className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-800 px-3 py-2 rounded-xl hover:bg-slate-50 transition-colors h-[40px]">
          <Mic size={16} />
          Voice Note
        </button>
        
        <button className="flex items-center gap-2 text-sm font-bold text-slate-600 border border-slate-200 px-4 py-2 rounded-[10px] hover:bg-slate-50 transition-colors h-[40px]">
          <Save size={16} />
          Save Draft
        </button>
        
        <button onClick={onPreview} className="flex items-center gap-2 text-sm font-bold text-slate-600 border border-slate-200 px-4 py-2 rounded-[10px] hover:bg-slate-50 transition-colors h-[40px]">
          <Search size={16} />
          ভিউ (Preview)
        </button>
        
        <button onClick={onFinalize} className="flex items-center gap-2 text-sm font-bold text-white bg-[#6DDA6E] hover:bg-[#5bc95c] shadow-[0_4px_16px_rgba(109,218,110,0.2)] px-5 py-2 rounded-[10px] transition-all active:scale-95 h-[40px]">
          <Check size={16} strokeWidth={3} />
          Finalize
        </button>
      </div>
    </div>
  );
}
