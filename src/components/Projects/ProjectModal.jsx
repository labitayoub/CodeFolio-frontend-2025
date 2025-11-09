import { useState, useEffect } from "react";
import Modal from "../ui/Modal";
import Input from "../ui/Input";
import Button from "../ui/Button";

const ProjectModal = ({ isOpen, onClose, onSubmit, project }) => {
  const [formData, setFormData] = useState({
    titre: "",
    description: "",
    urlGit: "",
    urlDemo: "",
    image: ""
  });

  useEffect(() => {
    if (project) {
      setFormData({
        titre: project.titre || "",
        description: project.description || "",
        urlGit: project.urlGit || "",
        urlDemo: project.urlDemo || "",
        image: project.image || ""
      });
    } else {
      setFormData({
        titre: "",
        description: "",
        urlGit: "",
        urlDemo: "",
        image: ""
      });
    }
  }, [project]);

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
      title={project ? "Modifier le projet" : "Créer un projet"}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Titre"
          name="titre"
          value={formData.titre}
          onChange={handleChange}
          placeholder="Mon super projet"
          required
        />

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Description du projet..."
            rows="4"
            required
          />
        </div>

        <Input
          label="URL GitHub"
          name="urlGit"
          value={formData.urlGit}
          onChange={handleChange}
          placeholder="https://github.com/username/repo"
          required
        />

        <Input
          label="URL Demo"
          name="urlDemo"
          value={formData.urlDemo}
          onChange={handleChange}
          placeholder="https://demo.com"
        />

        <Input
          label="URL Image"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="https://example.com/image.jpg"
        />

        <div className="flex gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onClose} className="flex-1">
            Annuler
          </Button>
          <Button type="submit" className="flex-1">
            {project ? "Modifier" : "Créer"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ProjectModal;
