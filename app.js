/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/index');

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');
const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: '646e49ef3e22b47a496a96b6',
  };

  next();
});
app.use(router);
app.use((req, res) => {
  res
    .status(404)
    .send({ message: 'Данный URL не существует' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
