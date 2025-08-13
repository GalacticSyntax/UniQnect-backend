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

export const getAllTeachers = async (req: Request, res: Response) => {
  try {
    const teachers = await TeacherModel.find()
      .populate("userId")        // get full user details
      .populate("departmentId")  // get full department details
      .sort({ createdAt: -1 });  // newest first (optional)

    res.status(200).json({
      message: "All teachers fetched successfully",
      data: teachers,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching teachers",
      error: error instanceof Error ? error.message : error,
    });
  }
};

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
