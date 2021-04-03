import express from 'express';

import authRouter from './auth2.route';
import postRouter from './post.route';
import commentRouter from './comment.route';




const router = express.Router();

router.use('/auth',authRouter);
router.use('/post',postRouter);
router.use('/comment',commentRouter);



export default router;