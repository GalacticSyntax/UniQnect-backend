import { Schema } from "mongoose";
import {
  ICourseOffered,
  ICourseOfferedModel,
} from "../course.offered.interface";
import { CourseConstant } from "../../course/course.constant";
import { CourseAdvisorConstant } from "../../course.advisor/course.advisor.constant";
import { TeacherConstant } from "../../teacher/teacher.constant";

const courseOfferedSchema = new Schema<ICourseOffered, ICourseOfferedModel>(
  {
    courseId: {
      type: Schema.Types.ObjectId,
      ref: CourseConstant.COURSE_COLLECTION_NAME,
      required: true,
    },
    runningSession: {
      type: String,
      required: true,
    },
    courseAdvisor: {
      type: Schema.Types.ObjectId,
      ref: CourseAdvisorConstant.COURSE_ADVISOR_COLLECTION_NAME,
      required: true,
    },
    teacherId: {
      type: Schema.Types.ObjectId,
      ref: TeacherConstant.TEACHER_COLLECTION_NAME,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export default courseOfferedSchema;
