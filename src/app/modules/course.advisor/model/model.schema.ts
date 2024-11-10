import { Schema } from "mongoose";
import {
  ICourseAdvisor,
  ICourseAdvisorModel,
} from "../course.advisor.interface";
import { TeacherConstant } from "../../teacher/teacher.constant";
import { CourseConstant } from "../../course/course.constant";

const courseAdvisorSchema = new Schema<ICourseAdvisor, ICourseAdvisorModel>(
  {
    teacherId: {
      type: Schema.Types.ObjectId,
      ref: TeacherConstant.TEACHER_COLLECTION_NAME,
      required: true,
    },
    runningSession: {
      type: String,
      enum: ["", ""],
      required: true,
    },
    studentSession: {
      type: String,
      enum: ["", ""],
      required: true,
    },
    offeredCourses: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: CourseConstant.COURSE_COLLECTION_NAME,
          required: true,
        },
      ],
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export default courseAdvisorSchema;
