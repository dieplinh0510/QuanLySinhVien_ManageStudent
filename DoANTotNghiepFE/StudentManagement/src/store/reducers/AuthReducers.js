import { AuthKeys } from '../../constant';
import storageService from '../../utils/storage.service';
import * as AuthTypes from '../types/AuthTypes';

const initialState = {
  loading: false,
  data: {},
  error: null,
  navigatePath: null,
  navigatePathRegister: null,
  navigatePathForgotPassword: null,
  infoForgotPassword: null,
  timeout: 0,
  navigatePathChangePassword: null,
  otp: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    // login
    case AuthTypes.LOGIN_REQUEST:
      return { ...state, loading: true };
    case AuthTypes.LOGIN_SUCCESS:
      // Save info log
      let user = action.payload.data;
      if (user === null) {
        return { ...state, loading: false, navigatePath: null, data: {}, error: '' };
      }

      storageService.set(AuthKeys.ACCESS_TOKEN, user?.jwt);
      storageService.setObject(AuthKeys.CURRENT_USER, { ...user?.information, roleName: user?.roleName });
      if (user?.information?.isFirstLogin === null || user?.information?.isFirstLogin === true) {
        return { ...state, loading: false, data: user, navigatePath: '/change-password-first-login' };
      }

      storageService.set(AuthKeys.LOGGED_IN, true);

      if (user?.roleName === AuthKeys.ROLE_ADMIN) {
        return { ...state, loading: false, data: user, navigatePath: '/admin/students' };
      } else if (user?.roleName === AuthKeys.ROLE_TEACHER) {
        return { ...state, loading: false, data: user, navigatePath: '/teacher/students' };
      }

      return {
        ...state,
        loading: false,
        data: user,
        navigatePath: `/students/detail?studentId=${user.information.id}`,
      };
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

    // change password
    case AuthTypes.CHANGE_PASSWORD_REQUEST:
      return { ...state, loading: true };
    case AuthTypes.CHANGE_PASSWORD_SUCCESS:
      let userUpdate = action.payload.data;
      if (userUpdate === null) {
        return {
          ...state,
          loading: false,
          navigatePath: 'change-password-first-login',
          data: {},
          error: 'Thay đổi mật khẩu thất bại!',
        };
      }

      storageService.set(AuthKeys.ACCESS_TOKEN, userUpdate?.jwt);
      storageService.setObject(AuthKeys.CURRENT_USER, { ...user?.information, roleName: user?.roleName });
      storageService.set(AuthKeys.LOGGED_IN, true);

      return { ...state, loading: false, data: userUpdate, navigatePath: '/students' };
    case AuthTypes.CHANGE_PASSWORD_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // Register
    case AuthTypes.REGISTER_REQUEST:
      return { ...state, loading: true };
    case AuthTypes.REGISTER_SUCCESS:
      if (action.payload.data === null) {
        return { ...state, loading: false, error: 'Đăng ký thất bại!' };
      }
      return { ...state, loading: false, data: action.payload.data, navigatePathRegister: '/login' };
    case AuthTypes.REGISTER_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // Forgot password
    case AuthTypes.FORGOT_PASSWORD_REQUEST:
      return { ...state, loading: true };
    case AuthTypes.FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        navigatePathForgotPassword: '/forgot-password/otp',
        infoForgotPassword: action.payload.data,
        timeout: action.payload.timeout ?? 60,
      };
    case AuthTypes.FORGOT_PASSWORD_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // API OTP
    case AuthTypes.OTP_REQUEST:
      return { ...state, loading: true, otp: action.payload.otp};
    case AuthTypes.OTP_SUCCESS:
      if (action.payload.data === null) {
        return { ...state, loading: false, error: 'Xác thực OTP thất bại!' };
      }
      return { ...state, loading: false, navigatePath: '/change-password' };
    case AuthTypes.OTP_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case AuthTypes.OTP_CHANGE:
      return { ...state, timeout: action.payload };

    // API change password with OTP
    case AuthTypes.CHANGE_PASSWORD_OTP_REQUEST:
      return { ...state, loading: true };
    case AuthTypes.CHANGE_PASSWORD_OTP_SUCCESS:
      return { ...state, loading: false, navigatePathChangePassword: '/login', navigatePath: null };
    case AuthTypes.CHANGE_PASSWORD_OTP_FAILURE:
      return { ...state, loading: false, error: action.payload };


    default:
      return state;
  }
};

export default authReducer;

