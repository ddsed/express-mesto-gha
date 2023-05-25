const userModel = require('../models/user');

const getUsers = (req, res) => {
  userModel.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({
          message: 'Переданы некорректные данные',
          err: err.message,
          stack: err.stack,
        });
      } else {
        res.status(500).send({
          message: 'Внутренняя ошибка сервера',
          err: err.message,
          stack: err.stack,
        });
      }
    });
};

const getUserById = (req, res) => {
  userModel.findById(req.params.userId)
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        res.status(404).send({
          message: 'Пользователь не найден',
          err: err.message,
          stack: err.stack,
        });
      } else if (err.name === 'CastError' || 'ValidationError') {
        res.status(400).send({
          message: 'Переданы некорректные данные',
          err: err.message,
          stack: err.stack,
        });
      } else {
        res.status(500).send({
          message: 'Внутренняя ошибка сервера',
          err: err.message,
          stack: err.stack,
        });
      }
    });
};

const createUser = (req, res) => {
  userModel.create(req.body)
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError' || 'ValidationError') {
        res.status(400).send({
          message: 'Переданы некорректные данные',
          err: err.message,
          stack: err.stack,
        });
      } else {
        res.status(500).send({
          message: 'Внутренняя ошибка сервера',
          err: err.message,
          stack: err.stack,
        });
      }
    });
};

const updateUser = (req, res) => {
  userModel.findByIdAndUpdate(req.user._id, req.body, { new: true, runValidators: true })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError' || 'ValidationError') {
        res.status(400).send({
          message: 'Переданы некорректные данные',
          err: err.message,
          stack: err.stack,
        });
      } else if (err.name === 'DocumentNotFoundError') {
        res.status(404).send({
          message: 'Пользователь не найден',
          err: err.message,
          stack: err.stack,
        });
      } else {
        res.status(500).send({
          message: 'Внутренняя ошибка сервера',
          err: err.message,
          stack: err.stack,
        });
      }
    });
};

const updateUserAvatar = (req, res) => {
  userModel.findByIdAndUpdate(req.user._id, req.body, { new: true, runValidators: true })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError' || 'ValidationError') {
        res.status(400).send({
          message: 'Переданы некорректные данные',
          err: err.message,
          stack: err.stack,
        });
      } else if (err.name === 'DocumentNotFoundError') {
        res.status(404).send({
          message: 'Пользователь не найден',
          err: err.message,
          stack: err.stack,
        });
      } else {
        res.status(500).send({
          message: 'Внутренняя ошибка сервера',
          err: err.message,
          stack: err.stack,
        });
      }
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateUserAvatar,
};
