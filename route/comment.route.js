
import express from 'express';
import * as commentEndpoint from '../endpoint/comment.endpoint';
import { validatorBody } from '../middleware/validator';
import { authenticate } from '../middleware/authenticate';
import * as commentValidation from '../validation/comment.validation';
import syncMiddleware from '../middleware/sync';

const router = express.Router();



router.post(
    '/',
    syncMiddleware(authenticate),
    syncMiddleware(validatorBody(commentValidation.postDataSchema)),
    syncMiddleware(commentEndpoint.postData)
);

router.get(
    '/:postId/',
    syncMiddleware(commentEndpoint.getDataByPostId)
);

router.get(
    '/me',
    syncMiddleware(authenticate),
    syncMiddleware(commentEndpoint.getDataOfme)
);







export default router;  