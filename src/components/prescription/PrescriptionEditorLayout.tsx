"use client";

import React, { useState } from "react";
import { PanelLeftClose, PanelLeftOpen, PanelRightClose, PanelRightOpen } from "lucide-react";

export function PrescriptionEditorLayout({
  topbar,
  editor,
  aiPanel,
}: {
  topbar?: React.ReactNode;
  editor: React.ReactNode;
  aiPanel: React.ReactNode;
}) {
  const [rightCollapsed, setRightCollapsed] = useState(false);

  return (
    <div className="flex flex-col min-h-screen xl:h-screen xl:overflow-hidden bg-[#F8FAFC]">
      <div className="flex-1 flex flex-col xl:flex-row w-full relative h-auto xl:h-full">
        
        {/* Unified Editor & AI Panel Container */}
        <div className="flex-1 flex flex-col h-auto xl:h-full relative transition-all duration-300 w-full">
          
          {topbar && (
            <div className="w-full shrink-0 z-30 bg-white">
              {topbar}
            </div>
          )}

          <div className="flex-1 flex flex-col xl:flex-row min-h-0">
            {/* Center - Smart Editor */}
            <div className="flex-1 flex flex-col min-w-0 bg-white h-auto xl:h-full min-h-[600px] relative z-10">
            
            <button 
              onClick={() => setRightCollapsed(!rightCollapsed)}
              className="hidden xl:flex absolute top-1/2 -translate-y-1/2 -right-3.5 w-7 h-14 bg-white border border-slate-200 rounded-l-lg shadow-sm items-center justify-center text-slate-400 hover:text-purple-500 z-20 transition-colors"
            >
              {rightCollapsed ? <PanelRightOpen size={16} /> : <PanelRightClose size={16} />}
            </button>

            <div className="flex-1 overflow-visible xl:overflow-hidden h-auto xl:h-full">
              {editor}
            </div>
          </div>

          {/* Right - AI Assistance Panel (Attached to Editor) */}
          <div className={`transition-all duration-300 ease-in-out overflow-y-visible xl:overflow-y-auto custom-scrollbar flex-shrink-0 flex flex-col h-auto xl:h-full bg-white/70 backdrop-blur-xl border-l border-slate-200 z-0
            ${rightCollapsed ? 'w-0 opacity-0 overflow-hidden border-none' : 'w-full xl:w-[400px] opacity-100'}
          `}>
            {aiPanel}
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
