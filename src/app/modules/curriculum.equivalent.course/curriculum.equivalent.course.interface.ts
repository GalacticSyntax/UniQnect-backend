import { Model, Types } from "mongoose";
import { TDocumentType } from "../../interface/interface";

export interface ICurriculumEquivalentCourse {
  firstCurriculumId: Types.ObjectId;
  firstCurriculumCourseId: Types.ObjectId;
  secondCurriculumId: Types.ObjectId;
  secondCurriculumCourseId: Types.ObjectId;
}

export interface ICurriculumEquivalentCourseModel
  extends Model<ICurriculumEquivalentCourse> {
  createCurriculumEquivalentCourseMethod(
    text: ICurriculumEquivalentCourse,
  ): Promise<TDocumentType<ICurriculumEquivalentCourse>>;
}
