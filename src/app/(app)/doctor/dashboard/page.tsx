"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Clock, MonitorPlay, UserCheck, Activity, Smartphone, Plus, X, ToggleLeft, ToggleRight, QrCode, Mail, Link as LinkIcon } from 'lucide-react';
import Image from 'next/image';

const stats = [
  { title: "Today's Appointments", count: "42", icon: Users, color: "text-[#2F80ED]", bg: "bg-[#2F80ED]/10" },
  { title: "Patients Waiting", count: "12", icon: Clock, color: "text-[#F59E0B]", bg: "bg-[#F59E0B]/10" },
  { title: "Completed", count: "18", icon: UserCheck, color: "text-[#22C55E]", bg: "bg-[#22C55E]/10" },
  { title: "Walk-in Patients", count: "14", icon: Activity, color: "text-[#8B5CF6]", bg: "bg-[#8B5CF6]/10" },
  { title: "Online Consultations", count: "8", icon: Smartphone, color: "text-[#00C2A8]", bg: "bg-[#00C2A8]/10" },
  { title: "Revenue", count: "৳28K", icon: MonitorPlay, color: "text-slate-700", bg: "bg-slate-100" },
];

const activityLog = [
  { time: "09:15", name: "Kamrul Hasan", action: "Checked In", token: "S-021", status: "Completed", color: "text-[#22C55E]" },
  { time: "09:18", name: "Kamrul Hasan", action: "Called Next Patient", token: "S-022", status: "Completed", color: "text-[#22C55E]" },
  { time: "09:20", name: "Kamrul Hasan", action: "Rescheduled Appointment", token: "S-025", status: "Completed", color: "text-[#2F80ED]" },
  { time: "09:25", name: "Aisha Begum", action: "Emergency Case Inserted", token: "E-01", status: "Alert", color: "text-[#EF4444]" },
  { time: "09:30", name: "Kamrul Hasan", action: "Payment Collected", token: "S-022", status: "Completed", color: "text-[#22C55E]" },
  { time: "09:45", name: "Kamrul Hasan", action: "Paused Queue", token: "-", status: "Warning", color: "text-[#F59E0B]" },
  { time: "10:00", name: "Kamrul Hasan", action: "Resumed Queue", token: "-", status: "Completed", color: "text-[#22C55E]" },
];

