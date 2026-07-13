"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ChevronRight, ShieldCheck, Bot, Sparkles, Send, Brain, Lock } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function HeroSection() {
  const { lang, t } = useLanguage();
  const isBn = lang === "bn";

  // AI Brain Awakening Sequence State
  const [brainState, setBrainState] = useState<"hidden" | "booting" | "ready">("hidden");

  useEffect(() => {
    // Sequence: Start hidden -> boot up -> ready
    const timer1 = setTimeout(() => setBrainState("booting"), 500);
    const timer2 = setTimeout(() => setBrainState("ready"), 2500);
    return () => { clearTimeout(timer1); clearTimeout(timer2); };
  }, []);

  const chatMessages = [
    { role: "user", text: t("I've had a headache and fever for 2 days.", "আমার ২ দিন ধরে মাথাব্যথা ও জ্বর।") },
    { role: "ai", text: t("Your symptoms match viral flu or common fever. I'd like to ask a few more questions - do you have a cold or sore throat?", "আপনার লক্ষণগুলো ভাইরাল ফ্লু বা সাধারণ জ্বরের সাথে মিলছে। আরো কিছু প্রশ্ন করতে চাই - আপনার কি সর্দি বা গলাব্যথা আছে?") },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#f6f9ff] via-white to-[#f0f6ff] min-h-[90vh] flex items-center pt-20 lg:pt-32 pb-20">
      
      {/* 5. AI Data Flow Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-primary/20 to-transparent animate-shustota-line-vertical" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-secondary/20 to-transparent animate-shustota-line-vertical" style={{ animationDelay: "1s" }} />
        <div className="shustota-blob absolute -top-24 -left-20 w-[420px] h-[420px] rounded-full bg-primary/10 blur-3xl" />
        <div className="shustota-blob shustota-blob-delay absolute top-10 -right-24 w-[380px] h-[380px] rounded-full bg-secondary/10 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Copy & CTAs */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={brainState === "ready" ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-7"
          >
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-semibold tracking-widest uppercase cursor-default"
            >
              <ShieldCheck size={14} />
              {t("Medical-Grade AI", "মেডিকেল-গ্রেড AI")}
            </motion.span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-[#0a1628]">
              {t("Your Personal AI Healthcare Assistant - ", "আপনার ব্যক্তিগত এআই স্বাস্থ্য সহকারী - ")}
              <span className="animate-gradient-text bg-gradient-to-r from-primary via-secondary to-tertiary bg-clip-text text-transparent bg-[length:200%_auto]">
                {t("Smarter, Faster & Always Available", "স্মার্ট, দ্রুত এবং সবসময় প্রস্তুত")}
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-[500px]">
              {t(
                "Get instant AI-powered health guidance, symptom analysis, prescription understanding, doctor recommendations, and medicine intelligence - all in one secure platform.",
                "লক্ষণ বিশ্লেষণ, প্রেসক্রিপশন স্ক্যান, ডাক্তার খোঁজা এবং ওষুধের তথ্য - সবকিছু এক প্ল্যাটফর্মে, সম্পূর্ণ বিনামূল্যে।"
              )}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <Link href="/register" className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white font-semibold rounded-xl shadow-[0_0_20px_rgba(0,61,155,0.3)] hover:shadow-[0_0_30px_rgba(0,61,155,0.5)] hover:-translate-y-1 transition-all duration-300">
                {t("Get Started Free", "বিনামূল্যে শুরু করুন")}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="#demo" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/80 backdrop-blur-md text-[#0a1628] font-semibold rounded-xl border-2 border-slate-200 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300">
                {t("Watch Live Demo", "লাইভ ডেমো দেখুন")}
                <ChevronRight size={18} />
              </Link>
            </div>

            {/* Highlights Chips */}
            <div className="flex flex-wrap gap-2 pt-4">
              {["AI Symptom Checker", "Prescription Scanner", "Doctor Finder", "Nutrition AI"].map((chip, i) => (
                <div key={i} className="px-3 py-1.5 rounded-lg bg-surface-container-low text-xs font-semibold text-on-surface border border-outline-variant/30 flex items-center gap-1.5 hover:bg-primary/5 transition-colors cursor-default">
                  <CheckCircle2 size={12} className="text-primary" /> {chip}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Video Demo */}
          <div className="relative flex justify-center items-center w-full max-w-[350px] sm:max-w-[450px] lg:max-w-[500px] mx-auto lg:ml-auto perspective-1000">
            <div className="absolute inset-0 bg-primary/20 blur-[80px] rounded-full mix-blend-multiply" />
            <motion.div
              initial={{ opacity: 0, y: 50, rotateX: 10 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              whileHover={{ scale: 1.02, rotateY: -2, rotateX: 2, y: -5 }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.4, delay: 0.2 }}
              className="relative w-full h-auto z-10 flex items-center justify-center rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,61,155,0.15)] hover:shadow-[0_30px_60px_rgba(0,61,155,0.25)] border-[6px] sm:border-8 border-white bg-white transition-all duration-500"
            >
              <video
                src="/video.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto object-cover rounded-[1.6rem]"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CheckCircle2(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}
