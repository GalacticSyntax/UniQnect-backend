import { Request, Response } from "express";
import { DepartmentModel } from "./model/model";


export const createDepartment = async (req: Request, res: Response) => {
  try {
    const department = await DepartmentModel.create(req.body);
    res.status(201).json({ success: true, data: department });
  } catch (error) {
    const errMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    res.status(400).json({ success: false, message: errMessage });
  }
};


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


export const getAllDepartments = async (_req: Request, res: Response) => {
  try {
    const departments = await DepartmentModel.find();
    res.json({ success: true, data: departments });
  } catch (error) {
    const errMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    res.status(500).json({ success: false, message: errMessage }); 
  }
};


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
