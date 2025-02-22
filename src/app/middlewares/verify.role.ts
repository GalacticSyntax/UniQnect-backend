import { NextFunction, Request, Response } from "express";
import AppError from "../errors/AppError";
import httpStatus from "http-status";
import catchAsync from "../utils/catch.async";
import { IRequestWithActiveDetails } from "../interface/interface";
import { UserModel } from "../modules/user/model/model";

const verifyRole = (
  role: "teacher" | "student" | "admin" | "admission-office" | "advisor",
) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req as unknown as IRequestWithActiveDetails;

    if (!userId)
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not logged in");

    const userData = await UserModel.findById(userId);

    if (!userData) throw new AppError(httpStatus.NOT_FOUND, "User not found");

    if (userData.role?.trim() !== role.trim())
      throw new AppError(httpStatus.FORBIDDEN, `User is not a ${role}`);

    next();
  });

export default verifyRole;
