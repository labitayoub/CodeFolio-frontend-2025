import { gql } from '@apollo/client';
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
