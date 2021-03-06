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

// Reduce the array of comments to add replies information to
// posts who have replies
const reduceReplying = data => data.reduce((acc, curr) => {
  let newAcc;

  if (curr.replyingTo) {
    newAcc = {
      ...acc,
      [curr.id]: {
        ...curr,
      },
      [curr.replyingTo]: {
        ...acc[curr.replyingTo],
        replies: {
          ...acc[curr.replyingTo].replies,
          [curr.id]: {
            ...curr,
          },
        },
      },

    };
  } else {
    newAcc = {
      ...acc,
      [curr.id]: {
        ...curr,
      },
    };
  }

  return newAcc;
}, {});

// Wrapper to call reduceReplying
const setReplies = (state) => {
  const data = Object.values(state);
  const dataWithReplies = reduceReplying(data);
  return dataWithReplies;
};

const comments = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_POST_COMMENTS: {
      const allComments = normalizeObjectById(action.comments);
      const commentsWithReplies = setReplies(allComments);

      return commentsWithReplies;
    }
    case ADD_COMMENT: {
      const { comment } = action;
      const newState = {
        ...state,
        [comment.id]: {
          ...comment,
        },
      };

      const commentsWithReplies = setReplies(newState);

      return commentsWithReplies;
    }
    case EDIT_COMMENT:
    case VOTE_COMMENT: {
      const { comment } = action;
      const newState = {
        ...state,
        [comment.id]: {
          ...comment,
        },
      };

      const commentsWithReplies = setReplies(newState);

      return commentsWithReplies;
    }
    case REMOVE_COMMENT: {
      const newState = { ...state };
      const { comment } = action;

      if (comment.replyingTo && newState[comment.replyingTo]) {
        delete newState[comment.replyingTo].replies[comment.id];
      }

      delete newState[comment.id];

      return newState;
    }
    default:
      return state;
  }
};

export default comments;
