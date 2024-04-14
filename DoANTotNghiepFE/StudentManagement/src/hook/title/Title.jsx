import React from 'react';
import './Title.scss';

const Title = ({ text }) => {
  return (
    <div className={'title-text'}>{text}</div>
  );
};

export default Title;