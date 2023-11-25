const User = require("../models/user.model");
const createError = require("http-errors");

module.exports.isAuthenticated = (req, res, next) => {
  if (req.session && req.session.userId) {
    User.findById(req.session.userId)
      .then(user => {
        if (!user) {
          return next(createError(401, "Unauthorized"));
        }
        req.user = user;
        next();
      })
      .catch(err => {
        next(createError(500, "Server Error"));
      });
  } else {
    next(createError(401, "Unauthorized"));
  }
};

