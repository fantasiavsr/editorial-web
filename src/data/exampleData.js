// examle data for landing page navigation links
export const NavLinks = [
  { key: "home", label: "Home", path: "/" },
  {
    key: "products",
    label: "Products",
    path: "/products",
    subLinks: [
      { label: "Product Grid", path: "/products#product-grid" },
      { label: "Product List", path: "/products#product-list" },
      { label: "Featured Product", path: "/products#featured-product" },
      { label: "Featured Product + Grid", path: "/products#featured-product-grid" },
      { label: "Bento Product Grid", path: "/products#bento-product-grid" },
      { label: "Product Carousel", path: "/products#product-carousel" },
      { label: "Category Tabs + Grid", path: "/products#category-tabs-grid" },
    ],
  },
  { key: "pricing", label: "Pricing", path: "/pricing" },
  { key: "services", label: "Services", path: "/services" },
  { key: "about", label: "About", path: "/about" },
];