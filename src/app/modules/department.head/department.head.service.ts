

const createAdvisor = async (payload: ICourseAdvisor) => {
  return CourseAdvisorModel.create(payload);
};

const getAdvisors = async (filters: any) => {
  const query: any = {};
  if (filters.department)
    query.departmentCode = new RegExp(filters.department, "i");
  if (filters.session) query.session = filters.session;
  if (filters.semester) query.semester = parseInt(filters.semester);
  // If name filtering needed, join with teacher collection and filter via aggregation
  // return CourseAdvisorModel.find(query).populate("teacherId").populate("offeredCourses");
  return CourseAdvisorModel.find(query)
    .populate({
      path: "teacherId",
      populate: {
        path: "userId", // this must be a valid ref in the Teacher schema
      },
    })
    .populate("offeredCourses");
};

const updateAdvisor = async (id: string, payload: Partial<ICourseAdvisor>) => {
  return CourseAdvisorModel.findByIdAndUpdate(id, payload, { new: true });
};

const deleteAdvisor = async (id: string) => {
  return CourseAdvisorModel.findByIdAndDelete(id);
};

const findAdvisorById = async (id: string) => {
  return CourseAdvisorModel.findById(id)
    .populate("teacherId") // Populate teacher details if needed
    .populate("offeredCourses"); // Populate offered courses if needed
};

export const DepartmentHeadService = {
  createAdvisor,
  getAdvisors,
  updateAdvisor,
  deleteAdvisor,
  findAdvisorById,
};
