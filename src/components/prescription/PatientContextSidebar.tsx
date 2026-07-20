import React from "react";
import { User, Activity, Clock, FileText, Pill, AlertTriangle } from "lucide-react";

export function PatientContextSidebar({ isDesktop = false }: { isDesktop?: boolean }) {
  return (
    <div className={`flex gap-4 w-full mb-2 ${isDesktop ? 'flex-col' : 'flex-col lg:flex-row'}`}>
      {/* Patient Profile Card */}
      <div className={`bg-white rounded-[12px] shadow-sm border border-slate-200 p-4 shrink-0 ${isDesktop ? 'w-full' : 'w-full lg:w-[350px]'}`}>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center border border-slate-200 overflow-hidden shrink-0">
            <User size={20} className="text-slate-400" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-slate-800 text-[15px] truncate">Rahim Uddin</h3>
            <p className="text-[12px] text-slate-500 font-medium">Male, 45 Years</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="bg-slate-50 rounded-lg p-2 border border-slate-100 flex flex-col justify-center">
            <p className="text-[9px] text-slate-500 uppercase font-semibold mb-0.5">Blood</p>
            <p className="font-bold text-slate-800 text-[12px]">O+ (Pos)</p>
          </div>
          <div className="bg-slate-50 rounded-lg p-2 border border-slate-100 flex flex-col justify-center">
            <p className="text-[9px] text-slate-500 uppercase font-semibold mb-0.5">WT/BMI</p>
            <p className="font-bold text-slate-800 text-[12px]">76kg/24.2</p>
          </div>
        </div>

        {/* Critical Info */}
        <div className={`grid ${isDesktop ? 'grid-cols-1' : 'grid-cols-2'} gap-2`}>
          <div className="flex items-start gap-1.5 bg-red-50 text-red-700 p-2 rounded-lg border border-red-100">
            <AlertTriangle size={14} className="mt-0.5 shrink-0" />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider mb-0.5">Allergies</p>
              <p className="text-[11px] font-medium leading-tight line-clamp-1">Penicillin, Peanuts</p>
            </div>
          </div>
          <div className="flex items-start gap-1.5 bg-blue-50 text-blue-700 p-2 rounded-lg border border-blue-100">
            <Activity size={14} className="mt-0.5 shrink-0" />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider mb-0.5">Chronic</p>
              <p className="text-[11px] font-medium leading-tight line-clamp-1">Type 2 Diabetes, HTN</p>
            </div>
          </div>
        </div>
      </div>

      {/* Medical Timeline */}
      <div className="bg-white rounded-[12px] shadow-sm border border-slate-200 p-4 flex-1 flex flex-col">
        <h3 className="font-bold text-slate-800 text-[13px] mb-4 flex items-center gap-1.5">
          <Clock size={14} className="text-[#2F80ED]" />
          Medical Timeline
        </h3>
        
        <div className={`flex-1 overflow-x-auto custom-scrollbar ${isDesktop ? 'pb-2' : 'pb-1'}`}>
          <div className={`flex items-start ${isDesktop ? 'flex-col gap-4 pl-4 border-l-2 border-slate-100 ml-2' : 'gap-4 min-w-max'}`}>
            
            {/* Timeline Item 1 */}
            <div className={`flex relative ${isDesktop ? 'flex-col w-full' : 'flex-col min-w-[140px]'}`}>
              {isDesktop ? (
                <div className="absolute -left-[26px] top-0.5 w-3 h-3 rounded-full bg-[#6DDA6E] border-[3px] border-white shadow-sm" />
              ) : (
                <>
                  <div className="absolute top-1 -left-2 w-[calc(100%+16px)] h-0.5 bg-slate-100 -z-10" />
                  <div className="w-3 h-3 rounded-full bg-[#6DDA6E] border-[2px] border-white shadow-sm mb-2" />
                </>
              )}
              <p className="text-[10px] font-bold text-[#6DDA6E] mb-1">Today, 10:30 AM</p>
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-2 hover:border-[#6DDA6E]/50 transition-colors cursor-pointer group">
                <p className="text-[11px] font-bold text-slate-800 mb-0.5 group-hover:text-[#6DDA6E] transition-colors leading-tight">Current Appt</p>
                <p className="text-[10px] text-slate-500">Dr. Rafin</p>
              </div>
            </div>

            {/* Timeline Item 2 */}
            <div className={`flex relative ${isDesktop ? 'flex-col w-full' : 'flex-col min-w-[140px]'}`}>
              {isDesktop ? (
                <div className="absolute -left-[26px] top-0.5 w-3 h-3 rounded-full bg-[#2F80ED] border-[3px] border-white shadow-sm" />
              ) : (
                <>
                  <div className="absolute top-1 -left-2 w-[calc(100%+16px)] h-0.5 bg-slate-100 -z-10" />
                  <div className="w-3 h-3 rounded-full bg-[#2F80ED] border-[2px] border-white shadow-sm mb-2" />
                </>
              )}
              <p className="text-[10px] font-bold text-[#2F80ED] mb-1">12 Oct 2025</p>
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-2 hover:border-[#2F80ED]/50 transition-colors cursor-pointer group">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <FileText size={12} className="text-slate-400 group-hover:text-[#2F80ED]" />
                  <p className="text-[11px] font-bold text-slate-800 group-hover:text-[#2F80ED] transition-colors leading-tight">Lab: CBC</p>
                </div>
                <p className="text-[10px] text-slate-500 line-clamp-1">Hemoglobin low</p>
              </div>
            </div>

            {/* Timeline Item 3 */}
            <div className={`flex relative ${isDesktop ? 'flex-col w-full' : 'flex-col min-w-[140px]'}`}>
              {isDesktop ? (
                <div className="absolute -left-[26px] top-0.5 w-3 h-3 rounded-full bg-slate-300 border-[3px] border-white shadow-sm" />
              ) : (
                <>
                  <div className="absolute top-1 -left-2 w-full h-0.5 bg-slate-100 -z-10" />
                  <div className="w-3 h-3 rounded-full bg-slate-300 border-[2px] border-white shadow-sm mb-2" />
                </>
              )}
              <p className="text-[10px] font-bold text-slate-500 mb-1">05 Aug 2025</p>
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-2 hover:border-slate-300 transition-colors cursor-pointer group">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <Pill size={12} className="text-slate-400" />
                  <p className="text-[11px] font-bold text-slate-800 leading-tight">Previous Rx</p>
                </div>
                <p className="text-[10px] text-slate-500 line-clamp-1">Dr. Aminul Islam</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
