import express from 'express';
import * as category from '../endpoint/category.endpoint.js';
import { validatorBody, validatorParam } from '../middleware/validator';
import isbnValidation from '../validation/isbn.validation';
import categoryValidation from '../validation/category.validation';
import { authenticate } from '../middleware/authenticate';
import syncMiddleware from '../middleware/sync';

const router = express.Router();

router.get('/', syncMiddleware(category.getCategories));

router.post(
    '/',
    syncMiddleware(authenticate),
    syncMiddleware(validatorBody(categoryValidation.createSchema)),
    syncMiddleware(category.createCategory)
);

router.put(
    '/:id',
    syncMiddleware(authenticate),
    syncMiddleware(validatorParam(categoryValidation.categoryIdSchema)),
    syncMiddleware(validatorBody(categoryValidation.updateSchema)),
    syncMiddleware(category.updateCategory)
);
router.delete(
    '/:id',
    syncMiddleware(authenticate),
    syncMiddleware(validatorParam(categoryValidation.categoryIdSchema)),
    syncMiddleware(category.deleteCategory)
);

router.get(
    '/:id',
    syncMiddleware(validatorParam(categoryValidation.categoryIdSchema)),
    syncMiddleware(category.getCategoryById)
);
router.post(
    '/:id/isbns',
    syncMiddleware(validatorParam(categoryValidation.categoryIdSchema)),
    syncMiddleware(validatorBody(isbnValidation.createSchema)),
    syncMiddleware(category.createIsbnById)
);
router.get(
    '/:id/isbns',
    syncMiddleware(validatorParam(categoryValidation.categoryIdSchema)),
    syncMiddleware(category.getIsbnsById)
);
router.get(
    "/name/:name",
    syncMiddleware(category.getCategoryByName)
);
export default router;  