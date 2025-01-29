import { z as zod } from "zod";

const createUserValidationSchema = zod.object({
  text: zod.string({
    required_error: "text is required",
    invalid_type_error: "text must be string",
  }),
  // .max(
  //   UserConstant.User_TEXT_MAX_LENGTH,
  //   `User text max length is ${UserConstant.User_TEXT_MAX_LENGTH}`,
  // )
  // .min(
  //   UserConstant.User_TEXT_MIN_LENGTH,
  //   `User text max length is ${UserConstant.User_TEXT_MIN_LENGTH}`,
  // ),
});

export const UserValidation = {
  createUserValidationSchema,
};
