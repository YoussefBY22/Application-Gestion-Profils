import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from './services/api';


function Home() {
  return (
    <div className="container">
      <div className="card">
        <h1 className="title">Application de gestion de profils Travaillé par Seif Maroufi</h1>
      </div>
    </div>
  );
}

function Navbar() {
  const navStyle = {
    backgroundColor: '#0b113a',
    color: '#ffffff',
    padding: '16px 24px',
    display: 'flex',
    gap: '20px',
    alignItems: 'center'
  };

  const isLogged = localStorage.getItem('token');

  return (
    <nav style={navStyle}>
      <Link to="/">Accueil</Link>

      {!isLogged && <Link to="/inscription">Inscription</Link>}
      {!isLogged && <Link to="/login">Connexion</Link>}

      {isLogged && <Link to="/profil">Profil</Link>}
      {isLogged && <Link to="/admin">Admin</Link>}
      {isLogged && <Link to="/suppression">Affichage & Suppression User</Link>}

      <Link to="/documentation">Documentation</Link>

      {isLogged && (
        <button
          className="btn-danger"
          onClick={() => {
            localStorage.clear();
            window.location.href = '/';
          }}
        >
          Déconnexion
        </button>
      )}
    </nav>
  );
}

function RegisterPage() {
  const [pseudo, setPseudo] = useState('');
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [longueur, setLongueur] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  

  const genererMotDePasse = async () => {
    try {
      const num = Number(longueur);

      if (!longueur || num < 6 || num > 30) {
        setError('Le mot de passe doit contenir entre 6 et 30 caractères');
        setMessage('');
        return;
      }

      const res = await api.get(`/motdepasse/${num}`);
      setMotDePasse(res.data.password);
      setShowPassword(true); // généré = visible au début
      setError('');
      setMessage('');
    } catch (err) {
      setError('Erreur génération mot de passe');
      setMessage('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post('/profils', {
        pseudo,
        email,
        motDePasse,
        isAdmin
      });

      setMessage('Utilisateur créé !');
      setError('');
      setPseudo('');
      setEmail('');
      setMotDePasse('');
      setLongueur('');
      setIsAdmin(false);
      setShowPassword(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur');
      setMessage('');
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1 className="title">Inscription</h1>

        {message && <p style={{ color: 'green' }}>{message}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <label>Pseudo</label>
          <input
            type="text"
            value={pseudo}
            onChange={(e) => setPseudo(e.target.value)}
            required
          />

          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Longueur du mot de passe</label>
          <input
            type="text"
            value={longueur}
            onChange={(e) => {
              const value = e.target.value;

              if (!/^\d*$/.test(value)) return;

              if (value === '') {
                setLongueur('');
                return;
              }

              const num = Number(value);

              if (num > 30) return;

              setLongueur(value);
            }}
            placeholder="Entre 6 et 30"
            required
          />

          <small>Entre 6 et 30 caractères</small>

          <br /><br />

          <button
            type="button"
            className="btn-success"
            onClick={genererMotDePasse}
          >
            Générer mot de passe
          </button>

          <br /><br />

          <label>Mot de passe</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              value={motDePasse}
              onChange={(e) => {
                setMotDePasse(e.target.value);
                // si l'utilisateur tape manuellement, on garde masqué par défaut
                if (e.target.value && motDePasse === '') {
                  setShowPassword(false);
                }
              }}
              required
              style={{ marginBottom: 0 }}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                padding: '10px 12px',
                border: '1px solid #0057ac',
                borderRadius: '6px',
                backgroundColor: '#ffffff',
                cursor: 'pointer'
              }}
            >
              {showPassword ? '👁' : '👁'}
            </button>
          </div>

          <br />

          <div style={{ marginBottom: '14px' }}>
            <label>
              <input
                type="checkbox"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
                style={{ width: 'auto', marginRight: '8px' }}
              />
              Compte administrateur
            </label>
          </div>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
  <button type="submit" className="btn-primary">
    S’inscrire
  </button>

  <Link to="/login">
    <button
      type="button"
      style={{
        padding: '10px 16px',
        backgroundColor: '#0057ac',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer'
      }}
    >
      Connexion
    </button>
  </Link>
</div>

<p style={{ marginTop: '10px' }}>
  Déjà un compte ? Cliquez sur Connexion.
</p>

        </form>
      </div>
    </div>
  );
}

