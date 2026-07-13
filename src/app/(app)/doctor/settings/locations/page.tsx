"use client";

import { useState } from "react";
import { mockPracticeLocations } from "@/lib/doctorMockData";
import { 
  Building2, 
  MapPin, 
  Plus, 
  Edit2, 
  Trash2,
  ExternalLink
} from "lucide-react";

export default function PracticeLocationsSettingsPage() {
  const [locations, setLocations] = useState(mockPracticeLocations);

  return (
    <div className="space-y-8 animate-fade-in-up">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">Practice Locations</h1>
          <p className="text-slate-500 mt-1">Add and manage all hospitals or clinics where you practice.</p>
        </div>
        <button className="px-5 py-2.5 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl shadow-md transition-all flex items-center gap-2 shrink-0 w-fit">
          <Plus size={18} />
          Add Location
        </button>
      </div>

      {/* Locations List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {locations.map((location) => (
          <div key={location.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col group hover:border-primary/30 transition-colors">
            
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
                <Building2 size={24} />
              </div>
              <div className="flex items-center gap-1">
                <button className="p-2 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors">
                  <Edit2 size={16} />
                </button>
                <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            <h3 className="text-lg font-bold text-slate-800 mb-2">{location.name}</h3>
            
            <div className="flex items-start gap-2 mt-auto pt-4 border-t border-slate-100">
              <MapPin size={16} className="text-slate-400 mt-0.5 shrink-0" />
              <p className="text-sm text-slate-500 flex-1">{location.address}</p>
            </div>
            
            <button className="mt-4 flex items-center justify-center gap-2 w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 font-semibold text-sm rounded-lg transition-colors border border-slate-200">
              <ExternalLink size={14} /> View on Map
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}
