import { TeacherModel } from "../teacher/model/model";
import { DepartmentHeadModel } from "./model/model";


const formatAdvisorPayload = (payload: any) => {
  return {
    ...payload,
    departmentCode: payload.departmentCode?.trim().toLowerCase(),
    session: payload.session?.trim().toLowerCase(),
  };
};


export const checkIfUserIsAdvisor = async (userId: string) => {
  const teacher = await TeacherModel.findOne({ userId });
  if (!teacher) return null;

  const advisor = await DepartmentHeadModel.findOne({ teacherId: teacher._id })
    .populate({
      path: "teacherId",
      populate: { path: "userId" },
    });

  return advisor;
};

export const DepartmentHeadUtils = {
  formatAdvisorPayload,
  checkIfUserIsAdvisor,
};
