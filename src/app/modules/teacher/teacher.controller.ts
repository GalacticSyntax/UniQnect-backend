import { Request, Response } from "express";
import { TeacherModel } from "./model/model";


export const createTeacher = async (req: Request, res: Response) => {
  try {
    const teacher = await TeacherModel.create(req.body);
    res.status(201).json({ success: true, data: teacher });
  } catch (error) {
    const errMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    res.status(400).json({ success: false, message: errMessage });
  }
};


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


export const getAllTeachers = async (_req: Request, res: Response) => {

  try {
    
    const teachers = await TeacherModel.find();
    res.json({ success: true, data: teachers });
  } catch (error) {
    console.log("Hello");
    const errMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    res.status(500).json({ success: false, message: errMessage });
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
