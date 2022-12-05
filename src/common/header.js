export const appAuthHeader = (auth_token) => {
    if (auth_token) {
      return { Authorization: `Bearer ${auth_token}` };
    } else {
      return {};
    }
  }

export function authHeader(tokens){

    if (tokens.headerAuthToken && tokens.headerLoginToken) {
        return { 'x-access-authorization': tokens.headerAuthToken, Authorization: `Bearer ${tokens.headerLoginToken}` };
      } else {
        return {};
      }
}

