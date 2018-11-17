import { combineReducers } from 'redux';
import categories from './categories';
import posts from './posts';
import comments from './comments';
import layout from './layout';
import loading from './loading';

const combinedReducers = combineReducers({
  categories, posts, comments, layout, loading,
});

export default combinedReducers;
