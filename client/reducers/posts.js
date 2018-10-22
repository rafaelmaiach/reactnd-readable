import { RECEIVE_POSTS } from '../actions/posts';

export default function posts(state = {}, action) {
  switch (action.type) {
    case RECEIVE_POSTS: {
      const allPosts = action.posts.reduce((a, c) => {
        a[c.id] = c; //eslint-disable-line
        return a;
      }, {});
      return {
        ...state,
        ...allPosts,
      };
    }
    default:
      return state;
  }
}
