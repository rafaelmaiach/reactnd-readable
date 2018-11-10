import {
  RECEIVE_POST_DETAILS,
} from 'Actions/posts.creator';

const details = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_POST_DETAILS: {
      return {
        ...action.details,
      };
    }
    default:
      return state;
  }
};

export default details;
