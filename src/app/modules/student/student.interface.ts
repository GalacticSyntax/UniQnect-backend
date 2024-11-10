import { Model, Types } from "mongoose";
import { TDocumentType } from "../../interface/interface";

export interface IStudent {
  userId: Types.ObjectId;
  studentId: string;
  admittedAt: Date;
  departmentId: Types.ObjectId;
  session: "" | "";
}

export interface IStudentModel extends Model<IStudent> {
  createStudentMethod(text: IStudent): Promise<TDocumentType<IStudent>>;
}
