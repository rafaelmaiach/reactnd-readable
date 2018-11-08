import { getAllCategories } from 'Utils/api/categories';
import { receiveCategories } from './categories.actions';

const receiveAllCategories = () => dispatch =>
  getAllCategories()
    .then((categories) => {
      dispatch(receiveCategories(categories));
    });

export {
  receiveAllCategories,
};
