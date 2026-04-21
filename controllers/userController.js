const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// POST /profils
exports.creerUtilisateur = async (req, res) => {
  try {
    const { pseudo, email, motDePasse, isAdmin } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Email invalide" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email déjà utilisé' });
    }

    const hashedPassword = await bcrypt.hash(motDePasse, 10);

    const user = new User({
      pseudo,
      email,
      motDePasse: hashedPassword,
      isAdmin: isAdmin || false
    });

    await user.save();

    res.status(201).json({ message: 'Utilisateur créé avec succès' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST /login
exports.login = async (req, res) => {
  try {
    const { email, motDePasse } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Utilisateur non trouvé' });
    }

    const motDePasseValide = await bcrypt.compare(motDePasse, user.motDePasse);
    if (!motDePasseValide) {
      return res.status(401).json({ message: 'Mot de passe incorrect' });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        isAdmin: user.isAdmin
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(200).json({
      message: 'Connexion réussie',
      token: token,
      userId: user._id,
      isAdmin: user.isAdmin
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /profils
exports.getTousLesUtilisateurs = async (req, res) => {
  try {
    if (!req.auth.isAdmin) {
      return res.status(403).json({ message: 'Accès refusé' });
    }

    const users = await User.find({}, '_id pseudo email isAdmin');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /profils/:id
exports.getUtilisateurParId = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!req.auth.isAdmin && req.auth.userId !== userId) {
      return res.status(403).json({ message: 'Accès refusé' });
    }

    const user = await User.findById(userId, '_id pseudo email isAdmin');
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PUT /profils/:id
exports.modifierUtilisateur = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!req.auth.isAdmin && req.auth.userId !== userId) {
      return res.status(403).json({ message: 'Accès refusé' });
    }

    const updateData = { ...req.body };

    delete updateData._id;

    if (updateData.motDePasse) {
      updateData.motDePasse = await bcrypt.hash(updateData.motDePasse, 10);
    }

    const user = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true
    }).select('_id pseudo email isAdmin');

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    res.status(200).json({
      message: 'Utilisateur modifié avec succès',
      user: user
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE /profils/:id
exports.supprimerUtilisateur = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!req.auth.isAdmin) {
      return res.status(403).json({ message: 'Accès refusé' });
    }

    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const passwordGenerator = require('../utils/passwordGenerator');

// GET /motdepasse/:longueur
exports.genererMotDePasse = (req, res) => {
  const length = parseInt(req.params.longueur);

  if (isNaN(length) || length <= 0) {
    return res.status(400).json({ message: "Longueur invalide" });
  }

  const password = passwordGenerator.generatePassword(length);

  res.status(200).json({ password });
};