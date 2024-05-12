import { redirect } from 'react-router-dom';
import HttpService from './http-service';
import StorageService from './storage.service';
import { AuthKeys } from '../constant';

export const isAuthenticated = ({ request }) => {
  const token = HttpService.getAccessToken();
  const isLoggedIn = StorageService.get(AuthKeys.LOGGED_IN) === 'true';
  const userInfo = JSON.parse(JSON.stringify(StorageService.getObject(AuthKeys.CURRENT_USER)));

  console.log(isLoggedIn, token, userInfo);
  console.log((!token || !isLoggedIn))
  console.log(!token)
  console.log((!token || !isLoggedIn) &&
  !(request.url.includes('/login') || request.url.includes('/register') || request.url.includes('/change-password')))

  if (
    (!token || !isLoggedIn) &&
    !(request.url.includes('/login') || request.url.includes('/register') || request.url.includes('/change-password'))
  ) {
    return redirect('/login');
  }

  if (
    token && isLoggedIn &&
    (request.url.includes('/login'))
  ) {
    if (userInfo?.role === AuthKeys.ROLE_ADMIN) {
      return redirect('/');
    }

    return redirect('/');
  }

  return true;
};
