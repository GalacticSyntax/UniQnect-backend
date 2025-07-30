import { z as zod } from "zod";

// const createCourseOfferedValidationSchema = zod.object({
//   text: zod.string({
//     required_error: "text is required",
//     invalid_type_error: "text must be string",
//   }),
//   // .max(
//   //   DummyConstant.DUMMY_TEXT_MAX_LENGTH,
//   //   `dummy text max length is ${DummyConstant.DUMMY_TEXT_MAX_LENGTH}`,
//   // )
//   // .min(
//   //   DummyConstant.DUMMY_TEXT_MIN_LENGTH,
//   //   `dummy text max length is ${DummyConstant.DUMMY_TEXT_MIN_LENGTH}`,
//   // ),
// });



const createCourseOfferedValidationSchema = zod.object({
  courseId: zod.string({ required_error: "Course ID is required" }),
  runningSession: zod.string({ required_error: "Running session is required" }),
  courseAdvisor: zod.string({ required_error: "Course advisor is required" }),
  teacherId: zod.string({ required_error: "Teacher ID is required" }),
});


export const CourseOfferedValidation = {
  createCourseOfferedValidationSchema,
};
