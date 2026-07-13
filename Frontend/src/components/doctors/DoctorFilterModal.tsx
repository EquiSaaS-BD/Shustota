import { useState } from "react";
import { X, SlidersHorizontal } from "lucide-react";

interface DoctorFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const specializations = ["Cardiologist", "Neurologist", "Dentist", "Orthopedic", "Gynecologist", "Pediatrician"];
const availability = ["Available Today", "Available Tomorrow", "Next Week"];
const consultationTypes = ["Hospital Visit", "Video Call", "Audio Call", "Home Visit"];

export function DoctorFilterModal({ isOpen, onClose }: DoctorFilterModalProps) {
  const [selectedSpecs, setSelectedSpecs] = useState<string[]>([]);
  const [selectedAvail, setSelectedAvail] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [feeRange, setFeeRange] = useState<number>(5000);

  if (!isOpen) return null;

  const toggleSelection = (set: React.Dispatch<React.SetStateAction<string[]>>, list: string[], item: string) => {
    set(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
  };

  const handleApply = () => {
    // In a real app, you would pass these filters up to the parent component
    onClose();
  };

  const handleClear = () => {
    setSelectedSpecs([]);
    setSelectedAvail([]);
    setSelectedTypes([]);
    setFeeRange(5000);
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-xl w-full max-w-[500px] shadow-lg flex flex-col max-h-[90vh] overflow-hidden animate-fade-in-up border border-slate-200">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <h2 className="text-[18px] font-bold text-slate-900 flex items-center gap-2">
            <SlidersHorizontal size={18} className="text-slate-500" />
            Filters
          </h2>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:bg-slate-50 rounded-md transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto scrollbar-thin space-y-6">
          
          {/* Speciality */}
          <div>
            <h3 className="text-[14px] font-bold text-slate-900 mb-3">Speciality</h3>
            <div className="flex flex-wrap gap-2">
              {specializations.map(spec => (
                <button 
                  key={spec}
                  onClick={() => toggleSelection(setSelectedSpecs, selectedSpecs, spec)}
                  className={`px-4 py-2 rounded-md text-[13px] font-medium transition-colors ${
                    selectedSpecs.includes(spec) 
                      ? "bg-slate-900 text-white" 
                      : "bg-slate-50 text-slate-600 border border-slate-200 hover:border-slate-300"
                  }`}
                >
                  {spec}
                </button>
              ))}
            </div>
          </div>

          {/* Consultation Type */}
          <div>
            <h3 className="text-[15px] font-bold text-[#0F172A] mb-3">Consultation Type</h3>
            <div className="flex flex-wrap gap-2">
              {consultationTypes.map(type => (
                <button 
                  key={type}
                  onClick={() => toggleSelection(setSelectedTypes, selectedTypes, type)}
                  className={`px-[16px] py-[8px] rounded-full text-[13px] font-medium transition-colors ${
                    selectedTypes.includes(type) 
                      ? "bg-primary text-white border-primary" 
                      : "bg-[#F8FAFC] text-[#64748B] border border-[#E2E8F0] hover:border-primary/50"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Availability */}
          <div>
            <h3 className="text-[15px] font-bold text-[#0F172A] mb-3">Availability</h3>
            <div className="flex flex-wrap gap-2">
              {availability.map(avail => (
                <button 
                  key={avail}
                  onClick={() => toggleSelection(setSelectedAvail, selectedAvail, avail)}
                  className={`px-[16px] py-[8px] rounded-full text-[13px] font-medium transition-colors ${
                    selectedAvail.includes(avail) 
                      ? "bg-primary text-white border-primary" 
                      : "bg-[#F8FAFC] text-[#64748B] border border-[#E2E8F0] hover:border-primary/50"
                  }`}
                >
                  {avail}
                </button>
              ))}
            </div>
          </div>

          {/* Consultation Fee */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-[15px] font-bold text-[#0F172A]">Consultation Fee</h3>
              <span className="text-[14px] font-bold text-primary">Up to ৳{feeRange}</span>
            </div>
            <div className="px-1">
              <input 
                type="range" 
                min="500" 
                max="5000"
                step="500"
                value={feeRange}
                onChange={(e) => setFeeRange(Number(e.target.value))}
                className="w-full h-1.5 bg-[#E2E8F0] rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-[12px] text-[#64748B] mt-2 font-medium">
                <span>৳500</span>
                <span>৳5000+</span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-end gap-3">
          <button 
            onClick={handleClear}
            className="px-6 py-2.5 text-slate-600 hover:text-slate-900 font-medium transition-colors text-[14px]"
          >
            Clear
          </button>
          <button 
            onClick={handleApply}
            className="px-6 py-2.5 bg-primary hover:bg-[#0052cc] text-white rounded-md font-medium transition-colors text-[14px]"
          >
            Show Results
          </button>
        </div>

      </div>
    </div>
  );
}
