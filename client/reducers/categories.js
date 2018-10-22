import { RECEIVE_CATEGORIES, CURRENT_CATEGORY } from '../actions/categories';

export default function categories(state = {}, action) {
  switch (action.type) {
    case RECEIVE_CATEGORIES:
      return {
        ...state,
        list: action.categories,
        current: action.categories[0],
      };
    case CURRENT_CATEGORY:
      return {
        ...state,
        current: action.category,
      };
    default:
      return state;
  }
}
