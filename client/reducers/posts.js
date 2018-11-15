import {
  RECEIVE_POSTS, RECEIVE_POST_DETAILS, ADD_POST, EDIT_POST, REMOVE_POST, VOTE_POST,
} from 'Actions/posts.creator';

const reducePosts = postsList => postsList.reduce((a, c) => {
  a[c.id] = c; //eslint-disable-line
  return a;
}, {});

const posts = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_POSTS: {
      const { posts: postsData, sortBy } = action;
      const allPosts = reducePosts(postsData);
      return {
        data: { ...allPosts },
        sortBy,
      };
    }
    case RECEIVE_POST_DETAILS: {
      const { details } = action;

      if (details.error) {
        return {
          error: 'Error receiving post details',
        };
      }

      return {
        ...state,
        data: {
          [details.id]: {
            ...details,
          },
        },
      };
    }
    case ADD_POST:
    case EDIT_POST:
    case VOTE_POST: {
      const { post } = action;
      return {
        ...state,
        data: {
          ...state.data,
          [post.id]: {
            ...post,
          },
        },
      };
    }
    case REMOVE_POST: {
      const newState = { ...state };
      delete newState.data[action.post.id];

      return { ...newState };
    }
    default:
      return state;
  }
};

export default posts;
