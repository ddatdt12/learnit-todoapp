import { useCallback, useReducer } from 'react';

function httpReducer(state, action) {
  switch (action.type) {
    case 'SENDING':
      return { status: 'pending', data: null, error: null };
    case 'SUCCESS':
      return { status: 'completed', data: action.data, error: null };
    case 'ERROR':
      return { status: 'completed', data: null, error: action.error };
    default:
      break;
  }
  return state;
}

function useHttp(startWithPending = false) {
  const [httpState, dispatch] = useReducer(httpReducer, {
    status: startWithPending ? 'pending' : null,
    data: null,
    error: null,
  });

  const sendRequest = useCallback(async (requestFunction, requestData) => {
    dispatch({ type: 'SENDING' });
    try {
      const responseData = await requestFunction(requestData);
      console.log(responseData);
      if (responseData.success) {
        dispatch({ type: 'SUCCESS', data: responseData.data });
      } else {
        dispatch({ type: 'ERROR', error: responseData.message });
      }
    } catch (error) {
      dispatch({ type: 'ERROR', error: error.message });
    }
  }, []);

  return { sendRequest, httpState };
}

export default useHttp;
