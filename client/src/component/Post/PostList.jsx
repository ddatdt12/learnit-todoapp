import React from 'react';
import { Col, Row } from 'react-bootstrap';
import OpenAddPostButton from './OpenAddPostButton';
import Post from './Post';

const PostList = ({ posts, setShowAddPostModal }) => {
  return (
    <>
      <Row className='row-cols-1 row-cols-md-3 g-4 mx-auto mt-3'>
        {posts.map((post) => (
          <Col key={post._id} className='my-2'>
            <Post post={post} />
          </Col>
        ))}
      </Row>
      {/* Open Add Post Modal */}
      <OpenAddPostButton
        openAddPostModal={setShowAddPostModal.bind(null, true)}
      />
    </>
  );
};

export default PostList;
