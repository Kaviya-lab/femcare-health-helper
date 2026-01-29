interface Contribution {
  label: string;
  value: number;
  active: boolean;
}

interface RiskContributorChartProps {
  contributions: Contribution[];
}

const RiskContributorChart = ({ contributions }: RiskContributorChartProps) => {
  const maxValue = Math.max(...contributions.map((c) => c.value));

  return (
    <div className="space-y-3">
      {contributions.map((contribution, index) => {
        const percentage = Math.round((contribution.value / maxValue) * 100);
        
        return (
          <div key={contribution.label} className="space-y-1.5">
            <div className="flex justify-between items-center">
              <span className="text-xs text-foreground/80 font-medium">
                {contribution.label}
              </span>
            </div>
            <div className="h-3 bg-muted rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ease-out ${
                  contribution.active
                    ? index === 0
                      ? "bg-secondary"
                      : "bg-primary"
                    : "bg-accent/60"
                }`}
                style={{
                  width: `${percentage}%`,
                  animation: `grow-bar 0.8s ease-out ${index * 0.1}s forwards`,
                  ["--bar-width" as string]: `${percentage}%`,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RiskContributorChart;
