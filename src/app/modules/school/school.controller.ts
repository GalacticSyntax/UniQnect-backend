import { Request, Response } from "express";
import { SchoolModel } from "./model/model";
import catchAsync from "../../utils/catch.async";
import { sendResponse } from "../../utils/send.response";
import httpStatus from "http-status";

export const createSchool = catchAsync(async (req: Request, res: Response) => {
  const school = await SchoolModel.create(req.body);
  res.status(201).json({ success: true, data: school });

  return sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "School created successfully",
    data: school,
  });
});

export const updateSchool = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    return res
      .status(400)
      .json({ success: false, message: "Name is required for update" });
  }

  const school = await SchoolModel.findByIdAndUpdate(
    id,
    { name },
    { new: true },
  );

  if (!school) {
    return res
      .status(404)
      .json({ success: false, message: "School not found" });
  }

  res.json({ success: true, data: school });
});

export const getAllSchools = catchAsync(
  async (_req: Request, res: Response) => {
    const schools = await SchoolModel.find();
    res.json({ success: true, data: schools });
  },
);

export const getSchoolsByQuery = catchAsync(
  async (req: Request, res: Response) => {
    const query = req.query;
    const schools = await SchoolModel.find(query);
    res.json({ success: true, data: schools });
  },
);

// export const SchoolController = {};
