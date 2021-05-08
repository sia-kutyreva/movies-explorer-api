const tokenStorageTime = '7d';

const SALT_ROUNDS = 10;

const messages = {
  conflictEmail: 'Пользователь с таким email уже существует',
  notFoundUser: 'Пользователь по указанному _id не найден',
  incorrectDataMovie: 'Переданы некорректные данные при создании фильма',
  notFoundMovie: 'Фильм с указанным _id не найден',
  noRightsToDelete: 'Нет прав для удаления фильма',
  successDelete: 'Фильм удален',
  incorrectIdMovie: 'Некорректный _id фильма',
  authRequired: 'Необходима авторизация',
  serverError: 'На сервере произошла ошибка',
  limiterError: 'Too many accounts created from this IP, please try again after an hour',
  nonAuthError: 'Неправильные почта или пароль',
  incorrectURL: 'Некорректный URL',
  incorrectEmail: 'Некорректный Email',
  invalidUserId: 'Невалидный _id пользователя',
  invalidUserData: 'Невалидные данные пользователя',
};

module.exports = {
  tokenStorageTime,
  SALT_ROUNDS,
  messages,
};
