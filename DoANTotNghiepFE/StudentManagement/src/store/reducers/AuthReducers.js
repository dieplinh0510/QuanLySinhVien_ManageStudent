import { AuthKeys } from '../../constant';
import storageService from '../../utils/storage.service';
import * as AuthTypes from '../types/AuthTypes';

const initialState = {
  loading: false,
  data: {},
  error: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    // login
    case AuthTypes.LOGIN_REQUEST:
      return { ...state, loading: true };
    case AuthTypes.LOGIN_SUCCESS:
      // Save info log
      let user = action.payload.data;
      storageService.set(AuthKeys.ACCESS_TOKEN, user?.accessToken);
      storageService.set(AuthKeys.LOGGED_IN, true);
      storageService.setObject(AuthKeys.CURRENT_USER, user);
      return { ...state, loading: false, data: user };
    case AuthTypes.LOGIN_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // logout
    case AuthTypes.LOGOUT_REQUEST:
      return { ...state, loading: true };
    case AuthTypes.LOGOUT_SUCCESS:
      // Save info log
      storageService.remove(AuthKeys.ACCESS_TOKEN);
      storageService.set(AuthKeys.LOGGED_IN, false);
      storageService.remove(AuthKeys.CURRENT_USER);

      return { ...state, loading: false, data: {} };
    case AuthTypes.LOGOUT_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default authReducer;

