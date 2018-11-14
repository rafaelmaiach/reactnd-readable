const CHANGE_APP_LAYOUT = 'CHANGE_LAYOUT';

const setAppLayout = layout => ({
  type: CHANGE_APP_LAYOUT,
  layout,
});

export {
  CHANGE_APP_LAYOUT,
  setAppLayout,
};
