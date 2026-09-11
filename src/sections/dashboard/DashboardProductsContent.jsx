import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import DashboardProductList from "../../components/product/DashboardProductList";
import { productEntitySchema } from "../../components/data-management/entitySchemas";
import { MockProducts } from "../../data/exampleData";

export default function DashboardProductsContent() {
  const [products] = useState(MockProducts);

  const [searchTerm, setSearchTerm] = useState("");
  const [productType, setProductType] = useState("");
  const [availability, setAvailability] = useState("");
  const [sortBy, setSortBy] = useState("name");

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType = productType ? product.type === productType : true;
    const matchesAvailability = availability
      ? product.available > 0 === (availability === "In Stock")
      : true;
    return matchesSearch && matchesType && matchesAvailability;
  });

  const sortedProducts = useMemo(() => {
    if (sortBy === "name") {
      return [...filteredProducts].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "price") {
      return [...filteredProducts].sort((a, b) =>
        a.price.localeCompare(b.price, undefined, { numeric: true }),
      );
    } else if (sortBy === "available") {
      return [...filteredProducts].sort((a, b) => b.available - a.available);
    }
    return filteredProducts;
  }, [filteredProducts, sortBy]);

  return (
    <div className="min-h-screen text-primary-black dark:text-primary-white font-sans transition-colors">
      {/* Header */}
      <div className="pt-0 pb-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-primary-black dark:text-primary-white">
              Products
            </h2>
            <p className="text-sm text-primary-black/60 dark:text-primary-white/60 mt-2">
              Manage inventory, pricing, and product details
            </p>
          </div>
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary-orange/10 dark:bg-primary-orange/20 text-primary-orange-strong text-xs font-medium tracking-wide w-fit">
            {sortedProducts.length} items
          </span>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="sticky top-0 z-30 backdrop-blur-sm border-b border-primary-black/10 dark:border-primary-white/10">
        <div className="px-0 py-4 flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
          {/* Search */}
          <div className="relative flex-1 max-w-xl">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-black/40 dark:text-primary-white/40"
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setProductType("");
                setAvailability("");
              }}
              placeholder="Search by name..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-primary-black/10 dark:border-primary-white/10 bg-primary-white dark:bg-primary-dark-card text-sm focus:outline-none focus:border-primary-orange focus:ring-1 focus:ring-primary-orange/20 transition-all"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2 flex-wrap">
            <select
              value={productType}
              onChange={(e) => {
                setProductType(e.target.value);
                setSearchTerm("");
                setAvailability("");
              }}
              className="px-3 py-2.5 rounded-xl border border-primary-black/10 dark:border-primary-white/10 bg-primary-white dark:bg-primary-dark-card text-sm focus:outline-none focus:border-primary-orange transition-all"
            >
              <option value="">All Types</option>
              <option>Electronics</option>
              <option>Accessories</option>
              <option>Appliances</option>
              <option>Furniture</option>
            </select>
            <select
              value={availability}
              onChange={(e) => {
                setAvailability(e.target.value);
                setSearchTerm("");
                setProductType("");
              }}
              className="px-3 py-2.5 rounded-xl border border-primary-black/10 dark:border-primary-white/10 bg-primary-white dark:bg-primary-dark-card text-sm focus:outline-none focus:border-primary-orange transition-all"
            >
              <option value="">All Availability</option>
              <option>In Stock</option>
              <option>Out of Stock</option>
            </select>
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-primary-black/40 dark:text-primary-white/40 uppercase tracking-widest hidden sm:inline">
              Sort
            </span>
            {[
              { key: "name", label: "Name" },
              { key: "price", label: "Price" },
              { key: "available", label: "Stock" },
            ].map((s) => (
              <button
                key={s.key}
                onClick={() => setSortBy(s.key)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  sortBy === s.key
                    ? "bg-primary-orange text-white shadow-md shadow-primary-orange/20"
                    : "bg-primary-white/60 dark:bg-primary-dark-card/60 text-primary-black/70 dark:text-primary-white/70 hover:bg-primary-black/5 dark:hover:bg-primary-white/5"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="px-0 md:px-4 lg:px-4 py-2">
        <DashboardProductList products={sortedProducts} schema={productEntitySchema} />
      </main>
    </div>
  );
}
