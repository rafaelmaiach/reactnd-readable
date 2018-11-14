import { createSelector } from 'reselect';

const layoutSelector = state => state.layout;

const getLayoutValue = createSelector(
  layoutSelector,
  items => items.value,
);

export {
  getLayoutValue,
};
