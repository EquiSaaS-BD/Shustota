"use client";

import { useParams } from "next/navigation";
import { mockDoctors } from "@/lib/mockData";
import { GoogleMap } from "@/components/shared/GoogleMap";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MapPin, Star, UserCircle2, BadgeCheck } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function DoctorProfilePage() {
  const { id } = useParams();
  const { t } = useLanguage();
  
  const doctor = mockDoctors.find(d => d.id === id) || mockDoctors[0];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-primary/20 selection:text-primary">
      <Navbar />

      <main className="flex-1 pt-24 lg:pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden mb-8">
            <div className="p-8 md:p-12 flex flex-col md:flex-row gap-8 items-start">
              
              <div className="w-32 h-32 md:w-48 md:h-48 rounded-2xl overflow-hidden shadow-lg shrink-0">
                <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover" />
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-[#0a1628]">{doctor.name}</h1>
                  {doctor.verified && <BadgeCheck size={28} className="text-blue-500 fill-blue-50" />}
                </div>
                <p className="text-primary font-semibold text-lg mb-4">{doctor.specialty}</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-2 text-slate-600">
                    <UserCircle2 size={20} className="text-slate-400" />
                    <span>{doctor.experienceYears} Years Experience</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Star size={20} className="fill-orange-500 text-orange-500" />
                    <span>{doctor.rating} ({doctor.reviews} Reviews)</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <MapPin size={20} className="text-slate-400" />
                    <span>{doctor.hospital}</span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button className="bg-primary text-white font-bold px-8 py-3 rounded-xl hover:bg-primary-container transition-colors">
                    {t("Book Appointment", "অ্যাপয়েন্টমেন্ট বুক করুন")}
                  </button>
                  <Link href="/#doctors" className="bg-slate-100 text-slate-700 font-bold px-8 py-3 rounded-xl hover:bg-slate-200 transition-colors">
                    {t("Go Back", "ফিরে যান")}
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
                <h3 className="text-xl font-bold text-[#0a1628] mb-4">About Doctor</h3>
                <p className="text-slate-600 leading-relaxed">
                  {doctor.name} is a highly qualified {doctor.specialty} with extensive experience working at {doctor.hospital}. 
                  Currently consulting patients and offering expert medical advice.
                </p>
              </div>
            </div>

            {/* Google Map Section */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 h-[400px]">
                <h3 className="text-lg font-bold text-[#0a1628] mb-4 flex items-center gap-2">
                  <MapPin size={20} className="text-primary" />
                  Chamber Location
                </h3>
                
                <div className="w-full h-[calc(100%-2rem)]">
                  <GoogleMap 
                    lat={doctor.mapLocation?.lat || 23.8052} 
                    lng={doctor.mapLocation?.lng || 90.3639} 
                    title={`${doctor.name} Chamber`}
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
