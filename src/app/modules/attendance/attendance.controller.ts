// attendance.controller.ts
import { Request, Response } from "express";
import mongoose from "mongoose";
import { attendanceModel } from "./model/model";
import { sessionModel } from "../session/model/model";
import { StudentModel } from "../student/model/model";

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
      { courseId, date },
      { courseId, date, runningSession: runningSession?.running, studentList },
      { upsert: true, new: true },
    );

    // res.status(201).json({
    //   message: "Attendance created successfully",
    //   data: savedAttendance,
    // });
    res.status(201).json({
      success: true,
      message: "Attendance created successfully",
      data: attendance,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating attendance", error });
  }
};

// GET - Fetch attendance records (optional filters)
const getAttendance = async (req: Request, res: Response) => {
  try {
    const { courseId, runningSession } = req.query;

    const query: any = {};
    if (courseId)
      query.courseId = new mongoose.Types.ObjectId(courseId as string);
    if (runningSession) query.runningSession = runningSession;

    const attendanceList = await attendanceModel
      .find(query)
      .populate("courseId")
      .populate("studentList");

    res.status(200).json({
      message: "Attendance fetched successfully",
      data: attendanceList,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching attendance", error });
  }
};

const getAttendanceByDate = async (req: Request, res: Response) => {
  try {
    const { courseId, date } = req.query;

    if (!date || !courseId) {
      return res
        .status(400)
        .json({ message: "Date and course Id is required" });
    }

    const attendance = await attendanceModel
      .findOne({ date, courseId })
      .populate("courseId")
      .populate("studentList");

    // if (attendance.length === 0) {
    //   return res.status(404).json({ message: "No attendance found for this date" });
    // }

    res.status(200).json({
      message: "Attendance fetched successfully",
      data: attendance,
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
      { new: true },
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

const myAttendanceAsStudent = async (req: Request, res: Response) => {
  try {
    const { userId, courseId } = req.query;

    if (!userId || !courseId) {
      return res
        .status(400)
        .json({ message: "userId and courseId are required" });
    }

    // Find studentId from StudentModel
    const student = await StudentModel.findOne({
      userId: new mongoose.Types.ObjectId(userId as string),
    });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Find attendance records for this student & course
    const attendanceRecords = await attendanceModel.find({
      courseId,
      "studentList.studentId": student._id,
    });

    // Map to desired format
    const result = attendanceRecords.map((record) => {
      const studentEntry = record.studentList.find((s) =>
        s.studentId.equals(student._id),
      );
      return {
        date: record.date,
        present: studentEntry?.present ?? false,
      };
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Error fetching attendance", error });
  }
};

// Helper function
function ratioToMark(ratio: number): number {
  if (ratio >= 95) return 10;
  if (ratio >= 90) return 9;
  if (ratio >= 85) return 8;
  if (ratio >= 80) return 7;
  if (ratio >= 75) return 6;
  if (ratio >= 70) return 5;
  if (ratio >= 65) return 4;
  if (ratio >= 60) return 3;
  return 0;
}

// GET all students' attendance status for a course
const allStudentAttendanceStatus = async (req: Request, res: Response) => {
  try {
    const { courseId } = req.query;

    if (!courseId) {
      return res.status(400).json({ message: "courseId is required" });
    }

    const attendanceRecords = await attendanceModel
      .find({
        courseId: new mongoose.Types.ObjectId(courseId as string),
      })
      .populate({
        path: "studentList.studentId",
      });

    if (attendanceRecords.length === 0) {
      return res.status(404).json({ message: "No attendance records found" });
    }

    const totalDays = attendanceRecords.length;
    const studentStats: Record<
      string,
      { studentId: mongoose.Types.ObjectId; presentCount: number }
    > = {};

    attendanceRecords.forEach((record) => {
      record.studentList.forEach((entry) => {
        const idStr = entry.studentId.toString();
        if (!studentStats[idStr]) {
          studentStats[idStr] = { studentId: entry.studentId, presentCount: 0 };
        }
        if (entry.present) {
          studentStats[idStr].presentCount++;
        }
      });
    });

    const result = Object.values(studentStats).map((stat) => {
      const ratio = (stat.presentCount * 100) / totalDays;
      return {
        studentId: stat.studentId,
        total: totalDays,
        present: stat.presentCount,
        ratio,
        mark: ratioToMark(ratio),
      };
    });

    res.status(200).json({ studentList: result });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching all students attendance status",
      error,
    });
  }
};

export const AttendanceController = {
  createAttendance,
  getAttendance,
  updateAttendanceDate,
  getAttendanceByDate,
  myAttendanceAsStudent,
  allStudentAttendanceStatus,
};
