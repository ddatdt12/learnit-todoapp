import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';

const UpdatePostModal = ({
  updatePostModal: { show, chosenPost },
  closeUpdatePostModal,
  setToast,
  isLoading,
  updatePost,
}) => {
  const [updatedPost, setUpdatedPost] = useState({});

  useEffect(() => {
    setUpdatedPost({
      title: chosenPost.title || '',
      url: chosenPost.url || '',
      description: chosenPost.description || '',
      status: chosenPost.status || '',
    });
  }, [chosenPost]);

  const { title, url, description, status } = updatedPost;
  const onChangeHandler = (e) => {
    setUpdatedPost((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(updatedPost);
    const { success, message } = await updatePost(chosenPost._id, updatedPost);
    setToast({
      show: true,
      type: success ? 'success' : 'danger',
      message: message,
    });
    closeUpdatePostModal();
  };

  return (
    <Modal show={show} animation={false} onHide={closeUpdatePostModal}>
      <Modal.Header closeButton>
        <Modal.Title>Making progress?</Modal.Title>
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
              value={title || ''}
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
              value={description || ''}
              onChange={onChangeHandler}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type='text'
              placeholder='Youtube Tutorial URL'
              name='url'
              value={url || ''}
              onChange={onChangeHandler}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              as='select'
              value={status || ''}
              name='status'
              onChange={onChangeHandler}>
              <option value='TO LEARN'>TO LEARN</option>
              <option value='LEARNING'>LEARNING</option>
              <option value='LEARNED'>LEARNED</option>
            </Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={closeUpdatePostModal}>
            Cancel
          </Button>
          <Button variant='primary' type='submit'>
            {isLoading ? 'Adding...' : 'LearnIt!'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default UpdatePostModal;
