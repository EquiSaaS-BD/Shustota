"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, UserCheck, Clock, XCircle, DollarSign, Video, 
  Play, Pause, FastForward, SkipForward, AlertTriangle, 
  Phone, FileText, MoreVertical, Search, Plus, TrendingUp, TrendingDown, CheckCircle2, ChevronDown, X
} from 'lucide-react';
import Image from 'next/image';

const stats = [
  { title: "Today's Appointments", count: "42", trend: "+12%", trendUp: true, icon: Users, color: "text-[#6DDA6E]", bg: "bg-[#6DDA6E]/10" },
  { title: "Patients Waiting", count: "12", trend: "-2%", trendUp: false, icon: Clock, color: "text-[#F2994A]", bg: "bg-[#F2994A]/10" },
  { title: "Completed", count: "18", trend: "+4%", trendUp: true, icon: UserCheck, color: "text-[#2F80ED]", bg: "bg-[#2F80ED]/10" },
  { title: "Cancelled", count: "2", trend: "-1%", trendUp: false, icon: XCircle, color: "text-[#EB5757]", bg: "bg-[#EB5757]/10" },
  { title: "Revenue", count: "৳28K", trend: "+18%", trendUp: true, icon: DollarSign, color: "text-[#8B5CF6]", bg: "bg-[#8B5CF6]/10" },
  { title: "Online Consultation", count: "8", trend: "+5%", trendUp: true, icon: Video, color: "text-[#00C2A8]", bg: "bg-[#00C2A8]/10" },
];

const queue = [
  { id: "S-01", name: "Rahim Uddin", age: 45, gender: "M", phone: "01711...", time: "10:30 AM", type: "First Visit", symptoms: "Fever, Cough", status: "In Consultation", payment: "Paid" },
  { id: "S-02", name: "Fatema Begum", age: 32, gender: "F", phone: "01822...", time: "10:45 AM", type: "Follow Up", symptoms: "Headache", status: "Waiting", payment: "Pending" },
  { id: "S-03", name: "Korim Hossain", age: 58, gender: "M", phone: "01933...", time: "11:00 AM", type: "First Visit", symptoms: "Chest Pain", status: "Waiting", payment: "Paid", priority: true },
  { id: "S-04", name: "Nusrat Jahan", age: 24, gender: "F", phone: "01644...", time: "11:15 AM", type: "Report Show", symptoms: "Blood Test", status: "Delayed", payment: "Paid" },
];

