"use client";

import { Moon, LogOut, Shield, Bell, User, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function SettingsPage() {
  return (
    <div className="h-full overflow-y-auto bg-white p-6 md:p-12">
      <div className="max-w-[700px] mx-auto">
        <h1 className="text-[28px] font-bold text-slate-900 mb-8">Settings</h1>
        
        <div className="space-y-6">
          
          {/* Account Section */}
          <section>
            <h2 className="text-[14px] font-bold text-slate-500 uppercase tracking-wider mb-3">Account</h2>
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
              <button className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors border-b border-slate-100 text-left">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                    <User size={20} />
                  </div>
                  <div>
                    <div className="font-medium text-slate-900">Personal Information</div>
                    <div className="text-[13px] text-slate-500">Name, email, and phone number</div>
                  </div>
                </div>
                <ChevronRight size={18} className="text-slate-400" />
              </button>
              <button className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors text-left">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                    <Shield size={20} />
                  </div>
                  <div>
                    <div className="font-medium text-slate-900">Security</div>
                    <div className="text-[13px] text-slate-500">Password and authentication</div>
                  </div>
                </div>
                <ChevronRight size={18} className="text-slate-400" />
              </button>
            </div>
          </section>

          {/* Preferences Section */}
          <section>
            <h2 className="text-[14px] font-bold text-slate-500 uppercase tracking-wider mb-3">Preferences</h2>
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
              <button className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors border-b border-slate-100 text-left">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                    <Moon size={20} />
                  </div>
                  <div>
                    <div className="font-medium text-slate-900">Theme</div>
                    <div className="text-[13px] text-slate-500">Switch between light and dark mode</div>
                  </div>
                </div>
                <ChevronRight size={18} className="text-slate-400" />
              </button>
              <button className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors text-left">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                    <Bell size={20} />
                  </div>
                  <div>
                    <div className="font-medium text-slate-900">Notifications</div>
                    <div className="text-[13px] text-slate-500">Manage email and push alerts</div>
                  </div>
                </div>
                <ChevronRight size={18} className="text-slate-400" />
              </button>
            </div>
          </section>

          {/* Danger Zone */}
          <section className="pt-4">
            <button className="w-full flex items-center gap-3 p-4 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl font-medium transition-colors text-left">
              <LogOut size={20} />
              Sign Out
            </button>
          </section>

        </div>
      </div>
    </div>
  );
}
