// import { OKTA_INTEGRATION_ENABLED } from '../constants/defaultValues';

export default async function getHeadersWithDefaults(
  headerOverrides = {},
  format = 'json'
) {
  const headerContentType = getResponseContentType(format);
  const defaultHeaders = {
    Accept: headerContentType,
    'Content-Type': headerContentType,
    responseType: 'json'
  };

  // const oktaToken = JSON.parse(
  //   window.localStorage.getItem('okta-token-storage')
  // );

  // if (OKTA_INTEGRATION_ENABLED) {
  //   defaultHeaders.Authorization = `Bearer ${oktaToken.accessToken.accessToken}`;
  // }

  return { ...defaultHeaders, ...headerOverrides };
}

function getResponseContentType(format) {
  switch (format) {
    case 'json':
      return 'application/json';
    case 'xml':
      return 'application/xml';
    case 'atom':
      return 'application/atom+xml';
    case 'xlsx':
      return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    default:
      return 'application/json';
  }
}
