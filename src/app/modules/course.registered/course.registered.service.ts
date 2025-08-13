import { CourseRegistrationBody } from "./course.registered.validation";
import { sessionModel } from "../session/model/model";
import { CourseRegisteredModel } from "./model/model";
import { StudentModel } from "../student/model/model";
import mongoose from "mongoose";

const registerCourseService = async (data: CourseRegistrationBody) => {
  // Get the running session
  const runningSession = await sessionModel.findOne({});
  if (!runningSession) {
    throw new Error("No running session found");
  }

  const student = await StudentModel.findOne({ studentId: data.studentId });
  if (!student) {
    throw new Error("Student not found");
  }

  // Check if the student already has a registration for this session
  let registration = await CourseRegisteredModel.findOne({
    studentId: student._id,
    runningSession: runningSession.running,
  });

  if (registration) {
    // Merge new courses with existing, avoiding duplicates
    const updatedCourses = Array.from(
      new Set([
        ...registration.courseList.map((id) => id.toString()),
        ...data.courseId.map((id) => id.toString()),
      ]),
    ).map((id) => new mongoose.Types.ObjectId(id)); // convert back to ObjectId

    registration.courseList = updatedCourses;
    await registration.save();
  } else {
    // Create a new registration
    registration = await CourseRegisteredModel.create({
      studentId: student._id,
      courseList: [...new Set(data.courseId.map((id) => id.toString()))].map(
        (id) => new mongoose.Types.ObjectId(id),
      ),
      runningSession: runningSession.running,
    });
  }

  return registration;
};

const getCourseRegistrationsService = async () => {
  return await CourseRegisteredModel.find()
    .populate({
      path: "studentId",
      populate: [
        { path: "departmentId" }, // department
        { path: "userId" }, // user details
      ],
    })
    .populate({
      path: "courseList",
      populate: {
        path: "prerequisiteCourse",
      },
    });
};

export const CourseRegisteredService = {
  registerCourseService,
  getCourseRegistrationsService,
};
