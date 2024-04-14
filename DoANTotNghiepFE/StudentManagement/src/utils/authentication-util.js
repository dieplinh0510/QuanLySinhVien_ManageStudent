import { redirect } from 'react-router-dom';
import HttpService from './http-service';
import StorageService from './storage.service';
import { AuthKeys } from '../constant';

export const isAuthenticated = ({ request }) => {
  // const token = HttpService.getAccessToken();
  // const userInfo = JSON.parse(StorageService.getObject(AuthKeys.CURRENT_USER));
  //
  // if (
  //   !token &&
  //   !(request.url.includes('/login') || request.url.includes('/register'))
  // ) {
  //   return redirect('/login');
  // }
  //
  // if (
  //   token &&
  //   (request.url.includes('/login'))
  // ) {
  //   if (userInfo?.role === AuthKeys.ROLE_ADMIN) {
  //     return redirect('/admin');
  //   }
  //
  //   return redirect('/');
  // }

  return true;
};
