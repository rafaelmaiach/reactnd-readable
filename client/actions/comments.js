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

const handleAddComment = commentInfo => dispatch =>
  addComment(commentInfo)
    .then((comment) => {
      dispatch(createComment(comment));
    });

const handleEditComment = commentInfo => dispatch =>
  editComment(commentInfo.id, commentInfo.details)
    .then((comment) => {
      dispatch(updateComment(comment));
    });

const handleDeleteComment = commentId => dispatch =>
  deleteComment(commentId)
    .then((comment) => {
      dispatch(removeComment(comment));
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
