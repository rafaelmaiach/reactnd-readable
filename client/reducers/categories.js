import { RECEIVE_CATEGORIES } from 'Actions/categories.creator';

const categories = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_CATEGORIES:
      return {
        ...state,
        ...action.categories,
      };
    default:
      return state;
  }
};

export default categories;
