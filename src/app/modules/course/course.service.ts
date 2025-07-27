import { CourseModel } from "./model/model";
import { ICourse } from "./course.interface";
import { CourseUtils } from "./course.utils";

export const createCourseService = async (data: {
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


export const CourseService = {
  createCourseService,
};