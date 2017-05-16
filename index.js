// A mettre tout en haut
// ne pas oublier d'ajouter le .env file + ajouter .env au .gitignore
if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const express = require('express');
const app = express();

const Api = require('./server/Api');

// middleware pour ajouter des headers
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, HEAD, PATCH");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Max-Age", "3600");
  next();
});

app.use('/api', Api);

app.get('/*', (req, res) => {
  res.status(404).send('Cette page n\'existe pas.');
});

const port = process.env.PORT || 5000;
app.listen( port, function () {
  console.log(`Example app listening on port ${port}!`);
});
