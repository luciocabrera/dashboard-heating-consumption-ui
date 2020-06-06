import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import makeRootReducer from './makeRootReducer';


// Create Store
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(makeRootReducer(), composeEnhancers(applyMiddleware(thunk)));

// Setup the translations to be used
// syncTranslationWithStore(store);
// store.dispatch(loadTranslations(translationsObject));
// store.dispatch(setLocale('en'));

window.store = store;

export default store;