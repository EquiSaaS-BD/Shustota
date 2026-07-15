"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  UserPlus, Phone, CalendarDays, Clock, 
  MapPin, Printer, Check, User
} from 'lucide-react';

export default function WalkInPage() {
  const [formData, setFormData] = useState({
    name: '', age: '', gender: 'Male', phone: '',
    symptoms: '', doctor: '', priority: 'Normal'
  });

  return (
    <div className="w-full flex flex-col gap-6 font-sans">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-[32px] font-[700] text-[#111827] tracking-tight">Walk-in Registration</h1>
          <p className="text-[15px] text-[#6B7280] mt-1">Register new walk-in patients and assign tokens instantly.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Left: Registration Form */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="xl:col-span-2 bg-white rounded-[16px] shadow-[0_4px_16px_rgba(0,0,0,0.06)] border border-[#E5E7EB] overflow-hidden"
        >
          <div className="p-6 md:p-8 border-b border-[#E5E7EB]">
            <h2 className="text-[22px] font-[600] text-[#111827] flex items-center gap-2">
              <UserPlus size={22} className="text-[#6DDA6E]" /> New Patient Details
            </h2>
          </div>

          <div className="p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Patient Name */}
              <div className="md:col-span-2">
                <label className="block text-[14px] font-[600] text-[#111827] mb-2">Patient Full Name <span className="text-[#EB5757]">*</span></label>
                <div className="relative">
                  <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280]" />
                  <input 
                    type="text" 
                    placeholder="e.g. Rahim Uddin"
                    className="w-full h-[48px] bg-[#F8FAFC] border border-[#E5E7EB] rounded-[12px] pl-11 pr-4 text-[15px] focus:outline-none focus:border-[#6DDA6E] focus:ring-1 focus:ring-[#6DDA6E] transition-all"
                  />
                </div>
              </div>

              {/* Age & Gender */}
              <div>
                <label className="block text-[14px] font-[600] text-[#111827] mb-2">Age <span className="text-[#EB5757]">*</span></label>
                <input 
                  type="number" 
                  placeholder="Years"
                  className="w-full h-[48px] bg-[#F8FAFC] border border-[#E5E7EB] rounded-[12px] px-4 text-[15px] focus:outline-none focus:border-[#6DDA6E] focus:ring-1 focus:ring-[#6DDA6E] transition-all"
                />
              </div>
              <div>
                <label className="block text-[14px] font-[600] text-[#111827] mb-2">Gender <span className="text-[#EB5757]">*</span></label>
                <select className="w-full h-[48px] bg-[#F8FAFC] border border-[#E5E7EB] rounded-[12px] px-4 text-[15px] focus:outline-none focus:border-[#6DDA6E] focus:ring-1 focus:ring-[#6DDA6E] transition-all appearance-none">
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>

              {/* Phone */}
              <div className="md:col-span-2">
                <label className="block text-[14px] font-[600] text-[#111827] mb-2">Phone Number <span className="text-[#EB5757]">*</span></label>
                <div className="relative">
                  <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280]" />
                  <input 
                    type="tel" 
                    placeholder="01XXXXXXXXX"
                    className="w-full h-[48px] bg-[#F8FAFC] border border-[#E5E7EB] rounded-[12px] pl-11 pr-4 text-[15px] focus:outline-none focus:border-[#6DDA6E] focus:ring-1 focus:ring-[#6DDA6E] transition-all"
                  />
                </div>
              </div>

              {/* Symptoms */}
              <div className="md:col-span-2">
                <label className="block text-[14px] font-[600] text-[#111827] mb-2">Symptoms / Reason for Visit</label>
                <textarea 
                  rows={3}
                  placeholder="Briefly describe the symptoms..."
                  className="w-full bg-[#F8FAFC] border border-[#E5E7EB] rounded-[12px] p-4 text-[15px] focus:outline-none focus:border-[#6DDA6E] focus:ring-1 focus:ring-[#6DDA6E] transition-all resize-none"
                ></textarea>
              </div>

              {/* Doctor & Priority */}
              <div className="md:col-span-2 border-t border-[#E5E7EB] pt-6 mt-2">
                <h3 className="text-[16px] font-[600] text-[#111827] mb-4">Assignment</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[14px] font-[600] text-[#111827] mb-2">Assign Doctor <span className="text-[#EB5757]">*</span></label>
                    <select className="w-full h-[48px] bg-white border border-[#E5E7EB] rounded-[12px] px-4 text-[15px] focus:outline-none focus:border-[#6DDA6E] focus:ring-1 focus:ring-[#6DDA6E] transition-all appearance-none shadow-sm">
                      <option value="">Select Doctor...</option>
                      <option>Dr. Farzana Alam (Gynecology)</option>
                      <option>Dr. Hasan (Cardiology)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[14px] font-[600] text-[#111827] mb-2">Priority Level</label>
                    <div className="flex bg-[#F8FAFC] p-1 rounded-[12px] border border-[#E5E7EB] h-[48px]">
                      <button className="flex-1 rounded-[10px] text-[14px] font-[600] bg-white text-[#111827] shadow-sm">Normal</button>
                      <button className="flex-1 rounded-[10px] text-[14px] font-[600] text-[#6B7280] hover:text-[#111827]">Urgent</button>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            <div className="mt-8 flex gap-4 justify-end">
              <button className="h-[52px] px-8 bg-white border border-[#E5E7EB] text-[#111827] font-[600] text-[15px] rounded-[12px] hover:bg-slate-50 transition-colors">Clear</button>
              <button className="h-[52px] px-8 bg-[#6DDA6E] text-white font-[600] text-[15px] rounded-[12px] shadow-[0_4px_16px_rgba(109,218,110,0.25)] hover:bg-[#5bc95c] hover:-translate-y-0.5 transition-all flex items-center gap-2">
                Generate Token
              </button>
            </div>
          </div>
        </motion.div>

        {/* Right: Preview & Print */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="xl:col-span-1 flex flex-col gap-6"
        >
          <div className="bg-white rounded-[16px] shadow-[0_4px_16px_rgba(0,0,0,0.06)] border border-[#E5E7EB] p-6 flex flex-col items-center text-center">
            <span className="text-[13px] text-[#6B7280] font-[600] uppercase tracking-wider mb-6 w-full text-left">Token Preview</span>
            
            <div className="w-full max-w-[280px] border-2 border-dashed border-[#E5E7EB] rounded-[16px] p-6 bg-[#F8FAFC] mb-6">
              <h3 className="text-[16px] font-[700] text-[#111827] mb-1">Shustota AI Hospital</h3>
              <p className="text-[13px] text-[#6B7280] mb-6">Walk-in Registration</p>
              
              <div className="text-[12px] text-[#6B7280] font-[600] uppercase tracking-wider mb-1">Token Number</div>
              <div className="text-[48px] font-[800] text-[#6DDA6E] leading-none mb-6">S-15</div>
              
              <div className="flex flex-col gap-3 text-left border-t border-slate-200 pt-4">
                <div className="flex justify-between items-center text-[13px]">
                  <span className="text-[#6B7280]">Doctor</span>
                  <span className="font-[600] text-[#111827]">Dr. Farzana A.</span>
                </div>
                <div className="flex justify-between items-center text-[13px]">
                  <span className="text-[#6B7280]">Est. Time</span>
                  <span className="font-[600] text-[#111827]">11:30 AM</span>
                </div>
                <div className="flex justify-between items-center text-[13px]">
                  <span className="text-[#6B7280]">Ahead</span>
                  <span className="font-[600] text-[#F2994A]">5 Patients</span>
                </div>
              </div>
            </div>

            <button className="w-full h-[48px] bg-[#F8FAFC] border border-[#E5E7EB] text-[#111827] font-[600] text-[14px] rounded-[12px] hover:bg-slate-100 transition-colors flex items-center justify-center gap-2">
              <Printer size={18} /> Print Token
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
