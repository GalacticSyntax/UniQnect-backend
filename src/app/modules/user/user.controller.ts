import { Request, Response } from "express";
import { UserModel } from "./model/model";
import { v4 as uuid } from "uuid";
import catchAsync from "../../utils/catch.async";
import { sendResponse } from "../../utils/send.response";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { DepartmentModel } from "../department/model/model";
import { StudentModel } from "../student/model/model";
import { TeacherModel } from "../teacher/model/model";
import QueryBuilder from "../../builder/QueryBuilder";
import { UserUtils } from "./user.utils";

export const createUser = catchAsync(async (req: Request, res: Response) => {
  console.log(req.body);

  const { role, teacherId, studentId, departmentId, designation, session } =
    req.body;

  if (
    (role === "teacher" && (!teacherId || !departmentId || !designation)) ||
    (role === "student" && (!studentId || !departmentId || !session))
  )
    throw new AppError(httpStatus.BAD_REQUEST, "Request is not complete");

  const departmentData = await DepartmentModel.findOne({
    code: departmentId,
  });

  req.body.departmentId = departmentData?._id?.toString();

  if (!departmentData && ["teacher", "student"].includes(role))
    throw new AppError(httpStatus.NOT_FOUND, "department not found");

  const password = uuid();

  const user = (
    await UserModel.create({
      role: "student",
      ...req.body,
      password,
    })
  ).toObject();

  if (!user)
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "something went wrong",
    );

  if (role === "student") {
    await StudentModel.create({
      userId: user._id.toString(),
      studentId,
      departmentId: req.body.departmentId,
    });
  }
  if (role === "teacher") {
    await TeacherModel.create({
      userId: user._id.toString(),
      teacherId,
      departmentId: req.body.departmentId,
      designation,
    });
  }

  await UserUtils.sendEmailForPassword({
    userId: user._id.toString(),
    password,
  });

  return sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "User created successfully",
    data: { ...user, password },
  });
});

export const getAllAdmissionOfficers = catchAsync(
  async (req: Request, res: Response) => {
    const query = req.query;
    const userQuery = new QueryBuilder(
      UserModel.find({
        role: "admission-office",
      }),
      query,
    )
      .search(["email"])
      .filter()
      .sort()
      .paginate()
      .fields();

    const meta = await userQuery.countTotal();
    const result = await userQuery.modelQuery;

    return sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User found successfully",
      data: {
        meta,
        result,
      },
    });
  },
);

export const getUserById = catchAsync(async (req, res) => {
  const { id } = req.params;
  let result = await UserModel.findById(id);

  if (result && result.role === "student") {
    result = await StudentModel.findOne({
      userId: result?._id.toString(),
    })
      .populate({
        path: "userId",
      })
      .populate({
        path: "departmentId",
      });
  } else if (result && result.role === "teacher") {
    result = await TeacherModel.findOne({
      userId: result?._id.toString(),
    })
      .populate({
        path: "userId",
      })
      .populate({
        path: "departmentId",
      });
  }

  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User found successfully",
    data: result,
  });
});

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await UserModel.findByIdAndUpdate(id, req.body, { new: true });

  if (!user) throw new AppError(httpStatus.NOT_FOUND, "user not found");

  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User updated successfully",
    data: user,
  });
};

export const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const userQuery = new QueryBuilder(UserModel.find(), query)
    .search(["email"])
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await userQuery.countTotal();
  const result = await userQuery.modelQuery;

  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User found successfully",
    data: {
      meta,
      result,
    },
  });
});

export const getUsersByQuery = async (req: Request, res: Response) => {
  try {
    const query = req.query;
    const users = await UserModel.find(query);
    res.json({ success: true, data: users });
  } catch (error) {
    const errMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    res.status(500).json({ success: false, message: errMessage });
  }
};

// export const UserController = {};
