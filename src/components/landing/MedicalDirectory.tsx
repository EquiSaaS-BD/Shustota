"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, Star, Building2, UserCircle2, ArrowRight, ChevronLeft, ChevronRight, BadgeCheck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";
import Image from "next/image";
import { mockDoctors } from "@/lib/mockData";

export function MedicalDirectory() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<"doctors" | "hospitals">("doctors");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [searchType, setSearchType] = useState<"doctors" | "hospitals">("doctors");
  const [filteredDoctors, setFilteredDoctors] = useState(mockDoctors);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === "left" ? -350 : 350;
      current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const handleSearch = () => {
    setActiveTab(searchType);
    if (searchType === "doctors") {
      const filtered = mockDoctors.filter(doc => {
        const matchesQuery = !searchQuery || 
                             doc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             doc.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             doc.hospital.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesLocation = !searchLocation || doc.location.toLowerCase().includes(searchLocation.toLowerCase());
        return matchesQuery && matchesLocation;
      });
      setFilteredDoctors(filtered);
    }
  };

  const hospitals = [
    { name: "Square Hospitals Ltd.", type: "Multi-specialty", rating: "4.8", loc: "Panthapath, Dhaka", img: "https://ui-avatars.com/api/?name=Square+Hospital&background=e8edff&color=003d9b" },
    { name: "Evercare Hospital", type: "JCI Accredited", rating: "4.9", loc: "Bashundhara, Dhaka", img: "https://ui-avatars.com/api/?name=Evercare+Hospital&background=e8edff&color=003d9b" },
    { name: "Labaid Specialized", type: "Cardiac & General", rating: "4.7", loc: "Dhanmondi, Dhaka", img: "https://ui-avatars.com/api/?name=Labaid+Specialized&background=e8edff&color=003d9b" },
  ];

  return (
    <section id="doctors" className="relative py-16 lg:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-4xl mx-auto mb-16 lg:mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4"
          >
            <Search size={16} />
            {t("Medical Directory", "মেডিকেল ডিরেক্টরি")}
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl lg:text-5xl font-bold text-[#0a1628] leading-tight"
          >
            {t("Find the Best Doctors & Hospitals", "সেরা ডাক্তার ও হাসপাতাল খুঁজুন")}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-lg text-slate-500 max-w-5xl mx-auto"
          >
            {t(
              "Book appointments with top healthcare professionals and leading hospitals across Bangladesh instantly.",
              "বাংলাদেশের শীর্ষস্থানীয় ডাক্তার এবং সেরা হাসপাতালগুলোতে মুহূর্তেই অ্যাপয়েন্টমেন্ট বুক করুন।"
            )}
          </motion.p>
        </div>

        {/* Search Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto bg-white p-3 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col md:flex-row gap-3 mb-16 relative z-20"
        >
          {/* Filter Type */}
          <div className="flex items-center bg-slate-50 rounded-xl px-4 py-3 md:w-48 border-r border-slate-200/50">
            <select 
              value={searchType}
              onChange={(e) => setSearchType(e.target.value as "doctors" | "hospitals")}
              className="bg-transparent border-none outline-none w-full text-slate-700 font-bold cursor-pointer"
            >
              <option value="doctors">{t("Doctors", "ডাক্তার")}</option>
              <option value="hospitals">{t("Hospitals", "হাসপাতাল")}</option>
            </select>
          </div>

          <div className="flex-1 flex items-center bg-slate-50 rounded-xl px-4 py-3">
            <Search size={20} className="text-slate-400 mr-3 shrink-0" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={searchType === "doctors" ? t("Search by doctor name or specialty...", "ডাক্তারের নাম বা স্পেশালিটি খুঁজুন...") : t("Search hospitals...", "হাসপাতাল খুঁজুন...")}
              className="bg-transparent border-none outline-none w-full text-slate-700 placeholder:text-slate-400"
            />
          </div>
          <div className="flex-1 flex items-center bg-slate-50 rounded-xl px-4 py-3">
            <MapPin size={20} className="text-slate-400 mr-3 shrink-0" />
            <input 
              type="text" 
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              placeholder={t("Location (e.g. Dhaka)", "লোকেশন (যেমন: ঢাকা)")}
              className="bg-transparent border-none outline-none w-full text-slate-700 placeholder:text-slate-400"
            />
          </div>
          <button onClick={handleSearch} className="bg-primary text-white font-bold px-8 py-3 rounded-xl hover:bg-primary-container transition-colors">
            {t("Search", "খুঁজুন")}
          </button>
        </motion.div>

        {/* Toggle Tabs */}
        <div className="flex justify-center mb-10 relative z-20">
          <div className="bg-slate-100 p-1.5 rounded-xl flex gap-2 shadow-inner">
            <button
              onClick={() => setActiveTab("doctors")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
                activeTab === "doctors" ? "bg-white text-primary shadow-sm" : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <UserCircle2 size={18} />
              {t("Top Doctors", "শীর্ষ ডাক্তার")}
            </button>
            <button
              onClick={() => setActiveTab("hospitals")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
                activeTab === "hospitals" ? "bg-white text-primary shadow-sm" : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <Building2 size={18} />
              {t("Top Hospitals", "শীর্ষ হাসপাতাল")}
            </button>
          </div>
        </div>

        {/* Directory Grid */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {activeTab === "doctors" ? (
                <motion.div 
                key="doctors"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="relative group/slider"
              >
                {/* Scroll Buttons */}
                <button 
                  onClick={() => scroll("left")}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.08)] p-3 rounded-full border border-slate-100 text-slate-400 hover:text-primary hover:scale-110 transition-all opacity-0 group-hover/slider:opacity-100 hidden md:block"
                >
                  <ChevronLeft size={24} />
                </button>
                <button 
                  onClick={() => scroll("right")}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.08)] p-3 rounded-full border border-slate-100 text-slate-400 hover:text-primary hover:scale-110 transition-all opacity-0 group-hover/slider:opacity-100 hidden md:block"
                >
                  <ChevronRight size={24} />
                </button>

                {/* Slider Container */}
                <div 
                  ref={scrollRef}
                  className="flex gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-8 pt-4 px-4 -mx-4"
                >
                  {filteredDoctors.map((doc) => (
                    <motion.div 
                      key={doc.id}
                      whileHover={{ y: -5 }}
                      className="w-[85vw] max-w-[320px] sm:min-w-[320px] snap-center bg-white border border-slate-100 rounded-3xl p-6 shadow-lg shadow-slate-200/40 group hover:border-primary/20 transition-all shrink-0"
                    >
                      <div className="flex items-start justify-between mb-6">
                        <div className="w-16 h-16 rounded-full overflow-hidden shadow-md ring-2 ring-green-500 ring-offset-2 ring-offset-white">
                          <img src={doc.image} alt={doc.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex items-center gap-1 bg-orange-50 text-orange-600 px-2 py-1 rounded-lg text-xs font-bold">
                          <Star size={12} className="fill-orange-500" />
                          {doc.rating}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-xl text-[#0a1628] truncate">{doc.name}</h3>
                        {doc.verified && <BadgeCheck size={20} className="text-blue-500 fill-blue-50 shrink-0" />}
                      </div>
                      <p className="text-primary font-medium text-sm mb-4 truncate">{doc.specialty}</p>
                      
                      <div className="space-y-2 mb-6">
                        <div className="flex items-center gap-2 text-slate-500 text-sm">
                          <UserCircle2 size={16} /> {doc.experienceYears} Years Exp.
                        </div>
                        <div className="flex items-center gap-2 text-slate-500 text-sm truncate">
                          <MapPin size={16} /> {doc.location}
                        </div>
                      </div>

                      <Link href={`/doctors/${doc.id}`} className="w-full bg-slate-50 border border-slate-200 hover:border-primary hover:bg-primary hover:text-white text-primary font-bold text-sm py-3 rounded-xl flex items-center justify-center transition-colors">
                        {t("Book Appointment", "অ্যাপয়েন্টমেন্ট বুক করুন")}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="hospitals"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
              >
                {hospitals.map((hosp, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ y: -5 }}
                    className="bg-white border border-slate-100 rounded-3xl p-6 shadow-lg shadow-slate-200/40 group hover:border-secondary/20 transition-all"
                  >
                    <div className="flex items-start justify-between mb-6">
                      <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 shadow-sm p-1">
                        <img src={hosp.img} alt={hosp.name} className="w-full h-full object-cover rounded-xl" />
                      </div>
                      <div className="flex items-center gap-1 bg-orange-50 text-orange-600 px-2 py-1 rounded-lg text-xs font-bold">
                        <Star size={12} className="fill-orange-500" />
                        {hosp.rating}
                      </div>
                    </div>
                    <h3 className="font-bold text-xl text-[#0a1628] mb-1">{hosp.name}</h3>
                    <p className="text-secondary font-medium text-sm mb-4">{hosp.type}</p>
                    
                    <div className="space-y-2 mb-6">
                      <div className="flex items-center gap-2 text-slate-500 text-sm">
                        <MapPin size={16} /> {hosp.loc}
                      </div>
                    </div>

                    <Link href="/hospitals" className="w-full bg-slate-50 hover:bg-secondary hover:text-white text-secondary font-bold text-sm py-3 rounded-xl flex items-center justify-center transition-colors">
                      {t("View Details", "বিস্তারিত দেখুন")}
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* View All CTA */}
          <div className="flex justify-center mt-12">
            <Link href={activeTab === "doctors" ? "/doctors" : "/hospitals"} className="group flex items-center gap-2 text-slate-500 hover:text-primary font-bold transition-colors">
              {activeTab === "doctors" ? t("View All Doctors", "সব ডাক্তার দেখুন") : t("View All Hospitals", "সব হাসপাতাল দেখুন")}
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
