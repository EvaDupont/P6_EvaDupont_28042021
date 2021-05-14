const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');  /*package pour limiter le nombre de requete à l'application */
const userCtrl = require('../controllers/user');


const Limiter = rateLimit({
  windowMs: 2 * 60 * 1000, // 2 minutes : temps défini pour tester l'application
  max: 3 // 3 essais max par adresse ip
});

router.post('/signup', userCtrl.signup);
router.post('/login', Limiter, userCtrl.login); /* application de rate limit au login de l'user*/


module.exports = router;