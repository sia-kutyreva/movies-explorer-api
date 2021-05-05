const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const ConflictError = require('../errors/conflict-err');

const { SALT_ROUNDS, tokenStorageTime } = require('../utils/constants');
const { tokenKey } = require('../utils/configs');

const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ConflictError('Пользователь с таким email уже существует');
      }
      return bcrypt.hash(password, SALT_ROUNDS)
        .then((hash) => User.create({
          name,
          email,
          password: hash,
        })
          .then((data) => {
            const token = jwt.sign({ _id: data._id }, tokenKey, { expiresIn: tokenStorageTime });
            res.status(200).send({ email: data.email, token });
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
      res.send({ token });
    })
    .catch(next);
};

const getUserProfile = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь по указанному _id не найден');
      }
      res.status(200).send(user);
    })
    .catch(next);
};

const updateUserProfile = (req, res, next) => {
  const id = req.user._id;
  const { name, email } = req.body;
  User.findByIdAndUpdate(id, { name, email }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь по указанному _id не найден');
      }
      res.status(200).send(user);
    })
    .catch(next);
};

module.exports = {
  createUser,
  updateUserProfile,
  getUserProfile,
  login,
};
