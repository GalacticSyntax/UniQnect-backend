import { z } from "zod"

// const createCourseValidationSchema = z.object({
//   name: z.string().min(1, "Name is required"),
//   code: z.string().min(1, "Code is required"),
//   credit: z.number().positive("Credit must be a positive number"),
//   depart: z.string().min(1, "Department is required"),
//   prerequisiteCourse: z
//     .array(z.string())
//     .optional()
//     .default([]),
// });

const normalizeTrim = (val: string) => val.trim().toLowerCase();
const normalizeNoSpace = (val: string) => val.replace(/\s+/g, "").toLowerCase();

const createCourseValidationSchema = z.object({
  name: z.string().min(1, "Name is required").transform(normalizeTrim),
  code: z.string().min(1, "Code is required").transform(normalizeNoSpace),
  credit: z.number().positive("Credit must be a positive number"),
  depart: z.string().min(1, "Department is required").transform(normalizeTrim),
  prerequisiteCourse: z
    .array(z.string().transform(normalizeNoSpace))
    .optional()
    .default([]),
});


const createManyCoursesValidationSchema = z.array(createCourseValidationSchema);


export const CourseValidation = {
  createCourseValidationSchema,
  createManyCoursesValidationSchema,
};