import { Model, Types } from "mongoose";
import { TDocumentType } from "../../interface/interface";

type AttendanceMap = {
  studentId: Types.ObjectId;
  present: boolean;
};

export interface IAttendance {
  date: Date;
  courseId: Types.ObjectId;
  runningSession: string;
  studentList: Array<AttendanceMap>;
}

export interface IAttendanceModel extends Model<IAttendance> {
  createAttendanceMethod(
    text: IAttendance,
  ): Promise<TDocumentType<IAttendance>>;
}
