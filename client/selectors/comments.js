import { createSelector } from 'reselect';

import { sortData } from 'Utils/common.helpers';

// Get comments from store
const commentsSelector = state => state.comments;

// Get the comments from store and return them sorted by creation date
const commentsValuesSelector = createSelector(
  commentsSelector,
  (items) => {
    const sortBy = {
      type: 'timestamp',
      order: 'decrescent',
    };

    const data = Object.values(items).filter(item => !item.replyingTo);

    return sortData(sortBy)(data);
  },
);

// Get the replies from a specific comment
const commentReplies = (state, id) => {
  if (id && state.comments[id]) {
    return Object.values(state.comments[id].replies);
  }

  return null;
};

export {
  commentsValuesSelector,
  commentReplies,
};
