"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, MapPin, Star, Bed, Stethoscope, BadgeCheck, Filter } from "lucide-react";

// Mock Data for Hospitals
const hospitals = [
  {
    id: "hosp_01",
    name: "Labaid Specialized Hospital",
    type: "Multispecialty",
    location: "Dhanmondi, Dhaka",
    rating: 4.8,
    beds: "500",
    doctors: "150+",
    verified: true,
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&h=400&fit=crop",
    logo: "/images/shustota-icon.png",
  },
  {
    id: "hosp_02",
    name: "Green Life Hospital",
    type: "General Hospital",
    location: "Green Road, Dhaka",
    rating: 4.5,
    beds: "300",
    doctors: "120+",
    verified: true,
    image: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?w=600&h=400&fit=crop",
    logo: "/images/shustota-icon.png",
  },
  {
    id: "hosp_03",
    name: "Square Hospitals Ltd.",
    type: "Multispecialty",
    location: "Panthapath, Dhaka",
    rating: 4.9,
    beds: "400",
    doctors: "200+",
    verified: true,
    image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=600&h=400&fit=crop",
    logo: "/images/shustota-icon.png",
  },
  {
    id: "hosp_04",
    name: "Ibn Sina Specialized Hospital",
    type: "Diagnostic & Hospital",
    location: "Dhanmondi, Dhaka",
    rating: 4.6,
    beds: "350",
    doctors: "180+",
    verified: true,
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&h=400&fit=crop",
    logo: "/images/shustota-icon.png",
  },
];

const categories = ["All", "Multispecialty", "Diagnostic & Hospital", "General Hospital", "Eye Hospital", "Dental Clinic"];

export default function HospitalsDirectory() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const filteredHospitals = hospitals.filter(hospital => {
    const matchesSearch = hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          hospital.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || hospital.type === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="h-full overflow-y-auto bg-slate-50 font-sans pb-32">
      
      {/* Header & Search */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200 px-6 py-5">
        <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          <div>
            <h1 className="font-[800] text-[24px] text-slate-900 leading-tight">Hospitals & Clinics</h1>
            <p className="text-[14px] text-slate-500 font-medium">Find and book the best healthcare facilities near you.</p>
          </div>

          {/* Search Bar with Attached Filter */}
          <div className="relative flex w-full md:w-auto items-center">
            
            {/* Category Dropdown Button */}
            <div className="relative">
              <button 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="h-12 pl-4 pr-3 bg-white border border-r-0 border-slate-200 rounded-l-[16px] flex items-center gap-2 text-[14px] font-semibold text-slate-700 hover:bg-slate-50 transition-colors z-10"
              >
                <Filter size={16} className="text-primary" />
                <span className="hidden sm:inline-block max-w-[100px] truncate">{selectedCategory}</span>
              </button>

              {/* Dropdown Menu */}
              {isFilterOpen && (
                <div className="absolute top-[52px] left-0 w-[200px] bg-white border border-slate-100 shadow-xl rounded-[16px] py-2 z-50 overflow-hidden">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => { setSelectedCategory(cat); setIsFilterOpen(false); }}
                      className={`w-full text-left px-4 py-2.5 text-[14px] font-medium transition-colors ${selectedCategory === cat ? 'bg-primary/5 text-primary' : 'text-slate-600 hover:bg-slate-50'}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="w-[1px] h-8 bg-slate-200 z-10" />

            {/* Search Input */}
            <div className="relative flex-1 md:w-[300px] lg:w-[400px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search hospital or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 pl-10 pr-4 bg-white border border-l-0 border-slate-200 rounded-r-[16px] text-[15px] font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>

          </div>

        </div>
      </div>

      {/* Grid Content */}
      <div className="max-w-[1280px] mx-auto px-6 py-8">
        
        {/* Results Info */}
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-[16px] font-bold text-slate-700">
            Showing {filteredHospitals.length} Hospitals
          </h2>
        </div>
        {/* Hospital Cards Grid */}
        {(() => {
          if (isLoading) {
            return (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((skeleton) => (
                  <div key={skeleton} className="bg-white rounded-[20px] border border-slate-200 overflow-hidden shadow-sm flex flex-col group h-[380px]">
                    <div className="w-full h-[180px] bg-slate-200 animate-pulse"></div>
                    <div className="p-5 flex flex-col flex-1">
                      <div className="w-3/4 h-6 bg-slate-200 animate-pulse rounded mb-4"></div>
                      <div className="flex gap-4 mb-6">
                        <div className="w-20 h-8 bg-slate-200 animate-pulse rounded-xl"></div>
                        <div className="w-20 h-8 bg-slate-200 animate-pulse rounded-xl"></div>
                      </div>
                      <div className="mt-auto pt-4 border-t border-slate-100">
                        <div className="w-full h-12 bg-slate-200 animate-pulse rounded-[14px]"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            );
          }

          if (filteredHospitals.length === 0) {
            return (
              <div className="text-center py-20">
                <Search className="mx-auto text-slate-300 mb-4" size={48} />
                <h3 className="text-[18px] font-bold text-slate-900 mb-1">No Hospitals Found</h3>
                <p className="text-slate-500">Try adjusting your search or filter criteria.</p>
              </div>
            );
          }

          return (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredHospitals.map((hosp) => (
                <div key={hosp.id} className="bg-white rounded-[20px] border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col group">
                  
                  {/* Cover Image */}
                  <div className="relative w-full h-[180px] bg-slate-100 overflow-hidden">
                    <Image src={hosp.image} alt={hosp.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    
                    {hosp.verified && (
                      <div className="absolute top-4 right-4 bg-primary/90 backdrop-blur-sm text-white px-2.5 py-1 rounded-full text-[12px] font-bold flex items-center gap-1 shadow-sm">
                        <BadgeCheck size={14} /> Verified
                      </div>
                    )}

                    <div className="absolute bottom-4 left-4 flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-white p-1 border-2 border-white shadow-md relative overflow-hidden shrink-0">
                        <Image src={hosp.logo} alt="Logo" fill className="object-contain" />
                      </div>
                      <div>
                        <div className="bg-white/20 backdrop-blur-md px-2 py-0.5 rounded text-[11px] font-semibold text-white mb-0.5 inline-block">
                          {hosp.type}
                        </div>
                        <div className="flex items-center gap-1 text-white text-[13px] font-medium drop-shadow-md">
                          <MapPin size={14} /> {hosp.location}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-[800] text-[18px] text-slate-900 leading-tight pr-4 group-hover:text-primary transition-colors">
                        {hosp.name}
                      </h3>
                      <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg text-[13px] font-bold text-yellow-600 shrink-0">
                        <Star size={14} className="fill-current" /> {hosp.rating}
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex gap-4 mb-6 text-slate-500">
                      <div className="flex items-center gap-1.5 text-[14px] font-medium bg-slate-50 px-3 py-1.5 rounded-xl">
                        <Stethoscope size={16} className="text-primary" /> {hosp.doctors} Doctors
                      </div>
                      <div className="flex items-center gap-1.5 text-[14px] font-medium bg-slate-50 px-3 py-1.5 rounded-xl">
                        <Bed size={16} className="text-primary" /> {hosp.beds} Beds
                      </div>
                    </div>

                    <div className="mt-auto pt-4 border-t border-slate-100 flex gap-3">
                      <Link href={`/hospitals/${hosp.id}`} className="flex-1 h-12 bg-primary hover:bg-[#0052cc] text-white rounded-[14px] flex items-center justify-center font-bold text-[14px] transition-colors shadow-md shadow-primary/20">
                        View Profile & Book
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          );
        })()}

      </div>
    </div>
  );
}
