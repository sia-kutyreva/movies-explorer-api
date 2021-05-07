const appRouter = require('express').Router();

const NotFoundError = require('../errors/not-found-err');

const usersRoutes = require('./users');
const moviesRoutes = require('./movies');
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');
const {
  createUserValidation,
  loginValidation,
} = require('../middlewares/dataValidation');

appRouter.post('/signup', createUserValidation, createUser);

appRouter.post('/signin', loginValidation, login);

appRouter.use(auth);

appRouter.use('/users', usersRoutes);

appRouter.use('/movies', moviesRoutes);

appRouter.use('/*', () => {
  throw new NotFoundError('Запрашиваемый ресур не найден');
});

module.exports = appRouter;
