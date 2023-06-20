import LocalDataHandler from '@/utils/handlers/LocalDataHandler';
import apiHandler from '@/utils/handlers/ApiHandler';

const LOGOUT = 'Logout';

export default class BaseGuard {
  constructor() {
    this.routeOnFailure = LOGOUT;
  }

  async refreshAccessToken() {
    const refreshToken = LocalDataHandler.getRefreshToken();
    /** redirect to login page since the user need to login again if refresh token is expired **/
    if (!refreshToken) {
      return new Promise(resolve => resolve(false));
    }
    let formData = new FormData();
    // modify form data properties depending on back end setup
    formData.append('grant_type', 'refresh_token');
    formData.append('refresh_token', refreshToken);
    formData.append('client_id', process.env.VUE_APP_AUTH_CLIENT_ID);
    try {
      // use native fetch to get new tokens
      let response = await fetch(`${process.env.VUE_APP_API_URL}/api/auth/login`, {
        method: 'POST',
        withCredentials: true,
        body: new URLSearchParams(formData),
      });
      if (apiHandler.isSuccess(response.status)) {
        const data = await response.json();
        // set up in your cookies
        LocalDataHandler.setAccessToken(data.access_token, data.expireIn);
        LocalDataHandler.setRefreshToken(data.refresh_token, LocalDataHandler.VALUES.REFRESH_TOKEN_EXPIRE_TIME);
        apiHandler.setAuthHandler(true);
        LocalDataHandler.setAuthenticated();
        return true;
      }
      console.error(response);
      return false;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  refreshUserProfile() {
    return this.refreshAccessToken().then(response => {
      if (response) {
        return apiHandler.get('auth/profile', apiHandler.getAuthHeader()).then(response => {
          if (apiHandler.isSuccess(response.status)) {
            // modify how you want to save the user depending on back end data
            // vuexStore.commit(SET_USER, response.data);
            return true;
          }
          return false;
        }).catch(error => {
          console.error(error);
          return false;
        });
      }
      return false;
    });
  }
}
