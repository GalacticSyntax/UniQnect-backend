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
    markes: {
      type: Number,
      required: true,
    },
    resultType: {
      type: String,
      enum: ["mid", "final", "extra"],
      required: true,
    },
    runningSession: {
      type: String,
      enum: [""],
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export default resultIResultSchema;
