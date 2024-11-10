import { Model, Types } from "mongoose";
import { TDocumentType } from "../../interface/interface";

export interface IAttendance {
  date: Date;
  courseId: Types.ObjectId;
  runningSession: string;
  attendedStudentsId: Array<Types.ObjectId>;
}

export interface IAttendanceModel extends Model<IAttendance> {
  createAttendanceMethod(
    text: IAttendance,
  ): Promise<TDocumentType<IAttendance>>;
}
