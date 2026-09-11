import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import DashboardProductList from "../../components/product/DashboardProductList";
import { pricingEntitySchema } from "../../components/data-management/entitySchemas";
import { MockPricing } from "../../data/exampleData";

export default function DashboardPricingContent() {
  const [pricingPlans] = useState(MockPricing);
  const [searchTerm, setSearchTerm] = useState("");
  const [billingPeriod, setBillingPeriod] = useState("");
  const [sortBy, setSortBy] = useState("name");

  const filteredPlans = pricingPlans.filter((plan) => {
    const matchesSearch = plan.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBilling = billingPeriod ? plan.billingPeriod === billingPeriod : true;
    return matchesSearch && matchesBilling;
  });

  const sortedPlans = useMemo(() => {
    if (sortBy === "price") {
      return [...filteredPlans].sort((a, b) => a.price.localeCompare(b.price, undefined, { numeric: true }));
    }
    if (sortBy === "duration") {
      return [...filteredPlans].sort((a, b) => a.duration.localeCompare(b.duration));
    }
    return [...filteredPlans].sort((a, b) => a.name.localeCompare(b.name));
  }, [filteredPlans, sortBy]);

  return (
    <div className="min-h-screen text-primary-black dark:text-primary-white font-sans transition-colors">
      <div className="pt-0 pb-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-primary-black dark:text-primary-white">Pricing</h2>
            <p className="text-sm text-primary-black/60 dark:text-primary-white/60 mt-2">Configure pricing plans, benefits, and billing details</p>
          </div>
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary-orange/10 dark:bg-primary-orange/20 text-primary-orange-strong text-xs font-medium tracking-wide w-fit">{sortedPlans.length} items</span>
        </div>
      </div>

      <div className="sticky top-0 z-30 backdrop-blur-sm border-b border-primary-black/10 dark:border-primary-white/10">
        <div className="px-0 py-4 flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
          <div className="relative flex-1 max-w-xl">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-black/40 dark:text-primary-white/40" />
            <input type="text" value={searchTerm} onChange={(event) => { setSearchTerm(event.target.value); setBillingPeriod(""); }} placeholder="Search by plan name..." className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-primary-black/10 dark:border-primary-white/10 bg-primary-white dark:bg-primary-dark-card text-sm focus:outline-none focus:border-primary-orange focus:ring-1 focus:ring-primary-orange/20 transition-all" />
          </div>

          <select value={billingPeriod} onChange={(event) => { setBillingPeriod(event.target.value); setSearchTerm(""); }} className="px-3 py-2.5 rounded-xl border border-primary-black/10 dark:border-primary-white/10 bg-primary-white dark:bg-primary-dark-card text-sm focus:outline-none focus:border-primary-orange transition-all">
            <option value="">All Billing Periods</option>
            {pricingEntitySchema.fields.find((field) => field.key === "billingPeriod").options.map((period) => <option key={period}>{period}</option>)}
          </select>

          <div className="flex items-center gap-2">
            <span className="text-xs text-primary-black/40 dark:text-primary-white/40 uppercase tracking-widest hidden sm:inline">Sort</span>
            {[{ key: "name", label: "Name" }, { key: "price", label: "Price" }, { key: "duration", label: "Duration" }].map((option) => <button key={option.key} onClick={() => setSortBy(option.key)} className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${sortBy === option.key ? "bg-primary-orange text-white shadow-md shadow-primary-orange/20" : "bg-primary-white/60 dark:bg-primary-dark-card/60 text-primary-black/70 dark:text-primary-white/70 hover:bg-primary-black/5 dark:hover:bg-primary-white/5"}`}>{option.label}</button>)}
          </div>
        </div>
      </div>

      <main className="px-0 md:px-4 lg:px-4 py-2">
        <DashboardProductList products={sortedPlans} schema={pricingEntitySchema} />
      </main>
    </div>
  );
}
