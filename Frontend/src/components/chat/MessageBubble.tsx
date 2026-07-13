"use client";

import { Bot } from "lucide-react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";

interface MessageBubbleProps {
  role: "user" | "bot";
  content: string;
}

export function MessageBubble({ role, content }: MessageBubbleProps) {
  const isUser = role === "user";

  return (
    <div className={`w-full flex ${isUser ? "justify-end" : "justify-start"} mb-6`}>
      <div className={`flex gap-4 max-w-full ${isUser ? "flex-row-reverse w-[720px]" : "w-[760px]"}`}>
        
        {/* Avatar */}
        <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center mt-1 ${isUser ? "bg-slate-200 text-slate-600 hidden md:flex" : "bg-primary/5 ring-1 ring-primary/20 shadow-sm relative overflow-hidden"}`}>
          {isUser ? <span className="text-sm font-bold">R</span> : <Image src="/images/shustota-icon.png" alt="AI" fill sizes="40px" className="object-contain p-2" />}
        </div>

        {/* Message Content */}
        <div className={`flex-1 ${isUser ? "bg-[#f4f4f4] px-5 py-3.5 rounded-3xl" : "pt-1"}`}>
          {isUser ? (
            <div className="text-[16px] text-slate-800 leading-relaxed whitespace-pre-wrap">
              {content}
            </div>
          ) : (
            <div className="prose prose-slate max-w-none text-[16px] leading-relaxed prose-p:mb-4 prose-headings:font-semibold prose-a:text-primary hover:prose-a:underline prose-code:bg-slate-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-pre:bg-slate-50 prose-pre:border prose-pre:border-slate-200 prose-pre:text-slate-800">
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
