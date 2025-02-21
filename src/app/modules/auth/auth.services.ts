import { UserModel } from "./../user/model/model";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import config from "../../config";
import { ILoginUser } from "./auth.interface";
import { AuthUtils } from "./auth.utils";

const loginUser = async ({ payload }: { payload: ILoginUser }) => {
  const { password, email } = payload;

  const user = await UserModel.findOne({
    email,
  }).select({ password: 1 });

  if (!user)
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");

  if (
    !(await UserModel.isPasswordMatch({
      plainPassword: password,
      hashedPassword: user.password,
    }))
  )
    throw new AppError(httpStatus.FORBIDDEN, "Password do not matched");

  const userId = user?._id?.toString();

  const accessToken = AuthUtils.createToken({
    jwtPayload: { userId },
    secret: config?.JWT_ACCESS_SECRET as string,
    expiresIn: config?.JWT_ACCESS_EXPIRES_IN as string,
  });

  return {
    accessToken,
    userId,
  };
};

// const emailVerifyRequest = async ({ userId }: { userId: string }) => {
//   const userData = await UserModel.findById(userId);

//   if (userData?.isVerified)
//     throw new AppError(httpStatus.BAD_REQUEST, "you are already verified");

//   if (!userData)
//     throw new AppError(httpStatus.UNAUTHORIZED, "you are not authenticated");

//   // const emailData = {
//   //   _id: userData._id?.toString(),
//   //   email: userData.email,
//   //   fullName: userData.fullName,
//   // };

//   // await emailQueue.add(QueueJobList.SEND_VERIFICATION_EMAIL, emailData, {
//   //   removeOnComplete: true,
//   //   removeOnFail: true,
//   // });

//   return userData;
// };

// const verifyEmail = async ({
//   verifyEmailTokenData,
// }: {
//   verifyEmailTokenData: IVerifyEmailTokenData;
// }) => {
//   const { email, userId } = verifyEmailTokenData;

//   /**
//    * Reading user details
//    * ***/
//   const userData = (await UserModel.findById(userId)) as TDocumentType<IUser>;

//   if (!userData) throw new AppError(httpStatus.NOT_FOUND, "user not found");

//   if (userData?.isVerified)
//     throw new AppError(httpStatus.BAD_REQUEST, "you are already verified");

//   /**
//    * verifying userDetails with tokenDetails
//    * ***/
//   if (userId !== userData._id?.toString() || email !== userData.email)
//     throw new AppError(httpStatus.BAD_REQUEST, "Token data is not valid");

//   const updatedUser = (await UserModel.findByIdAndUpdate(
//     userId,
//     {
//       isVerified: true,
//     },
//     { new: true },
//   )) as TDocumentType<IUser>;

//   if (!updatedUser)
//     throw new AppError(
//       httpStatus.INTERNAL_SERVER_ERROR,
//       "Something went wrong when updating",
//     );

//   return updatedUser;
// };

// const forgetPassword = async ({
//   emailOrUserName,
// }: {
//   emailOrUserName: string;
// }) => {
//   const userData = await UserModel.findOne({
//     ...(isEmail(emailOrUserName)
//       ? {
//           email: emailOrUserName,
//         }
//       : {
//           userName: emailOrUserName,
//         }),
//   }).lean();

//   if (!userData)
//     throw new AppError(
//       httpStatus.NOT_FOUND,
//       "no account exist with that email address",
//     );

//   await UserModel.findByIdAndUpdate(
//     userData?._id?.toString(),
//     {
//       needToChangePassword: true,
//     },
//     { new: true },
//   );

//   const emailData = {
//     _id: userData._id?.toString(),
//     email: userData.email,
//     fullName: userData.fullName,
//   };

//   // await emailQueue.add(QueueJobList.SEND_RESET_PASSWORD_EMAIL, emailData, {
//   //   removeOnComplete: true,
//   //   removeOnFail: true,
//   // });
// };

// const resetPassword = async ({
//   userId,
//   password,
// }: {
//   userId: string;
//   password: string;
// }) => {
//   const userData = await UserModel.findById(userId).select({
//     needToChangePassword: 1,
//   });

//   if (!userData)
//     throw new AppError(httpStatus.NOT_FOUND, "this user doesn't exist");

//   return await UserModel.findByIdAndUpdate(
//     userId,
//     {
//       password,
//     },
//     { new: true },
//   );
// };

export const AuthServices = {
  loginUser,
  // emailVerifyRequest,
  // verifyEmail,
  // forgetPassword,
  // resetPassword,
};
