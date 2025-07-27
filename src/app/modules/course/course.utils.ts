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

export const CourseUtils = {
  convertCourseCodesToIds,
};