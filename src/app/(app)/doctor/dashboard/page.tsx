"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Users,
  CalendarDays,
  ClipboardList,
  Video,
  Eye,
  Edit3,
  FileText,
  Upload,
  Send,
  Clock,
  MapPin,
  Wifi,
  MoreHorizontal,
  ChevronRight,
  Activity,
} from "lucide-react";
import { toast } from "sonner";
import { StatsCard } from "@/components/doctor/StatsCard";
import { DoctorDashboardSkeleton } from "@/components/doctor/DoctorDashboardSkeleton";
import {
  doctorStats,
  recentPatients,
  todayAppointments,
  upcomingAppointments,
} from "@/lib/doctorMockData";

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

export default function DoctorDashboardPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <DoctorDashboardSkeleton />;

  const statsConfig = [
    {
      label: "Total Patients",
      value: doctorStats.totalPatients.toLocaleString(),
      change: doctorStats.totalPatientsChange,
      icon: Users,
      accentColor: "#003d9b",
      iconBgColor: "#eef2ff",
    },
    {
      label: "Today's Appointments",
      value: doctorStats.todayAppointments,
      change: doctorStats.todayAppointmentsChange,
      icon: CalendarDays,
      accentColor: "#0891b2",
      iconBgColor: "#ecfeff",
    },
    {
      label: "Pending Prescriptions",
      value: doctorStats.pendingPrescriptions,
      change: doctorStats.pendingPrescriptionsChange,
      icon: ClipboardList,
      accentColor: "#d97706",
      iconBgColor: "#fffbeb",
    },
    {
      label: "Upcoming Consultations",
      value: doctorStats.upcomingConsultations,
      change: doctorStats.upcomingConsultationsChange,
      icon: Video,
      accentColor: "#059669",
      iconBgColor: "#ecfdf5",
    },
  ];

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      Stable: "bg-emerald-50 text-emerald-700 border-emerald-200",
      "Follow-up": "bg-amber-50 text-amber-700 border-amber-200",
      Critical: "bg-red-50 text-red-600 border-red-200",
      New: "bg-blue-50 text-blue-600 border-blue-200",
    };
    return (
      <span className={`text-[11.5px] font-semibold px-2.5 py-1 rounded-full border ${styles[status] || "bg-slate-50 text-slate-600 border-slate-200"}`}>
        {status}
      </span>
    );
  };

  const getAppointmentStatusDot = (status: string) => {
    const colors: Record<string, string> = {
      Confirmed: "bg-emerald-400",
      Pending: "bg-amber-400",
      Completed: "bg-slate-300",
      Cancelled: "bg-red-400",
    };
    return <span className={`w-2 h-2 rounded-full ${colors[status] || "bg-slate-300"}`} />;
  };

  const getTypeBadge = (type: string) => {
    return type === "Online" ? (
      <span className="flex items-center gap-1 text-[11px] font-medium text-cyan-600 bg-cyan-50 px-2 py-0.5 rounded-full">
        <Wifi size={10} /> Online
      </span>
    ) : (
      <span className="flex items-center gap-1 text-[11px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
        <MapPin size={10} /> In-person
      </span>
    );
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="p-4 lg:p-6 space-y-6"
    >
      {/* Page Header */}
      <motion.div variants={itemVariants}>
        <h1 className="text-xl lg:text-2xl font-bold text-slate-800">Dashboard</h1>
        <p className="text-sm text-slate-500 mt-1">Welcome back! Here&apos;s your practice overview for today.</p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsConfig.map((stat) => (
          <StatsCard key={stat.label} {...stat} />
        ))}
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent Patients Table */}
        <motion.div variants={itemVariants} className="xl:col-span-2 bg-white rounded-xl border border-slate-200/80 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Users size={16} className="text-primary" />
              <h3 className="text-sm font-semibold text-slate-800">Recent Patients</h3>
              <span className="text-[11px] font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                {recentPatients.length}
              </span>
            </div>
            <button className="text-[13px] text-primary font-medium hover:underline flex items-center gap-1">
              View All <ChevronRight size={14} />
            </button>
          </div>

          {/* Table Header */}
          <div className="hidden md:grid grid-cols-[2fr_1fr_1.2fr_0.8fr_0.8fr] gap-4 px-5 py-2.5 bg-slate-50/80 text-[11.5px] font-semibold text-slate-500 uppercase tracking-wider">
            <span>Patient</span>
            <span>Last Visit</span>
            <span>Condition</span>
            <span>Status</span>
            <span className="text-right">Actions</span>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-slate-100">
            {recentPatients.map((patient) => (
              <div
                key={patient.id}
                className="table-row-hover grid grid-cols-1 md:grid-cols-[2fr_1fr_1.2fr_0.8fr_0.8fr] gap-2 md:gap-4 items-center px-5 py-3.5 cursor-pointer"
              >
                {/* Patient Info */}
                <div className="flex items-center gap-3">
                  <img
                    src={patient.avatar}
                    alt={patient.name}
                    className="w-9 h-9 rounded-full object-cover ring-2 ring-slate-100"
                  />
                  <div>
                    <p className="text-[13px] font-semibold text-slate-800">{patient.name}</p>
                    <p className="text-[11.5px] text-slate-400">{patient.age}y • {patient.gender}</p>
                  </div>
                </div>

                {/* Last Visit */}
                <div className="hidden md:block">
                  <p className="text-[13px] text-slate-600">
                    {new Date(patient.lastVisit).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </p>
                </div>

                {/* Condition */}
                <div className="hidden md:block">
                  <p className="text-[13px] text-slate-600">{patient.condition}</p>
                </div>

                {/* Status */}
                <div className="hidden md:flex">
                  {getStatusBadge(patient.status)}
                </div>

                {/* Actions */}
                <div className="hidden md:flex items-center justify-end gap-1.5">
                  <button
                    onClick={(e) => { e.stopPropagation(); toast.info(`Viewing ${patient.name}'s profile`); }}
                    className="p-1.5 text-slate-400 hover:text-primary hover:bg-primary/8 rounded-lg transition-colors"
                    title="View Patient"
                  >
                    <Eye size={15} />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); toast.info(`Editing ${patient.name}'s record`); }}
                    className="p-1.5 text-slate-400 hover:text-amber-500 hover:bg-amber-50 rounded-lg transition-colors"
                    title="Edit Patient"
                  >
                    <Edit3 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Today's Appointments */}
        <motion.div variants={itemVariants} className="bg-white rounded-xl border border-slate-200/80 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <CalendarDays size={16} className="text-cyan-600" />
              <h3 className="text-sm font-semibold text-slate-800">Today&apos;s Appointments</h3>
            </div>
            <span className="text-[11px] font-bold text-white bg-cyan-500 w-5.5 h-5.5 rounded-full flex items-center justify-center">
              {todayAppointments.length}
            </span>
          </div>

          <div className="divide-y divide-slate-50 max-h-[400px] overflow-y-auto scrollbar-thin">
            {todayAppointments.map((appt) => (
              <div
                key={appt.id}
                className="px-5 py-3.5 hover:bg-slate-50/50 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3 mb-2">
                  <img
                    src={appt.patientAvatar}
                    alt={appt.patientName}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold text-slate-800 truncate">{appt.patientName}</p>
                    <p className="text-[11.5px] text-slate-400">{appt.condition}</p>
                  </div>
                  <button className="p-1 text-slate-300 hover:text-slate-500 transition-colors">
                    <MoreHorizontal size={16} />
                  </button>
                </div>
                <div className="flex items-center gap-2 ml-11">
                  <span className="flex items-center gap-1.5 text-[11.5px] text-slate-500">
                    <Clock size={11} />
                    {appt.time}
                  </span>
                  {getTypeBadge(appt.type)}
                  <span className="flex items-center gap-1 text-[11px] text-slate-400 ml-auto">
                    {getAppointmentStatusDot(appt.status)}
                    {appt.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Upcoming Section */}
          <div className="border-t border-slate-200">
            <div className="px-5 py-3 bg-slate-50/50">
              <p className="text-[11.5px] font-semibold text-slate-500 uppercase tracking-wider">Upcoming</p>
            </div>
            <div className="divide-y divide-slate-50">
              {upcomingAppointments.slice(0, 2).map((appt) => (
                <div key={appt.id} className="px-5 py-3 hover:bg-slate-50/50 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <img
                      src={appt.patientAvatar}
                      alt={appt.patientName}
                      className="w-7 h-7 rounded-full object-cover opacity-80"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-[12.5px] font-medium text-slate-700 truncate">{appt.patientName}</p>
                      <p className="text-[11px] text-slate-400">
                        {new Date(appt.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })} • {appt.time}
                      </p>
                    </div>
                    {getTypeBadge(appt.type)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div variants={itemVariants}>
        <h3 className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2">
          <Activity size={15} className="text-primary" />
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button
            onClick={() => toast.success("Prescription editor opening...", { description: "Feature coming soon" })}
            className="quick-action-card bg-white rounded-xl border border-slate-200/80 p-5 text-left group"
          >
            <div className="w-11 h-11 rounded-xl bg-primary/8 flex items-center justify-center mb-3 group-hover:bg-primary/12 transition-colors">
              <FileText size={20} className="text-primary" />
            </div>
            <p className="text-sm font-semibold text-slate-800">Write Prescription</p>
            <p className="text-[12px] text-slate-400 mt-1">Create a new prescription for a patient</p>
          </button>

          <button
            onClick={() => toast.success("Upload dialog opening...", { description: "Feature coming soon" })}
            className="quick-action-card bg-white rounded-xl border border-slate-200/80 p-5 text-left group"
          >
            <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center mb-3 group-hover:bg-emerald-100 transition-colors">
              <Upload size={20} className="text-emerald-600" />
            </div>
            <p className="text-sm font-semibold text-slate-800">Upload Report</p>
            <p className="text-[12px] text-slate-400 mt-1">Upload lab results or diagnostic reports</p>
          </button>

          <button
            onClick={() => toast.success("Message composer opening...", { description: "Feature coming soon" })}
            className="quick-action-card bg-white rounded-xl border border-slate-200/80 p-5 text-left group"
          >
            <div className="w-11 h-11 rounded-xl bg-cyan-50 flex items-center justify-center mb-3 group-hover:bg-cyan-100 transition-colors">
              <Send size={20} className="text-cyan-600" />
            </div>
            <p className="text-sm font-semibold text-slate-800">Send Message</p>
            <p className="text-[12px] text-slate-400 mt-1">Contact a patient or colleague directly</p>
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
