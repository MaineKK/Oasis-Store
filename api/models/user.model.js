const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const WORK_FACTOR = 10;

EMAIL_PATTERN = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: 'User email is required',
    lowercase: true,
    trim: true,
    match: [EMAIL_PATTERN, 'Invalid email format'],
  },
  password: {
    type: String,
    required: 'User password is required',
    minLength: [6, 'User password needs at least 6 chars']
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  surname: {
    type: String,
    required: [true, 'Surname is required'],
  },
  phone: {
    type: String,
  },
  
  address: {
    street: {
      type: String,
    },
    cp: {
      type: String,
    },
    city: {
      type: String,
    },
  },
  
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
  },
  avatar: {
    type: String,
  },

  
}, {
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      ret.id = doc._id;

      if (ret.avatar) {
        ret.avatar = `http://localhost:3000/${ret.avatar.replace("public/", "")}`;
      }
      
        delete ret._id;
        delete ret.__v;
        delete ret.password;
        return ret;
    },
  },
});



userSchema.pre('save', function(next) {
  const user = this;

  if (user.isModified('password')) {
    bcrypt.hash(user.password, WORK_FACTOR)
      .then((hash) => {
        user.password = hash;
        next();
      })
      .catch((error) => next(error))
  } else {
    next();
  }
});



userSchema.methods.checkPassword = function(password) {
  return bcrypt.compare(password, this.password);
};




const User = mongoose.model('User', userSchema);
module.exports = User;
