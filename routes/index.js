const router = require('express').Router();
const userRouter = require('./users');
const cardRouter = require('./cards');
const { createUser, loginUser } = require('../controllers/users');
const auth = require('../middlewares/auth');

router.post('/signup', createUser);
router.post('/signin', loginUser);

router.use(auth);

router.use('/users', userRouter);
router.use('/cards', cardRouter);

module.exports = router;
