import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PORTFOLIO_BY_USERNAME } from "../graphql/queries";
import Spinner from "../components/ui/Spinner";
import PortfolioHeader from "../components/portfolio/PortfolioHeader";
import ProjectsSection from "../components/portfolio/ProjectsSection";
import ExperienceTimeline from "../components/portfolio/ExperienceTimeline";
import FormationsSection from "../components/portfolio/FormationsSection";
import SkillsSection from "../components/portfolio/SkillsSection";
import SocialLinks from "../components/portfolio/SocialLinks";

const Portfolio = () => {
  const { username } = useParams();
  const { loading, error, data } = useQuery(GET_PORTFOLIO_BY_USERNAME, {
    variables: { username }
  });

  if (loading) return <Spinner />;
  
  if (error || !data?.getPortfolioByUsername) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Portfolio non trouvé</h1>
          <p className="text-gray-600">L'utilisateur @{username} n'existe pas.</p>
        </div>
      </div>
    );
  }

  const { user, projects, experiences, formations, skills, documents, social } = data.getPortfolioByUsername;

  return (
    <div className="min-h-screen bg-gray-50">
      <PortfolioHeader user={user} documents={documents} />
      <ProjectsSection projects={projects} />
      <ExperienceTimeline experiences={experiences} />
      <FormationsSection formations={formations} />
      <SkillsSection skills={skills} />
      <SocialLinks social={social} />
      
      <footer className="bg-gray-800 text-white py-8 text-center">
        <p>© 2025 {user.prenom} {user.nom} - Portfolio</p>
      </footer>
    </div>
  );
};

export default Portfolio;
