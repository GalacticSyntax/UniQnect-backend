import { Schema } from "mongoose";
import { IAttendance, IAttendanceModel } from "../attendance.interface";
import { AttendanceConstant } from "../attendance.constant";
import { CourseConstant } from "../../course/course.constant";

const attendanceSchema = new Schema<IAttendance, IAttendanceModel>(
  {
    date: {
      type: Date,
      default: Date.now(),
    },
    courseId: {
      type: Schema.Types.ObjectId,
      ref: CourseConstant.COURSE_COLLECTION_NAME,
    },
    runningSession: {
      type: String,
    },
    attendedStudentsId: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: AttendanceConstant.ATTENDANCE_COLLECTION_NAME,
        },
      ],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export default attendanceSchema;
