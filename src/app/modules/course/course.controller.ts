import { Request, Response } from "express";
import { createCourseService } from "./course.service";
import { createCourseValidationSchema } from "./course.validation";

export const createCourse = async (req: Request, res: Response) => {
  try {
    const validatedData = createCourseValidationSchema.parse(req.body);
    const newCourse = await createCourseService(validatedData);
    res.status(201).json({ success: true, data: newCourse });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};



export const CourseController = {};
