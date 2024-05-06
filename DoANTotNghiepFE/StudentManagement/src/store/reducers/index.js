import { combineReducers } from 'redux';
import students from './StudentReducers';
import auth from './AuthReducers';
import courseReducer from './CourseReducers';
import classReducer from './ClassReducers';
import subjectReducer from './SubjectReducers';
import uploadReducer from './UploadReducers';
import pointInputReducer from './PointInputReducers';
import teacherReducer from './TeacherReducers';

export default combineReducers({
  auth,
  students,
  courseReducer,
  classReducer,
  subjectReducer,
  uploadReducer,
  pointInputReducer,
  teacherReducer,
});
