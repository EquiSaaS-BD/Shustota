"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, Filter, CalendarDays, CalendarClock, Ban, CheckCircle2,
  ListFilter, MoreHorizontal, ChevronLeft, ChevronRight, Video, MapPin, 
  Calendar as CalendarIcon
} from 'lucide-react';

const stats = [
  { title: "Today's Appointments", count: "48", icon: CalendarDays, color: "text-[#2F80ED]", bg: "bg-[#2F80ED]/10" },
  { title: "Upcoming", count: "124", icon: CalendarClock, color: "text-[#F2994A]", bg: "bg-[#F2994A]/10" },
  { title: "Completed", count: "32", icon: CheckCircle2, color: "text-[#6DDA6E]", bg: "bg-[#6DDA6E]/10" },
  { title: "Cancelled", count: "4", icon: Ban, color: "text-[#EB5757]", bg: "bg-[#EB5757]/10" },
];

const mockAppointments = [
  { id: "APT-2901", patient: "Rahim Uddin", doctor: "Dr. Farzana Alam", dept: "Gynecology", date: "Today", time: "09:15 AM", type: "Walk-in", status: "Completed", payment: "Paid" },
  { id: "APT-2902", patient: "Fatema Begum", doctor: "Dr. Farzana Alam", dept: "Gynecology", date: "Today", time: "09:30 AM", type: "Online", status: "Confirmed", payment: "Due" },
  { id: "APT-2903", patient: "Salma Akter", doctor: "Dr. Hasan", dept: "Cardiology", date: "Tomorrow", time: "11:00 AM", type: "Online", status: "Confirmed", payment: "Paid" },
  { id: "APT-2904", patient: "Karim Mia", doctor: "Dr. Hasan", dept: "Cardiology", date: "Nov 26, 2026", time: "05:00 PM", type: "Walk-in", status: "Pending", payment: "Due" },
  { id: "APT-2905", patient: "Aisha Rahman", doctor: "Dr. Farzana Alam", dept: "Gynecology", date: "Today", time: "10:15 AM", type: "Walk-in", status: "Cancelled", payment: "Refunded" },
];

