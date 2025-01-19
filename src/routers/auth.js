import { Router } from 'express';
import { validateBody } from '../utils/validateBody.js';
import { authRegisterSchema } from '../validation/auth.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  loginController,
  logoutController,
  refrechTokenController,
  registerController,
} from '../controllers/auth.js';

const authRouter = Router();

authRouter.post(
  '/register',
  ctrlWrapper(registerController),
  validateBody(authRegisterSchema),
);

authRouter.post(
  '/login',
  ctrlWrapper(loginController),
  validateBody(authRegisterSchema),
);

authRouter.post('/refresh', ctrlWrapper(refrechTokenController));

authRouter.post('/logout', ctrlWrapper(logoutController));

export default authRouter;
