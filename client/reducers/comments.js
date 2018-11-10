import {
  RECEIVE_POST_COMMENTS,
} from 'Actions/posts.creator';

const comments = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_POST_COMMENTS: {
      return { ...action.comments };
    }
    default:
      return state;
  }
};

export default comments;
