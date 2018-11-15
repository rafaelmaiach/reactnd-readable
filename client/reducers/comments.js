import {
  RECEIVE_POST_COMMENTS,
} from 'Actions/posts.creator';

import {
  ADD_COMMENT,
  EDIT_COMMENT,
  REMOVE_COMMENT,
  VOTE_COMMENT,
} from 'Actions/comments.creator';

import { normalizeObjectById } from 'Utils/common.helpers';

const comments = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_POST_COMMENTS: {
      const allComments = normalizeObjectById(action.comments);
      return allComments;
    }
    case ADD_COMMENT:
    case EDIT_COMMENT:
    case VOTE_COMMENT: {
      const { comment } = action;
      return {
        ...state,
        [comment.id]: {
          ...comment,
        },
      };
    }
    case REMOVE_COMMENT: {
      const newState = { ...state };
      delete newState[action.comment.id];

      return { ...newState };
    }
    default:
      return state;
  }
};

export default comments;
