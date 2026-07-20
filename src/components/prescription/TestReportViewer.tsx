"use client";

import React, { useState, useEffect } from "react";
import { FileText, Download, Eye, ShieldCheck, Activity, ChevronLeft, ChevronRight, X, Maximize, Printer } from "lucide-react";
import { toast } from "sonner";

export function TestReportViewer() {
  const [patientName, setPatientName] = useState("New Patient");
  const [mrn, setMrn] = useState("Unknown");
  const [reportFiles, setReportFiles] = useState<{name: string, date: string, type: string, status: string, pages: number}[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // PDF Viewer State
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  
  useEffect(() => {
    // Extract ID from URL to fetch the correct reports
    const params = new URLSearchParams(window.location.search);
    const pName = params.get('patientName') || "New Patient";
    let rawId = params.get('patientId');
    
    // Hash to MRN
    if (!rawId || rawId.includes('-')) {
      const firstLetter = pName.charAt(0).toUpperCase();
      let hash = 0;
      for (let i = 0; i < pName.length; i++) hash = pName.charCodeAt(i) + ((hash << 5) - hash);
      const num = Math.abs(hash).toString().padStart(6, '0');
      rawId = `${firstLetter} ${num.slice(0,2)} ${num.slice(2,4)} ${num.slice(4,6)}`;
    }
    
    setPatientName(pName);
    setMrn(rawId);

    // Mock fetching reports from Lab based on Patient ID
    setTimeout(() => {
      setReportFiles([
        { name: "Complete Blood Count (CBC)", date: new Date().toLocaleDateString('en-GB'), type: "Pathology", status: "Verified", pages: 3 },
        { name: "Lipid Profile", date: new Date().toLocaleDateString('en-GB'), type: "Pathology", status: "Verified", pages: 1 },
        { name: "Chest X-Ray (PA View)", date: new Date(Date.now() - 86400000).toLocaleDateString('en-GB'), type: "Radiology", status: "Verified", pages: 2 },
      ]);
      setIsLoading(false);
    }, 1500); // Simulate network delay
  }, []);
  
  const handleOpenReport = (report: any) => {
    setSelectedReport(report);
    setCurrentPage(1);
  };
  
  return (
    <div className="flex flex-col h-auto xl:h-full bg-slate-50 relative border-x border-slate-200">
      
      {/* Header */}
      {!selectedReport ? (
        <div className="bg-white border-b border-slate-200 p-6 flex justify-between items-center shrink-0 transition-all">
          <div>
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <Activity className="text-[#2F80ED]" />
              Lab Test Reports
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Reports are automatically forwarded by the Lab using Patient ID: <span className="font-bold font-mono text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">{mrn}</span>
            </p>
          </div>
          
          <div className="flex items-center gap-2 bg-[#22C55E]/10 text-[#22C55E] px-4 py-2 rounded-xl font-bold text-sm">
            <ShieldCheck size={18} />
            Lab Synced
          </div>
        </div>
      ) : (
        <div className="bg-white border-b border-slate-200 p-4 flex justify-between items-center shrink-0 shadow-sm z-10">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSelectedReport(null)}
              className="w-10 h-10 flex items-center justify-center bg-slate-100 text-slate-600 hover:text-slate-900 rounded-full transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <div>
              <h2 className="text-[16px] font-bold text-slate-800 flex items-center gap-2">
                {selectedReport.name}
              </h2>
              <p className="text-[12px] text-slate-500 font-medium">
                {selectedReport.date} • {selectedReport.type}
              </p>
            </div>
          </div>
          
          {/* Pagination Controls in Header */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 bg-slate-50 p-1.5 rounded-xl border border-slate-200">
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-white shadow-sm border border-slate-200 text-slate-700 disabled:opacity-40 hover:bg-slate-50 transition-colors"
              >
                <ChevronLeft size={16} strokeWidth={3} />
              </button>
              <span className="text-[13px] font-bold text-slate-600 min-w-[70px] text-center">
                Page {currentPage} of {selectedReport.pages}
              </span>
              <button 
                onClick={() => setCurrentPage(p => Math.min(selectedReport.pages, p + 1))}
                disabled={currentPage === selectedReport.pages}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-white shadow-sm border border-slate-200 text-slate-700 disabled:opacity-40 hover:bg-slate-50 transition-colors"
              >
                <ChevronRight size={16} strokeWidth={3} />
              </button>
            </div>
            
            <div className="flex gap-2">
              <button className="w-10 h-10 flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors">
                <Printer size={18} />
              </button>
              <button className="w-10 h-10 flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors">
                <Download size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Workspace Area */}
      <div className={`flex-1 overflow-y-auto custom-scrollbar ${selectedReport ? 'bg-slate-200/50 p-4' : 'p-6'}`}>
        {!selectedReport ? (
          isLoading ? (
          <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center p-8">
            <div className="animate-spin w-10 h-10 border-4 border-[#2F80ED] border-t-transparent rounded-full mb-4"></div>
            <h3 className="text-lg font-bold text-slate-700">Fetching Reports...</h3>
            <p className="text-slate-500 text-sm mt-1">Connecting to Lab Database for Patient ID {mrn}</p>
          </div>
        ) : reportFiles.length === 0 ? (
          <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center border-2 border-dashed border-slate-300 rounded-2xl bg-white m-4 p-8">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
              <FileText size={32} className="text-slate-300" />
            </div>
            <h3 className="text-lg font-bold text-slate-700 mb-2">No Reports Available</h3>
            <p className="text-slate-500 max-w-sm">The pathology lab has not synced any reports for Patient ID <strong>{mrn}</strong> yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {reportFiles.map((file, idx) => (
              <div key={idx} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex flex-col hover:border-[#2F80ED]/30 transition-colors group cursor-pointer" onClick={() => handleOpenReport(file)}>
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-50 text-[#2F80ED] rounded-xl flex items-center justify-center shrink-0">
                      <FileText size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-[15px]">{file.name}</h4>
                      <p className="text-[13px] text-slate-500 font-medium mt-0.5">{file.type} • {file.date} • {file.pages} {file.pages > 1 ? 'Pages' : 'Page'}</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-[#22C55E] bg-[#22C55E]/10 px-2.5 py-1 rounded-md tracking-wide uppercase shrink-0">
                    {file.status}
                  </span>
                </div>
                
                <div className="mt-2 pt-4 border-t border-slate-100 flex items-center justify-end gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleOpenReport(file); }}
                    className="flex items-center gap-1.5 text-[13px] font-bold text-slate-600 bg-slate-50 hover:bg-slate-100 px-4 py-2 rounded-lg transition-colors"
                  >
                    <Eye size={16} />
                    View PDF
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); toast.success("AI is analyzing this report..."); }}
                    className="flex items-center gap-1.5 text-[13px] font-bold text-white bg-[#2F80ED] hover:bg-[#256bbd] px-4 py-2 rounded-lg shadow-sm shadow-[#2F80ED]/20 transition-colors"
                  >
                    Analyze with AI
                  </button>
                </div>
              </div>
            ))}
          </div>
        )
        ) : (
          // Multi-Page PDF Viewer Layout
          <div className="flex flex-col items-center max-w-4xl mx-auto pb-10">
            
            {/* The Document Canvas */}
            <div className="bg-white w-full aspect-[1/1.414] shadow-lg border border-slate-200 mt-4 rounded-md relative overflow-hidden group">
              <div className="absolute inset-0 p-12 flex flex-col">
                <div className="flex justify-between items-start border-b-2 border-slate-800 pb-6 mb-8">
                  <div>
                    <h1 className="text-2xl font-bold uppercase tracking-widest text-slate-900">Lab Report</h1>
                    <p className="text-slate-500 mt-1">{selectedReport.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-slate-800">Page {currentPage} / {selectedReport.pages}</p>
                    <p className="text-slate-500">{selectedReport.date}</p>
                    <p className="font-bold text-slate-800 font-mono bg-slate-100 px-2 py-0.5 rounded-md mt-2 inline-block">
                      ID: {mrn}
                    </p>
                  </div>
                </div>
                
                <div className="flex-1 flex flex-col items-center justify-center opacity-40">
                  <FileText size={64} className="text-slate-300 mb-4" />
                  <p className="text-xl font-bold text-slate-400">Mock Data / Visual Demo</p>
                  <p className="text-sm text-slate-400 mt-2">Actual PDF rendering goes here</p>
                </div>
              </div>
            </div>

            {/* Bottom floating pagination */}
            <div className="fixed bottom-6 z-20 flex items-center gap-4 bg-white/90 backdrop-blur-md px-6 py-3 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-slate-200/50">
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="flex items-center gap-2 text-[14px] font-bold text-slate-700 hover:text-[#2F80ED] disabled:opacity-40 transition-colors"
              >
                <ChevronLeft size={18} strokeWidth={3} />
                Prev
              </button>
              <div className="w-px h-6 bg-slate-300"></div>
              <span className="text-[14px] font-bold text-slate-800 tracking-wide">
                Page {currentPage} of {selectedReport.pages}
              </span>
              <div className="w-px h-6 bg-slate-300"></div>
              <button 
                onClick={() => setCurrentPage(p => Math.min(selectedReport.pages, p + 1))}
                disabled={currentPage === selectedReport.pages}
                className="flex items-center gap-2 text-[14px] font-bold text-slate-700 hover:text-[#2F80ED] disabled:opacity-40 transition-colors"
              >
                Next
                <ChevronRight size={18} strokeWidth={3} />
              </button>
            </div>

          </div>
        )}
      </div>

    </div>
  );
}
