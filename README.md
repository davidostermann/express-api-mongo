# SDW-3A-20170516

SDW-3A 16/05/2017

## Utiliser dotenv ou node-foreman

``` 
npm i -D dotenv
```

.env
``` 
NODE_ENV=development
DATABASE=mongodb://localhost:27017/kickass
```

dans index.js
``` 
if (process.env.NODE_ENV !== 'production') require('dotenv').config()
``` 

du coup, on peut appeler directement
``` 
mongoose.connect(process.env.DATABASE);
``` 

## Utiliser 'exports' au lieu de module.exports quand il y a plusieurs elements à exporter

C'est le même que export et export default avec les modules es6
Vous pouvez donc utiliser le destructuring es6 si besoin.

## Middleware on specified routes

#### Déclaration de middleware

Un middleware se place entre la request et la response. Les middleware sont executés de façon sequentiel au même titre que  les routes (les uns après les autres).

On va, par exemple, : 
- vérifier que l'utilisateur est authentifié en amont des routes privées afin de le rediriger, si besoin, vers le login
- intercepter toutes les erreurs après les routes

Pour le developpement, on peut utiliser le package https://github.com/expressjs/errorhandler pour avoir le stack d'execution. 

``` 
exports.isLoggedIn = (req, res, next) => {
  // first check if the user is authenticated
  if (req.isAuthenticated()) {
    next(); // carry on! They are logged in!
    return;
  }
  req.flash('error', 'Oops you must be logged in to do that!');
  res.redirect('/login');
};
```
Execution de middleware sur un router (toutes les routes liées au router sont concernées)
``` 
router.use(authController.isLoggedIn);
``` 
Execution de middleware sur une route specifique
``` 
router.get('/account', authController.isLoggedIn, userController.account);
``` 
où authController.isLoggedIn is a middleware

## MONGOOSE

### Dire à Mongoose d’utiliser les Promise d’es6 
```
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
```

### Utilser trim

### Specifier une erreur sur le 'required'


## locals

On utilise un middleware pour injecter les données dans la response
http://expressjs.com/fr/4x/api.html#res.locals

```
// pass variables to our templates + all requests
app.use((req, res, next) => {
  res.locals.h = helpers;
  res.locals.flashes = req.flash();
  res.locals.user = req.user || null;
  res.locals.currentPath = req.path;
  next();
});
``` 
On peut aussi les injecter dans app pour y avoir acces à tous moments (dans la request et dans l'app)

http://expressjs.com/fr/4x/api.html#app.locals

## promisify


