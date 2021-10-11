import React from 'react';
import { Card, Row, Col, Badge } from 'react-bootstrap';
import ActionButtons from './ActionButtons';
const Post = ({ post }) => {
  const { status, title, description } = post;
  const typeCss =
    status === 'LEARNED'
      ? 'success'
      : status === 'LEARNING'
      ? 'warning'
      : 'danger';
  return (
    <Card className='shadow' border={typeCss}>
      <Card.Body>
        <Card.Title>
          <Row>
            <Col>
              <p className='post-title'>{title}</p>
              <Badge pill variant={typeCss}>
                {status}
              </Badge>
            </Col>
            <Col className='text-right'>
              <ActionButtons post={post} />
            </Col>
          </Row>
        </Card.Title>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Post;
