const mongoose = require('mongoose');

/*Package pour vérifier que l'email n'est pas déjà enregistré*/
const uniqueValidator = require('mongoose-unique-validator');

/* structure du schéma User*/
const userSchema = mongoose.Schema({
  //userId : { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);