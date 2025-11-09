import { Edit, Trash2 } from "lucide-react";

const SkillBadge = ({ skill, onEdit, onDelete }) => {
  const colors = {
    Frontend: "bg-blue-100 text-blue-800 border-blue-300",
    Backend: "bg-green-100 text-green-800 border-green-300",
    Database: "bg-purple-100 text-purple-800 border-purple-300",
    DevOps: "bg-orange-100 text-orange-800 border-orange-300",
    Autre: "bg-gray-100 text-gray-800 border-gray-300"
  };

  const colorClass = colors[skill.categorie] || colors.Autre;

  return (
    <div className={`flex items-center justify-between px-4 py-3 rounded-lg border-2 ${colorClass}`}>
      <div>
        <p className="font-semibold">{skill.name}</p>
        <p className="text-xs opacity-75">{skill.categorie || "Non catégorisé"}</p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={onEdit}
          className="p-1 hover:bg-white/50 rounded transition"
        >
          <Edit size={16} />
        </button>
        <button
          onClick={onDelete}
          className="p-1 hover:bg-white/50 rounded transition"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default SkillBadge;
