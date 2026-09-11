import { useState, useMemo } from "react";
import ProductCard from "./ProductCard";
import { Check, X } from "lucide-react";

export default function DashboardProductList({ products }) {
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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setProductType("");
    setAvailability("");
  };

  const handleTypeChange = (e) => {
    setProductType(e.target.value);
    setSearchTerm("");
    setAvailability("");
  };

  const handleAvailabilityChange = (e) => {
    setAvailability(e.target.value);
    setSearchTerm("");
    setProductType("");
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <section className="mx-auto md:max-w-7xl">
      <div className="mb-8">
        <h3 className="text-xs uppercase tracking-[0.2em] text-primary-black/50 dark:text-primary-white/50 mb-2">
          Product List
        </h3>
        <p className="text-sm text-primary-black/60 dark:text-primary-white/60">
          Example: Inventory view — full-width rows with product details.
        </p>
      </div>

      {/* Table Header */}
      <div className="hidden md:grid md:grid-cols-12 gap-4 px-6 py-4 text-xs uppercase tracking-widest text-primary-black/50 dark:text-primary-white/50 border-b border-primary-black/10 dark:border-primary-white/10 mb-2">
        <div className="col-span-4">Name</div>
        <div className="col-span-3">Type</div>
        <div className="col-span-2">Price</div>
        <div className="col-span-3">Available</div>
      </div>

      {/* Product Rows */}
      <div className="space-y-2">
        {sortedProducts.map((product) => (
          <ProductCard
            key={product.name}
            product={product}
          />
        ))}
      </div>
    </section>
  );
}
