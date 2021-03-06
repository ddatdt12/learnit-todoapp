export const authReducer = (state, action) => {
  const { type, payload } = action;

  let updatedState = {};
  switch (type) {
    case 'AUTH_LOADING': {
      updatedState = { ...state, isLoading: true };
      break;
    }
    case 'SET_AUTH': {
      updatedState = { ...state, ...payload, isLoading: false };
      break;
    }
    case 'FAILED_LOGIN': {
      updatedState = { isAuthenticated: false, user: null, isLoading: false };
      break;
    }
    default:
      updatedState = { ...state };
      break;
  }
  return updatedState;
};
