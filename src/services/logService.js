import { endPoints } from '../constants/endPoints';
import http from '../lib/http';

export const getLogs = async (fetchType = 'all', fetchParamValue = '') => {
  let uriSufix;
  switch (fetchType) {
    case 'byId':
      uriSufix = `findById/${fetchParamValue}`;
      break;
    case 'byDeviceId':
      uriSufix = `findByDeviceId/${fetchParamValue}`;
      break;
    default:
      uriSufix = '';
      break;
  }

  const uri = `${endPoints.logs.get}/${uriSufix}`;
  const response = await http('get', uri, {});
  const logs = response.data;

  return logs;
};

export const createLog = async (log) => {
  const uri = `${endPoints.logs.post}`;

  const response = await http('post', uri, log);

  return response;
};

export const updateLog = async (log) => {
  const uri = `${endPoints.logs.put}/${log.id}`;

  const response = await http('put', uri, log);

  return response;
};
export const deleteLog = async (logId) => {
  const uri = `${endPoints.logs.delete}/${logId}`;

  const response = await http('delete', uri, logId);

  return response;
};
