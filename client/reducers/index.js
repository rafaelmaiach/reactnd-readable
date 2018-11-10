import { combineReducers } from 'redux';
import categories from './categories';
import posts from './posts';
import details from './details';
import comments from './comments';

const combinedReducers = combineReducers({
  categories, posts, details, comments,
});

export default combinedReducers;
