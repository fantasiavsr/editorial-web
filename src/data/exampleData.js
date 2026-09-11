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

// Mock data for development. Replace with API data later.
export const MockServices = [
  {
    name: "Brand Strategy",
    description: "A focused strategy engagement to clarify your positioning and direction.",
    included: ["Discovery workshop", "Brand positioning", "Strategic roadmap"],
    price: "$2,400",
    billingPeriod: "usage",
    duration: "3-4 weeks",
    members: 2,
  },
  {
    name: "Web Design",
    description: "Thoughtful digital experiences designed around your audience and goals.",
    included: ["UX direction", "Visual design system", "Responsive prototypes"],
    price: "$4,800",
    billingPeriod: "usage",
    duration: "6-8 weeks",
    members: 3,
  },
  {
    name: "Ongoing Support",
    description: "Flexible design support for teams that need an experienced partner on call.",
    included: ["Monthly design hours", "Priority requests", "Design reviews"],
    price: "$1,200",
    billingPeriod: "month",
    duration: "Monthly",
    members: 1,
  },
];

export const MockPricing = [
  {
    name: "Starter",
    description: "A focused plan for individuals and small teams getting started.",
    price: "$29",
    billingPeriod: "month",
    benefits: ["Core features", "Email support", "1 team member"],
    duration: "Monthly",
  },
  {
    name: "Professional",
    description: "Advanced tools for growing teams that need more flexibility.",
    price: "$79",
    billingPeriod: "month",
    benefits: ["All Starter benefits", "Advanced analytics", "Up to 10 members"],
    duration: "Monthly",
  },
  {
    name: "Enterprise",
    description: "A tailored plan with dedicated support for larger organizations.",
    price: "$199",
    billingPeriod: "year",
    benefits: ["Unlimited features", "Priority support", "Dedicated success manager"],
    duration: "Annual",
  },
];

export const MockProducts = [
  {
    name: "Wireless Headphones",
    type: "Electronics",
    price: "$349",
    available: 24,
    status: "active",
    sku: "WH-001",
    description: "Premium wireless headphones with noise cancellation.",
  },
  {
    name: "Leather Backpack",
    type: "Accessories",
    price: "$129",
    available: 0,
    status: "inactive",
    sku: "LB-002",
    description: "Handcrafted leather backpack with laptop sleeve.",
  },
  {
    name: "USB-C Hub",
    type: "Electronics",
    price: "$79",
    available: 156,
    status: "active",
    sku: "UC-003",
    description: "7-in-1 USB-C hub with HDMI and card reader.",
  },
  {
    name: "Coffee Maker",
    type: "Appliances",
    price: "$199",
    available: 8,
    status: "active",
    sku: "CM-004",
    description: "Programmable drip coffee maker with thermal carafe.",
  },
  {
    name: "Desk Lamp",
    type: "Furniture",
    price: "$89",
    available: 42,
    status: "active",
    sku: "DL-005",
    description: "Adjustable LED desk lamp with wireless charging base.",
  },
  {
    name: "Phone Stand",
    type: "Accessories",
    price: "$29",
    available: 203,
    status: "active",
    sku: "PS-006",
    description: "Minimalist aluminum phone stand for desk.",
  },
];