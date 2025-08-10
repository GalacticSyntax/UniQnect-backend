import { Model, Types } from "mongoose";
import { TDocumentType } from "../../interface/interface";

export interface IDepartmentHead {
  departmentCode: string;
  teacherId: Types.ObjectId;
}

export interface IDepartmentHeadModel extends Model<IDepartmentHead> {
  createCourseAdvisorMethod(
    text: IDepartmentHead,
  ): Promise<TDocumentType<IDepartmentHead>>;
}
