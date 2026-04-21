const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Connexion MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connexion MongoDB réussie !'))
  .catch((error) => console.log('Connexion MongoDB échouée !', error));

// Middleware
app.use(cors());
app.use(express.json());

//Routes
const userRoutes = require('./routes/userRoutes');
app.use('/', userRoutes);

// Route test
app.get('/', (req, res) => {
  res.status(200).json({ message: 'API fonctionne !' });
});

module.exports = app;