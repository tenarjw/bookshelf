import { applyMiddleware, compose, createStore } from 'redux'

import thunk from 'redux-thunk';
import logger from 'redux-logger';

import rootReducer from './reducers'

const middleware = [thunk, logger];


const store = createStore(
  rootReducer,
  undefined,
  applyMiddleware(...middleware)
);

export default store;
