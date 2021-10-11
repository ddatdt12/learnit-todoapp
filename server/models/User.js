const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Please enter username'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: [6, 'Please enter a password at least 6 characters'],
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      //This only works on SAVE and CREATE
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not the same!',
    },
  },
  createdAt: { type: Date, default: Date.now() },
});

UserSchema.pre('save', async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete confirmPassword field
  this.confirmPassword = undefined;
  next();
});

UserSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

module.exports = mongoose.model('User', UserSchema);
