"use client";

import React from "react";
import Link from "next/link";
import { FileText, Plus, Search, Filter, Calendar } from "lucide-react";

export default function PrescriptionsPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto flex flex-col gap-6">
      
      {/* Header Area */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <FileText className="text-[#2F80ED]" />
            Prescriptions
          </h1>
          <p className="text-slate-500 mt-1 text-sm">Manage and view all your patient prescriptions.</p>
        </div>
        
        <Link href="/doctor/dashboard/prescription/new" className="bg-[#6DDA6E] hover:bg-[#5bc95c] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-md shadow-[#6DDA6E]/20 transition-all hover:-translate-y-0.5 active:scale-95">
          <Plus size={20} />
          Create New Prescription
        </Link>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by Patient Name, ID, or Date..."
            className="w-full h-12 pl-12 pr-4 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#2F80ED] focus:ring-4 focus:ring-[#2F80ED]/10 transition-all shadow-sm"
          />
        </div>
        <button className="h-12 px-6 bg-white border border-slate-200 rounded-xl flex items-center gap-2 text-slate-600 font-bold hover:bg-slate-50 transition-colors shadow-sm shrink-0">
          <Filter size={18} />
          Filters
        </button>
      </div>

      {/* Empty State / List */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center p-16 text-center">
        <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6 text-[#2F80ED]">
          <FileText size={32} />
        </div>
        <div className="flex flex-col items-center gap-3 mb-8">
          <h2 className="text-xl font-bold text-slate-800">No Recent Prescriptions</h2>
          <p className="text-slate-500 text-lg">You haven't created any prescriptions yet today. Click the button below to start a new smart e-prescription.</p>
        </div>
        
        <Link href="/doctor/dashboard/prescription/new" className="bg-[#2F80ED] hover:bg-[#2563EB] text-white px-8 py-3.5 rounded-xl font-bold flex items-center gap-2 shadow-md transition-all active:scale-95 text-lg">
          <Plus size={22} />
          Write Prescription
        </Link>
      </div>

    </div>
  );
}
