import { Request, Response } from "express";
import { CourseAdvisorService } from "./course.advisor.service";
import { CourseAdvisorUtils } from "./course.advisor.utils";
import { CourseAdvisorValidation } from "./course.advisor.validation";

import { TeacherModel } from "../teacher/model/model";


const createAdvisor = async (req: Request, res: Response) => {
  const parsed = CourseAdvisorValidation.advisorValidationSchema.parse(req.body);

  // Find teacher by teacherId (string)
  const teacher = await TeacherModel.findOne({ teacherId: parsed.teacherId });
  if (!teacher) {
    return res.status(404).json({ success: false, message: 'Teacher not found' });
  }

  // Replace teacherId with _id
  // parsed.teacherId = teacher._id;

  // const parsed: {
  //   departmentCode: string;
  //   session: string;
  //   semester: number;
  //   teacherId: string;
  //   offeredCourses?: string[] | undefined;
  // }

  const updated = {
    departmentCode: parsed.departmentCode,
    session: parsed.session,
    semester: parsed.semester,
    teacherId: teacher._id,
    offeredCourses: parsed.offeredCourses 
  }

  const data = await CourseAdvisorService.createAdvisor(CourseAdvisorUtils.formatAdvisorPayload(updated));
  res.status(201).json({ success: true, data });
};

const getAdvisors = async (req: Request, res: Response) => {
  const { department, session, semester, name } = req.query;
  const data = await CourseAdvisorService.getAdvisors({
    department,
    session,
    semester,
    name,
  });
  res.json({ success: true, data });
};

const updateAdvisor = async (req: Request, res: Response) => {
  const id = req.params.id;
  const parsed = CourseAdvisorValidation.advisorValidationSchema.parse(req.body);

  const teacher = await TeacherModel.findOne({ teacherId: parsed.teacherId });
  if (!teacher) {
    return res.status(404).json({ success: false, message: 'Teacher not found' });
  }

  // parsed.teacherId = teacher._id;

  const updated = {
    departmentCode: parsed.departmentCode,
    session: parsed.session,
    semester: parsed.semester,
    teacherId: teacher._id,
    offeredCourses: parsed.offeredCourses 
  }

  const data = await CourseAdvisorService.updateAdvisor(id, CourseAdvisorUtils.formatAdvisorPayload(updated));
  res.json({ success: true, data });
};

const deleteAdvisor = async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = await CourseAdvisorService.deleteAdvisor(id);
  res.json({ success: true, data });
};

export const CourseAdvisorController = {
  createAdvisor,
  getAdvisors,
  updateAdvisor,
  deleteAdvisor
};
