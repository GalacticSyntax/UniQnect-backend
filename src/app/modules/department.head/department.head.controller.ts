import { Request, Response } from "express";
import { CourseAdvisorService } from "./department.head.service";
import { CourseAdvisorUtils } from "./department.head.utils";
import { CourseAdvisorValidation } from "./course.advisor.validation";

import { TeacherModel } from "../teacher/model/model";
import { CourseAdvisorModel } from "./model/model";


const checkIfUserIsAdvisorController = async (req: Request, res: Response) => {
  const { userId } = req.params;
  if (!userId) {
    return res.status(400).json({ success: false, message: "userId is required" });
  }

  const advisor = await CourseAdvisorUtils.checkIfUserIsAdvisor(userId);
  if (!advisor) {
    return res.status(404).json({ success: false, message: "User is not a course advisor" });
  }

  res.json({ success: true, data: advisor });
};

const createAdvisor = async (req: Request, res: Response) => {
  const parsed = CourseAdvisorValidation.advisorValidationSchema.parse(
    req.body,
  );

  // Find teacher by teacherId (string)
  const teacher = await TeacherModel.findOne({ teacherId: parsed.teacherId });
  if (!teacher) {
    return res
      .status(404)
      .json({ success: false, message: "Teacher not found" });
  }

  console.log(teacher);

  const isAlreadyExist = await CourseAdvisorModel.findOne({
    teacherId: teacher._id,
    session: parsed.session,
    semester: parsed.semester,
  });

  console.log(isAlreadyExist);

  if (isAlreadyExist)
    return res.json({
      success: false,
      message: "Already it is created",
    });

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
    offeredCourses: parsed.offeredCourses,
  };

  const data = await CourseAdvisorService.createAdvisor(
    CourseAdvisorUtils.formatAdvisorPayload(updated),
  );
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
  const parsed = CourseAdvisorValidation.advisorValidationSchema.parse(
    req.body,
  );

  const teacher = await TeacherModel.findOne({ teacherId: parsed.teacherId });
  if (!teacher) {
    return res
      .status(404)
      .json({ success: false, message: "Teacher not found" });
  }

  // parsed.teacherId = teacher._id;

  const updated = {
    departmentCode: parsed.departmentCode,
    session: parsed.session,
    semester: parsed.semester,
    teacherId: teacher._id,
    offeredCourses: parsed.offeredCourses,
  };

  const data = await CourseAdvisorService.updateAdvisor(
    id,
    CourseAdvisorUtils.formatAdvisorPayload(updated),
  );
  res.json({ success: true, data });
};

const deleteAdvisor = async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = await CourseAdvisorService.deleteAdvisor(id);
  res.json({ success: true, data });
};

const getAdvisorById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const advisor = await CourseAdvisorService.findAdvisorById(id);

  if (!advisor) {
    return res
      .status(404)
      .json({ success: false, message: "Advisor not found" });
  }

  res.json({ success: true, data: advisor });
};

export const DepartmentHeadController = {
  createAdvisor,
  getAdvisors,
  updateAdvisor,
  deleteAdvisor,
  getAdvisorById,
  checkIfUserIsAdvisorController,
};
