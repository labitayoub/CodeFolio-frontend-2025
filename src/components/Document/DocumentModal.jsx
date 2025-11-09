import { useState, useEffect } from "react";
import Modal from "../ui/Modal";
import Input from "../ui/Input";
import Button from "../ui/Button";

const DocumentModal = ({ isOpen, onClose, onSubmit, document }) => {
  const [formData, setFormData] = useState({
    nom: "",
    urlStocket: ""
  });

  useEffect(() => {
    if (document) {
      setFormData({
        nom: document.nom || "",
        urlStocket: document.urlStocket || ""
      });
    } else {
      setFormData({
        nom: "",
        urlStocket: ""
      });
    }
  }, [document]);

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
      title={document ? "Modifier le document" : "Ajouter un document"}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Type de document <span className="text-red-500">*</span>
          </label>
          <select
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Sélectionner un type</option>
            <option value="CV">CV</option>
            <option value="Photo de profil">Photo de profil</option>
            <option value="Cover de profil">Cover de profil</option>
          </select>
        </div>

        <Input
          label="URL du document"
          name="urlStocket"
          value={formData.urlStocket}
          onChange={handleChange}
          placeholder="https://example.com/document.pdf"
          required
        />

        <div className="flex gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onClose} className="flex-1">
            Annuler
          </Button>
          <Button type="submit" className="flex-1">
            {document ? "Modifier" : "Ajouter"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default DocumentModal;
