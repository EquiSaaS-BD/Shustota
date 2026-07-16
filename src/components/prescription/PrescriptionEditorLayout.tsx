"use client";

import React, { useState } from "react";
import { PanelLeftClose, PanelLeftOpen, PanelRightClose, PanelRightOpen } from "lucide-react";

export function PrescriptionEditorLayout({
  topbar,
  sidebar,
  editor,
  aiPanel,
}: {
  topbar?: React.ReactNode;
  sidebar: React.ReactNode;
  editor: React.ReactNode;
  aiPanel: React.ReactNode;
}) {
  const [leftCollapsed, setLeftCollapsed] = useState(false);
  const [rightCollapsed, setRightCollapsed] = useState(false);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {topbar && (
        <div className="w-full shrink-0">
          {topbar}
        </div>
      )}
      <div className="flex-1 min-h-[calc(100vh-136px)] xl:h-full bg-[#F8FAFC] flex flex-col xl:flex-row gap-3 p-4 xl:p-6 overflow-x-hidden xl:overflow-hidden w-full relative">
        
        {/* Left Sidebar - Patient Context */}
        <div className={`transition-all duration-300 ease-in-out overflow-y-visible xl:overflow-y-auto custom-scrollbar flex-shrink-0 flex flex-col h-auto xl:h-full rounded-[16px]
          ${leftCollapsed ? 'w-0 opacity-0 overflow-hidden' : 'w-full xl:w-[220px] opacity-100'}
        `}>
          {sidebar}
        </div>

        {/* Center - Smart Editor */}
        <div className="flex-1 flex flex-col min-w-0 bg-white rounded-[18px] shadow-[0_4px_16px_rgba(15,23,42,0.08)] border border-[#E5E7EB] h-auto xl:h-full min-h-[600px] max-w-[800px] mx-auto w-full relative transition-all duration-300">
          
          {/* Collapse Toggles (Desktop only) */}
          <button 
            onClick={() => setLeftCollapsed(!leftCollapsed)}
            className="hidden xl:flex absolute top-1/2 -translate-y-1/2 -left-3.5 w-7 h-14 bg-white border border-slate-200 rounded-r-lg shadow-sm items-center justify-center text-slate-400 hover:text-[#2F80ED] z-10 transition-colors"
          >
            {leftCollapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
          </button>
          
          <button 
            onClick={() => setRightCollapsed(!rightCollapsed)}
            className="hidden xl:flex absolute top-1/2 -translate-y-1/2 -right-3.5 w-7 h-14 bg-white border border-slate-200 rounded-l-lg shadow-sm items-center justify-center text-slate-400 hover:text-purple-500 z-10 transition-colors"
          >
            {rightCollapsed ? <PanelRightOpen size={16} /> : <PanelRightClose size={16} />}
          </button>

          <div className="flex-1 overflow-hidden rounded-[18px]">
            {editor}
          </div>
        </div>

        {/* Right - AI Assistance Panel */}
        <div className={`transition-all duration-300 ease-in-out overflow-y-visible xl:overflow-y-auto custom-scrollbar flex-shrink-0 flex flex-col h-auto xl:h-full rounded-[16px] mt-4 xl:mt-0
          ${rightCollapsed ? 'w-0 opacity-0 overflow-hidden' : 'w-full xl:w-[320px] opacity-100'}
        `}>
          {aiPanel}
        </div>
      </div>
    </div>
  );
}