export default function DoctorDashboardPage() {
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [permissions, setPermissions] = useState({
    apt: true, queue: true, walkin: true, pay: true, notif: true, cal: true, 
    sched: true, checkin: true, report: true, analytics: true,
    presc: false, diag: false, medrec: false, docprof: false
  });

  const togglePermission = (key: keyof typeof permissions) => {
    setPermissions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="p-4 lg:p-6 space-y-6 bg-slate-50 min-h-[calc(100vh-80px)] w-full max-w-[1600px] mx-auto overflow-y-auto">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-[24px] font-bold text-slate-800">Live Monitor & Team Dashboard</h1>
        <div className="flex gap-4">
          <div className="px-4 py-2 bg-white rounded-full shadow-sm flex items-center gap-2 border border-slate-100">
            <span className="w-2.5 h-2.5 bg-[#22C55E] rounded-full animate-pulse"></span>
            <span className="text-[14px] font-bold text-slate-700 hidden sm:inline">Live Sync Active</span>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 lg:gap-6">
        {stats.map((stat, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="h-[140px] bg-white rounded-[20px] p-5 shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div className={`w-[40px] h-[40px] rounded-[12px] flex items-center justify-center ${stat.bg}`}>
                <stat.icon size={20} className={stat.color} />
              </div>
            </div>
            <div>
              <h3 className="text-[34px] font-bold text-slate-800 leading-none mb-1">{stat.count}</h3>
              <p className="text-[14px] font-medium text-slate-500">{stat.title}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Main Queue Progress */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="xl:col-span-2 bg-white rounded-[20px] shadow-sm border border-slate-100 p-6 lg:p-8 flex flex-col gap-8"
        >
          <div className="flex justify-between items-end">
            <div className="w-full">
              <h2 className="text-[20px] font-bold text-slate-800 mb-3">Current Queue Progress</h2>
              <div className="w-full max-w-[400px] h-[12px] bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#2F80ED] rounded-full w-[45%]"></div>
              </div>
              <p className="text-[13px] text-slate-500 mt-2">18 of 42 patients completed</p>
            </div>
            <div className="text-right whitespace-nowrap">
              <p className="text-[14px] text-slate-500 font-medium">Est. Waiting Time</p>
              <p className="text-[24px] font-bold text-[#F59E0B]">~45 mins</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#F7FAFC] p-6 rounded-[16px] border border-slate-100 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="text-[12px] bg-white border border-slate-200 shadow-sm px-3 py-1 rounded-full text-slate-600 font-medium hover:text-[#2F80ED] hover:border-[#2F80ED]">View Details</button>
              </div>
              <span className="text-[14px] text-slate-500 font-semibold uppercase tracking-wider">Current Patient</span>
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <span className="text-[54px] font-extrabold text-[#2F80ED] leading-none block mb-2">S-01</span>
                  <span className="text-[18px] font-bold text-slate-800">Rahim Uddin</span>
                  <p className="text-[14px] text-slate-500">First Visit • Fever, Cough</p>
                </div>
                <div className="w-[70px] h-[70px] rounded-full bg-[#2F80ED]/10 hidden sm:flex items-center justify-center text-[24px] font-bold text-[#2F80ED]">R</div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-[16px] border border-slate-200">
              <span className="text-[14px] text-slate-500 font-semibold uppercase tracking-wider">Next Patient</span>
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <span className="text-[40px] font-bold text-slate-400 leading-none block mb-2">S-02</span>
                  <span className="text-[16px] font-bold text-slate-700">Fatema Begum</span>
                  <p className="text-[14px] text-slate-500">Follow Up • Headache</p>
                </div>
                <div className="w-[60px] h-[60px] rounded-full bg-slate-100 hidden sm:flex items-center justify-center text-[20px] font-bold text-slate-500">F</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Connect Team */}
        <div className="flex flex-col gap-6">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-[20px] shadow-sm border border-slate-100 p-6 flex flex-col h-full"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-[18px] font-bold text-slate-800">Connected Assistant</h3>
              <button onClick={() => setShowInviteModal(true)} className="px-4 py-2 bg-[#2F80ED]/10 text-[#2F80ED] text-sm font-bold rounded-lg hover:bg-[#2F80ED] hover:text-white transition-colors flex items-center gap-1.5">
                <Plus size={16} /> Invite
              </button>
            </div>
            
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between bg-slate-50 p-4 rounded-[12px] border border-slate-100 group transition-colors hover:border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-[40px] h-[40px] rounded-full bg-[#6DDA6E]/20 text-[#6DDA6E] font-bold flex items-center justify-center text-sm shrink-0">K</div>
                  <div>
                    <h4 className="text-[15px] font-bold text-slate-800 leading-tight">Kamrul Hasan</h4>
                    <span className="text-[13px] text-[#22C55E] font-medium flex items-center gap-1.5 mt-0.5"><span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse"></span> Online (Front Desk)</span>
                  </div>
                </div>
                <button className="text-[12px] font-bold text-[#EF4444] opacity-0 group-hover:opacity-100 transition-opacity bg-red-50 px-3 py-1.5 rounded-lg">Remove</button>
              </div>
              <div className="flex items-center justify-between bg-white p-4 rounded-[12px] border border-slate-100 group transition-colors hover:border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-[40px] h-[40px] rounded-full bg-slate-200 text-slate-500 font-bold flex items-center justify-center text-sm shrink-0">A</div>
                  <div>
                    <h4 className="text-[15px] font-bold text-slate-700 leading-tight">Aisha Begum</h4>
                    <span className="text-[13px] text-slate-400 font-medium mt-0.5 block">Offline (Shift ended)</span>
                  </div>
                </div>
                <button className="text-[12px] font-bold text-[#EF4444] opacity-0 group-hover:opacity-100 transition-opacity bg-red-50 px-3 py-1.5 rounded-lg">Remove</button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Assistant Activity Log */}
      <h2 className="text-[20px] font-bold text-slate-800 pt-4">Live Assistant Activity Log</h2>
      <div className="w-full bg-white rounded-[20px] shadow-sm border border-slate-100 overflow-hidden">
        <div className="h-[400px] overflow-y-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead className="sticky top-0 bg-slate-50/90 backdrop-blur-md z-10 border-b border-slate-200">
              <tr className="text-[13px] text-slate-500 font-semibold h-[50px] uppercase tracking-wider">
                <th className="px-6 py-3 font-semibold">Time</th>
                <th className="px-6 py-3 font-semibold">Assistant Name</th>
                <th className="px-6 py-3 font-semibold">Action</th>
                <th className="px-6 py-3 font-semibold">Patient Token</th>
                <th className="px-6 py-3 font-semibold text-right">Status</th>
              </tr>
            </thead>
            <tbody className="text-[14px]">
              {activityLog.map((log, i) => (
                <tr key={i} className="border-b border-slate-100 hover:bg-slate-50 transition-colors h-[56px]">
                  <td className="px-6 py-3 font-medium text-slate-500 whitespace-nowrap">{log.time}</td>
                  <td className="px-6 py-3 font-semibold text-slate-700 flex items-center gap-3 whitespace-nowrap">
                    <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-[11px] font-bold shrink-0">{log.name.charAt(0)}</div>
                    {log.name}
                  </td>
                  <td className="px-6 py-3 font-medium text-slate-800 whitespace-nowrap">{log.action}</td>
                  <td className="px-6 py-3 font-bold text-slate-700 whitespace-nowrap">{log.token}</td>
                  <td className={`px-6 py-3 font-bold text-right whitespace-nowrap ${log.color}`}>{log.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invite Modal */}
      <AnimatePresence>
        {showInviteModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-[720px] bg-white rounded-[24px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="px-6 md:px-8 py-5 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10 shrink-0">
                <h2 className="text-[20px] font-bold text-slate-800">Invite Assistant</h2>
                <button onClick={() => setShowInviteModal(false)} className="p-2 text-slate-400 hover:text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="col-span-2 md:col-span-1">
                    <label className="text-[13px] font-semibold text-slate-700 block mb-1.5">Assistant Name *</label>
                    <input type="text" className="w-full h-[50px] border border-slate-200 rounded-[12px] px-4 text-[14px] focus:outline-none focus:border-[#2F80ED]" />
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <label className="text-[13px] font-semibold text-slate-700 block mb-1.5">Email Address *</label>
                    <input type="email" className="w-full h-[50px] border border-slate-200 rounded-[12px] px-4 text-[14px] focus:outline-none focus:border-[#2F80ED]" />
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <label className="text-[13px] font-semibold text-slate-700 block mb-1.5">Phone Number *</label>
                    <input type="tel" className="w-full h-[50px] border border-slate-200 rounded-[12px] px-4 text-[14px] focus:outline-none focus:border-[#2F80ED]" />
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <label className="text-[13px] font-semibold text-slate-700 block mb-1.5">Role *</label>
                    <select className="w-full h-[50px] border border-slate-200 rounded-[12px] px-4 text-[14px] focus:outline-none focus:border-[#2F80ED] bg-white appearance-none">
                      <option>Front Desk / Receptionist</option>
                      <option>Clinic Manager</option>
                    </select>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-[16px] font-bold text-slate-800 mb-3">Permissions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 bg-slate-50 p-5 rounded-[16px] border border-slate-100">
                    <div className="col-span-1 md:col-span-2"><h4 className="text-[12px] font-bold text-slate-400 uppercase tracking-wider">Management</h4></div>
                    <PermissionToggle label="Appointment Mgmt" active={permissions.apt} onClick={() => togglePermission('apt')} />
                    <PermissionToggle label="Queue Management" active={permissions.queue} onClick={() => togglePermission('queue')} />
                    <PermissionToggle label="Walk-in Patients" active={permissions.walkin} onClick={() => togglePermission('walkin')} />
                    <PermissionToggle label="Payments" active={permissions.pay} onClick={() => togglePermission('pay')} />
                    
                    <div className="col-span-1 md:col-span-2 mt-2"><h4 className="text-[12px] font-bold text-slate-400 uppercase tracking-wider">Clinical (Disabled by default)</h4></div>
                    <PermissionToggle label="Prescriptions" active={permissions.presc} onClick={() => togglePermission('presc')} />
                    <PermissionToggle label="Medical Records" active={permissions.medrec} onClick={() => togglePermission('medrec')} />
                  </div>
                </div>
              </div>

              <div className="px-6 md:px-8 py-5 border-t border-slate-100 bg-white shrink-0 flex justify-end gap-3 sticky bottom-0">
                <button onClick={() => setShowInviteModal(false)} className="px-6 py-2.5 rounded-[12px] font-semibold text-slate-600 hover:bg-slate-100 transition-colors">Cancel</button>
                <button onClick={() => setShowInviteModal(false)} className="px-8 py-2.5 bg-[#2F80ED] hover:bg-[#2563EB] text-white rounded-[12px] font-bold shadow-[0_4px_12px_rgba(47,128,237,0.3)] transition-all flex items-center gap-2">
                  <Mail size={18} /> Send Invite
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

const PermissionToggle = ({ label, active, onClick }: { label: string, active: boolean, onClick: () => void }) => {
  return (
    <div className="flex items-center justify-between py-1 cursor-pointer group" onClick={onClick}>
      <span className="text-[14px] font-medium text-slate-700 group-hover:text-slate-900 transition-colors">{label}</span>
      <button className="text-slate-400 focus:outline-none">
        {active ? <ToggleRight size={32} className="text-[#2F80ED]" strokeWidth={1.5} /> : <ToggleLeft size={32} strokeWidth={1.5} />}
      </button>
    </div>
  );
};
