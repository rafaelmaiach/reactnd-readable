import { RECEIVE_CATEGORIES } from 'Actions/categories.actions';

const categories = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_CATEGORIES:
      return {
        ...state,
        list: action.categories,
      };
    default:
      return state;
  }
};

export default categories;
