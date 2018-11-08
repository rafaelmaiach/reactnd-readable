import { combineReducers } from 'redux';
import categories from './categories';
import posts from './posts';

const combinedReducers = combineReducers({ categories, posts });

export default combinedReducers;
