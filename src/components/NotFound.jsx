import { FiHome, FiArrowLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">Page non trouvée</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 border border-gray-300 text-gray-600 px-6 py-3 rounded-full text-sm font-normal hover:border-gray-400 hover:text-gray-700 transition-all duration-300"
          >
            <FiArrowLeft className="text-lg" />
            Go Back
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center justify-center gap-2 bg-gray-800 text-white px-6 py-3 rounded-full text-sm font-normal hover:bg-gray-700 transition-all duration-300"
          >
            <FiHome className="text-lg" />
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;