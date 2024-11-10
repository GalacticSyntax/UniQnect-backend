import { Schema } from "mongoose";
import { ICurriculum, ICurriculumModel } from "../curriculum.interface";
import { CourseConstant } from "../../course/course.constant";

const curriculumSchema = new Schema<ICurriculum, ICurriculumModel>(
  {
    name: {
      type: String,
      requred: true,
      unique: true,
    },
    startAt: {
      type: Date,
      requred: true,
    },
    endAt: {
      type: Date,
      requred: true,
    },
    courseList: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: CourseConstant.COURSE_COLLECTION_NAME,
        },
      ],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export default curriculumSchema;
