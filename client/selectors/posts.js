import { createSelector } from 'reselect';

// All posts selector
const postsSelector = state => state.posts;

// Specific post selector
const postSelector = (state, postId) => state.posts.error ? null : state.posts[postId];

const postsValuesSelector = createSelector(
  postsSelector,
  items => items.error ? null : Object.values(items),
);

export {
  postsValuesSelector,
  postSelector,
};
