import { RECEIVE_POSTS } from 'Actions/posts';

export default function posts(state = {}, action) {
  switch (action.type) {
    case RECEIVE_POSTS: {
      const allPosts = action.posts.reduce((a, c) => {
        a[c.id] = c; //eslint-disable-line
        return a;
      }, {});
      return { ...allPosts };
    }
    default:
      return state;
  }
}
