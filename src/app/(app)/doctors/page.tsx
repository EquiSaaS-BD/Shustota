"use client";

import { useState, useEffect } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { mockDoctors } from "@/lib/mockData";
import { DoctorCard } from "@/components/doctors/DoctorCard";
import { DoctorFilterModal } from "@/components/doctors/DoctorFilterModal";

export default function DoctorsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const filteredDoctors = mockDoctors.filter(doc => 
    doc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    doc.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.hospital.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-full overflow-y-auto bg-[#F8FAFC]">
      {/* FLAT MINIMAL HERO SECTION */}
      <div className="w-full py-12 flex flex-col items-center justify-center bg-white border-b border-slate-200">
        
        <div className="w-full max-w-[1280px] px-[20px] md:px-[32px] lg:px-[48px] flex flex-col items-center text-center">
          <h1 className="text-[32px] md:text-[40px] font-bold text-slate-900 tracking-tight mb-2">
            Find a Specialist
          </h1>
          <p className="text-[16px] text-slate-500 max-w-[600px] mb-8">
            Search for doctors, clinics, and hospitals.
          </p>

          <div className="w-full max-w-[720px] flex items-center bg-white/60 backdrop-blur-md border-[1.5px] border-primary/20 shadow-[0_8px_30px_rgb(0,61,155,0.08)] rounded-[16px] focus-within:border-primary focus-within:shadow-[0_8px_30px_rgb(0,61,155,0.15)] transition-all duration-300 p-1.5">
            <div className="pl-4 pr-2 flex items-center justify-center">
              <Search className="text-primary/70" size={22} />
            </div>
            <input 
              type="text" 
              placeholder="Search..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 h-12 px-2 bg-transparent text-[15px] text-slate-900 placeholder:text-slate-400 focus:outline-none"
            />
            <button 
              onClick={() => setShowFilters(true)}
              className="h-[48px] px-6 bg-primary hover:bg-[#0052cc] text-white rounded-[12px] flex items-center gap-2 font-bold text-[15px] transition-all duration-300 shadow-md ml-2"
            >
              <SlidersHorizontal size={18} className="text-white/90" />
              Filters
            </button>
          </div>
        </div>
      </div>

      {/* MAIN GRID LAYOUT */}
      <div className="w-full max-w-[1280px] mx-auto px-[20px] md:px-[32px] lg:px-[48px] py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[20px] font-bold text-slate-900">Doctors ({filteredDoctors.length})</h2>
          <select className="bg-transparent text-[14px] font-medium text-slate-500 border-none focus:outline-none cursor-pointer">
            <option>Recommended</option>
            <option>Highest Rated</option>
            <option>Lowest Fee</option>
          </select>
        </div>

        {(() => {
          if (isLoading) {
            return (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[24px]">
                {[1, 2, 3, 4, 5, 6].map((skeleton) => (
                  <div key={skeleton} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-6 h-full">
                    <div className="w-24 h-24 bg-slate-200 animate-pulse rounded-full shrink-0"></div>
                    <div className="flex-1 space-y-3 py-2">
                      <div className="w-1/3 h-4 bg-slate-200 animate-pulse rounded"></div>
                      <div className="w-2/3 h-6 bg-slate-200 animate-pulse rounded"></div>
                      <div className="w-1/2 h-4 bg-slate-200 animate-pulse rounded"></div>
                      <div className="w-full h-8 bg-slate-100 animate-pulse rounded mt-4"></div>
                    </div>
                  </div>
                ))}
              </div>
            );
          }

          if (filteredDoctors.length === 0) {
            return (
              <div className="w-full py-20 flex flex-col items-center justify-center bg-white border border-slate-200 rounded-lg text-center">
                <div className="w-16 h-16 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-center mb-4">
                  <Search size={24} className="text-slate-400" />
                </div>
                <h3 className="text-[18px] font-bold text-slate-900 mb-1">No results</h3>
                <p className="text-[14px] text-slate-500">Try adjusting your filters.</p>
                <button 
                  onClick={() => {
                    setSearchQuery("");
                    setShowFilters(true);
                  }}
                  className="mt-4 px-4 py-2 bg-white border border-slate-200 hover:border-primary hover:text-primary rounded-md font-medium text-[14px] transition-colors"
                >
                  Adjust Filters
                </button>
              </div>
            );
          }

          return (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[24px]">
              {filteredDoctors.map(doctor => (
                <DoctorCard 
                  key={doctor.id} 
                  doctor={doctor} 
                />
              ))}
            </div>
          );
        })()}
      </div>

      {/* FILTER MODAL */}
      <DoctorFilterModal 
        isOpen={showFilters} 
        onClose={() => setShowFilters(false)} 
      />
    </div>
  );
}
