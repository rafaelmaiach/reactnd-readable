export const RECEIVE_POSTS = 'RECEIVE_POSTS';

export const receivePosts = posts => ({
  type: RECEIVE_POSTS,
  posts,
});
