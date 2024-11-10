import { z as zod } from "zod";

const createCourseAdvisorValidationSchema = zod.object({
  text: zod.string({
    required_error: "text is required",
    invalid_type_error: "text must be string",
  }),
  // .max(
  //   DummyConstant.DUMMY_TEXT_MAX_LENGTH,
  //   `dummy text max length is ${DummyConstant.DUMMY_TEXT_MAX_LENGTH}`,
  // )
  // .min(
  //   DummyConstant.DUMMY_TEXT_MIN_LENGTH,
  //   `dummy text max length is ${DummyConstant.DUMMY_TEXT_MIN_LENGTH}`,
  // ),
});

export const CourseAdvisorValidation = {
  createCourseAdvisorValidationSchema,
};
