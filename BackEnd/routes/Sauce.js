const express = require('express');
const router = express.Router();
const sauceCtrl = require('../controllers/Sauce');

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

/* mutler ici = pour que le telechargement des images fonctionne sur les routes */
/* ordre des middlewares est important : si multer avant auth : 
les images des requêtes non authentifiées seront enregistrées dans le serveur.*/

router.post('/', auth, multer, sauceCtrl.createSauce);   /*creation de fiche sauce (C)*/
router.get('/', auth, sauceCtrl.getAllSauces);           /*obtenir la liste de toutes les sauces (R)*/
router.get('/:id', auth, sauceCtrl.getOneSauce);         /*obtenir la sauce choisie (R) */
router.put('/:id', auth, multer, sauceCtrl.modifySauce); /*modification de la fiche sauce (U)*/
router.delete('/:id', auth, sauceCtrl.deleteSauce);      /*suppression de la fiche sauce (D)*/
router.post('/:id/like', auth, sauceCtrl.likeSauce);     /*liker la sauce */

/* on a le CRUD complet */ 

module.exports = router;