export default function AssistantDashboardPage() {
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [showSwitchModal, setShowSwitchModal] = useState(false);

  return (
    <div className="w-full flex flex-col gap-6 relative min-h-[800px]">
      
      {/* 1. Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 md:gap-6">
        {stats.map((stat, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="group relative overflow-hidden bg-white rounded-[24px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 flex flex-col justify-between hover:-translate-y-1.5 transition-all duration-300 cursor-pointer"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white to-transparent opacity-50 pointer-events-none rounded-bl-full"></div>
            <div className="flex justify-between items-start mb-4">
              <div className={`w-[48px] h-[48px] rounded-[16px] flex items-center justify-center ${stat.bg} group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon size={24} className={stat.color} />
              </div>
              <span className={`flex items-center gap-1 text-[13px] font-semibold px-2.5 py-1 rounded-full ${stat.trendUp ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500'}`}>
                {stat.trendUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                {stat.trend}
              </span>
            </div>
            <div>
              <h3 className="text-[36px] font-[800] text-slate-800 tracking-tight leading-none mb-1.5">{stat.count}</h3>
              <p className="text-[14px] font-semibold text-slate-500">{stat.title}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 2. Middle Row: Live Queue & Doctor Status */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        
        {/* Live Queue Control (8 columns) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="xl:col-span-8 min-h-[240px] bg-gradient-to-br from-[#111827] to-[#1F2937] rounded-[24px] shadow-[0_8px_30px_rgba(17,24,39,0.15)] p-6 md:p-8 flex flex-col justify-between relative overflow-hidden"
        >
          {/* Decorative background element */}
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#6DDA6E]/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h2 className="text-[22px] font-bold text-white mb-1 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#6DDA6E] animate-pulse"></span>
                Live Queue Control
              </h2>
              <p className="text-[14px] text-slate-400">Avg. Consultation Time: <strong className="text-white">12 mins</strong></p>
            </div>
            <div className="text-left md:text-right w-full md:w-auto">
              <div className="flex justify-between md:justify-end gap-4 mb-2">
                <span className="text-[14px] text-slate-400">Progress</span>
                <span className="text-[14px] font-bold text-white">45%</span>
              </div>
              <div className="w-full md:w-[240px] h-[8px] bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-[#6DDA6E] rounded-full w-[45%] shadow-[0_0_10px_rgba(109,218,110,0.5)]"></div>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-end gap-8 md:gap-12">
            <div className="flex flex-col bg-white/5 p-4 rounded-[16px] border border-white/10 min-w-[160px]">
              <span className="text-[14px] text-slate-400 font-semibold mb-1 uppercase tracking-wider">Current Serial</span>
              <span className="text-[56px] font-[900] text-[#6DDA6E] leading-none tracking-tighter">S-01</span>
            </div>
            <div className="flex flex-col pb-2 relative">
              <span className="text-[14px] text-slate-400 font-semibold mb-1 uppercase tracking-wider">Next Serial</span>
              <button 
                onClick={() => setShowSwitchModal(!showSwitchModal)}
                className="flex items-center gap-2 group transition-all"
              >
                <span className="text-[32px] font-[800] text-slate-300 leading-none group-hover:text-white transition-colors">S-02</span>
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white group-hover:bg-white/20 transition-colors">
                  <ChevronDown size={18} />
                </div>
              </button>
              
              {/* Switch Modal Dropdown */}
              <AnimatePresence>
                {showSwitchModal && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-full left-0 mt-4 w-[280px] bg-white rounded-[16px] shadow-[0_12px_40px_rgba(0,0,0,0.2)] border border-slate-100 z-50 overflow-hidden"
                  >
                    <div className="px-4 py-3 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                      <h4 className="font-bold text-slate-800 text-[14px]">Switch Next Patient</h4>
                      <button onClick={() => setShowSwitchModal(false)} className="text-slate-400 hover:text-slate-600"><X size={16} /></button>
                    </div>
                    <div className="max-h-[240px] overflow-y-auto custom-scrollbar">
                      {queue.filter(p => p.status !== 'In Consultation').map((p) => (
                        <button key={p.id} onClick={() => setShowSwitchModal(false)} className="w-full text-left px-4 py-3 hover:bg-slate-50 border-b border-slate-50 flex justify-between items-center group transition-colors">
                          <div>
                            <p className="font-bold text-slate-800 text-[14px] group-hover:text-assistant-primary transition-colors">{p.name}</p>
                            <p className="text-[12px] text-slate-500">{p.id} • {p.time}</p>
                          </div>
                          <div className="w-6 h-6 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-assistant-primary group-hover:border-assistant-primary transition-colors">
                            <Plus size={12} className="text-transparent group-hover:text-white transition-colors" />
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <div className="flex-1 flex justify-start md:justify-end gap-3 z-10 flex-wrap w-full mt-6 md:mt-0">
              <button className="flex-1 md:flex-none h-[54px] px-4 md:px-6 bg-white/10 hover:bg-white/20 text-white rounded-[16px] font-semibold text-[14px] md:text-[15px] transition-all flex items-center justify-center gap-2 backdrop-blur-md">
                <SkipForward size={18} /> <span className="hidden sm:inline">Skip</span>
              </button>
              <button className="flex-1 md:flex-none h-[54px] px-4 md:px-6 bg-[#EB5757]/20 hover:bg-[#EB5757]/40 text-[#ff8080] border border-[#EB5757]/30 rounded-[16px] font-semibold text-[14px] md:text-[15px] transition-all flex items-center justify-center gap-2 backdrop-blur-md">
                <AlertTriangle size={18} /> <span className="hidden sm:inline">Emergency</span>
              </button>
              <button className="flex-1 md:flex-none h-[54px] px-4 md:px-6 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-[16px] font-semibold text-[14px] md:text-[15px] transition-all flex items-center justify-center gap-2 backdrop-blur-md">
                <CheckCircle2 size={18} /> <span className="hidden sm:inline">Complete</span>
              </button>
              <button className="flex-1 md:flex-none w-full md:w-auto h-[54px] px-8 bg-[#6DDA6E] hover:bg-[#5bc95c] text-[#111827] rounded-[16px] font-[800] text-[16px] transition-all shadow-[0_8px_24px_rgba(109,218,110,0.4)] hover:shadow-[0_12px_28px_rgba(109,218,110,0.6)] hover:-translate-y-1 flex items-center justify-center gap-2">
                <Play size={20} className="fill-[#111827]" /> Call Next
              </button>
            </div>
          </div>
        </motion.div>

        {/* Doctor Status Card (4 columns) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="xl:col-span-4 h-[240px] bg-white rounded-[20px] shadow-sm border border-slate-100 p-6 flex flex-col justify-between"
        >
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-[20px] font-bold text-slate-800">Doctor Status</h2>
            <span className="text-[13px] text-slate-400">Updated 2m ago</span>
          </div>

          <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-[16px] border border-slate-100">
            <div className="w-[60px] h-[60px] rounded-full overflow-hidden border-2 border-white shadow-sm relative shrink-0 bg-slate-200">
               <Image src="/images/signup-doctor.png" alt="Doctor" fill className="object-cover" />
            </div>
            <div>
              <h3 className="text-[16px] font-bold text-slate-800">Dr. Sarah Rahman</h3>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-[12px] h-[12px] bg-assistant-success rounded-full animate-pulse-subtle"></div>
                <span className="text-[14px] font-medium text-assistant-success">In Consultation</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-auto">
            <button className="h-[48px] bg-assistant-warning/10 text-assistant-warning rounded-[12px] font-semibold text-[14px] hover:bg-assistant-warning hover:text-white transition-all flex justify-center items-center gap-2">
              <Pause size={16} /> Pause
            </button>
            <button className="h-[48px] bg-slate-100 text-slate-600 rounded-[12px] font-semibold text-[14px] hover:bg-slate-200 transition-all flex justify-center items-center gap-2">
              <XCircle size={16} /> Close
            </button>
          </div>
        </motion.div>

      </div>

      {/* 3. Today's Queue Table */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="w-full bg-white rounded-[20px] shadow-sm border border-slate-100 overflow-hidden"
      >
        <div className="h-[76px] px-6 border-b border-slate-100 flex items-center justify-between bg-white">
          <h2 className="text-[20px] font-bold text-slate-800">Today's Queue</h2>
          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input type="text" placeholder="Search queue..." className="h-[44px] pl-9 pr-4 rounded-[12px] border border-slate-200 text-[14px] focus:border-assistant-primary outline-none transition-all w-[240px]" />
            </div>
            <button className="h-[44px] px-5 bg-slate-50 text-slate-600 font-semibold rounded-[12px] text-[14px] hover:bg-slate-100 border border-slate-200 transition-all">
              Filter
            </button>
          </div>
        </div>

        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100 text-[14px] text-slate-500 font-semibold h-[60px]">
                <th className="px-6 py-3 font-semibold w-[80px]">Serial</th>
                <th className="px-6 py-3 font-semibold min-w-[240px]">Patient Info</th>
                <th className="px-6 py-3 font-semibold">Time</th>
                <th className="px-6 py-3 font-semibold">Symptoms</th>
                <th className="px-6 py-3 font-semibold">Status</th>
                <th className="px-6 py-3 font-semibold">Payment</th>
                <th className="px-6 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-[15px]">
              {queue.map((row, i) => (
                <tr key={i} className="border-b border-slate-50 hover:bg-slate-50/80 transition-colors h-[72px] group">
                  <td className="px-6 py-4">
                    <span className={`font-bold ${row.priority ? 'text-assistant-danger' : 'text-slate-700'}`}>{row.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-[42px] h-[42px] bg-assistant-primary/10 rounded-full flex items-center justify-center text-assistant-primary font-bold">
                        {row.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 leading-tight">{row.name}</p>
                        <p className="text-[13px] text-slate-500 mt-0.5">{row.age} yrs • {row.gender} • {row.phone}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-700">{row.time}</td>
                  <td className="px-6 py-4">
                    <p className="text-slate-600 truncate max-w-[150px]">{row.symptoms}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1.5 rounded-full text-[13px] font-semibold inline-flex items-center gap-1.5
                      ${row.status === 'In Consultation' ? 'bg-assistant-primary/10 text-assistant-primary' : ''}
                      ${row.status === 'Waiting' ? 'bg-assistant-warning/10 text-assistant-warning' : ''}
                      ${row.status === 'Delayed' ? 'bg-assistant-danger/10 text-assistant-danger' : ''}
                    `}>
                      {row.status === 'In Consultation' && <span className="w-2 h-2 rounded-full bg-assistant-primary animate-pulse"></span>}
                      {row.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`font-medium ${row.payment === 'Paid' ? 'text-assistant-success' : 'text-slate-400'}`}>
                      {row.payment}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => setSelectedPatient(row)}
                        className="w-[40px] h-[40px] rounded-[10px] bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-assistant-secondary hover:border-assistant-secondary transition-colors"
                        title="View Details"
                      >
                        <FileText size={18} />
                      </button>
                      <button className="w-[40px] h-[40px] rounded-[10px] bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-assistant-primary hover:border-assistant-primary transition-colors">
                        <MoreVertical size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* 4. Floating Action Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <button className="w-[64px] h-[64px] bg-assistant-primary hover:bg-[#5bc95c] text-white rounded-full flex items-center justify-center shadow-[0_12px_24px_rgba(109,218,110,0.4)] transition-all hover:scale-105 group relative">
          <Plus size={28} className="group-hover:rotate-90 transition-transform duration-300" />
        </button>
      </div>

      {/* Patient Quick View Drawer */}
      <AnimatePresence>
        {selectedPatient && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPatient(null)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100]"
            />
            <motion.div
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 w-full md:w-[480px] h-screen bg-white shadow-[-8px_0_30px_rgba(0,0,0,0.1)] z-[101] flex flex-col"
            >
              {/* Drawer Header */}
              <div className="h-[80px] px-6 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-[40px] h-[40px] bg-assistant-primary/10 text-assistant-primary rounded-[12px] flex items-center justify-center font-bold text-[18px]">
                    {selectedPatient.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-[18px]">{selectedPatient.name}</h3>
                    <span className="text-[13px] text-slate-500 font-medium">{selectedPatient.id} • {selectedPatient.status}</span>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedPatient(null)}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-500 hover:bg-slate-100 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-8 custom-scrollbar">
                
                {/* Basic Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-4 rounded-[16px] border border-slate-100">
                    <span className="text-[12px] font-semibold text-slate-400 uppercase">Age & Gender</span>
                    <p className="font-bold text-slate-800 mt-1 text-[16px]">{selectedPatient.age} Yrs • {selectedPatient.gender}</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-[16px] border border-slate-100">
                    <span className="text-[12px] font-semibold text-slate-400 uppercase">Contact</span>
                    <p className="font-bold text-slate-800 mt-1 text-[16px]">{selectedPatient.phone}</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-[16px] border border-slate-100">
                    <span className="text-[12px] font-semibold text-slate-400 uppercase">Visit Type</span>
                    <p className="font-bold text-slate-800 mt-1 text-[16px]">{selectedPatient.type}</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-[16px] border border-slate-100">
                    <span className="text-[12px] font-semibold text-slate-400 uppercase">Payment Status</span>
                    <p className={`font-bold mt-1 text-[16px] ${selectedPatient.payment === 'Paid' ? 'text-assistant-success' : 'text-assistant-warning'}`}>{selectedPatient.payment}</p>
                  </div>
                </div>

                {/* Symptoms / Note */}
                <div>
                  <h4 className="font-bold text-slate-800 text-[15px] mb-3 flex items-center gap-2">
                    <FileText size={18} className="text-assistant-primary" /> Chief Complaints
                  </h4>
                  <div className="bg-[#e5effd] p-4 rounded-[16px] border border-[#d0e1fd]">
                    <p className="text-slate-700 text-[15px] leading-relaxed font-medium">
                      {selectedPatient.symptoms}. Patient reported feeling unwell since yesterday morning. Mild temperature observed at reception.
                    </p>
                  </div>
                </div>

                {/* Vitals (Mock) */}
                <div>
                  <h4 className="font-bold text-slate-800 text-[15px] mb-3 flex items-center gap-2">
                    <AlertTriangle size={18} className="text-assistant-warning" /> Triage Vitals
                  </h4>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="border border-slate-200 rounded-[12px] p-3 text-center">
                      <p className="text-[12px] text-slate-500 font-semibold mb-1">BP</p>
                      <p className="text-[15px] font-bold text-slate-800">120/80</p>
                    </div>
                    <div className="border border-slate-200 rounded-[12px] p-3 text-center">
                      <p className="text-[12px] text-slate-500 font-semibold mb-1">Temp</p>
                      <p className="text-[15px] font-bold text-slate-800">98.6°F</p>
                    </div>
                    <div className="border border-slate-200 rounded-[12px] p-3 text-center">
                      <p className="text-[12px] text-slate-500 font-semibold mb-1">Pulse</p>
                      <p className="text-[15px] font-bold text-slate-800">72 bpm</p>
                    </div>
                  </div>
                </div>

              </div>
              
              {/* Drawer Actions */}
              <div className="p-6 border-t border-slate-100 bg-white grid grid-cols-2 gap-3 shrink-0">
                <button className="h-[48px] border-2 border-slate-200 text-slate-600 font-bold rounded-[14px] hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
                  <Play size={18} /> Call Next
                </button>
                <button className="h-[48px] bg-assistant-primary text-white font-bold rounded-[14px] hover:bg-[#5bc95c] transition-colors shadow-[0_8px_20px_rgba(109,218,110,0.3)]">
                  Print Invoice
                </button>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
