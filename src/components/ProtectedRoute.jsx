import { Navigate } from "react-router-dom";

// Mock authentication check - replace with your actual auth logic
const isAuthenticated = () => {
  // Check if user is logged in (e.g., check localStorage, context, etc.)
  return localStorage.getItem("isAuthenticated") === "true";
};

export default function ProtectedRoute({ children }) {
  if (!isAuthenticated()) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  return children;
}
