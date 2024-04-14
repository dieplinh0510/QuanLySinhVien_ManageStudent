import React from 'react';
import { Outlet } from 'react-router-dom';
import { AppSidebar } from '../../../components';
import './style.scss';

const DefaultLayout = () => {
  return (
    <div className={'app-container'}>
      <AppSidebar />
      <div className={'main-content'}>
        <Outlet />
      </div>
    </div>
  );
};

export default DefaultLayout;
