const express = require('express');
const router = express.Router();
const sauceCtrl = require('../controllers/Sauce');

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

/* ordre des middlewares est important : si multer avant auth : les images des requêtes non authentifiées seront enregistrées dans le serveur.*/

router.post('/', auth, multer, sauceCtrl.createSauce);
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);
router.post('/:id/like', auth, sauceCtrl.likeSauce);
router.get('/', auth, sauceCtrl.getAllSauces);
router.get('/:id', auth, sauceCtrl.getOneSauce);

module.exports = router;

