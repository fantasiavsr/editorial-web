import { Package } from "lucide-react";

export default function DashboardProductsContent() {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-primary-black dark:text-primary-white">
        Products
      </h2>
      <div className="bg-primary-white dark:bg-primary-dark-card rounded-lg border border-primary-black/10 dark:border-primary-white/10 p-8 text-center">
        <Package size={48} className="mx-auto mb-4 text-primary-orange" />
        <p className="text-primary-black/80 dark:text-primary-white/80">
          View and manage your product catalog
        </p>
      </div>
    </div>
  );
}
