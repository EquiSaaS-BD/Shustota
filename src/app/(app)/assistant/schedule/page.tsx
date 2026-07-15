"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, Clock, User, Users, ChevronLeft, ChevronRight, 
  MapPin, Stethoscope, Video, MoreHorizontal, Filter
} from 'lucide-react';
import Image from 'next/image';

const doctors = [
  { id: 1, name: "Dr. Farzana Alam", dept: "Gynecology", image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop", status: "Available", booked: 28, remaining: 12 },
  { id: 2, name: "Dr. Hasan Mahmud", dept: "Cardiology", image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop", status: "In Surgery", booked: 15, remaining: 0 },
  { id: 3, name: "Dr. Salma Akter", dept: "Pediatrics", image: "https://images.unsplash.com/photo-1594824436998-d89775836c2e?w=150&h=150&fit=crop", status: "Available", booked: 42, remaining: 8 },
];

const schedule = [
  { time: "09:00 AM", doctor: "Dr. Farzana Alam", dept: "Gynecology", count: 5, status: "Completed" },
  { time: "10:00 AM", doctor: "Dr. Farzana Alam", dept: "Gynecology", count: 8, status: "In Progress" },
  { time: "11:00 AM", doctor: "Dr. Hasan Mahmud", dept: "Cardiology", count: 4, status: "Waiting" },
  { time: "12:00 PM", doctor: "Dr. Salma Akter", dept: "Pediatrics", count: 12, status: "Upcoming" },
  { time: "02:00 PM", doctor: "Dr. Farzana Alam", dept: "Gynecology", count: 7, status: "Upcoming" },
];

export default function DoctorSchedulePage() {
  return (
    <div className="w-full flex flex-col gap-6 font-sans">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-[32px] font-[700] text-[#111827] tracking-tight">Doctor Schedule</h1>
          <p className="text-[15px] text-[#6B7280] mt-1">Manage doctor availability, slots, and daily shifts.</p>
        </div>
        <div className="flex gap-3 bg-[#F8FAFC] p-1 rounded-[12px] border border-[#E5E7EB]">
          <button className="px-5 py-2 rounded-[10px] text-[14px] font-[600] bg-white text-[#111827] shadow-sm">Today</button>
          <button className="px-5 py-2 rounded-[10px] text-[14px] font-[600] text-[#6B7280] hover:text-[#111827]">Weekly</button>
        </div>
      </div>

      {/* Doctor Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doc, idx) => (
          <motion.div 
            key={doc.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.4 }}
            className="bg-white rounded-[16px] p-6 shadow-[0_4px_16px_rgba(0,0,0,0.06)] border border-[#E5E7EB] flex flex-col hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-4">
                <div className="w-[60px] h-[60px] rounded-full overflow-hidden border-2 border-[#F8FAFC] shadow-sm relative">
                  <Image src={doc.image} alt={doc.name} fill className="object-cover" />
                </div>
                <div>
                  <h3 className="text-[18px] font-[700] text-[#111827] leading-tight">{doc.name}</h3>
                  <span className="text-[14px] text-[#6B7280]">{doc.dept}</span>
                </div>
              </div>
              <button className="p-1.5 text-[#6B7280] hover:bg-slate-100 rounded-[8px] transition-colors"><MoreHorizontal size={18}/></button>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-[#F8FAFC] rounded-[12px] border border-[#E5E7EB] mb-4">
              <span className="text-[13px] font-[600] text-[#111827] flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${doc.status === 'Available' ? 'bg-[#6DDA6E]' : 'bg-[#EB5757]'}`}></span>
                {doc.status}
              </span>
              <span className="text-[13px] font-[500] text-[#6B7280]">10:00 AM - 05:00 PM</span>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-auto">
              <div className="flex flex-col">
                <span className="text-[12px] font-[600] text-[#6B7280] uppercase tracking-wider mb-1">Booked Slots</span>
                <span className="text-[24px] font-[700] text-[#2F80ED]">{doc.booked}</span>
              </div>
              <div className="flex flex-col border-l border-[#E5E7EB] pl-4">
                <span className="text-[12px] font-[600] text-[#6B7280] uppercase tracking-wider mb-1">Remaining</span>
                <span className={`text-[24px] font-[700] ${doc.remaining > 0 ? 'text-[#6DDA6E]' : 'text-[#EB5757]'}`}>{doc.remaining}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Schedule Table */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="bg-white rounded-[16px] shadow-[0_4px_16px_rgba(0,0,0,0.06)] border border-[#E5E7EB] flex flex-col overflow-hidden"
      >
        <div className="p-6 border-b border-[#E5E7EB] flex justify-between items-center bg-white z-10">
          <h2 className="text-[22px] font-[600] text-[#111827] flex items-center gap-2"><Clock size={22} className="text-[#F2994A]"/> Master Schedule View</h2>
          <button className="h-[40px] px-4 bg-slate-50 border border-[#E5E7EB] rounded-[10px] text-[#111827] font-[600] text-[13px] hover:bg-slate-100 transition-colors flex items-center gap-2">
            <Filter size={16} /> Filter by Dept
          </button>
        </div>

        <div className="w-full overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead className="bg-[#F8FAFC] border-b border-[#E5E7EB]">
              <tr className="text-[13px] text-[#6B7280] font-[600] h-[48px] uppercase tracking-wider">
                <th className="px-6 py-3 whitespace-nowrap">Time Slot</th>
                <th className="px-6 py-3 whitespace-nowrap">Doctor</th>
                <th className="px-6 py-3 whitespace-nowrap">Department</th>
                <th className="px-6 py-3 whitespace-nowrap">Patients</th>
                <th className="px-6 py-3 whitespace-nowrap">Status</th>
              </tr>
            </thead>
            <tbody className="text-[14px]">
              {schedule.map((slot, i) => (
                <tr key={i} className="border-b border-[#E5E7EB] hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-[700] text-[#111827] text-[15px] bg-[#F8FAFC] px-3 py-1.5 rounded-[8px] border border-[#E5E7EB]">{slot.time}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-[600] text-[#111827] flex items-center gap-2">
                       <div className="w-[32px] h-[32px] rounded-full bg-slate-200 shrink-0 border border-slate-300 flex items-center justify-center text-[12px] font-bold text-slate-500">{slot.doctor.charAt(4)}</div>
                       {slot.doctor}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-[14px] text-[#6B7280]">{slot.dept}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-[14px] font-[600] text-[#111827] flex items-center gap-1.5"><Users size={16} className="text-[#2F80ED]"/> {slot.count} Patients</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge type={slot.status === 'Completed' ? 'neutral' : slot.status === 'In Progress' ? 'success' : slot.status === 'Waiting' ? 'warning' : 'primary'}>
                      {slot.status === 'In Progress' && <span className="w-1.5 h-1.5 bg-[#6DDA6E] rounded-full mr-1.5 animate-pulse"></span>}
                      {slot.status}
                    </Badge>
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
