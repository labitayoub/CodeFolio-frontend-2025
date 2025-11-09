import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Plus } from "lucide-react";
import { toast } from "react-hot-toast";
import { GET_PROJECTS, GET_CURRENT_USER } from "../graphql/queries";
import { CREATE_PROJECT, UPDATE_PROJECT, DELETE_PROJECT } from "../graphql/mutations";
import Button from "../components/ui/Button";
import Spinner from "../components/ui/Spinner";
import ProjectCard from "../components/Projects/ProjectCard";
import ProjectModal from "../components/Projects/ProjectModal";

const DashboardProjects = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  
  const { data: userData } = useQuery(GET_CURRENT_USER);
  const { loading, data, refetch } = useQuery(GET_PROJECTS);
  const [createProject] = useMutation(CREATE_PROJECT);
  const [updateProject] = useMutation(UPDATE_PROJECT);
  const [deleteProject] = useMutation(DELETE_PROJECT);

  const handleCreate = async (formData) => {
    try {
      await createProject({
        variables: {
          ...formData,
          userId: userData?.getProfil?.id
        }
      });
      toast.success("Projet créé !");
      refetch();
      setIsModalOpen(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleUpdate = async (formData) => {
    try {
      await updateProject({
        variables: {
          id: editingProject.id,
          ...formData
        }
      });
      toast.success("Projet modifié !");
      refetch();
      setIsModalOpen(false);
      setEditingProject(null);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Supprimer ce projet ?")) {
      try {
        await deleteProject({ variables: { id } });
        toast.success("Projet supprimé !");
        refetch();
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const openEditModal = (project) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProject(null);
  };

  if (loading) return <Spinner />;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Mes Projets</h1>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus size={20} className="inline mr-2" />
          Ajouter un projet
        </Button>
      </div>

      {data?.projects?.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <p className="text-lg text-gray-600 mb-4">Aucun projet pour le moment</p>
          <Button onClick={() => setIsModalOpen(true)}>Créer votre premier projet</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.projects?.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onEdit={() => openEditModal(project)}
              onDelete={() => handleDelete(project.id)}
            />
          ))}
        </div>
      )}

      <ProjectModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={editingProject ? handleUpdate : handleCreate}
        project={editingProject}
      />
    </div>
  );
};

export default DashboardProjects;
