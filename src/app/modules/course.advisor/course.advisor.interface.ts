import { Model, Types } from "mongoose";
import { TDocumentType } from "../../interface/interface";

export interface ICourseAdvisor {
  teacherId: Types.ObjectId;
  runningSession: "" | "";
  studentSession: "" | "";
  offeredCourses: Array<Types.ObjectId>;
}

export interface ICourseAdvisorModel extends Model<ICourseAdvisor> {
  createCourseAdvisorMethod(
    text: ICourseAdvisor,
  ): Promise<TDocumentType<ICourseAdvisor>>;
}
