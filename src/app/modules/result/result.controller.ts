// result.controller.ts
import { Request, Response } from "express";
import { ResultModel } from "./model/model";
import { sessionModel } from "../session/model/model"; 
import mongoose from "mongoose";
import { CourseModel } from "../course/model/model";


const createResult = async (req: Request, res: Response) => {
  try {
    const { courseId, studentId, mid, final, extra, attendance } = req.body;

    if (!courseId || !studentId) {
      return res.status(400).json({
        message: "courseId and studentId are required"
      });
    }

    const runningSessionDoc = await sessionModel.findOne({ });

    if (!runningSessionDoc) {
      return res.status(404).json({ message: "No running session found" });
    }


    const result = new ResultModel({
      courseId,
      studentId,
      mid,
      final,
      extra,
      attendance,
      runningSession: runningSessionDoc.running, 
    });

    const savedResult = await result.save();

    res.status(201).json({
      message: "Result created successfully",
      data: savedResult
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating result",
      error: error instanceof Error ? error.message : error
    });
  }
};

export const getResult = async (req: Request, res: Response) => {
  try {
    const { courseId, studentId } = req.query;
    if (!courseId && !studentId ) {
      return res.status(400).json({
        message: "filter (courseId, studentId) is required"
      });
    }

    const runningSession = await sessionModel.findOne({});

    const filter: Record<string, any> = {};
    if (courseId) filter.courseId = courseId;
    if (studentId) filter.studentId = studentId;
    if (runningSession) filter.runningSession = runningSession;

    const results = await ResultModel.find(filter)
      .populate({
        path: "studentId",
        populate: { path: "userId" }, // assuming you have userId in StudentModel
      })
      .populate("courseId")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Results fetched successfully",
      count: results.length,
      data: results,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching results",
      error: error instanceof Error ? error.message : error,
    });
  }
};


export const ResultController = {
  createResult,
  getResult,
};
