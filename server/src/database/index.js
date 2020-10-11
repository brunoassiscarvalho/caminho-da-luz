const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost/caminho-da-luz',{useNewUrlParser: true, useUnifiedTopology: true})
mongoose.connect('mongodb+srv://us3r_cAminh0_d4_Lu2:ExoKpZzaAvXnNtIA@ce-caminho-da-luz.xer36.gcp.mongodb.net/caminho-da-luz?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology: true})
mongoose.Promise = global.Promise;

module.exports = mongoose;