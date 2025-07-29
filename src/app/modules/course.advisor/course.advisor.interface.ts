import { Model, Types } from "mongoose";
import { TDocumentType } from "../../interface/interface";

export interface ICourseAdvisor {
  departmentCode: string;
  teacherId: Types.ObjectId;
  session: string;
  semester: number;
  offeredCourses: Array<Types.ObjectId>;
}

export interface ICourseAdvisorModel extends Model<ICourseAdvisor> {
  createCourseAdvisorMethod(
    text: ICourseAdvisor,
  ): Promise<TDocumentType<ICourseAdvisor>>;
}
