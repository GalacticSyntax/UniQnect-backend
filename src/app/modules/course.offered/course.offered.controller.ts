import { Request, Response } from "express";
import { CourseOfferedService } from "./course.offered.service";
import { CourseOfferedValidation } from "./course.offered.validation";

import { CourseModel } from "../course/model/model";
import { CourseAdvisorModel } from "../course.advisor/model/model";
import { TeacherModel } from "../teacher/model/model";

import { Types } from "mongoose";

const createCourseOffered = async (req: Request, res: Response) => {
  try {
    const parsed = CourseOfferedValidation.createCourseOfferedValidationSchema.parse(req.body);

    // Search for referenced documents
    const [course, courseAdvisor, teacher] = await Promise.all([
      CourseModel.findById(parsed.courseId),
      CourseAdvisorModel.findById(parsed.courseAdvisor),
      TeacherModel.findById(parsed.teacherId),
    ]);

    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }
    if (!courseAdvisor) {
      return res.status(404).json({ success: false, message: "Course advisor not found" });
    }
    if (!teacher) {
      return res.status(404).json({ success: false, message: "Teacher not found" });
    }

    const payload = {
      ...parsed,
      courseId: course._id,
      courseAdvisor: courseAdvisor._id,
      teacherId: teacher._id,
    };

    const data = await CourseOfferedService.createCourseOffered(payload);
    res.status(201).json({ success: true, data });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const getCourseOffereds = async (req: Request, res: Response) => {
  const data = await CourseOfferedService.getCourseOffereds(req.query);
  res.json({ success: true, data });
};

const updateCourseOffered = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const parsed = CourseOfferedValidation.createCourseOfferedValidationSchema.parse(req.body);

    // Search for referenced documents
    const [course, courseAdvisor, teacher] = await Promise.all([
      CourseModel.findById(parsed.courseId),
      CourseAdvisorModel.findById(parsed.courseAdvisor),
      TeacherModel.findById(parsed.teacherId),
    ]);

    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }
    if (!courseAdvisor) {
      return res.status(404).json({ success: false, message: "Course advisor not found" });
    }
    if (!teacher) {
      return res.status(404).json({ success: false, message: "Teacher not found" });
    }

    const payload = {
      ...parsed,
      courseId: course._id,
      courseAdvisor: courseAdvisor._id,
      teacherId: teacher._id,
    };

    const data = await CourseOfferedService.updateCourseOffered(id, payload);
    res.json({ success: true, data });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const deleteCourseOffered = async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = await CourseOfferedService.deleteCourseOffered(id);
  res.json({ success: true, data });
};

const getCourseOfferedById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = await CourseOfferedService.findCourseOfferedById(id);
  if (!data) {
    return res.status(404).json({ success: false, message: "Not found" });
  }
  res.json({ success: true, data });
};

export const CourseOfferedController = {
  createCourseOffered,
  getCourseOffereds,
  updateCourseOffered,
  deleteCourseOffered,
  getCourseOfferedById,
};