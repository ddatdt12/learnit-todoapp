import Alert from 'react-bootstrap/Alert';

const AlertMessage = ({ info }) => {
  return info && <Alert variant={info.type}>{info.message}</Alert>;
};

export default AlertMessage;
