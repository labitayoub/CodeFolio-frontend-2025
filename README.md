# CodeFolio Frontend

Portfolio personnel avec authentification GraphQL et gestion de projets.

## 🚀 Technologies

- **React 19** - Framework frontend
- **Vite** - Build tool et dev server
- **React Router** - Navigation
- **GraphQL** - API communication
- **Tailwind CSS** - Styling
- **JWT** - Authentication

## 📦 Installation

```bash
npm install
```

## ▶️ Lancement

```bash
npm run dev
```

Le projet sera accessible sur `http://localhost:5173`

## 🔐 Authentification

L'authentification utilise GraphQL avec JWT tokens :
- **Inscription** : `/register`
- **Connexion** : `/login`
- **Page d'accueil** : `/` (protégée)

Les utilisateurs sont enregistrés dans MongoDB via le backend GraphQL.

## 📁 Structure

```
src/
├── components/
│   ├── Auth/          # Login & Register
│   ├── Home.jsx       # Page d'accueil
│   └── Project/       # Gestion des projets
├── graphql/
│   ├── mutations.js   # Mutations GraphQL
│   └── queries.js     # Queries GraphQL
├── utils/
│   ├── auth.js        # Gestion JWT
│   └── errorHandler.js
└── App.jsx            # Routes et configuration
```

## 🛠️ Prochaines étapes

- [ ] Gestion des projets (CRUD)
- [ ] Gestion des compétences
- [ ] Gestion des formations
- [ ] Gestion des expériences
- [ ] Profil utilisateur avec GET_CURRENT_USER

## 📝 Backend

Le backend GraphQL doit être lancé sur `http://localhost:4000`

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
