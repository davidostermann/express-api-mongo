const Rate = require('../model/Rate');

exports.getRates = (req, res) => {
  Rate.find()
  .populate({
    path: '_user',
    model: 'User'})
  .populate({
    path: '_project',
    model: 'Project'})
  .exec((err, rates) => {
    if (err) { res.send(err) }
    res.json(rates);
  })
};

const getRate = ({value, user, project}) => {
  const rate = new Rate({
    value,
    _user: user,
    _project: project,
    createdAt: new Date()
  });
  return rate
}

exports.getRatesByProject = async (req, res) => {
  const rates = await Rate.getProjectList();
  res.json(rates);
}

/** /
exports.createRate = (req, res) => {
  const rate = getRate(req.body);
  rate.save((err) => {
    if (err) {
      return res.send(err);
    }
    res.json({
      message: `Rate ${rate._project} created !`
    });
  });
};
/**/

/** /
exports.createRate = (req, res) => {
  const rate = getRate(req.body);
  rate.save()
  .then((r) => {
    res.json({
      message: `Rate ${r._project} created !`
    });
  })
  .catch((err) => {
    return res.send(err);
  })
};
/**/

/** /
exports.createRate = async (req, res) => {
  const rate = getRate(req.body);
  try {
    await  rate.save();
    res.json({
      message: `Rate ${rate._project} created !`
    });
  } catch (err) {
    return res.send(err);
  }
}
/**/

/**/
exports.createRate = async (req, res) => {
  // rate
  const rate = await getRate(req.body).save();
  res.json({
    message: `Rate ${rate._project} created !`
  });
}
/**/
