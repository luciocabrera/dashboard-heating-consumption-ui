// Redux
import { combineReducers } from 'redux';
// Form's Reducer
import { reducer as reduxFormReducer } from 'redux-form';
// Custom Reducers
import devicesStorage from '../reducers/devices';
//import losgStorage from '../reducers/logs';

const makeRootReducer = () =>
  combineReducers({
    devicesStorage,
    //  losgStorage,
    form: reduxFormReducer,
  });

export default makeRootReducer;
