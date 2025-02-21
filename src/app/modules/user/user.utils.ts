import { CloudinaryUtils } from "../../utils/cloudinary.utils";
import { UserConstant } from "./user.constant";
import { TGenderType } from "./user.interface";

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

export const UserUtils = {
  generateAvatarURL,
  updateUserAvatar,
};
