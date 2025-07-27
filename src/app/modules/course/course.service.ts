import { CourseModel } from "./model/model";
import { ICourse } from "./course.interface";
import { CourseUtils } from "./course.utils";

const createCourseService = async (data: {
  name: string;
  code: string;
  credit: number;
  depart: string;
  prerequisiteCourse: string[];
}): Promise<ICourse> => {
  const prerequisiteIds = await CourseUtils.convertCourseCodesToIds(data.prerequisiteCourse, CourseModel);

  const course = await CourseModel.create({
    ...data,
    prerequisiteCourse: prerequisiteIds
  });

  return course;
};



const createManyCoursesService = async (
  courses: {
    name: string;
    code: string;
    credit: number;
    depart: string;
    prerequisiteCourse: string[];
  }[]
) => {
  const transformedCourses = [];

  for (const course of courses) {
    const prerequisiteIds = await CourseUtils.convertCourseCodesToIds(course.prerequisiteCourse, CourseModel);
    transformedCourses.push({ ...course, prerequisiteCourse: prerequisiteIds });
  }

  const createdCourses = await CourseModel.insertMany(transformedCourses);
  return createdCourses;
};



export const CourseService = {
  createCourseService,
  createManyCoursesService,
};