const SHOW_LOADING = 'SHOW_LOADING';
const HIDE_LOADING = 'HIDE_LOADING';

const showLoading = () => ({
  type: SHOW_LOADING,
  loading: true,
});

const hideLoading = () => ({
  type: HIDE_LOADING,
  loading: false,
});

export {
  SHOW_LOADING,
  HIDE_LOADING,
  showLoading,
  hideLoading,
};
