"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ShieldOff, Lock, ArrowLeft } from "lucide-react";

export function AccessDeniedModal() {
  const router = useRouter();

  return (
    <div className="fixed inset-0 z-[100] bg-white flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="bg-white w-full h-full flex flex-col items-center justify-center relative overflow-hidden"
      >
        {/* Background decoration */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-red-500 via-orange-400 to-red-500" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-red-50 rounded-full opacity-50 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-orange-50 rounded-full opacity-50 blur-3xl pointer-events-none" />

        {/* Content Wrapper */}
        <div className="max-w-lg w-full p-8 text-center relative z-10">
          {/* Icon */}
          <div className="relative mx-auto w-24 h-24 bg-red-50 rounded-[24px] flex items-center justify-center mb-8 border border-red-100 shadow-sm">
            <ShieldOff size={44} className="text-red-500" />
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center border border-slate-100">
              <Lock size={16} className="text-red-400" />
            </div>
          </div>

          {/* Text */}
          <h2 className="text-[32px] font-extrabold text-slate-900 mb-4 relative tracking-tight">Access Denied</h2>
          <p className="text-[16px] text-slate-500 leading-relaxed mb-10 relative">
            This dashboard is exclusively for verified doctors. Please log in with your doctor credentials to access this area.
          </p>

          {/* Actions */}
          <div className="flex flex-col items-center justify-center gap-4 relative w-full">
            <button
              onClick={() => router.push("/login")}
              className="w-full max-w-[280px] h-[52px] bg-red-500 text-white text-[15px] font-bold rounded-xl hover:bg-red-600 transition-colors flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(239,68,68,0.3)] hover:-translate-y-0.5 active:translate-y-0"
            >
              <ArrowLeft size={18} />
              Back to Login
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
