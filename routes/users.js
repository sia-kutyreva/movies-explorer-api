const usersRouter = require('express').Router();

const {
  updateUserProfile,
  getUserProfile,
} = require('../controllers/users');

const {
  updateUserValidation,
} = require('../middlewares/dataValidation');

usersRouter.get('/me', getUserProfile);

usersRouter.patch('/me', updateUserValidation, updateUserProfile);

module.exports = usersRouter;
