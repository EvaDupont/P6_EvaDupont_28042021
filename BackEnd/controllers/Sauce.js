/* importe la structure du schema sauce */
const Sauce = require('../models/Sauce');

/*package qui permet de modifier ou supprimer des fichiers */
const fs = require('fs');

/* création de la fiche sauce */
exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  console.log("test", sauceObject)
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject, /* ... = spread permet la copie de la variable sauceObject*/
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  console.log("test1", sauce)
  sauce.save() /*permet de sauvegarder la sauce en passant une promise : on attend une réponse soit tt est ok soit erreur */
    .then(() => res.status(201).json({ message: 'Sauce enregistrée !'})) 
    .catch(error => res.status(400).json({ error }));
};

/*modification de la sauce */
exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file ?
    {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Sauce modifiée !'}))
    .catch(error => res.status(400).json({ error }));
};

/*suppression de la sauce */
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
      Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Sauce supprimée !'}))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};

exports.likeSauce = (req, res, next) => {    
  const like = req.body.like;
  if(like === 1) { // Option like
      Sauce.updateOne({_id: req.params.id}, { $inc: { likes: 1}, $push: { usersLiked: req.body.userId}, _id: req.params.id })
      .then( () => res.status(200).json({ message: 'Vous aimez cette sauce !' }))
      
      .catch( error => res.status(400).json({ error}))
  } else if(like === -1) { // Option dislike
      Sauce.updateOne({_id: req.params.id}, { $inc: { dislikes: 1}, $push: { usersDisliked: req.body.userId}, _id: req.params.id })
      .then( () => res.status(200).json({ message: 'Vous n\'aimez pas cette sauce !' }))
      .catch( error => res.status(400).json({ error}))

  } else {   
      Sauce.findOne( {_id: req.params.id})
      .then( sauce => {
          if( sauce.usersLiked.indexOf(req.body.userId)!== -1){
               Sauce.updateOne({_id: req.params.id}, { $inc: { likes: -1},$pull: { usersLiked: req.body.userId}, _id: req.params.id })
              .then( () => res.status(200).json({ message: 'Vous n\'aimez plus cette sauce !' }))
              .catch( error => res.status(400).json({ error}))
              }
          else if( sauce.usersDisliked.indexOf(req.body.userId)!== -1) {
              Sauce.updateOne( {_id: req.params.id}, { $inc: { dislikes: -1 }, $pull: { usersDisliked: req.body.userId}, _id: req.params.id})
              .then( () => res.status(200).json({ message: 'Vous aimez cette sauce !' }))
              .catch( error => res.status(400).json({ error}))
              }           
      })
      .catch( error => res.status(400).json({ error}))             
  }   
};

/* Récupérer toutes les sauces*/
exports.getAllSauces = (req, res, next) => {
  Sauce.find()
  .then((sauces) => {res.status(200).json(sauces);})
  .catch((error) => {res.status(400).json({error: error});}
  );
};

/*récupération d'une seule sauce */
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({_id: req.params.id})
  .then((sauce) => {res.status(200).json(sauce);})
  .catch((error) => {res.status(404).json({error: error});}
  );
};





