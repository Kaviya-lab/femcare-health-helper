import femcareLogo from "@/assets/femcare-logo.png";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

const sizeClasses = {
  sm: "w-16 h-16",
  md: "w-24 h-24",
  lg: "w-32 h-32",
};

const Logo = ({ size = "lg", showText = true }: LogoProps) => {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className={`${sizeClasses[size]} relative animate-scale-in`}>
        <img
          src={femcareLogo}
          alt="FemCare Logo"
          className="w-full h-full object-contain drop-shadow-lg"
        />
      </div>
      {showText && (
        <h1 className="font-heading text-4xl font-bold text-secondary animate-fade-in">
          FemCare
        </h1>
      )}
    </div>
  );
};

export default Logo;
