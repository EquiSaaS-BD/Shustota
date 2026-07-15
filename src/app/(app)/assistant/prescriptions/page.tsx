"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, Search, Printer, Send, CheckCircle2, Clock, 
  AlertCircle, ChevronRight, Activity
} from 'lucide-react';

const stats = [
  { title: "Pending Prescriptions", count: "12", icon: Clock, color: "text-[#F2994A]", bg: "bg-[#F2994A]/10" },
  { title: "Urgent", count: "3", icon: AlertCircle, color: "text-[#EB5757]", bg: "bg-[#EB5757]/10" },
  { title: "Completed Today", count: "45", icon: CheckCircle2, color: "text-[#6DDA6E]", bg: "bg-[#6DDA6E]/10" },
];

const prescriptions = [
  { id: "PR-9012", patient: "Salma Akter", doctor: "Dr. Farzana Alam", diagnosis: "Prenatal Checkup", time: "10:15 AM", priority: "Normal", status: "Pending" },
  { id: "PR-9013", patient: "Abdul Karim", doctor: "Dr. Hasan", diagnosis: "Severe Angina", time: "10:20 AM", priority: "Urgent", status: "Pending" },
  { id: "PR-9011", patient: "Rahim Uddin", doctor: "Dr. Farzana Alam", diagnosis: "Viral Fever", time: "09:45 AM", priority: "Normal", status: "Completed" },
  { id: "PR-9010", patient: "Fatema Begum", doctor: "Dr. Salma Akter", diagnosis: "Asthma", time: "09:30 AM", priority: "Normal", status: "Completed" },
];

export default function PrescriptionQueuePage() {
  return (
    <div className="w-full flex flex-col gap-6 font-sans">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-[32px] font-[700] text-[#111827] tracking-tight">Prescription Queue</h1>
          <p className="text-[15px] text-[#6B7280] mt-1">Manage, print, and process doctor prescriptions.</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.4 }}
            className="bg-white rounded-[16px] p-6 shadow-[0_4px_16px_rgba(0,0,0,0.06)] border border-[#E5E7EB] flex items-center gap-5 hover:-translate-y-1 transition-transform"
          >
            <div className={`w-[56px] h-[56px] rounded-[14px] flex items-center justify-center shrink-0 ${stat.bg}`}>
              <stat.icon size={28} className={stat.color} />
            </div>
            <div>
              <span className="text-[14px] font-[600] text-[#6B7280] uppercase tracking-wider block mb-1">{stat.title}</span>
              <h3 className="text-[32px] font-[700] text-[#111827] leading-none">{stat.count}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Table */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="bg-white rounded-[16px] shadow-[0_4px_16px_rgba(0,0,0,0.06)] border border-[#E5E7EB] flex flex-col overflow-hidden min-h-[500px]"
      >
        <div className="p-6 border-b border-[#E5E7EB] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white z-10">
          <h2 className="text-[20px] font-[600] text-[#111827] flex items-center gap-2"><FileText size={20} className="text-[#2F80ED]"/> Queue List</h2>
          <div className="relative w-full sm:w-[300px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280]" size={18} />
            <input 
              type="text" 
              placeholder="Search ID or Patient..." 
              className="w-full h-[44px] bg-[#F8FAFC] border border-[#E5E7EB] rounded-[12px] pl-11 pr-4 text-[14px] text-[#111827] focus:outline-none focus:border-[#2F80ED] focus:ring-1 focus:ring-[#2F80ED] transition-all placeholder:text-[#6B7280]"
            />
          </div>
        </div>

        <div className="flex-1 overflow-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead className="bg-[#F8FAFC] border-b border-[#E5E7EB]">
              <tr className="text-[13px] text-[#6B7280] font-[600] h-[48px] uppercase tracking-wider">
                <th className="px-6 py-3 whitespace-nowrap">ID / Patient</th>
                <th className="px-6 py-3 whitespace-nowrap">Diagnosis / Doctor</th>
                <th className="px-6 py-3 whitespace-nowrap">Time</th>
                <th className="px-6 py-3 whitespace-nowrap">Priority</th>
                <th className="px-6 py-3 whitespace-nowrap">Status</th>
                <th className="px-6 py-3 whitespace-nowrap text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-[14px]">
              {prescriptions.map((item, i) => (
                <tr key={i} className="border-b border-[#E5E7EB] hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className="font-[600] text-[#111827] text-[15px]">{item.patient}</span>
                      <span className="text-[13px] text-[#6B7280]">{item.id}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className="font-[600] text-[#111827] flex items-center gap-1.5"><Activity size={14} className="text-[#6DDA6E]"/> {item.diagnosis}</span>
                      <span className="text-[13px] text-[#6B7280]">{item.doctor}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-[500] text-[#111827] flex items-center gap-1.5"><Clock size={14} className="text-[#6B7280]"/> {item.time}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge type={item.priority === 'Urgent' ? 'error' : 'neutral'}>{item.priority}</Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge type={item.status === 'Completed' ? 'success' : 'warning'}>{item.status}</Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {item.status === 'Pending' && (
                        <>
                          <button className="h-[36px] px-3 bg-white border border-[#E5E7EB] text-[#111827] text-[13px] font-[600] rounded-[8px] hover:border-[#2F80ED] hover:text-[#2F80ED] transition-colors flex items-center gap-1.5 shadow-sm">
                            <Send size={14} /> Send
                          </button>
                          <button className="h-[36px] px-3 bg-[#6DDA6E] text-white text-[13px] font-[600] rounded-[8px] hover:bg-[#5bc95c] transition-colors flex items-center gap-1.5 shadow-[0_2px_8px_rgba(109,218,110,0.3)]">
                            <CheckCircle2 size={14} /> Complete
                          </button>
                        </>
                      )}
                      {item.status === 'Completed' && (
                        <button className="h-[36px] px-3 bg-white border border-[#E5E7EB] text-[#111827] text-[13px] font-[600] rounded-[8px] hover:bg-slate-50 transition-colors flex items-center gap-1.5 shadow-sm">
                          <Printer size={14} /> Print
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
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
