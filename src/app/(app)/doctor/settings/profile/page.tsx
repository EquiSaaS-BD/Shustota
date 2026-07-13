"use client";

import { useState } from "react";
import { mockDoctorProfile } from "@/lib/doctorMockData";
import { 
  Camera, 
  Save, 
  Award, 
  Users, 
  Star,
  CheckCircle2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProfileSettingsPage() {
  const [formData, setFormData] = useState(mockDoctorProfile);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">Profile Details</h1>
        <p className="text-slate-500 mt-1">Manage your public profile information visible to patients.</p>
      </div>

      {/* Top Banner Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Experience", value: formData.yearsExperience, icon: Award, color: "text-blue-500", bg: "bg-blue-50" },
          { label: "Patients", value: formData.totalPatients, icon: Users, color: "text-emerald-500", bg: "bg-emerald-50" },
          { label: "Rating", value: formData.rating, sub: `(${formData.reviewCount} Reviews)`, icon: Star, color: "text-amber-500", bg: "bg-amber-50" },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center gap-4 shadow-sm">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">{stat.label}</p>
              <div className="flex items-baseline gap-1">
                <p className="text-xl font-bold text-slate-800">{stat.value}</p>
                {stat.sub && <span className="text-xs font-medium text-slate-400">{stat.sub}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Form */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        
        {/* Photo Upload Section */}
        <div className="p-8 border-b border-slate-100 flex flex-col sm:flex-row items-center gap-6">
          <div className="relative group">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg bg-slate-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={formData.avatar} alt="Profile" className="w-full h-full object-cover" />
            </div>
            <button className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full shadow-md hover:bg-primary/90 transition-colors transform translate-x-1/4 translate-y-1/4">
              <Camera size={16} />
            </button>
          </div>
          <div className="text-center sm:text-left">
            <h3 className="font-bold text-slate-800">Profile Photo</h3>
            <p className="text-sm text-slate-500 mt-1 mb-3">Recommended size: 400x400px (JPG or PNG).</p>
            <div className="flex items-center justify-center sm:justify-start gap-3">
              <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-lg transition-colors">
                Change Photo
              </button>
              <button className="px-4 py-2 text-red-500 hover:bg-red-50 text-sm font-semibold rounded-lg transition-colors">
                Remove
              </button>
            </div>
          </div>
        </div>

        {/* Form Fields */}
        <div className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="settings-label">Full Name</label>
              <input 
                type="text" 
                className="settings-input"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div>
              <label className="settings-label">Professional Title</label>
              <input 
                type="text" 
                className="settings-input"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="e.g. Senior Consultant"
              />
            </div>
            <div>
              <label className="settings-label">Specialization</label>
              <select 
                className="settings-input appearance-none"
                value={formData.specialization}
                onChange={(e) => setFormData({...formData, specialization: e.target.value})}
              >
                <option value="Cardiology">Cardiology</option>
                <option value="Neurology">Neurology</option>
                <option value="Pediatrics">Pediatrics</option>
                <option value="Orthopedics">Orthopedics</option>
                <option value="Dermatology">Dermatology</option>
              </select>
            </div>
            <div>
              <label className="settings-label">Consultation Fee (৳)</label>
              <input 
                type="number" 
                className="settings-input"
                value={formData.consultationFee}
                onChange={(e) => setFormData({...formData, consultationFee: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className="settings-label">About / Bio</label>
            <textarea 
              className="w-full min-h-[120px] p-4 bg-slate-50 border border-slate-200 rounded-xl text-[14px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all resize-y"
              value={formData.bio}
              onChange={(e) => setFormData({...formData, bio: e.target.value})}
              placeholder="Write a short biography about your experience and expertise..."
            />
          </div>
        </div>
        
        {/* Footer Actions */}
        <div className="p-6 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <AnimatePresence>
            {showSuccess ? (
              <motion.div 
                initial={{ opacity: 0, x: -20 }} 
                animate={{ opacity: 1, x: 0 }} 
                exit={{ opacity: 0, x: -20 }}
                className="flex items-center gap-2 text-emerald-600 font-medium text-sm"
              >
                <CheckCircle2 size={18} />
                Profile updated successfully
              </motion.div>
            ) : (
              <div /> // Spacer
            )}
          </AnimatePresence>

          <div className="flex items-center gap-3">
            <button className="px-6 py-2.5 text-slate-600 font-semibold hover:bg-slate-200 rounded-xl transition-colors">
              Cancel
            </button>
            <button 
              onClick={handleSave}
              disabled={isSaving}
              className="px-6 py-2.5 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl shadow-md transition-all flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSaving ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Save size={18} />
              )}
              Save Changes
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
