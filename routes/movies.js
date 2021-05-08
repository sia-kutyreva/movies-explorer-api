const movieRouter = require('express').Router();

const {
  getMoviesInfo,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

const {
  createMovieValidation,
  deleteMovieValidation,
} = require('../middlewares/dataValidation');

movieRouter.get('/', getMoviesInfo);

movieRouter.post('/', createMovieValidation, createMovie);

movieRouter.delete('/:_id', deleteMovieValidation, deleteMovie);

module.exports = movieRouter;
