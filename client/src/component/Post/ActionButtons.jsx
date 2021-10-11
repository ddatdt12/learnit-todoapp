import Button from 'react-bootstrap/Button';
import playIcon from '../../assets/play-btn.svg';
import editIcon from '../../assets/pencil.svg';
import deleteIcon from '../../assets/trash.svg';
import PostContext from '../../contexts/PostContext';
import { useContext } from 'react';

const ActionButtons = ({ post }) => {
  const { url, _id } = post;
  const {
    updateModal: { setUpdatePostModal },
    actionsButtons: { deletePost },
  } = useContext(PostContext);

  return (
    <>
      {url && (
        <Button className='post-button' href={url} target='_blank'>
          <img src={playIcon} alt='play' width='32' height='32' />
        </Button>
      )}
      <Button className='post-button text-center'>
        <img
          src={editIcon}
          alt='edit'
          width='28'
          height='28'
          onClick={setUpdatePostModal.bind(null, {
            chosenPost: post,
            show: true,
          })}
        />
      </Button>
      <Button className='post-button' onClick={deletePost.bind(null, _id)}>
        <img src={deleteIcon} alt='delete' width='28' height='28' />
      </Button>
    </>
  );
};

export default ActionButtons;
