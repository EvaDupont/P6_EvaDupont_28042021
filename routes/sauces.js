const express = require('express');
const router = express.Router();
const saucesCtrl = require('../controllers/sauces');

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

/* ordre des middlewares est important : si multer avant auth : les images des requêtes non authentifiées seront enregistrées dans le serveur.*/

router.post('/', auth, multer, saucesCtrl.createSauce);
router.put('/:id', auth, multer, saucesCtrl.modifySauce);
router.delete('/:id', auth, saucesCtrl.deleteSauce);
//router.post('/:id/like', auth, saucesCtrl.likeSauce);
router.get('/', auth, saucesCtrl.getAllSauces);
router.get('/:id', auth, saucesCtrl.getOneSauce);

module.exports = router;

