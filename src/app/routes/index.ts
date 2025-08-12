import express from "express";
import { IRouteSchema } from "../interface/interface";
import { DummyRoutes } from "../modules/dummy/dummy.route";
import { UserRoutes } from "../modules/user/user.route";
import { StudentRoutes } from "../modules/student/student.route";
import { TeacherRoutes } from "../modules/teacher/teacher.route";
import { SchoolRoutes } from "../modules/school/school.route";
import { DepartmentRoutes } from "../modules/department/department.route";
import { ResultRoutes } from "../modules/result/result.route";
import { CurriculumRoutes } from "../modules/curriculum/curriculum.route";
import { CurriculumEquivalentCourseRoutes } from "../modules/curriculum.equivalent.course/curriculum.equivalent.course.route";
import { CourseOfferedRoutes } from "../modules/course.offered/course.offered.route";
import { CourseAdvisorRoutes } from "../modules/course.advisor/course.advisor.route";
import { CourseRoutes } from "../modules/course/course.route";
import { AttendanceRoutes } from "../modules/attendance/attendance.route";
import { AdminRoutes } from "../modules/admin/admin.route";
import { CourseRegisteredRoutes } from "../modules/course.registered/course.registered.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { DepartmentHeadRoutes } from "../modules/department.head/department.head.route";

const router = express.Router();

const moduleRoutes: Array<IRouteSchema> = [
  {
    path: "/dummy",
    route: DummyRoutes,
  },
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/student",
    route: StudentRoutes,
  },
  {
    path: "/teacher",
    route: TeacherRoutes,
  },
  {
    path: "/school",
    route: SchoolRoutes,
  },
  {
    path: "/department",
    route: DepartmentRoutes,
  },
  {
    path: "/result",
    route: ResultRoutes,
  },
  {
    path: "/curriculum",
    route: CurriculumRoutes,
  },
  {
    path: "/curriculum-equivalent-course",
    route: CurriculumEquivalentCourseRoutes,
  },
  {
    path: "/course-offered",
    route: CourseOfferedRoutes,
  },
  {
    path: "/course-registered",
    route: CourseRegisteredRoutes,
  },
  {
    path: "/course-advisor",
    route: CourseAdvisorRoutes,
  },
  // {
  //   path: "/department-head",
  //   route: DepartmentHeadRoutes,
  // },
  {
    path: "/course",
    route: CourseRoutes,
  },
  {
    path: "/attendance",
    route: AttendanceRoutes,
  },
  {
    path: "/admin",
    route: AdminRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
];

moduleRoutes.forEach(({ path, route }) => router.use(path, route));

export default router;
