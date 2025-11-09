import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Plus } from "lucide-react";
import { toast } from "react-hot-toast";
import { GET_SKILLS } from "../graphql/queries";
import { CREATE_SKILL, UPDATE_SKILL, DELETE_SKILL } from "../graphql/mutations";
import Button from "../components/ui/Button";
import Spinner from "../components/ui/Spinner";
import SkillBadge from "../components/Skill/SkillBadge";
import SkillModal from "../components/Skill/SkillModal";

const DashboardSkills = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  
  const { loading, data, refetch } = useQuery(GET_SKILLS);
  const [createSkill] = useMutation(CREATE_SKILL);
  const [updateSkill] = useMutation(UPDATE_SKILL);
  const [deleteSkill] = useMutation(DELETE_SKILL);

  const handleCreate = async (formData) => {
    try {
      await createSkill({ variables: formData });
      toast.success("Compétence ajoutée !");
      refetch();
      setIsModalOpen(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleUpdate = async (formData) => {
    try {
      await updateSkill({
        variables: {
          id: editingSkill.id,
          ...formData
        }
      });
      toast.success("Compétence modifiée !");
      refetch();
      setIsModalOpen(false);
      setEditingSkill(null);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Supprimer cette compétence ?")) {
      try {
        await deleteSkill({ variables: { id } });
        toast.success("Compétence supprimée !");
        refetch();
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const openEditModal = (skill) => {
    setEditingSkill(skill);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingSkill(null);
  };

  if (loading) return <Spinner />;

  // Grouper par catégorie
  const groupedSkills = data?.getSkills?.reduce((acc, skill) => {
    const cat = skill.categorie || "Autre";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill);
    return acc;
  }, {});

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Mes Compétences</h1>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus size={20} className="inline mr-2" />
          Ajouter une compétence
        </Button>
      </div>

      {data?.getSkills?.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <p className="text-lg text-gray-600 mb-4">Aucune compétence pour le moment</p>
          <Button onClick={() => setIsModalOpen(true)}>Ajouter votre première compétence</Button>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedSkills || {}).map(([categorie, skills]) => (
            <div key={categorie} className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-gray-800 mb-4">{categorie}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {skills.map((skill) => (
                  <SkillBadge
                    key={skill.id}
                    skill={skill}
                    onEdit={() => openEditModal(skill)}
                    onDelete={() => handleDelete(skill.id)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <SkillModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={editingSkill ? handleUpdate : handleCreate}
        skill={editingSkill}
      />
    </div>
  );
};

export default DashboardSkills;
