const jwtAuth = require('../utils/jwtAuth');
const errors = require('../errors/errors');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(errors.unauthorized).send({ message: 'Требуется авторизация' });
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwtAuth.checkToken(token);
  } catch (err) {
    return res.status(errors.unauthorized).send({ message: 'Требуется авторизация' });
  }
  req.user = payload;
  return next();
};
