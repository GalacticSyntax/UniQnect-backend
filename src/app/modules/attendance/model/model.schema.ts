import { Schema } from "mongoose";
import { IAttendance, IAttendanceModel } from "../attendance.interface";
import { AttendanceConstant } from "../attendance.constant";
import { CourseConstant } from "../../course/course.constant";
import { StudentConstant } from "../../student/student.constant";

const attendanceSchema = new Schema<IAttendance, IAttendanceModel>(
  {
    date: {
      type: String,
    },
    courseId: {
      type: Schema.Types.ObjectId,
      ref: CourseConstant.COURSE_COLLECTION_NAME,
    },
    runningSession: {
      type: String,
    },
    studentList: [
      {
        studentId: {
          type: Schema.Types.ObjectId,
          ref: StudentConstant.STUDENT_COLLECTION_NAME, 
          required: true,
        },
        present: {
          type: Boolean,
          required: true,
          default: false,
        },
      }
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export default attendanceSchema;
