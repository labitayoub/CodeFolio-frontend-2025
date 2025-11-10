import { GraduationCap } from "lucide-react";
import { formatDate } from "../../utils/dateUtils";

const FormationsSection = ({ formations }) => {
  if (!formations || formations.length === 0) return null;



  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Formations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {formations.map((formation) => (
            <div key={formation.id} className="flex gap-4 bg-gray-50 p-6 rounded-lg">
              <div className="p-3 bg-purple-100 rounded-lg h-fit">
                <GraduationCap size={24} className="text-purple-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-800">{formation.filiere}</h3>
                <p className="text-gray-600">{formation.ecole}</p>
                <p className="text-sm text-gray-500">{formation.localisation}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {formatDate(formation.dateDebut)} - {formatDate(formation.dateFinal)}
                </p>
                {formation.description && (
                  <p className="text-gray-700 mt-3">{formation.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FormationsSection;
