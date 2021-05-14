const express = require('express'); /* Framework qui facilite la création de serveur*/
const bodyParser = require('body-parser'); /* module permettant d'extraire l'objet JSON de la dde POST et analyser le body de la requete*/
const mongoose = require('mongoose');/*package pour lier le code source à la base de données MondoDB (version Altas ici)*/
const path = require('path'); /*package pour manipuler et assurer les chemins vers les fichiers et les repertoires du code */
const helmet = require("helmet"); /* protege l'application de certaines vulnérabilités*/

const sauceRoutes = require('./routes/Sauce');
const userRoutes = require('./routes/user');

/*Connection à MongoDB avec la sécurité vers le fichier .env */
require('dotenv').config();

mongoose.connect(process.env.DB_MDB, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));


const app = express();

/*CORS Cross Origin Resource Sharing : systeme de sécurité qui empêche les requetes malveillantes*/
/*ces headers permettent d'accéder au serveur depuis n'importe quelle origine + d'envoyer des requêtes avec les methodes GET, POST...*/
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
app.use(helmet());


module.exports = app;
