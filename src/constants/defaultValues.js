
export const OKTA_INTEGRATION_ENABLED = 'TRUE'


export const APP_PROXY_URL = 'http://localhost:3015';


export const oktaConfig = {
  issuer: OKTA_ISSUER_URL,
  clientId: OKTA_CLIENT_ID,
  redirectUri: `${REACT_APP_PATH}/implicit/callback`,
  responseType: ['id_token', 'token'],
  pkce: false
};
