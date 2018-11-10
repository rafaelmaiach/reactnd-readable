const RECEIVE_POSTS = 'RECEIVE_POSTS';
const RECEIVE_POST_DETAILS = 'RECEIVE_POST_DETAILS';
const RECEIVE_POST_COMMENTS = 'RECEIVE_POST_COMMENTS';
const ADD_POST = 'ADD_POST';
const EDIT_POST = 'EDIT_POST';
const REMOVE_POST = 'REMOVE_POST';
const VOTE_POST = 'VOTE_POST';

const receivePosts = posts => ({
  type: RECEIVE_POSTS,
  posts,
});

const receivePostDetails = details => ({
  type: RECEIVE_POST_DETAILS,
  details,
});

const receivePostComments = comments => ({
  type: RECEIVE_POST_COMMENTS,
  comments,
});

const createPost = post => ({
  type: ADD_POST,
  post,
});

const updatePost = post => ({
  type: EDIT_POST,
  post,
});

const removePost = post => ({
  type: REMOVE_POST,
  post,
});

const updateVote = post => ({
  type: VOTE_POST,
  post,
});

export {
  RECEIVE_POSTS,
  RECEIVE_POST_DETAILS,
  RECEIVE_POST_COMMENTS,
  ADD_POST,
  EDIT_POST,
  REMOVE_POST,
  VOTE_POST,
  receivePosts,
  receivePostDetails,
  receivePostComments,
  createPost,
  updatePost,
  removePost,
  updateVote,
};
