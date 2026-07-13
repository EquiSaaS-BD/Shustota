"use client";

import { useState, useRef, useEffect } from "react";
import { Plus, Mic, Camera, ArrowRight, FileText, Activity, Image as ImageIcon, Pill, Apple, ActivitySquare, FileOutput } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function ChatInput({ onSend }: { onSend: (text: string) => void }) {
  const [text, setText] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 220)}px`;
    }
  }, [text]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSend = () => {
    if (text.trim()) {
      onSend(text);
      setText("");
    }
  };

  const menuItems = [
    { icon: FileText, title: "Scan Prescription", desc: "Extract medicine & instructions" },
    { icon: FileOutput, title: "Upload Medical Report", desc: "Analyze blood test, MRI, etc." },
    { icon: Activity, title: "Upload Lab Result", desc: "Check parameters against normal" },
    { icon: ImageIcon, title: "Upload X-Ray / Image", desc: "Visual AI analysis" },
    { icon: Pill, title: "Compare Medicines", desc: "Check alternatives & side-effects" },
    { icon: Apple, title: "Food Calorie Scanner", desc: "Upload food image for nutrition" },
  ];

  return (
    <div className="sticky bottom-0 w-full pb-6 pt-2 px-4 md:px-8 bg-white z-40">
      <div className="max-w-[900px] mx-auto relative">
        
        {/* Floating Plus Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              ref={menuRef}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute bottom-[80px] left-0 w-[320px] bg-white border border-slate-200 shadow-lg rounded-[16px] p-2 z-50 overflow-hidden"
            >
              {menuItems.map((item, idx) => (
                <button
                  key={idx}
                  className="flex items-start gap-3 w-full p-2.5 rounded-xl hover:bg-slate-100 transition-colors text-left"
                  onClick={() => setMenuOpen(false)}
                >
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 shrink-0">
                    <item.icon size={18} />
                  </div>
                  <div>
                    <div className="font-semibold text-[14px] text-slate-800">{item.title}</div>
                    <div className="text-[12px] text-slate-500 leading-tight mt-0.5">{item.desc}</div>
                  </div>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Input Container */}
        <div className="flex items-end gap-2 bg-slate-50 rounded-2xl p-2 min-h-[64px] border border-slate-200 focus-within:border-slate-300 focus-within:bg-white transition-all duration-300">
          
          {/* Left Action */}
          <button 
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-10 h-10 shrink-0 rounded-xl bg-white flex items-center justify-center text-slate-500 hover:text-slate-900 border border-slate-200 transition-colors mb-1"
          >
            <Plus size={20} className={`transition-transform duration-200 ${menuOpen ? 'rotate-45' : ''}`} />
          </button>

          {/* Textarea */}
          <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Message Shustota AI..."
            className="flex-1 max-h-[220px] bg-transparent resize-none outline-none text-[16px] text-slate-800 placeholder:text-slate-500 py-3 px-2 scrollbar-thin"
            rows={1}
          />

          {/* Right Actions */}
          <div className="flex items-center gap-1.5 shrink-0 pb-1 pr-1">
            <button className="w-9 h-9 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-200/60 hover:text-slate-800 transition-colors">
              <Mic size={18} />
            </button>
            <button className="w-9 h-9 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-200/60 hover:text-slate-800 transition-colors">
              <Camera size={18} />
            </button>
            <button 
              onClick={handleSend}
              disabled={!text.trim()}
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                text.trim() ? "bg-slate-900 text-white shadow-sm hover:bg-slate-800" : "bg-slate-200/60 text-slate-400"
              }`}
            >
              <ArrowRight size={18} className={text.trim() ? "ml-0.5" : ""} />
            </button>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="text-center mt-2">
          <p className="text-[12px] text-slate-400">
            Shustota AI can make mistakes. Consider verifying important medical information with a doctor.
          </p>
        </div>
      </div>
    </div>
  );
}
