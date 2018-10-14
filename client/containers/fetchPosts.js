import {
  getAllPosts,
  getPostDetails,
  getPostComments,
  editVoteForPost,
  addPost,
  editPost,
  deletePost,
} from 'Utils/api/posts';

const uuid = require('uuid/v4');

const fetchAllPosts = () => {
  getAllPosts()
    .then(r => console.log(r))
    .catch(e => console.log(e));
};

const fetchPostDetails = () => {
  getPostDetails('8xf0y6ziyjabvozdd253nd')
    .then(r => console.log(r))
    .catch(e => console.log(e));
};

const fetchPostComments = () => {
  getPostComments('8xf0y6ziyjabvozdd253nd')
    .then(r => console.log(r))
    .catch(e => console.log(e));
};

const fetchEditVoteForPost = () => {
  editVoteForPost('8xf0y6ziyjabvozdd253nd', { option: 'upVote' })
    .then(r => console.log(r))
    .catch(e => console.log(e));
};

const fetchAddPost = () => {
  const post = {
    id: uuid(),
    timestamp: Date.now(),
    title: 'A new post',
    body: 'A new post body',
    author: 'A new post author',
    category: 'react',
  };

  addPost(post)
    .then(r => console.log(r))
    .catch(e => console.log(e));
};

const fetchEditPost = () => {
  const details = {
    title: 'Udacity is the best place to learn React.',
    body: 'Everyone says so after all!',
  };

  editPost('8xf0y6ziyjabvozdd253nd', details)
    .then(r => console.log(r))
    .catch(e => console.log(e));
};

const fetchDeletePost = () => {
  deletePost('8xf0y6ziyjabvozdd253nd')
    .then(r => console.log(r))
    .catch(e => console.log(e));
};

export {
  fetchAllPosts,
  fetchPostDetails,
  fetchPostComments,
  fetchEditVoteForPost,
  fetchAddPost,
  fetchEditPost,
  fetchDeletePost,
};
