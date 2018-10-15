import {
  getCommentDetails,
  editVoteForComment,
  addComment,
  editComment,
  deleteComment,
} from 'Utils/api/comments';

// const uuid = require('uuid/v4');

const fetchCommentDetails = () => {
  getCommentDetails('894tuq4ut84ut8v4t8wun89g')
    .then(r => console.log(r))
    .catch(e => console.log(e));
};

const fetchEditVoteForComment = () => {
  editVoteForComment('894tuq4ut84ut8v4t8wun89g', { option: 'upVote' })
    .then(r => console.log(r))
    .catch(e => console.log(e));
};

const fetchAddComment = () => {
  const comment = {
    id: 'id-to-delete',
    timestamp: Date.now(),
    body: 'A new comment',
    author: 'A new author comment',
    parentId: '8xf0y6ziyjabvozdd253nd',
  };

  addComment(comment)
    .then(r => console.log(r))
    .catch(e => console.log(e));
};

const fetchEditComment = () => {
  const details = {
    timestamp: Date.now(),
    body: 'A edited comment',
  };

  editComment('id-to-delete', details)
    .then(r => console.log(r))
    .catch(e => console.log(e));
};

const fetchDeleteComment = () => {
  deleteComment('id-to-delete')
    .then(r => console.log(r))
    .catch(e => console.log(e));
};

export {
  fetchCommentDetails,
  fetchEditVoteForComment,
  fetchAddComment,
  fetchEditComment,
  fetchDeleteComment,
};
