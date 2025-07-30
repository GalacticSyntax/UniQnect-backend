import { Model, Types } from "mongoose";
import { TDocumentType } from "../../interface/interface";

export interface ICourseOffered {
  courseId: Types.ObjectId;
  runningSession: string;
  courseAdvisor: Types.ObjectId;
  teacherId: Types.ObjectId;
}

export interface ICourseOfferedModel extends Model<ICourseOffered> {
  createCourseOfferedMethod(
    text: ICourseOffered,
  ): Promise<TDocumentType<ICourseOffered>>;
}
