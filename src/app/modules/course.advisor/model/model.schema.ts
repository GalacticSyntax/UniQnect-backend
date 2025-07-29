import { Schema } from "mongoose";
import {
  ICourseAdvisor,
  ICourseAdvisorModel,
} from "../course.advisor.interface";
import { TeacherConstant } from "../../teacher/teacher.constant";
import { CourseConstant } from "../../course/course.constant";

const courseAdvisorSchema = new Schema<ICourseAdvisor, ICourseAdvisorModel>(
  {
    departmentCode: {
      type: String,
      required: true,
    },
    teacherId: {
      type: Schema.Types.ObjectId,
      ref: TeacherConstant.TEACHER_COLLECTION_NAME,
      required: true,
    },
    session: {
      type: String,
      required: true,
    },
    semester: {
      type: Number,
      required: true,
    },
    offeredCourses: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: CourseConstant.COURSE_COLLECTION_NAME,
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export default courseAdvisorSchema;
