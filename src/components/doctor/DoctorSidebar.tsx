"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  ClipboardList,
  FileBarChart,
  Pill,
  MessageSquare,
  Settings,
  LogOut,
  ShieldCheck,
  Lock,
  X,
  ChevronRight,
} from "lucide-react";

interface DoctorSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { label: "Dashboard", href: "/doctor/dashboard", icon: LayoutDashboard },
  { label: "Patient List", href: "/doctor/dashboard/patients", icon: Users },
  { label: "Appointments", href: "/doctor/dashboard/appointments", icon: CalendarDays },
  { label: "Prescriptions", href: "/doctor/dashboard/prescriptions", icon: ClipboardList },
  { label: "Reports & Diagnostics", href: "/doctor/dashboard/reports", icon: FileBarChart },
  { label: "Medicine Inventory", href: "/doctor/dashboard/medicines", icon: Pill },
  { label: "Messages", href: "/doctor/dashboard/messages", icon: MessageSquare },
  { label: "Settings", href: "/doctor/settings", icon: Settings },
];

export function DoctorSidebar({ isOpen, onClose }: DoctorSidebarProps) {
  const pathname = usePathname();
  const { logout, user } = useAuth();

  const isActive = (href: string) => {
    if (href === "/doctor/dashboard") return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-[280px] bg-white border-r border-slate-200/80
          flex flex-col h-full
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Logo Section */}
        <div className="h-16 px-6 flex items-center justify-between border-b border-slate-100 shrink-0">
          <Link href="/doctor/dashboard" className="flex items-center gap-2.5">
            <Image
              src="/images/shustota ai logo.png"
              alt="Shustota AI"
              width={36}
              height={36}
              className="rounded-lg"
            />
            <div>
              <span className="text-lg font-bold text-slate-800 tracking-tight">Shustota</span>
              <span className="text-[10px] font-medium text-primary bg-primary/8 px-1.5 py-0.5 rounded-full ml-1.5 uppercase tracking-wider">Doctor</span>
            </div>
          </Link>
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Doctor Quick Profile */}
        <div className="px-4 py-4 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-primary/5 to-blue-50 rounded-xl">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
              {user?.name?.charAt(0) || "D"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-800 truncate">{user?.name || "Doctor"}</p>
              <div className="flex items-center gap-1 mt-0.5">
                <ShieldCheck size={12} className="text-emerald-500" />
                <span className="text-[11px] text-emerald-600 font-medium">Verified Doctor</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1 scrollbar-thin">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`
                  doctor-sidebar-item flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13.5px] font-medium
                  ${active
                    ? "bg-primary/8 text-primary active"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-800"
                  }
                `}
              >
                <item.icon size={18} strokeWidth={active ? 2.2 : 1.8} />
                <span className="flex-1">{item.label}</span>
                {active && <ChevronRight size={14} className="opacity-50" />}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="px-3 pb-4 space-y-2 shrink-0 border-t border-slate-100 pt-3">
          {/* Doctor Access Badge */}
          <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-lg">
            <Lock size={13} className="text-slate-400" />
            <span className="text-[11px] text-slate-500 font-medium">Doctor Access Only</span>
          </div>

          {/* Logout */}
          <button
            onClick={logout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13.5px] font-medium text-red-500 hover:bg-red-50 transition-colors w-full"
          >
            <LogOut size={18} strokeWidth={1.8} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
