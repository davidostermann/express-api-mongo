const UserModel = require('../model/User');
const RateModel = require('../model/Rate');

exports.getUsers = (req, res) => {
  UserModel.find()
  .exec((err, users) => {
    if (err) { res.send(err); }
    res.json(users);
  });
}


/** /
exports.createUser = (req, res) => {
  const user = new UserModel(req.body)
  // user.name = req.body.name
  // user.type = req.body.type
  // user.age = req.body.age
  user.save((err, user) => {
    if (err) {
      return res.send(err)
    }
    res.json(user)
  })
}
/**/

/** /
exports.createUser = async (req, res) => {
  const user = new UserModel(req.body)
  await user.save()
  res.json(user)
}
/**/

exports.createUser = async (req, res) => {
  const user = await new UserModel(req.body).save()
  res.json(user)
}

exports.getUser = (req, res) => {
  UserModel.findOne({_id: req.params.id})
  .exec((err, user) => {
    if (err) { res.send(err); }
    RateModel.find({_user: req.params.id}).exec((err, rates) => {
      if (err) { res.json(user); }
      user.rates = rates;
      console.log('rates : ', user.rates);
      res.json(user);
    })
  });
}

exports.updateUser = (req, res) => {
  UserModel.findByIdAndUpdate(req.params.id, { $set: req.body}, {new: true}, (err, user) => {
    if (err) {
      return res.send(err).status(500);
    }
    res.json(user)
  });
}

exports.deleteUser = (req, res) => {
  UserModel.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      return res.send(err).status(500);
    }
    res.json({ message: 'User deleted!' })
  });
}
