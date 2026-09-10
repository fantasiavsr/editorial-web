import { DollarSign } from "lucide-react";

export default function DashboardPricingContent() {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-primary-black dark:text-primary-white">
        Pricing
      </h2>
      <div className="bg-primary-white dark:bg-primary-dark-card rounded-lg border border-primary-black/10 dark:border-primary-white/10 p-8 text-center">
        <DollarSign size={48} className="mx-auto mb-4 text-primary-orange" />
        <p className="text-primary-black/80 dark:text-primary-white/80">
          Configure pricing plans and billing
        </p>
      </div>
    </div>
  );
}
