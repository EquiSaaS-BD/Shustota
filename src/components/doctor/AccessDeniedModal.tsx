"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ShieldOff, Lock, ArrowLeft } from "lucide-react";

export function AccessDeniedModal() {
  const router = useRouter();

  return (
    <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center relative overflow-hidden"
      >
        {/* Background decoration */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-500 via-orange-400 to-red-500" />
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-red-50 rounded-full opacity-50" />
        <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-orange-50 rounded-full opacity-50" />

        {/* Icon */}
        <div className="relative mx-auto w-20 h-20 bg-red-50 rounded-2xl flex items-center justify-center mb-6">
          <ShieldOff size={36} className="text-red-500" />
          <div className="absolute -top-1 -right-1 w-7 h-7 bg-white rounded-full shadow-md flex items-center justify-center">
            <Lock size={14} className="text-red-400" />
          </div>
        </div>

        {/* Text */}
        <h2 className="text-2xl font-bold text-slate-800 mb-3 relative">Access Denied</h2>
        <p className="text-sm text-slate-500 leading-relaxed mb-8 relative max-w-xs mx-auto">
          This dashboard is exclusively for verified doctors. Please log in with your doctor credentials to access this area.
        </p>

        {/* Actions */}
        <div className="space-y-3 relative">
          <button
            onClick={() => router.push("/login")}
            className="w-full h-11 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
          >
            <ArrowLeft size={16} />
            Back to Login
          </button>
          <button
            onClick={() => router.push("/")}
            className="w-full h-10 text-sm font-medium text-slate-500 hover:text-slate-700 hover:bg-slate-50 rounded-xl transition-colors"
          >
            Go to Homepage
          </button>
        </div>
      </motion.div>
    </div>
  );
}
