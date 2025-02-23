import { Request, Response } from "express";
import { DepartmentModel } from "./model/model";
import { SchoolModel } from "../school/model/model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { sendResponse } from "../../utils/send.response";
import catchAsync from "../../utils/catch.async";

export const createDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { code, name, schoolId } = req.body;

    const existingSchool = await SchoolModel.findOne({ schoolId });

    if (!existingSchool) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        "Invalid schoolId or School not found.",
      );
    }

    const department = await DepartmentModel.create({
      code,
      name,
      schoolId: existingSchool?._id?.toString(),
    });

    return sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Department created successfully",
      data: department,
    });
  },
);

export const updateDepartment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const department = await DepartmentModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!department) {
      return res
        .status(404)
        .json({ success: false, message: "Department not found" });
    }

    res.json({ success: true, data: department });
  } catch (error) {
    const errMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    res.status(400).json({ success: false, message: errMessage });
  }
};

export const getAllDepartments = catchAsync(async (req, res) => {
  const departments = await DepartmentModel.aggregate([
    {
      $lookup: {
        from: "schools", // Make sure the collection name matches in MongoDB
        localField: "schoolId",
        foreignField: "_id",
        as: "school",
      },
    },
    {
      $unwind: {
        path: "$school",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "teachers", // Ensure collection name matches MongoDB
        localField: "_id",
        foreignField: "departmentId",
        as: "teachers",
      },
    },
    {
      $lookup: {
        from: "students", // Ensure collection name matches MongoDB
        localField: "_id",
        foreignField: "departmentId",
        as: "students",
      },
    },
    {
      $project: {
        _id: 1,
        name: 1,
        school: "$school.name",
        number_of_teacher: { $size: "$teachers" },
        number_of_students: { $size: "$students" },
      },
    },
  ]);

  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Departments found successfully",
    data: departments,
  });
});

export const getDepartmentsByQuery = async (req: Request, res: Response) => {
  try {
    const query = req.query;
    const departments = await DepartmentModel.find(query);
    res.json({ success: true, data: departments });
  } catch (error) {
    const errMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    res.status(500).json({ success: false, message: errMessage });
  }
};

// export const DepartmentController = {};
