"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MouseMagneticEffect } from "@/components/landing/MouseMagneticEffect";
import { FloatingAIAssistant } from "@/components/landing/FloatingAIAssistant";
import { HeroSection } from "@/components/landing/HeroSection";
import { TrustedBySection } from "@/components/landing/TrustedBySection";
import { AIIntelligenceSuite } from "@/components/landing/AIIntelligenceSuite";
import { FeaturesOverview } from "@/components/landing/FeaturesOverview";
import { DashboardPreview } from "@/components/landing/DashboardPreview";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { SecurityAndFAQ } from "@/components/landing/SecurityAndFAQ";
import { FinalCTASection } from "@/components/landing/FinalCTASection";
import { MedicalDirectory } from "@/components/landing/MedicalDirectory";

export default function LandingPage() {
  return (
    <>
      <MouseMagneticEffect />
      <FloatingAIAssistant />
      
      <div className="min-h-screen bg-white flex flex-col overflow-x-hidden w-full pt-16 sm:pt-20 selection:bg-primary/20 selection:text-primary">
        <Navbar />

        <main className="flex-1">
          <HeroSection />
          <TrustedBySection />
          
          {/* AI Features */}
          <FeaturesOverview />
          <AIIntelligenceSuite />
          <DashboardPreview />
          <MedicalDirectory />
          
          <HowItWorksSection />
          <TestimonialsSection />
          <SecurityAndFAQ />
          <FinalCTASection />
        </main>

        <Footer />
      </div>
    </>
  );
}
