import { Model, Types } from "mongoose";
import { TDocumentType } from "../../interface/interface";

export interface IResult {
  studentId: Types.ObjectId;
  courseId: Types.ObjectId;
  isVarified: boolean;
  mid: number;
  final: number;
  extra: number;
  attendance: number;
  runningSession: string;
}

export interface IResultModel extends Model<IResult> {
  createDummyMethod(text: IResult): Promise<TDocumentType<IResult>>;
}
