import thunk from 'redux-thunk';
import { applyMiddleware } from 'redux';
// import logger from './logger';

const middlewares = applyMiddleware(thunk);

export default middlewares;
