import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Shield, Heart } from "lucide-react";

interface LandingScreenProps {
  onCheckRisk: () => void;
}

const LandingScreen = ({ onCheckRisk }: LandingScreenProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <div className="max-w-md w-full flex flex-col items-center text-center">
        {/* Logo Section */}
        <div className="mb-6">
          <Logo size="lg" showText />
        </div>

        {/* Tagline */}
        <div className="flex items-center gap-2 mb-6">
          <Heart className="w-5 h-5 text-secondary" />
          <p className="text-secondary font-medium font-heading text-lg">
            AI-assisted early risk screening for endometriosis
          </p>
          <Heart className="w-5 h-5 text-secondary" />
        </div>

        {/* Description Card */}
        <div className="bg-card/80 backdrop-blur-sm rounded-3xl p-6 shadow-card mb-8 border border-border/50">
          <p className="text-foreground/90 leading-relaxed text-base">
            Many women experience severe menstrual pain that is often dismissed as normal. 
            <span className="font-medium text-secondary"> FemCare </span>
            helps identify symptom patterns that may indicate a higher risk of endometriosis 
            and encourages timely medical consultation.
          </p>
        </div>

        {/* CTA Button */}
        <Button
          variant="primary"
          size="xl"
          onClick={onCheckRisk}
          className="w-full max-w-xs mb-8"
        >
          Check My Risk
        </Button>

        {/* Privacy Footer */}
        <div className="flex items-center gap-2 text-muted-foreground text-sm">
          <Shield className="w-4 h-4" />
          <span>Your data is private and not stored</span>
        </div>
      </div>
    </div>
  );
};

export default LandingScreen;
