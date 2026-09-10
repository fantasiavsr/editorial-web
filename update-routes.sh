#!/bin/bash

# Batch replace onNavigate with navigate in all page files

# NotFound.jsx
sed -i 's/onNavigate={onNavigate}//' src/pages/error/NotFound.jsx
sed -i 's/links={\[{ key: "home", label: "Home" }\]}/links={[{ key: "home", label: "Home", path: "\/" }]}/' src/pages/error/NotFound.jsx
sed -i 's/onNavigate && onNavigate("home")/navigate("\/")/g' src/pages/error/NotFound.jsx

# Unauthorized.jsx
sed -i 's/export default function Unauthorized({ onNavigate })/export default function Unauthorized()/g' src/pages/error/Unauthorized.jsx
sed -i '4a import { useNavigate } from "react-router-dom";' src/pages/error/Unauthorized.jsx
sed -i '/export default function Unauthorized/a \ \ const navigate = useNavigate();' src/pages/error/Unauthorized.jsx
sed -i 's/onNavigate={onNavigate}//' src/pages/error/Unauthorized.jsx
sed -i 's/links={\[{ key: "home", label: "Home" }\]}/links={[{ key: "home", label: "Home", path: "\/" }]}/' src/pages/error/Unauthorized.jsx
sed -i 's/onNavigate && onNavigate("home")/navigate("\/")/g' src/pages/error/Unauthorized.jsx

# ProductPage.jsx
sed -i 's/export default function ProductPage({ onNavigate })/export default function ProductPage()/g' src/pages/product/ProductPage.jsx
sed -i '3a import { useNavigate } from "react-router-dom";' src/pages/product/ProductPage.jsx
sed -i '/export default function ProductPage/a \ \ const navigate = useNavigate();' src/pages/product/ProductPage.jsx
sed -i 's/onNavigate={onNavigate}//' src/pages/product/ProductPage.jsx

# PricingPage.jsx
sed -i 's/export default function PricingPage({ onNavigate })/export default function PricingPage()/g' src/pages/pricing/PricingPage.jsx
sed -i '3a import { useNavigate } from "react-router-dom";' src/pages/pricing/PricingPage.jsx
sed -i '/export default function PricingPage/a \ \ const navigate = useNavigate();' src/pages/pricing/PricingPage.jsx
sed -i 's/onNavigate={onNavigate}//' src/pages/pricing/PricingPage.jsx

# ServicePage.jsx
sed -i 's/export default function ServicePage({ onNavigate })/export default function ServicePage()/g' src/pages/service/ServicePage.jsx
sed -i '3a import { useNavigate } from "react-router-dom";' src/pages/service/ServicePage.jsx
sed -i '/export default function ServicePage/a \ \ const navigate = useNavigate();' src/pages/service/ServicePage.jsx
sed -i 's/onNavigate={onNavigate}//' src/pages/service/ServicePage.jsx

echo "All files updated successfully!"
