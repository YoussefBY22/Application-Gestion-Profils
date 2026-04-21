const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      return res.status(401).json({ message: 'Token manquant' });
    }

    const token = authorizationHeader.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    req.auth = {
      userId: decodedToken.userId,
      isAdmin: decodedToken.isAdmin
    };

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Requête non authentifiée' });
  }
};