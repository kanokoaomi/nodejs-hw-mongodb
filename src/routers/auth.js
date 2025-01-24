import { Router } from 'express';
import { validateBody } from '../utils/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  authRegisterSchema,
  requestResetEmailSchema,
  resetPasswordSchema,
} from '../validation/auth.js';
import {
  loginController,
  logoutController,
  refrechTokenController,
  registerController,
  requestResetEmailController,
  resetPasswordController,
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

authRouter.post(
  '/send-reset-email',
  ctrlWrapper(requestResetEmailController),
  validateBody(requestResetEmailSchema),
);

authRouter.post(
  '/reset-pwd',
  validateBody(resetPasswordSchema),
  ctrlWrapper(resetPasswordController),
);

export default authRouter;
