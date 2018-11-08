const RECEIVE_POSTS = 'RECEIVE_POSTS';
const ADD_POST = 'ADD_POST';
const REMOVE_POST = 'REMOVE_POST';

const receivePosts = posts => ({
  type: RECEIVE_POSTS,
  posts,
});

const createPost = post => ({
  type: ADD_POST,
  post,
});

const removePost = post => ({
  type: REMOVE_POST,
  post,
});

export {
  RECEIVE_POSTS,
  ADD_POST,
  REMOVE_POST,
  receivePosts,
  createPost,
  removePost,
};
