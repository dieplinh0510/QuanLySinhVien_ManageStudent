import insertIcon from '../assets/icon/insert-icon.png';
import statusIcon from '../assets/icon/menu-icon.png';
import InputMark from './admin/input_mark';
import FileStatus from './admin/file_status';
import SubjectManager from './admin/subject_manager';
import ClassManager from './admin/class_manager';
import StudentManager from './admin/student_manager';
import StatisticsByClass from './admin/statistics_by_class';

const routes = [
  { path: 'students', name: 'Quản lý sinh viên', element: StudentManager, exact: true, icon: insertIcon },
  { path: 'statistic', name: 'Thống kê theo lớp', element: StatisticsByClass, exact: true, icon: insertIcon },
  { path: 'input-mark', name: 'Nhập điểm', element: InputMark, exact: true, icon: insertIcon },
  { path: 'file-status', name: 'Quản lý trạng thái file', element: FileStatus, exact: true, icon: statusIcon },
  { path: 'subject-manager', name: 'Quản lý môn học', element: SubjectManager, exact: true, icon: statusIcon },
  { path: 'class-manager', name: 'Quản lý lớp học', element: ClassManager, exact: true, icon: statusIcon },
];

export default routes;
