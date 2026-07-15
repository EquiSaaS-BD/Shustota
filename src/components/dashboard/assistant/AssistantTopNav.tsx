import { Search, Bell, Menu } from 'lucide-react';
import Image from 'next/image';

export default function AssistantTopNav() {
  // Format current date e.g., Oct 24, 2026
  const currentDate = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <header className="h-[80px] bg-white border-b border-assistant-border flex items-center justify-between px-6 lg:px-10 shrink-0 sticky top-0 z-40 shadow-sm">
      
      {/* Left side: Doctor Profile & Chamber */}
      <div className="flex items-center gap-6">
        <div className="hidden md:flex flex-col">
          <h2 className="text-[15px] font-bold text-slate-800">Dr. Sarah Rahman</h2>
          <span className="text-[13px] text-slate-500">Chamber: City Hospital Unit 2</span>
        </div>
        <div className="hidden md:block h-10 w-[1px] bg-assistant-border"></div>
        <div className="hidden lg:flex flex-col">
          <span className="text-[13px] text-slate-500">Assistant Profile</span>
          <h3 className="text-[15px] font-semibold text-slate-700">Kamrul Hasan</h3>
        </div>
      </div>

      {/* Middle: Search */}
      <div className="flex-1 max-w-[420px] mx-4 hidden md:block relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
        <input 
          type="text" 
          placeholder="Search patient, ID, phone number..."
          className="w-full h-[48px] bg-assistant-bg border border-assistant-border rounded-[12px] pl-11 pr-4 text-[15px] text-slate-700 focus:outline-none focus:border-assistant-primary transition-all"
        />
      </div>

      {/* Right side: Actions */}
      <div className="flex items-center gap-4 lg:gap-6">
        <div className="hidden xl:block text-[14px] font-medium text-slate-500 mr-2">
          {currentDate}
        </div>

        <button className="h-[48px] px-6 bg-assistant-danger/10 text-assistant-danger rounded-[12px] font-semibold text-[15px] hover:bg-assistant-danger hover:text-white transition-all hidden sm:block">
          Emergency
        </button>
        
        <button className="relative p-2 text-slate-400 hover:text-assistant-primary transition-colors">
          <Bell size={24} />
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-assistant-danger rounded-full border-2 border-white"></span>
        </button>

        <div className="flex items-center gap-3 cursor-pointer">
          <div className="w-[48px] h-[48px] rounded-full overflow-hidden border-2 border-slate-100 relative bg-slate-200">
            <Image src="/images/signup-doctor.png" alt="Assistant" fill className="object-cover" />
          </div>
        </div>

        <button className="md:hidden text-slate-500">
          <Menu size={28} />
        </button>
      </div>

    </header>
  );
}
