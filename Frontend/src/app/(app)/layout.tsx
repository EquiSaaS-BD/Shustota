"use client";

import { useState } from "react";
import { Sidebar } from "@/components/chat/Sidebar";
import { ContextPanel } from "@/components/chat/ContextPanel";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contextPanelOpen, setContextPanelOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      
      {/* 1. Left Sidebar (Fixed 280px) */}
      <Sidebar 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)} 
      />
      
      {/* 2. Center Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        
        {/* Mobile Header (Only visible on lg and below) */}
        <header className="lg:hidden h-14 bg-white border-b border-slate-200 flex items-center justify-between px-4 shrink-0 z-20">
          <button 
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-lg"
          >
            <Menu size={24} />
          </button>
          <div className="font-semibold text-slate-800">Shustota AI</div>
          <div className="w-8" /> {/* Spacer for centering */}
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 overflow-hidden relative">
          {children}
        </main>
      </div>

      {/* 3. Right Context Panel (Conditional 360px) */}
      {/* We can pass context panel state down or manage it via global store (Zustand/Context). For now, it's structurally present. */}
      {pathname === "/chat" && contextPanelOpen && (
        <ContextPanel 
          isOpen={contextPanelOpen} 
          onClose={() => setContextPanelOpen(false)}
          title="Context Details"
        >
          <div className="text-sm text-slate-500 text-center mt-10">
            Contextual information (Doctor profiles, Medical Reports, etc.) will appear here.
          </div>
        </ContextPanel>
      )}
      
    </div>
  );
}
