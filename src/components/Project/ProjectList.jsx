import { useQuery, useMutation } from '@apollo/client';
import { GET_PROJECTS } from '../../graphql/queries';
import { useState } from 'react';
import { gql } from '@apollo/client';

// Exemple de mutation pour créer un projet
const CREATE_PROJECT = gql`
  mutation CreateProject($title: String!, $description: String!, $technologies: [String!]) {
    createProject(title: $title, description: $description, technologies: $technologies) {
      id
      title
      description
      technologies
      createdAt
    }
  }
`;

const ProjectList = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: ''
  });

  // Query pour récupérer les projets
  const { loading, error, data, refetch } = useQuery(GET_PROJECTS);

  // Mutation pour créer un projet
  const [createProject, { loading: creating }] = useMutation(CREATE_PROJECT, {
    onCompleted: () => {
      setFormData({ title: '', description: '', technologies: '' });
      setShowForm(false);
      refetch(); // Rafraîchir la liste
    },
    onError: (error) => {
      alert('Erreur : ' + error.message);
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const technologiesArray = formData.technologies
      .split(',')
      .map(tech => tech.trim())
      .filter(tech => tech !== '');

    await createProject({
      variables: {
        title: formData.title,
        description: formData.description,
        technologies: technologiesArray
      }
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        Erreur lors du chargement des projets : {error.message}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Mes Projets</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          {showForm ? 'Annuler' : '+ Nouveau Projet'}
        </button>
      </div>

      {/* Formulaire de création */}
      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-xl font-semibold mb-4">Créer un nouveau projet</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Titre du projet
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                disabled={creating}
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
                required
                disabled={creating}
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Technologies (séparées par des virgules)
              </label>
              <input
                type="text"
                value={formData.technologies}
                onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="React, Node.js, MongoDB"
                disabled={creating}
              />
            </div>

            <button
              type="submit"
              disabled={creating}
              className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors disabled:opacity-50"
            >
              {creating ? 'Création...' : 'Créer le projet'}
            </button>
          </form>
        </div>
      )}

      {/* Liste des projets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.projects?.length === 0 ? (
          <div className="col-span-full text-center py-12 text-gray-500">
            Aucun projet pour le moment. Créez-en un !
          </div>
        ) : (
          data?.projects?.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {project.title}
              </h3>
              <p className="text-gray-600 mb-4">{project.description}</p>
              
              {project.technologies && project.technologies.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              <p className="text-sm text-gray-500">
                Créé le {new Date(parseInt(project.createdAt)).toLocaleDateString('fr-FR')}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProjectList;
