import { Model, Types } from "mongoose";
import { TDocumentType } from "../../interface/interface";

export interface IResult {
  studentId: Types.ObjectId;
  courseId: Types.ObjectId;
  isVarified: boolean;
  markes: number;
  resultType: "mid" | "final" | "extra";
  runningSession: "" | "";
}

export interface IResultModel extends Model<IResult> {
  createDummyMethod(text: IResult): Promise<TDocumentType<IResult>>;
}
