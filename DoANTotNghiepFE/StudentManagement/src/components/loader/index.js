import { Oval } from 'react-loader-spinner';
import React from 'react';
import LoadingOverlay from 'react-loading-overlay';

const Loader = ({active, children}) => {
  return (
    <div style={{width: '100%', height: '100%'}}>
      <LoadingOverlay active={active} spinner={<Oval color={'#4fa94d'} />} text={'Loading...'} >
        {children}
      </LoadingOverlay>
    </div>
  );
}

export default Loader;