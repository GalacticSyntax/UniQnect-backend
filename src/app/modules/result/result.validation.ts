import { z as zod } from "zod";

const createResultValidationSchema = zod.object({
  text: zod.string({
    required_error: "text is required",
    invalid_type_error: "text must be string",
  }),
  // .max(
  //   ResultConstant.Result_TEXT_MAX_LENGTH,
  //   `Result text max length is ${ResultConstant.Result_TEXT_MAX_LENGTH}`,
  // )
  // .min(
  //   ResultConstant.Result_TEXT_MIN_LENGTH,
  //   `Result text max length is ${ResultConstant.Result_TEXT_MIN_LENGTH}`,
  // ),
});

export const ResultValidation = {
  createResultValidationSchema,
};
