
import express from 'express';
import * as authEndpoint from '../endpoint/userr.endpoint';
import { validatorBody } from '../middleware/validator';
import { authenticate } from '../middleware/authenticate';
import * as userValidation from '../validation/userr.validation';
import syncMiddleware from '../middleware/sync';
import multer from '../utils/multer';

const router = express.Router();



router.post(
    '/register',
    syncMiddleware(validatorBody(userValidation.registerSchema)),
    syncMiddleware(authEndpoint.register)
);

router.post(
    '/login',
    syncMiddleware(validatorBody(userValidation.loginSchema)),
    syncMiddleware(authEndpoint.login)
);
router.put(
    '/change-password',
    syncMiddleware(authenticate),
    syncMiddleware(validatorBody(userValidation.changePasswordSchema)),
    syncMiddleware(authEndpoint.changePassword)
);

router.put(
    '/updateAvatar',
    syncMiddleware(authenticate),
    syncMiddleware(multer.single("avatar")),
    syncMiddleware(authEndpoint.updateAvatar)
);

router.post(
    '/upload',
    syncMiddleware(authenticate),
    syncMiddleware(multer.single("picture")),
    syncMiddleware(authEndpoint.upload)
);



export default router;  