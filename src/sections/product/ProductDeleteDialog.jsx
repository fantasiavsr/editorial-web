import { X } from "lucide-react";

export default function ProductDeleteDialog({ product, onClose, onDelete }) {
  const handleDelete = async () => {
    try {
      // API call to delete the product
      await fetch(`/api/products/${product.id}`, {
        method: "DELETE",
      });
      if (onDelete) {
        onDelete(product);
      }
      onClose();
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-primary-dark-card rounded-2xl p-6 md:p-8 w-full max-w-md mx-4 shadow-xl">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 rounded-xl bg-red-100 dark:bg-red-900/20">
            <svg
              className="w-6 h-6 text-red-600 dark:text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-8.41-.91a9 9 0 1116.82 0 9 9 0 01-16.82 0z"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-primary-black dark:text-primary-white">
              Delete Product
            </h2>
            <p className="mt-1 text-sm text-primary-black/60 dark:text-primary-white/60">
              Are you sure you want to delete "{product.name}"? This action cannot be undone.
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-primary-black/10 dark:border-primary-white/10">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-primary-black/10 dark:border-primary-white/10 text-primary-black dark:text-primary-white hover:bg-primary-black/5 dark:hover:bg-primary-white/5 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
          >
            Delete Product
          </button>
        </div>
      </div>
    </div>
  );
}
