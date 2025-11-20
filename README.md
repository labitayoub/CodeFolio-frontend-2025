# CodeFolio Frontend

CodeFolio est une application de **portfolio personnel** avec :

- Une **authentification sécurisée** (GraphQL + JWT)
- Un **dashboard privé** pour gérer tout ton contenu (projets, compétences, expériences, formations, documents, réseaux sociaux, profil)
- Un **portfolio public dynamique** accessible via `/:username` pour les visiteurs

Ce dépôt contient **le frontend** de l’application, construit avec **React 19** et **Vite**, qui consomme un backend GraphQL.

---

## 🚀 Fonctionnalités

### 🔐 Authentification & sécurité

- Inscription et connexion via **GraphQL** avec **tokens JWT**
- Stockage du token dans `localStorage`
- Injection automatique du token dans chaque requête GraphQL via **Apollo Client**
- Routes protégées :
	- Accès au dashboard uniquement si l’utilisateur est authentifié (`ProtectedRoute`)
	- Redirection des utilisateurs déjà loggés hors des pages `/login` et `/register` (`PublicRoute`)

**Routes principales :**

- `/login` – Page de connexion
- `/register` – Page d’inscription
- `/` – Page d’accueil (publique)
- `/dashboard/*` – Zone privée (protégée)
- `/:username` – Portfolio public d’un utilisateur

---

### 🧭 Navigation & pages principales

L’architecture des routes est définie dans `src/App.jsx` via **React Router DOM**.

- `/` → `Home.jsx` – page d’accueil publique
- Auth : `/login` → `Login.jsx`, `/register` → `Register.jsx`
- Dashboard (zone authentifiée – layout commun `DashboardLayout.jsx`) :
	- `/dashboard` → `Dashboard.jsx`
	- `/dashboard/projects` → `DashboardProjects.jsx`
	- `/dashboard/experiences` → `DashboardExperiences.jsx`
	- `/dashboard/formations` → `DashboardFormations.jsx`
	- `/dashboard/skills` → `DashboardSkills.jsx`
	- `/dashboard/documents` → `DashboardDocuments.jsx`
	- `/dashboard/social` → `DashboardSocial.jsx`
	- `/dashboard/profile` → `DashboardProfile.jsx`
- Portfolio public : `/:username` → `Portfolio.jsx`
- Fallback : `*` → `NotFound.jsx`

---

### 📊 Dashboard : gestion complète du portfolio

Chaque section du dashboard suit un pattern commun :

- Un **écran de liste** (cards, timeline…)
- Des **modales de création / édition** (formulaires)
- Des **requêtes/mutations GraphQL** pour synchroniser les données avec l’API

#### Projets

- Page : `DashboardProjects.jsx`
- Composants : `ProjectCard.jsx`, `ProjectModal.jsx`
- Query : `GET_PROJECTS` (`src/graphql/queries.js`)
- Fonctionnalités : lister, créer, modifier, supprimer un projet (CRUD complet)

#### Compétences

- Page : `DashboardSkills.jsx`
- Composants : `SkillBadge.jsx`, `SkillModal.jsx`
- Query : `GET_SKILLS` (`getCompetences`)
- Fonctionnalités : lister, créer, modifier, supprimer une compétence

#### Expériences

- Page : `DashboardExperiences.jsx`
- Composants : `ExperienceCard.jsx`, `ExperienceModal.jsx`
- Query : `GET_EXPERIENCES`
- Fonctionnalités : lister, créer, modifier, supprimer une expérience

#### Formations

- Page : `DashboardFormations.jsx`
- Composants : `FormationCard.jsx`, `FormationModal.jsx`
- Query : `GET_FORMATIONS`
- Fonctionnalités : lister, créer, modifier, supprimer une formation

#### Documents

- Page : `DashboardDocuments.jsx`
- Composants : `DocumentCard.jsx`, `DocumentModal.jsx`
- Query : `GET_DOCUMENTS`
- Fonctionnalités : lister, uploader/ajouter, supprimer des documents (CV, PDFs…)

#### Réseaux sociaux

- Page : `DashboardSocial.jsx`
- Composants : `SocialCard.jsx`, `SocialModal.jsx`, `SocialIcon.jsx`
- Query : `GET_SOCIAL` (`resieauxSociauxs`)
- Fonctionnalités : lister, créer, modifier, supprimer des liens sociaux

#### Profil utilisateur

- Page : `DashboardProfile.jsx`
- Query : `GET_CURRENT_USER` (`getProfil`)
- Champs : `id, nom, prenom, username, email, bio`
- Fonctionnalités : afficher et mettre à jour les informations du profil

---

### 🌍 Portfolio public dynamique

- Route : `/:username`
- Page : `Portfolio.jsx`
- Composants (`src/components/portfolio/`) :
	- `PortfolioHeader.jsx`
	- `ProjectsSection.jsx`
	- `ExperienceTimeline.jsx`
	- `FormationsSection.jsx`
	- `SkillsSection.jsx`
	- `SocialLinks.jsx`

