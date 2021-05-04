/* protéger les routes sélectionnées et vérifier que l'utilisateur est authentifié 
avant d'autoriser l'envoi de ses requêtes.*/

const jwt = require('jsonwebtoken');


/*- try...catch pour les instructions à exécuter et définit une réponse si l'une de ces instructions provoque une erreur
  - verifie le token envoyé par le FE : qu'il est valable + que l'user ID = celui du token 
  - decoder le token ac jsonwebtoken 
  - recuperer l'user ID et vérifier = celui du token*/


module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Requête non authentifiée !')
    });
  }
};