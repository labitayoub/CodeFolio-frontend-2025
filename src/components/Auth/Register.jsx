import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { toast } from 'react-hot-toast';
import { REGISTER_MUTATION } from '../../graphql/mutations';

const Register = () => {
  const [formData, setFormData] = useState({ 
    nom: '', 
    prenom: '',
    username: '', 
    email: '', 
    password: '', 
    bio: '' 
  });
  const navigate = useNavigate();

  // Utiliser Apollo Client useMutation
  const [register, { loading }] = useMutation(REGISTER_MUTATION, {
    onCompleted: () => {
      toast.success('Inscription réussie ! Redirection...');
      setTimeout(() => navigate('/login'), 2000);
    },
    onError: (err) => {
      const errorMessage = err.message;
      
      // Gestion de l'erreur d'email déjà existant
      if (errorMessage.includes('E11000') || errorMessage.includes('duplicate') || errorMessage.includes('déjà utilisé')) {
        toast.error('Cet email est déjà utilisé. Veuillez utiliser un autre email ou vous connecter.');
      } else {
        toast.error(errorMessage);
      }
    }
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Appel de la mutation avec les variables
    register({
      variables: {
        ...formData,
    username: formData.username.toLowerCase().trim(),
    email: formData.email.toLowerCase().trim()
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Inscription
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Nom *
            </label>
            <input
              type="text"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Votre nom"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Prénom *
            </label>
            <input
              type="text"
              name="prenom"
              value={formData.prenom}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Votre prénom"
              required
              disabled={loading}
            />
          </div>
<div>
  <label className="block text-gray-700 text-sm font-bold mb-2">
    Nom d'utilisateur *
  </label>
  <input
    type="text"
    name="username"
    value={formData.username}
    onChange={handleChange}
    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    placeholder="johndoe"
    required
    disabled={loading}
  />
  <p className="text-xs text-gray-500 mt-1">
    Votre portfolio sera accessible sur : /{formData.username || 'username'}
  </p>
</div>


          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="exemple@email.com"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Mot de passe *
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Bio (optionnel)
            </label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Parlez-nous de vous..."
              rows="3"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors disabled:opacity-50"
          >
            {loading ? 'Inscription...' : 'S\'inscrire'}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600 text-sm">
          Déjà un compte ?{' '}
          <a href="/login" className="text-blue-500 hover:underline">
            Se connecter
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
