import { Request, Response } from "express";
import { courseRegistrationValidation } from "./course.registered.validation";
import { CourseRegisteredService } from "./course.registered.service";
import { StudentModel } from "../student/model/model";
import { CourseRegisteredModel } from "./model/model";

const registerCourseController = async (req: Request, res: Response) => {
  try {
    const parsed = courseRegistrationValidation.parse(req.body);
    const registration = await CourseRegisteredService.registerCourseService(parsed);
    res.status(201).json({ success: true, data: registration });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const getCourseRegistrationsController = async (_req: Request, res: Response) => {
  try {
    const registrations = await CourseRegisteredService.getCourseRegistrationsService();
    res.status(200).json({ success: true, data: registrations });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const myRegisteredCourses = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params; 

    const student = await StudentModel.findOne({ userId });

    if (!student) {
      return res.status(400).json({ message: "studentId is required" });
    }

    const registeredCourses = await CourseRegisteredModel.find({ studentId: student?.studentId })
      .populate("courseList");


    res.status(200).json({
      message: "Registered courses fetched successfully",
      data: registeredCourses,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching registered courses",
      error: error instanceof Error ? error.message : error,
    });
  }
};




export const CourseRegisteredController = {
  registerCourseController,
  getCourseRegistrationsController,
};
