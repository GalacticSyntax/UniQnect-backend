import { z as zod } from "zod";

const createUserValidationSchema = zod.object({
  fullName: zod.string().min(1, "Full name is required").trim(),
  email: zod.string().email("Invalid email format").trim(),
  password: zod
    .string()
    .min(6, "Password must be at least 6 characters")
    .trim()
    .optional(),
  isVerified: zod.boolean().optional().default(false),
  image: zod.string().url("Invalid image URL").trim().optional(),
  role: zod.string().default("student"),
  phone: zod
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .trim()
    .optional(),
  gender: zod.enum(["male", "female"], {
    message: "Gender must be 'male' or 'female'",
  }),
  presentAddress: zod.string().trim().optional(),
  permanentAddress: zod.string().trim().optional(),
  teacherId: zod.string().trim().optional(),
  studentId: zod.string().trim().optional(),
  designation: zod.string().trim().optional(),
  departmentId: zod.string().trim().optional(),
  // .max(
  //   UserConstant.User_TEXT_MAX_LENGTH,
  //   `User text max length is ${UserConstant.User_TEXT_MAX_LENGTH}`,
  // )
  // .min(
  //   UserConstant.User_TEXT_MIN_LENGTH,
  //   `User text max length is ${UserConstant.User_TEXT_MIN_LENGTH}`,
  // ),
});

export const UserValidation = {
  createUserValidationSchema,
};
