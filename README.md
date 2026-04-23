# Application de gestion de profils - Projet MERN

## Description

Ce projet est une application web de gestion de profils réalisée avec le stack **MERN** :

- **MongoDB** pour la base de données
- **Express.js** pour le backend
- **React** pour le frontend
- **Node.js** pour l’exécution côté serveur

L’application permet :

- de créer un utilisateur
- de se connecter
- de consulter son profil
- de modifier son profil
- de générer un mot de passe aléatoire selon une longueur choisie
- d’afficher tous les utilisateurs pour un administrateur
- de supprimer un utilisateur pour un administrateur
- d’afficher une documentation des routes API

---

## Fonctionnalités principales

### Côté utilisateur
- inscription
- connexion
- consultation de son propre profil
- modification de son propre profil
- génération de mot de passe

### Côté administrateur
- accès à toutes les fonctionnalités utilisateur
- consultation de tous les profils
- suppression d’un utilisateur
- accès à toutes les routes documentées

### Sécurité
- mots de passe chiffrés avec `bcrypt`
- authentification par token JWT
- contrôle d’accès selon le rôle
- routes protégées côté backend

---

## Technologies utilisées

### Backend
- Node.js
- Express.js
- Mongoose
- MongoDB Atlas
- bcrypt
- jsonwebtoken
- dotenv
- cors

### Frontend
- React
- react-router-dom
- axios

---

## Structure du projet
```
Projet-MERN-Profils/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── app.js
│   ├── server.js
│   ├── .env
│   ├── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── styles/
│   │   ├── App.js
│   │   ├── index.js
│   ├── package.json
│
└── README.md
```


