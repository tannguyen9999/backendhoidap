
import express from 'express';
import * as postEndpoint from '../endpoint/post.endpoint';
import { validatorBody } from '../middleware/validator';
import { authenticate } from '../middleware/authenticate';
import * as postValidation from '../validation/post.validation';
import syncMiddleware from '../middleware/sync';

const router = express.Router();



router.post(
    '/',
    syncMiddleware(authenticate),
    syncMiddleware(validatorBody(postValidation.postDataSchema)),
    syncMiddleware(postEndpoint.postData)
);

router.get(
    '/',
    syncMiddleware(validatorBody(postValidation.getDataSchema)),
    syncMiddleware(postEndpoint.findPosts)
);

router.get(
    '/sitemap',
    syncMiddleware(postEndpoint.findPostsToSiteMap)
);

router.get(
    '/me',
    syncMiddleware(authenticate),
    syncMiddleware(validatorBody(postValidation.getDataSchema)),
    syncMiddleware(postEndpoint.findPostsOfme)
);

router.post(
    '/option',
    syncMiddleware(validatorBody(postValidation.getDataSByOptionchema)),
    syncMiddleware(postEndpoint.findPostsByOption)
);

router.post(
    '/search/',
    syncMiddleware(validatorBody(postValidation.getSearchSchema)),
    syncMiddleware(postEndpoint.searchPostByContent)
);
router.get(
    '/class',
    syncMiddleware(validatorBody(postValidation.getDataSByClasschema)),
    syncMiddleware(postEndpoint.findPostsByClass)
);
router.get(
    '/:postId/',
    syncMiddleware(postEndpoint.findPost)
);

router.get(
    '/crawl/:postId/',
    syncMiddleware(postEndpoint.crawlData)
);





export default router;  