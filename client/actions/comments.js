import {
  addComment,
  editComment,
  deleteComment,
  editVoteForComment,
} from 'Utils/api/comments';

import {
  createComment,
  updateComment,
  removeComment,
  updateVote,
} from './comments.creator';

import { receiveDetails } from './posts';

// Create the comment and update the parent details information
const handleAddComment = commentInfo => dispatch =>
  addComment(commentInfo)
    .then((comment) => {
      dispatch(createComment(comment));
    })
    .then(() => {
      dispatch(receiveDetails(commentInfo.parentId));
    });

const handleEditComment = commentInfo => dispatch =>
  editComment(commentInfo.id, commentInfo.details)
    .then((comment) => {
      dispatch(updateComment(comment));
    });

// Delete the comment and update the parent details information
const handleDeleteComment = (commentId, parentId) => dispatch =>
  deleteComment(commentId)
    .then((comment) => {
      dispatch(removeComment(comment));
    })
    .then(() => {
      dispatch(receiveDetails(parentId));
    });

const handleVote = (commentId, option) => dispatch =>
  editVoteForComment(commentId, option)
    .then((comment) => {
      dispatch(updateVote(comment));
    });

export {
  handleAddComment,
  handleEditComment,
  handleDeleteComment,
  handleVote,
};
