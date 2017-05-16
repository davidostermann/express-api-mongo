const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const {Schema} = mongoose;

const UserSchema = new Schema({
  'age': Number,
  'name': {
    type: String,
    trim: true,
    required: 'Please enter a name'
  },
  'type': {
    type: String,
    trim: true
  }
});

UserSchema.pre('save', function(next) {
  console.log('presave');
  if (!this.isModified('name')) {
    return next();
  }
  this.name = this.name.split(' ')
  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
  .join(' ');
  next();
})

module.exports = mongoose.model('User', UserSchema);
