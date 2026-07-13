"use client";

import { 
  ShieldCheck, 
  Smartphone, 
  Mail, 
  Lock, 
  LogOut,
  Laptop
} from "lucide-react";

export default function SecuritySettingsPage() {
  return (
    <div className="space-y-8 animate-fade-in-up">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">Account & Security</h1>
        <p className="text-slate-500 mt-1">Manage your login credentials and secure your account.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Forms */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Email & Phone */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
            <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Mail size={20} className="text-primary" /> Contact Details
            </h2>
            <div className="space-y-5">
              <div>
                <label className="settings-label">Email Address</label>
                <div className="flex gap-3">
                  <input 
                    type="email" 
                    className="settings-input flex-1"
                    defaultValue="fazlul.haque@example.com"
                  />
                  <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-colors whitespace-nowrap">
                    Verify
                  </button>
                </div>
              </div>
              <div>
                <label className="settings-label">Phone Number</label>
                <input 
                  type="tel" 
                  className="settings-input"
                  defaultValue="+880 1711-XXXXXX"
                />
              </div>
              <button className="px-6 py-2.5 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl shadow-md transition-all">
                Update Contact
              </button>
            </div>
          </div>

          {/* Password */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
            <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Lock size={20} className="text-primary" /> Change Password
            </h2>
            <div className="space-y-5">
              <div>
                <label className="settings-label">Current Password</label>
                <input type="password" className="settings-input" placeholder="••••••••" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="settings-label">New Password</label>
                  <input type="password" className="settings-input" placeholder="••••••••" />
                </div>
                <div>
                  <label className="settings-label">Confirm New Password</label>
                  <input type="password" className="settings-input" placeholder="••••••••" />
                </div>
              </div>
              <button className="px-6 py-2.5 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl shadow-md transition-all">
                Update Password
              </button>
            </div>
          </div>

        </div>

        {/* Right Column: 2FA & Sessions */}
        <div className="space-y-6">
          
          {/* 2FA */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h3 className="font-bold text-slate-800">Two-Factor Auth</h3>
                <p className="text-xs text-slate-500 mt-1">Add an extra layer of security to your account.</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-sm font-semibold text-slate-700">Enable 2FA</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only toggle-checkbox peer" defaultChecked />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer toggle-label transition-colors after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
              </label>
            </div>
          </div>

          {/* Active Sessions */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h3 className="font-bold text-slate-800 mb-4">Active Sessions</h3>
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3">
                <Laptop size={20} className="text-primary shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-slate-800">MacBook Pro 16"</p>
                  <p className="text-xs text-emerald-500 font-medium">Active now (Dhaka, BD)</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Smartphone size={20} className="text-slate-400 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-slate-800">iPhone 13 Pro</p>
                  <p className="text-xs text-slate-500">Last active 2 hours ago</p>
                </div>
              </div>
            </div>
            <button className="w-full flex items-center justify-center gap-2 py-2.5 text-red-500 font-semibold bg-red-50 hover:bg-red-100 rounded-xl transition-colors">
              <LogOut size={16} /> Logout from all devices
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}
