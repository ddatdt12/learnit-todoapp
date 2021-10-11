import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';
import AlertMessage from '../Layout/AlertMessage';

const Register = () => {
  const { registerHandler } = useContext(AuthContext);
  const [registerForm, setRegisterForm] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [alert, setAlert] = useState(null);
  const { username, password, confirmPassword } = registerForm;

  const onChangeForm = (e) => {
    setRegisterForm((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const res = await registerHandler(registerForm);

    if (!res.success) {
      setAlert({ type: 'danger', message: res.message });
      setTimeout(() => {
        setAlert(null);
      }, 5000);
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
            value={username}
            onChange={onChangeForm}
            required
          />
        </Form.Group>
        <Form.Group className='my-3'>
          <Form.Control
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={onChangeForm}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type='password'
            placeholder='Confirm Password'
            name='confirmPassword'
            value={confirmPassword}
            onChange={onChangeForm}
          />
        </Form.Group>
        <Button variant='success' type='submit' className='my-3'>
          Register
        </Button>
      </Form>
      <p>
        Already have an account?
        <Link to='/login'>
          <Button variant='info' size='sm' className='ml-2'>
            Login
          </Button>
        </Link>
      </p>
    </>
  );
};

export default Register;
