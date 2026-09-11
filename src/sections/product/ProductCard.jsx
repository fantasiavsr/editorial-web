import { Check, X, Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import ProductFormModal from "./ProductFormModal";
import ProductDeleteDialog from "./ProductDeleteDialog";

export default function ProductCard({ product, onEdit, onDelete }) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleEdit = () => {
    if (onEdit) {
      onEdit(product);
    } else {
      setIsFormOpen(true);
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(product);
    } else {
      setIsDeleteDialogOpen(true);
    }
  };

  const handleFormClose = () => setIsFormOpen(false);
  const handleDeleteClose = () => setIsDeleteDialogOpen(false);

  return (
    <>
      <div className="group block p-6 rounded-2xl border border-primary-black/10 dark:border-primary-white/10 bg-primary-white dark:bg-primary-dark-card hover:border-primary-orange transition-smooth">
        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-12 gap-4 items-center">
          {/* Name */}
          <div className="col-span-4">
            <h4 className="font-bold text-primary-black dark:text-primary-white">
              {product.name}
            </h4>
          </div>

          {/* Type */}
          <div className="col-span-2">
            <span className="text-sm text-primary-black/60 dark:text-primary-white/60">
              {product.type}
            </span>
          </div>

          {/* SKU */}
          <div className="col-span-2">
            <span className="text-sm text-primary-black/60 dark:text-primary-white/60">
              {product.sku || "—"}
            </span>
          </div>

          {/* Price */}
          <div className="col-span-1">
            <span className="font-bold text-primary-orange">
              {product.price}
            </span>
          </div>

          {/* Status */}
          <div className="col-span-1">
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                product.status === "active"
                  ? "bg-primary-sage-strong/20 text-primary-sage-strong"
                  : "bg-primary-black/10 dark:bg-primary-white/10 text-primary-black/60 dark:text-primary-white/60"
              }`}
            >
              {product.status}
            </span>
          </div>

          {/* Available */}
          <div className="col-span-1 flex items-center justify-end">
            <span
              className={`text-sm font-medium ${
                product.available > 0
                  ? "text-primary-black/70 dark:text-primary-white/70"
                  : "text-primary-black/40 dark:text-primary-white/40"
              }`}
            >
              {product.available > 0 ? `${product.available}` : "0"}
            </span>
            {product.available > 0 ? (
              <Check size={16} className="text-primary-orange ml-2" />
            ) : (
              <X
                size={16}
                className="text-primary-black/30 dark:text-primary-white/30 ml-2"
              />
            )}
          </div>

          {/* Actions */}
          <div className="col-span-1 flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={handleEdit}
              className="p-1.5 rounded-lg text-primary-black/60 dark:text-primary-white/60 hover:text-primary-orange hover:bg-primary-black/5 dark:hover:bg-primary-white/5 transition-colors"
              aria-label={`Edit ${product.name}`}
            >
              <Edit size={16} />
            </button>
            <button
              onClick={handleDelete}
              className="p-1.5 rounded-lg text-primary-black/60 dark:text-primary-white/60 hover:text-red-600 hover:bg-red-100/50 dark:hover:bg-red-900/20 transition-colors"
              aria-label={`Delete ${product.name}`}
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        {/* Mobile View */}
        <div className="md:hidden space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-bold text-primary-black dark:text-primary-white">
                {product.name}
              </h4>
              <p className="text-xs text-primary-black/60 dark:text-primary-white/60 mt-1">
                {product.type}
              </p>
              {product.sku && (
                <p className="text-xs text-primary-black/40 dark:text-primary-white/40 mt-1">
                  SKU: {product.sku}
                </p>
              )}
            </div>
            <span className="font-bold text-primary-orange">
              {product.price}
            </span>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                product.status === "active"
                  ? "bg-primary-sage-strong/20 text-primary-sage-strong"
                  : "bg-primary-black/10 dark:bg-primary-white/10 text-primary-black/60 dark:text-primary-white/60"
              }`}
            >
              {product.status}
            </span>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-primary-black/5 dark:border-primary-white/5">
            <div className="flex items-center gap-3">
              <span
                className={`text-sm font-medium ${
                  product.available > 0
                    ? "text-primary-black/70 dark:text-primary-white/70"
                    : "text-primary-black/40 dark:text-primary-white/40"
                }`}
              >
                {product.available > 0 ? `${product.available}` : "0"}
              </span>
              {product.available > 0 ? (
                <Check size={14} className="text-primary-orange" />
              ) : (
                <X
                  size={14}
                  className="text-primary-black/30 dark:text-primary-white/30"
                />
              )}
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={handleEdit}
                className="p-1.5 rounded-lg text-primary-black/60 dark:text-primary-white/60 hover:text-primary-orange transition-colors"
                aria-label={`Edit ${product.name}`}
              >
                <Edit size={16} />
              </button>
              <button
                onClick={handleDelete}
                className="p-1.5 rounded-lg text-primary-black/60 dark:text-primary-white/60 hover:text-red-600 transition-colors"
                aria-label={`Delete ${product.name}`}
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {isFormOpen && (
        <ProductFormModal
          product={product}
          onClose={handleFormClose}
        />
      )}

      {isDeleteDialogOpen && (
        <ProductDeleteDialog
          product={product}
          onClose={handleDeleteClose}
        />
      )}
    </>
  );
}