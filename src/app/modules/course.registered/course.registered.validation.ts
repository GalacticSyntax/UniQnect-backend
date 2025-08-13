import { z } from "zod";

// export const registeredCourseValidationSchema = z.object({
//   studentId: z.string().trim().min(1, "Student ID is required"),
//   courseList: z
//     .array(z.string().trim().min(1, "Course ID is required"))
//     .nonempty("At least one course is required"),
// });

export const courseRegistrationValidation = z.object({
  studentId: z.string().min(1, "Student ID is required"),
  courseId: z
    .array(z.string().min(1, "Course ID is required"))
    .min(1, "At least one Course ID is required"),
});

export type CourseRegistrationBody = {
  studentId: string;
  courseId: Array<string>;
};


export const RegisteredCourseValidation = {
  // registeredCourseValidationSchema,
};