Query utilisée : `GET_PORTFOLIO_BY_USERNAME` dans `src/graphql/queries.js`.

**Comportement :**

- Le visiteur va sur `https://ton-site.com/ton-username`
- Le frontend récupère toutes les données du portfolio en une requête GraphQL
- Le portfolio se met automatiquement à jour dès que tu modifies tes données dans le dashboard

---

## 🧩 Architecture & code technique

### 📁 Structure principale

```bash
src/
├── App.jsx               # Définition des routes
├── main.jsx              # Entrée React + Apollo Provider
├── apollo/
│   └── client.js         # Configuration Apollo Client (HTTP + auth link)
├── graphql/
│   ├── queries.js        # Requêtes GraphQL (GET_*)
│   └── mutations.js      # Mutations GraphQL (CREATE/UPDATE/DELETE)
├── middleware/
│   └── RouteGuard.jsx    # ProtectedRoute / PublicRoute
├── components/
│   ├── Auth/             # Login / Register
│   ├── layout/           # DashboardLayout, Sidebar
│   ├── portfolio/        # Composants du portfolio public
│   ├── Projects/         # ProjectCard / ProjectModal
│   ├── Skill/            # SkillBadge / SkillModal
│   ├── Experience/       # ExperienceCard / ExperienceModal
│   ├── Formation/        # FormationCard / FormationModal
│   ├── Document/         # DocumentCard / DocumentModal
│   ├── Social/           # SocialCard / SocialModal / SocialIcon
│   ├── ui/               # Button, Card, Input, Modal, Spinner, etc.
│   └── NotFound.jsx
├── pages/
│   ├── Home.jsx
│   ├── Portfolio.jsx
│   ├── Dashboard.jsx
│   ├── DashboardProjects.jsx
│   ├── DashboardExperiences.jsx
│   ├── DashboardFormations.jsx
│   ├── DashboardSkills.jsx
│   ├── DashboardDocuments.jsx
│   ├── DashboardSocial.jsx
│   └── DashboardProfile.jsx
└── utils/
		├── auth.js           # Gestion du JWT côté frontend
		├── dateUtils.js      # Formatage des dates
		└── errorHandler.js   # Gestion centralisée des erreurs
```

---

## 🧪 Stack technique détaillée

### Frontend

- **React 19** – bibliothèque principale pour la construction de l’interface
- **React DOM** – intégration avec le DOM du navigateur
- **Vite** – dev server rapide et build optimisé
	- `npm run dev` → serveur de dev
	- `npm run build` → build production
	- `npm run preview` → prévisualisation du build

### Routing

- **react-router-dom v7**
	- `BrowserRouter`, `Routes`, `Route`, `Navigate`
	- Gestion des routes publiques / privées
	- `RouteGuard.jsx` gère les redirections en fonction de l’authentification

### Données & GraphQL

- **graphql** – librairie core GraphQL
- **@apollo/client** – client GraphQL côté frontend :
	- `ApolloClient`, `InMemoryCache`, `HttpLink`
	- `setContext` pour injecter le header `Authorization: Bearer <token>`
	- Hooks comme `useQuery`, `useMutation` utilisés dans les pages et composants

### Authentification

- **JWT** – token envoyé par le backend et stocké dans `localStorage`
- Gestion utilitaire dans `src/utils/auth.js`
- Apollo Client ajoute le token dans chaque requête GraphQL via un `authLink`

### UI / Design

- **Tailwind CSS v4** + `@tailwindcss/vite` – styling avec classes utilitaires
- Composants UI custom dans `src/components/ui/` :
	- `Button`, `Card`, `Input`, `Modal`, `Spinner`, `SocialIcon`, etc.
- **react-icons** et **lucide-react** pour les icônes

### Formulaires & UX

- **react-hook-form** – gestion des formulaires (valeurs, validation, erreurs)
- **react-hot-toast** – notifications de succès/erreur (login, CRUD, etc.)

### Qualité & tooling

- **ESLint 9** avec : `@eslint/js`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`, `globals`
- Script : `npm run lint` pour analyser la qualité du code

---

## 🧾 Extraits de code clés

Voici quelques extraits directement issus du projet pour illustrer l’architecture et l’intégration technique.

### 1) Apollo Client (auth + endpoint GraphQL)

Fichier : `src/apollo/client.js`

```javascript
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// Lien HTTP vers votre backend GraphQL
const httpLink = new HttpLink({
		uri: 'http://localhost:4000/graphql',
});

// Ajouter le token JWT à chaque requête
const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem('token');
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : "",
		}
	};
});

const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});

