import { createSelector } from 'reselect';
import { capitalize } from 'Utils/common.helpers';

// Selector to get categories from store
const categoriesSelector = state => state.categories;

// Selector to get only the values from the categories object
const categoriesValuesSelector = createSelector(
  categoriesSelector,
  items => Object.values(items),
);

// Convert the result to have names capitalized
const categoriesNameSelector = createSelector(
  categoriesValuesSelector,
  items => items.map(({ name, path }) => ({ name: capitalize(name), path }))
);

export {
  categoriesNameSelector,
  categoriesValuesSelector,
};
