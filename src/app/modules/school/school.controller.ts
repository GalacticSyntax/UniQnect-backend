import { Request, Response } from "express";
import { SchoolModel } from "./model/model";
import catchAsync from "../../utils/catch.async";


export const createSchool = catchAsync(async (req: Request, res: Response) => {
  try {
    const school = await SchoolModel.create(req.body);
    res.status(201).json({ success: true, data: school });
  } catch (error) {
    const errMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    res.status(400).json({ success: false, message: errMessage });
  }
});


export const updateSchool = catchAsync(async (req: Request, res: Response) => {
  try {
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
  } catch (error) {
    const errMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    res.status(400).json({ success: false, message: errMessage });
  }
});


export const getAllSchools = catchAsync(async (_req: Request, res: Response) => {
  try {
    const schools = await SchoolModel.find();
    res.json({ success: true, data: schools });
  } catch (error) {
    const errMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    res.status(500).json({ success: false, message: errMessage });
  }
});


export const getSchoolsByQuery = catchAsync(async (req: Request, res: Response) => {
  try {
    const query = req.query;
    const schools = await SchoolModel.find(query);
    res.json({ success: true, data: schools });
  } catch (error) {
    const errMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    res.status(500).json({ success: false, message: errMessage });
  }
});

// export const SchoolController = {};
