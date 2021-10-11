import axios from 'axios';
import { createContext, useCallback, useReducer, useState } from 'react';
import postReducer from '../reducers/postReducer';

const PostContext = createContext();

export const PostContextProvider = ({ children }) => {
  const [postsState, dispatch] = useReducer(postReducer, {
    posts: [],
    isPostLoading: false,
  });

  const [showAddPostModal, setShowAddPostModal] = useState(false);
  const [updatePostModal, setUpdatePostModal] = useState({
    show: false,
    chosenPost: {},
  });

  const [toast, setToast] = useState({ show: false, type: null, message: '' });

  const getPosts = useCallback(async () => {
    dispatch({ type: 'SENDING' });
    try {
      const res = await axios('/api/posts');
      if (res.data.success) {
        dispatch({ type: 'LOAD_POSTS_SUCCESS', payload: res.data.data });
      }
    } catch (error) {
      dispatch({
        type: 'ERROR',
        payload: error.response.data || {
          success: false,
          message: 'Server error!',
        },
      });
    }
  }, []);
  const addNewPost = async (newPost) => {
    dispatch({ type: 'SENDING' });
    try {
      const res = await axios('/api/posts', { method: 'POST', data: newPost });
      if (res.data.success) {
        dispatch({ type: 'ADD_NEW_POST', payload: res.data.data });
      }
      return { success: true, message: 'You just add a post. Happy learning!' };
    } catch (error) {
      dispatch({ type: 'DONE' });
      return (
        error.response.data || {
          success: false,
          message: 'Server error!',
        }
      );
    }
  };
  const deletePost = async (postId) => {
    try {
      const res = await axios(`/api/posts/${postId}`, { method: 'DELETE' });
      if (res.data.success) {
        dispatch({ type: 'DELETE_POST', payload: postId });
      }
    } catch (error) {
      console.log(error.response);
    }
  };
  const updatePost = async (postId, updatedPost) => {
    // dispatch({ type: 'SENDING' });
    try {
      const res = await axios(`/api/posts/${postId}`, {
        method: 'PUT',
        data: updatedPost,
      });
      if (res.data.success) {
        dispatch({
          type: 'UPDATE_POST',
          payload: { _id: postId, ...updatedPost },
        });
      }
      return { success: true, message: 'Update successfully!' };
    } catch (error) {
      dispatch({ type: 'DONE' });
      return error.response
        ? error.response.data
        : {
            success: false,
            message: 'Server error!',
          };
    }
  };

  const PostContextData = {
    postsState,
    getPosts,
    addModal: {
      addNewPost,
      showAddPostModal,
      setShowAddPostModal,
    },
    updateModal: {
      updatePostModal,
      setUpdatePostModal,
      updatePost,
    },
    toast,
    setToast,
    actionsButtons: { deletePost },
  };
  return (
    <PostContext.Provider value={PostContextData}>
      {children}
    </PostContext.Provider>
  );
};

export default PostContext;