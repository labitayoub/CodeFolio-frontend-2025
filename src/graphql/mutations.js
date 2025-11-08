import { gql } from '@apollo/client';

// Mutation pour se connecter
export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

// Mutation pour s'inscrire
export const REGISTER_MUTATION = gql`
  mutation Register($nom: String!, $prenom: String!, $email: String!, $password: String!, $bio: String) {
    register(nom: $nom, prenom: $prenom, email: $email, password: $password, bio: $bio) {
      id
      nom
      prenom
      email
      bio
    }
  }
`;

// Mutation pour se déconnecter
export const LOGOUT_MUTATION = gql`
  mutation Logout {
    logout {
      success
      message
    }
  }
`;
