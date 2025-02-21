import { z as zod } from "zod";

const loginValidationSchema = zod.object({
  email: zod
    .string({
      required_error: "Email is required",
    })
    .trim()
    .email(),
  password: zod
    .string({
      required_error: "Password is required",
    })
    .trim(),
});

const forgotPasswordValidationSchema = zod.object({
  email: zod
    .string({
      required_error: "Email is required",
    })
    .trim()
    .email(),
});

const resetPasswordValidationSchema = zod.object({
  password: zod
    .string({
      required_error: "password is required",
    })
    .trim(),
});

export const AuthValidation = {
  loginValidationSchema,
  forgotPasswordValidationSchema,
  resetPasswordValidationSchema,
};
