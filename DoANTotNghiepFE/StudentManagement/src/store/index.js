import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import studentReducer from './reducers/StudentReducers';
import authReducer from './reducers/AuthReducers';
import rootSaga from './sagas';
import courseReducer from './reducers/CourseReducers';
import classReducer from './reducers/ClassReducers';
import subjectReducer from './reducers/SubjectReducers';
import uploadReducer from './reducers/UploadReducers';
import pointInputReducer from './reducers/PointInputReducers';
import teacherReducer from './reducers/TeacherReducers';

const rootReducer = combineReducers({
  auth: authReducer,
  student: studentReducer,
  course: courseReducer,
  class: classReducer,
  subject: subjectReducer,
  upload: uploadReducer,
  pointInput: pointInputReducer,
  teacher: teacherReducer,
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware),
);

sagaMiddleware.run(rootSaga);

export default store;
