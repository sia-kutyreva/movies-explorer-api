require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const { errors } = require('celebrate');

const limiter = require('./middlewares/limiter');
const { errorLogger, requestLogger } = require('./middlewares/logger');
const appRouter = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');
const { MONGO_URL, PORT } = require('./utils/configs');

const app = express();

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.options('*', cors());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'DELETE,GET,HEAD,PUT,PATCH,POST');
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.use(limiter);
app.use(helmet());

app.use('/', appRouter);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT);
