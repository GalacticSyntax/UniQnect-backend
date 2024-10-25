import { DummyValidation } from "./dummy.validation";
import express from "express";
import { validateRequest } from "../../middlewares/validate.request";
import { DummyController } from "./dummy.controller";

const router = express.Router();

// create post
router.post(
  "/",
  /*
   *
   * These will need when req body contains any file or body is a form data
   *
   * // PostMiddleware.createOrUpdatePostImages,
   * // readReqBodyFiles
   * // PostMiddleware.matchReqBodyFilesWithValidationSchema,
   *
   */

  validateRequest(DummyValidation.createDummyValidationSchema),
  DummyController.createDummy,
);

export const DummyRoutes = router;
