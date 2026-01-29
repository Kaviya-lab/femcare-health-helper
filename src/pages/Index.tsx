import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LandingScreen from "@/components/screens/LandingScreen";
import SymptomInputScreen from "@/components/screens/SymptomInputScreen";
import RiskResultScreen from "@/components/screens/RiskResultScreen";

export type Screen = "landing" | "symptoms" | "results";

export interface SymptomData {
  painSeverity: number;
  painDuration: number;
  painOutsidePeriods: boolean;
  giSymptoms: boolean;
  fatigue: boolean;
  irregularCycles: boolean;
}

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>("landing");
  const [symptomData, setSymptomData] = useState<SymptomData>({
    painSeverity: 3,
    painDuration: 2,
    painOutsidePeriods: false,
    giSymptoms: false,
    fatigue: false,
    irregularCycles: false,
  });

  const calculateRiskLevel = (): "low" | "medium" | "high" => {
    let score = 0;
    
    // Pain severity (0-10 scale, higher = more risk)
    score += symptomData.painSeverity * 1.5;
    
    // Pain duration (more days = more risk)
    score += Math.min(symptomData.painDuration, 7) * 0.8;
    
    // Boolean symptoms
    if (symptomData.painOutsidePeriods) score += 4;
    if (symptomData.giSymptoms) score += 3;
    if (symptomData.fatigue) score += 2;
    if (symptomData.irregularCycles) score += 2;
    
    if (score >= 15) return "high";
    if (score >= 8) return "medium";
    return "low";
  };

  const handleCheckRisk = () => {
    setCurrentScreen("symptoms");
  };

  const handleAssessRisk = (data: SymptomData) => {
    setSymptomData(data);
    setCurrentScreen("results");
  };

  const handleStartOver = () => {
    setSymptomData({
      painSeverity: 3,
      painDuration: 2,
      painOutsidePeriods: false,
      giSymptoms: false,
      fatigue: false,
      irregularCycles: false,
    });
    setCurrentScreen("landing");
  };

  return (
    <div className="min-h-screen gradient-bg">
      <AnimatePresence mode="wait">
        {currentScreen === "landing" && (
          <motion.div
            key="landing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <LandingScreen onCheckRisk={handleCheckRisk} />
          </motion.div>
        )}

        {currentScreen === "symptoms" && (
          <motion.div
            key="symptoms"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
          >
            <SymptomInputScreen
              initialData={symptomData}
              onAssess={handleAssessRisk}
              onBack={() => setCurrentScreen("landing")}
            />
          </motion.div>
        )}

        {currentScreen === "results" && (
          <motion.div
            key="results"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
          >
            <RiskResultScreen
              symptomData={symptomData}
              riskLevel={calculateRiskLevel()}
              onStartOver={handleStartOver}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
