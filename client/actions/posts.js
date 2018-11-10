import {
  getAllPosts,
  getPostDetails,
  getPostComments,
  getPostsByCategory,
  addPost,
  editPost,
  deletePost,
  editVoteForPost,
} from 'Utils/api/posts';

import {
  receivePosts,
  receivePostDetails,
  receivePostComments,
  createPost,
  updatePost,
  removePost,
  updateVote,
} from './posts.creator';

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

const receiveDetails = postId => dispatch =>
  getPostDetails(postId)
    .then((details) => {
      dispatch(receivePostDetails(details));
    });

const receiveComments = postId => dispatch =>
  getPostComments(postId)
    .then((comments) => {
      dispatch(receivePostComments(comments));
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

const handleVote = (postId, option) => dispatch =>
  editVoteForPost(postId, option)
    .then((post) => {
      dispatch(updateVote(post));
    });

export {
  receiveAllPosts,
  receivePostsByCategory,
  receiveDetails,
  receiveComments,
  handleAddPost,
  handleEditPost,
  handleDeletePost,
  handleVote,
};
