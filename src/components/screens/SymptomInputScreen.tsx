import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, AlertCircle } from "lucide-react";
import type { SymptomData } from "@/pages/Index";

interface SymptomInputScreenProps {
  initialData: SymptomData;
  onAssess: (data: SymptomData) => void;
  onBack: () => void;
}

const SymptomInputScreen = ({ initialData, onAssess, onBack }: SymptomInputScreenProps) => {
  const [data, setData] = useState<SymptomData>(initialData);

  const handleSubmit = () => {
    onAssess(data);
  };

  return (
    <div className="min-h-screen flex flex-col px-6 py-8">
      <div className="max-w-md w-full mx-auto flex flex-col flex-1">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <h1 className="font-heading text-2xl font-bold text-foreground mb-2">
            Tell us about your symptoms
          </h1>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Answer a few questions based on your recent menstrual cycles. This helps assess 
            whether your symptoms follow patterns commonly associated with endometriosis.
          </p>
        </div>

        {/* Form */}
        <div className="flex-1 space-y-6">
          {/* Pain Severity Slider */}
          <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-5 shadow-soft border border-border/50">
            <label className="block font-heading font-medium text-foreground mb-4">
              Pain severity during periods
            </label>
            <div className="px-2">
              <Slider
                value={[data.painSeverity]}
                onValueChange={(value) => setData({ ...data, painSeverity: value[0] })}
                max={10}
                min={0}
                step={1}
                className="mb-3"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>No pain</span>
                <span className="font-medium text-secondary">{data.painSeverity}/10</span>
                <span>Severe</span>
              </div>
            </div>
          </div>

          {/* Pain Duration Slider */}
          <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-5 shadow-soft border border-border/50">
            <label className="block font-heading font-medium text-foreground mb-4">
              Pain duration (days per cycle)
            </label>
            <div className="px-2">
              <Slider
                value={[data.painDuration]}
                onValueChange={(value) => setData({ ...data, painDuration: value[0] })}
                max={14}
                min={0}
                step={1}
                className="mb-3"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0 days</span>
                <span className="font-medium text-secondary">{data.painDuration} days</span>
                <span>14+ days</span>
              </div>
            </div>
          </div>

          {/* Toggle Options */}
          <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-5 shadow-soft border border-border/50 space-y-4">
            <ToggleOption
              label="Pain outside periods"
              description="Do you experience pelvic pain between menstrual cycles?"
              checked={data.painOutsidePeriods}
              onChange={(checked) => setData({ ...data, painOutsidePeriods: checked })}
            />
            
            <div className="border-t border-border/50" />
            
            <ToggleOption
              label="Gastrointestinal symptoms"
              description="Bloating, bowel discomfort, or digestive issues during periods?"
              checked={data.giSymptoms}
              onChange={(checked) => setData({ ...data, giSymptoms: checked })}
            />
            
            <div className="border-t border-border/50" />
            
            <ToggleOption
              label="Persistent fatigue"
              description="Do you feel unusually tired during or around your period?"
              checked={data.fatigue}
              onChange={(checked) => setData({ ...data, fatigue: checked })}
            />
            
            <div className="border-t border-border/50" />
            
            <ToggleOption
              label="Irregular menstrual cycles"
              description="Are your cycles unpredictable or vary significantly in length?"
              checked={data.irregularCycles}
              onChange={(checked) => setData({ ...data, irregularCycles: checked })}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 space-y-4">
          <Button
            variant="primary"
            size="lg"
            onClick={handleSubmit}
            className="w-full"
          >
            Assess Risk
          </Button>
          
          <div className="flex items-start gap-2 text-muted-foreground text-xs text-center justify-center">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>This screening is non-diagnostic and for awareness only.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

interface ToggleOptionProps {
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const ToggleOption = ({ label, description, checked, onChange }: ToggleOptionProps) => {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex-1">
        <p className="font-heading font-medium text-foreground text-sm">{label}</p>
        <p className="text-muted-foreground text-xs mt-0.5">{description}</p>
      </div>
      <Switch
        checked={checked}
        onCheckedChange={onChange}
        className="data-[state=checked]:bg-secondary"
      />
    </div>
  );
};

export default SymptomInputScreen;
