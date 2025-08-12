import { Request, Response } from "express";
import { DepartmentHeadService } from "./department.head.service";
import { DepartmentHeadValidation } from "./department.head.validation";
import { DepartmentHeadUtils } from "./department.head.utils";
import { TeacherModel } from "../teacher/model/model";
import { IDepartmentHead } from "./department.head.interface";

const isDepartmentHead = async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ success: false, message: "userId is required" });
    }
    const result = await DepartmentHeadService.isDepartmentHead(String(userId));
    res.status(200).json({ success: true, isDepartmentHead: result });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getDepartmentHeads = async (req: Request, res: Response) => {
  try {
    const result = await DepartmentHeadService.getDepartmentHeads();
    res.status(200).json({ success: true, data: result });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createDepartmentHead = async (req: Request, res: Response) => {
  try {
    // Parse request body
    const parsed = DepartmentHeadValidation.createDepartmentHeadSchema.parse(req.body);

    // Find teacher by userId
    const teacher = await TeacherModel.findOne({ teacherId: parsed.teacherId }); // here teacherId actually means userId in payload
    if (!teacher) {
      return res.status(404).json({ success: false, message: "Teacher not found for given userId" });
    }

    // Replace teacherId with the actual _id
    const payload = DepartmentHeadUtils.formatCreatePayload({
      departmentCode: parsed.departmentCode,
      teacherId: teacher._id,
    });

    // Save Department Head
    const result = await DepartmentHeadService.createDepartmentHead(payload);

    res.status(201).json({ success: true, data: result });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const updateDepartmentHead = async (req: Request, res: Response) => {
  try {
    const parsed = DepartmentHeadValidation.updateDepartmentHeadSchema.parse(req.body);
    let payload: Partial<IDepartmentHead> = {};

    // If userId (or teacherId in current schema) is provided, find teacher._id
    if (parsed.teacherId) { 
      const teacher = await TeacherModel.findOne({ teacherId: parsed.teacherId }); // parsed.teacherId actually means userId
      if (!teacher) {
        return res.status(404).json({ success: false, message: "Teacher not found for given userId" });
      }
      payload.teacherId = teacher._id; // Use teacher._id for the update
    }

    let payload1 = DepartmentHeadUtils.formatUpdatePayload(payload);

    const result = await DepartmentHeadService.updateDepartmentHead(req.params.id, payload);
    res.status(200).json({ success: true, data: result });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};


export const DepartmentHeadController = {
  isDepartmentHead,
  getDepartmentHeads,
  createDepartmentHead,
  updateDepartmentHead,
};
