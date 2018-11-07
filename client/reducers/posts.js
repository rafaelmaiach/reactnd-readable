import {
  RECEIVE_POSTS, ADD_POST, EDIT_POST, REMOVE_POST,
} from 'Actions/posts';

const reducePosts = postsList => postsList.reduce((a, c) => {
  a[c.id] = c; //eslint-disable-line
  return a;
}, {});

export default function posts(state = {}, action) {
  switch (action.type) {
    case RECEIVE_POSTS: {
      const allPosts = reducePosts(action.posts);
      return { ...allPosts };
    }
    case ADD_POST: {
      const { post } = action;
      return {
        ...state,
        post,
      };
    }
    case EDIT_POST: {
      const { post } = action;
      return {
        ...state,
        [post.id]: {
          ...post,
        },
      };
    }
    case REMOVE_POST: {
      const { id } = action.post;
      const newState = reducePosts(Object.values(state).filter(post => post.id !== id));
      return {
        ...newState,
      };
    }
    default:
      return state;
  }
}
