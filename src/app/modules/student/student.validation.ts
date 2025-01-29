import { z as zod } from "zod";

const createStudentValidationSchema = zod.object({
  text: zod.string({
    required_error: "text is required",
    invalid_type_error: "text must be string",
  }),
  // .max(
  //   StudentConstant.Student_TEXT_MAX_LENGTH,
  //   `Student text max length is ${StudentConstant.Student_TEXT_MAX_LENGTH}`,
  // )
  // .min(
  //   StudentConstant.Student_TEXT_MIN_LENGTH,
  //   `Student text max length is ${StudentConstant.Student_TEXT_MIN_LENGTH}`,
  // ),
});

export const StudentValidation = {
  createStudentValidationSchema,
};
