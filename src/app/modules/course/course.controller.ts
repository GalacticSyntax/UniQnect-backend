import { Request, Response } from "express";
import { CourseValidation } from "./course.validation";
import { CourseService } from "./course.service";


const createCourse = async (req: Request, res: Response) => {
  try {
    const validatedData = CourseValidation.createCourseValidationSchema.parse(req.body);
    const newCourse = await CourseService.createCourseService(validatedData);
    res.status(201).json({ success: true, data: newCourse });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};


export const createManyCourses = async (req: Request, res: Response) => {
  try {
    const parsed = CourseValidation.createManyCoursesValidationSchema.parse(req.body);

    const saved = await CourseService.createManyCoursesService(parsed);
    res.status(201).json({ success: true, data: saved });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err?.message || "Validation or creation error",
    });
  }
};


const getCourses = async (req: Request, res: Response) => {
  try {
    const filters = {
      code: typeof req.query.code === "string" ? req.query.code : undefined,
      name: typeof req.query.name === "string" ? req.query.name : undefined,
      depart: typeof req.query.depart === "string" ? req.query.depart : undefined,
      credit: req.query.credit ? Number(req.query.credit) : undefined
    };

    const courses = await CourseService.getCoursesService(filters);
    res.status(200).json({ success: true, data: courses });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || "Failed to fetch courses"
    });
  }
};


export const CourseController = {
  createCourse,
  createManyCourses,
  getCourses,
};
