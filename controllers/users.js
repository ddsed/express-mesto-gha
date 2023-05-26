const userModel = require('../models/user');
const errors = require('../errors/errors');

const getUsers = (req, res) => {
  userModel.find({})
    .then((users) => {
      res.send(users);
    })
    .catch(() => {
      res.status(errors.internal_error).send({ message: 'Внутренняя ошибка сервера' });
    });
};

const getUserById = (req, res) => {
  userModel.findById(req.params.userId)
    .orFail(() => {
      throw new Error('Notfound');
    })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.message === 'Notfound') {
        res.status(errors.not_found).send({
          message: 'Пользователь не найден',
        });
      } else if (err.name === 'CastError' || 'ValidationError') {
        res.status(errors.bad_request).send({
          message: 'Переданы некорректные данные',
        });
      } else {
        res.status(errors.internal_error).send({
          message: 'Внутренняя ошибка сервера',
        });
      }
    });
};

const createUser = (req, res) => {
  userModel.create({
    name: req.body.name,
    about: req.body.about,
    avatar: req.body.avatar,
  })
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError' || 'ValidationError') {
        res.status(errors.bad_request).send({
          message: 'Переданы некорректные данные',
        });
      } else {
        res.status(errors.internal_error).send({
          message: 'Внутренняя ошибка сервера',
        });
      }
    });
};

const updateUser = (req, res) => {
  userModel.findByIdAndUpdate(req.user._id, req.body, { new: true, runValidators: true })
    .orFail(() => {
      throw new Error('Notfound');
    })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.message === 'Notfound') {
        res.status(errors.not_found).send({
          message: 'Пользователь не найден',
        });
      } else if (err.name === 'CastError' || 'ValidationError') {
        res.status(errors.bad_request).send({
          message: 'Переданы некорректные данные',
        });
      } else {
        res.status(errors.internal_error).send({
          message: 'Внутренняя ошибка сервера',
        });
      }
    });
};

const updateUserAvatar = (req, res) => {
  userModel.findByIdAndUpdate(req.user._id, req.body, { new: true, runValidators: true })
    .orFail(() => {
      throw new Error('Notfound');
    })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.message === 'Notfound') {
        res.status(errors.not_found).send({
          message: 'Пользователь не найден',
        });
      } else if (err.name === 'CastError' || 'ValidationError') {
        res.status(errors.bad_request).send({
          message: 'Переданы некорректные данные',
        });
      } else {
        res.status(errors.internal_error).send({
          message: 'Внутренняя ошибка сервера',
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
