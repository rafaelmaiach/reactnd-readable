const ADD_COMMENT = 'ADD_COMMENT';
const EDIT_COMMENT = 'EDIT_COMMENT';
const REMOVE_COMMENT = 'REMOVE_COMMENT';
const VOTE_COMMENT = 'VOTE_COMMENT';

const createComment = comment => ({
  type: ADD_COMMENT,
  comment,
});

const updateComment = comment => ({
  type: EDIT_COMMENT,
  comment,
});

const removeComment = comment => ({
  type: REMOVE_COMMENT,
  comment,
});

const updateVote = comment => ({
  type: VOTE_COMMENT,
  comment,
});

export {
  ADD_COMMENT,
  EDIT_COMMENT,
  REMOVE_COMMENT,
  VOTE_COMMENT,
  createComment,
  updateComment,
  removeComment,
  updateVote,
};
