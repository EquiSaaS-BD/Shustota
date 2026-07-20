import React from "react";
import { X, Printer, Download, Settings } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePrescription } from "@/context/PrescriptionContext";

interface PrescriptionPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PrescriptionPreviewModal({ isOpen, onClose }: PrescriptionPreviewModalProps) {
  const { data } = usePrescription();
  
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/40 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="bg-slate-100 w-full max-w-4xl h-full max-h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shrink-0">
            <h2 className="text-lg font-bold text-slate-800">Prescription Preview</h2>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 text-sm font-bold text-slate-600 bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl hover:bg-slate-100 transition-colors">
                <Settings size={16} /> Template
              </button>
              <button className="flex items-center gap-2 text-sm font-bold text-slate-600 bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl hover:bg-slate-100 transition-colors">
                <Printer size={16} /> Print
              </button>
              <button className="flex items-center gap-2 text-sm font-bold text-white bg-[#2F80ED] hover:bg-[#256bbd] px-4 py-2 rounded-xl shadow-sm transition-colors">
                <Download size={16} /> Download PDF
              </button>
              <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-colors ml-2">
                <X size={20} />
              </button>
            </div>
          </div>

          {/* A4 Paper Preview Container */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-8 flex justify-center bg-slate-200/50">
            <div className="w-full max-w-[794px] min-h-[1123px] bg-white shadow-md p-10 flex flex-col relative">
              
              {/* Doctor Header */}
              <div className="flex justify-between items-start border-b-2 border-slate-800 pb-6 mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-[#2F80ED] uppercase tracking-wide">Dr. Rafin</h1>
                  <p className="text-sm font-semibold text-slate-600 mt-1">MBBS, FCPS (Cardiology), MD</p>
                  <p className="text-xs text-slate-500 mt-1">Consultant Cardiologist</p>
                  <p className="text-xs text-slate-500">ABC Medical Center</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-slate-800">Shustota AI Hospital</p>
                  <p className="text-xs text-slate-500 mt-1">123 Health Avenue, Dhaka</p>
                  <p className="text-xs text-slate-500">Phone: +880 1234 567890</p>
                </div>
              </div>

              {/* Patient Info Bar */}
              <div className="flex justify-between items-center bg-slate-50 border border-slate-200 px-4 py-3 rounded-lg mb-8">
                <div>
                  <span className="text-xs text-slate-500 uppercase font-bold">Patient Name:</span>
                  <span className="ml-2 text-sm font-bold text-slate-800">Rahim Uddin</span>
                </div>
                <div>
                  <span className="text-xs text-slate-500 uppercase font-bold">Age:</span>
                  <span className="ml-2 text-sm font-bold text-slate-800">45 Years</span>
                </div>
                <div>
                  <span className="text-xs text-slate-500 uppercase font-bold">Gender:</span>
                  <span className="ml-2 text-sm font-bold text-slate-800">Male</span>
                </div>
                <div>
                  <span className="text-xs text-slate-500 uppercase font-bold">Date:</span>
                  <span className="ml-2 text-sm font-bold text-slate-800">17 July 2026</span>
                </div>
              </div>

              {/* Main Prescription Body (2 Columns) */}
              <div className="flex-1 flex gap-8">
                {/* Left Column: Vitals, CC, Diagnosis, Inv */}
                <div className="w-[35%] flex flex-col gap-6 border-r border-slate-200 pr-8">
                  {/* Vitals */}
                  {(data.vitals.bp || data.vitals.pulse || data.vitals.temp || data.vitals.weight) && (
                    <div>
                      <h3 className="text-xs font-bold uppercase text-slate-800 border-b border-slate-200 pb-1 mb-2">Vitals</h3>
                      <ul className="text-[13px] text-slate-700 flex flex-col gap-1.5">
                        {data.vitals.bp && <li><span className="font-semibold">BP:</span> {data.vitals.bp} mmHg</li>}
                        {data.vitals.pulse && <li><span className="font-semibold">Pulse:</span> {data.vitals.pulse} bpm</li>}
                        {data.vitals.temp && <li><span className="font-semibold">Temp:</span> {data.vitals.temp} °F</li>}
                        {data.vitals.weight && <li><span className="font-semibold">Weight:</span> {data.vitals.weight} kg</li>}
                        {data.vitals.height && <li><span className="font-semibold">Height:</span> {data.vitals.height} cm</li>}
                        {data.vitals.bmi && <li><span className="font-semibold">BMI:</span> {data.vitals.bmi} kg/m²</li>}
                        {data.vitals.bloodSugar && <li><span className="font-semibold">Blood Sugar:</span> {data.vitals.bloodSugar} mg/dL</li>}
                        {data.vitals.spo2 && <li><span className="font-semibold">SpO2:</span> {data.vitals.spo2} %</li>}
                      </ul>
                    </div>
                  )}

                  {/* Chief Complaint */}
                  {data.chiefComplaint && (
                    <div>
                      <h3 className="text-xs font-bold uppercase text-slate-800 border-b border-slate-200 pb-1 mb-2">Chief Complaint</h3>
                      <p className="text-[13px] text-slate-700 leading-relaxed whitespace-pre-wrap">{data.chiefComplaint}</p>
                    </div>
                  )}

                  {/* Physical Exam */}
                  {data.physicalExam && (
                    <div>
                      <h3 className="text-xs font-bold uppercase text-slate-800 border-b border-slate-200 pb-1 mb-2">Physical Exam</h3>
                      <p className="text-[13px] text-slate-700 leading-relaxed whitespace-pre-wrap">{data.physicalExam}</p>
                    </div>
                  )}

                  {/* Diagnosis */}
                  {data.diagnosis && (
                    <div>
                      <h3 className="text-xs font-bold uppercase text-slate-800 border-b border-slate-200 pb-1 mb-2">Diagnosis</h3>
                      <p className="text-[13px] text-slate-700 leading-relaxed font-semibold whitespace-pre-wrap">{data.diagnosis}</p>
                    </div>
                  )}

                  {/* Investigations */}
                  {data.investigations && (
                    <div>
                      <h3 className="text-xs font-bold uppercase text-slate-800 border-b border-slate-200 pb-1 mb-2">Investigations</h3>
                      <p className="text-[13px] text-slate-700 leading-relaxed whitespace-pre-wrap">{data.investigations}</p>
                    </div>
                  )}
                </div>

                {/* Right Column: Rx, Advice, Follow-up */}
                <div className="w-[65%] flex flex-col gap-8 pl-8">
                  
                  {/* Rx Symbol & Medicines */}
                  <div className="flex-1">
                    <h1 className="text-4xl font-serif font-bold text-slate-800 mb-6 relative -left-1">Rx</h1>
                    
                    {data.medicines.length > 0 ? (
                      <div className="flex flex-col gap-6">
                        {data.medicines.map((med, index) => (
                          <div key={index} className="flex gap-4">
                            <span className="text-sm font-bold text-slate-400 mt-0.5">{index + 1}.</span>
                            <div className="flex-1">
                              <h4 className="text-[15px] font-bold text-slate-800 mb-1">{med.name}</h4>
                              <div className="flex items-center gap-3 text-[13px] text-slate-600">
                                <span className="font-semibold text-[#2F80ED]">{med.dosageM}+{med.dosageN}+{med.dosageE}</span>
                                <span className="w-1 h-1 rounded-full bg-slate-300" />
                                <span>{med.frequency}</span>
                                <span className="w-1 h-1 rounded-full bg-slate-300" />
                                <span className="font-semibold text-slate-800">{med.duration}</span>
                              </div>
                              {med.notes && (
                                <p className="text-[12px] text-slate-500 mt-1 italic">{med.notes}</p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-slate-400 italic">No medicines prescribed.</p>
                    )}
                  </div>

                  {/* Advice & Follow-up */}
                  <div className="flex flex-col gap-6 mt-auto pt-8">
                    {data.advice && (
                      <div>
                        <h3 className="text-xs font-bold uppercase text-slate-800 border-b border-slate-200 pb-1 mb-3">Advice</h3>
                        <p className="text-[13px] text-slate-700 leading-relaxed whitespace-pre-wrap">{data.advice}</p>
                      </div>
                    )}
                    
                    {data.followUp && (
                      <div>
                        <h3 className="text-xs font-bold uppercase text-slate-800 border-b border-slate-200 pb-1 mb-2">Follow-up</h3>
                        <p className="text-[13px] text-slate-700 font-semibold text-[#2F80ED] whitespace-pre-wrap">{data.followUp}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-12 pt-6 border-t border-slate-200 flex justify-between items-end">
                <div className="text-center">
                  <div className="w-40 border-b border-slate-800 mb-2"></div>
                  <p className="text-xs font-semibold text-slate-600 uppercase">Doctor&apos;s Signature</p>
                </div>
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
