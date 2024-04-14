import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import studentReducer from './reducers/StudentReducers';
import auth from './reducers/AuthReducers';
import rootSaga from './sagas';

const rootReducer = combineReducers({
  auth,
  student: studentReducer,
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware),
);

sagaMiddleware.run(rootSaga);

export default store;
