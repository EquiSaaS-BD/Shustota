"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export interface PrescriptionData {
  patientId: string;
  patientName: string;
  chiefComplaint: string;
  physicalExam: string;
  vitals: {
    bp: string;
    pulse: string;
    temp: string;
    weight: string;
    height: string;
    bmi: string;
    spo2: string;
    bloodSugar: string;
  };
  diagnosis: string;
  investigations: string;
  medicines: Array<{
    id: string | number;
    name: string;
    type: string;
    dosageM: string;
    dosageN: string;
    dosageE: string;
    frequency: string;
    duration: string;
    notes: string;
  }>;
  advice: string;
  followUp: string;
}

const initialData: PrescriptionData = {
  patientId: "",
  patientName: "",
  chiefComplaint: "",
  physicalExam: "",
  vitals: {
    bp: "",
    pulse: "",
    temp: "",
    weight: "",
    height: "",
    bmi: "",
    spo2: "",
    bloodSugar: "",
  },
  diagnosis: "",
  investigations: "",
  medicines: [],
  advice: "",
  followUp: "",
};

interface PrescriptionContextType {
  data: PrescriptionData;
  updateData: (updates: Partial<PrescriptionData>) => void;
  updateVitals: (vitals: Partial<PrescriptionData["vitals"]>) => void;
  addMedicine: (medicine: PrescriptionData["medicines"][0]) => void;
  removeMedicine: (id: string) => void;
  loadPrescription: (data: PrescriptionData) => void;
}

const PrescriptionContext = createContext<PrescriptionContextType | undefined>(undefined);

export function PrescriptionProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<PrescriptionData>(initialData);

  const updateData = (updates: Partial<PrescriptionData>) => {
    setData((prev) => ({ ...prev, ...updates }));
  };

  const updateVitals = (vitalsUpdates: Partial<PrescriptionData["vitals"]>) => {
    setData((prev) => ({
      ...prev,
      vitals: { ...prev.vitals, ...vitalsUpdates },
    }));
  };

  const addMedicine = (medicine: PrescriptionData["medicines"][0]) => {
    setData((prev) => ({
      ...prev,
      medicines: [...prev.medicines, medicine],
    }));
  };

  const removeMedicine = (id: string) => {
    setData((prev) => ({
      ...prev,
      medicines: prev.medicines.filter((m) => m.id !== id),
    }));
  };

  const loadPrescription = (newData: PrescriptionData) => {
    setData(newData);
  };

  return (
    <PrescriptionContext.Provider
      value={{
        data,
        updateData,
        updateVitals,
        addMedicine,
        removeMedicine,
        loadPrescription,
      }}
    >
      {children}
    </PrescriptionContext.Provider>
  );
}

export function usePrescription() {
  const context = useContext(PrescriptionContext);
  if (context === undefined) {
    throw new Error("usePrescription must be used within a PrescriptionProvider");
  }
  return context;
}
