import { Model, Types } from "mongoose";
import { TDocumentType } from "../../interface/interface";

export interface ICourse {
  name: string;
  code: string;
  credit: number;
  curriculumId: Types.ObjectId;
  prerequisiteCourse: Array<Types.ObjectId>;
}

export interface ICourseModel extends Model<ICourse> {
  createCourseMethod(text: ICourse): Promise<TDocumentType<ICourse>>;
}
