"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, Fingerprint } from "lucide-react";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    try {
      const response = await import("@/lib/api").then(m => m.apiLogin({
        identifier: email,
        password: password
      }));

      login({
        id: response.data.user.id,
        name: response.data.user.full_name,
        email: response.data.user.email,
        role: response.data.user.role
      });
    } catch (error: any) {
      setErrorMsg(error.message || "Invalid credentials");
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white flex flex-col items-center py-10 px-4 sm:px-6">
      {/* Logo */}
      <Link href="/" className="mb-12">
        <Image src="/images/shustota ai logo.png" alt="Shustota AI" width={400} height={140} className="h-28 sm:h-32 w-auto object-contain" />
      </Link>

      <div className="w-full max-w-[500px]">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-slate-800 mb-3 tracking-tight">Welcome Back</h1>
          <p className="text-slate-500 font-medium text-lg">Log in to your account</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          {errorMsg && (
            <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm font-semibold mb-4 border border-red-200">
              {errorMsg}
            </div>
          )}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700 ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="text" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-[52px] bg-transparent border-2 border-slate-200 rounded-xl py-3 pl-12 pr-4 text-slate-800 focus:outline-none focus:border-[#70DE71] hover:border-slate-300 transition-all"
                required
              />
            </div>
          </div>
          
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700 ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-[52px] bg-transparent border-2 border-slate-200 rounded-xl py-3 pl-12 pr-4 text-slate-800 focus:outline-none focus:border-[#70DE71] hover:border-slate-300 transition-all"
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-sm pt-2 mb-2">
            <label className="flex items-center gap-2 cursor-pointer group">
              <div className="relative flex items-center justify-center shrink-0">
                <input type="checkbox" className="peer sr-only" />
                <div className="w-5 h-5 rounded-md border-2 border-slate-300 group-hover:border-[#70DE71] peer-checked:bg-[#70DE71] peer-checked:border-[#70DE71] transition-all" />
              </div>
              <span className="text-slate-600 font-medium">Remember me</span>
            </label>
            <a href="#" className="text-[#70DE71] font-bold hover:underline">Forgot Password?</a>
          </div>

          <button type="submit" disabled={isLoading} className="w-full h-[54px] bg-[#70DE71] hover:bg-[#5bc95c] disabled:bg-[#70DE71]/70 text-white rounded-xl font-bold transition-all shadow-md active:scale-[0.98] flex items-center justify-center">
            {isLoading ? <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" /> : "Log In"}
          </button>
        </form>

        <div className="mt-8 text-center text-slate-500 font-medium">
          Don't have an account? <Link href="/register" className="text-[#70DE71] font-bold hover:underline">Sign up</Link>
        </div>

        {/* Social Login */}
        <div className="mt-10">
          <div className="relative flex items-center mb-8">
            <div className="flex-grow border-t border-slate-200"></div>
            <span className="flex-shrink-0 mx-4 text-slate-400 text-sm font-semibold uppercase tracking-wider">Or continue with</span>
            <div className="flex-grow border-t border-slate-200"></div>
          </div>
          <div className="flex justify-center gap-4">
            <button className="w-14 h-14 rounded-full border-2 border-slate-200 bg-white flex items-center justify-center hover:border-[#70DE71] hover:bg-[#70DE71]/5 transition-all">
              <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                  <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
                  <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
                  <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
                  <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
                </g>
              </svg>
            </button>
            <button className="w-14 h-14 rounded-full border-2 border-slate-200 bg-white flex items-center justify-center hover:border-[#70DE71] hover:bg-[#70DE71]/5 transition-all text-slate-400 hover:text-[#70DE71]">
              <Fingerprint size={24} />
            </button>
          </div>
        </div>

      </div>
    </main>
  );
}
