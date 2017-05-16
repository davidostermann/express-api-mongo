const Project = require('../model/Project');

exports.getProjects = (req, res) => {
  Project.find()
  .populate({
    path: '_creator',
    model: 'User'})
  .exec((err, projects) => {
    if (err) { res.send(err) }
    res.json(projects);
  });
};

exports.createProject = (req, res) => {
  var project = new Project();
  project.title = req.body.title;
  project.description = req.body.description;
  project._creator = req.body.creator;
  project.save((err) => {
    if (err) {
      return res.send(err);
    }

    res.json({
      message: `Project ${project._creator} created !`
    });
  });
};

exports.getProject = (req, res) => {
  Project.findOne({_id: req.params.id})
  .exec((err, project) => {
    if (err) { res.send(err); }
    res.json(project);
  });
};

exports.updateProject = (req, res) => {
  Project.findByIdAndUpdate(req.params.id, { $set: req.body}, {new: true}, (err, project) => {
    if (err) {
      return res.send(err).status(500);
    }
    res.json(project)
  });
};

exports.deleteProject = (req, res) => {
  Project.findByIdAndRemove(req.params.id, (err, project) => {
    if (err) {
      return res.send(err).status(500);
    }
    let str = (project) ? `Project ${project._id} deleted !` : 'No project were deleted.'
    res.json({ message: str })
  });
};

exports.getUserProjects = (req, res) => {
  Project.find({_creator: req.params.id})
  .exec((err, projects) => {
    if (err) { res.send(err); }
    res.json(projects);
  });
};
