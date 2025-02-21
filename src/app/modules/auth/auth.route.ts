import express from "express";
import { validateRequest } from "../../middlewares/validate.request";
import { AuthValidation } from "./auth.validation";
import { AuthController } from "./auth.controller";
import getLoggedInUser from "../../middlewares/get.loggedin.user";
import checkUserAuthStatus from "../../middlewares/check.user.auth.status";

const router = express.Router();

/**
 * Main auth
 * ***/
router.post(
  "/login",
  validateRequest(AuthValidation.loginValidationSchema),
  checkUserAuthStatus,
  AuthController.loginUser,
);

router.get(
  "/logout",
  checkUserAuthStatus,
  getLoggedInUser,
  AuthController.logoutUser,
);

/**
 * Email verification
 * ***/
// router.get(
//   "/emailVerifyRequest",
//   getLoggedInUser,
//   AuthController.emailVerifyRequest,
// );

// router.get("/verifyEmail", readVerifyEmailToken, AuthController.verifyEmail);

/**
 * forget password
 * ***/
// router.post(
//   "/forgotPassword",
//   validateRequest(AuthValidation.forgotPasswordValidationSchema),
//   AuthController.forgotPassword,
// );

// router.post(
//   "/resetPassword",
//   readForgetPasswordToken,
//   validateRequest(AuthValidation.resetPasswordValidationSchema),
//   AuthController.resetPassword,
// );

export const AuthRoutes = router;
