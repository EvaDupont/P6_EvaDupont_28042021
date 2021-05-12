
/*module de hachage securisé pour chiffrer les données rendant leur lecture impossible par un utilisateur malveillant 
utilisation d'un hash = chaine chiffrée pour crypter le mdp*/
const bcrypt = require('bcrypt'); 

/*package pour créer et verifier les tokens d'authentification */
const jwt = require('jsonwebtoken');

const User = require('../models/User');

/*fonction pour s'inscrire */
      /*appel de la fonction de hashage dans le mdp en ajoutant une chaine de caractere pour augmenter la sécurité*/
      
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10) 
      .then(hash => {
        const user = new User({
          email: req.body.email,
          password: hash
        });
        user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };

/* fonction pour se connecter 
    - va vérfier si l'user est deja ou non dans la base de données :
utilisation de "compare" pour comparer le mdp et le hash enregistré dans la base de données 
    -  initialisation du token ac l'id de l'user, une chaine secret d'encodage et une durée de validité 
du token (dc de la session) */

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign( 
              { userId: user._id },
              'RANDOM_TOKEN_SECRET',
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};