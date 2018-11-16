import { createSelector } from 'reselect';

import { sortData } from 'Utils/common.helpers';

const commentsSelector = state => state.comments;

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