function LoginPage() {
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  

  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const res = await api.post('/login', {
      email,
      motDePasse
    });

    // stocker token
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('userId', res.data.userId);
    localStorage.setItem('isAdmin', res.data.isAdmin);

    setMessage("Connexion réussie !");
    setError('');

    // 🔥 AJOUT ICI
    window.location.href = '/profil';

  } catch (err) {
    setError(err.response?.data?.message || "Erreur login");
    setMessage('');
  }
};

  return (
    <div className="container">
      <div className="card">
        <h1 className="title">Connexion</h1>

        {message && <p style={{ color: "green" }}>{message}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <form onSubmit={handleLogin}>

          <label>Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Mot de passe</label>
          <input
            type="password"
            value={motDePasse}
            onChange={(e) => setMotDePasse(e.target.value)}
            required
          />

          <button type="submit" className="btn-primary">
            Se connecter
          </button>

        </form>
      </div>
    </div>
  );
}

function AdminPage() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  const token = localStorage.getItem('token');

  if (!token) {
    return (
      <div className="container">
        <div className="card">
          <h1>Veuillez vous connecter</h1>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return <ForbiddenPage />;
  }

  const chargerUtilisateurs = async () => {
    try {
      const res = await api.get('/profils');
      setUsers(res.data);
      setError('');
    } catch (err) {
      setError('Accès refusé ou erreur');
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1 className="title">Espace administrateur</h1>

        <button className="btn-primary" onClick={chargerUtilisateurs}>
          Charger tous les utilisateurs
        </button>

        <br /><br />

        {error && <p style={{ color: 'red' }}>{error}</p>}

        {users.length > 0 && (
          <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse', width: '100%' }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Pseudo</th>
                <th>Email</th>
                <th>Admin</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id}>
                  <td>{u._id}</td>
                  <td>{u.pseudo}</td>
                  <td>{u.email}</td>
                  <td>{u.isAdmin ? 'Oui' : 'Non'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [pseudo, setPseudo] = useState('');
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);

  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const chargerProfil = async () => {
      if (!token || !userId) return;

      try {
        const res = await api.get(`/profils/${userId}`);
        setUser(res.data);
        setPseudo(res.data.pseudo);
        setEmail(res.data.email);
        setError('');
      } catch (err) {
        setError('Impossible de charger le profil');
      }
    };

    chargerProfil();
  }, [token, userId]);

  const modifierProfil = async (e) => {
    e.preventDefault();

    try {
      const payload = { pseudo, email };

      if (motDePasse.trim() !== '') {
        payload.motDePasse = motDePasse;
      }

      await api.put(`/profils/${userId}`, payload);

      setMessage('Profil modifié avec succès');
      setError('');
      setMotDePasse('');

      const res = await api.get(`/profils/${userId}`);
      setUser(res.data);
      setPseudo(res.data.pseudo);
      setEmail(res.data.email);
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur modification');
      setMessage('');
    }
  };

  if (!token) {
    return (
      <div className="container">
        <div className="card">
          <h1>Veuillez vous connecter</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card">
        <h1 className="title">Mon profil</h1>

        {error && <p style={{ color: 'red' }}>{error}</p>}
        {message && <p style={{ color: 'green' }}>{message}</p>}

        {user && (
          <>
            <p>
              <strong>
                Bienvenue cher {user.isAdmin ? 'ADMIN' : 'USER'}, {user.pseudo}
              </strong>
            </p>

            <br />

            <button
              className="btn-primary"
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? 'Masquer le formulaire' : 'Modifier mon profil'}
            </button>

            <br /><br />

            {showForm && (
              <form onSubmit={modifierProfil}>
                <p><strong>ID :</strong> {user._id}</p>

                <label>Pseudo</label>
                <input
                  value={pseudo}
                  onChange={(e) => setPseudo(e.target.value)}
                  required
                />

                <label>Email</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <label>Nouveau mot de passe (optionnel)</label>
                <input
                  type="password"
                  value={motDePasse}
                  onChange={(e) => setMotDePasse(e.target.value)}
                />

                <button type="submit" className="btn-success">
                  Enregistrer les modifications
                </button>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function DeletePage() {
  const [userId, setUserId] = useState('');
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  const token = localStorage.getItem('token');

  if (!token) {
    return (
      <div className="container">
        <div className="card">
          <h1>Veuillez vous connecter</h1>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return <ForbiddenPage />;
  }

  const chercherUtilisateur = async () => {
    try {
      const res = await api.get(`/profils/${userId}`);
      setUser(res.data);
      setError('');
      setMessage('');
    } catch (err) {
      setError(err.response?.data?.message || 'Utilisateur introuvable');
      setUser(null);
    }
  };

  const supprimerUtilisateur = async () => {
    try {
      await api.delete(`/profils/${userId}`);
      setMessage('Utilisateur supprimé avec succès');
      setError('');
      setUser(null);
      setUserId('');
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur suppression');
      setMessage('');
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1 className="title">Suppression d’utilisateur</h1>

        {message && <p style={{ color: 'green' }}>{message}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <label>ID utilisateur</label>
        <input
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />

        <button className="btn-primary" onClick={chercherUtilisateur}>
          Chercher
        </button>

        <br /><br />

        {user && (
          <div>
            <p><strong>ID :</strong> {user._id}</p>
            <p><strong>Pseudo :</strong> {user.pseudo}</p>
            <p><strong>Email :</strong> {user.email}</p>
            <p><strong>Admin :</strong> {user.isAdmin ? 'Oui' : 'Non'}</p>

            <button className="btn-danger" onClick={supprimerUtilisateur}>
              Supprimer cet utilisateur
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
function ForbiddenPage() {
  return (
    <div className="container">
      <div className="card">
        <h1 className="title">Accès refusé</h1>
        <p>Vous devez être administrateur pour accéder à cette page.</p>
      </div>
    </div>
  );
}

function ApiDocsPage() {
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  return (
    <div className="container">
      <div className="card">
        <h1 className="title">Documentation API</h1>

        <h3>1. Créer un utilisateur</h3>
        <p><strong>POST /profils</strong></p>
        <pre>
{`curl -X POST http://localhost:3000/profils \
-H "Content-Type: application/json" \
-d '{
  "pseudo": "test",
  "email": "test@test.com",
  "motDePasse": "123456"
}'`}
        </pre>

        <h3>2. Connexion</h3>
        <p><strong>POST /login</strong></p>
        <pre>
{`curl -X POST http://localhost:3000/login \
-H "Content-Type: application/json" \
-d '{
  "email": "test@test.com",
  "motDePasse": "123456"
}'`}
        </pre>

        <h3>3. Générer mot de passe</h3>
        <p><strong>GET /motdepasse/:longueur</strong></p>
        <pre>
{`curl http://localhost:3000/motdepasse/10`}
        </pre>

        <h3>4. Voir son profil</h3>
        <p><strong>GET /profils/:id</strong></p>
        <pre>
{`curl http://localhost:3000/profils/USER_ID \
-H "Authorization: Bearer TOKEN"`}
        </pre>

        <h3>5. Modifier profil</h3>
        <p><strong>PUT /profils/:id</strong></p>
        <pre>
{`curl -X PUT http://localhost:3000/profils/USER_ID \
-H "Authorization: Bearer TOKEN" \
-H "Content-Type: application/json" \
-d '{
  "pseudo": "newPseudo"
}'`}
        </pre>

        {isAdmin && (
          <>
            <h3>6. Voir tous les utilisateurs (ADMIN)</h3>
            <p><strong>GET /profils</strong></p>
            <pre>
{`curl http://localhost:3000/profils \
-H "Authorization: Bearer TOKEN"`}
            </pre>

            <h3>7. Supprimer un utilisateur (ADMIN)</h3>
            <p><strong>DELETE /profils/:id</strong></p>
            <pre>
{`curl -X DELETE http://localhost:3000/profils/USER_ID \
-H "Authorization: Bearer TOKEN"`}
            </pre>
          </>
        )}
      </div>
    </div>
  );
}

function App() {
  const token = localStorage.getItem('token');

  return (
    <BrowserRouter>
      {token && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inscription" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profil" element={<ProfilePage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/suppression" element={<DeletePage />} />
        <Route path="/documentation" element={<ApiDocsPage />} />
        <Route path="/forbidden" element={<ForbiddenPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;