const { NODE_ENV, JWT_SECRET, DB_URL } = process.env;

const { PORT = 3000 } = process.env;

const tokenKey = NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret';

const MONGO_URL = NODE_ENV === 'production' ? DB_URL : 'mongodb://localhost:27017/bitfilmsdb';

module.exports = {
  tokenKey,
  MONGO_URL,
  PORT,
};
