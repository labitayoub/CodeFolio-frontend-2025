import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { removeToken } from "../utils/auth";

const Dashboard = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    removeToken();
    toast.success("Déconnexion réussie !");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-gray-800">CodeFolio</h1>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </nav>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Bienvenue sur votre Portfolio ! 🎉
          </h2>
          <div className="bg-green-50 border border-green-200 p-4 rounded mb-4">
            <p className="text-green-800 font-semibold">✅ Authentification réussie !</p>
            <p className="text-green-700 text-sm mt-2">
              Les utilisateurs sont bien enregistrés dans MongoDB.
            </p>
          </div>
          <p className="text-gray-600">
            Prochaines étapes : Ajouter la gestion des projets, compétences, formations et expériences.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
