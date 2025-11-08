import { gql } from '@apollo/client';

// Query pour récupérer l'utilisateur connecté
export const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    me {
      id
      name
      email
      createdAt
    }
  }
`;

// Query pour récupérer tous les projets
export const GET_PROJECTS = gql`
  query GetProjects {
    projects {
      id
      title
      description
      technologies
      createdAt
    }
  }
`;

// Query pour récupérer toutes les compétences
export const GET_SKILLS = gql`
  query GetSkills {
    skills {
      id
      name
      level
      category
    }
  }
`;

// Query pour récupérer les expériences
export const GET_EXPERIENCES = gql`
  query GetExperiences {
    experiences {
      id
      title
      company
      description
      startDate
      endDate
    }
  }
`;

// Query pour récupérer les formations
export const GET_FORMATIONS = gql`
  query GetFormations {
    formations {
      id
      title
      institution
      description
      startDate
      endDate
    }
  }
`;
