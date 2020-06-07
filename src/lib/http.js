import axios from 'axios';
import getHeadersWithDefaults from './getHeadersWithDefaults';

export default async function (
  action,
  uri,
  payload = {},
  headerOverrides = {}
) {
  const headers = await getHeadersWithDefaults({ ...headerOverrides });
  switch (action) {
    case 'get':
      return get(uri, headers);
    case 'post':
      return post(uri, payload, headers);
    case 'put':
      return put(uri, payload, headers);
    case 'delete':
      return del(uri, payload, headers);
    case 'create':
      return post(uri, payload, headers);
    case 'repositoryMerge':
      return post(uri, payload, {
        ...headers,
        'Content-Type': 'application/json; charset=utf-8',
        'X-HTTP-Method': 'XMERGE',
        Accept: 'application/json'
      });
    default:
      return;
  }
}

export const put = async (uri, payload, headers) => {
  const response = await axios
    .put(uri, payload, {
      headers: headers
    })
    .catch(function (error) {
      throw processError(error);
    });
  return response;
};

export const get = async (uri, headers) => {
  const response = await axios
    .get(uri, {
      headers: headers
    })
    .catch(function (error) {
      throw processError(error);
    });

  return response;
};

export const post = async (uri, payload, headers) => {
  const response = await axios
    .post(uri, payload, {
      headers: headers
    })
    .catch(function (error) {
      throw processError(error);
    });
  return response;
};

export const del = async (uri, payload, headers) => {
  const response = await axios
    .delete(uri, {
      headers: headers,
      data: payload
    })
    .catch(function (error) {
      throw processError(error);
    });
  return response;
};

const processError = error => {
  // client received an error response (5xx, 4xx)
  if (error.response) {
    const statusResponseCustomMessage = error.response.status
      ? getStatusCustomMessage(error.response.status)
      : '';
    if (error.response.data.message) {
      return `Client received an error response (5xx, 4xx). ${error.response.data.message}. ${statusResponseCustomMessage}`;
    } else {
      return `Client received an error response (5xx, 4xx). Status: ${error.response.status} - ${error.response.statusText}. ${statusResponseCustomMessage}`;
    }
  } else if (error.request) {
    // client never received a response, or request never left
    const statusRequestCustomMessage = error.request.status
      ? getStatusCustomMessage(error.request.status)
      : '';
    return `Client never received a response, or request never left. Status: ${error.request.status} - ${error.request.statusText}. ${statusRequestCustomMessage}`;
  } else {
    // anything else
    return error.message;
  }
};

const getStatusCustomMessage = status => {
  switch (status) {
    case 401:
      return 'The most probable cause is that the token is invalid because it expired. Please refresh your UMD app in your browser and try again. if the problem persists please contact the UMD team.';
    case 403:
      return 'The most probable cause is that the user lacks the right privileges to execute the action. Please make sure you have the right privileges and if not you can always request them.';
    default:
      return '';
  }
};
