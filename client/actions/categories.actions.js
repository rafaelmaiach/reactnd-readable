const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';

const receiveCategories = categories => ({
  type: RECEIVE_CATEGORIES,
  categories,
});

export {
  RECEIVE_CATEGORIES,
  receiveCategories,
};
