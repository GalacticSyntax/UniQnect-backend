import { z as zod } from "zod";

const createSchoolValidationSchema = zod.object({
  text: zod.string({
    required_error: "text is required",
    invalid_type_error: "text must be string",
  }),
  // .max(
  //   SchoolConstant.School_TEXT_MAX_LENGTH,
  //   `School text max length is ${SchoolConstant.School_TEXT_MAX_LENGTH}`,
  // )
  // .min(
  //   SchoolConstant.School_TEXT_MIN_LENGTH,
  //   `School text max length is ${SchoolConstant.School_TEXT_MIN_LENGTH}`,
  // ),
});

export const SchoolValidation = {
  createSchoolValidationSchema,
};
