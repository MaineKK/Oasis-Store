const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

module.exports.register = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        return res.status(409).send({ message: 'Email already exists' });
      } else {
        const newUser = new User({
          username: req.body.username,
          email: req.body.email,
          password: req.body.password, 
          name: req.body.name,
          surname: req.body.surname,
          dateOfBirth: req.body.dateOfBirth,
          gender: req.body.gender,
          avatar: req.file ? req.file.path : null,
        });
        return newUser.save();
      }
    })
    .then(user => {
      res.status(201).send({ message: 'User created', userId: user._id });
    })
    .catch(error => {
      console.error('Error during the registration:', error);
      res.status(500).send({ error: error.message });
    });
};


  module.exports.login = (req, res, next) => {
    console.log('Login attempt for email:', req.body.email);
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          console.log('No user found for email:', req.body.email);
          return res.status(401).send({ message: 'Auth failed' });
        }
        user.checkPassword(req.body.password)
          .then(isMatch => {
            if (isMatch) {
              console.log('User authenticated:', user.email);
              req.session.userId = user._id; 
              res.status(200).send({ message: 'Logged in successfully', userId: user._id });
            } else {
              console.log('Password does not match for user:', user.email);
              return res.status(401).send({ message: 'Auth failed' });
            }
          })
          .catch(err => {
            console.error('Error during password comparison:', err);
            return res.status(500).send({ message: 'An error occurred during the login process' });
          });
      })
      .catch(err => {
        console.error('Error during login for email:', req.body.email, err);
        return res.status(500).send({ message: 'An error occurred during the login process' });
      });
  };
  
  module.exports.getProfile = (req, res, next) => {
    console.log('Iniciando función getProfile');
  
    const userId = req.session.userId;
  
    console.log('ID de usuario en la sesión:', userId);
  
    User.findById(userId)
      .then(user => {
  
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
  
        console.log('Enviando datos del perfil del usuario en la respuesta');
  
        res.json({
          id: user._id, 
          username: user.username,
          email: user.email,
          name: user.name,
          surname: user.surname,
          dateOfBirth: user.dateOfBirth,
          gender: user.gender,
          avatar: user.avatar,
          phone: user.phone,
          address: {
            street: user.address.street,
            cp: user.address.cp,
            city: user.address.city,
          },
        });
      })
      .catch(error => {
        console.error('Error al buscar el perfil del usuario:', error);
        res.status(500).json({ message: 'Error fetching user profile' });
      });
  };
  
 
module.exports.logout = (req, res) => {
 
  req.session.destroy(err => {
    if (err) {
      return res.status(500).send({ message: 'Could not log out, please try again' });
    } else {
      
      res.cookie('connect.sid', '', { expires: new Date(1), path: '/' });
      res.status(200).send({ message: 'Logged out successfully' });
    }
  });
};
