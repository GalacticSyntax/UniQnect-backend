import { Model } from "mongoose";
import { TDocumentType } from "../../interface/interface";

export interface IUser {
  fullName: string;
  email: string;
  password: string;
  isVarified?: boolean;
  image: string;
  role?: Array<string>;
  phone: string;
  gender: "male" | "female";
  presentAddress?: string;
  permanentAddress?: string;
}

export interface IUserModel extends Model<IUser> {
  createUserMethod(text: IUser): Promise<TDocumentType<IUser>>;
}
