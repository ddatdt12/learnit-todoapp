import { createContext, useReducer, useEffect } from 'react';
import { apiAxios } from '../api/axios';
import { authReducer } from '../reducers/authReducer';

const AuthContext = createContext();

const initialState = { isLoading: true, isAuthenticated: false, user: null };
export const AuthProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, initialState);

  //Authenticate user
  const loadUser = async () => {
    try {
      const res = await apiAxios('/api/auth');
      if (res.data.success) {
        dispatch({
          type: 'SET_AUTH',
          payload: { isAuthenticated: true, user: res.data.data.user },
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: 'SET_AUTH',
        payload: { isAuthenticated: false, user: null },
      });
    }
    //  else {
    //   dispatch({
    //     type: 'SET_AUTH',
    //     payload: { isAuthenticated: false, user: null },
    //   });
    // }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const loginHandler = async (user) => {
    try {
      const res = await apiAxios('/api/auth/login', {
        method: 'POST',
        data: {
          username: user.username,
          password: user.password,
        },
      });
      dispatch({
        type: 'SET_AUTH',
        payload: { isAuthenticated: true, user: res.data.data.user },
      });
      return res.data;
    } catch (error) {
      dispatch({
        type: 'SET_AUTH',
        payload: { isAuthenticated: false, user: null },
      });
      return (
        error?.response?.data ?? { success: false, message: error.message }
      );
    }
  };

  const registerHandler = async (user) => {
    try {
      const res = await apiAxios('/api/auth/register', {
        method: 'POST',
        data: user,
      });
      dispatch({
        type: 'SET_AUTH',
        payload: { isAuthenticated: true, user: res.data.data.user },
      });
      return res.data;
    } catch (error) {
      dispatch({
        type: 'SET_AUTH',
        payload: { isAuthenticated: false, user: null },
      });
      return (
        error?.response?.data ?? { success: false, message: error.message }
      );
    }
  };

  const logoutHandler = async () => {
    try {
      const res = await apiAxios('/api/auth/logout');
      if (res.data.success) {
        dispatch({
          type: 'SET_AUTH',
          payload: { isAuthenticated: false, user: null },
        });
      }
    } catch (error) {
      console.log(error.response);
    }
  };
  const authContextData = {
    authState,
    loginHandler,
    registerHandler,
    logoutHandler,
  };
  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
