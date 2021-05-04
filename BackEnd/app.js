const express = require('express'); /* Framework qui facilite le déploiement des API*/
const bodyParser = require('body-parser'); /* module permettant d'extraire l'objet JSON de la dde POST et analyser le body d la requete*/
const mongoose = require('mongoose');/*package pour lié le code source à la base de données MondoDB (version Altas ici)*/
const path = require('path'); /*package pour manipuler et assurer les chemins vers les fichiers et les repertoires du code */

const sauceRoutes = require('./routes/Sauce');
const userRoutes = require('./routes/user');

const app = express();

mongoose.connect("mongodb+srv://Eva:3rgcBa9ULqCEjmQg@cluster0.16w5x.mongodb.net/test?retryWrites=true&w=majority", /*si prb voir si "test" en est la cause */
  { useNewUrlParser: true,
    useUnifiedTopology: true 
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

/*CORS Cross Origin Resource Sharing : systeme de sécurité qui empêche les requetes malveillantes*/

/*ces headers permettent d'accéder à l'api depuis n'importe quelle origine + d'envoyer des requêtes avec les methodes GET, POST...*/
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});


app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);


module.exports = app;