export default function AppointmentsPage() {
  const [activeTab, setActiveTab] = useState('list');
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="w-full flex flex-col gap-6 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-[32px] font-[700] text-[#111827] tracking-tight">Appointments</h1>
          <p className="text-[15px] text-[#6B7280] mt-1">Manage all incoming and past appointments.</p>
        </div>
        <div className="flex bg-[#F8FAFC] p-1 rounded-[12px] border border-[#E5E7EB]">
          <button 
            onClick={() => setActiveTab('list')}
            className={`px-5 py-2 rounded-[10px] text-[14px] font-[600] transition-all ${activeTab === 'list' ? 'bg-white text-[#111827] shadow-sm' : 'text-[#6B7280] hover:text-[#111827]'}`}
          >
            List View
          </button>
          <button 
            onClick={() => setActiveTab('calendar')}
            className={`px-5 py-2 rounded-[10px] text-[14px] font-[600] transition-all ${activeTab === 'calendar' ? 'bg-white text-[#111827] shadow-sm' : 'text-[#6B7280] hover:text-[#111827]'}`}
          >
            Calendar View
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05, duration: 0.4 }}
            className="bg-white rounded-[16px] p-6 shadow-[0_4px_16px_rgba(0,0,0,0.06)] border border-[#E5E7EB] flex items-center gap-5 hover:-translate-y-1 transition-transform"
          >
            <div className={`w-[48px] h-[48px] rounded-[12px] flex items-center justify-center shrink-0 ${stat.bg}`}>
              <stat.icon size={24} className={stat.color} />
            </div>
            <div>
              <span className="text-[14px] font-[500] text-[#6B7280] block mb-1">{stat.title}</span>
              <h3 className="text-[28px] font-[700] text-[#111827] leading-none">{stat.count}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Table Content */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="bg-white rounded-[16px] shadow-[0_4px_16px_rgba(0,0,0,0.06)] border border-[#E5E7EB] flex flex-col overflow-hidden min-h-[600px]"
      >
        {/* Toolbar */}
        <div className="p-6 border-b border-[#E5E7EB] flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-white z-10">
          <div className="flex flex-wrap gap-2">
            <FilterChip label="Today" active={true} />
            <FilterChip label="Tomorrow" />
            <FilterChip label="This Week" />
            <div className="h-8 w-px bg-[#E5E7EB] mx-1"></div>
            <FilterChip label="All Doctors" icon={<ListFilter size={14}/>} />
            <FilterChip label="Status" icon={<ListFilter size={14}/>} />
          </div>
          
          <div className="relative w-full lg:w-[320px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280]" size={18} />
            <input 
              type="text" 
              placeholder="Search patient, ID, or phone..." 
              className="w-full h-[44px] bg-[#F8FAFC] border border-[#E5E7EB] rounded-[12px] pl-11 pr-4 text-[14px] text-[#111827] focus:outline-none focus:border-[#6DDA6E] focus:ring-1 focus:ring-[#6DDA6E] transition-all placeholder:text-[#6B7280]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead className="sticky top-0 bg-[#F8FAFC] z-10 border-b border-[#E5E7EB]">
              <tr className="text-[13px] text-[#6B7280] font-[600] h-[48px] uppercase tracking-wider">
                <th className="px-6 py-3 whitespace-nowrap">ID / Patient</th>
                <th className="px-6 py-3 whitespace-nowrap">Doctor & Dept</th>
                <th className="px-6 py-3 whitespace-nowrap">Schedule</th>
                <th className="px-6 py-3 whitespace-nowrap">Type</th>
                <th className="px-6 py-3 whitespace-nowrap">Status</th>
                <th className="px-6 py-3 whitespace-nowrap">Payment</th>
                <th className="px-6 py-3 whitespace-nowrap text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-[14px]">
              {mockAppointments.map((apt, i) => (
                <tr key={i} className="border-b border-[#E5E7EB] hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className="font-[600] text-[#111827] text-[15px]">{apt.patient}</span>
                      <span className="text-[13px] text-[#6B7280]">{apt.id}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className="font-[600] text-[#111827]">{apt.doctor}</span>
                      <span className="text-[13px] text-[#6B7280]">{apt.dept}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className="font-[500] text-[#111827] flex items-center gap-1.5"><CalendarIcon size={14} className="text-[#6B7280]"/> {apt.date}</span>
                      <span className="text-[13px] text-[#6B7280] mt-0.5">{apt.time}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                     <span className="text-[13px] text-[#6B7280] flex items-center gap-1.5 font-[500]">
                        {apt.type === 'Online' ? <Video size={14} className="text-[#2F80ED]"/> : <MapPin size={14} className="text-[#F2994A]"/>} 
                        {apt.type}
                      </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge type={apt.status === 'Completed' ? 'success' : apt.status === 'Confirmed' ? 'primary' : apt.status === 'Cancelled' ? 'error' : 'warning'}>
                      {apt.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge type={apt.payment === 'Paid' ? 'success' : apt.payment === 'Due' ? 'warning' : 'neutral'}>
                      {apt.payment}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button className="p-2 text-[#6B7280] bg-slate-100 rounded-[8px] hover:bg-slate-200 transition-colors opacity-0 group-hover:opacity-100" title="Options">
                      <MoreHorizontal size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-[#E5E7EB] bg-white flex justify-between items-center z-10">
          <span className="text-[14px] text-[#6B7280]">Showing 1 to 5 of 172 entries</span>
          <div className="flex gap-2">
            <button className="w-8 h-8 flex items-center justify-center rounded-[8px] border border-[#E5E7EB] text-[#6B7280] disabled:opacity-50"><ChevronLeft size={16} /></button>
            <button className="w-8 h-8 flex items-center justify-center rounded-[8px] bg-[#6DDA6E] text-white font-[600]">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-[8px] border border-[#E5E7EB] text-[#6B7280] hover:bg-slate-50">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-[8px] border border-[#E5E7EB] text-[#6B7280] hover:bg-slate-50">3</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-[8px] border border-[#E5E7EB] text-[#6B7280]"><ChevronRight size={16} /></button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

const FilterChip = ({ label, active, icon }: { label: string, active?: boolean, icon?: React.ReactNode }) => {
  return (
    <button className={`px-4 py-2 rounded-[10px] text-[13px] font-[600] border transition-colors flex items-center gap-1.5 ${
      active 
        ? 'bg-[#111827] border-[#111827] text-white' 
        : 'bg-white border-[#E5E7EB] text-[#6B7280] hover:bg-slate-50'
    }`}>
      {icon} {label}
    </button>
  );
}

const Badge = ({ children, type }: { children: React.ReactNode, type: 'success' | 'warning' | 'error' | 'neutral' | 'primary' }) => {
  const styles = {
    success: "bg-[#6DDA6E]/10 text-[#6DDA6E] border border-[#6DDA6E]/20",
    warning: "bg-[#F2994A]/10 text-[#F2994A] border border-[#F2994A]/20",
    error: "bg-[#EB5757]/10 text-[#EB5757] border border-[#EB5757]/20",
    neutral: "bg-slate-100 text-[#6B7280] border border-[#E5E7EB]",
    primary: "bg-[#2F80ED]/10 text-[#2F80ED] border border-[#2F80ED]/20",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-[6px] text-[12px] font-[600] ${styles[type]}`}>
      {children}
    </span>
  );
};
