import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import makeRootReducer from './makeRootReducer';

// Create Store
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  makeRootReducer(),
  composeEnhancers(applyMiddleware(thunk))
);

window.store = store;

export default store;
