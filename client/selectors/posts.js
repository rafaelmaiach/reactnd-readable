import { createSelector } from 'reselect';

import { sortData } from 'Utils/common.helpers';

// All posts selector
const postsSelector = state => state.posts;

const postsValidateContentSelector = createSelector(
  postsSelector,
  items => Object.keys(items).length === 0 ? null : items,
);

const postsValidateErrorSelector = createSelector(
  postsValidateContentSelector,
  (items) => {
    if (items) {
      return (items.error || !items.data) ? null : items;
    }

    return null;
  }
);

const postsValuesSelector = createSelector(
  postsValidateErrorSelector,
  (posts) => {
    if (posts) {
      const { data, sortBy } = posts;

      const dataValues = Object.values(data);

      return sortBy ? sortData(sortBy)(dataValues) : dataValues;
    }

    return null;
  }
);

const postSelector = (state, postId) => {
  const { posts } = state;
  if (!posts || posts.error || !posts.data) {
    return null;
  }

  return posts.data[postId];
};

export {
  postsValuesSelector,
  postSelector,
};
