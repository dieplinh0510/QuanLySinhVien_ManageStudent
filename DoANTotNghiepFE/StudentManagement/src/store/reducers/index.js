import { combineReducers } from 'redux';
import students from './StudentReducers';
import auth from './AuthReducers';

export default combineReducers({
  auth,
  students,
});
