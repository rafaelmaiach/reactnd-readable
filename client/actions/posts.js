import {
  getAllPosts,
  getPostsByCategory,
  addPost,
  deletePost,
} from 'Utils/api/posts';

export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const ADD_POST = 'ADD_POST';
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

const removePost = post => ({
  type: REMOVE_POST,
  post,
});

export const handleDeletePost = postId => dispatch =>
  deletePost(postId)
    .then((post) => {
      dispatch(removePost(post));
    });
