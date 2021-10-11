import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { Spinner } from 'react-bootstrap';

const initialState = {
  title: '',
  url: '',
  description: '',
};

const AddPostModal = ({
  isShownModal,
  closeAddPostModal,
  addNewPost,
  isLoading,
  setToast,
}) => {
  const [newPost, setNewPost] = useState(initialState);

  const { title, url, description } = newPost;

  const onChangeHandler = (e) => {
    setNewPost((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { success, message } = await addNewPost(newPost);
    setToast({
      show: true,
      type: success ? 'success' : 'danger',
      message,
    });
    if (success) resetAddPostModal();
  };

  const resetAddPostModal = () => {
    setNewPost(initialState);
    closeAddPostModal();
  };

  return (
    <Modal show={isShownModal} onHide={resetAddPostModal}>
      <Modal.Header closeButton>
        <Modal.Title>What do you want to learn?</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Control
              type='text'
              placeholder='Title'
              name='title'
              required
              aria-describedby='title-help'
              value={title}
              onChange={onChangeHandler}
            />
            <Form.Text id='title-help' muted>
              Required
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Control
              as='textarea'
              rows={3}
              placeholder='Description'
              name='description'
              value={description}
              onChange={onChangeHandler}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type='text'
              placeholder='Youtube Tutorial URL'
              name='url'
              value={url}
              onChange={onChangeHandler}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={resetAddPostModal}>
            Cancel
          </Button>
          <Button variant='primary' type='submit'>
            {isLoading ? (
              <Spinner
                animation='border'
                variant='info'
                size='sm'
                role='status'></Spinner>
            ) : (
              'LearnIt!'
            )}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddPostModal;
