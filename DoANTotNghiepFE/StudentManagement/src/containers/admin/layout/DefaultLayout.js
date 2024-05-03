import React from 'react';
import { Outlet } from 'react-router-dom';
import { AppSidebar } from '../../../components';
import './style.scss';
import storageService from '../../../utils/storage.service';
import { AuthKeys } from '../../../constant';

const DefaultLayout = () => {
  const handleLogout = () => {
    console.log('Logout');
    storageService.remove(AuthKeys.CURRENT_USER);
    storageService.remove(AuthKeys.ACCESS_TOKEN);
    storageService.set(AuthKeys.LOGGED_IN, false);

    window.location.href = '/login';
  };

  return (
    <div className={'app-container'}>
      <AppSidebar handleLogout={handleLogout} />
      <div className={'main-content'}>
        <Outlet />
      </div>
    </div>
  );
};

export default DefaultLayout;
