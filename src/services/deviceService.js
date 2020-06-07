import { endPoints } from '../constants/endPoints';
import http from '../lib/http';

export const getDevices = async (fetchType = 'all', fetchParamValue = '') => {
  let uriSufix;
  switch (fetchType) {
    case 'byId':
      uriSufix = `findById/${fetchParamValue}`;
      break;
    case 'byCode':
      uriSufix = `findByCode/${fetchParamValue}`;
      break;
    case 'byName':
      uriSufix = `findByName/${fetchParamValue}`;
      break;
    default:
      uriSufix = '';
      break;
  }

  const uri = `${endPoints.devices.get}/${uriSufix}`;
  const response = await http('get', uri, {});
  const devices = response.data;

  return devices;
};

export const createDevice = async (device) => {
  const uri = `${endPoints.devices.post}`;

  const response = await http('post', uri, device);

  return response;
};

export const updateDevice = async (device) => {
  const uri = `${endPoints.devices.put}/${device.id}`;

  const response = await http('put', uri, device);

  return response;
};
export const deleteDevice = async (deviceId) => {
  const uri = `${endPoints.devices.delete}/${deviceId}`;

  const response = await http('delete', uri, deviceId);

  return response;
};
