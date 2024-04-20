import { CButton, CSpinner } from '@coreui/react';
import React from 'react';
import { MDBBtn } from 'mdb-react-ui-kit';

const Button = ({
                  title,
                  color,
                  bgColor,
                  onClick,
                  width,
                  isLoading,
                  customStyle
                }) => {
  return (
    <MDBBtn
      style={{
        width: width ? width : '220px',
        backgroundColor: bgColor,
        color: color,
        ...customStyle
      }}
      color={'primary'}
      onClick={onClick}>
      {isLoading ?
        <CSpinner component="span" size="sm" aria-hidden="true"
                  style={{ marginRight: '5px' }} /> : ''
      }
      {title}
    </MDBBtn>
  );
};

export default Button;