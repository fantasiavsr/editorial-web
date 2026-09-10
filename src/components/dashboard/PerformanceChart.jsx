import { ShoppingCart, Users, TrendingUp, Activity, ArrowUpRight, ArrowDownRight } from "lucide-react";

const performanceData = [
  { category: "Product Sales", value: 45, icon: ShoppingCart, color: "bg-primary-orange-strong" },
  { category: "User Growth", value: 62, icon: Users, color: "bg-primary-purple-strong" },
  { category: "Engagement", value: 78, icon: Activity, color: "bg-primary-sage-strong" },
  { category: "Market Share", value: 51, icon: TrendingUp, color: "bg-primary-black-strong dark:bg-primary-grey-strong" },
];

export default function PerformanceChart() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Performance Metrics */}
      <div className="bg-primary-white dark:bg-primary-dark-card rounded-lg border border-primary-black/10 dark:border-primary-white/10 p-6">
        <h3 className="text-lg font-bold text-primary-black dark:text-primary-white mb-6">
          Performance Metrics
        </h3>
        <div className="space-y-4">
          {performanceData.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div key={idx}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-lg border border-primary-black/10 dark:border-primary-white/10`}>
                      <IconComponent size={18} strokeWidth={1.5} className="text-primary-black/70 dark:text-primary-white/70" />
                    </div>
                    <span className="text-sm font-medium text-primary-black dark:text-primary-white">
                      {item.category}
                    </span>
                  </div>
                  <span className="text-sm font-bold text-primary-orange-strong">
                    {item.value}%
                  </span>
                </div>
                <div className="w-full bg-primary-black/10 dark:bg-primary-white/10 rounded-full h-2">
                  <div
                    className="bg-primary-orange-strong h-2 rounded-full transition-all duration-500"
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-primary-white dark:bg-primary-dark-card rounded-lg border border-primary-black/10 dark:border-primary-white/10 p-6">
        <h3 className="text-lg font-bold text-primary-black dark:text-primary-white mb-6">
          Key Metrics
        </h3>
        <div className="space-y-4">
          {[
            { label: "Avg. Order Value", value: "$156.42", change: "+5.2%" },
            { label: "Customer Retention", value: "87.3%", change: "+2.1%" },
            { label: "Cart Abandonment", value: "22.5%", change: "-3.8%" },
            { label: "Repeat Customers", value: "43.2%", change: "+7.4%" },
          ].map((metric, idx) => (
            <div key={idx} className="flex items-center justify-between pb-4 border-b border-primary-black/10 dark:border-primary-white/10 last:border-b-0 last:pb-0">
              <span className="text-sm text-primary-black/60 dark:text-primary-white/60">
                {metric.label}
              </span>
              <div className="text-right">
                <p className="text-sm font-bold text-primary-black dark:text-primary-white">
                  {metric.value}
                </p>
                <p className="text-xs text-primary-orange-strong">
                  {metric.change}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
