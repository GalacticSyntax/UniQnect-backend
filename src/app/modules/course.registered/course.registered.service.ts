import { CourseRegistrationBody } from "./course.registered.validation";
import {sessionModel} from "../session/model/model";
import {CourseRegisteredModel} from "./model/model";

const registerCourseService = async (data: CourseRegistrationBody) => {
  // Get the running session
  const runningSession = await sessionModel.findOne({});
  if (!runningSession) {
    throw new Error("No running session found");
  }

  // Create course registration
  const registration = await CourseRegisteredModel.create({
    ...data,
    sessionId: runningSession._id,
  });

  return registration;
};

const getCourseRegistrationsService = async () => {
  return await CourseRegisteredModel.find().populate("studentId courseId sessionId");
};


export const CourseRegisteredService = {
  registerCourseService,
  getCourseRegistrationsService,
};
