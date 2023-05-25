const cardModel = require('../models/card');

const getCards = (req, res) => {
  cardModel.find({})
    .then((cards) => {
      res.send(cards);
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

const deleteCardById = (req, res) => {
  cardModel.findByIdAndRemove(req.params.cardId)
    .orFail(() => {
      throw new Error('CardNotfound');
    })
    .then(() => res.send({ message: 'Карточка удалена' }))
    .catch((err) => {
      if (err.name === 'CastError' || 'ValidationError') {
        res.status(400).send({
          message: 'Переданы некорректные данные',
          err: err.message,
          stack: err.stack,
        });
      } else if (err.name === 'DocumentNotFoundError') {
        res.status(404).send({
          message: 'Карточка не найдена',
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

const createCard = (req, res) => {
  cardModel.create({
    ...req.body,
    owner: req.user._id,
  })
    .then((card) => {
      res.status(201).send(card);
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

const likeCard = (req, res) => {
  cardModel.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new Error('CardNotfound');
    })
    .then((card) => {
      res.send(card);
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

const dislikeCard = (req, res) => {
  cardModel.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new Error('CardNotfound');
    })
    .then((card) => {
      res.send(card);
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
  getCards,
  deleteCardById,
  createCard,
  likeCard,
  dislikeCard,
};
