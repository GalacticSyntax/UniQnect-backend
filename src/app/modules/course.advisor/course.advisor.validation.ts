
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

export const advisorValidationSchema = z.object({
  departmentCode: z.string().trim().min(1, "Department code is required").toLowerCase(),
  session: z
    .string()
    .regex(/^(spring|summer|fall)-\d{4}$/i, "Session must be like fall-2025"),
  semester: z.number().int().positive("Semester must be a positive integer"),
  teacherId: z.string().min(1, "Teacher ID is required"),
  offeredCourses: z.array(z.string()).optional(),
});

export const CourseAdvisorValidation = {
  advisorValidationSchema
};
