import { gql } from '@apollo/client';
export const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    me {
      id
      nom
      prenom
      email
      bio
      createdAt
    }
  }
`;

// Query pour récupérer tous les projets
// Query pour récupérer tous les projets
export const GET_PROJECTS = gql`
  query GetProjects {
    projects {
      id
      titre
      description
      urlGit
      urlDemo
      image
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

// Query pour portfolio public (visiteur)
export const GET_PORTFOLIO_BY_USERNAME = gql`
  query GetPortfolioByUsername($username: String!) {
    getPortfolioByUsername(username: $username) {
      user {
        id
        nom
        prenom
        username
        bio
      }
      projects {
        id
        titre
        description
        urlGit
        urlDemo
        image
      }
      experiences {
        id
        company
        role
        startDate
        endDate
        description
      }
      formations {
        id
        filiere
        ecole
        localisation
        dateDebut
        dateFinal
        description
      }
      skills {
        id
        name
        categorie
      }
      documents {
        _id
        nom
        urlStocket
      }
      social {
        id
        nom
        liensSociaux
        icon
      }
    }
  }
`;
