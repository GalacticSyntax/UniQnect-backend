import { Request, Response } from "express";
import { TeacherModel } from "./model/model";
import catchAsync from "../../utils/catch.async";
import QueryBuilder from "../../builder/QueryBuilder";
import { sendResponse } from "../../utils/send.response";
import httpStatus from "http-status";
import { UserModel } from "../user/model/model";

export const updateTeacher = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const teacher = await TeacherModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!teacher) {
      return res
        .status(404)
        .json({ success: false, message: "Teacher not found" });
    }

    res.json({ success: true, data: teacher });
  } catch (error) {
    const errMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    res.status(400).json({ success: false, message: errMessage });
  }
};

export const getAllTeachers = catchAsync(
  async (req: Request, res: Response) => {
    const query = req.query;
    const userQuery = new QueryBuilder(
      TeacherModel.find().populate({
        path: "userId",
      }),
      query,
    )
      .search(["teacherId"])
      .filter()
      .sort()
      .paginate()
      .fields();

    const meta = await userQuery.countTotal();
    const teachers = await userQuery.modelQuery.lean();

    const result = teachers.map((teacher) => ({
      ...teacher,
      fullName: (teacher as unknown as { userId: { fullName: string } }).userId
        .fullName,
      email: (teacher as unknown as { userId: { email: string } }).userId.email,
      phone: (teacher as unknown as { userId: { phone: string } }).userId.phone,
      gender: (teacher as unknown as { userId: { gender: string } }).userId
        .gender,
      image: (teacher as unknown as { userId: { image: string } }).userId.image,
      userId: (teacher as unknown as { userId: { _id: string } }).userId._id,
    }));

    return sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Teachers found successfully",
      data: {
        meta,
        result,
      },
    });
  },
);

export const getTeachersByQuery = async (req: Request, res: Response) => {
  try {
    const query = req.query;
    const teachers = await TeacherModel.find(query);
    res.json({ success: true, data: teachers });
  } catch (error) {
    const errMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    res.status(500).json({ success: false, message: errMessage });
  }
};
