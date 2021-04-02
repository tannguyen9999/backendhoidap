import express from 'express';
import * as bookEndpoint from '../endpoint/book.endpoint';
import { validatorBody, validatorParam } from '../middleware/validator';
import bookValidation from '../validation/book.validation';
import { authenticate } from '../middleware/authenticate';
import syncMiddleware from '../middleware/sync';

const router = express.Router();
 

router.put(
    '/:id',
    syncMiddleware(authenticate),
    syncMiddleware(validatorParam(bookValidation.bookIdSchema)),
    syncMiddleware(validatorBody(bookValidation.updateSchema)),
    syncMiddleware(bookEndpoint.updateBookById)
);

router.delete(
    '/:id',
    syncMiddleware(authenticate),
    syncMiddleware(validatorParam(bookValidation.bookIdSchema)),
    syncMiddleware(bookEndpoint.deleteBookById)
);

router.get('/:id', syncMiddleware(bookEndpoint.getBookById));

router.get('/', syncMiddleware(bookEndpoint.getBooks));

export default router;
