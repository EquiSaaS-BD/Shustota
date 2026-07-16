"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Calendar, Clock, MapPin, User, Activity, FileText, ChevronRight, CheckCircle2, AlertCircle } from 'lucide-react';
import Image from 'next/image';

const mockPatients = [
  {
    id: "P-10023",
    name: "Kamal Hossain",
    age: 45,
    gender: "Male",
    type: "Appointment",
    date: "2026-10-24T09:30:00",
    status: "Completed",
    diagnosis: "Hypertension Stage 1",
    assistant: "Kamrul Hasan",
    paymentStatus: "Paid",
    avatar: "K"
  },
  {
    id: "P-10024",
    name: "Ayesha Siddiqua",
    age: 28,
    gender: "Female",
    type: "Walk-in",
    date: "2026-10-24T10:15:00",
    status: "Waiting",
    diagnosis: "Severe Migraine",
    assistant: "Aisha Begum",
    paymentStatus: "Pending",
    avatar: "A"
  },
  {
    id: "P-10025",
    name: "Rahim Uddin",
    age: 52,
    gender: "Male",
    type: "Online",
    date: "2026-10-24T11:00:00",
    status: "In Progress",
    diagnosis: "Post-surgery follow up",
    assistant: "System (Auto)",
    paymentStatus: "Paid",
    avatar: "R"
  },
  {
    id: "P-10026",
    name: "Nusrat Jahan",
    age: 34,
    gender: "Female",
    type: "Appointment",
    date: "2026-10-23T16:30:00",
    status: "Completed",
    diagnosis: "Viral Fever, Prescribed antibiotics",
    assistant: "Kamrul Hasan",
    paymentStatus: "Paid",
    avatar: "N"
  }
];

export default function DoctorPatientsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "Appointment", "Walk-in", "Online"];

  const filteredPatients = mockPatients.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === "All" || p.type === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-4 lg:p-8 space-y-8 bg-slate-50 min-h-[calc(100vh-80px)] w-full max-w-[1600px] mx-auto overflow-y-auto">
      
      {/* Header & Search Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-[28px] font-extrabold text-slate-800 tracking-tight">Patients & Appointments</h1>
          <p className="text-[15px] text-slate-500 font-medium mt-1">Manage all patient records synchronized with your front desk.</p>
        </div>
        
        {/* Premium Search Card */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative w-full lg:w-[480px] bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 p-2 flex items-center gap-2"
        >
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-slate-50 text-slate-400">
            <Search size={20} />
          </div>
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Patient Name or ID..."
            className="flex-1 bg-transparent border-none focus:outline-none text-[15px] text-slate-700 font-medium placeholder:text-slate-400 placeholder:font-normal"
          />
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-[13px] font-bold transition-colors">
            <Filter size={16} /> Filter
          </button>
        </motion.div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-3">
        {filters.map(filter => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-6 py-2.5 rounded-full text-[14px] font-bold transition-all duration-300 ${
              activeFilter === filter 
                ? "bg-slate-800 text-white shadow-md shadow-slate-800/20 scale-105" 
                : "bg-white text-slate-500 border border-slate-200 hover:bg-slate-50 hover:text-slate-700"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Patient List Grid */}
      <motion.div layout className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredPatients.map((patient, idx) => (
            <motion.div
              layout
              key={patient.id}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              transition={{ delay: idx * 0.05, duration: 0.3 }}
              className="bg-white rounded-[24px] border border-slate-100 shadow-sm hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] transition-all overflow-hidden flex flex-col group cursor-pointer"
            >
              {/* Card Top / Header */}
              <div className="p-6 pb-4 border-b border-slate-50 relative">
                {/* Status Badge */}
                <div className="absolute top-6 right-6">
                  {patient.status === "Completed" && <div className="px-3 py-1 rounded-full bg-[#22C55E]/10 text-[#22C55E] text-[12px] font-bold flex items-center gap-1.5 border border-[#22C55E]/20"><CheckCircle2 size={14}/> Completed</div>}
                  {patient.status === "Waiting" && <div className="px-3 py-1 rounded-full bg-[#F59E0B]/10 text-[#F59E0B] text-[12px] font-bold flex items-center gap-1.5 border border-[#F59E0B]/20"><Clock size={14}/> Waiting</div>}
                  {patient.status === "In Progress" && <div className="px-3 py-1 rounded-full bg-[#2F80ED]/10 text-[#2F80ED] text-[12px] font-bold flex items-center gap-1.5 border border-[#2F80ED]/20"><Activity size={14} className="animate-pulse"/> In Progress</div>}
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-[60px] h-[60px] rounded-[18px] bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-[24px] font-extrabold text-slate-600 shadow-inner">
                    {patient.avatar}
                  </div>
                  <div>
                    <h2 className="text-[18px] font-bold text-slate-800 leading-tight group-hover:text-[#2F80ED] transition-colors">{patient.name}</h2>
                    <span className="text-[13px] text-slate-500 font-medium mt-1 block">{patient.id} • {patient.gender}, {patient.age} yrs</span>
                  </div>
                </div>
              </div>

              {/* Card Middle / Details */}
              <div className="p-6 py-5 flex-1 flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 rounded-[12px] p-3 border border-slate-100">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Date & Time</span>
                    <span className="text-[13px] font-bold text-slate-700 flex items-center gap-1.5"><Calendar size={14} className="text-[#2F80ED]"/> {new Date(patient.date).toLocaleDateString()}</span>
                  </div>
                  <div className="bg-slate-50 rounded-[12px] p-3 border border-slate-100">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Visit Type</span>
                    <span className="text-[13px] font-bold text-slate-700 flex items-center gap-1.5">
                      {patient.type === 'Appointment' ? <Calendar size={14} className="text-[#F59E0B]"/> : <MapPin size={14} className="text-[#8B5CF6]"/>} 
                      {patient.type}
                    </span>
                  </div>
                </div>

                <div>
                  <span className="text-[12px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Primary Diagnosis / Reason</span>
                  <p className="text-[14px] text-slate-700 font-medium bg-slate-50/50 p-3 rounded-[12px] border border-slate-50 line-clamp-2">
                    {patient.diagnosis}
                  </p>
                </div>
              </div>

              {/* Card Bottom / Assistant Sync Info */}
              <div className="p-4 px-6 bg-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center">
                    <User size={12} className="text-slate-300" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider leading-none mb-1">Managed By (Desk)</span>
                    <span className="text-[12px] text-white font-semibold leading-none">{patient.assistant}</span>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center group-hover:bg-[#2F80ED] transition-colors">
                  <ChevronRight size={16} className="text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredPatients.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
          className="w-full flex flex-col items-center justify-center py-20 opacity-60"
        >
          <Search size={48} className="text-slate-300 mb-4" />
          <h3 className="text-[18px] font-bold text-slate-500">No patients found</h3>
          <p className="text-[14px] text-slate-400 mt-1">Try adjusting your search or filters</p>
        </motion.div>
      )}

    </div>
  );
}
