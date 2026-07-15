import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, Users, Calendar, UserPlus, FileText, 
  Clock, CreditCard, Bell, BarChart3, Settings, LogOut 
} from 'lucide-react';
import Image from 'next/image';

const navItems = [
  { name: "Dashboard", href: "/assistant", icon: LayoutDashboard },
  { name: "Today's Queue", href: "/assistant/queue", icon: Users },
  { name: "Appointments", href: "/assistant/appointments", icon: Calendar },
  { name: "Walk-in Patients", href: "/assistant/walk-in", icon: UserPlus },
  { name: "Patient Management", href: "/assistant/patients", icon: FileText },
  { name: "Doctor Schedule", href: "/assistant/schedule", icon: Clock },
  { name: "Prescription Queue", href: "/assistant/prescriptions", icon: FileText },
  { name: "Payments", href: "/assistant/payments", icon: CreditCard },
  { name: "Notifications", href: "/assistant/notifications", icon: Bell },
  { name: "Reports", href: "/assistant/reports", icon: BarChart3 },
  { name: "Settings", href: "/assistant/settings", icon: Settings },
];

export default function AssistantSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[280px] h-screen bg-white border-r border-assistant-border flex flex-col flex-shrink-0 sticky top-0 left-0 overflow-hidden z-50">
      <div className="h-[80px] flex items-center px-6 border-b border-assistant-border shrink-0">
        <Link href="/">
          <Image src="/images/shustota ai logo.png" alt="Shustota AI" width={180} height={60} className="h-10 w-auto object-contain" />
        </Link>
      </div>
      
      <div className="flex-1 overflow-y-auto custom-scrollbar py-6 px-4 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.name} 
                href={item.href}
                className={`flex items-center gap-4 h-[52px] px-4 rounded-[14px] transition-all duration-200 ${
                  isActive 
                    ? "bg-assistant-primary text-white font-semibold shadow-[0_4px_12px_rgba(109,218,110,0.3)]" 
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                }`}
              >
                <item.icon size={22} className={isActive ? "text-white" : "text-slate-400"} />
                <span className="text-[15px]">{item.name}</span>
              </Link>
            )
          })}
        </div>
      </div>

      <div className="p-4 border-t border-assistant-border shrink-0">
        <button className="flex items-center gap-4 h-[52px] px-4 w-full rounded-[14px] text-assistant-danger hover:bg-red-50 transition-all font-medium">
          <LogOut size={22} />
          <span className="text-[15px]">Logout</span>
        </button>
      </div>
    </aside>
  );
}