export default client;
```

### 2) Bootstrap de l’app (Provider + Toaster)

Fichier : `src/main.jsx`

```javascript
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ApolloProvider } from '@apollo/client'
import { Toaster } from 'react-hot-toast'
import client from './apollo/client'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<ApolloProvider client={client}>
			<Toaster position="top-right" toastOptions={{ duration: 3000, style: { background: '#333', color: '#fff' } }} />
			<App />
		</ApolloProvider>
	</StrictMode>,
)
```

### 3) Routage et zones protégées

Fichiers : `src/App.jsx` et `src/middleware/RouteGuard.jsx`

```javascript
// RouteGuard.jsx
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

export const ProtectedRoute = ({ children }) => (
	isAuthenticated() ? children : <Navigate to="/login" replace />
);

export const PublicRoute = ({ children }) => (   
	!isAuthenticated() ? children : <Navigate to="/dashboard" replace />
);
```

```javascript
// App.jsx (extrait)
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute, PublicRoute } from "./middleware/RouteGuard";
import DashboardLayout from "./components/layout/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import DashboardProjects from "./pages/DashboardProjects";
// ... autres imports

const App = () => (
	<BrowserRouter>
		<Routes>
			<Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
			<Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
			<Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
				<Route index element={<Dashboard />} />
				<Route path="projects" element={<DashboardProjects />} />
				{/* autres sous-routes */}
			</Route>
			<Route path=":" username element={<Portfolio />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	</BrowserRouter>
);
```

### 4) Exemple de query GraphQL (portfolio public)

Fichier : `src/graphql/queries.js`

```javascript
import { gql } from '@apollo/client';

export const GET_PORTFOLIO_BY_USERNAME = gql`
	query GetPortfolioByUsername($username: String!) {
		getPortfolioByUsername(username: $username) {
			user { id nom prenom username bio }
			projects { id titre description urlGit urlDemo image }
			experiences { id company role startDate endDate description }
			formations { id filiere ecole localisation dateDebut dateFinal description }
			skills { id name categorie }
			documents { _id nom urlStocket }
			social { id nom liensSociaux icon }
		}
	}
`;
```

### 5) Exemple d’écran CRUD (projets)

Fichier : `src/pages/DashboardProjects.jsx` (extrait)

```javascript
import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_PROJECTS, GET_CURRENT_USER } from "../graphql/queries";
import { CREATE_PROJECT, UPDATE_PROJECT, DELETE_PROJECT } from "../graphql/mutations";

const DashboardProjects = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editingProject, setEditingProject] = useState(null);

	const { data: userData } = useQuery(GET_CURRENT_USER);
	const { loading, data, refetch } = useQuery(GET_PROJECTS);
	const [createProject] = useMutation(CREATE_PROJECT);
	const [updateProject] = useMutation(UPDATE_PROJECT);
	const [deleteProject] = useMutation(DELETE_PROJECT);

	const handleCreate = async (formData) => {
		await createProject({ variables: { ...formData, userId: userData?.getProfil?.id } });
		refetch();
		setIsModalOpen(false);
	};

	// handleUpdate, handleDelete ...
};
```

### 6) Layout du dashboard et déconnexion

Fichier : `src/components/layout/DashboardLayout.jsx` (extrait)

```javascript
import { Outlet, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { toast } from "react-hot-toast";
import { removeToken } from "../../utils/auth";

const DashboardLayout = () => {
	const navigate = useNavigate();
	const handleLogout = () => {
		removeToken();
		toast.success("Déconnexion réussie !");
		navigate("/login");
	};
	return (
		<div className="flex min-h-screen bg-gray-50">
			{/* Sidebar + Header + <Outlet /> */}
			<button onClick={handleLogout}>
				<LogOut /> Déconnexion
			</button>
		</div>
	);
};
```

## ⚙️ Installation & lancement

### Prérequis

- Node.js (>= 18 recommandé)
- Backend GraphQL lancé sur `http://localhost:4000` (endpoint `/graphql`)

### Installation

```bash
npm install
```

### Lancement du frontend

```bash
npm run dev
```

L’application sera accessible sur :

```bash
http://localhost:5173
```

### Lint

```bash
npm run lint
```

---

## 📝 Backend

Le backend GraphQL **n’est pas inclus** dans ce repo. Il doit exposer au minimum les opérations suivantes (noms utilisés côté frontend) :

- `getProfil`
- `projects`, `formations`, `getCompetences`, `getExperiences`, `documents`, `resieauxSociauxs`
- `getPortfolioByUsername(username: String!)`
- Mutations associées aux opérations CRUD (projets, skills, expériences, formations, documents, social, profil, auth…)

Endpoint attendu :

```text
http://localhost:4000/graphql
```

---

## ✅ Roadmap / prochaines étapes

- [x] Authentification GraphQL + JWT
- [x] Dashboard complet (projets, compétences, expériences, formations, documents, réseaux sociaux, profil)
- [x] Portfolio public par username
- [ ] Améliorer le design UI/UX (animations, thèmes, responsive avancé)
- [ ] Gestion avancée des erreurs et des états de chargement
- [ ] Tests unitaires et end-to-end
- [ ] Internationalisation (FR / EN)

