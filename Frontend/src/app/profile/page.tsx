"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { apiGetProfile, apiUpdateProfile } from "@/lib/api";
import { toast, Toaster } from "sonner";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Save, User, UserCog, Stethoscope, Building2 } from "lucide-react";

export default function ProfilePage() {
  const { user, isLoading: isAuthLoading } = useAuth();
  const [profileData, setProfileData] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!isAuthLoading && user) {
      loadProfile();
    }
    if (!isAuthLoading && !user) {
      window.location.href = "/login";
    }
  }, [user, isAuthLoading]);

  const loadProfile = async () => {
    try {
      const response = await apiGetProfile();
      setProfileData(response.data.profile);
      setFormData(response.data.profile);
    } catch (error) {
      toast.error("Failed to load profile data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await apiUpdateProfile(formData);
      toast.success("Profile updated successfully!");
      loadProfile();
    } catch (error: any) {
      toast.error(error.message || "Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  if (isAuthLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  const role = user?.role;

  const InputField = ({ label, id, type = "text", ...props }: any) => (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-slate-700">{label}</label>
      <input
        type={type}
        id={id}
        value={formData[id] || ""}
        onChange={(e) => handleInputChange(id, e.target.value)}
        className="w-full h-12 rounded-xl px-4 border-2 border-slate-200 focus:border-primary outline-none transition-all"
        {...props}
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />
      <Toaster position="top-center" />
      
      <main className="flex-1 w-full max-w-4xl mx-auto pt-24 pb-16 px-4 sm:px-6">
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-[#00687b] px-8 py-10 text-white flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm border-2 border-white/50 shadow-lg">
              {role === "patient" && <User size={40} />}
              {role === "doctor" && <Stethoscope size={40} />}
              {role === "hospital" && <Building2 size={40} />}
            </div>
            <div>
              <h1 className="text-3xl font-bold">{formData.full_name}</h1>
              <p className="text-white/80 mt-1 capitalize font-medium flex items-center gap-2">
                <UserCog size={16} />
                {role} Profile
              </p>
            </div>
          </div>

          <div className="p-8 sm:p-10">
            <h2 className="text-xl font-bold text-slate-800 mb-6 border-b border-slate-100 pb-4">Personal Information</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              <InputField label="Full Name" id="full_name" />
              <InputField label="Email Address" id="email" disabled className="w-full h-12 rounded-xl px-4 border-2 border-slate-100 bg-slate-50 text-slate-500 cursor-not-allowed" />
              <InputField label="Phone Number" id="phone" />
              
              {role === "patient" && (
                <>
                  <InputField label="Date of Birth" id="date_of_birth" type="date" />
                  <InputField label="Gender" id="gender" />
                  <InputField label="Blood Group" id="blood_group" />
                  <InputField label="Height" id="height" />
                  <InputField label="Weight" id="weight" />
                  <InputField label="Emergency Contact" id="emergency_contact" />
                </>
              )}

              {role === "doctor" && (
                <>
                  <InputField label="Specialty" id="specialty" />
                  <InputField label="Qualification" id="qualification" />
                  <InputField label="Experience (Years)" id="experience_years" type="number" />
                  <InputField label="License Number" id="license_number" />
                  <InputField label="Consultation Fee (৳)" id="consultation_fee" type="number" />
                  <InputField label="Hospital/Clinic Name" id="hospital_name" />
                </>
              )}

              {role === "hospital" && (
                <>
                  <InputField label="Hospital Name" id="hospital_name" />
                  <InputField label="License Number" id="license_number" />
                  <InputField label="City" id="city" />
                  <InputField label="Bed Count" id="bed_count" type="number" />
                </>
              )}
            </div>

            {(role === "doctor" || role === "hospital") && (
              <>
                <h2 className="text-xl font-bold text-slate-800 mb-6 border-b border-slate-100 pb-4">Additional Details</h2>
                <div className="grid grid-cols-1 gap-6 mb-10">
                  {role === "doctor" && (
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-slate-700">Biography</label>
                      <textarea
                        value={formData.bio || ""}
                        onChange={(e) => handleInputChange("bio", e.target.value)}
                        className="w-full min-h-[120px] rounded-xl p-4 border-2 border-slate-200 focus:border-primary outline-none transition-all resize-y"
                        placeholder="Tell us about yourself..."
                      />
                    </div>
                  )}
                  {role === "hospital" && (
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-slate-700">Full Address</label>
                      <textarea
                        value={formData.address || ""}
                        onChange={(e) => handleInputChange("address", e.target.value)}
                        className="w-full min-h-[120px] rounded-xl p-4 border-2 border-slate-200 focus:border-primary outline-none transition-all resize-y"
                      />
                    </div>
                  )}
                </div>
              </>
            )}

            <div className="flex justify-end pt-4">
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary/90 disabled:bg-primary/70 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl active:scale-[0.98]"
              >
                {isSaving ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Save size={20} />
                )}
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
