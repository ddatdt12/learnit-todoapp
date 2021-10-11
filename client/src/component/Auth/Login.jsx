import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';
import { useContext, useState } from 'react';
import AlertMessage from '../Layout/AlertMessage';

const Login = () => {
  const {
    authState: { isLoading },
    loginHandler,
  } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState(null);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const res = await loginHandler({ username, password });

    if (!res.success) {
      setAlert({ type: 'danger', message: res.message });
    }
  };

  return (
    <>
      <Form className='my-4' onSubmit={onSubmitHandler}>
        {alert && <AlertMessage info={alert} />}
        <Form.Group>
          <Form.Control
            type='text'
            placeholder='Username'
            name='username'
            required
            value={username}
            onChange={(e) => {
              if (alert) setAlert(null);
              setUsername(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className='my-3'>
          <Form.Control
            type='password'
            placeholder='Password'
            name='password'
            required
            value={password}
            onChange={(e) => {
              if (alert) setAlert(null);
              setPassword(e.target.value);
            }}
          />
        </Form.Group>
        <Button variant='success' type='submit'>
          {isLoading ? 'Loading...' : 'Login'}
        </Button>
      </Form>
      <p>
        Don't have an account?
        <Link to='/register'>
          <Button variant='info' size='sm' className='ml-2'>
            Register
          </Button>
        </Link>
      </p>
    </>
  );
};

export default Login;
