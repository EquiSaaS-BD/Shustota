"use client";

import { useState, useRef, useEffect } from "react";
import { WelcomeScreen } from "@/components/chat/WelcomeScreen";
import { ChatInput } from "@/components/chat/ChatInput";
import { MessageBubble } from "@/components/chat/MessageBubble";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

type Message = {
  id: string;
  role: "user" | "bot";
  content: string;
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (text: string) => {
    const newMsg: Message = { id: Date.now().toString(), role: "user", content: text };
    setMessages(prev => [...prev, newMsg]);
    setIsTyping(true);

    // Mock AI Response after delay
    setTimeout(() => {
      setIsTyping(false);
      const botMsg: Message = { 
        id: (Date.now() + 1).toString(), 
        role: "bot", 
        content: "Based on your symptoms, this appears to be a common viral fever. However, I can help you find a general physician nearby or suggest some basic home remedies. \n\n### General Advice:\n- Rest and hydrate.\n- Monitor your temperature.\n- Take Paracetamol if fever exceeds 101°F.\n\n*Would you like me to find a doctor near you?*" 
      };
      setMessages(prev => [...prev, botMsg]);
    }, 1500);
  };

  const followUpChips = [
    "Explain More", "Find Doctors", "Compare Medicines", "Book Appointment"
  ];

  return (
    <div className="relative flex flex-col h-full bg-white overflow-hidden">
      
      {/* Background Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] select-none">
        <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] grayscale">
          <Image 
            src="/images/shustota-icon.png" 
            alt="Watermark" 
            fill 
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Main Scrollable Area */}
      <div className="flex-1 overflow-y-auto scrollbar-thin pt-8 pb-4 relative z-10">
        <div className="max-w-[900px] mx-auto w-full px-4 md:px-8">
          
          {messages.length === 0 ? (
            <WelcomeScreen />
          ) : (
            <div className="flex flex-col space-y-2 mt-4 md:mt-8 pb-10">
              {messages.map((msg) => (
                <MessageBubble key={msg.id} role={msg.role} content={msg.content} />
              ))}
              
              {isTyping && (
                <div className="flex justify-start mb-6">
                  <div className="flex gap-4 w-[760px] max-w-full">
                    {/* Pulsing Avatar */}
                    <div className="relative shrink-0 w-10 h-10 rounded-full flex items-center justify-center mt-1 bg-primary/5 ring-1 ring-primary/20 shadow-sm overflow-hidden">
                      <motion.div
                        animate={{ opacity: [0.3, 0.8, 0.3], scale: [0.95, 1.05, 0.95] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-0 bg-primary/10 rounded-full"
                      />
                      <Image src="/images/shustota-icon.png" alt="AI Processing" fill sizes="40px" className="object-contain p-2 relative z-10" />
                    </div>
                    
                    {/* Processing Text */}
                    <div className="flex items-center">
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-[14px] text-primary/70 font-medium flex items-center gap-1.5"
                      >
                        Analyzing health data
                        <span className="flex gap-0.5">
                          <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}>.</motion.span>
                          <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}>.</motion.span>
                          <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}>.</motion.span>
                        </span>
                      </motion.div>
                    </div>
                  </div>
                </div>
              )}

              {/* Follow-up Chips (Only show after a bot message and not typing) */}
              {!isTyping && messages.length > 0 && messages[messages.length - 1].role === "bot" && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-wrap gap-2 mt-2 ml-12"
                >
                  {followUpChips.map((chip, idx) => (
                    <button 
                      key={idx}
                      onClick={() => handleSend(chip)}
                      className="flex items-center gap-1.5 h-[38px] px-4 rounded-full bg-white border border-slate-200 text-slate-600 text-[14px] font-medium hover:border-primary/50 hover:text-primary transition-colors shadow-sm"
                    >
                      {chip} <ArrowRight size={14} className="opacity-50" />
                    </button>
                  ))}
                </motion.div>
              )}
              
              <div ref={messagesEndRef} className="h-4" />
            </div>
          )}
        </div>
      </div>

      {/* Input Area */}
      <ChatInput onSend={handleSend} />
    </div>
  );
}
