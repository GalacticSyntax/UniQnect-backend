import { z } from "zod";

const createDepartmentHeadSchema = z.object({
  departmentCode: z.string().min(1, "Department code is required"),
  teacherId: z.string().min(1, "Teacher ID is required"),
});

const updateDepartmentHeadSchema = z.object({
  departmentCode: z.string().min(1, "Department code is required").optional(),
  teacherId: z.string().min(1, "Teacher ID is required").optional(),
});

export const DepartmentHeadValidation = {
  createDepartmentHeadSchema,
  updateDepartmentHeadSchema,
};
