const mongoose = require('../database');
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String, require: true, unique: true, lowercase: true },
  password: { type: String, require: true, select: false },
  temporaryPass: { type: Boolean },
  createdAt: { type: Date, default: Date.now }
})

UserSchema.pre('save', async function (next) {
  const hash = bcrypt.hashSync(this.password, 10);
  this.password = hash;
  next();
})

UserSchema.pre('findOneAndUpdate', function(next) {
  const password = this.getUpdate().$set.password;
  if (!password) {
      return next();
  }
  try {
      const hash = bcrypt.hashSync(password, 10);
      this.getUpdate().$set.password = hash;
      this.temporaryPass = false;
      next();
  } catch (error) {
      return next(error);
  }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;