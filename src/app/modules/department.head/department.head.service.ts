import { DepartmentHeadModel } from "./model/model";
import { TeacherModel } from "../teacher/model/model";
import { IDepartmentHead } from "./department.head.interface";
import mongoose from "mongoose";

const isDepartmentHead = async (userId: string) => {
  const teacher = await TeacherModel.findOne({ userId });
  if (!teacher) return false;

  const deptHead = await DepartmentHeadModel.findOne({ teacherId: teacher._id });
  return !!deptHead;
};

const getDepartmentHeads = async () => {
  return DepartmentHeadModel.find().populate("teacherId");
};

const createDepartmentHead = async (payload: IDepartmentHead) => {
  return DepartmentHeadModel.create(payload);
};

const updateDepartmentHead = async (
  id: string,
  payload: Partial<IDepartmentHead>
) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid department head ID");
  }
  return DepartmentHeadModel.findByIdAndUpdate(id, payload, { new: true });
};

export const DepartmentHeadService = {
  isDepartmentHead,
  getDepartmentHeads,
  createDepartmentHead,
  updateDepartmentHead,
};
