import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Plus } from "lucide-react";
import { toast } from "react-hot-toast";
import { GET_EXPERIENCES } from "../graphql/queries";
import { CREATE_EXPERIENCE, UPDATE_EXPERIENCE, DELETE_EXPERIENCE } from "../graphql/mutations";
import Button from "../components/ui/Button";
import Spinner from "../components/ui/Spinner";
import ExperienceCard from "../components/Experience/ExperienceCard";
import ExperienceModal from "../components/Experience/ExperienceModal";

const DashboardExperiences = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExperience, setEditingExperience] = useState(null);
  
  const { loading, data, refetch } = useQuery(GET_EXPERIENCES);
  const [createExperience] = useMutation(CREATE_EXPERIENCE, {
    refetchQueries: [{ query: GET_EXPERIENCES }]
  });
  const [updateExperience] = useMutation(UPDATE_EXPERIENCE, {
    refetchQueries: [{ query: GET_EXPERIENCES }]
  });
  const [deleteExperience] = useMutation(DELETE_EXPERIENCE, {
    refetchQueries: [{ query: GET_EXPERIENCES }]
  });

  const handleCreate = async (formData) => {
    try {
      await createExperience({ variables: formData });
      toast.success("Expérience ajoutée !");
      setIsModalOpen(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleUpdate = async (formData) => {
    try {
      await updateExperience({
        variables: {
          id: editingExperience.id,
          ...formData
        }
      });
      toast.success("Expérience modifiée !");
      setIsModalOpen(false);
      setEditingExperience(null);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Supprimer cette expérience ?")) {
      try {
        await deleteExperience({ variables: { id } });
        toast.success("Expérience supprimée !");
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const openEditModal = (experience) => {
    setEditingExperience(experience);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingExperience(null);
  };

  if (loading) return <Spinner />;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Mes Expériences</h1>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus size={20} className="inline mr-2" />
          Ajouter une expérience
        </Button>
      </div>

      {data?.getExperiences?.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <p className="text-lg text-gray-600 mb-4">Aucune expérience pour le moment</p>
          <Button onClick={() => setIsModalOpen(true)}>Ajouter votre première expérience</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data?.getExperiences?.map((experience) => (
            <ExperienceCard
              key={experience.id}
              experience={experience}
              onEdit={() => openEditModal(experience)}
              onDelete={() => handleDelete(experience.id)}
            />
          ))}
        </div>
      )}

      <ExperienceModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={editingExperience ? handleUpdate : handleCreate}
        experience={editingExperience}
      />
    </div>
  );
};

export default DashboardExperiences;
