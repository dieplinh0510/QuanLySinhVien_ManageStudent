import React from 'react';
import { Link } from 'react-router-dom';

const Page404 = () => {

  return (
    <div className="page404">
      <div className="page404__content">
        <h1>404</h1>
        <h3>Page Not Found</h3>
        <p>Sorry, the page you are looking for does not exist.</p>
        <Link to="/">Go to Home</Link>
      </div>
    </div>
  );
};

export default Page404;



