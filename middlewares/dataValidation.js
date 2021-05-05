const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required()
      .custom((value, helper) => {
        if (validator.isEmail(value)) {
          return value;
        }
        return helper.message('Некорректный email');
      })
      .messages({ 'any.required': 'Обязательное поле' }),
    password: Joi.string().min(8).required()
      .messages({
        'string.min': 'Пароль должен быть не менее 8 символов',
        'any.required': 'Обязательное поле',
      }),
  }),
});

const createUserValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required()
      .custom((value, helper) => {
        if (!validator.isEmail(value)) {
          return helper.message('Некорректный email');
        }
        return value;
      })
      .messages({ 'any.required': 'Обязательное поле' }),
    password: Joi.string().min(8).required()
      .messages({
        'string.min': 'Пароль должен быть не менее 8 символов',
        'any.required': 'Обязательное поле',
      }),
    name: Joi.string().min(2).max(30)
      .messages({
        'string.min': 'Не менее 2-x символов',
        'string.max': 'Не более 30-x символов',
      }),
  }),
});

const createMovieValidation = celebrate({
  body: Joi.object().keys({
    nameEN: Joi.string().required()
      .messages({
        'any.required': 'Обязательное поле',
      }),
    nameRU: Joi.string().required()
      .messages({
        'any.required': 'Обязательное поле',
      }),
    movieId: Joi.number().required()
      .messages({
        'any.required': 'Обязательное поле',
      }),
    thumbnail: Joi.string().required()
      .custom((value, helper) => {
        if (!validator.isURL(value)) {
          return helper.message('Некорректный URL');
        }
        return value;
      }),
    trailer: Joi.string().required()
      .custom((value, helper) => {
        if (!validator.isURL(value)) {
          return helper.message('Некорректный URL');
        }
        return value;
      }),
    image: Joi.string().required()
      .custom((value, helper) => {
        if (!validator.isURL(value)) {
          return helper.message('Некорректный URL');
        }
        return value;
      }),
    description: Joi.string().required()
      .messages({
        'any.required': 'Обязательное поле',
      }),
    year: Joi.string().required()
      .messages({
        'any.required': 'Обязательное поле',
      }),
    duration: Joi.number().required()
      .messages({
        'any.required': 'Обязательное поле',
      }),
    director: Joi.string().required()
      .messages({
        'any.required': 'Обязательное поле',
      }),
    country: Joi.string().required()
      .messages({
        'any.required': 'Обязательное поле',
      }),
  }),
});

const updateUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30)
      .messages({
        'string.min': 'Не менее 2-x символов',
        'string.max': 'Не более 30-x символов',
      }),
    email: Joi.string().min(2).max(30)
      .messages({
        'string.min': 'Не менее 2-x символов',
        'string.max': 'Не более 30-x символов',
      }),
  }),
});

const deleteMovieValidation = celebrate({
  params: Joi.object().required().keys({
    _id: Joi.string().length(24).hex()
      .messages({
        'string.length': 'Длина должна составлять 24 символа',
      }),
  }),
});

module.exports = {
  updateUserValidation,
  createUserValidation,
  loginValidation,
  createMovieValidation,
  deleteMovieValidation,
};
