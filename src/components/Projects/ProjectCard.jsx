import { Edit, Trash2, ExternalLink, Github } from "lucide-react";
import Button from "../ui/Button";
import Card from "../ui/Card";

const ProjectCard = ({ project, onEdit, onDelete }) => {
  return (
    <Card>
      {project.image && (
        <img
          src={project.image}
          alt={project.titre}
          className="w-full h-48 object-cover rounded-t-lg -mt-6 -mx-6 mb-4"
        />
      )}
      
      <h3 className="text-xl font-bold text-gray-800 mb-2">{project.titre}</h3>
      <p className="text-gray-600 mb-4 line-clamp-3">{project.description}</p>
      
      <div className="flex gap-2 mb-4">
        {project.urlGit && (
          <a
            href={project.urlGit}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
          >
            <Github size={16} />
            GitHub
          </a>
        )}
        {project.urlDemo && (
          <a
            href={project.urlDemo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm text-green-600 hover:underline"
          >
            <ExternalLink size={16} />
            Demo
          </a>
        )}
      </div>
      
      <div className="flex gap-2">
        <Button variant="outline" onClick={onEdit} className="flex-1">
          <Edit size={16} className="inline mr-1" />
          Modifier
        </Button>
        <Button variant="danger" onClick={onDelete} className="flex-1">
          <Trash2 size={16} className="inline mr-1" />
          Supprimer
        </Button>
      </div>
    </Card>
  );
};

export default ProjectCard;
