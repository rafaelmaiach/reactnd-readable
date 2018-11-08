import {
  getAllPosts,
  getPostsByCategory,
  addPost,
  editPost,
  deletePost,
} from 'Utils/api/posts';

import {
  receivePosts,
  createPost,
  updatePost,
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

const handleEditPost = postInfo => dispatch =>
  editPost(postInfo.id, postInfo.details)
    .then((post) => {
      dispatch(updatePost(post));
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
  handleEditPost,
  handleDeletePost,
};
