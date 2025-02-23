import { SchoolModel } from "./model/model";
import catchAsync from "../../utils/catch.async";
import { sendResponse } from "../../utils/send.response";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";

export const createSchool = catchAsync(async (req, res) => {
  const school = await SchoolModel.create(req.body);

  return sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "School created successfully",
    data: school,
  });
});

export const getSchoolBySchooldId = catchAsync(async (req, res) => {
  const { schoolId } = req.params;
  const school = await SchoolModel.findOne({
    schoolId,
  });
  console.log({ school });

  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "School found successfully",
    data: school,
  });
});

export const updateSchool = catchAsync(async (req, res) => {
  const { schoolId } = req.params;
  const { name } = req.body;

  if (!name) {
    throw new AppError(httpStatus.BAD_REQUEST, "Name is required for update");
  }

  const school = await SchoolModel.findOneAndUpdate(
    { schoolId },
    { name },
    { new: true },
  );

  if (!school) {
    throw new AppError(httpStatus.NOT_FOUND, "School not found");
  }

  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "School update successfully",
    data: school,
  });
});

export const getAllSchools = catchAsync(async (_req, res) => {
  const schools = await SchoolModel.aggregate([
    {
      $lookup: {
        from: "departments",
        localField: "_id",
        foreignField: "schoolId",
        as: "departments",
      },
    },
    {
      $project: {
        _id: 1,
        name: 1,
        schoolId: 1,
        number_of_departments: { $size: "$departments" },
      },
    },
  ]);

  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Schools found successfully",
    data: schools,
  });
});

export const getSchoolsByQuery = catchAsync(async (req, res) => {
  const query = req.query;
  const schools = await SchoolModel.find(query);
  res.json({ success: true, data: schools });
});

// export const SchoolController = {};
