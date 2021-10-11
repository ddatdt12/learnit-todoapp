import { useContext } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { Redirect, Route } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';
import NavbarMenu from '../Layout/NavbarMenu';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const {
    authState: { isLoading, isAuthenticated, user },
  } = useContext(AuthContext);
  if (isLoading) {
    return (
      <div className='spinner-container'>
        <Spinner animation='border' variant='info' />
      </div>
    );
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <>
            <NavbarMenu />
            <Component {...props} user={user} />
          </>
        ) : (
          <Redirect to='/login' />
        )
      }
    />
  );
};

export default ProtectedRoute;
