"use client";

import React, { useState } from "react";
import { PrescriptionEditorLayout } from "@/components/prescription/PrescriptionEditorLayout";
import { PatientContextSidebar } from "@/components/prescription/PatientContextSidebar";
import { SmartEditorArea } from "@/components/prescription/SmartEditorArea";
import { PrescriptionTopbar } from "@/components/prescription/PrescriptionTopbar";
import { AIAssistancePanel } from "@/components/prescription/AIAssistancePanel";
import { PrescriptionProvider } from "@/context/PrescriptionContext";
import { TemplateExportModal } from "@/components/prescription/TemplateExportModal";
import { PrescriptionPreviewModal } from "@/components/prescription/PrescriptionPreviewModal";

export default function NewPrescriptionPage() {
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

  return (
    <PrescriptionProvider>
      <PrescriptionEditorLayout
        topbar={<PrescriptionTopbar onFinalize={() => setIsExportModalOpen(true)} onPreview={() => setIsPreviewModalOpen(true)} />}
        editor={<SmartEditorArea onFinalize={() => setIsExportModalOpen(true)} />}
        aiPanel={<AIAssistancePanel />}
      />

      <TemplateExportModal 
        isOpen={isExportModalOpen} 
        onClose={() => setIsExportModalOpen(false)} 
      />

      <PrescriptionPreviewModal
        isOpen={isPreviewModalOpen}
        onClose={() => setIsPreviewModalOpen(false)}
      />
    </PrescriptionProvider>
  );
}
