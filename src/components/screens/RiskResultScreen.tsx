import { Button } from "@/components/ui/button";
import { AlertCircle, BookOpen, Stethoscope, RotateCcw } from "lucide-react";
import type { SymptomData } from "@/pages/Index";
import RiskContributorChart from "@/components/RiskContributorChart";

interface RiskResultScreenProps {
  symptomData: SymptomData;
  riskLevel: "low" | "medium" | "high";
  onStartOver: () => void;
}

const riskConfig = {
  low: {
    label: "Low Risk",
    bgClass: "bg-success/20",
    textClass: "text-success",
    borderClass: "border-success/30",
    message: "Your symptoms appear to be within a typical range. However, if you continue to experience discomfort or your symptoms worsen, consider discussing them with a healthcare provider.",
  },
  medium: {
    label: "Medium Risk",
    bgClass: "bg-warning/20",
    textClass: "text-warning-foreground",
    borderClass: "border-warning/30",
    message: "Some of your symptoms may warrant further attention. Consider scheduling a consultation with a gynecologist to discuss your menstrual health and rule out any underlying conditions.",
  },
  high: {
    label: "High Risk",
    bgClass: "bg-risk-high/20",
    textClass: "text-risk-high",
    borderClass: "border-risk-high/30",
    message: "Your symptoms show patterns commonly associated with endometriosis. Early medical consultation may help reduce diagnostic delays and improve outcomes.",
  },
};

const RiskResultScreen = ({ symptomData, riskLevel, onStartOver }: RiskResultScreenProps) => {
  const config = riskConfig[riskLevel];

  // Calculate contributions for chart
  const contributions = [
    {
      label: "Severe menstrual pain",
      value: symptomData.painSeverity * 10,
      active: symptomData.painSeverity > 3,
    },
    {
      label: "Pain outside periods",
      value: symptomData.painOutsidePeriods ? 80 : 10,
      active: symptomData.painOutsidePeriods,
    },
    {
      label: "Gastrointestinal symptoms",
      value: symptomData.giSymptoms ? 60 : 10,
      active: symptomData.giSymptoms,
    },
    {
      label: "Persistent fatigue",
      value: symptomData.fatigue ? 50 : 10,
      active: symptomData.fatigue,
    },
    {
      label: "Irregular cycles",
      value: symptomData.irregularCycles ? 40 : 10,
      active: symptomData.irregularCycles,
    },
  ].sort((a, b) => b.value - a.value);

  return (
    <div className="min-h-screen flex flex-col px-6 py-8">
      <div className="max-w-md w-full mx-auto flex flex-col flex-1">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="font-heading text-2xl font-bold text-foreground mb-2">
            Your Risk Assessment
          </h1>
        </div>

        {/* Risk Badge */}
        <div className="flex justify-center mb-6">
          <div
            className={`
              px-8 py-4 rounded-full border-2 
              ${config.bgClass} ${config.borderClass}
              animate-scale-in shadow-card
            `}
          >
            <span className={`font-heading text-2xl font-bold ${config.textClass}`}>
              {config.label}
            </span>
          </div>
        </div>

        {/* Explanation Card */}
        <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-5 shadow-soft border border-border/50 mb-6">
          <p className="text-foreground/90 leading-relaxed text-sm">
            {config.message}
          </p>
        </div>

        {/* Explainability Section */}
        <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-5 shadow-soft border border-border/50 mb-6">
          <h2 className="font-heading font-semibold text-foreground mb-4 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
            Key Risk Contributors
          </h2>
          
          <RiskContributorChart contributions={contributions} />
          
          <p className="text-muted-foreground text-xs mt-4 text-center">
            This visualization highlights which symptoms contributed most to the risk assessment.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 mt-auto">
          <Button
            variant="primary"
            size="lg"
            className="w-full"
            onClick={() => window.open("https://www.acog.org/womens-health/find-an-ob-gyn", "_blank")}
          >
            <Stethoscope className="w-5 h-5" />
            Consult a Gynecologist
          </Button>
          
          <Button
            variant="soft"
            size="lg"
            className="w-full"
            onClick={() => window.open("https://www.endometriosis.org/endometriosis/", "_blank")}
          >
            <BookOpen className="w-5 h-5" />
            Learn More
          </Button>

          <Button
            variant="ghost"
            size="default"
            className="w-full"
            onClick={onStartOver}
          >
            <RotateCcw className="w-4 h-4" />
            Start Over
          </Button>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 flex items-start gap-2 text-muted-foreground text-xs text-center justify-center">
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <span>This tool does not provide a medical diagnosis.</span>
        </div>
      </div>
    </div>
  );
};

export default RiskResultScreen;
