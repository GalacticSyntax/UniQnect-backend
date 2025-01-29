import { Schema } from "mongoose";
import {
  ICurriculumEquivalentCourse,
  ICurriculumEquivalentCourseModel,
} from "../curriculum.equivalent.course.interface";
import { CurriculumConstant } from "../../curriculum/curriculum.constant";
import { CourseConstant } from "../../course/course.constant";

const curriculumEquivalentCourseSchema = new Schema<
  ICurriculumEquivalentCourse,
  ICurriculumEquivalentCourseModel
>(
  {
    firstCurriculumId: {
      type: Schema.Types.ObjectId,
      ref: CurriculumConstant.CURRICULUM_COLLECTION_NAME,
    },
    firstCurriculumCourseId: {
      type: Schema.Types.ObjectId,
      ref: CourseConstant.COURSE_COLLECTION_NAME,
    },
    secondCurriculumId: {
      type: Schema.Types.ObjectId,
      ref: CurriculumConstant.CURRICULUM_COLLECTION_NAME,
    },
    secondCurriculumCourseId: {
      type: Schema.Types.ObjectId,
      ref: CourseConstant.COURSE_COLLECTION_NAME,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export default curriculumEquivalentCourseSchema;
