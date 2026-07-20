import React, { useState } from "react";
import { Plus, Search, Trash2, GripVertical, Info, Mic, Sparkles } from "lucide-react";
import { usePrescription } from "@/context/PrescriptionContext";

export function MedicineBuilder() {
  const { data, updateData } = usePrescription();
  const medicines = data.medicines;
  
  const setMedicines = (newMedicines: typeof data.medicines) => {
    updateData({ medicines: newMedicines });
  };

  const [searchInput, setSearchInput] = useState("");

  const addEmptyMedicine = () => {
    setMedicines([...medicines, { 
      id: Date.now(), 
      name: "", 
      type: "Tablet", 
      dosageM: "", dosageN: "", dosageE: "", 
      frequency: "Daily", 
      duration: "", 
      notes: "" 
    }]);
  };

  const addAISuggestion = () => {
    setMedicines([...medicines, { 
      id: Date.now(), 
      name: "Cap. Seclo 20mg", 
      type: "Capsule", 
      dosageM: "1", dosageN: "0", dosageE: "1", 
      frequency: "Daily", 
      duration: "14 Days", 
      notes: "Before meal" 
    }]);
  };

  const removeMedicine = (id: number | string) => {
    setMedicines(medicines.filter(m => m.id !== id));
  };

  const updateMedicine = (id: number | string, field: string, value: string) => {
    setMedicines(medicines.map(m => m.id === id ? { ...m, [field]: value } : m));
  };

  const handleSearchEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchInput.trim() !== '') {
      setMedicines([...medicines, { 
        id: Date.now(), 
        name: searchInput, 
        type: "Tablet", 
        dosageM: "", dosageN: "", dosageE: "", 
        frequency: "Daily", 
        duration: "", 
        notes: "" 
      }]);
      setSearchInput("");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Medicine Toolbar */}
      <div className="h-[56px] bg-white border border-slate-200 rounded-[14px] px-4 flex items-center justify-between shadow-sm">
        <h3 className="font-semibold text-[16px] text-[#111827]">Rx Medicines</h3>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1.5 text-[13px] font-semibold text-slate-500 hover:text-slate-800 transition-colors">
            <Mic size={16} /> Voice Input
          </button>
          <button onClick={addAISuggestion} className="flex items-center gap-1.5 text-[13px] font-semibold text-purple-600 hover:text-purple-700 transition-colors">
            <Sparkles size={16} /> AI Suggestion
          </button>
          <button onClick={addEmptyMedicine} className="flex items-center gap-1.5 text-[13px] font-bold text-white bg-[#6DDA6E] px-4 py-2 rounded-[10px] hover:bg-[#5bc95c] transition-colors h-[36px]">
            <Plus size={16} /> Add Medicine
          </button>
        </div>
      </div>

      {/* Medicine List (Horizontally Scrollable) */}
      <div className="overflow-x-auto custom-scrollbar pb-2">
        <div className="flex flex-col gap-3 min-w-[890px]">
          {medicines.map((med) => (
            <div key={med.id} className="h-[72px] bg-white border border-slate-200 hover:border-slate-300 rounded-[14px] px-3 flex items-center gap-3 shadow-sm transition-all group">
              <button className="text-slate-300 hover:text-slate-500 cursor-grab active:cursor-grabbing shrink-0">
                <GripVertical size={18} />
              </button>
              
              <div className="w-[280px] shrink-0 flex flex-col justify-center">
                <label className="text-[10px] font-bold uppercase text-slate-500 tracking-wider mb-1 block">Medicine Name</label>
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="text" 
                    value={med.name} 
                    onChange={(e) => updateMedicine(med.id, 'name', e.target.value)}
                    placeholder="Search medicine..."
                    className="w-full h-8 pl-8 pr-3 bg-slate-50 border border-slate-200 rounded-[8px] text-[13px] font-semibold text-slate-800 focus:outline-none focus:border-[#2F80ED]"
                  />
                </div>
              </div>

              {/* 3-Box Dosage UI */}
              <div className="w-[120px] shrink-0 flex flex-col justify-center">
                <label className="text-[10px] font-bold uppercase text-slate-500 tracking-wider mb-1 block text-center">Dosage</label>
                <div className="flex items-center justify-center gap-1.5 text-slate-400 text-sm font-bold">
                  <input 
                    type="text" 
                    value={med.dosageM} 
                    onChange={(e) => updateMedicine(med.id, 'dosageM', e.target.value)}
                    placeholder="1"
                    className="w-8 h-8 bg-slate-50 border border-slate-200 rounded-[8px] text-[13px] font-bold text-slate-800 text-center focus:outline-none focus:border-[#2F80ED] focus:bg-white"
                  />
                  <span>+</span>
                  <input 
                    type="text" 
                    value={med.dosageN} 
                    onChange={(e) => updateMedicine(med.id, 'dosageN', e.target.value)}
                    placeholder="0"
                    className="w-8 h-8 bg-slate-50 border border-slate-200 rounded-[8px] text-[13px] font-bold text-slate-800 text-center focus:outline-none focus:border-[#2F80ED] focus:bg-white"
                  />
                  <span>+</span>
                  <input 
                    type="text" 
                    value={med.dosageE} 
                    onChange={(e) => updateMedicine(med.id, 'dosageE', e.target.value)}
                    placeholder="1"
                    className="w-8 h-8 bg-slate-50 border border-slate-200 rounded-[8px] text-[13px] font-bold text-slate-800 text-center focus:outline-none focus:border-[#2F80ED] focus:bg-white"
                  />
                </div>
              </div>

              <div className="w-[100px] shrink-0 flex flex-col justify-center">
                <label className="text-[10px] font-bold uppercase text-slate-500 tracking-wider mb-1 block">Frequency</label>
                <input 
                  type="text" 
                  value={med.frequency}
                  onChange={(e) => updateMedicine(med.id, 'frequency', e.target.value)}
                  placeholder="Daily"
                  className="w-full h-8 px-3 bg-slate-50 border border-slate-200 rounded-[8px] text-[13px] font-medium text-slate-700 text-center focus:outline-none focus:border-[#2F80ED]"
                />
              </div>

              <div className="w-[100px] shrink-0 flex flex-col justify-center">
                <label className="text-[10px] font-bold uppercase text-slate-500 tracking-wider mb-1 block">Duration</label>
                <input 
                  type="text" 
                  value={med.duration} 
                  onChange={(e) => updateMedicine(med.id, 'duration', e.target.value)}
                  placeholder="5 Days"
                  className="w-full h-8 px-3 bg-slate-50 border border-slate-200 rounded-[8px] text-[13px] font-medium text-slate-700 text-center focus:outline-none focus:border-[#2F80ED]"
                />
              </div>

              <div className="w-[180px] shrink-0 flex flex-col justify-center">
                <label className="text-[10px] font-bold uppercase text-slate-500 tracking-wider mb-1 block">Instructions</label>
                <input 
                  type="text" 
                  value={med.notes} 
                  onChange={(e) => updateMedicine(med.id, 'notes', e.target.value)}
                  placeholder="After meal"
                  className="w-full h-8 px-3 bg-slate-50 border border-slate-200 rounded-[8px] text-[13px] text-slate-700 focus:outline-none focus:border-[#2F80ED]"
                />
              </div>

              <button onClick={() => removeMedicine(med.id)} className="w-[40px] shrink-0 h-[32px] mt-4 flex items-center justify-center text-slate-400 hover:text-red-500 transition-colors rounded-[8px] hover:bg-red-50">
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Add New Empty State Input */}
      <div className="relative mt-2">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
        <input 
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={handleSearchEnter}
          placeholder="Search and add another medicine... (Press Enter)"
          className="w-full h-[48px] pl-10 pr-4 bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-[#2F80ED] focus:bg-white rounded-[12px] text-[14px] text-slate-700 outline-none transition-colors"
        />
      </div>
    </div>
  );
}
