const mongoose = require('mongoose');

const connectionString = process.env.NODE_ENV==="production"?`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_URL}/${process.env.DB_NAME}?retryWrites=true&w=majority`: 'mongodb://localhost/caminho-da-luz'

mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
mongoose.Promise = global.Promise;

module.exports = mongoose;