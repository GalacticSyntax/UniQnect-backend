import AppError from "../errors/AppError";
import httpStatus from "http-status";
import { IRequestWithActiveDetails } from "../interface/interface";
import catchAsync from "../utils/catch.async";
import { AuthUtils } from "../modules/auth/auth.utils";
import config from "../config";

const checkUserAuthStatus = catchAsync(async (req, res, next) => {
  const { access_token: token } = req.cookies;

  if (!token) return next();

  const tokenData = AuthUtils.verifyToken({
    token: token as string,
    secret: config.JWT_ACCESS_SECRET,
    errorDetails: {
      statusCode: httpStatus.UNAUTHORIZED,
      message: "Try again",
    },
  });

  const userId = tokenData.userId;

  if (!userId)
    throw new AppError(httpStatus.UNAUTHORIZED, "User not logged in");

  (req as unknown as IRequestWithActiveDetails).userId = userId;

  return next();
});

export default checkUserAuthStatus;
