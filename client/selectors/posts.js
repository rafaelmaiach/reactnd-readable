import { createSelector } from 'reselect';

import { sortPosts } from 'Utils/posts.helpers';

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

      return sortBy ? sortPosts(sortBy)(dataValues) : dataValues;
    }

    return null;
  }
);

const postSelector = (state, postId) => state.posts.error ? null : state.posts[postId];

export {
  postsValuesSelector,
  postSelector,
};
