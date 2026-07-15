"use client";

import React from "react";
import AssistantSidebar from "@/components/dashboard/assistant/AssistantSidebar";
import AssistantTopNav from "@/components/dashboard/assistant/AssistantTopNav";

export default function AssistantLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-[#F7FAFC] font-sans">
      <AssistantSidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <AssistantTopNav />
        <main className="flex-1 overflow-y-auto custom-scrollbar p-6 lg:p-10 relative">
          <div className="max-w-[1600px] mx-auto w-full h-full pb-20">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
