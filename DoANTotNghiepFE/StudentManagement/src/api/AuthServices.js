import { AuthKeys } from '../constant';
import HttpService from '../utils/http-service';
import StorageService from '../utils/storage.service';

export const login = async (payload) => {
  let response = await HttpService.post('/auth/login', {
    body: payload,
  });

  return HttpService.checkResponseCommon(response, null, 'Đăng nhập thành công!');
};

export const register = async (payload) => {
  const formData = new FormData();

  for (let key in payload) {
    formData.set(key, payload[key]);
  }

  let response = await HttpService.post('users/create-student', {
    body: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return HttpService.checkResponseCommon(response, [], 'Đăng ký thành công!');
};

export const isLoggedIn = () => {
  const accessToken = StorageService.get(AuthKeys.ACCESS_TOKEN);
  const loggedIn = StorageService.get(AuthKeys.LOGGED_IN) === 'true';
  return !!accessToken && loggedIn;
};

// change password
export const changePassword = async (payload) => {
  let response = await HttpService.post('/auth/change-password', {
    body: payload,
  });

  return HttpService.checkResponseCommon(response, null, 'Thay đổi mật khẩu thành công!');
};
