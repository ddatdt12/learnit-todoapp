import React from 'react';
import Spinner from 'react-bootstrap/esm/Spinner';

const Loading = () => {
  return (
    <div className='d-flex justify-content-center mt-2'>
      <Spinner animation='border' variant='info' />
    </div>
  );
};
export default Loading;
