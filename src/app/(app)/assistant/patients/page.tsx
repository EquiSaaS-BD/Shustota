"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Filter, UserSearch, FileText, Phone, Activity, 
  Clock, MoreVertical, X, Calendar, ClipboardList, Stethoscope, ChevronRight, Download
} from 'lucide-react';
import Image from 'next/image';

const mockPatients = [
  { id: "P-10021", name: "Rahim Uddin", age: 45, phone: "01711223344", history: "Hypertension, Diabetes", lastVisit: "12 Oct, 2026", doctor: "Dr. Farzana Alam", status: "Active" },
  { id: "P-10022", name: "Fatema Begum", age: 32, phone: "01822334455", history: "Asthma", lastVisit: "05 Nov, 2026", doctor: "Dr. Hasan", status: "Active" },
  { id: "P-10023", name: "Abdul Karim", age: 58, phone: "01933445566", history: "None", lastVisit: "20 Aug, 2026", doctor: "Dr. Farzana Alam", status: "Inactive" },
  { id: "P-10024", name: "Salma Akter", age: 28, phone: "01544556677", history: "Pregnancy", lastVisit: "22 Nov, 2026", doctor: "Dr. Farzana Alam", status: "Active" },
];

export default function PatientManagementPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<any>(null);

  return (
    <div className="w-full flex flex-col gap-6 font-sans relative h-full">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-[32px] font-[700] text-[#111827] tracking-tight">Patient Management</h1>
          <p className="text-[15px] text-[#6B7280] mt-1">Search, view, and manage all patient records.</p>
        </div>
        <div className="flex gap-3">
          <button className="h-[44px] px-6 bg-[#2F80ED] text-white rounded-[12px] text-[14px] font-[600] shadow-[0_4px_16px_rgba(47,128,237,0.25)] hover:bg-[#2563EB] transition-colors flex items-center gap-2">
            <UserSearch size={18} /> Advanced Search
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-[16px] shadow-[0_4px_16px_rgba(0,0,0,0.06)] border border-[#E5E7EB] p-4 flex flex-col sm:flex-row gap-4"
      >
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280]" size={18} />
          <input 
            type="text" 
            placeholder="Search by Patient ID, Name, or Phone Number..." 
            className="w-full h-[48px] bg-[#F8FAFC] border border-[#E5E7EB] rounded-[12px] pl-11 pr-4 text-[15px] text-[#111827] focus:outline-none focus:border-[#2F80ED] focus:ring-1 focus:ring-[#2F80ED] transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="h-[48px] px-6 bg-white border border-[#E5E7EB] rounded-[12px] text-[#111827] font-[600] text-[14px] hover:bg-slate-50 transition-colors flex items-center gap-2 shrink-0">
          <Filter size={18} className="text-[#6B7280]" /> Filters
        </button>
      </motion.div>

      {/* Patient Table */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="bg-white rounded-[16px] shadow-[0_4px_16px_rgba(0,0,0,0.06)] border border-[#E5E7EB] flex flex-col overflow-hidden flex-1"
      >
        <div className="flex-1 overflow-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead className="sticky top-0 bg-[#F8FAFC] z-10 border-b border-[#E5E7EB]">
              <tr className="text-[13px] text-[#6B7280] font-[600] h-[48px] uppercase tracking-wider">
                <th className="px-6 py-3 whitespace-nowrap">Patient</th>
                <th className="px-6 py-3 whitespace-nowrap">Contact</th>
                <th className="px-6 py-3 whitespace-nowrap">Medical History</th>
                <th className="px-6 py-3 whitespace-nowrap">Last Visit</th>
                <th className="px-6 py-3 whitespace-nowrap">Status</th>
                <th className="px-6 py-3 whitespace-nowrap text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-[14px]">
              {mockPatients.map((patient, i) => (
                <tr key={i} className="border-b border-[#E5E7EB] hover:bg-slate-50/50 transition-colors cursor-pointer group" onClick={() => setSelectedPatient(patient)}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-4">
                      <div className="w-[44px] h-[44px] rounded-full bg-[#2F80ED]/10 text-[#2F80ED] font-[700] text-[16px] flex items-center justify-center shrink-0">
                        {patient.name.charAt(0)}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-[600] text-[#111827] text-[15px] group-hover:text-[#2F80ED] transition-colors">{patient.name}</span>
                        <span className="text-[13px] text-[#6B7280]">ID: {patient.id} • {patient.age} Yrs</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-[14px] text-[#111827] flex items-center gap-1.5"><Phone size={14} className="text-[#6B7280]"/> {patient.phone}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-[14px] text-[#6B7280] flex items-center gap-1.5"><Activity size={14} className="text-[#2F80ED]"/> {patient.history}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className="font-[500] text-[#111827]">{patient.lastVisit}</span>
                      <span className="text-[13px] text-[#6B7280]">{patient.doctor}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge type={patient.status === 'Active' ? 'success' : 'neutral'}>{patient.status}</Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button className="p-2 text-[#6B7280] bg-slate-100 rounded-[8px] hover:bg-slate-200 transition-colors" title="Options" onClick={(e) => { e.stopPropagation(); }}>
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Quick View Drawer */}
      <AnimatePresence>
        {selectedPatient && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
              className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-[100]"
              onClick={() => setSelectedPatient(null)}
            />
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-[500px] bg-white shadow-2xl z-[101] flex flex-col border-l border-[#E5E7EB]"
            >
              <div className="h-[72px] px-6 border-b border-[#E5E7EB] flex justify-between items-center bg-white shrink-0">
                <h2 className="text-[20px] font-[700] text-[#111827]">Patient Details</h2>
                <button onClick={() => setSelectedPatient(null)} className="p-2 text-[#6B7280] hover:bg-slate-100 rounded-full transition-colors"><X size={20}/></button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6 custom-scrollbar bg-[#F8FAFC]">
                {/* Profile Header */}
                <div className="bg-white rounded-[16px] p-6 shadow-sm border border-[#E5E7EB] flex items-center gap-5 mb-6">
                  <div className="w-[80px] h-[80px] rounded-full bg-gradient-to-br from-[#2F80ED] to-[#2563EB] text-white font-[700] text-[32px] flex items-center justify-center shrink-0 shadow-[0_4px_16px_rgba(47,128,237,0.3)]">
                    {selectedPatient.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-[24px] font-[700] text-[#111827] leading-none mb-1">{selectedPatient.name}</h3>
                    <p className="text-[14px] text-[#6B7280] mb-2">{selectedPatient.id} • {selectedPatient.age} Yrs • Blood: O+</p>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 bg-[#2F80ED]/10 text-[#2F80ED] text-[12px] font-[600] rounded-full flex items-center gap-1"><Phone size={12}/> Call</button>
                      <button className="px-3 py-1 bg-slate-100 text-[#6B7280] text-[12px] font-[600] rounded-full flex items-center gap-1"><FileText size={12}/> Edit</button>
                    </div>
                  </div>
                </div>

                {/* Summary Widgets */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white p-4 rounded-[16px] shadow-sm border border-[#E5E7EB]">
                    <span className="text-[13px] text-[#6B7280] font-[600] block mb-1">Total Visits</span>
                    <span className="text-[24px] font-[700] text-[#111827] flex items-center gap-2"><Calendar size={20} className="text-[#6DDA6E]"/> 14</span>
                  </div>
                  <div className="bg-white p-4 rounded-[16px] shadow-sm border border-[#E5E7EB]">
                    <span className="text-[13px] text-[#6B7280] font-[600] block mb-1">Due Payment</span>
                    <span className="text-[24px] font-[700] text-[#EB5757]">৳0</span>
                  </div>
                </div>

                {/* Tabs Area */}
                <div className="bg-white rounded-[16px] shadow-sm border border-[#E5E7EB] overflow-hidden">
                  <div className="flex border-b border-[#E5E7EB]">
                    <button className="flex-1 py-3 text-[14px] font-[600] text-[#2F80ED] border-b-2 border-[#2F80ED] bg-blue-50/30">Medical History</button>
                    <button className="flex-1 py-3 text-[14px] font-[600] text-[#6B7280] hover:text-[#111827] hover:bg-slate-50 transition-colors">Prescriptions</button>
                  </div>
                  <div className="p-5 flex flex-col gap-4">
                    <div className="p-4 bg-[#F8FAFC] rounded-[12px] border border-[#E5E7EB]">
                      <h4 className="text-[14px] font-[600] text-[#111827] flex items-center gap-2 mb-2"><Activity size={16} className="text-[#2F80ED]"/> Chronic Conditions</h4>
                      <p className="text-[14px] text-[#6B7280]">{selectedPatient.history}</p>
                    </div>
                    <div className="p-4 bg-[#F8FAFC] rounded-[12px] border border-[#E5E7EB]">
                      <h4 className="text-[14px] font-[600] text-[#111827] flex items-center gap-2 mb-2"><Stethoscope size={16} className="text-[#6DDA6E]"/> Last Diagnosis</h4>
                      <p className="text-[14px] text-[#6B7280]">Viral fever with mild dehydration. Advised rest and fluids.</p>
                      <span className="text-[12px] text-[#6B7280] mt-2 block border-t border-[#E5E7EB] pt-2">{selectedPatient.lastVisit} • {selectedPatient.doctor}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 border-t border-[#E5E7EB] bg-white shrink-0 grid grid-cols-2 gap-3">
                 <button className="h-[48px] bg-slate-100 hover:bg-slate-200 text-[#111827] font-[600] rounded-[12px] transition-colors flex items-center justify-center gap-2 text-[14px]">
                   <Download size={18}/> Export Record
                 </button>
                 <button className="h-[48px] bg-[#2F80ED] hover:bg-[#2563EB] text-white font-[600] rounded-[12px] transition-all flex items-center justify-center gap-2 text-[14px] shadow-[0_4px_12px_rgba(47,128,237,0.25)] hover:-translate-y-0.5">
                   New Appointment
                 </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
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
