import * as authServices from '../services/auth.js';

export const registerController = async (req, res) => {
  const data = await authServices.register(req.body);
  // console.log(data);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: {
      username: data.username,
      email: data.email,
    },
  });
};

export const loginController = async (req, res) => {
  const session = await authServices.login(req.body);
  console.log(session);

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });

  res.json({
    status: 200,
    message: 'Successfully logged in a user!',
    data: {
      accessToken: session.accessToken,
    },
  });
};
