import { ArrowDownRight, ArrowUpRight, type LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface DashboardCardProps {
  title: string;
  value: string;
  delta: number;
  trend: "up" | "down";
  caption: string;
  icon: LucideIcon;
}

const DashboardCard = ({ title, value, delta, trend, caption, icon: Icon }: DashboardCardProps) => {
  const isPositive = trend === "up";

  return (
    <Card className="bg-card shadow-sm">
      <CardContent className="p-5">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">{value}</h3>
          </div>
          <div className="rounded-lg bg-muted p-2 text-foreground">
            <Icon className="h-5 w-5" />
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <span
            className={[
              "inline-flex items-center gap-1 rounded-full px-2 py-1 font-medium",
              isPositive
                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                : "bg-red-500/10 text-red-600 dark:text-red-400",
            ].join(" ")}
          >
            {isPositive ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
            {Math.abs(delta).toFixed(1)}%
          </span>
          <span className="text-muted-foreground">{caption}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;