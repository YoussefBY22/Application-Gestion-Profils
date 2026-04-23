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

Installation du projet
1. Cloner ou récupérer le projet

Placez-vous dans le dossier du projet.
2. Installation du backend

Ouvrir un terminal dans le dossier backend :
cd backend
npm install

Lancer le backend
npm run dev

Le backend démarre sur :
http://localhost:3000

3. Installation du frontend
Ouvrir un deuxième terminal dans le dossier frontend :
cd frontend
npm install

Lancer le frontend
npm start

Le frontend démarre sur :
http://localhost:3001
car le port 3000 est déjà utilisé par le backend.

Configuration MongoDB

Le projet utilise MongoDB Atlas.

Étapes générales
Créer un compte MongoDB Atlas
Créer un projet
Créer un cluster gratuit
Créer un utilisateur de base de données
Autoriser l’accès réseau
Récupérer la chaîne de connexion
Mettre à jour le fichier .env



