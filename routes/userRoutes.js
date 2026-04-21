const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

router.post('/profils', userController.creerUtilisateur);
router.post('/login', userController.login);

router.get('/profils', auth, userController.getTousLesUtilisateurs);
router.get('/profils/:id', auth, userController.getUtilisateurParId);
router.put('/profils/:id', auth, userController.modifierUtilisateur);
router.delete('/profils/:id', auth, userController.supprimerUtilisateur);

router.get('/motdepasse/:longueur', userController.genererMotDePasse);

module.exports = router;