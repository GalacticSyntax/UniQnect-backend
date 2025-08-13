import { Request, Response } from "express";
import { courseRegistrationValidation } from "./course.registered.validation";
import { CourseRegisteredService } from "./course.registered.service";
import { StudentModel } from "../student/model/model";
import { CourseRegisteredModel } from "./model/model";
import path from "path";

const registerCourseController = async (req: Request, res: Response) => {
  try {
    const parsed = courseRegistrationValidation.parse(req.body);
    const registration =
      await CourseRegisteredService.registerCourseService(parsed);
    res.status(201).json({ success: true, data: registration });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const getCourseRegistrationsController = async (
  _req: Request,
  res: Response,
) => {
  try {
    const registrations =
      await CourseRegisteredService.getCourseRegistrationsService();
    res.status(200).json({ success: true, data: registrations });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const myRegisteredCourses = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    
    const student = await StudentModel.findOne({ userId });
    
    if (!student) {
      return res.status(400).json({ message: "studentId is required" });
    }
    
    const registeredCourses = await CourseRegisteredModel.find({
      studentId: student?._id,
    }).populate("courseList");

    res.status(200).json({
      success: true,
      message: "Registered courses fetched successfully",
      data: registeredCourses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching registered courses",
      error: error instanceof Error ? error.message : error,
    });
  }
};

/*

userId
-> teacherId
-> courseId
-> studentId's
*/

const regesteredStudent = async (req: Request, res: Response) => {
  try {
    // const { userId } = req.params;

    // if (!userId) {
    //   return res.status(400).json({ message: "userId is required" });
    // }

    // Find the teacher by userId
    // const teacher = await TeacherModel.findOne({ userId });
    // if (!teacher) {
    //   return res.status(404).json({ message: "Teacher not found" });
    // }

    // Find the courses offered by this teacher
    // const courses = await CourseOfferedModel.find({ teacherId: teacher._id })
    //   .populate("courseList");

    // if (!courses || courses.length === 0) {
    //   return res.status(404).json({ message: "No courses found for this teacher" });
    // }

    // Extract student IDs from the courses
    // const studentIds = courses.flatMap(course => course.courseList.map(student => student._id));

    // Find students registered in these courses
    // const students = await StudentModel.find({ _id: { $in: studentIds } });

    // res.status(200).json({
    //   success: true,
    //   data: students,
    // });


    const { courseId, session} = req.body;

    if (!courseId || !session) {
      return res.status(400).json({ message: "courseId and session are required" });
    }

    const students = await CourseRegisteredModel.find({ 
      courseList: { $in: courseId },
      runningSession: session,
     }).populate({
      path: "studentId",
      populate: [
        { path: "userId" },
        { path: "departmentId" },
      ]
     });

     res.status(200).json({
      success: true,
      message: "Registered students fetched successfully",
      data: students,
    });

    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching registered students",
      error: error instanceof Error ? error.message : error,
    });
  }
}

export const CourseRegisteredController = {
  registerCourseController,
  getCourseRegistrationsController,
  myRegisteredCourses,
  regesteredStudent,
};
