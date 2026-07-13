"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { toast, Toaster } from "sonner";
import { User, Stethoscope, Building2, CheckCircle2, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

type AccountType = "patient" | "doctor" | "hospital" | null;

interface FormData {
  accountType: AccountType;
  // Patient fields
  patientFullName: string;
  patientEmail: string;
  patientMobile: string;
  patientDob: string;
  patientGender: string;
  // Doctor fields
  doctorFullName: string;
  doctorEmail: string;
  doctorMobile: string;
  doctorRegNo: string;
  doctorSpec: string;
  // Hospital fields
  hospitalName: string;
  hospitalEmail: string;
  hospitalPhone: string;
  hospitalRegNo: string;
  hospitalAddress: string;
  // Step 3
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
}

const ACCOUNT_TYPES = [
  { value: "patient" as const, label: "Patient", icon: User },
  { value: "doctor" as const, label: "Doctor", icon: Stethoscope },
  { value: "hospital" as const, label: "Hospital", icon: Building2 },
];

export default function RegisterPage() {
  const { login } = useAuth();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [direction, setDirection] = useState(1);

  const [formData, setFormData] = useState<FormData>({
    accountType: null,
    patientFullName: "", patientEmail: "", patientMobile: "", patientDob: "", patientGender: "",
    doctorFullName: "", doctorEmail: "", doctorMobile: "", doctorRegNo: "", doctorSpec: "",
    hospitalName: "", hospitalEmail: "", hospitalPhone: "", hospitalRegNo: "", hospitalAddress: "",
    password: "", confirmPassword: "", agreeTerms: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateForm = useCallback((field: keyof FormData, value: string | boolean | AccountType) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => { const next = { ...prev }; delete next[field]; return next; });
  }, []);

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateStep2 = () => {
    const errs: Record<string, string> = {};
    if (formData.accountType === "patient") {
      if (!formData.patientFullName.trim()) errs.patientFullName = "Required";
      if (!formData.patientEmail.trim() || !isValidEmail(formData.patientEmail)) errs.patientEmail = "Valid email required";
      if (!formData.patientMobile.trim()) errs.patientMobile = "Required";
    } else if (formData.accountType === "doctor") {
      if (!formData.doctorFullName.trim()) errs.doctorFullName = "Required";
      if (!formData.doctorEmail.trim() || !isValidEmail(formData.doctorEmail)) errs.doctorEmail = "Valid email required";
      if (!formData.doctorMobile.trim()) errs.doctorMobile = "Required";
      if (!formData.doctorRegNo.trim()) errs.doctorRegNo = "Required";
      if (!formData.doctorSpec.trim()) errs.doctorSpec = "Required";
    } else if (formData.accountType === "hospital") {
      if (!formData.hospitalName.trim()) errs.hospitalName = "Required";
      if (!formData.hospitalEmail.trim() || !isValidEmail(formData.hospitalEmail)) errs.hospitalEmail = "Valid email required";
      if (!formData.hospitalPhone.trim()) errs.hospitalPhone = "Required";
      if (!formData.hospitalRegNo.trim()) errs.hospitalRegNo = "Required";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep3 = () => {
    const errs: Record<string, string> = {};
    if (!formData.password || formData.password.length < 8) errs.password = "Min 8 chars required";
    if (formData.password !== formData.confirmPassword) errs.confirmPassword = "Passwords mismatch";
    if (!formData.agreeTerms) errs.agreeTerms = "Required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const goNext = () => {
    if (step === 1 && !formData.accountType) return;
    if (step === 2 && !validateStep2()) return;
    setDirection(1);
    setStep((s) => Math.min(3, s + 1));
    setErrors({});
  };

  const goBack = () => {
    setDirection(-1);
    setStep((s) => Math.max(1, s - 1));
    setErrors({});
  };

  const handleSubmit = async () => {
    if (!validateStep3()) return;
    setIsLoading(true);
    
    try {
      const payload: any = {
        account_type: formData.accountType,
        password: formData.password,
        confirm_password: formData.confirmPassword,
      };
      
      if (formData.accountType === "patient") {
        payload.full_name = formData.patientFullName;
        payload.email = formData.patientEmail;
        payload.phone = formData.patientMobile;
        payload.date_of_birth = formData.patientDob;
        payload.gender = formData.patientGender;
      } else if (formData.accountType === "doctor") {
        payload.full_name = formData.doctorFullName;
        payload.email = formData.doctorEmail;
        payload.phone = formData.doctorMobile;
        payload.license_number = formData.doctorRegNo;
        payload.specialty = formData.doctorSpec;
      } else if (formData.accountType === "hospital") {
        payload.full_name = formData.hospitalName;
        payload.email = formData.hospitalEmail;
        payload.phone = formData.hospitalPhone;
        payload.license_number = formData.hospitalRegNo;
        payload.address = formData.hospitalAddress;
      }

      const response = await import("@/lib/api").then(m => m.apiRegister(payload));
      
      toast.success("Account created successfully!");
      
      setTimeout(() => {
        login({ 
          id: response.data.user.id, 
          name: response.data.user.full_name, 
          email: response.data.user.email, 
          role: response.data.user.role 
        });
      }, 1000);
      
    } catch (error: any) {
      toast.error(error.message || "Something went wrong during registration.");
      setIsLoading(false);
    }
  };

  const slideVariants = {
    initial: (dir: number) => ({ x: dir > 0 ? 30 : -30, opacity: 0 }),
    animate: { x: 0, opacity: 1, transition: { duration: 0.3, ease: "easeOut" } },
    exit: (dir: number) => ({ x: dir > 0 ? -30 : 30, opacity: 0, transition: { duration: 0.2, ease: "easeIn" } }),
  };

  const InputField = ({ label, id, type = "text", required = false, isHalf = false, rightElement, ...props }: any) => (
    <div className={`flex flex-col gap-1.5 ${isHalf ? "md:col-span-1 col-span-2" : "col-span-2"}`}>
      <label htmlFor={id} className="text-sm font-semibold text-slate-700 ml-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        {type === "select" ? (
          <select
            id={id}
            className={`w-full h-[52px] rounded-xl px-4 border-2 transition-all outline-none bg-transparent appearance-none ${errors[id] ? "border-red-400 focus:border-red-500 bg-red-50" : "border-slate-200 focus:border-[#70DE71] hover:border-slate-300"}`}
            {...props}
          >
            <option value="">Select...</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        ) : (
          <input
            id={id}
            type={type}
            className={`w-full h-[52px] rounded-xl px-4 border-2 transition-all outline-none bg-transparent ${errors[id] ? "border-red-400 focus:border-red-500 bg-red-50" : "border-slate-200 focus:border-[#70DE71] hover:border-slate-300"}`}
            {...props}
          />
        )}
        {rightElement && <div className="absolute right-4 top-1/2 -translate-y-1/2">{rightElement}</div>}
      </div>
      <AnimatePresence>
        {errors[id] && (
          <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="text-xs text-red-500 font-medium ml-1">
            {errors[id]}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <main className="min-h-screen bg-white flex flex-col items-center py-10 px-4 sm:px-6">
      <Toaster position="top-center" />
      
      {/* Logo */}
      <Link href="/" className="mb-12">
        <Image src="/images/shustota ai logo.png" alt="Shustota AI" width={400} height={140} className="h-28 sm:h-32 w-auto object-contain" />
      </Link>

      {/* Main Container */}
      <div className="w-full max-w-[700px]">
        {/* Progress Dots */}
        <div className="flex items-center justify-center gap-3 mb-10">
          {[1, 2, 3].map((num) => (
            <div key={num} className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${step >= num ? "bg-[#70DE71] scale-125" : "bg-slate-200"}`} />
          ))}
        </div>

        <AnimatePresence mode="wait" custom={direction}>
          {/* STEP 1: WHO ARE YOU? */}
          {step === 1 && (
            <motion.div key="step1" custom={direction} variants={slideVariants} initial="initial" animate="animate" exit="exit" className="flex flex-col items-center">
              <h1 className="text-2xl font-bold text-slate-800 mb-8 uppercase tracking-wide">Step 1 – Who Are You?</h1>
              
              <div className="w-full flex flex-col sm:flex-row gap-5 justify-center mb-10">
                {ACCOUNT_TYPES.map((type) => {
                  const isSelected = formData.accountType === type.value;
                  return (
                    <button
                      key={type.value}
                      onClick={() => updateForm("accountType", type.value)}
                      className={`relative flex flex-col items-center justify-center gap-4 rounded-[16px] border-2 transition-all p-6 cursor-pointer overflow-hidden
                        w-full sm:w-[200px] lg:w-[220px] h-[160px] sm:h-[170px] lg:h-[180px]
                        ${isSelected ? "border-[#70DE71] bg-[#70DE71]/5 shadow-[0_4px_20px_rgba(112,222,113,0.15)]" : "border-slate-200 bg-white hover:border-[#70DE71]/50 shadow-sm"}
                      `}
                    >
                      {isSelected && (
                        <div className="absolute top-3 right-3 text-[#70DE71]">
                          <CheckCircle2 size={20} className="fill-[#70DE71]/20" />
                        </div>
                      )}
                      <div className={`p-4 rounded-full ${isSelected ? "bg-[#70DE71] text-white" : "bg-slate-100 text-slate-500 transition-colors group-hover:bg-[#70DE71]/10"}`}>
                        <type.icon size={32} />
                      </div>
                      <span className={`font-bold text-lg ${isSelected ? "text-slate-800" : "text-slate-500"}`}>{type.label}</span>
                    </button>
                  );
                })}
              </div>

              <button
                onClick={goNext}
                disabled={!formData.accountType}
                className="w-full h-[52px] bg-[#70DE71] hover:bg-[#5bc95c] disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold rounded-xl transition-all shadow-md active:scale-[0.98]"
              >
                Continue
              </button>
            </motion.div>
          )}

          {/* STEP 2: PERSONAL INFORMATION */}
          {step === 2 && (
            <motion.div key="step2" custom={direction} variants={slideVariants} initial="initial" animate="animate" exit="exit" className="w-full">
              <div className="flex items-center mb-8 relative">
                <button onClick={goBack} className="absolute left-0 p-2 text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors">
                  <ArrowLeft size={20} />
                </button>
                <h1 className="text-2xl font-bold text-slate-800 uppercase tracking-wide w-full text-center">Step 2 – Personal Information</h1>
              </div>

              <div className="grid grid-cols-2 gap-5 mb-8">
                {formData.accountType === "patient" && (
                  <>
                    <InputField id="patientFullName" label="Full Name" required isHalf value={formData.patientFullName} onChange={(e: any) => updateForm("patientFullName", e.target.value)} />
                    <InputField id="patientEmail" label="Email Address" type="email" required isHalf value={formData.patientEmail} onChange={(e: any) => updateForm("patientEmail", e.target.value)} />
                    <InputField id="patientMobile" label="Mobile Number" type="tel" required isHalf value={formData.patientMobile} onChange={(e: any) => updateForm("patientMobile", e.target.value)} />
                    <InputField id="patientDob" label="Date of Birth" type="date" isHalf value={formData.patientDob} onChange={(e: any) => updateForm("patientDob", e.target.value)} />
                    <InputField id="patientGender" label="Gender" type="select" isHalf value={formData.patientGender} onChange={(e: any) => updateForm("patientGender", e.target.value)} />
                    <div className="col-span-2 mt-2 bg-slate-50 p-4 rounded-[16px] border border-slate-100 shadow-sm">
                      <p className="text-sm text-slate-500 font-medium leading-relaxed">
                        <span className="font-bold text-slate-700">Note:</span> Blood Group, Address, Emergency Contact, Medical History and other profile information can be updated later from Profile Settings.
                      </p>
                    </div>
                  </>
                )}

                {formData.accountType === "doctor" && (
                  <>
                    <InputField id="doctorFullName" label="Full Name" required isHalf value={formData.doctorFullName} onChange={(e: any) => updateForm("doctorFullName", e.target.value)} />
                    <InputField id="doctorEmail" label="Email Address" type="email" required isHalf value={formData.doctorEmail} onChange={(e: any) => updateForm("doctorEmail", e.target.value)} />
                    <InputField id="doctorMobile" label="Mobile Number" type="tel" required isHalf value={formData.doctorMobile} onChange={(e: any) => updateForm("doctorMobile", e.target.value)} />
                    <InputField id="doctorRegNo" label="Medical Registration Number" required isHalf value={formData.doctorRegNo} onChange={(e: any) => updateForm("doctorRegNo", e.target.value)} />
                    <InputField id="doctorSpec" label="Specialization" required value={formData.doctorSpec} onChange={(e: any) => updateForm("doctorSpec", e.target.value)} />
                    <div className="col-span-2 mt-2 bg-slate-50 p-4 rounded-[16px] border border-slate-100 shadow-sm">
                      <p className="text-sm text-slate-500 font-medium leading-relaxed">
                        <span className="font-bold text-slate-700">Note:</span> Qualification, Experience, Consultation Fee, Profile Photo and Certificates can be added later from Profile Settings.
                      </p>
                    </div>
                  </>
                )}

                {formData.accountType === "hospital" && (
                  <>
                    <InputField id="hospitalName" label="Hospital Name" required value={formData.hospitalName} onChange={(e: any) => updateForm("hospitalName", e.target.value)} />
                    <InputField id="hospitalEmail" label="Official Email" type="email" required isHalf value={formData.hospitalEmail} onChange={(e: any) => updateForm("hospitalEmail", e.target.value)} />
                    <InputField id="hospitalPhone" label="Phone Number" type="tel" required isHalf value={formData.hospitalPhone} onChange={(e: any) => updateForm("hospitalPhone", e.target.value)} />
                    <InputField id="hospitalRegNo" label="Hospital Registration Number" required value={formData.hospitalRegNo} onChange={(e: any) => updateForm("hospitalRegNo", e.target.value)} />
                    <InputField id="hospitalAddress" label="Address" value={formData.hospitalAddress} onChange={(e: any) => updateForm("hospitalAddress", e.target.value)} />
                    <div className="col-span-2 mt-2 bg-slate-50 p-4 rounded-[16px] border border-slate-100 shadow-sm">
                      <p className="text-sm text-slate-500 font-medium leading-relaxed">
                        <span className="font-bold text-slate-700">Note:</span> Hospital Logo, License, Beds, ICU, Ambulance, Google Map Location and other hospital information can be updated later from Hospital Settings.
                      </p>
                    </div>
                  </>
                )}
              </div>

              <button
                onClick={goNext}
                className="w-full h-[52px] bg-[#70DE71] hover:bg-[#5bc95c] text-white font-bold rounded-xl transition-all shadow-md active:scale-[0.98]"
              >
                Continue
              </button>
            </motion.div>
          )}

          {/* STEP 3: PASSWORD */}
          {step === 3 && (
            <motion.div key="step3" custom={direction} variants={slideVariants} initial="initial" animate="animate" exit="exit" className="w-full">
              <div className="flex items-center mb-8 relative">
                <button onClick={goBack} className="absolute left-0 p-2 text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors">
                  <ArrowLeft size={20} />
                </button>
                <h1 className="text-2xl font-bold text-slate-800 uppercase tracking-wide w-full text-center">Step 3 – Password</h1>
              </div>

              <div className="grid grid-cols-2 gap-5 mb-8">
                <InputField 
                  id="password" 
                  label="Password" 
                  type={showPassword ? "text" : "password"} 
                  required 
                  isHalf 
                  value={formData.password} 
                  onChange={(e: any) => updateForm("password", e.target.value)} 
                  rightElement={<button type="button" onClick={() => setShowPassword(!showPassword)} className="text-slate-400 hover:text-slate-600">{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button>}
                />
                <InputField 
                  id="confirmPassword" 
                  label="Confirm Password" 
                  type={showConfirm ? "text" : "password"} 
                  required 
                  isHalf 
                  value={formData.confirmPassword} 
                  onChange={(e: any) => updateForm("confirmPassword", e.target.value)} 
                  rightElement={<button type="button" onClick={() => setShowConfirm(!showConfirm)} className="text-slate-400 hover:text-slate-600">{showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}</button>}
                />
              </div>

              <label className="flex items-start gap-3 cursor-pointer mb-8 group">
                <div className="relative flex items-center justify-center shrink-0 mt-0.5">
                  <input type="checkbox" checked={formData.agreeTerms} onChange={(e) => updateForm("agreeTerms", e.target.checked)} className="peer sr-only" />
                  <div className={`w-5 h-5 rounded-md border-2 transition-all ${formData.agreeTerms ? "bg-[#70DE71] border-[#70DE71]" : "border-slate-300 group-hover:border-[#70DE71]"}`} />
                  <CheckCircle2 size={14} className={`absolute text-white transition-opacity ${formData.agreeTerms ? "opacity-100" : "opacity-0"}`} />
                </div>
                <span className="text-sm text-slate-600 font-medium">
                  I agree to the <Link href="/terms" className="text-[#70DE71] font-bold hover:underline">Terms</Link> & <Link href="/privacy" className="text-[#70DE71] font-bold hover:underline">Privacy Policy</Link>.
                </span>
              </label>

              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full h-[54px] bg-[#70DE71] hover:bg-[#5bc95c] disabled:bg-[#70DE71]/70 text-white font-bold rounded-[12px] transition-all shadow-md active:scale-[0.98] flex items-center justify-center"
              >
                {isLoading ? <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" /> : "Create Account"}
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="text-center text-sm text-slate-500 mt-12 font-medium">
          Already have an account? <Link href="/login" className="text-[#70DE71] font-bold hover:underline">Log in</Link>
        </p>
      </div>
    </main>
  );
}
