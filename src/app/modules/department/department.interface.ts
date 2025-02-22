import { Model, Types } from "mongoose";
import { TDocumentType } from "../../interface/interface";

export interface IDepartment {
  name: string;
  code: string;
  schoolId: string;
}

export interface IDepartmentModel extends Model<IDepartment> {
  createDepartmentMethod(
    text: IDepartment,
  ): Promise<TDocumentType<IDepartment>>;
}
