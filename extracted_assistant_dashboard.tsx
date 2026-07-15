"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Filter, Users, Clock, CheckCircle2, AlertCircle, 
  MoreVertical, Phone, Video, Stethoscope, ChevronLeft, ChevronRight,
  UserPlus, Play, FastForward, CalendarClock, Ban, MapPin
} from 'lucide-react';
import Image from 'next/image';

const stats = [
  { title: "Total Patients", count: "48", icon: Users, color: "text-[#2F80ED]", bg: "bg-[#2F80ED]/10" },
  { title: "Waiting", count: "14", icon: Clock, color: "text-[#F2994A]", bg: "bg-[#F2994A]/10" },
  { title: "In Consultation", count: "2", icon: Stethoscope, color: "text-[#6DDA6E]", bg: "bg-[#6DDA6E]/10" },
  { title: "Completed", count: "32", icon: CheckCircle2, color: "text-[#6B7280]", bg: "bg-slate-100" },
  { title: "Avg Waiting Time", count: "24m", icon: AlertCircle, color: "text-[#EB5757]", bg: "bg-[#EB5757]/10" },
];

const mockQueue = [
  { token: "S-01", name: "Rahim Uddin", age: 45, gender: "M", type: "Walk-in", doctor: "Dr. Farzana", time: "09:15 AM", estWait: "0m", priority: "Normal", status: "In Consultation" },
  { token: "S-02", name: "Fatema Begum", age: 32, gender: "F", type: "Online", doctor: "Dr. Farzana", time: "09:30 AM", estWait: "5m", priority: "High", status: "Waiting" },
  { token: "S-03", name: "Abdul Karim", age: 58, gender: "M", type: "Walk-in", doctor: "Dr. Farzana", time: "09:45 AM", estWait: "20m", priority: "Normal", status: "Waiting" },
  { token: "E-01", name: "Salma Akter", age: 28, gender: "F", type: "Emergency", doctor: "Dr. Farzana", time: "10:00 AM", estWait: "0m", priority: "Urgent", status: "Checking Vitals" },
  { token: "S-04", name: "Kamal Hossain", age: 50, gender: "M", type: "Online", doctor: "Dr. Farzana", time: "10:15 AM", estWait: "45m", priority: "Normal", status: "Waiting" },
];

