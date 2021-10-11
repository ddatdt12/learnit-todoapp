import React, { useContext, useEffect } from 'react';
import Loading from '../component/UI/Loading';
import NoPost from '../component/Post/NoPost';
import AddPostModal from '../component/Post/AddPostModal';
import PostList from '../component/Post/PostList';
import PostContext from '../contexts/PostContext';
import { Toast } from 'react-bootstrap';
import UpdatePostModal from '../component/Post/UpdatePostModal';

const Dashboard = (props) => {
  const { username } = props.user;

  const {
    postsState: { posts, isPostLoading },
    getPosts,
    toast: { show, type, message },
    setToast,
    addModal: { showAddPostModal, setShowAddPostModal, addNewPost },
    updateModal: { updatePostModal, setUpdatePostModal, updatePost },
  } = useContext(PostContext);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  let postList;
  if (!isPostLoading) {
    if (!posts || posts.length === 0)
      postList = (
        <NoPost
          username={username}
          openAddPostModal={setShowAddPostModal.bind(null, true)}
        />
      );
    else
      postList = (
        <PostList posts={posts} setShowAddPostModal={setShowAddPostModal} />
      );
  }
  return (
    <>
      {isPostLoading ? <Loading /> : postList}
      <AddPostModal
        isShownModal={showAddPostModal}
        closeAddPostModal={setShowAddPostModal.bind(null, false)}
        addNewPost={addNewPost}
        isLoading={isPostLoading}
        setToast={setToast}
      />
      <UpdatePostModal
        updatePostModal={updatePostModal}
        closeUpdatePostModal={setUpdatePostModal.bind(null, {
          show: false,
          chosenPost: {},
        })}
        updatePost={updatePost}
        isLoading={isPostLoading}
        setToast={setToast}
      />
      {/* After post is added, show toast */}
      <Toast
        show={show}
        style={{ position: 'fixed', top: '20%', right: '10px', zIndex: '1060' }}
        className={`bg-${type} text-white`}
        onClose={setToast.bind(null, { show: false, type: null, message: '' })}
        autohide
        delay={3000}>
        <Toast.Body>
          <strong>{message}</strong>
        </Toast.Body>
      </Toast>
    </>
  );
};

export default Dashboard;
