import insertIcon from '../assets/icon/insert-icon.png';
import statusIcon from '../assets/icon/menu-icon.png';
import { AuthKeys } from '../constant';

// admin:
// - Quản lý sinh viên
// - Quản lý môn học
// - Quản lý giảng viên

// teacher:
// - Thông tin sinh viên
// - Quản lý trạng thái file
// - Thông tin lớp học

// student:
// - Thông tin cá nhân
// - Đăng ký học phần

const adminRole = [
  AuthKeys.ROLE_ADMIN,
];

const teacherRole = [
  AuthKeys.ROLE_TEACHER,
];

const studentRole = [
  AuthKeys.ROLE_STUDENT,
];


const routes = [
  { path: 'admin/students', name: 'Quản lý sinh viên', exact: true, icon: insertIcon, allowedRoles: adminRole },
  { path: 'admin/subject-manager', name: 'Quản lý môn học', exact: true, icon: statusIcon, allowedRoles: adminRole },
  { path: 'admin/teachers', name: 'Quản lý giảng viên', exact: true, icon: insertIcon, allowedRoles: adminRole },
  { path: 'teacher/students', name: 'Thông tin sinh viên', exact: true, icon: statusIcon, allowedRoles: teacherRole },
  {
    path: 'teacher/file-status',
    name: 'Quản lý trạng thái file',
    exact: true,
    icon: statusIcon,
    allowedRoles: teacherRole,
  },
  { path: 'teacher/classes', name: 'Thông tin lớp học', exact: true, icon: statusIcon, allowedRoles: teacherRole },
  {
    // path: 'students/detail?studentId=:studentId',
    path: 'students/detail',
    name: 'Thông tin cá nhân',
    exact: true,
    icon: statusIcon,
    allowedRoles: studentRole,
  },
  {
    // path: 'student/subjects?studentId=:studentId',
    path: 'student/subjects',
    name: 'Đăng ký học phần',
    exact: true,
    icon: statusIcon,
    allowedRoles: studentRole,
  },
];

export const getRoutes = (user) => {
  const role = user?.roleName;
  return routes.filter(route => route.allowedRoles.includes(role));
};

export default routes;
