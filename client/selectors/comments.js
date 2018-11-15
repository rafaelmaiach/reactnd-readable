import { createSelector } from 'reselect';

const commentsSelector = state => state.comments;

const commentsValuesSelector = createSelector(
  commentsSelector,
  items => Object.values(items),
);

export {
  commentsValuesSelector,
};
