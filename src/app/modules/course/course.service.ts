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

// const createManyCoursesService = async (
//   courses: {
//     name: string;
//     code: string;
//     credit: number;
//     depart: string;
//     prerequisiteCourse: string[];
//   }[]
// ) => {
//   const transformedCourses = [];

//   for (const course of courses) {
//     const prerequisiteIds = await CourseUtils.convertCourseCodesToIds(course.prerequisiteCourse, CourseModel);
//     transformedCourses.push({ ...course, prerequisiteCourse: prerequisiteIds });
//   }

//   const createdCourses = await CourseModel.insertMany(transformedCourses);
//   return createdCourses;
// };

export const createManyCoursesService = async (
  courses: {
    name: string;
    code: string;
    credit: number;
    depart: string;
    prerequisiteCourse?: string[];
  }[]
) => {
  // Normalize all course codes
  const allRequestedCodes = courses.map(course =>
    course.code.toLowerCase().replace(/\s+/g, "")
  );

  // Fetch existing course codes from DB
  const existingCourses = await CourseModel.find({
    code: { $in: allRequestedCodes }
  });

  const codeToIdMap: Record<string, string> = {};
  for (const course of existingCourses) {
    codeToIdMap[course.code] = course._id.toString();
  }

  // Insert all new courses with empty prerequisites
  const insertedCourses = await CourseModel.insertMany(
    courses.map(course => ({
      ...course,
      prerequisiteCourse: []
    }))
  );

  // Add inserted courses to the map
  for (const course of insertedCourses) {
    codeToIdMap[course.code] = course._id.toString();
  }

  // Update each course's prerequisite list based on full map
  const updates = [];
  for (const course of courses) {
    const normalizedCode = course.code.toLowerCase().replace(/\s+/g, "");
    const courseId = codeToIdMap[normalizedCode];
    const prereqCodes = course.prerequisiteCourse || [];

    const missing = prereqCodes.filter(
      code => !codeToIdMap[code.toLowerCase().replace(/\s+/g, "")]
    );

    if (missing.length > 0) {
      throw new Error(`Invalid prerequisite course(s): ${missing.join(", ")}`);
    }

    const prereqIds = prereqCodes.map(
      code => codeToIdMap[code.toLowerCase().replace(/\s+/g, "")]
    );

    updates.push(
      CourseModel.findByIdAndUpdate(courseId, {
        $set: { prerequisiteCourse: prereqIds }
      })
    );
  }

  await Promise.all(updates);

  return CourseModel.find({ _id: { $in: Object.values(codeToIdMap) } });
};

const getCoursesService = async (filters: {
  code?: string;
  name?: string;
  depart?: string;
  credit?: number;
}) => {
  const query: any = {};

  if (filters.code) {
    // Normalize code: lowercase, remove all whitespaces
    query.code = filters.code.toLowerCase().replace(/\s+/g, "");
  }

  if (filters.name) {
    // Partial match, case-insensitive
    query.name = { $regex: filters.name.trim(), $options: "i" };
  }

  if (filters.depart) {
    // Partial match, case-insensitive
    query.depart = { $regex: filters.depart.trim(), $options: "i" };
  }

  if (filters.credit !== undefined) {
    query.credit = filters.credit;
  }

  return CourseModel.find(query).populate("prerequisiteCourse");
};



export const CourseService = {
  createCourseService,
  createManyCoursesService,
  getCoursesService,
};