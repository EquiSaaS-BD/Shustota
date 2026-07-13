"use client";

import { useState } from "react";
import { mockEducation } from "@/lib/doctorMockData";
import { 
  GraduationCap, 
  Award, 
  CheckCircle2, 
  Clock, 
  Plus, 
  Edit2, 
  Trash2,
  FileText
} from "lucide-react";

export default function EducationSettingsPage() {
  const [education, setEducation] = useState(mockEducation);

  return (
    <div className="space-y-8 animate-fade-in-up">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">Education & Certifications</h1>
          <p className="text-slate-500 mt-1">Manage your academic degrees and professional certifications.</p>
        </div>
        <button className="px-5 py-2.5 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl shadow-md transition-all flex items-center gap-2 shrink-0 w-fit">
          <Plus size={18} />
          Add Education
        </button>
      </div>

      {/* Education List (Timeline Style) */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
        <div className="relative border-l-2 border-slate-100 ml-4 space-y-10">
          
          {education.map((item, index) => (
            <div key={item.id} className="relative pl-8 group">
              
              {/* Timeline dot */}
              <div className="absolute -left-[17px] top-1 w-8 h-8 bg-white border-2 border-primary rounded-full flex items-center justify-center shadow-sm">
                <GraduationCap size={16} className="text-primary" />
              </div>

              <div className="flex flex-col md:flex-row gap-4 justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold text-slate-800">{item.degree}</h3>
                  <p className="text-slate-600 mt-1">{item.institution}</p>
                  
                  <div className="flex items-center gap-4 mt-3">
                    <span className="text-sm font-semibold text-slate-400 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-100">
                      Year: {item.year}
                    </span>
                    
                    {item.status === "Verified" ? (
                      <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100">
                        <CheckCircle2 size={14} /> Verified
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-100">
                        <Clock size={14} /> Pending Verification
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button className="p-2 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors" title="Upload Document">
                    <FileText size={18} />
                  </button>
                  <button className="p-2 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors">
                    <Edit2 size={18} />
                  </button>
                  <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
      
    </div>
  );
}
