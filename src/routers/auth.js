import { Router } from 'express';
import { validateBody } from '../utils/validateBody.js';
import { authRegisterSchema } from '../validation/auth.js';

const authRouter = Router();

authRouter.post('/register', validateBody(authRegisterSchema));

export default authRouter;
