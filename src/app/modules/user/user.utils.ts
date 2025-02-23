import httpStatus from "http-status";
import { CloudinaryUtils } from "../../utils/cloudinary.utils";
import { UserModel } from "./model/model";
import { UserConstant } from "./user.constant";
import { TGenderType } from "./user.interface";
import AppError from "../../errors/AppError";
import path from "path";
import ejs from "ejs";
import sendEmail from "../../utils/sendEmail";

type TGenerateAvatarURL = (params: {
  gender: TGenderType;
  payload: string;
}) => string;

const generateAvatarURL: TGenerateAvatarURL = ({ gender, payload }) => {
  const genderValue =
    gender === UserConstant.GENDER_TYPES.MALE ? "boy" : "girl";
  return `https://avatar.iran.liara.run/public/${genderValue}?username=${payload}`;
};

const updateUserAvatar = async ({
  imagePath,
  cloudinaryMediaPath,
  isUpdating = false,
  previousImage,
}: {
  imagePath: string;
  cloudinaryMediaPath: string;
  isUpdating: boolean;
  previousImage?: string;
}) => {
  if (isUpdating && previousImage)
    await CloudinaryUtils.deleteFile([previousImage]);

  return await CloudinaryUtils.uploadFile(imagePath, cloudinaryMediaPath, {
    width: 300,
    height: 300,
  });
};

const sendEmailForPassword = async ({
  userId,
  password,
}: {
  userId: string;
  password: string;
}) => {
  const userData = await UserModel.findById(userId);

  if (userData?.isVerified)
    throw new AppError(httpStatus.BAD_REQUEST, "password already changed");

  if (!userData) throw new AppError(httpStatus.NOT_FOUND, "user not found");

  const emailData = {
    _id: userData._id?.toString(),
    email: userData.email,
    fullName: userData.fullName,
    password,
    loginLink: "http://localhost:5173/login",
  };

  const templatePath = path.join(__dirname, "../../../views/PasswordEmail.ejs");

  const htmlEmailTemplate = await ejs.renderFile(templatePath, emailData);

  console.log(htmlEmailTemplate);

  await sendEmail({
    to: emailData.email,
    subject: "Uniqnect password",
    text: "this is your password we recommend to change it",
    html: htmlEmailTemplate,
  });

  return userData;
};

export const UserUtils = {
  generateAvatarURL,
  updateUserAvatar,
  sendEmailForPassword,
};
