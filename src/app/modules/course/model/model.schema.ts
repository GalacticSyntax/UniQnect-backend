import { Schema } from "mongoose";
import { ICourse, ICourseModel } from "../course.interface";
import { CurriculumConstant } from "../../curriculum/curriculum.constant";
import { CourseConstant } from "../course.constant";

const courseSchema = new Schema<ICourse, ICourseModel>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
    },
    credit: {
      type: Number,
      required: true,
    },
    depart: {
      type: String,
      required: true,
    },
    prerequisiteCourse: {
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

export default courseSchema;
