
import express from 'express';
import * as authEndpoint from '../endpoint/auth.endpoint.js';
import { validatorBody } from '../middleware/validator';
import { authenticate } from '../middleware/authenticate';
import * as userValidation from '../validation/user.validation.js';
import syncMiddleware from '../middleware/sync';

const router = express.Router();

router.post(
    '/login',
    syncMiddleware(validatorBody(userValidation.loginSchema)),
    syncMiddleware(authEndpoint.login)
);

router.post(
    '/register',
    syncMiddleware(validatorBody(userValidation.registerSchema)),
    syncMiddleware(authEndpoint.register)
);

router.put(
    '/change-password',
    syncMiddleware(authenticate),
    syncMiddleware(validatorBody(userValidation.changePasswordSchema)),
    syncMiddleware(authEndpoint.changePassword)
);

router.get(
    '/verify-token',
    syncMiddleware(authenticate),
    syncMiddleware(authEndpoint.verifyToken)    
)

export default router;  