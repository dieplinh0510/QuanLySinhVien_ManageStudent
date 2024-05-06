import { toast } from 'react-toastify';
import { AuthKeys } from '../constant';
import HttpService from '../utils/http-service';
import StorageService from '../utils/storage.service';

export const login = async (payload) => {
  let response = await HttpService.post('/auth/login', {
    body: payload,
  });

  return HttpService.checkResponseCommon(response, null, "Đăng nhập thành công!");
};

export const register = async (payload) => {
  let response = await HttpService.post('auth/register', {
    body: payload,
  });

  if (response?.data && response?.data?.status === 500) {
    toast.error(response?.data?.message);
    throw Error(response?.data?.message);
  }

  return response?.data;
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

  return HttpService.checkResponseCommon(response, null, "Change password successfully");
};
