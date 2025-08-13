import { StudentModel } from "./model/model";
import { Request, Response } from "express";

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const students = await StudentModel.find()
      .populate("userId")       // get full user details
      .populate("departmentId") // get full department details
      .sort({ createdAt: -1 }); // newest first (optional)

    res.status(200).json({
      message: "All students fetched successfully",
      data: students,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching students",
      error: error instanceof Error ? error.message : error,
    });
  }
};

export const StudentController = {
  getAllStudents,
};
