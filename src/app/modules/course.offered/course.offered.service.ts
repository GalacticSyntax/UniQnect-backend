import { CourseOfferedModel } from "./model/model";
import { ICourseOffered } from "./course.offered.interface";

const createCourseOffered = async (payload: ICourseOffered) => {
  return CourseOfferedModel.create(payload);
};

const getCourseOffereds = async (filters: any = {}) => {
  return CourseOfferedModel.find(filters)
    .populate("courseId")
    .populate("courseAdvisor")
    .populate("teacherId");
};

const updateCourseOffered = async (id: string, payload: Partial<ICourseOffered>) => {
  return CourseOfferedModel.findByIdAndUpdate(id, payload, { new: true });
};

const deleteCourseOffered = async (id: string) => {
  return CourseOfferedModel.findByIdAndDelete(id);
};

const findCourseOfferedById = async (id: string) => {
  return CourseOfferedModel.findById(id)
    .populate("courseId")
    .populate("courseAdvisor")
    .populate("teacherId");
};

export const CourseOfferedService = {
  createCourseOffered,
  getCourseOffereds,
  updateCourseOffered,
  deleteCourseOffered,
  findCourseOfferedById,
};