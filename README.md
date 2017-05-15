# SDW-3A-20170516

SDW-3A 16/05/2017

1. Dire à Mongoose d’utiliser les Promise d’es6 
```
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
```

2. locals

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

3. Mi!ddleware on specified routes

Déclaration de middleware
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
Execution de middleware sur une route specifique
``` 
router.get('/account', authController.isLoggedIn, userController.account);
``` 
où authController.isLoggedIn is a middleware



3. promisify
