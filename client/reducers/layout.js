import {
  CHANGE_APP_LAYOUT,
} from 'Actions/layout.creator';

const layout = (state = {}, action) => {
  switch (action.type) {
    case CHANGE_APP_LAYOUT: {
      if (action.layout === 'normal') {
        return false;
      }

      if (action.layout === 'box') {
        return true;
      }

      return state;
    }
    default:
      return state;
  }
};

export default layout;
