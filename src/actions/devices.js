import { GET_DEVICES, SET_SELECTED_DEVICE } from './actionTypes';

import * as deviceService from '../services/deviceService';

export const getDevices = () => async (dispatch) => {
  const devices = (await deviceService.getDevices()) || [];

  await dispatch(getDevicesSuccess(devices));
};

export const createDevice = (device) => async (dispatch) => {
  const response = deviceService.createDevice(device);
  return response;
};

export const deleteDevice = (deviceId) => async (dispatch) => {
  const response = deviceService.deleteDevice(deviceId);
  return response;
};

export const setSelectedDevice = (newSelectedDeviceId) => async (
  dispatch,
  getState
) => {
  const selectedDevice = getState().devicesStorage.selectedDevice;
  const newSelectedDevice = getState().devicesStorage.devices.filter((ele) => {
    return ele.id === newSelectedDeviceId;
  })[0];

  if (selectedDevice && selectedDevice.id === newSelectedDeviceId) return;
  const action = { type: SET_SELECTED_DEVICE, newSelectedDevice };
  dispatch(action);
};

export const getDevicesSuccess = (devices) => ({
  type: GET_DEVICES,
  devices,
});
