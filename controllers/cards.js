const cardModel = require('../models/card');
const errors = require('../errors/errors');

const getCards = (req, res) => {
  cardModel.find({})
    .then((cards) => {
      res.send(cards);
    })
    .catch(() => {
      res.status(errors.internal_error).send({ message: 'Внутренняя ошибка сервера' });
    });
};

const deleteCardById = (req, res) => {
  cardModel.findByIdAndRemove(req.params.cardId)
    .orFail(() => {
      throw new Error('Notfound');
    })
    .then(() => res.send({ message: 'Карточка удалена' }))
    .catch((err) => {
      if (err.message === 'Notfound') {
        res.status(errors.not_found).send({
          message: 'Карточка не найдена',
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

const createCard = (req, res) => {
  cardModel.create({
    name: req.body.name,
    link: req.body.link,
    owner: req.user._id,
  })
    .then((card) => {
      res.status(201).send(card);
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

const likeCard = (req, res) => {
  cardModel.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new Error('Notfound');
    })
    .then((card) => {
      res.send(card);
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

const dislikeCard = (req, res) => {
  cardModel.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new Error('Notfound');
    })
    .then((card) => {
      res.send(card);
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
  getCards,
  deleteCardById,
  createCard,
  likeCard,
  dislikeCard,
};
