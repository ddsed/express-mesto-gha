const router = require('express').Router();
const cardsController = require('../controllers/cards');

router.get('/', cardsController.getCards);
router.delete('/:cardId', cardsController.deleteCardById);
router.post('/', cardsController.createCard);
router.put('/:cardId/likes', cardsController.likeCard);
router.delete('/:cardId/likes', cardsController.dislikeCard);

module.exports = router;
