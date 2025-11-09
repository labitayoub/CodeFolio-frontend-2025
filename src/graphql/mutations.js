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
      username
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
// Projects
export const CREATE_PROJECT = gql`
  mutation CreateProject($titre: String!, $description: String!, $urlGit: String!, $urlDemo: String!, $image: String!, $userId: ID!) {
    createProject(titre: $titre, description: $description, urlGit: $urlGit, urlDemo: $urlDemo, image: $image, userId: $userId) {
      id
      titre
      description
      urlGit
      urlDemo
      image
    }
  }
`;

export const UPDATE_PROJECT = gql`
  mutation UpdateProject($id: ID!, $titre: String, $description: String, $urlGit: String, $urlDemo: String, $image: String) {
    updateProject(id: $id, titre: $titre, description: $description, urlGit: $urlGit, urlDemo: $urlDemo, image: $image) {
      id
      titre
      description
      urlGit
      urlDemo
      image
    }
  }
`;

export const DELETE_PROJECT = gql`
  mutation DeleteProject($id: ID!) {
    deleteProject(id: $id) {
      id
    }
  }
`;
