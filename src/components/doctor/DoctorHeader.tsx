"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  Search,
  Bell,
  UserPlus,
  CalendarPlus,
  Menu,
  ShieldCheck,
  ChevronDown,
  Maximize,
  Minimize,
} from "lucide-react";
import { toast } from "sonner";

interface DoctorHeaderProps {
  onMenuClick: () => void;
}

export function DoctorHeader({ onMenuClick }: DoctorHeaderProps) {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        toast.error(`Error attempting to enable fullscreen mode: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  const notifications = [
    { id: 1, text: "New appointment request from Fatema Akter", time: "2 min ago", unread: true },
    { id: 2, text: "Lab report ready for Kamal Hossain", time: "15 min ago", unread: true },
    { id: 3, text: "Prescription approved for Abdul Matin", time: "1 hour ago", unread: false },
  ];

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <header className="h-16 bg-white border-b border-slate-200/80 flex items-center justify-between px-4 lg:px-6 shrink-0 z-30">
      {/* Left: Mobile menu + Search */}
      <div className="flex items-center gap-3 flex-1">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 -ml-1 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          <Menu size={22} />
        </button>

        {/* Search */}
        <div className="relative max-w-md flex-1 hidden sm:block">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search patients, appointments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-9 pr-4 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
          />
        </div>
      </div>

      {/* Right: Actions + Notifications + Profile */}
      <div className="flex items-center gap-2">
        {/* Quick Actions */}
        <button
          onClick={() => toast.success("Add Patient dialog coming soon!")}
          className="hidden md:flex items-center gap-1.5 h-9 px-3.5 bg-primary/8 text-primary text-[13px] font-medium rounded-lg hover:bg-primary/12 transition-colors"
        >
          <UserPlus size={15} />
          <span>Add Patient</span>
        </button>
        <button
          onClick={() => toast.success("New Appointment dialog coming soon!")}
          className="hidden md:flex items-center gap-1.5 h-9 px-3.5 bg-emerald-50 text-emerald-600 text-[13px] font-medium rounded-lg hover:bg-emerald-100 transition-colors"
        >
          <CalendarPlus size={15} />
          <span>New Appointment</span>
        </button>

        {/* Fullscreen Toggle */}
        <button
          onClick={toggleFullscreen}
          className="hidden sm:flex p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors"
          aria-label="Toggle Fullscreen"
        >
          {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Notifications"
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4.5 h-4.5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notification Dropdown */}
          {showNotifications && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />
              <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden z-50">
                <div className="px-4 py-3 border-b border-slate-100">
                  <h4 className="text-sm font-semibold text-slate-800">Notifications</h4>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`px-4 py-3 border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors cursor-pointer ${n.unread ? "bg-blue-50/30" : ""}`}
                    >
                      <p className="text-[13px] text-slate-700">{n.text}</p>
                      <p className="text-[11px] text-slate-400 mt-1">{n.time}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Separator */}
        <div className="w-px h-8 bg-slate-200 mx-1 hidden md:block" />

        {/* Doctor Profile */}
        <div className="flex items-center gap-2.5 pl-1">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white text-sm font-semibold">
            {user?.name?.charAt(0) || "D"}
          </div>
          <div className="hidden md:block">
            <p className="text-[13px] font-semibold text-slate-800 leading-tight">{user?.name || "Doctor"}</p>
            <div className="flex items-center gap-1">
              <ShieldCheck size={11} className="text-emerald-500" />
              <span className="text-[10.5px] text-emerald-600 font-medium">Verified</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
