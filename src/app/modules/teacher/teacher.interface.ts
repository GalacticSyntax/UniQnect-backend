import { Model, Types } from "mongoose";
import { TDocumentType } from "../../interface/interface";

export interface ITeacher {
  userId: Types.ObjectId;
  teacherId: string;
  designation: "" | "";
  joinedAt: Date;
  departmentId: Types.ObjectId;
}

export interface ITeacherModel extends Model<ITeacher> {
  createTeacherMethod(text: ITeacher): Promise<TDocumentType<ITeacher>>;
}
