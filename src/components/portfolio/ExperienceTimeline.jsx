import { Briefcase } from "lucide-react";
import { formatDate } from "../../utils/dateUtils";

const ExperienceTimeline = ({ experiences }) => {
  if (!experiences || experiences.length === 0) return null;



  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Expériences</h2>
        <div className="space-y-6">
          {experiences.map((exp) => (
            <div key={exp.id} className="flex gap-4 bg-white p-6 rounded-lg shadow-sm">
              <div className="p-3 bg-blue-100 rounded-lg h-fit">
                <Briefcase size={24} className="text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-800">{exp.role}</h3>
                <p className="text-gray-600">{exp.company}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : "Présent"}
                </p>
                {exp.description && (
                  <p className="text-gray-700 mt-3">{exp.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceTimeline;
