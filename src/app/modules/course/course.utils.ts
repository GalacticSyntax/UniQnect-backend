const convertCourseCodesToIds = async (
  codes: string[],
  CourseModel: any
): Promise<string[]> => {
  const courses = await CourseModel.find({ code: { $in: codes } });
  const codeToIdMap: Record<string, string> = {};
  courses.forEach((course: { code: string; _id: any }) => {
    codeToIdMap[course.code] = course._id.toString();
  });
  
  const missingCodes = codes.filter(code => !codeToIdMap[code]);
  if (missingCodes.length > 0) {
    throw new Error(`Invalid course codes: ${missingCodes.join(", ")}`);
  }

  return codes.map(code => codeToIdMap[code]);
};

// const convertCourseCodesToIds = async (
//   codes: string[],
//   CourseModel: any
// ): Promise<string[]> => {
//   const courses = await CourseModel.find({ code: { $in: codes.map(code => code.toLowerCase().replace(/\s+/g, "")) } });
//   const codeToIdMap: Record<string, string> = {};
//   courses.forEach(course => {
//     codeToIdMap[course.code] = course._id.toString();
//   });

//   const missing = codes.filter(code => !codeToIdMap[code.toLowerCase().replace(/\s+/g, "")]);
//   if (missing.length > 0) {
//     throw new Error(`Invalid prerequisite course code(s): ${missing.join(", ")}`);
//   }

//   return codes.map(code => codeToIdMap[code.toLowerCase().replace(/\s+/g, "")]);
// };


export const CourseUtils = {
  convertCourseCodesToIds,
};