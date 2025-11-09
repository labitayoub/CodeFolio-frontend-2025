import { useState, useEffect } from "react";
import Modal from "../ui/Modal";
import Input from "../ui/Input";
import Button from "../ui/Button";

const SkillModal = ({ isOpen, onClose, onSubmit, skill }) => {
  const [formData, setFormData] = useState({
    name: "",
    categorie: ""
  });

  useEffect(() => {
    if (skill) {
      setFormData({
        name: skill.name || "",
        categorie: skill.categorie || ""
      });
    } else {
      setFormData({
        name: "",
        categorie: ""
      });
    }
  }, [skill]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={skill ? "Modifier la compétence" : "Ajouter une compétence"}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Nom de la compétence"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="React, Node.js, Python..."
          required
        />

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Catégorie
          </label>
          <select
            name="categorie"
            value={formData.categorie}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Sélectionner une catégorie</option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="Database">Database</option>
            <option value="DevOps">DevOps</option>
            <option value="Autre">Autre</option>
          </select>
        </div>

        <div className="flex gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onClose} className="flex-1">
            Annuler
          </Button>
          <Button type="submit" className="flex-1">
            {skill ? "Modifier" : "Ajouter"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default SkillModal;
