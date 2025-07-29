import { Request, Response } from "express";
import { CourseAdvisorService } from "./course.advisor.service";
import { CourseAdvisorUtils } from "./course.advisor.utils";
import { CourseAdvisorValidation } from "./course.advisor.validation";


const createAdvisor = async (req: Request, res: Response) => {
  const parsed = CourseAdvisorValidation.advisorValidationSchema.parse(req.body);
  const data = await CourseAdvisorService.createAdvisor(CourseAdvisorUtils.formatAdvisorPayload(parsed));
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
  const data = await CourseAdvisorService.updateAdvisor(id, CourseAdvisorUtils.formatAdvisorPayload(parsed));
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
