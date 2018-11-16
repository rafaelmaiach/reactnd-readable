import { createSelector } from 'reselect';

import { sortData } from 'Utils/common.helpers';

const commentsSelector = state => state.comments;

const commentsValuesSelector = createSelector(
  commentsSelector,
  (items) => {
    const data = Object.values(items);
    const sortBy = {
      type: 'timestamp',
      order: 'decrescent',
    };

    return sortData(sortBy)(data);
  },
);

export {
  commentsValuesSelector,
};
