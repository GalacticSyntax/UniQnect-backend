import { Model } from "mongoose";
import { TDocumentType } from "../../interface/interface";

export interface ISchool {
  name: string;
  schoolId: string;
}

export interface ISchoolModel extends Model<ISchool> {
  createSchoolMethod(text: ISchool): Promise<TDocumentType<ISchool>>;
}
