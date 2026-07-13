"use client";

import { useState } from "react";
import { mockChambers } from "@/lib/doctorMockData";
import { 
  MapPin, 
  Clock, 
  CalendarDays, 
  Plus, 
  Edit2, 
  Trash2 
} from "lucide-react";

export default function ChambersSettingsPage() {
  const [chambers, setChambers] = useState(mockChambers);

  return (
    <div className="space-y-8 animate-fade-in-up">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">Chambers & Schedule</h1>
          <p className="text-slate-500 mt-1">Manage your consultation locations and available time slots.</p>
        </div>
        <button className="px-5 py-2.5 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl shadow-md transition-all flex items-center gap-2 shrink-0 w-fit">
          <Plus size={18} />
          Add New Chamber
        </button>
      </div>

      {/* Chambers List */}
      <div className="space-y-4">
        {chambers.map((chamber) => (
          <div key={chamber.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col md:flex-row gap-6 justify-between group hover:border-primary/30 transition-colors">
            <div className="space-y-4 flex-1">
              <div>
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <MapPin size={20} className="text-primary" />
                  {chamber.name}
                </h3>
                <p className="text-sm text-slate-500 mt-1 ml-7">{chamber.address}</p>
              </div>

              <div className="flex flex-wrap items-center gap-4 ml-7">
                <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                  <Clock size={16} className="text-slate-400" />
                  <span className="text-sm font-medium text-slate-700">{chamber.time}</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                  <CalendarDays size={16} className="text-slate-400" />
                  <span className="text-sm font-medium text-slate-700">{chamber.days.join(", ")}</span>
                </div>
              </div>

              {/* Visual Days Array */}
              <div className="flex gap-1.5 ml-7 mt-2">
                {["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"].map((day) => {
                  const isActive = chamber.days.includes(day);
                  return (
                    <div 
                      key={day} 
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-bold transition-colors
                        ${isActive ? "bg-emerald-100 text-emerald-700 border border-emerald-200" : "bg-slate-50 text-slate-400 border border-slate-100"}
                      `}
                    >
                      {day}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex items-start gap-2 shrink-0 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6">
              <button className="p-2 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors">
                <Edit2 size={18} />
              </button>
              <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
