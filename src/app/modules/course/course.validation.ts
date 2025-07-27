import { z } from "zod"

const createCourseValidationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  code: z.string().min(1, "Code is required"),
  credit: z.number().positive("Credit must be a positive number"),
  depart: z.string().min(1, "Department is required"),
  prerequisiteCourse: z
    .array(z.string())
    .optional()
    .default([]),
});


const createManyCoursesValidationSchema = z.array(createCourseValidationSchema);


export const CourseValidation = {
  createCourseValidationSchema,
  createManyCoursesValidationSchema,
};