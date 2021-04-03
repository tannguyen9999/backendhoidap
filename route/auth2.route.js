
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
    '/tmp/uploads',
    syncMiddleware(multer.single("picture")),
    syncMiddleware(authEndpoint.uploads)
);



export default router;  