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
import Portfolio from "./pages/Portfolio";
import Home from "./pages/Home";

const App = () => (
  <BrowserRouter> {/*Fournit le contexte de routing*/}
    <Routes> {/*Sélectionne la route matchant l'URL*/}
    
      {/* Routes publiques */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
      
      {/* Routes dashboard protégées */}
      <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
        <Route index element={<Dashboard />} />
        <Route path="projects" element={<DashboardProjects />} />
        <Route path="experiences" element={<DashboardExperiences />} />
        <Route path="formations" element={<DashboardFormations />} />
        <Route path="skills" element={<DashboardSkills />} />
        <Route path="documents" element={<DashboardDocuments />} />
        <Route path="social" element={<DashboardSocial />} />
        <Route path="profile" element={<DashboardProfile />} />
      </Route>

      {/* Route portfolio public */}
      <Route path="/:username" element={<Portfolio />} />
      
      {/* Redirections */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
