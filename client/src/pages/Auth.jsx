import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import Login from '../component/Auth/Login';
import Register from '../component/Auth/Register';
import AuthContext from '../contexts/AuthContext';
import Loading from '../component/UI/Loading';

const Auth = ({ authRoute }) => {
  const {
    authState: { isLoading, isAuthenticated },
  } = useContext(AuthContext);
  let body;

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  if (isLoading) {
    body = <Loading />;
  } else
    body = (
      <>
        {authRoute === 'login' && <Login />}
        {authRoute === 'register' && <Register />}
      </>
    );
  return (
    <div className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1>LearnIt </h1>
          <h4>Keep track of what you're doing</h4>
          {body}
        </div>
      </div>
    </div>
  );
};

export default Auth;
