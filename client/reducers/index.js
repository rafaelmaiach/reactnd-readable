import { combineReducers } from 'redux';
import categories from './categories';
import posts from './posts';
import comments from './comments';
import layout from './layout';

const combinedReducers = combineReducers({
  categories, posts, comments, layout,
});

export default combinedReducers;
