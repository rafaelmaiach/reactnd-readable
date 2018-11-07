import {
  getAllPosts,
  getPostsByCategory,
  addPost,
  editPost,
  deletePost,
} from 'Utils/api/posts';

export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const ADD_POST = 'ADD_POST';
export const EDIT_POST = 'EDIT_POST';
export const REMOVE_POST = 'REMOVE_POST';

export const receivePosts = posts => ({
  type: RECEIVE_POSTS,
  posts,
});

export const receiveAllPosts = () => dispatch =>
  getAllPosts()
    .then((posts) => {
      dispatch(receivePosts(posts));
    });

export const receivePostsByCategory = category => dispatch =>
  getPostsByCategory(category)
    .then((posts) => {
      dispatch(receivePosts(posts));
    });

const createPost = post => ({
  type: ADD_POST,
  post,
});

export const handleAddPost = postInfo => dispatch =>
  addPost(postInfo)
    .then((post) => {
      dispatch(createPost(post));
    });

const updatePost = post => ({
  type: EDIT_POST,
  post,
});

export const handleEditPost = postInfo => dispatch =>
  editPost(postInfo.id, postInfo.details)
    .then((post) => {
      dispatch(updatePost(post));
    });

const removePost = post => ({
  type: REMOVE_POST,
  post,
});

export const handleDeletePost = postId => dispatch =>
  deletePost(postId)
    .then((post) => {
      dispatch(removePost(post));
    });
