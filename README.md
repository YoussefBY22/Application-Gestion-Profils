---

## Installation du projet

### 1. Cloner le projet

```bash
git clone <url-du-repo>
cd Projet-MERN-Profils
```
### 2. Installation du backend
```
cd backend
npm install
```
**Lancer le backend**
```
npm run dev
```
**Le backend démarre sur :**
http://localhost:3000

### 3. Installation du frontend
```
cd frontend
npm install
```
**Lancer le frontend**
```
npm start
```

**Le frontend démarre généralement sur :**
http://localhost:3001

### 4. Configuration MongoDB
Le projet utilise MongoDB Atlas.

Étapes
  - Créer un compte MongoDB Atlas
  - Créer un projet
  - Créer un cluster
  - Créer un utilisateur de base de données
  - Autoriser les accès réseau (0.0.0.0/0)
  - Récupérer la chaîne de connexion
  - Fichier .env

**Créer un fichier .env dans le dossier backend :**
```
MONGO_URI=mongodb+srv://USERNAME:PASSWORD@cluster.mongodb.net/projet-profils?retryWrites=true&w=majority&appName=ProjetMERNProfils
JWT_SECRET=secret123
```

**Utilisation du projet avec un autre compte MongoDB**
Si une autre personne souhaite utiliser ce projet, elle doit :

**Étapes à suivre**
```
Créer son propre compte MongoDB Atlas
Créer un cluster
Créer un utilisateur MongoDB
Autoriser l’accès réseau
Copier sa propre chaîne de connexion
Modifier le fichier .env
```

**Ce qu’il faut modifier**
Uniquement :
```
MONGO_URI=nouvelle_chaine_mongodb
Nom recommandé de la base
```

**Il est recommandé d’utiliser pour le nom de la B.D : projet-profils


**Peut-on changer le nom de la base ?** Oui ✔

Exemple :
```
MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/ma-base?retryWrites=true&w=majority
```

**Faut-il modifier le code ?** Non ✔

**Le backend utilise :**
mongoose.connect(process.env.MONGO_URI)
Donc tout est configurable via .env.

**Cas particuliers**
Il faudra modifier le code seulement si :
  - le port backend change 
  - l’URL API change
Dans ce cas modifier :
```
frontend/src/services/api.js
```

### Routes API
**Routes publiques**
```
POST /profils → créer un utilisateur
POST /login → se connecter
GET /motdepasse/:longueur → générer un mot de passe
```

**Routes protégées**
```
GET /profils → (admin)
GET /profils/:id → (user/admin)
PUT /profils/:id → modifier profil
DELETE /profils/:id → (admin)
```

### Exemples curl
**Créer un utilisateur**
```
curl -X POST http://localhost:3000/profils \
-H "Content-Type: application/json" \
-d '{
  "pseudo": "test",
  "email": "test@test.com",
  "motDePasse": "123456",
  "isAdmin": false
}'
```

**Connexion**
```
curl -X POST http://localhost:3000/login \
-H "Content-Type: application/json" \
-d '{
  "email": "test@test.com",
  "motDePasse": "123456"
}'
```

**Générer un mot de passe**
```
curl http://localhost:3000/motdepasse/10
Lire un profil
curl http://localhost:3000/profils/USER_ID \
-H "Authorization: Bearer TOKEN"
```

**Modifier un profil**
```
curl -X PUT http://localhost:3000/profils/USER_ID \
-H "Authorization: Bearer TOKEN" \
-H "Content-Type: application/json" \
-d '{
  "pseudo": "nouveauPseudo"
}'
```

**Lire tous les utilisateurs**
```
curl http://localhost:3000/profils \
-H "Authorization: Bearer TOKEN"
```

**Supprimer un utilisateur**
```
curl -X DELETE http://localhost:3000/profils/USER_ID \
-H "Authorization: Bearer TOKEN"
```

### Gestion des rôles
**Utilisateur (USER)**
```
consulter son profil
modifier son profil
```

**Administrateur (ADMIN)**
```
accès complet
consultation de tous les profils
suppression d’un utilisateur
```

**Remarques importantes**
```
Toutes les routes retournent des réponses JSON
Les mots de passe sont chiffrés avec bcrypt
L’authentification utilise JWT
Le frontend stocke le token dans localStorage
```

**Améliorations possibles**
```
API validation avancée des emails
amélioration du design UI
gestion des erreurs plus détaillée
refresh token
```
