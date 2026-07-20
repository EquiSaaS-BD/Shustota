import React, { useState, useRef, useEffect } from "react";
import { Sparkles, Send, Mic, Copy, Check, X, ShieldAlert, BookOpen, Stethoscope, FileText, Activity, AlertCircle, PlusCircle, ArrowRight } from "lucide-react";
import { toast } from "sonner";

interface Message {
  id: string;
  role: "user" | "ai";
  content?: string;
  cardData?: {
    title: string;
    summary: string;
    reasoning: string;
    confidence: number;
    actions: { label: string; icon: React.ElementType; primary?: boolean }[];
    followUps: string[];
  };
}

export function AIAssistancePanel() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const defaultChips = [
    { icon: FileText, label: "Summarize Patient History" },
    { icon: Stethoscope, label: "Review Current Prescription" },
    { icon: AlertCircle, label: "Check Drug Interactions" },
    { icon: ShieldAlert, label: "Check Allergies" },
    { icon: Activity, label: "Suggest Lab Tests" },
    { icon: BookOpen, label: "Generate SOAP Note" },
    { icon: ArrowRight, label: "Compare Previous Prescription" },
    { icon: Sparkles, label: "Explain Prescription" }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMsg: Message = { id: Date.now().toString(), role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");

    // Mock AI Response
    setTimeout(() => {
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        cardData: {
          title: "Investigation Suggestion",
          summary: "Based on the diagnosis of Hypertension, consider adding a Lipid Profile test.",
          reasoning: "Routine screening for hyperlipidemia is recommended for patients newly diagnosed with hypertension to assess cardiovascular risk factors.",
          confidence: 98,
          actions: [
            { label: "Apply to Prescription", icon: PlusCircle, primary: true },
            { label: "Copy", icon: Copy },
            { label: "Dismiss", icon: X }
          ],
          followUps: [
            "What about ECG?",
            "Show hypertension guidelines",
            "Any contraindications for current meds?"
          ]
        }
      };
      setMessages((prev) => [...prev, aiMsg]);
    }, 1000);
  };

  const handleAction = (action: string) => {
    if (action === "Apply to Prescription") {
      toast.success("Added to Investigations successfully!");
    } else if (action === "Copy") {
      toast.success("Copied to clipboard!");
    }
  };

  return (
    <div className="flex flex-col min-h-[500px] xl:h-full bg-transparent rounded-[16px] xl:rounded-none border border-[#E5E7EB] xl:border-none shadow-[0_4px_16px_rgba(15,23,42,0.08)] xl:shadow-none overflow-hidden relative">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-5 py-4 text-white flex items-center justify-between shrink-0 shadow-sm z-10">
        <div className="flex items-center gap-2">
          <Sparkles size={18} className="text-yellow-300" />
          <h3 className="font-bold text-[15px]">Clinical Copilot</h3>
        </div>
        <span className="bg-white/20 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">Active</span>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-visible xl:overflow-y-auto custom-scrollbar p-5 flex flex-col gap-6 bg-transparent">
        {messages.length === 0 ? (
          /* Default State */
          <div className="flex flex-col items-center justify-center h-full text-center mt-4">
            <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center mb-4 relative">
              <Sparkles size={32} className="text-purple-500" />
              <div className="absolute top-1 right-1 w-3 h-3 bg-[#6DDA6E] rounded-full border-2 border-white"></div>
            </div>
            <h4 className="font-bold text-slate-800 text-[18px] mb-2">How can I assist you?</h4>
            <p className="text-sm text-slate-500 mb-8 max-w-[250px]">Select an action below or ask any clinical question.</p>
            
            <div className="flex flex-wrap gap-2 justify-center">
              {defaultChips.map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(chip.label)}
                  className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 hover:border-purple-300 hover:text-purple-600 hover:bg-purple-50 hover:shadow-sm transition-all px-3 py-2 rounded-xl text-[13px] font-medium"
                >
                  <chip.icon size={14} />
                  {chip.label}
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Conversation */
          messages.map((msg) => (
            <div key={msg.id} className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}>
              {msg.role === "user" ? (
                <div className="bg-[#2F80ED] text-white px-4 py-2.5 rounded-[16px] rounded-tr-[4px] max-w-[85%] text-[14px] shadow-sm">
                  {msg.content}
                </div>
              ) : (
                msg.cardData && (
                  <div className="w-full bg-white border border-slate-200 rounded-[14px] shadow-sm overflow-hidden flex flex-col animate-in fade-in slide-in-from-bottom-2 duration-300">
                    
                    {/* Card Header */}
                    <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                      <div className="flex items-center gap-2">
                        <Sparkles size={16} className="text-purple-500" />
                        <h4 className="font-bold text-slate-800 text-[14px]">{msg.cardData.title}</h4>
                      </div>
                      <div className="bg-green-100 text-green-700 text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Check size={12} />
                        {msg.cardData.confidence}% Match
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-4 flex flex-col gap-3">
                      <div>
                        <p className="text-[14px] font-medium text-slate-800">{msg.cardData.summary}</p>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <p className="text-[12px] text-slate-600 leading-relaxed font-medium">
                          <span className="font-bold text-slate-700 mr-1">Reasoning:</span>
                          {msg.cardData.reasoning}
                        </p>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap gap-2 mt-2">
                        {msg.cardData.actions.map((act, i) => (
                          <button
                            key={i}
                            onClick={() => handleAction(act.label)}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] text-[12px] font-bold transition-all h-[34px] ${
                              act.primary 
                                ? "bg-[#6DDA6E] text-white hover:bg-[#5bc95c] shadow-md shadow-[#6DDA6E]/20" 
                                : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-800"
                            }`}
                          >
                            <act.icon size={14} />
                            {act.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Follow-up Suggestions */}
                    <div className="px-4 py-3 bg-slate-50 border-t border-slate-100">
                      <p className="text-[11px] font-bold uppercase text-slate-400 mb-2">Suggested Follow-ups</p>
                      <div className="flex flex-wrap gap-2">
                        {msg.cardData.followUps.map((chip, i) => (
                          <button
                            key={i}
                            onClick={() => handleSend(chip)}
                            className="bg-white border border-slate-200 text-slate-600 hover:text-purple-600 hover:border-purple-300 hover:bg-purple-50 text-[12px] px-3 py-1.5 rounded-full transition-colors"
                          >
                            {chip}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Persistent Input Box */}
      <div className="p-4 bg-white border-t border-slate-100 z-10 shrink-0">
        <div className="relative flex items-center">
          <button className="absolute left-3 text-slate-400 hover:text-slate-600 transition-colors">
            <Mic size={20} />
          </button>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend(inputValue)}
            placeholder="Ask Copilot (e.g. Check interactions...)"
            className="w-full bg-slate-50 border border-slate-200 rounded-[12px] py-3 pl-10 pr-12 text-[14px] text-slate-800 focus:outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-400/10 transition-all placeholder:text-slate-400 font-medium"
          />
          <button 
            onClick={() => handleSend(inputValue)}
            disabled={!inputValue.trim()}
            className="absolute right-2 bg-purple-500 hover:bg-purple-600 disabled:bg-slate-300 text-white w-8 h-8 rounded-[8px] flex items-center justify-center transition-colors"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
