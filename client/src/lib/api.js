import axios from 'axios';

export async function getAllPost() {
  try {
    const res = await axios('/api/posts');
    return res.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function addNewPost(newPost) {
  try {
    const res = await axios('/api/posts', { method: 'POST', data: newPost });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
}
