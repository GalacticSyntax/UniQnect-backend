import { Model, Types } from "mongoose";
import { TDocumentType } from "../../interface/interface";

export interface ICourseRegistered {
  studentId: Types.ObjectId;
  courseList: Array<Types.ObjectId>;
  runningSession: "" | "";
}

export interface ICourseRegisteredModel extends Model<ICourseRegistered> {
  createCourseRegisteredMethod(
    text: ICourseRegistered,
  ): Promise<TDocumentType<ICourseRegistered>>;
}
