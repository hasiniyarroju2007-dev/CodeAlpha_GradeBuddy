import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  variant?: "primary" | "secondary" | "success";
}

const StatCard = ({ title, value, icon: Icon, variant = "primary" }: StatCardProps) => {
  const variantStyles = {
    primary: "from-primary to-primary/80",
    secondary: "from-secondary to-secondary/80",
    success: "from-success to-success/80",
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1" style={{ transition: "var(--transition-smooth)", boxShadow: "var(--shadow-soft)" }}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
            <p className="text-3xl font-bold text-foreground">{value}</p>
          </div>
          <div className={`p-3 rounded-xl bg-gradient-to-br ${variantStyles[variant]}`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
