"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Search, Home, Activity, Stethoscope } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { SiteHeader } from '@/components/landing/SiteHeader';
import { Footer } from '@/components/layout/Footer';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <SiteHeader />

      <main className="flex-1 flex flex-col items-center justify-center relative overflow-hidden px-4">
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <motion.div 
            animate={{ 
              y: [0, -20, 0],
              opacity: [0.5, 0.8, 0.5] 
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[10%] left-[20%] w-[300px] h-[300px] bg-primary/5 rounded-full blur-3xl"
          />
          <motion.div 
            animate={{ 
              x: [0, 30, 0],
              opacity: [0.3, 0.6, 0.3] 
            }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[20%] right-[15%] w-[400px] h-[400px] bg-[#2F80ED]/5 rounded-full blur-3xl"
          />
        </div>

        <div className="max-w-[800px] w-full z-10 flex flex-col items-center text-center">
          
          {/* Main 404 Visual */}
          <div className="relative mb-[40px] flex items-center justify-center">
            <motion.h1 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", damping: 12, stiffness: 100 }}
              className="text-[180px] md:text-[240px] font-black text-slate-100 tracking-tighter leading-none select-none"
            >
              404
            </motion.h1>
            
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, type: "spring", damping: 15 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="w-[120px] h-[120px] bg-white rounded-full shadow-2xl border-4 border-primary/20 flex items-center justify-center relative">
                <Search size={50} className="text-primary absolute" />
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="w-full h-full rounded-full border-2 border-dashed border-primary/40"
                />
              </div>
            </motion.div>
          </div>

          {/* Text Content */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <h2 className="text-[32px] md:text-[42px] font-extrabold text-slate-800 mb-[16px] tracking-tight">
              Page Not Found
            </h2>
            <p className="text-[16px] md:text-[18px] text-slate-500 max-w-[500px] mx-auto leading-relaxed mb-[40px]">
              We couldn't find the page you are looking for. It might have been moved, deleted, or perhaps the URL is misspelled.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center gap-[16px] w-full sm:w-auto"
          >
            <button
              onClick={() => router.push('/')}
              className="w-full sm:w-auto px-[32px] h-[56px] bg-primary text-white rounded-[16px] font-bold text-[16px] hover:bg-primary/90 hover:shadow-[0_10px_30px_-10px_rgba(15,118,110,0.5)] transition-all flex items-center justify-center gap-[12px] group"
            >
              <Home size={20} className="group-hover:-translate-y-0.5 transition-transform" />
              Back to Home
            </button>
            <button
              onClick={() => router.push('/doctors')}
              className="w-full sm:w-auto px-[32px] h-[56px] bg-white text-slate-700 rounded-[16px] font-bold text-[16px] border-[2px] border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all flex items-center justify-center gap-[12px] group"
            >
              <Stethoscope size={20} className="text-slate-400 group-hover:text-primary transition-colors" />
              Find a Doctor
            </button>
          </motion.div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
