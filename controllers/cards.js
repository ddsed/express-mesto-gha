const cardModel = require('../models/card');
// const errors = require('../errors/errors');

const BadRequestError = require('../errors/bad-request');
const NotFoundError = require('../errors/not-found');
const UnauthorizedError = require('../errors/unauthorized');

const getCards = (req, res, next) => {
  cardModel.find({})
    .then((cards) => {
      res.send(cards);
    })
    .catch(next);
};

const deleteCardById = (req, res, next) => {
  cardModel.findById(req.params.cardId)
    .orFail(() => {
      throw new Error('Notfound');
    })
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        throw new UnauthorizedError('У вас нет прав на удаление данной карточки');
      }
      cardModel.findByIdAndRemove(req.params.cardId)
        .then(() => res.send({ message: 'Карточка удалена' }))
        .catch(next);
    })
    .catch((err) => {
      if (err.message === 'Notfound') {
        next(new NotFoundError('Карточка не найдена'));
      } else if (err.name === 'CastError' || 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

const createCard = (req, res, next) => {
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
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

const likeCard = (req, res, next) => {
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
        next(new NotFoundError('Карточка не найдена'));
      } else if (err.name === 'CastError' || 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

const dislikeCard = (req, res, next) => {
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
        next(new NotFoundError('Карточка не найдена'));
      } else if (err.name === 'CastError' || 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(err);
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
