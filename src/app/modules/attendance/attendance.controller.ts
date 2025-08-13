// attendance.controller.ts
import { Request, Response } from "express";
import mongoose from "mongoose";
import {attendanceModel} from "./model/model";
import { sessionModel } from "../session/model/model";

// type typeSession =  {
//   running: string;
//   previous: string | null;
// }

// POST - Create attendance
const createAttendance = async (req: Request, res: Response) => {
  try {
    const runningSession = await sessionModel.findOne({});
    const { courseId, date, studentList } = req.body;
    
    // const attendance = new attendanceModel({...req.body, runningSession: runningSession?.running });
    // const savedAttendance = await attendance.save();

    const attendance = await attendanceModel.findOneAndUpdate(
      {courseId, date},
      { courseId, date, runningSession: runningSession?.running },
      { upsert: true, new: true }
    )

    // res.status(201).json({
    //   message: "Attendance created successfully",
    //   data: savedAttendance,
    // });

  } catch (error) {
    res.status(500).json({ message: "Error creating attendance", error });
  }
};

// GET - Fetch attendance records (optional filters)
const getAttendance = async (req: Request, res: Response) => {
  try {
    const { courseId, runningSession } = req.query;

    const query: any = {};
    if (courseId) query.courseId = new mongoose.Types.ObjectId(courseId as string);
    if (runningSession) query.runningSession = runningSession;

    const attendanceList = await attendanceModel.find(query)
      .populate("courseId")
      .populate("attendedStudentsId");

    res.status(200).json({
      message: "Attendance fetched successfully",
      data: attendanceList,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching attendance", error });
  }
};

// PATCH - Update only the date
const updateAttendanceDate = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { date } = req.body;

    if (!date) {
      return res.status(400).json({ message: "Date is required to update" });
    }

    const updatedAttendance = await attendanceModel.findByIdAndUpdate(
      id,
      { date },
      { new: true }
    );

    if (!updatedAttendance) {
      return res.status(404).json({ message: "Attendance not found" });
    }

    res.status(200).json({
      message: "Attendance date updated successfully",
      data: updatedAttendance,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating attendance date", error });
  }
};













export const AttendanceController = {
  createAttendance,
  getAttendance,
  updateAttendanceDate,
};
