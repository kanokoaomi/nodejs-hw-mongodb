import createHttpError from 'http-errors';
import { getSession, getUser } from '../services/auth.js';

export const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return next(createHttpError(401, 'Authorization header is not found'));
  }

  const [bearer, accessToken] = authorization.split(' ');
  if (bearer !== 'Bearer') {
    return next(createHttpError(401, 'Header must be Bearer type'));
  }

  const session = await getSession({ accessToken });
  if (!session) {
    return next(createHttpError(401, 'Session is not found'));
  }

  if (Date.now() > session.accessTokenValidUntil) {
    return next(createHttpError(401, 'Access token expired'));
  }

  const user = await getUser({ _id: session.userId });
  if (!user) {
    return next(createHttpError(401, 'User is not found'));
  }

  // додаємо в реквест поле user, щоб змогти дістати дані про користувача (типу айді)
  req.user = user;

  next();
};
