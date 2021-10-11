import React from 'react';
import { Button, Image, OverlayTrigger, Tooltip } from 'react-bootstrap';
import addIcon from '../../assets/plus-circle-fill.svg';

const OpenAddPostButton = ({ openAddPostModal }) => {
  return (
    <OverlayTrigger
      placement='left'
      overlay={<Tooltip>Add a new thing to learn</Tooltip>}
      transition={false}>
      {/* Prevent Warning: findDOMNode is deprecated in StrictMode. */}
      {({ ref, ...triggerHandler }) => (
        <Button
          variant='light'
          {...triggerHandler}
          className='btn-floating'
          onClick={openAddPostModal}>
          <Image
            ref={ref}
            roundedCircle
            src={addIcon}
            alt='add-post'
            width='60'
            height='60'
          />
        </Button>
      )}
    </OverlayTrigger>
  );
};

export default OpenAddPostButton;
