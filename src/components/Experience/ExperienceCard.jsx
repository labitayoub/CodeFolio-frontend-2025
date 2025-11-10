import { Edit, Trash2, Briefcase } from "lucide-react";
import Button from "../ui/Button";
import Card from "../ui/Card";
import { formatDate } from "../../utils/dateUtils";

const ExperienceCard = ({ experience, onEdit, onDelete }) => {
  return (
    <Card>
      <div className="flex items-start gap-3 mb-3">
        <div className="p-2 bg-blue-100 rounded-lg">
          <Briefcase size={20} className="text-blue-600" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-800">{experience.role}</h3>
          <p className="text-gray-600">{experience.company}</p>
          <p className="text-sm text-gray-500">
            {formatDate(experience.startDate)} - {experience.endDate ? formatDate(experience.endDate) : "Présent"}
          </p>
        </div>
      </div>
      
      {experience.description && (
        <p className="text-gray-600 mb-4 text-sm">{experience.description}</p>
      )}
      
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

export default ExperienceCard;
