export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';
export const CURRENT_CATEGORY = 'CURRENT_CATEGORY';

export function receiveCategories(categories) {
  return {
    type: RECEIVE_CATEGORIES,
    categories,
  };
}

export function changeCurrentCategory(category) {
  return {
    type: CURRENT_CATEGORY,
    category,
  };
}
