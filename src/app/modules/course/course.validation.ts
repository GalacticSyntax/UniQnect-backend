import { z } from "zod"

export const createCourseValidationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  code: z.string().min(1, "Code is required"),
  credit: z.number().positive("Credit must be a positive number"),
  depart: z.string().min(1, "Department is required"),
  prerequisiteCourse: z.array(z.string().min(1, "Course code is required"))
});

export const CourseValidation = {
  createCourseValidationSchema,
};