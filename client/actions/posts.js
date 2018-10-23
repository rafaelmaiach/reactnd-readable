import { getPostsByCategory } from 'Utils/api/posts';

export const RECEIVE_POSTS = 'RECEIVE_POSTS';

export const receivePosts = posts => ({
  type: RECEIVE_POSTS,
  posts,
});

export const receivePostsByCategory = category => dispatch =>
  getPostsByCategory(category)
    .then((posts) => {
      dispatch(receivePosts(posts));
    });
