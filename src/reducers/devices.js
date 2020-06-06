import { GET_DEVICES, SET_SELECTED_DEVICE } from '../actions/actionTypes';

export const initialState = {
  selectedDevice: null,
  devices:undefined,
  totalDevices: null,
};
export default (state, action) => {
  state = state || initialState;
  switch (action.type) {
    case GET_DEVICES:
      return {
        ...state,
        devices: action.devices,
        totalDevices: action.devices.length,
      };

    case SET_SELECTED_DEVICE:
      return action.newSelectedDevice
        ? { ...state, selectedDevice: action.newSelectedDevice }
        : { ...state, selectedDevice: null };

    default:
      return state;
  }
};
