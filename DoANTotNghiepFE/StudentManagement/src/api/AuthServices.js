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
  return HttpService.checkResponseCommon(response, null, 'Đăng ký thành công!');
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

// API forgot password
export const forgotPassword = async (payload) => {
  let response = await HttpService.post('/auth/forgot-password/otp', {
    params: payload,
  });

  return HttpService.checkResponseCommon(response, null, 'Mã OTP đã được gửi vào email của bạn!');
};

// API OTP
export const otp = async (payload) => {
  let response = await HttpService.post('/auth/valid-otp', {
    params: payload,
  });

  return HttpService.checkResponseCommon(response, null, 'Xác thực thành công!');
};

// API change password with OTP
export const changePasswordWithOtp = async (payload) => {
  let response = await HttpService.post('/auth/change-password/otp', {
    body: payload,
  });

  return HttpService.checkResponseCommon(response, null, 'Thay đổi mật khẩu thành công!');
};

// API get user info
export const getMyInfo = async () => {
  let response = await HttpService.get('/auth/me');

  return response?.data?.data;
};

// API update my info
export const updateMyInfo = async (payload) => {
  const formData = new FormData();

  for (let key in payload) {
    formData.set(key, payload[key]);
  }

  let response = await HttpService.put('/students/me', {
    body: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return HttpService.checkResponseCommon(response, null, 'Cập nhật thông tin thành công!');
};