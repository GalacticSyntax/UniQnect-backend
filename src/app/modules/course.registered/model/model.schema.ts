import { Schema } from "mongoose";
import {
  ICourseRegistered,
  ICourseRegisteredModel,
} from "../course.registered.interface";
import { StudentConstant } from "../../student/student.constant";
import { CourseConstant } from "../../course/course.constant";

const registeredCourseSchema = new Schema<
  ICourseRegistered,
  ICourseRegisteredModel
>(
  {
    studentId: {
      type: Schema.Types.ObjectId,
      ref: StudentConstant.STUDENT_COLLECTION_NAME,
      required: true,
    },
    courseList: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: CourseConstant.COURSE_COLLECTION_NAME,
          required: true,
        },
      ],
      default: [],
      required: true,
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

export default registeredCourseSchema;
