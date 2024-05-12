import React from 'react';
import DefaultLayout from './containers/admin/layout/DefaultLayout';
import InputMark from './containers/admin/input_mark';
import Login from './containers/auth/login';
import StudentDetail from './containers/admin/student_detail';
import FileInput from './containers/admin/file_input';
import SubjectManager from './containers/admin/subject_manager';
import ClassManager from './containers/admin/class_manager';
import FileStatus from './containers/admin/file_status';
import { createBrowserRouter } from 'react-router-dom';
import { isAuthenticated } from './utils/authentication-util';
import StudentManager from './containers/admin/student_manager';
import StudentAccumulated from './containers/admin/student_detail/accumulated';
import ChangePassword from './containers/auth/change_password';
import TeacherManager from './containers/admin/teacher_manager';
import StudentClass from './containers/admin/student_manager/student_class';
import { AuthKeys } from './constant';
import Index from './containers/auth/register';
import storageService from './utils/storage.service';
import StudentClassRegister from './containers/student/class_register';
import StudentSubjectRegister from './containers/student/subject_register';
import TeacherClass from './containers/teacher/class';

export const adminRole = [
  AuthKeys.ROLE_ADMIN,
];

export const teacherRole = [
  AuthKeys.ROLE_TEACHER,
];

export const studentRole = [
  AuthKeys.ROLE_STUDENT,
];

export const adminTeacherStudentRole = [
  AuthKeys.ROLE_ADMIN,
  AuthKeys.ROLE_TEACHER,
  AuthKeys.ROLE_STUDENT,
];

export const adminTeacherRole = [
  AuthKeys.ROLE_ADMIN,
  AuthKeys.ROLE_TEACHER,
];

export const adminStudentRole = [
  AuthKeys.ROLE_ADMIN,
  AuthKeys.ROLE_STUDENT,
];

export const teacherStudentRole = [
  AuthKeys.ROLE_TEACHER,
  AuthKeys.ROLE_STUDENT,
];

function getRoutes() {
  const role = JSON.parse(storageService.get(AuthKeys.CURRENT_USER))?.roleName;
  if (role === undefined || !role) {
    return [
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Index />,
      },
    ];
  }
  return [
    {
      path: '/',
      children: [
        {
          path: '',
          element: <DefaultLayout />,
          loader: isAuthenticated,
          children: [
            {
              path: 'admin/teachers',
              element: <TeacherManager />,
              allowedRoles: adminRole,
            },
            {
              path: 'admin/students',
              element: <StudentManager />,
              allowedRoles: adminTeacherRole,
            },
            {
              path: 'teacher/students',
              element: <StudentManager />,
              allowedRoles: adminTeacherRole,
            },
            {
              path: 'teacher/input-mark',
              element: <InputMark />,
              allowedRoles: teacherRole,
            },
            {
              path: 'teacher/file-status',
              element: <FileStatus />,
              allowedRoles: teacherRole,
            },
            {
              path: 'admin/subject-manager',
              element: <SubjectManager />,
              allowedRoles: adminRole,
            },
            {
              path: 'teacher/student/:id',
              element: <StudentDetail />,
              allowedRoles: adminTeacherStudentRole,
            },
            {
              path: 'admin/student/:id',
              element: <StudentDetail />,
              allowedRoles: adminTeacherStudentRole,
            },
            {
              path: 'teacher/file-input',
              element: <FileInput />,
              allowedRoles: teacherRole,
            },
            {
              path: 'admin/class-manager',
              element: <ClassManager />,
              allowedRoles: adminRole,
            },
            {
              path: 'teacher/class-info',
              element: <ClassManager />,
              allowedRoles: teacherRole,
            },
            {
              path: 'teacher/classes',
              element: <TeacherClass />,
              allowedRoles: teacherRole,
            },
            {
              path: 'students/detail',
              element: <StudentDetail />,
              allowedRoles: adminTeacherStudentRole,
            },
            {
              path: 'students/accumulated',
              element: <StudentAccumulated />,
              allowedRoles: adminTeacherStudentRole,
            },
            {
              path: 'students/class',
              element: <StudentClass />,
              allowedRoles: adminTeacherStudentRole,
            },
            {
              path: 'student/subjects',
              element: <StudentSubjectRegister />,
              allowedRoles: studentRole,
            },
            {
              path: 'student/classes',
              element: <StudentClassRegister />,
              allowedRoles: studentRole,
            },
          ],
        },
      ],
    },
    {
      path: '/login',
      element: <Login />,
      loader: isAuthenticated,
      allowedRoles: adminTeacherStudentRole,
    },
    {
      path: '/change-password',
      element: <ChangePassword />,
      allowedRoles: adminTeacherStudentRole,
    },
    {
      path: '/register',
      element: <Index />,
      allowedRoles: studentRole,
    },
  ].filter((route) => {
    if (route.allowedRoles) {
      return route.allowedRoles.includes(role);
    }
    return true;
  });
}

const router = createBrowserRouter(getRoutes());

export default router;
