import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Dashboard from "./components/Dashboard";
import NotFound from "./components/NotFound";
import { ProtectedRoute, PublicRoute } from "./middleware/RouteGuard";

const App = () => (
  <BrowserRouter>
    <div className="min-h-screen bg-gray-100">
      <Routes>
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </div>
  </BrowserRouter>
);

export default App;
