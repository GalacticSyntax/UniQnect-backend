import { Model } from "mongoose";
import { UserConstant } from "./user.constant";

export interface IUser {
  fullName: string;
  email: string;
  password: string;
  isVerified?: boolean;
  image: string;
  role?: Array<string>;
  phone: string;
  gender: "male" | "female";
  presentAddress?: string;
  permanentAddress?: string;
}

const genderTypesList: Array<string> = Object.values(UserConstant.GENDER_TYPES);

export type TGenderType = (typeof genderTypesList)[number];

export interface IUserChangePassword {
  oldPassword: string;
  newPassword: string;
}

export interface IUserModel extends Model<IUser> {
  isPasswordMatch({
    plainPassword,
    hashedPassword,
  }: {
    plainPassword: string;
    hashedPassword: string;
  }): Promise<boolean>;

  createHash({ str }: { str: string }): Promise<string>;

  isVerified({ id }: { id: string }): Promise<boolean>;

  isUserExist({ id }: { id: string }): Promise<boolean>;

  updateUserPassword({
    payload,
    userId,
  }: {
    payload: IUserChangePassword;
    userId: string;
  }): Promise<unknown>;

  deleteGuestUser({
    guestUserId,
    currentUserId,
  }: {
    guestUserId: string;
    currentUserId: string;
  }): Promise<unknown>;
}