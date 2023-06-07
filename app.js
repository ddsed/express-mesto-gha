/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/index');
const errors = require('./errors/errors');
const errorHandler = require('./middlewares/errorHandler');

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');
const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());
app.use(router);
app.use(errorHandler);
app.use((req, res) => {
  res
    .status(errors.not_found)
    .send({ message: 'Данный URL не существует' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
