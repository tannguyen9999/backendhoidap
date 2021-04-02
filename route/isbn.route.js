import express from "express";
import * as isbnEndpoint from "../endpoint/isbn.endpoint.js";
import { validatorBody, validatorParam } from "../middleware/validator";
import * as bookValidation from "../validation/book.validation";
import * as isbnValidation from "../validation/isbn.validation";
import { authenticate } from "../middleware/authenticate";
import syncMiddleware from '../middleware/sync';

const router = express.Router();

router.get(
  "/:id",
  syncMiddleware(validatorParam(isbnValidation.bookIdSchema)),
  syncMiddleware(isbnEndpoint.getIsbnById)
);

router.get("/", syncMiddleware(isbnEndpoint.getIsbns));

router.put(
  "/:id",
  syncMiddleware(authenticate),
  syncMiddleware(validatorParam(isbnValidation.bookIdSchema)),
  syncMiddleware(validatorBody(isbnValidation.updateSchema)),
  syncMiddleware(isbnEndpoint.updateIsbnById)
);

router.delete(
  "/:id",
  syncMiddleware(authenticate),
  syncMiddleware(validatorParam(isbnValidation.bookIdSchema)),
  syncMiddleware(isbnEndpoint.deleteIsbnById)
);

router.post(
  "/:id/books",
  syncMiddleware(validatorParam(isbnValidation.bookIdSchema)),
  syncMiddleware(validatorBody(bookValidation.createSchema)),
  syncMiddleware(isbnEndpoint.createBookById)
);

router.post(
  "/categoryname",
  
  syncMiddleware(isbnEndpoint.createIsbn)
);
router.get(
  "/:id/books",
  syncMiddleware(validatorParam(isbnValidation.bookIdSchema)),
  syncMiddleware(isbnEndpoint.getBooksById)
);

export default router;
