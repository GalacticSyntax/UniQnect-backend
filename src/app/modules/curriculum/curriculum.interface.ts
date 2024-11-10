import { Model, Types } from "mongoose";
import { TDocumentType } from "../../interface/interface";

export interface ICurriculum {
  name: string;
  startAt: Date;
  endAt: Date;
  courseList: Array<Types.ObjectId>;
}

export interface ICurriculumModel extends Model<ICurriculum> {
  createCurriculumMethod(
    text: ICurriculum,
  ): Promise<TDocumentType<ICurriculum>>;
}
