"use client";

import React, { useState } from "react";
import { PrescriptionEditorLayout } from "@/components/prescription/PrescriptionEditorLayout";
import { PatientContextSidebar } from "@/components/prescription/PatientContextSidebar";
import { SmartEditorArea } from "@/components/prescription/SmartEditorArea";
import { PrescriptionTopbar } from "@/components/prescription/PrescriptionTopbar";
import { AIAssistancePanel } from "@/components/prescription/AIAssistancePanel";
import { PrescriptionProvider } from "@/context/PrescriptionContext";
import { PrescriptionFinalizeModal } from "@/components/prescription/PrescriptionFinalizeModal";
import { PrescriptionPreviewModal } from "@/components/prescription/PrescriptionPreviewModal";
import { TestReportViewer } from "@/components/prescription/TestReportViewer";

export default function NewPrescriptionPage() {
  const [isFinalizeModalOpen, setIsFinalizeModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"prescription" | "report">("prescription");

  return (
    <PrescriptionProvider>
      <PrescriptionEditorLayout
        topbar={
          <PrescriptionTopbar 
            onFinalize={() => setIsFinalizeModalOpen(true)} 
            onPreview={() => setIsPreviewModalOpen(true)}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        }
        editor={
          activeTab === "prescription" ? (
            <SmartEditorArea onFinalize={() => setIsFinalizeModalOpen(true)} />
          ) : (
            <TestReportViewer />
          )
        }
        aiPanel={<AIAssistancePanel />}
      />

      <PrescriptionFinalizeModal 
        isOpen={isFinalizeModalOpen} 
        onClose={() => setIsFinalizeModalOpen(false)} 
      />

      <PrescriptionPreviewModal
        isOpen={isPreviewModalOpen}
        onClose={() => setIsPreviewModalOpen(false)}
      />
    </PrescriptionProvider>
  );
}
