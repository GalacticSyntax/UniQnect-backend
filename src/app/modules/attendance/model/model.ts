import { IAttendance, IAttendanceModel } from "../attendance.interface";
import { AttendanceConstant } from "../attendance.constant";
import { model } from "mongoose";

/* attendance schema start ================== */
import attendanceSchema from "./model.schema";
/* attendance schema end ================== */

/* attendance schema middleware start ================== */
import "./model.middleware";
/* attendance schema middleware end ================== */

/* attendance schema static methods start ================== */
import "./model.static.method";
/* attendance schema static methods end ================== */

export const attendanceModel = model<IAttendance, IAttendanceModel>(
  AttendanceConstant.ATTENDANCE_COLLECTION_NAME,
  attendanceSchema,
);
