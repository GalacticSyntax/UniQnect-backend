import { Model } from "mongoose";
import { TDocumentType } from "../../interface/interface";

export interface IAdmin {
  fullName: string;
  email: string;
  password: string;
}

export interface IAdminModel extends Model<IAdmin> {
  createAdminMethod(admin: IAdmin): Promise<TDocumentType<IAdmin>>;
}
