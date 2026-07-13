"use client";

import { useState } from "react";
import { FileText, Download, Eye, File, Calendar, User, Search, Filter, Stethoscope, FlaskConical, Receipt } from "lucide-react";

const mockReports = [
  { id: 1, title: "Complete Blood Count (CBC)", date: "10 Jul 2026", doctor: "Dr. Sarah Rahman", type: "Lab Result", size: "2.4 MB" },
  { id: 2, title: "Chest X-Ray Report", date: "05 Jul 2026", doctor: "Dr. Ahmed Khan", type: "Lab Result", size: "5.1 MB" },
  { id: 3, title: "Prescription - Viral Fever", date: "28 Jun 2026", doctor: "Dr. Farah Islam", type: "Prescription", size: "1.2 MB" },
  { id: 4, title: "Hospital Discharge Bill", date: "15 Jun 2026", doctor: "Square Hospital", type: "Bill", size: "800 KB" },
  { id: 5, title: "Lipid Profile Test", date: "02 May 2026", doctor: "Labaid Diagnostic", type: "Lab Result", size: "1.8 MB" },
  { id: 6, title: "Dermatology Prescription", date: "20 Apr 2026", doctor: "Dr. Tarek Hasan", type: "Prescription", size: "1.1 MB" },
];

const categories = ["All", "Lab Result", "Prescription", "Bill"];

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredReports = mockReports.filter(report => 
    (activeTab === "All" || report.type === activeTab) &&
    report.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getIcon = (type: string) => {
    switch(type) {
      case "Lab Result": return <FlaskConical className="text-purple-500" />;
      case "Prescription": return <Stethoscope className="text-blue-500" />;
      case "Bill": return <Receipt className="text-orange-500" />;
      default: return <FileText className="text-primary" />;
    }
  };

  const getBadgeColor = (type: string) => {
    switch(type) {
      case "Lab Result": return "bg-purple-50 text-purple-600 border-purple-100";
      case "Prescription": return "bg-blue-50 text-blue-600 border-blue-100";
      case "Bill": return "bg-orange-50 text-orange-600 border-orange-100";
      default: return "bg-slate-100 text-slate-600 border-slate-200";
    }
  };

  return (
    <div className="w-full h-full overflow-y-auto bg-[#F8FAFC] font-sans">
      
      {/* Header Section */}
      <div className="bg-white border-b border-slate-200 px-6 lg:px-12 py-8 sticky top-0 z-20 shadow-sm">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-[28px] md:text-[32px] font-[800] text-slate-900 leading-tight">My Medical Reports</h1>
            <p className="text-[15px] text-slate-500 font-medium mt-1">Access all your test results, prescriptions, and bills in one place.</p>
          </div>
          
          <div className="relative w-full md:w-[350px]">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-slate-400" />
            </div>
            <input 
              type="text" 
              placeholder="Search reports..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-10 pr-4 bg-slate-50 border border-slate-200 rounded-[14px] text-[15px] font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all shadow-inner"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="max-w-[1200px] mx-auto flex overflow-x-auto gap-2 mt-8 scrollbar-hide pb-2">
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-5 py-2.5 rounded-full text-[14px] font-bold whitespace-nowrap transition-all duration-300 ${
                activeTab === cat 
                  ? "bg-primary text-white shadow-md shadow-primary/20" 
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 py-10 pb-[120px]">
        
        {filteredReports.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-[24px] border border-slate-200 shadow-sm">
            <File size={48} className="mx-auto text-slate-300 mb-4" />
            <h3 className="text-[18px] font-bold text-slate-900 mb-1">No reports found</h3>
            <p className="text-[14px] text-slate-500">We couldn't find any documents matching your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {filteredReports.map(report => (
              <div key={report.id} className="bg-white rounded-[20px] p-5 md:p-6 border border-slate-200 shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1 hover:border-primary/30 transition-all duration-300 flex flex-col sm:flex-row gap-5 group">
                
                <div className="w-16 h-16 rounded-[16px] bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 group-hover:bg-primary/5 group-hover:border-primary/20 transition-colors">
                  {getIcon(report.type)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-[16px] md:text-[18px] font-bold text-slate-900 truncate pr-4 group-hover:text-primary transition-colors">{report.title}</h3>
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide border shrink-0 ${getBadgeColor(report.type)}`}>
                      {report.type}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4 text-[13px] font-medium text-slate-500 mt-3 mb-5">
                    <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">
                      <Calendar size={14} className="text-slate-400" /> {report.date}
                    </div>
                    <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">
                      <User size={14} className="text-slate-400" /> {report.doctor}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <span className="text-[13px] font-bold text-slate-400">{report.size} • PDF</span>
                    <div className="flex items-center gap-2">
                      <button className="h-10 px-4 bg-slate-50 hover:bg-primary/10 text-slate-600 hover:text-primary rounded-xl font-bold text-[13px] transition-colors flex items-center gap-2">
                        <Eye size={16} /> <span className="hidden sm:inline">View</span>
                      </button>
                      <button className="h-10 px-4 bg-primary hover:bg-[#0052cc] text-white rounded-xl font-bold text-[13px] shadow-sm shadow-primary/20 transition-colors flex items-center gap-2">
                        <Download size={16} /> <span className="hidden sm:inline">Download</span>
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
