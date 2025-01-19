import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import { UserCollection } from '../db/models/user.js';
import { SessionCollection } from '../db/models/session.js';
import { randomBytes } from 'crypto';
import {
  accessTokenLifetime,
  refreshTokenLifetime,
} from '../constants/user.js';

const createSessionData = () => ({
  accessToken: randomBytes(30).toString('base64'),
  refreshToken: randomBytes(30).toString('base64'),
  accessTokenValidUntil: Date.now() + accessTokenLifetime,
  refreshTokenValidUntil: Date.now() + refreshTokenLifetime,
});

export const register = async (payload) => {
  const { email, password } = payload;
  const user = await UserCollection.findOne({ email });
  // чи є юзер?
  if (user) {
    throw createHttpError(409, 'Email in use');
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await UserCollection.create({
    ...payload,
    password: hashPassword,
  });
  return newUser;
};

export const login = async ({ email, password }) => {
  const user = await UserCollection.findOne({ email });
  if (!user) {
    throw createHttpError(401, 'User is not found');
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw createHttpError(401, 'User is not found');
  }

  // це для того, щоб видаляти сесію, якщо користувач заходить ще раз з іншого пристрою
  await SessionCollection.deleteOne({ userId: user._id });

  const sessionData = createSessionData();
  return SessionCollection.create({
    userId: user._id,
    ...sessionData,
  });
};

export const logout = async (sessionId) => {
  await SessionCollection.deleteOne({ _id: sessionId });
};

export const refreshToken = async ({ refreshToken, sessionId }) => {
  const oldSession = await SessionCollection.findOne({
    refreshToken,
    _id: sessionId,
  });
  // const user = await UserCollection.findOne({ email });

  if (!oldSession) {
    throw createHttpError(401, 'Session is not found');
  }
  if (Date.now > refreshTokenLifetime) {
    throw createHttpError(401, 'Refresh token is expired');
  }

  await SessionCollection.findOneAndDelete({ _id: sessionId });

  const sessionData = createSessionData();

  return SessionCollection.create({
    userId: oldSession.userId,
    ...sessionData,
  });
};

export const getUser = (filter) => UserCollection.findOne(filter);

export const getSession = (filter) => SessionCollection.findOne(filter);
