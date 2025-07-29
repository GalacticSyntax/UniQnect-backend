const formatAdvisorPayload = (payload: any) => {
  return {
    ...payload,
    departmentCode: payload.departmentCode?.trim().toLowerCase(),
    session: payload.session?.trim().toLowerCase(),
  };
};

export const CourseAdvisorUtils = {
  formatAdvisorPayload,
};
