"use client";

import React, { useState } from "react";
import { Search, Edit, MoreVertical, Phone, Video, Info, Paperclip, Send, Smile } from "lucide-react";

const mockChats = [
  { id: 1, name: "Dr. Aminul Islam", role: "General Physician", lastMessage: "Can you review Rahim's ECG?", time: "10:30 AM", unread: 2, online: true },
  { id: 2, patientName: "Karim Ali", role: "Patient", lastMessage: "Thank you doctor, feeling better now.", time: "Yesterday", unread: 0, online: false },
  { id: 3, name: "Lab Technician", role: "Staff", lastMessage: "Blood reports for Fatima are ready.", time: "Yesterday", unread: 0, online: true },
  { id: 4, patientName: "Nasima Akter", role: "Patient", lastMessage: "When should I take the red pill?", time: "Mon", unread: 0, online: false },
  { id: 5, name: "Dr. Sarah", role: "Neurologist", lastMessage: "I'll forward the MRI scans soon.", time: "Sun", unread: 0, online: false },
];

export function Messenger() {
  const [activeChatId, setActiveChatId] = useState(1);

  return (
    <div className="flex h-full bg-white relative overflow-hidden">
      
      {/* 1. Left Sidebar (Inbox) - Width: 340px */}
      <div className="w-[340px] flex-shrink-0 border-r border-slate-200 flex flex-col h-full bg-white z-10">
        {/* Inbox Header (Height: 72px) */}
        <div className="h-[72px] flex items-center justify-between px-6 shrink-0">
          <h2 className="text-[20px] font-bold text-[#111827]">Messages</h2>
          <button className="w-9 h-9 flex items-center justify-center text-slate-500 hover:text-[#2F80ED] hover:bg-blue-50 rounded-full transition-colors">
            <Edit size={18} />
          </button>
        </div>

        {/* Search Box (Height: 40px) */}
        <div className="px-4 pb-4 shrink-0">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search messages..."
              className="w-full h-[40px] pl-9 pr-4 bg-slate-50 border border-slate-200 rounded-[10px] text-[14px] text-slate-700 outline-none focus:border-[#2F80ED] focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {mockChats.map((chat) => (
            <div 
              key={chat.id}
              onClick={() => setActiveChatId(chat.id)}
              className={`h-[80px] px-4 flex items-center gap-3 cursor-pointer transition-colors border-b border-transparent
                ${activeChatId === chat.id ? 'bg-blue-50 border-blue-100' : 'hover:bg-slate-50'}
              `}
            >
              <div className="relative shrink-0">
                <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold text-[16px]">
                  {(chat.name || chat.patientName)?.charAt(0)}
                </div>
                {chat.online && (
                  <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full" />
                )}
              </div>
              <div className="flex-1 min-w-0 flex flex-col justify-center">
                <div className="flex items-center justify-between mb-0.5">
                  <p className={`text-[15px] font-semibold truncate ${activeChatId === chat.id ? 'text-[#2F80ED]' : 'text-slate-800'}`}>
                    {chat.name || chat.patientName}
                  </p>
                  <span className={`text-[11px] font-medium shrink-0 ml-2 ${chat.unread > 0 ? 'text-[#2F80ED]' : 'text-slate-400'}`}>
                    {chat.time}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <p className={`text-[13px] truncate pr-2 ${chat.unread > 0 ? 'font-semibold text-slate-700' : 'text-slate-500'}`}>
                    {chat.lastMessage}
                  </p>
                  {chat.unread > 0 && (
                    <span className="w-5 h-5 bg-[#2F80ED] text-white rounded-full flex items-center justify-center text-[10px] font-bold shrink-0">
                      {chat.unread}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Active Chat Area (Right Side) - Flex 1 */}
      <div className="flex-1 flex flex-col h-full bg-[#F8FAFC]">
        {/* Chat Header (Height: 72px) */}
        <div className="h-[72px] bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-[#2F80ED] font-bold text-[14px]">
                A
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
            </div>
            <div>
              <h2 className="text-[16px] font-bold text-slate-800 leading-tight">Dr. Aminul Islam</h2>
              <p className="text-[12px] font-medium text-emerald-500">Online</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-slate-500">
            <button className="w-10 h-10 flex items-center justify-center hover:bg-slate-100 rounded-full transition-colors"><Phone size={20} /></button>
            <button className="w-10 h-10 flex items-center justify-center hover:bg-slate-100 rounded-full transition-colors"><Video size={20} /></button>
            <div className="w-px h-6 bg-slate-200 mx-1" />
            <button className="w-10 h-10 flex items-center justify-center hover:bg-slate-100 rounded-full transition-colors"><Info size={20} /></button>
          </div>
        </div>

        {/* Message Bubbles Area (Padding: 24px) */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 flex flex-col gap-6">
          <div className="flex justify-center">
            <span className="px-3 py-1 bg-slate-200/50 rounded-full text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Today</span>
          </div>

          {/* Received Bubble */}
          <div className="flex items-end gap-2 max-w-[70%]">
            <div className="w-8 h-8 rounded-full bg-blue-100 shrink-0" />
            <div className="bg-white border border-slate-200 p-[12px_16px] rounded-[16px] rounded-bl-none shadow-sm text-[15px] text-slate-700 leading-[1.5]">
              Hello Dr. Rafin, I have a patient named Rahim Uddin. He was experiencing some chest pain yesterday.
            </div>
          </div>
          <div className="flex items-end gap-2 max-w-[70%] mt-[-16px]">
            <div className="w-8 h-8 shrink-0 opacity-0" />
            <div className="bg-white border border-slate-200 p-[12px_16px] rounded-[16px] rounded-bl-none shadow-sm text-[15px] text-slate-700 leading-[1.5]">
              Can you review his recent ECG? I've already uploaded the report to the system.
            </div>
          </div>

          {/* Sent Bubble */}
          <div className="flex flex-col items-end gap-1 w-full mt-4">
            <div className="flex items-end gap-2 max-w-[70%] flex-row-reverse">
              <div className="bg-[#2F80ED] text-white p-[12px_16px] rounded-[16px] rounded-br-none shadow-sm text-[15px] leading-[1.5]">
                Sure Dr. Aminul, I'm checking the report right now.
              </div>
            </div>
            <span className="text-[11px] text-slate-400 font-medium mr-2">10:32 AM</span>
          </div>
        </div>

        {/* Message Input Area (Height: 80px) */}
        <div className="min-h-[80px] bg-white border-t border-slate-200 p-[16px_24px] flex items-center shrink-0">
          <div className="flex-1 flex items-center bg-slate-50 border border-slate-200 rounded-[24px] pl-2 pr-2">
            <button className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-slate-600 rounded-full transition-colors shrink-0">
              <Smile size={20} />
            </button>
            <input 
              type="text" 
              placeholder="Type your message..."
              className="flex-1 h-[48px] bg-transparent border-none outline-none text-[15px] text-slate-700 placeholder:text-slate-400 px-2"
            />
            <button className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-slate-600 rounded-full transition-colors shrink-0 mr-1">
              <Paperclip size={20} />
            </button>
            <button className="w-10 h-10 flex items-center justify-center bg-[#2F80ED] text-white hover:bg-[#2563EB] rounded-full transition-colors shrink-0 shadow-sm">
              <Send size={18} className="ml-0.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
