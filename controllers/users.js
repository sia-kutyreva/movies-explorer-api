const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const ConflictError = require('../errors/conflict-err');
const BadRequestError = require('../errors/bad-request-err');

const { SALT_ROUNDS, tokenStorageTime, messages } = require('../utils/constants');
const { tokenKey } = require('../utils/configs');

const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ConflictError(messages.conflictEmail);
      }
      return bcrypt.hash(password, SALT_ROUNDS)
        .then((hash) => User.create({
          name,
          email,
          password: hash,
        })
          .then((data) => {
            res.status(200).send({ email: data.email });
          })
          .catch(next));
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, tokenKey, { expiresIn: tokenStorageTime });
      res.status(200).send({ token });
    })
    .catch(next);
};

const getUserProfile = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(messages.notFoundUser);
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError(messages.invalidUserId);
      }
      return next(err);
    })
    .catch(next);
};

const updateUserProfile = (req, res, next) => {
  const id = req.user._id;
  const { email, name } = req.body;
  User.findByIdAndUpdate(id, { email, name }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError(messages.notFoundUser);
      } else {
        res.status(200).send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError(messages.invalidUserData);
      } else if (err.name === 'CastError') {
        throw new BadRequestError(messages.invalidUserId);
      } else if (err.codeName === 'DuplicateKey') {
        throw new ConflictError(messages.conflictEmail);
      }
      return next(err);
    })
    .catch(next);
};

module.exports = {
  createUser,
  updateUserProfile,
  getUserProfile,
  login,
};
