"use client";

import { useState } from "react";
import { AppointmentPass } from "@/components/appointments/AppointmentPass";
import { CalendarRange, Bed, Stethoscope } from "lucide-react";

// Mock data representing saved appointments
const mockDoctorAppointments = [
  {
    type: "doctor" as const,
    id: "AP-8942-01",
    doctorName: "Dr. Farzana Alam",
    doctorImage: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop",
    specialty: "Gynecologist",
    hospitalName: "Labaid Specialized Hospital",
    hospitalLogo: "/images/shustota-icon.png",
    address: "House 6, Road 4, Dhanmondi, Dhaka",
    date: "24 Nov, 2026",
    time: "10:30 AM",
    patientName: "Rafin Hossain",
    age: "28",
    guardianName: "Md. Hasan",
    phone: "017XXXXXXXX",
    fee: 1050,
    advancePaid: 0,
    status: "Confirmed" as const
  }
];

const mockBedBookings = [
  {
    type: "bed" as const,
    id: "BED-7721-99",
    doctorName: "VIP Cabin Premium",
    doctorImage: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=300&h=300&fit=crop",
    specialty: "Private Room • AC • Attached Bath",
    hospitalName: "Labaid Specialized Hospital",
    hospitalLogo: "/images/shustota-icon.png",
    address: "House 6, Road 4, Dhanmondi, Dhaka",
    date: "25 Nov - 28 Nov, 2026",
    time: "Check-in: 12:00 PM",
    patientName: "Rafin Hossain",
    age: "28",
    guardianName: "Md. Hasan",
    phone: "017XXXXXXXX",
    fee: 15000,
    advancePaid: 1000,
    status: "Confirmed" as const
  }
];

export default function AppointmentsPage() {
  const [activeTab, setActiveTab] = useState<"doctor" | "bed">("bed"); // Default to bed to show off new UI

  return (
    <div className="h-full overflow-y-auto bg-slate-50 font-sans pb-32">
      
      {/* Header (Hidden when printing) */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200 px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 print:hidden">
        <h1 className="font-[800] text-[20px] text-slate-900 flex items-center gap-2">
          <CalendarRange size={22} className="text-primary" />
          My Bookings Memo
        </h1>
        
        {/* Tabs */}
        <div className="flex bg-slate-100 p-1 rounded-xl w-full md:w-auto">
          <button 
            onClick={() => setActiveTab("doctor")}
            className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2 rounded-lg text-[14px] font-bold transition-colors ${activeTab === 'doctor' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <Stethoscope size={16} /> Doctor Appointments
          </button>
          <button 
            onClick={() => setActiveTab("bed")}
            className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2 rounded-lg text-[14px] font-bold transition-colors ${activeTab === 'bed' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <Bed size={16} /> Hospital Beds
          </button>
        </div>
      </div>

      <div className="max-w-[700px] mx-auto p-4 md:p-8">
        
        <p className="text-slate-500 mb-8 text-center text-[15px] print:hidden">
          Show this Digital Memo at the hospital reception to confirm your arrival.
        </p>

        {activeTab === "doctor" && mockDoctorAppointments.map((appointment) => (
          <AppointmentPass key={appointment.id} data={appointment} />
        ))}

        {activeTab === "bed" && mockBedBookings.map((booking) => (
          <AppointmentPass key={booking.id} data={booking} />
        ))}

      </div>
    </div>
  );
}
