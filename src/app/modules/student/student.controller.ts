import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import catchAsync from "../../utils/catch.async";
import { sendResponse } from "../../utils/send.response";
import { StudentModel } from "./model/model";

export const getAllStudents = catchAsync(async (req, res) => {
  const query = req.query;
  const userQuery = new QueryBuilder(
    StudentModel.find()
      .populate({
        path: "userId",
      })
      .populate({
        path: "departmentId",
      }),
    query,
  )
    .search([])
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await userQuery.countTotal();
  const students = await userQuery.modelQuery.lean();

  const result = students.map((student) => ({
    ...student,
    fullName: (student as unknown as { userId: { fullName: string } }).userId
      .fullName,
    email: (student as unknown as { userId: { email: string } }).userId.email,
    phone: (student as unknown as { userId: { phone: string } }).userId.phone,
    gender: (student as unknown as { userId: { gender: string } }).userId
      .gender,
    image: (student as unknown as { userId: { image: string } }).userId.image,
    userId: (student as unknown as { userId: { _id: string } }).userId._id,
    department: (student as unknown as { departmentId: { name: string } })
      .departmentId.name,
  }));

  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Students found successfully",
    data: {
      meta,
      result,
    },
  });
});

export const StudentController = {};
