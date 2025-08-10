// const createCourseAdvisorValidationSchema = zod.object({
//   text: zod.string({
//     required_error: "text is required",
//     invalid_type_error: "text must be string",
//   }),
//   .max(
//     DummyConstant.DUMMY_TEXT_MAX_LENGTH,
//     `dummy text max length is ${DummyConstant.DUMMY_TEXT_MAX_LENGTH}`,
//   )
//   .min(
//     DummyConstant.DUMMY_TEXT_MIN_LENGTH,
//     `dummy text max length is ${DummyConstant.DUMMY_TEXT_MIN_LENGTH}`,
//   ),
// });

import { z } from "zod";

export const departmentHeadValidationSchema = z.object({
  departmentCode: z
    .string()
    .trim()
    .min(1, "Department code is required")
    .toLowerCase(),
  teacherId: z.string().min(1, "Teacher ID is required"),
});

export const departmentHeadValidation = {
  departmentHeadValidationSchema,
};
