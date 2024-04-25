import React from 'react';
import DefaultLayout from './containers/admin/layout/DefaultLayout';
import InputMark from './containers/admin/input_mark';
import Login from './containers/login';
import StudentDetail from './containers/admin/student_detail';
import AccumulatedPoint from './containers/admin/accumulated_point';
import FileInput from './containers/admin/file_input';
import SubjectManager from './containers/admin/subject_manager';
import ClassManager from './containers/admin/class_manager';
import FileStatus from './containers/admin/file_status';
import { createBrowserRouter } from 'react-router-dom';
import { isAuthenticated } from './utils/authentication-util';
import StudentManager from './containers/admin/student_manager';
import StatisticsByClass from './containers/admin/statistics_by_class';
import StudentAccumulated from './containers/admin/student_detail/accumulated';

const router = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        path: 'admin',
        element: <DefaultLayout />,
        loader: isAuthenticated,
        children: [
          {
            path: 'students',
            element: <StudentManager />,
          },
          {
            path: 'statistic',
            element: <StatisticsByClass />,
          },
          {
            path: 'input-mark',
            element: <InputMark />,
          },
          {
            path: 'file-status',
            element: <FileStatus />,
          },
          {
            path: 'subject-manager',
            element: <SubjectManager />,
          },
          {
            path: 'student/:id',
            element: <StudentDetail />,
          },
          {
            path: 'accumulated-point/:id',
            element: <AccumulatedPoint />,
          },
          {
            path: 'file-input',
            element: <FileInput />,
          },
          {
            path: 'class-manager',
            element: <ClassManager />,
          },
          {
            path: 'students/detail',
            element: <StudentDetail />,
          },
          {
            path: 'students/accumulated',
            element: <StudentAccumulated />,
          },
        ],
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
    loader: isAuthenticated,
  },
]);

export default router;
