import { Schema } from "mongoose";
import { IResult, IResultModel } from "../result.interface";
import { CourseConstant } from "../../course/course.constant";
import { StudentConstant } from "../../student/student.constant";

const resultIResultSchema = new Schema<IResult, IResultModel>(
  {
    courseId: {
      type: Schema.Types.ObjectId,
      ref: CourseConstant.COURSE_COLLECTION_NAME,
      required: true,
    },
    studentId: {
      type: Schema.Types.ObjectId,
      ref: StudentConstant.STUDENT_COLLECTION_NAME,
      required: true,
    },
    mid: {
      type: Number,
      default: 0,
    },
    final: {
      type: Number,
      default: 0,
    },
    extra: {
      type: Number,
      default: 0,
    },
    attendance: {
      type: Number,
      default: 0,
    },
    runningSession: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export default resultIResultSchema;
