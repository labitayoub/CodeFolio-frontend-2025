import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

export const ProtectedRoute = ({ children }) => (
  isAuthenticated() ? children : <Navigate to="/login" replace />
);

export const PublicRoute = ({ children }) => (
  !isAuthenticated() ? children : <Navigate to="/dashboard" replace />
);
