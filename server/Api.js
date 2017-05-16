const express = require('express');
const {Router} = express;

const mongoose = require('mongoose');

// const mongodbErrorHandler = require('mongoose-mongodb-errors');
// mongoose.plugin(mongodbErrorHandler);

const UserController = require('./controller/User');
const ProjectController = require('./controller/Project');
const RateController = require('./controller/Rate');

const bodyParser = require('body-parser');
const router = Router();

// if(process.env.NODE_ENV == 'production') {
//   mongoose.connect(`mongodb://${process.env.MLAB_DBUSER}:${process.env.MLAB_DBPASSWORD}@${process.env.MLAB_DBURL}`);
// } else {
//   mongoose.connect('mongodb://localhost:27017/kickass');
// }

// Grâce à dotenv, on peut utiliser des variables d'environnement en dev.
console.log('process.env.DATABASE : ', process.env.DATABASE);
mongoose.connect(process.env.DATABASE);

router.use(bodyParser.json({'extended': true}));
router.use(bodyParser.json());

const catchErrors = (fn) => {
  return function(req, res, next) {
    return fn(req, res, next).catch(next);
  };
}

router.get('/', (req, res) => {
  res.send('coucou api');
});

router.get('/users', UserController.getUsers);
router.get('/user/:id', UserController.getUser);
router.post('/user', catchErrors(UserController.createUser));
router.put('/user/:id', UserController.updateUser);
router.delete('/user/:id', UserController.deleteUser);

router.get('/projects', ProjectController.getProjects);
router.get('/project/:id', ProjectController.getProject);
router.post('/project', ProjectController.createProject);
router.put('/project/:id', ProjectController.updateProject);
router.delete('/project/:id', ProjectController.deleteProject);
router.get('/user/:id/projects', ProjectController.getUserProjects);

router.post('/rate', catchErrors(RateController.createRate));
router.get('/rates', RateController.getRates);
router.get('/project_rates', catchErrors(RateController.getRatesByProject));

/** /
// on le supprime pcq obligé d'envoyer un header Accept:application/json
if(process.env.NODE_ENV === 'development') {
  router.use(require('errorhandler')());
}
/**/

// production
router.use((err, req, res, next) => {
  res.status(err.status || 500)
  .json({
    message: err.message,
    error: {}
  });
  next(err);
});

module.exports = router;