export default function TodaysQueuePage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="w-full flex flex-col gap-6 font-sans">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-[32px] font-[700] text-[#111827] tracking-tight">Today's Queue</h1>
          <p className="text-[15px] text-[#6B7280] mt-1">Manage and monitor real-time patient flow.</p>
        </div>
        <div className="flex gap-3">
          <button className="h-[44px] px-5 bg-white border border-[#E5E7EB] rounded-[12px] text-[14px] font-[600] text-[#111827] shadow-[0_4px_16px_rgba(0,0,0,0.02)] hover:bg-slate-50 transition-colors flex items-center gap-2">
            <UserPlus size={18} className="text-[#6B7280]" /> Walk-in
          </button>
          <button className="h-[44px] px-6 bg-[#6DDA6E] text-white rounded-[12px] text-[14px] font-[600] shadow-[0_4px_16px_rgba(109,218,110,0.25)] hover:bg-[#5bc95c] transition-colors flex items-center gap-2">
            <Play size={18} fill="currentColor" /> Call Next
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
        {stats.map((stat, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05, duration: 0.4 }}
            className="bg-white rounded-[16px] p-6 shadow-[0_4px_16px_rgba(0,0,0,0.06)] border border-[#E5E7EB] flex flex-col justify-between h-[130px] hover:-translate-y-1 transition-transform"
          >
            <div className="flex justify-between items-start">
              <span className="text-[15px] font-[500] text-[#6B7280]">{stat.title}</span>
              <div className={`w-[36px] h-[36px] rounded-[10px] flex items-center justify-center ${stat.bg}`}>
                <stat.icon size={18} className={stat.color} />
              </div>
            </div>
            <h3 className="text-[32px] font-[700] text-[#111827] leading-none">{stat.count}</h3>
          </motion.div>
        ))}
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Left: Main Queue Table */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="xl:col-span-2 bg-white rounded-[16px] shadow-[0_4px_16px_rgba(0,0,0,0.06)] border border-[#E5E7EB] flex flex-col overflow-hidden min-h-[600px]"
        >
          {/* Table Toolbar */}
          <div className="p-6 border-b border-[#E5E7EB] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white z-10">
            <h2 className="text-[22px] font-[600] text-[#111827]">Patient Queue</h2>
            <div className="flex gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-[260px]">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280]" size={18} />
                <input 
                  type="text" 
                  placeholder="Search by token or name..." 
                  className="w-full h-[44px] bg-[#F8FAFC] border border-[#E5E7EB] rounded-[12px] pl-11 pr-4 text-[14px] text-[#111827] focus:outline-none focus:border-[#6DDA6E] focus:ring-1 focus:ring-[#6DDA6E] transition-all placeholder:text-[#6B7280]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button className="h-[44px] px-4 bg-white border border-[#E5E7EB] rounded-[12px] text-[#6B7280] hover:bg-slate-50 transition-colors flex items-center justify-center">
                <Filter size={18} />
              </button>
            </div>
          </div>

          {/* Table Container */}
          <div className="flex-1 overflow-auto custom-scrollbar">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead className="sticky top-0 bg-[#F8FAFC] z-10 border-b border-[#E5E7EB]">
                <tr className="text-[13px] text-[#6B7280] font-[600] h-[48px] uppercase tracking-wider">
                  <th className="px-6 py-3 whitespace-nowrap">Token</th>
                  <th className="px-6 py-3 whitespace-nowrap">Patient Details</th>
                  <th className="px-6 py-3 whitespace-nowrap">Time / Type</th>
                  <th className="px-6 py-3 whitespace-nowrap">Priority</th>
                  <th className="px-6 py-3 whitespace-nowrap">Status</th>
                  <th className="px-6 py-3 whitespace-nowrap text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-[14px]">
                {mockQueue.map((patient, i) => (
                  <tr key={i} className="border-b border-[#E5E7EB] hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-[16px] font-[700] ${patient.priority === 'Urgent' ? 'text-[#EB5757]' : 'text-[#111827]'}`}>
                        {patient.token}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="font-[600] text-[#111827] text-[15px]">{patient.name}</span>
                        <span className="text-[13px] text-[#6B7280]">{patient.age} Yrs • {patient.gender}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="font-[500] text-[#111827] flex items-center gap-1.5"><Clock size={14} className="text-[#6B7280]"/> {patient.time}</span>
                        <span className="text-[13px] text-[#6B7280] flex items-center gap-1.5 mt-0.5">
                          {patient.type === 'Online' ? <Video size={13} className="text-[#2F80ED]"/> : <MapPin size={13} className="text-[#F2994A]"/>} 
                          {patient.type}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge type={patient.priority === 'Urgent' ? 'error' : patient.priority === 'High' ? 'warning' : 'neutral'}>
                        {patient.priority}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge type={patient.status === 'In Consultation' ? 'success' : patient.status === 'Checking Vitals' ? 'primary' : 'neutral'}>
                        {patient.status === 'In Consultation' && <span className="w-1.5 h-1.5 bg-[#6DDA6E] rounded-full mr-1.5 animate-pulse"></span>}
                        {patient.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        {patient.status === 'Waiting' && (
                          <button className="p-2 text-[#2F80ED] bg-[#2F80ED]/10 rounded-[8px] hover:bg-[#2F80ED] hover:text-white transition-colors" title="Call">
                            <Phone size={16} />
                          </button>
                        )}
                        <button className="p-2 text-[#6B7280] bg-slate-100 rounded-[8px] hover:bg-slate-200 transition-colors" title="More">
                          <MoreVertical size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="p-4 border-t border-[#E5E7EB] bg-white flex justify-between items-center z-10">
            <span className="text-[14px] text-[#6B7280]">Showing 1 to 5 of 48 entries</span>
            <div className="flex gap-2">
              <button className="w-8 h-8 flex items-center justify-center rounded-[8px] border border-[#E5E7EB] text-[#6B7280] disabled:opacity-50"><ChevronLeft size={16} /></button>
              <button className="w-8 h-8 flex items-center justify-center rounded-[8px] bg-[#6DDA6E] text-white font-[600]">1</button>
              <button className="w-8 h-8 flex items-center justify-center rounded-[8px] border border-[#E5E7EB] text-[#6B7280] hover:bg-slate-50">2</button>
              <button className="w-8 h-8 flex items-center justify-center rounded-[8px] border border-[#E5E7EB] text-[#6B7280] hover:bg-slate-50">3</button>
              <button className="w-8 h-8 flex items-center justify-center rounded-[8px] border border-[#E5E7EB] text-[#6B7280]"><ChevronRight size={16} /></button>
            </div>
          </div>
        </motion.div>

        {/* Right Side Panel */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="xl:col-span-1 flex flex-col gap-6"
        >
          {/* Live Progress */}
          <div className="bg-white rounded-[16px] shadow-[0_4px_16px_rgba(0,0,0,0.06)] border border-[#E5E7EB] p-6">
            <h3 className="text-[18px] font-[600] text-[#111827] mb-4">Queue Progress</h3>
            <div className="w-full h-[8px] bg-[#F8FAFC] rounded-full overflow-hidden mb-3">
              <div className="h-full bg-[#6DDA6E] rounded-full w-[65%] shadow-[0_0_10px_rgba(109,218,110,0.5)]"></div>
            </div>
            <div className="flex justify-between items-center text-[14px]">
              <span className="text-[#6B7280]">32 of 48 completed</span>
              <span className="font-[600] text-[#111827]">65%</span>
            </div>
          </div>

          {/* Current Patient */}
          <div className="bg-gradient-to-br from-[#6DDA6E]/10 to-[#6DDA6E]/5 rounded-[16px] shadow-[0_4px_16px_rgba(0,0,0,0.06)] border border-[#6DDA6E]/20 p-6 relative overflow-hidden">
            <div className="absolute -right-6 -top-6 w-32 h-32 bg-[#6DDA6E]/10 rounded-full blur-2xl"></div>
            <span className="text-[13px] text-[#111827]/60 font-[600] uppercase tracking-wider mb-4 block">Current Patient</span>
            <div className="flex items-start gap-4">
              <div className="w-[64px] h-[64px] bg-white rounded-full flex items-center justify-center shadow-sm border border-[#6DDA6E]/30 shrink-0">
                <span className="text-[24px] font-[700] text-[#6DDA6E]">R</span>
              </div>
              <div>
                <h4 className="text-[24px] font-[700] text-[#111827] leading-none mb-2">Rahim Uddin</h4>
                <p className="text-[14px] text-[#6B7280]">Token: <strong className="text-[#111827]">S-01</strong></p>
                <div className="mt-3 flex gap-2">
                  <Badge type="success">Consulting (12m)</Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Next Patient */}
          <div className="bg-white rounded-[16px] shadow-[0_4px_16px_rgba(0,0,0,0.06)] border border-[#E5E7EB] p-6 relative overflow-hidden group">
            <span className="text-[13px] text-[#6B7280] font-[600] uppercase tracking-wider mb-4 block">Up Next</span>
            <div className="flex items-start gap-4">
              <div className="w-[56px] h-[56px] bg-[#F8FAFC] rounded-full flex items-center justify-center border border-[#E5E7EB] shrink-0">
                <span className="text-[20px] font-[600] text-[#6B7280]">F</span>
              </div>
              <div>
                <h4 className="text-[20px] font-[600] text-[#111827] leading-tight mb-1">Fatema Begum</h4>
                <p className="text-[14px] text-[#6B7280]">Token: <strong className="text-[#111827]">S-02</strong></p>
                <p className="text-[13px] text-[#2F80ED] font-[500] mt-1.5 flex items-center gap-1"><Clock size={12}/> Est. 5 mins</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3 mt-6">
              <button className="h-[40px] bg-slate-50 hover:bg-slate-100 border border-[#E5E7EB] text-[#111827] text-[13px] font-[600] rounded-[10px] transition-colors flex items-center justify-center gap-1.5">
                <Ban size={14} className="text-[#EB5757]" /> Skip
              </button>
              <button className="h-[40px] bg-[#6DDA6E]/10 hover:bg-[#6DDA6E] text-[#6DDA6E] hover:text-white text-[13px] font-[600] rounded-[10px] transition-all flex items-center justify-center gap-1.5">
                <FastForward size={14} /> Prepare
              </button>
            </div>
          </div>

        </motion.div>
      </div>
    </div>
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
