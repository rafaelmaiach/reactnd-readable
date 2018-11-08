import {
  getAllPosts,
  getPostsByCategory,
  addPost,
  deletePost,
} from 'Utils/api/posts';

import {
  receivePosts,
  createPost,
  removePost,
} from './posts.actions';

const receiveAllPosts = () => dispatch =>
  getAllPosts()
    .then((posts) => {
      dispatch(receivePosts(posts));
    });

const receivePostsByCategory = category => dispatch =>
  getPostsByCategory(category)
    .then((posts) => {
      dispatch(receivePosts(posts));
    });

const handleAddPost = postInfo => dispatch =>
  addPost(postInfo)
    .then((post) => {
      dispatch(createPost(post));
    });

const handleDeletePost = postId => dispatch =>
  deletePost(postId)
    .then((post) => {
      dispatch(removePost(post));
    });

export {
  receiveAllPosts,
  receivePostsByCategory,
  handleAddPost,
  handleDeletePost,
};
