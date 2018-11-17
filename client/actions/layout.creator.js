const CHANGE_APP_LAYOUT = 'CHANGE_LAYOUT';

// Change the layout from normal (list) to box (side by side)
const setAppLayout = layout => ({
  type: CHANGE_APP_LAYOUT,
  layout,
});

export {
  CHANGE_APP_LAYOUT,
  setAppLayout,
};
