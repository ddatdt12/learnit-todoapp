import React from 'react';
import Button from 'react-bootstrap/esm/Button';
import Card from 'react-bootstrap/esm/Card';

const NoPost = ({ username, openAddPostModal }) => {
  return (
    <Card className='text-center mx-5 my-5'>
      <Card.Header as='h1'>Hi {username}</Card.Header>
      <Card.Body>
        <Card.Title>Welcome to LearnIt</Card.Title>
        <Card.Text>
          Click the button below to track your first skill to learn
        </Card.Text>
        <Button variant='primary' onClick={openAddPostModal}>
          LearnIt!
        </Button>
      </Card.Body>
    </Card>
  );
};

export default NoPost;
