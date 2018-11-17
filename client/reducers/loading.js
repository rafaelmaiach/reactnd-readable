import {
  SHOW_LOADING,
  HIDE_LOADING,
} from 'Actions/loading.creator';

const layout = (state = {}, action) => {
  switch (action.type) {
    case SHOW_LOADING:
    case HIDE_LOADING:
      return action.loading;
    default:
      return state;
  }
};

export default layout;
