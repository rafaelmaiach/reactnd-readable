import { createSelector } from 'reselect';
import { capitalize } from 'Utils/common.helpers';

const categoriesSelector = state => state.categories;

const categoriesValuesSelector = createSelector(
  categoriesSelector,
  items => Object.values(items),
);

const categoriesNameSelector = createSelector(
  categoriesValuesSelector,
  items => items.map(({ name, path }) => ({ name: capitalize(name), path }))
);

export {
  categoriesNameSelector,
  categoriesValuesSelector,
};
