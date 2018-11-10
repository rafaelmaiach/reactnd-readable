import { getAllCategories } from 'Utils/api/categories';
import { receiveCategories } from './categories.creator';

const receiveAllCategories = () => dispatch =>
  getAllCategories()
    .then((categories) => {
      dispatch(receiveCategories(categories));
    });

export {
  receiveAllCategories,
};
