import { SchoolModel } from "./model/model";
import catchAsync from "../../utils/catch.async";
import { sendResponse } from "../../utils/send.response";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";

export const createSchool = catchAsync(async (req, res) => {
  const school = await SchoolModel.create(req.body);
  res.status(201).json({ success: true, data: school });

  return sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "School created successfully",
    data: school,
  });
});

export const updateSchool = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    throw new AppError(httpStatus.BAD_REQUEST, "Name is required for update");
  }

  const school = await SchoolModel.findByIdAndUpdate(
    id,
    { name },
    { new: true },
  );

  if (!school) {
    throw new AppError(httpStatus.NOT_FOUND, "School not found");
  }

  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "School created successfully",
    data: school,
  });
});

export const getAllSchools = catchAsync(async (_req, res) => {
  const schools = await SchoolModel.find();
  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "School created successfully",
    data: schools,
  });
});

export const getSchoolsByQuery = catchAsync(async (req, res) => {
  const query = req.query;
  const schools = await SchoolModel.find(query);
  res.json({ success: true, data: schools });
});

// export const SchoolController = {};
