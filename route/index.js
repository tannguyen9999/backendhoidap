import express from 'express';
import bookRouter from './book.route';
import categoryRouter from './category.route';
import authRouter from './auth.route';
import isbnRouter from './isbn.route';
import testRouter from './auth2.route';
import postRouter from './post.route';
import commentRouter from './comment.route';




const router = express.Router();

router.use('/books', bookRouter);
router.use('/categories', categoryRouter);
router.use('/auth', authRouter);
router.use('/isbns',isbnRouter);
router.use('/api/auth',testRouter);
router.use('/api/post',postRouter);
router.use('/api/comment',commentRouter);



export default router;