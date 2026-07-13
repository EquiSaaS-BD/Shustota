"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { PatientSidebar } from "@/components/patient/PatientSidebar";
import { PatientHeader } from "@/components/patient/PatientHeader";
import { AccessDeniedModal } from "@/components/doctor/AccessDeniedModal";
import { DoctorDashboardSkeleton } from "@/components/doctor/DoctorDashboardSkeleton"; // Reuse skeleton structure
import { Toaster } from "sonner";
import { useRouter } from "next/navigation";

export default function PatientDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, role, isAuthenticated, isLoading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  // Loading state
  if (isLoading) {
    return (
      <div className="flex h-screen bg-slate-50">
        <div className="w-[280px] bg-white border-r border-slate-200/80 hidden lg:block" />
        <div className="flex-1">
          <div className="h-16 bg-white border-b border-slate-200/80" />
          <DoctorDashboardSkeleton />
        </div>
      </div>
    );
  }

  // Access control
  if (!isAuthenticated) {
    return <AccessDeniedModal />;
  }
  
  // Actually, any authenticated user can view the patient dashboard.
  // But if we want to restrict strictly to 'user' role:
  // if (role !== "user") return <AccessDeniedModal />;

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Toaster position="top-right" richColors closeButton />

      {/* Sidebar */}
      <PatientSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header */}
        <PatientHeader onMenuClick={() => setSidebarOpen(true)} />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-slate-50">
          {children}
        </main>
      </div>
    </div>
  );
}
