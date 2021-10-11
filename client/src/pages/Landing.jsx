import React from 'react';
import { Redirect } from 'react-router-dom';

const Landing = () => {
  if (true) {
    return <Redirect to='/login' />;
  }
  return <div></div>;
};

export default Landing;
