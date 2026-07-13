"use client";

import { 
  Bell, 
  MessageSquare, 
  CalendarCheck, 
  Megaphone,
  Globe,
  Clock,
  Moon
} from "lucide-react";

const NotificationToggle = ({ title, desc, icon: Icon, defaultChecked = true }: any) => (
  <div className="flex items-center justify-between p-5 hover:bg-slate-50 transition-colors">
    <div className="flex items-center gap-4 flex-1 overflow-hidden pr-4">
      <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500 shrink-0">
        <Icon size={18} />
      </div>
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <h3 className="text-[15px] font-semibold text-slate-800 truncate">{title}</h3>
        <p className="text-[13px] text-slate-500 truncate mt-0.5">{desc}</p>
      </div>
    </div>
    <label className="relative inline-flex items-center cursor-pointer shrink-0 ml-2">
      <input type="checkbox" className="sr-only toggle-checkbox peer" defaultChecked={defaultChecked} />
      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer toggle-label transition-colors after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
    </label>
  </div>
);

export default function NotificationsSettingsPage() {
  return (
    <div className="space-y-8 animate-fade-in-up">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">Notifications & Preferences</h1>
        <p className="text-slate-500 mt-1">Customize how we communicate with you and personalize your experience.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Notifications */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <Bell size={20} className="text-primary" /> Push Notifications
            </h2>
          </div>
          <div className="divide-y divide-slate-100">
            <NotificationToggle 
              title="Appointment Reminders" 
              desc="Receive alerts 30 minutes before an upcoming online consultation." 
              icon={CalendarCheck} 
            />
            <NotificationToggle 
              title="Patient Messages" 
              desc="Get notified when a patient sends a direct message or report." 
              icon={MessageSquare} 
            />
            <NotificationToggle 
              title="System Updates" 
              desc="Alerts regarding platform maintenance and new features." 
              icon={Globe} 
            />
            <NotificationToggle 
              title="Marketing & Promos" 
              desc="Receive promotional emails and offers from Shustota AI." 
              icon={Megaphone} 
              defaultChecked={false}
            />
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
          <h2 className="text-lg font-bold text-slate-800 mb-6">Regional & Display</h2>
          
          <div className="space-y-6">
            <div>
              <label className="settings-label flex items-center gap-2">
                <Globe size={16} className="text-slate-400" /> Language
              </label>
              <select className="settings-input appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM5NGExYjIiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cG9seWxpbmUgcG9pbnRzPSI2IDkgMTIgMTUgMTggOSI+PC9wb2x5bGluZT48L3N2Zz4=')] bg-no-repeat bg-[position:right_1rem_center] bg-[length:1.25em_1.25em]">
                <option value="en">English (US)</option>
                <option value="bn">Bengali (বাংলা)</option>
              </select>
            </div>
            
            <div>
              <label className="settings-label flex items-center gap-2">
                <Clock size={16} className="text-slate-400" /> Timezone
              </label>
              <select className="settings-input appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM5NGExYjIiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cG9seWxpbmUgcG9pbnRzPSI2IDkgMTIgMTggOSI+PC9wb2x5bGluZT48L3N2Zz4=')] bg-no-repeat bg-[position:right_1rem_center] bg-[length:1.25em_1.25em]">
                <option value="Asia/Dhaka">Asia/Dhaka (GMT+6)</option>
                <option value="Asia/Kolkata">Asia/Kolkata (GMT+5:30)</option>
                <option value="UTC">UTC</option>
              </select>
            </div>

            <div>
              <label className="settings-label flex items-center gap-2">
                <Moon size={16} className="text-slate-400" /> Theme Preference
              </label>
              <div className="grid grid-cols-3 gap-3">
                <button className="py-2.5 text-sm font-semibold rounded-xl border-2 border-primary bg-primary/5 text-primary transition-all">
                  System
                </button>
                <button className="py-2.5 text-sm font-semibold rounded-xl border border-slate-200 bg-white text-slate-600 hover:border-slate-300 transition-all">
                  Light
                </button>
                <button className="py-2.5 text-sm font-semibold rounded-xl border border-slate-200 bg-slate-900 text-slate-400 hover:text-white transition-all">
                  Dark
                </button>
              </div>
            </div>
          </div>

          <button className="mt-8 px-6 py-2.5 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl shadow-md transition-all w-full">
            Save Preferences
          </button>
        </div>

      </div>
    </div>
  );
}
