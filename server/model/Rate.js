const mongoose = require('mongoose');
const mongooseError = require('mongoose-error');

mongoose.Promise = global.Promise;
const {Schema} = mongoose;

const RateSchema = new Schema({
  'value': Number,
  'createdAt': Date,
  'modifyAt': Date,
  '_user': {
    'ref': 'User',
    'type': Schema.Types.ObjectId,
    'required': 'User id is required'
  },
  '_project': {
    'ref': 'Project',
    'type': Schema.Types.ObjectId,
    'required': 'Project id is required !'
  },
});

RateSchema.index({_user:1, _project:1}, { unique: true });

RateSchema.statics.getProjectList = function() {
  return this.aggregate([
    {$group: {_id: '$_project', count: {$sum:1}, average: {$avg: '$value'}}}
  ])
}

var handleE11000 = function(error, res, next) {
  console.log('error : ', error.errors)
  if (error.name === 'MongoError' && error.code === 11000) {
    next(new Error('Un utilisateur ne peut pas noter 2 fois le meme projet'));
  } else {
    // mongooseError recupere la premiere erreur
    next(mongooseError(error));
  }
};

RateSchema.post('save', handleE11000);
RateSchema.post('update', handleE11000);
RateSchema.post('findOneAndUpdate', handleE11000);
RateSchema.post('insertMany', handleE11000);

module.exports = mongoose.model('Rate', RateSchema);
