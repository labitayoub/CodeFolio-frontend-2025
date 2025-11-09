import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import NotFound from "./components/NotFound";
import { ProtectedRoute, PublicRoute } from "./middleware/RouteGuard";
import Dashboard from "./pages/Dashboard";
import DashboardLayout from "./components/layout/DashboardLayout";
import DashboardProjects from "./pages/DashboardProjects";
import DashboardExperiences from "./pages/DashboardExperiences";
import DashboardFormations from "./pages/DashboardFormations";
import DashboardSkills from "./pages/DashboardSkills";
import DashboardDocuments from "./pages/DashboardDocuments";
import DashboardSocial from "./pages/DashboardSocial";
import DashboardProfile from "./pages/DashboardProfile";

const App = () => (
  <BrowserRouter>
    <Routes>
      {/* Routes publiques */}
      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
      {/* Routes dashboard protégées */}
      <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
        <Route index element={<Dashboard />} />
        <Route path="projects" element={<ProtectedRoute><DashboardProjects /></ProtectedRoute>} />
        <Route path="experiences" element={<ProtectedRoute><DashboardExperiences /></ProtectedRoute>} />
        <Route path="formations" element={<ProtectedRoute><DashboardFormations /></ProtectedRoute>} />
        <Route path="skills" element={<ProtectedRoute><DashboardSkills /></ProtectedRoute>} />
        <Route path="documents" element={<ProtectedRoute><DashboardDocuments /></ProtectedRoute>} />
        <Route path="social" element={<ProtectedRoute><DashboardSocial /></ProtectedRoute>} />
        <Route path="profile" element={<ProtectedRoute><DashboardProfile /></ProtectedRoute>} />
      </Route>
      {/* Redirections */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
