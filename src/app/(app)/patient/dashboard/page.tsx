"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  CalendarDays,
  ClipboardList,
  FileText,
  Activity,
  Heart,
  ChevronRight,
  Clock,
  MapPin,
  Pill,
  CheckCircle2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function PatientDashboardPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="p-6 lg:p-8 w-full max-w-7xl mx-auto space-y-6">
        <div className="h-8 w-48 bg-slate-200 rounded-lg animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-slate-200 rounded-2xl animate-pulse" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-96 bg-slate-200 rounded-2xl animate-pulse" />
          <div className="h-96 bg-slate-200 rounded-2xl animate-pulse" />
        </div>
      </div>
    );
  }

  const stats = [
    { label: "Upcoming Appointments", value: "2", icon: CalendarDays, desc: "Next: Tomorrow, 10 AM", color: "text-indigo-600", bg: "bg-indigo-50" },
    { label: "Active Prescriptions", value: "3", icon: Pill, desc: "2 need refills soon", color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Recent Reports", value: "4", icon: FileText, desc: "Blood test updated", color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Health Score", value: "85/100", icon: Heart, desc: "Good condition", color: "text-rose-600", bg: "bg-rose-50" },
  ];

  return (
    <div className="p-6 lg:p-8 w-full max-w-7xl mx-auto">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-6"
      >
        {/* Header section */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">My Health Dashboard</h1>
            <p className="text-sm text-slate-500 mt-1">Track your appointments, records, and health progress.</p>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/doctors" className="text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-xl shadow-sm transition-colors flex items-center gap-2">
              <CalendarDays size={16} />
              Book Appointment
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm relative overflow-hidden group hover:shadow-md transition-all duration-300"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white to-${stat.bg.split('-')[1]}-100 rounded-bl-full -mr-10 -mt-10 opacity-50 transition-transform group-hover:scale-110`} />
                <div className="relative z-10 flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
                      <Icon className={stat.color} size={20} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-slate-500 text-sm font-medium">{stat.label}</h3>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-2xl font-bold text-slate-800">{stat.value}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 bg-slate-50 w-fit px-2 py-1 rounded-md">
                    {stat.desc}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
            
            {/* Upcoming Appointments */}
            <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-slate-800">Upcoming Appointments</h2>
                <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700 flex items-center gap-1 transition-colors">
                  View All <ChevronRight size={16} />
                </button>
              </div>
              <div className="space-y-4">
                {[
                  { dr: "Dr. Anisur Rahman", spec: "Cardiologist", time: "Tomorrow, 10:00 AM", type: "Video Consult" },
                  { dr: "Dr. Farhana Amin", spec: "Dermatologist", time: "Friday, 4:30 PM", type: "In-Person" },
                ].map((apt, i) => (
                  <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-slate-100 hover:border-indigo-100 hover:bg-indigo-50/30 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-700 font-bold">
                        {apt.dr.split(" ")[1].charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-slate-800">{apt.dr}</h4>
                        <p className="text-xs text-slate-500">{apt.spec}</p>
                      </div>
                    </div>
                    <div className="flex flex-col sm:items-end gap-1">
                      <div className="flex items-center gap-1 text-sm font-medium text-slate-700">
                        <Clock size={14} className="text-indigo-500" />
                        {apt.time}
                      </div>
                      <div className="text-xs text-slate-500 flex items-center gap-1">
                        {apt.type === "Video Consult" ? <Activity size={12} /> : <MapPin size={12} />}
                        {apt.type}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Prescriptions */}
            <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-slate-800">Recent Prescriptions</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[1, 2].map((i) => (
                  <div key={i} className="p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-white hover:border-indigo-100 transition-all cursor-pointer group">
                    <div className="flex justify-between items-start mb-3">
                      <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center">
                        <ClipboardList size={16} />
                      </div>
                      <span className="text-xs font-medium text-slate-500">12 June 2026</span>
                    </div>
                    <h4 className="text-sm font-semibold text-slate-800 mb-1">Prescription #{2034 + i}</h4>
                    <p className="text-xs text-slate-500 mb-4">Prescribed by Dr. Anisur Rahman</p>
                    <button className="text-xs font-medium text-indigo-600 group-hover:text-indigo-700 flex items-center gap-1">
                      View Details <ChevronRight size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </motion.div>

          {/* Right Sidebar Widget */}
          <motion.div variants={itemVariants} className="space-y-6">
            
            {/* Vitals Summary */}
            <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-2xl shadow-sm p-6 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
              <div className="relative z-10">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Activity size={20} />
                  Latest Vitals
                </h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center border-b border-white/20 pb-2">
                    <span className="text-indigo-100 text-sm">Blood Pressure</span>
                    <span className="font-semibold">120/80 <span className="text-xs text-indigo-200 font-normal">mmHg</span></span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/20 pb-2">
                    <span className="text-indigo-100 text-sm">Heart Rate</span>
                    <span className="font-semibold">72 <span className="text-xs text-indigo-200 font-normal">bpm</span></span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-indigo-100 text-sm">Weight</span>
                    <span className="font-semibold">68 <span className="text-xs text-indigo-200 font-normal">kg</span></span>
                  </div>
                </div>

                <button className="w-full bg-white text-indigo-700 font-semibold py-2.5 rounded-xl text-sm hover:bg-indigo-50 transition-colors shadow-sm flex items-center justify-center gap-2">
                  Update Vitals
                </button>
              </div>
            </div>

            {/* Zeigarnik Effect Profile Completion Card */}
            <div className="bg-white rounded-2xl border border-dashed border-indigo-200 shadow-sm p-6 relative overflow-hidden">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-bold text-slate-800">Health Profile</h3>
                <span className="text-xs font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">70% Complete</span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mb-4">
                <div className="bg-indigo-600 h-full rounded-full" style={{ width: "70%" }}></div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2.5 text-xs text-slate-400">
                  <CheckCircle2 size={14} className="text-emerald-500 fill-emerald-50" />
                  <span className="line-through">Verify Email Address</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-400">
                  <CheckCircle2 size={14} className="text-emerald-500 fill-emerald-50" />
                  <span className="line-through">Primary Doctor Setup</span>
                </div>
                <Link href="#" className="flex items-center justify-between text-xs text-slate-700 hover:text-indigo-600 transition-colors group">
                  <div className="flex items-center gap-2.5 font-semibold text-slate-800">
                    <div className="w-3.5 h-3.5 rounded-full border-2 border-indigo-500 group-hover:bg-indigo-50 transition-colors" />
                    <span>Add Emergency Contact</span>
                  </div>
                  <ChevronRight size={12} className="text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <Link href="/reports" className="flex items-center justify-between text-xs text-slate-700 hover:text-indigo-600 transition-colors group">
                  <div className="flex items-center gap-2.5 font-semibold text-slate-800">
                    <div className="w-3.5 h-3.5 rounded-full border-2 border-indigo-500 group-hover:bg-indigo-50 transition-colors" />
                    <span>Upload Medical Records</span>
                  </div>
                  <ChevronRight size={12} className="text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-6">
              <h2 className="text-base font-bold text-slate-800 mb-4">Quick Actions</h2>
              <div className="space-y-2">
                {[
                  { label: "Order Medicines", icon: Pill, href: "/medicines" },
                  { label: "Book Lab Test", icon: FileText, href: "#" },
                  { label: "Consult Doctor Online", icon: Activity, href: "/doctors" },
                ].map((action, idx) => {
                  const Icon = action.icon;
                  return (
                    <Link key={idx} href={action.href} className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50 transition-all group">
                      <div className="w-10 h-10 rounded-lg bg-slate-50 group-hover:bg-indigo-100 flex items-center justify-center transition-colors">
                        <Icon className="text-slate-500 group-hover:text-indigo-600 transition-colors" size={18} />
                      </div>
                      <span className="text-sm font-medium text-slate-700 group-hover:text-indigo-700">{action.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
