const postReducer = (state, action) => {
  const { type, payload } = action;

  let updatedState;
  switch (type) {
    case 'SENDING': {
      updatedState = { ...state, isPostLoading: true };
      break;
    }
    case 'DONE': {
      updatedState = { ...state, isPostLoading: false };
      break;
    }
    case 'LOAD_POSTS_SUCCESS': {
      updatedState = { isPostLoading: false, posts: payload };
      break;
    }
    case 'ADD_NEW_POST': {
      updatedState = {
        isPostLoading: false,
        posts: [...state.posts, payload],
      };
      break;
    }
    case 'DELETE_POST': {
      updatedState = {
        isPostLoading: false,
        posts: state.posts.filter((post) => post._id !== payload),
      };
      break;
    }
    case 'UPDATE_POST': {
      const currentPosts = [...state.posts];
      const index = currentPosts.findIndex((post) => post._id === payload._id);
      currentPosts[index] = payload;
      updatedState = {
        isPostLoading: false,
        posts: currentPosts,
      };
      break;
    }
    // case 'ERROR': {
    //   updatedState = { ...state, isPostLoading: false, error: payload };
    //   break;
    // }
    default:
      updatedState = { ...state };
      break;
  }
  return updatedState;
};

export default postReducer;
