import express from 'express';
import bookRouter from './book.route';
import categoryRouter from './category.route';
import authRouter from './auth.route';
import isbnRouter from './isbn.route';
import testRouter from './auth2.route';


const router = express.Router();

router.use('/books', bookRouter);
router.use('/categories', categoryRouter);
router.use('/auth', authRouter);
router.use('/isbns',isbnRouter);
router.use('/test',testRouter);

export default router;