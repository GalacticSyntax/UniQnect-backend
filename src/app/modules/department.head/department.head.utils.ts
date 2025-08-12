import { IDepartmentHead } from "./department.head.interface";

export const DepartmentHeadUtils = {
  formatCreatePayload: (data: IDepartmentHead) => ({
    departmentCode: data.departmentCode,
    teacherId: data.teacherId,
  }),

  formatUpdatePayload: (data: Partial<IDepartmentHead>) => ({
    ...(data.departmentCode && { departmentCode: data.departmentCode }),
    ...(data.teacherId && { teacherId: data.teacherId }),
  }),
};
