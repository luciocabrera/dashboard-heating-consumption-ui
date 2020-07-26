// Redux
import { combineReducers } from 'redux';
// Custom Reducers
import devicesStorage from '../reducers/devices';
//import losgStorage from '../reducers/logs';

const makeRootReducer = () =>
  combineReducers({
    devicesStorage,
    //  losgStorage,
  });

export default makeRootReducer;
