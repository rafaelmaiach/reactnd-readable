import { getAllCategories } from 'Utils/api/categories';

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';

export const receiveCategories = categories => ({
  type: RECEIVE_CATEGORIES,
  categories,
});

export const receiveAllCategories = () => dispatch =>
  getAllCategories()
    .then((categories) => {
      dispatch(receiveCategories(categories));
    });
